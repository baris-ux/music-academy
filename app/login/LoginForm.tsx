"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await login(formData);

      if (result?.success) {
        if (result.role === "ADMIN") {
          router.push("/admin/students");
          return;
        }

        router.push("/");
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4">
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
          required
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
          required
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded border px-4 py-2 font-medium"
      >
        {pending ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}