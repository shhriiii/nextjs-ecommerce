import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: String,
  price: Number,
  category: String,
  inventory: Number,
  lastUpdated: String,
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
