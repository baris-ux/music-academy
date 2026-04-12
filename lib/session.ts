import { cookies, headers } from "next/headers";

type SessionUser = {
  userId: string;
  role: "ADMIN" | "STUDENT";
  email: string;
};

const SESSION_COOKIE = "session_v3";

export async function createSession(user: SessionUser) {
  const cookieStore = await cookies();
  const headerStore = await headers();

  console.log("[createSession] host =", headerStore.get("host"));
  console.log("[createSession] before =", cookieStore.getAll().map((c) => c.name));

  cookieStore.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  console.log("[createSession] set for =", user.email, user.role);
  console.log("[createSession] after =", cookieStore.getAll().map((c) => c.name));
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const headerStore = await headers();

  console.log("[getSession] host =", headerStore.get("host"));
  console.log("[getSession] all cookies =", cookieStore.getAll().map((c) => ({
    name: c.name,
    value: c.value,
  })));

  const value = cookieStore.get(SESSION_COOKIE)?.value;

  if (!value) {
    console.log("[getSession] no session cookie found");
    return null;
  }

  try {
    const parsed = JSON.parse(value) as SessionUser;
    console.log("[getSession] parsed =", parsed);
    return parsed;
  } catch (error) {
    console.log("[getSession] parse error =", error);
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  console.log("[clearSession] deleted");
}