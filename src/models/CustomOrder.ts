import mongoose, { Schema } from "mongoose"

const CustomOrderSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    roomMeasurements: String,
    details: String,
    attachments: [String], // '/uploads/...' paths

    // 🔽 মূল status workflow
    status: {
      type: String,
      enum: ["SUBMITTED", "APPROVED", "IN_PROGRESS", "REJECTED", "COMPLETED"],
      default: "SUBMITTED",
    },

    // optional but useful
    adminNotes: { type: String },
    customerId: { type: Schema.Types.ObjectId, ref: "User" }, // থাকলে auth থেকে map করবে
  },
  { timestamps: true }
)

export const CustomOrder =
  mongoose.models.CustomOrder || mongoose.model("CustomOrder", CustomOrderSchema)
