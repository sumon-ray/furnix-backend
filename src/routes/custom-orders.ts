import { Router } from "express"
import multer from "multer"
import path from "node:path"
import fs from "fs"
import mongoose from "mongoose"
import twilio from "twilio"
import { CustomOrder } from "../models/CustomOrder.js"
import { sendEmail } from "../email.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const r = Router()

// === Twilio client (Messaging Service ব্যবহার করবো) ===
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
const MSG_SVC = process.env.TWILIO_MESSAGING_SERVICE_SID

// === Upload setup ===
const uploadPath = path.join("public", "uploads")
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
  fs.chmodSync(uploadPath, 0o755)
}
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadPath),
  filename: (_req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
})
const upload = multer({ storage })

// ========== Helpers ==========
async function notifyStatusChange(order: any, nextStatus: string) {
  // Email to customer
  if (order?.email) {
    try {
      await sendEmail(
        order.email,
        "Custom Order Status Update",
        `<p>Hi ${order.name || ""},</p>
         <p>Your custom order status is now: <b>${nextStatus}</b>.</p>`
      )
    } catch (e) {
      console.error("CustomOrder status email error:", e)
    }
  }

  // SMS to customer
  if (order?.phone && MSG_SVC) {
    try {
      await twilioClient.messages.create({
        to: order.phone,
        messagingServiceSid: MSG_SVC,
        body: `Your custom order status is now: ${nextStatus}`,
      })
    } catch (e) {
      console.error("CustomOrder status SMS error:", e)
    }
  }

  // Socket event (customer/admin real-time update)
  ;(globalThis as any).io?.emit("customOrder:update", {
    id: String(order._id),
    status: nextStatus,
  })
}

function unlinkFiles(paths: string[]) {
  for (const p of paths || []) {
    // p looks like '/uploads/xxx.jpg'
    const abs = path.join(process.cwd(), "public", p.replace(/^\/+/, "")) // safe join
    fs.existsSync(abs) && fs.unlinkSync(abs)
  }
}

// ========== ROUTES ==========

// List: filter/search/pagination
// List all orders (role-based)
r.get("/", authMiddleware, async (req: any, res) => {
  const { status, q, page = "1", pageSize = "20" } = req.query
  const filter: any = {}
  console.log("User:", req.user)
  // CUSTOMER শুধু নিজের orders দেখবে
  if (req.user.role !== "ADMIN") {
    filter.email = req.user.email
  }

  if (status) filter.status = status
  if (q) {
    const rx = new RegExp(String(q), "i")
    filter.$or = [{ name: rx }, { email: rx }, { phone: rx }]
  }

  const pg = Math.max(parseInt(page as string, 10) || 1, 1)
  const ps = Math.min(Math.max(parseInt(pageSize as string, 10) || 20, 1), 100)
  const skip = (pg - 1) * ps

  const [items, total] = await Promise.all([
    CustomOrder.find(filter).sort({ createdAt: -1 }).skip(skip).limit(ps).lean(),
    CustomOrder.countDocuments(filter),
  ])

  res.json({ items, total, page: pg, pageSize: ps })
})

// Optional: own orders (customer side) => query by email (বা auth হলে userId)
// frontend থেকে email পাঠানোর দরকার নেই
r.get("/custom-mine", authMiddleware, async (req: any, res) => {
  const email = req.user?.email
  if (!email) return res.status(400).json({ error: "email not found in token" })

  const items = await CustomOrder.find({ email }).sort({ createdAt: -1 }).lean()
  res.json(items)
})

// Get by id
r.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" })
  }
  const doc = await CustomOrder.findById(id).lean()
  if (!doc) return res.status(404).json({ error: "Not found" })
  res.json(doc)
})

// Create (with uploads)
r.post("/", upload.array("files"), async (req, res) => {
  const files = (req.files as Express.Multer.File[] | undefined) || []
  const attachments = files.map((f) => `/uploads/${path.basename(f.path)}`)
  const { name, email, phone, details, roomMeasurements } = req.body

  const doc = await CustomOrder.create({
    name,
    email,
    phone,
    details,
    roomMeasurements,
    attachments,
    status: "SUBMITTED",
  })

  // Optional: notify admin
  if (process.env.ADMIN_EMAIL) {
    try {
      await sendEmail(
        process.env.ADMIN_EMAIL,
        "New Custom Order Submitted",
        `<p>New custom order from ${name} (${email}, ${phone}).</p>`
      )
    } catch (e) {
      console.error("Notify admin email error:", e)
    }
  }

  // Real-time push
  ;(globalThis as any).io?.emit("customOrder:update", {
    id: String(doc._id),
    status: doc.status,
  })

  res.json(doc)
})

// Update status (Admin)
r.put("/:id/status", async (req, res) => {
  const { id } = req.params
  const { status, adminNotes } = req.body as any
  const allowed = ["SUBMITTED", "APPROVED", "IN_PROGRESS", "REJECTED", "COMPLETED"]

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" })
  }
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: "Invalid status" })
  }

  const updated = await CustomOrder.findByIdAndUpdate(
    id,
    { status, ...(adminNotes ? { adminNotes } : {}) },
    { new: true }
  )
  if (!updated) return res.status(404).json({ error: "Not found" })

  // Notify + socket
  await notifyStatusChange(updated, status)
  res.json(updated)
})

// Delete (Admin) + file cleanup
r.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" })
  }
  const doc = await CustomOrder.findById(id)
  if (!doc) return res.status(404).json({ error: "Not found" })

  // unlink files
  try {
    unlinkFiles(doc.attachments || [])
  } catch (e) {
    console.warn("File cleanup warning:", e)
  }

  await doc.deleteOne()
    // Notify clients via socket
    ;(globalThis as any).io?.emit("customOrder:update", { id: doc._id, deleted: true })
  res.json({ ok: true })
})

export default r
