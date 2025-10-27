import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(_, context) {
  await connectDB();
  const { identifier } = await context.params;

  // Try finding by slug first, else by _id
  let product =
    (await Product.findOne({ slug: identifier })) ||
    (await Product.findById(identifier));

  if (!product)
    return NextResponse.json({ message: "Product not found" }, { status: 404 });

  return NextResponse.json(product);
}

export async function PUT(req, context) {
  await connectDB();
  const { identifier } = await context.params;
  const updatedData = await req.json();

  // Try updating by ID or slug
  let product =
    (await Product.findByIdAndUpdate(
      identifier,
      { ...updatedData, lastUpdated: new Date().toISOString() },
      { new: true }
    )) ||
    (await Product.findOneAndUpdate(
      { slug: identifier },
      { ...updatedData, lastUpdated: new Date().toISOString() },
      { new: true }
    ));

  if (!product)
    return NextResponse.json({ message: "Product not found" }, { status: 404 });

  return NextResponse.json(product);
}
