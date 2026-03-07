import { NextResponse } from "next/server";
import { clearSession } from "@/lib/session";

export async function GET() {
  await clearSession();
  return NextResponse.redirect(new URL("/login", "http://localhost:3000"));
}

