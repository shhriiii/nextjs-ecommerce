"use client";

import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    inventory: ""
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  // fetch existing products
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error(err));
  }, []);

  // handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // add new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setProducts([...products, data]);
        setForm({
          name: "",
          slug: "",
          description: "",
          price: "",
          category: "",
          inventory: ""
        });
        setToast("✅ Product added successfully!");
        setTimeout(() => setToast(""), 2000);
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (err) {
      console.error("Error adding:", err);
    } finally {
      setLoading(false);
    }
  };

  // update product inventory directly
  const updateInventory = async (id, newVal) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inventory: Number(newVal) })
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? updated : p))
        );
        setToast("✅ Inventory updated!");
        setTimeout(() => setToast(""), 2000);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // logout function
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 text-gray-800 p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-700">🧰 Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>

      {/* Add Product Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md mb-12"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["name", "slug", "price", "category", "inventory"].map((f) => (
            <input
              key={f}
              name={f}
              placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
              value={form[f]}
              onChange={handleChange}
              className="p-2 border rounded-lg"
              required
            />
          ))}
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="mt-4 w-full p-2 border rounded-lg"
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {/* Products Table */}
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Products</h2>
        <table className="w-full border-collapse">
          <thead className="bg-green-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-right">Inventory</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t border-gray-200">
                <td className="p-2">{p.name}</td>
                <td className="p-2 text-right">₹{p.price}</td>
                <td className="p-2 text-right flex justify-end items-center gap-2">
                  <input
                    type="number"
                    value={p.inventory}
                    onChange={(e) =>
                      setProducts((prev) =>
                        prev.map((prod) =>
                          prod._id === p._id
                            ? { ...prod, inventory: e.target.value }
                            : prod
                        )
                      )
                    }
                    className="w-20 p-1 border rounded text-right"
                  />
                  <button
                    onClick={() => updateInventory(p._id, p.inventory)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
          {toast}
        </div>
      )}
    </main>
  );
}
