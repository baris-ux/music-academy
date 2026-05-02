"use client";

import { useState, useEffect, useRef } from "react";

type Result = "idle" | "valid" | "invalid" | "already_used" | "loading";

const MESSAGES: Record<Result, string> = {
  idle: "En attente d'un billet...",
  loading: "Vérification...",
  valid: "✅ Billet valide",
  invalid: "❌ Billet invalide",
  already_used: "⚠️ Déjà utilisé",
};

const COLORS: Record<Result, string> = {
  idle: "border-slate-600 bg-slate-800",
  loading: "border-slate-500 bg-slate-800",
  valid: "border-green-500 bg-green-900",
  invalid: "border-red-500 bg-red-900",
  already_used: "border-yellow-500 bg-yellow-900",
};

export default function ScanClient() {
  const [result, setResult] = useState<Result>("idle");
  const [qrInput, setQrInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (result === "idle") inputRef.current?.focus();
  }, [result]);

  async function handleScan(qrCode: string) {
    if (!qrCode.trim() || result === "loading") return;
    setResult("loading");

    try {
      const res = await fetch(
        `/api/ticket/validate/${encodeURIComponent(qrCode)}`
      );
      const data = await res.json();

      if (res.ok && data.valid) setResult("valid");
      else if (data.reason === "already_used") setResult("already_used");
      else setResult("invalid");
    } catch {
      setResult("invalid");
    }

    setQrInput("");
    setTimeout(() => setResult("idle"), 3000);
  }

  return (
    <div className={`rounded-2xl border-2 p-8 text-center transition-all duration-300 ${COLORS[result]}`}>
      <p className="text-2xl font-bold text-white mb-8">
        {MESSAGES[result]}
      </p>

      <input
        ref={inputRef}
        autoFocus
        value={qrInput}
        onChange={(e) => setQrInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleScan(qrInput);
        }}
        placeholder="Scanner ou saisir le code..."
        className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-slate-400 transition"
      />
      <p className="mt-3 text-xs text-slate-500">
        Compatible douchette USB · Entrée pour valider
      </p>
    </div>
  );
}