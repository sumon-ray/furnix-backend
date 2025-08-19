import { Router } from "express"
import { Product } from "../models/Product.js"
import mongoose from "mongoose"

const r = Router()

// ✅ Get all products
r.get("/", async (req, res) => {
  const { q = "", page = "1", pageSize = "12", priceMax = "999999", material = "", color = "" } = req.query as any
  const filters: any = {}
  if (q) {
    filters.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { tags: { $elemMatch: { $regex: q, $options: "i" } } },
    ]
  }
  if (material) filters["variants.material"] = material
  if (color) filters["variants.color"] = color
  filters["variants.price"] = { $lte: Number(priceMax) }

  const p = Number(page),
    ps = Number(pageSize)
  const [items, total] = await Promise.all([
    Product.find(filters)
      .sort({ createdAt: -1 })
      .skip((p - 1) * ps)
      .limit(ps)
      .lean(),
    Product.countDocuments(filters),
  ])
  res.json({ items: items.map((i) => ({ ...i, id: String(i._id) })), total, page: p, pageSize: ps })
})

// ✅ Create product
r.post("/", async (req, res) => {
  const body = req.body
  try {
    const created = await Product.create(body)
    res.json({ ...created.toObject(), id: String(created._id) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

// ✅ Get by ID or Slug
r.get("/:id", async (req, res) => {
  const id = req.params.id

  // First try as ObjectId
  if (mongoose.Types.ObjectId.isValid(id)) {
    const itemById = await Product.findById(id).lean()
    if (itemById) return res.json({ ...itemById, id: String(itemById._id) })
  }

  // Then fallback to slug
  const itemBySlug = await Product.findOne({ slug: id }).lean()
  if (!itemBySlug) return res.status(404).json({ error: "Not found" })
  res.json({ ...itemBySlug, id: String(itemBySlug._id) })
})

// ✅ Update by ID or Slug
r.put("/:id", async (req, res) => {
  const id = req.params.id
  let updated = null

  if (mongoose.Types.ObjectId.isValid(id)) {
    updated = await Product.findByIdAndUpdate(id, req.body, { new: true })
  } else {
    updated = await Product.findOneAndUpdate({ slug: id }, req.body, { new: true })
  }

  if (!updated) return res.status(404).json({ error: "Not found" })

  // Emit low-stock alerts
  try {
    const low = (updated.variants || []).find((v: any) => v.stock > 0 && v.stock <= 3)
    if (low) {
      ;(globalThis as any).io?.emit("stock:low", {
        productId: String(updated._id),
        title: updated.title,
        variant: { size: low.size, color: low.color, material: low.material, stock: low.stock },
      })
    }
  } catch {}

  res.json({ ...updated.toObject(), id: String(updated._id) })
})

// ✅ Delete by ID or Slug
r.delete("/:id", async (req, res) => {
  const id = req.params.id
  let deleted = null

  if (mongoose.Types.ObjectId.isValid(id)) {
    deleted = await Product.findByIdAndDelete(id)
  } else {
    deleted = await Product.findOneAndDelete({ slug: id })
  }

  if (!deleted) return res.status(404).json({ error: "Not found" })
  res.json({ ok: true })
})

export default r
