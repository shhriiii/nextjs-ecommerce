import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Next.js Ecommerce",
  description: "Full-stack app with Next.js + MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
        {/* Navbar */}
        <nav className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              🛒 NextShop
            </Link>

            <div className="flex gap-6 text-gray-700 font-medium">
              <Link href="/" className="hover:text-blue-500 transition">
                Home
              </Link>
              <Link href="/dashboard" className="hover:text-blue-500 transition">
                Dashboard
              </Link>
              <Link href="/admin" className="hover:text-blue-500 transition">
                Admin
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-6">
          © {new Date().getFullYear()} NextShop — built with ❤️ using Next.js
        </footer>
      </body>
    </html>
  );
}
