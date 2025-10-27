// app/products/[slug]/page.js

// ✅ Let Next.js revalidate this page every 60 seconds
export const revalidate = 60;

// ✅ These two lines ensure no build-time fetch failures
export const dynamic = "force-dynamic";
export const dynamicParams = true;

import { notFound } from "next/navigation";

async function getProduct(slug) {
  // Use absolute URL during build to prevent ECONNREFUSED
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetail({ params }) {
  const slug = (await params)?.slug;

  const product = await getProduct(slug);
  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-700 mb-3">
            {product.name}
          </h1>
          <p className="text-gray-500 mb-1">Category: {product.category}</p>
          <p className="text-blue-500 text-xl font-semibold mb-6">
            ₹{product.price}
          </p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-sm text-gray-500">
            <p>Inventory: {product.inventory}</p>
            <p>
              Last updated:{" "}
              {new Date(product.lastUpdated).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
