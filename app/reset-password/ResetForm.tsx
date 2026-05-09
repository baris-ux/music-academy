"use client";
import { useActionState, useState, useEffect  } from "react";
import { resetPassword } from "./actions";
import { useRouter } from "next/navigation";

export default function ResetForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState(resetPassword, {
    error: null,
    success: null,
  });

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-500 tracking-wide">
          Nouveau mot de passe
        </label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="••••••••"
          className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/15 transition"
        />
          <p className="text-xs text-slate-400">
            8 caractères minimum, une majuscule, un chiffre et un caractère spécial (!@#$%^&*-_)
          </p>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-500 tracking-wide">
          Confirmer le mot de passe
        </label>
        <input
          name="confirm"
          type="password"
          required
          minLength={8}
          placeholder="••••••••"
          className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/15 transition"
        />
      </div>

      {state.error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}
      {state.success && (
        <div className="space-y-3">
          <p className="text-xs text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            {state.success}
          </p>
          <RedirectCountdown />
        </div>
      )}

      {!state.success && (
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-[#0f1923] hover:bg-[#1a2a38] text-white text-sm font-medium py-2.5 transition disabled:opacity-50"
        >
          {pending ? "Enregistrement…" : "Mettre à jour le mot de passe"}
        </button>
      )}
    </form>
  );
}

function RedirectCountdown() {
  const [count, setCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    if (count === 0) { router.push("/login"); return; }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, router]);

  return (
    <p className="text-center text-xs text-slate-400">
      Redirection vers la connexion dans {count}s...
    </p>
  );
}