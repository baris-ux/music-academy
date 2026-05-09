import Link from "next/link";
import ForgotForm from "./ForgotForm";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-sm border border-slate-200">
        <div className="bg-[#0f1923] px-8 py-7">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition mb-6 tracking-wide">
            ← Retour à la connexion
          </Link>
          <p className="text-white font-semibold text-lg">Mot de passe oublié</p>
          <p className="text-white/40 text-xs mt-1">Recevez un lien de réinitialisation par email</p>
        </div>
        <div className="bg-white px-8 py-7">
          <ForgotForm />
        </div>
      </div>
    </main>
  );
}