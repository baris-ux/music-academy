"use client";
import { useActionState } from "react";
import { requestPasswordReset } from "./actions";

export default function ForgotForm() {
  const [state, formAction, pending] = useActionState(requestPasswordReset, {
    error: null,
    success: null,
  });

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-500 tracking-wide">
          Adresse e-mail
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="vous@exemple.com"
          className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/15 transition"
        />
      </div>

      {state.error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-xs text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          {state.success}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[#0f1923] hover:bg-[#1a2a38] text-white text-sm font-medium py-2.5 transition disabled:opacity-50"
      >
        {pending ? "Envoi en cours…" : "Envoyer le lien"}
      </button>

      <p className="text-center text-xs text-slate-400">
        <a href="/login" className="text-amber-500 hover:text-amber-600 font-medium transition">
          ← Retour à la connexion
        </a>
      </p>
    </form>
  );
}