import Image from "next/image";

// ✅ Always fetch dynamically (no build-time pre-render)
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getProducts() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("❌ Product fetch error:", err.message);
    return []; // prevents the SSR crash
  }
}


export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-700">
          🛍️ Calm & Modern Product Catalog
        </h1>

        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-3 mb-8 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          id="searchBox"
        />

        <div
          id="productGrid"
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="aspect-square w-full bg-gradient-to-tr from-blue-100 to-blue-50 rounded-xl flex items-center justify-center text-4xl font-semibold text-blue-400">
                🛒
              </div>
              <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.category}</p>
              <p className="text-blue-500 font-bold mt-1">₹{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            const input = document.getElementById('searchBox');
            const grid = document.getElementById('productGrid');
            const allCards = Array.from(grid.children);

            input.addEventListener('input', e => {
              const term = e.target.value.toLowerCase();
              allCards.forEach(card => {
                const title = card.querySelector('h2').textContent.toLowerCase();
                card.style.display = title.includes(term) ? '' : 'none';
              });
            });
          `,
        }}
      />
    </main>
  );
}
