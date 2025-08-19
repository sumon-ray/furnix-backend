import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

// Custom interface to attach user info to Request
interface JwtPayloadCustom {
  userId: string
  role: string
  email: string
  iat?: number
  exp?: number
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    const token = authHeader.split(" ")[1] // Bearer TOKEN
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    const secret = process.env.JWT_ACCESS_SECRET
    if (!secret) {
      throw new Error("JWT_ACCESS_SECRET is not defined")
    }

    const decoded = jwt.verify(token, secret) as any

    // 🔹 map sub → userId
    req.user = {
      userId: decoded.sub || decoded.userId, 
      role: decoded.role,
      email: decoded.email,
    } as JwtPayloadCustom

    next()
  } catch (err) {
    console.error("authMiddleware error:", err)
    return res.status(401).json({ error: "Invalid token" })
  }
}
