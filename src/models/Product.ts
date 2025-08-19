import mongoose, { Schema, model } from "mongoose";

const VariantSchema = new Schema(
  {
    sku: String,
    size: String,
    color: String,
    material: String,
    price: Number,
    b2bPrice: Number,
    stock: Number,
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    slug: { type: String, index: true, unique: true, sparse: true },
    title: { type: String, required: true },
    description: String,
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    images: [String],
    tags: [String],
    dimensions: String,
    materials: String,
    care: String,
    variants: [VariantSchema],
  },
  { timestamps: true }
);

// slugify helper function
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // Replace spaces with -
    .replace(/[^\w\-]+/g, "")    // Remove all non-word chars
    .replace(/\-\-+/g, "-");     // Replace multiple - with single -
}

// Pre-save middleware to generate slug if not set
ProductSchema.pre("save", async function (next) {
  if (!this.slug && this.title) {
    let baseSlug = slugify(this.title);
    let slug = baseSlug;
    let count = 1;

    // Check if slug already exists, add suffix to make unique
    while (await mongoose.models.Product.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
  }
  next();
});

export const Product = model("Product", ProductSchema);
