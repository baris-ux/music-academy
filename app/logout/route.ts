import { NextResponse } from "next/server";

const SESSION_COOKIE = "session_v3";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete(SESSION_COOKIE);
  return response;
}