import { Schema, model } from "mongoose"

const OrderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    title: String,
    variantKey: String,
    price: Number,
    qty: Number,
  },
  { _id: false },
)

const AddressSchema = new Schema(
  {
    fullName: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  { _id: false },
)

const OrderSchema = new Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    items: [OrderItemSchema],
    subtotal: Number,
    discount: Number,
    tax: Number,
    shipping: Number,
    total: Number,
    address: AddressSchema,
    status: {
      type: String,
      enum: ["PENDING", "PAID", "PROCESSING", "ASSIGNED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
      set: (v: string) => v.toUpperCase(),
    },
    distributorId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    paymentMethod: { type: String, enum: ["SSLCommerz", "COD"], default: "COD" },
  },
  { timestamps: true },
)

export const Order = model("Order", OrderSchema)
