export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";

// Pre-generate all product paths at build time
export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  return products.map((p) => ({
    slug: p.slug,
  }));
}

export const revalidate = 60;

async function getProduct(slug) {
  const res = await fetch(`http://localhost:3000/api/products/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

// FIX: await params
export default async function ProductDetail({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

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

