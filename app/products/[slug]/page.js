// app/page.js
export const dynamic = "force-dynamic";
export const revalidate = 60;

import Link from "next/link";

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">
        🛍️ Our Products
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {products.map((p) => (
          <Link
            key={p._id}
            href={`/products/${p.slug}`}
            className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform"
          >
            <h2 className="text-xl font-semibold text-gray-800">{p.name}</h2>
            <p className="text-gray-500 mb-2">{p.category}</p>
            <p className="text-green-600 font-bold text-lg">₹{p.price}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
