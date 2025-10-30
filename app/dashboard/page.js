import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getProducts() {
  const host = headers().get("host"); // works both locally & on Vercel
  const protocol = process.env.VERCEL ? "https" : "http";
  const res = await fetch(`${protocol}://${host}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function DashboardPage() {
  const products = await getProducts();

  const totalProducts = products.length;
  const lowStock = products.filter((p) => p.inventory < 10).length;
  const avgPrice =
    totalProducts > 0
      ? (products.reduce((sum, p) => sum + p.price, 0) / totalProducts).toFixed(
          2
        )
      : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-gray-700 mb-10">
          📊 Inventory Dashboard
        </h1>

        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow text-center">
            <h2 className="text-2xl font-bold text-blue-500">{totalProducts}</h2>
            <p className="text-gray-500">Total Products</p>
          </div>
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow text-center">
            <h2 className="text-2xl font-bold text-red-500">{lowStock}</h2>
            <p className="text-gray-500">Low Stock (&lt;10)</p>
          </div>
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow text-center">
            <h2 className="text-2xl font-bold text-green-500">₹{avgPrice}</h2>
            <p className="text-gray-500">Average Price</p>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-right">Price</th>
                <th className="p-3 text-right">Inventory</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  className="border-t border-gray-200 hover:bg-blue-50 transition"
                >
                  <td className="p-3">{p.name}</td>
                  <td className="p-3 text-gray-600">{p.category}</td>
                  <td className="p-3 text-right text-blue-600">₹{p.price}</td>
                  <td
                    className={`p-3 text-right ${
                      p.inventory < 10 ? "text-red-500 font-semibold" : ""
                    }`}
                  >
                    {p.inventory}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
