// app/page.js
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 60;

import Link from "next/link";
import { connectDB } from "@/lib/mongodb";

import Product from "@/models/Product";

export default async function HomePage() {
  // 🧩 Direct DB query instead of fetch() – works during build
  await connectDB();
  const products = await Product.find().lean();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">
        🛍️ Our Products
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          products.map((p) => (
            <Link
              key={p._id}
              href={`/products/${p.slug}`}
              className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform"
            >
              <h2 className="text-xl font-semibold text-gray-800">{p.name}</h2>
              <p className="text-gray-500 mb-2">{p.category}</p>
              <p className="text-green-600 font-bold text-lg">₹{p.price}</p>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
