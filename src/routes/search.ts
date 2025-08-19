import { Router } from "express"
import { Product } from "../models/Product.js"

const r = Router()

r.get("/", async (req, res) => {
  const { q = "" } = req.query as any
  const query: any = q
    ? {
        $or: [
          { title: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
          { tags: { $elemMatch: { $regex: q, $options: "i" } } },
        ],
      }
    : {}
  const products = await Product.find(query).sort({ createdAt: -1 }).limit(50).lean()
  res.json({ products, total: products.length })
})

export default r
