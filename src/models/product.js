import mongoose from "mongoose";
import slugify from "slugify";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    images: [
      {
        asset_id: { type: String, required: true },
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true },
      }
    ],
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    slug: { type: String, unique: true, lowercase: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

// Middleware to auto-generate slug before saving
ProductSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;



