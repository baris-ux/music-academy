import { cookies } from "next/headers";

type SessionUser = {
  userId: string;
  role: "ADMIN" | "STUDENT";
  email: string;
};

const SESSION_COOKIE = "session";

export async function createSession(user: SessionUser) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;

  if (!value) return null;

  try {
    return JSON.parse(value) as SessionUser;
  } catch {
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
