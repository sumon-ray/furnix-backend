import dotenv from "dotenv"
dotenv.config()
import bcrypt from "bcryptjs"
import { connectDB } from "../utils/db.js"
import { User } from "../models/User.js"
// import { Category } from "../models/Category.js"
import { Product } from "../models/Product.js"

async function run() {
  await connectDB()
  // await Promise.all([User.deleteMany({}), Category.deleteMany({}), Product.deleteMany({})])

  const pass = await bcrypt.hash("password", 10)
  await User.insertMany([
    { name: "Super Admin", email: "super@furnix.dev", passwordHash: pass, role: "SUPER_ADMIN", verified: true },
    { name: "Admin Amy", email: "admin@furnix.dev", passwordHash: pass, role: "ADMIN", verified: true },
    { name: "Dan Distributor", email: "dist@furnix.dev", passwordHash: pass, role: "DISTRIBUTOR", verified: true },
    { name: "Cathy Customer", email: "cathy@furnix.dev", passwordHash: pass, role: "CUSTOMER", verified: true },
  ])

  // const living = await Category.create({ name: "Living Room", slug: "living-room", level: 0 })
  // const sofas = await Category.create({ name: "Sofas", slug: "sofas", level: 1, parentId: living._id })
  // const sectional = await Category.create({
  //   name: "Sectional Sofas",
  //   slug: "sectional-sofas",
  //   level: 2,
  //   parentId: sofas._id,
  // })

  await Product.create({
    slug: "aurora-sectional-sofa",
    title: "Aurora Sectional Sofa",
    description: "A modern sectional sofa with plush cushions and durable upholstery.",
    // categoryId: sectional._id,
    images: [],
    tags: ["sofa", "sectional", "living-room", "modern"],
    dimensions: "320 x 180 x 85 cm",
    materials: "Solid wood frame, high-density foam, polyester fabric",
    care: "Vacuum regularly. Spot clean with mild detergent.",
    variants: [
      { sku: "AUR-SEC-1", size: "L", color: "Gray", material: "Fabric", price: 1200, b2bPrice: 1080, stock: 8 },
    ],
  })

  console.log("Seeded.")
  process.exit(0)
}

run()
