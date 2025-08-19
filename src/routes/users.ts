import { Router } from "express"
import { User } from "../models/User.js"

const r = Router()

r.get("/", async (_req, res) => {
  const users = await User.find({}, { passwordHash: 0 }).lean()
  res.json(users.map((u) => ({ ...u, id: String(u._id) })))
})

export default r
