import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  // Validate against env credentials
  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("admin_auth", "true", {
      httpOnly: true,
      maxAge: 60 * 60 * 4, // 4 hours
    });
    return res;
  }

  return NextResponse.json(
    { message: "Invalid credentials" },
    { status: 401 }
  );
}
