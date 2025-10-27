import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// GET: fetch all products
export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

// POST: add new product
export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const product = new Product({
    ...data,
    lastUpdated: new Date().toISOString(),
  });
  await product.save();
  return NextResponse.json(product, { status: 201 });
}
