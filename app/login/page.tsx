import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import argon2 from "argon2";

async function login(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    throw new Error("Email et mot de passe obligatoires");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  const validPassword = await argon2.verify(user.passwordHash, password);

  if (!validPassword) {
    throw new Error("Mot de passe incorrect");
  }

  console.log("[login] user found =", user.email, user.role);

  await createSession({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  if (user.role === "ADMIN") {
    redirect("/admin/students");
  }

  redirect("/");
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Connexion</h1>

        <form action={login} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded border px-3 py-2"
              placeholder="admin@music.local"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full rounded border px-3 py-2"
              placeholder="admin123"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded border px-4 py-2 font-medium"
          >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
}
