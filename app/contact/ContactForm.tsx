"use client";
import { useActionState } from "react";
import { submitContact } from "./actions";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, {
    error: null,
    success: null,
  });

  return (
    <form action={formAction} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Nom"
        required
        className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-slate-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-slate-500"
      />
      <textarea
        name="message"
        placeholder="Votre message"
        rows={5}
        required
        className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-slate-500"
      />

      {state.error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {state.success}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
      >
        {pending ? "Envoi en cours..." : "Envoyer"}
      </button>
    </form>
  );
}