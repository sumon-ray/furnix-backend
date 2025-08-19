// scripts/seedCategories.ts
import mongoose from "mongoose"
import { Category } from "../models/Category"
// import { Category } from "../models/category.model"

async function seed() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yourDB")

  const categories = [
    { name: "Sofas", slug: "sofas", level: 1 },
    { name: "Beds", slug: "beds", level: 1 },
    { name: "Tables", slug: "tables", level: 1 },
    { name: "Chairs", slug: "chairs", level: 1 },
    { name: "Storage", slug: "storage", level: 1 },
  ]

  await Category.insertMany(categories)
  console.log("✅ Categories inserted")
  process.exit()
}

seed()
