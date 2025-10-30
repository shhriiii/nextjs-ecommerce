import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" }); // ✅ explicitly load your .env.local

import { connectDB } from "./lib/mongodb.js";
import Product from "./models/Product.js";

const seedProducts = [
  {
    name: "Green T-Shirt",
    slug: "green-tshirt",
    description: "Soft cotton green t-shirt for everyday comfort",
    price: 499,
    category: "Clothing",
    inventory: 25,
  },
  {
    name: "Blue Hoodie",
    slug: "blue-hoodie",
    description: "Stylish blue hoodie made of premium fabric",
    price: 899,
    category: "Clothing",
    inventory: 15,
  },
  {
    name: "Running Shoes",
    slug: "running-shoes",
    description: "Lightweight running shoes for all-day comfort",
    price: 1299,
    category: "Footwear",
    inventory: 10,
  },
];

async function seedDB() {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedDB();



