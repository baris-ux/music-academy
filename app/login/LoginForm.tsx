"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Erreur de connexion");
        return;
      }

      if (result.role === "ADMIN") {
        router.push("/admin/students");
        router.refresh();
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Une erreur est survenue.");
    } finally {
      setPending(false);
    }
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

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

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