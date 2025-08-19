import jwt, { SignOptions } from "jsonwebtoken"
import ms, { StringValue } from "ms"

const accessTTL = process.env.ACCESS_TOKEN_TTL ?? "1d"
const refreshTTL = process.env.REFRESH_TOKEN_TTL ?? "7d"

// এখানে টাইপ কাস্টিং দিলাম
const accessOptions: SignOptions = { expiresIn: ms(accessTTL as StringValue)! / 1000 }
const refreshOptions: SignOptions = { expiresIn: ms(refreshTTL as StringValue)! / 1000 }

export function signAccess(payload: object): string {
  const secret = process.env.JWT_ACCESS_SECRET
  if (!secret) throw new Error("JWT_ACCESS_SECRET is not defined")
  return jwt.sign(payload, secret, accessOptions)
}

export function signRefresh(payload: object): string {
  const secret = process.env.JWT_REFRESH_SECRET
  if (!secret) throw new Error("JWT_REFRESH_SECRET is not defined")
  return jwt.sign(payload, secret, refreshOptions)
}

export function verifyAccess(token: string) {
  const secret = process.env.JWT_ACCESS_SECRET
  if (!secret) throw new Error("JWT_ACCESS_SECRET is not defined")
  return jwt.verify(token, secret)
}

export function verifyRefresh(token: string) {
  const secret = process.env.JWT_REFRESH_SECRET
  if (!secret) throw new Error("JWT_REFRESH_SECRET is not defined")
  return jwt.verify(token, secret)
}