// routes/category.ts
import { Router } from "express";
import { Category } from "../models/Category";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ level: 1, name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

export default router;
