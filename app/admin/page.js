import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminPanel from "./AdminPanel";

export default async function AdminPage() {
  // ✅ await cookies() because it's now a Promise
  const cookieStore = await cookies();
  const isAuth = cookieStore.get("admin_auth")?.value;

  if (!isAuth) {
    redirect("/login");
  }

  // If authenticated, show AdminPanel
  return <AdminPanel />;
}



