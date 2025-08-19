import { Schema, model } from "mongoose"

export type Role = "SUPER_ADMIN" | "ADMIN" | "DISTRIBUTOR" | "CUSTOMER"

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, index: true, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["SUPER_ADMIN", "ADMIN", "DISTRIBUTOR", "CUSTOMER"], default: "CUSTOMER" },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const User = model("User", UserSchema)
