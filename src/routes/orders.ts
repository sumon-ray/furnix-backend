import { Router } from "express"
import { Order } from "../models/Order.js"
import mongoose from "mongoose"
import { sendEmail } from "../email.js"
import twilio from "twilio"
import { User } from "../models/User.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

// 🔹 Hardcoded Twilio credentials
const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const MESSAGING_SERVICE_SID = process.env.TWILIO_MESSAGING_SERVICE_SID;

const r = Router()

// GET orders (filter by status)
r.get("/", async (req, res) => {
  const { status } = req.query as any
  const q: any = {}
  if (status) q.status = status
  const orders = await Order.find(q).sort({ createdAt: -1 }).lean()
  res.json(orders)
})

// CREATE new order
r.post("/", authMiddleware, async (req: any, res) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: "Unauthorized. Please login first." })
    }

    const doc = await Order.create({
      ...req.body,
      userId: req.user.userId,
    })

    // socket event
    ;(globalThis as any).io?.emit("order:update", {
      id: String(doc._id),
      status: doc.status,
    })

    // ✅ send email confirmation
    if (doc.customerEmail) {
      try {
        await sendEmail(
          doc.customerEmail,
          "Order Confirmation",
          `<h1>ধন্যবাদ ${doc.customerName}!</h1>
           <p>আপনার অর্ডার সফলভাবে প্লেস হয়েছে। Order ID: ${doc._id}</p>`
        )
        console.log("Email sent to", doc.customerEmail)
      } catch (err) {
        console.error("Email error:", err)
      }
    }

    // ✅ send SMS using Messaging Service
    if (doc.customerPhone) {
      try {
        await client.messages.create({
          to: doc.customerPhone,
          messagingServiceSid: MESSAGING_SERVICE_SID,
          body: `Hi ${doc.customerName}, আপনার অর্ডার (${doc._id}) সফলভাবে প্লেস হয়েছে! মোট: ${doc.total} BDT.`,
        })
        console.log("SMS sent to", doc.customerPhone)
      } catch (err) {
        console.error("Twilio SMS error:", err)
      }
    }

    res.json({ ...doc.toObject(), id: String(doc._id) })
  } catch (err) {
    console.error("Order create error:", err)
    res.status(500).json({ error: "Failed to create order" })
  }
})


// GET distributors
r.get("/distributors", async (req, res) => {
  try {
    const distributors = await User.find({ role: "DISTRIBUTOR" }).lean()
    res.json(distributors)
  } catch (err) {
    console.error("Fetch distributors error:", err)
    res.status(500).json({ error: "Failed to fetch distributors" })
  }
})


// ASSIGN order to distributor
r.patch("/:id/assign", async (req, res) => {
  const { id } = req.params
  const { distributorId } = req.body

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(distributorId)) {
    return res.status(400).json({ error: "Invalid order or distributor ID" })
  }

  try {
    const distributor = await User.findById(distributorId)
    if (!distributor || distributor.role !== "DISTRIBUTOR") {
      return res.status(400).json({ error: "Invalid distributor" })
    }

    //  Find order
    const order = await Order.findById(id)
    if (!order) return res.status(404).json({ error: "Order not found" })

    // 3️⃣ Assign distributor & update status
    order.distributorId = distributor._id
    order.status = "ASSIGNED"
    await order.save()

    // 4️⃣ Emit socket event
    ;(globalThis as any).io?.emit("order:update", { id: String(order._id), status: order.status })

    // 5️⃣ Send email notification to distributor (optional)
    try {
      await sendEmail(
        distributor.email,
        "New Order Assigned",
        `<p>Hi ${distributor.name}, একটি নতুন অর্ডার আপনার কাছে assign করা হয়েছে। Order ID: ${order._id}</p>`
      )
      console.log("Email sent to distributor:", distributor.email)
    } catch (err) {
      console.error("Distributor email error:", err)
    }

    res.json({ message: "Order assigned successfully", order })
  } catch (err) {
    console.error("Assign order error:", err)
    res.status(500).json({ error: "Failed to assign order" })
  }
})



// UPDATE order
r.put("/:id", async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid order id" })
  }

  try {
    const updated = await Order.findByIdAndUpdate(id, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: "Order not found" })

    ;(globalThis as any).io?.emit("order:update", { id: String(updated._id), status: updated.status })

    // Email on status change
    if (updated.customerEmail) {
      try {
        await sendEmail(
          updated.customerEmail,
          "Order Status Update",
          `<p>Your order <b>${updated._id}</b> status has been updated to <b>${updated.status}</b>.</p>`
        )
        console.log("Status email sent to", updated.customerEmail)
      } catch (err) {
        console.error("Email error:", err)
      }
    }

    // SMS on status change using Messaging Service
    if (updated.customerPhone) {
      try {
        const msg = `Hi ${updated.customerName}, আপনার অর্ডার (${updated._id}) status এখন: ${updated.status}`
        await client.messages.create({
          to: updated.customerPhone,
          messagingServiceSid: MESSAGING_SERVICE_SID,
          body: msg,
        })
        console.log("Status SMS sent to", updated.customerPhone)
      } catch (err) {
        console.error("Twilio SMS error:", err)
      }
    }

    res.json({ ...updated.toObject(), id: String(updated._id) })
  } catch (err) {
    console.error("Order update error:", err)
    res.status(500).json({ error: "Failed to update order" })
  }
})

export default r
