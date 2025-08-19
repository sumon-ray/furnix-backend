import { Request, Response, Router } from "express"
import { User } from "../models/User.js"
import bcrypt from "bcryptjs"
import { signAccess, signRefresh, verifyRefresh } from "../utils/jwt.js"

const r = Router()

r.post("/register", async (req:Request, res:Response) => {
  const { name, email, password, role } = req.body
  const exists = await User.findOne({ email })
  if (exists) return res.status(400).json({ error: "Email exists" })
  const passwordHash = await bcrypt.hash(password, 10)
  const doc = await User.create({ name, email, passwordHash, role: role || "CUSTOMER", verified: false })
  res.json({ ok: true, id: String(doc._id) })
})

r.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ error: "Invalid credentials" })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: "Invalid credentials" })
  const accessToken = signAccess({ sub: String(user._id), role: user.role,email: user.email, })
  const refreshToken = signRefresh({ sub: String(user._id) })
  res.json({
    user: { id: String(user._id), name: user.name, email: user.email, role: user.role, verified: user.verified },
    accessToken,
    refreshToken,
  })
})

r.get("/refresh", async (req, res) => {
  const auth = req.headers.authorization
  const token = auth?.split(" ")[1] || ""
  try {
    const payload: any = verifyRefresh(token)
    const user = await User.findById(payload.sub)
    if (!user) return res.status(401).json({ error: "Invalid token" })
    const accessToken = signAccess({ sub: String(user._id), role: user.role ,  email: user.email, })
    const refreshToken = signRefresh({ sub: String(user._id) })
    res.json({
      user: { id: String(user._id), name: user.name, email: user.email, role: user.role, verified: user.verified },
      accessToken,
      refreshToken,
    })
  } catch {
    res.status(401).json({ error: "Invalid token" })
  }
})

export default r
