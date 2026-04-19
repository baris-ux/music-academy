import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="bg-[#0f1923] px-8 py-7">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-6 tracking-wide"
          >
            ← Retour à l'accueil
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <svg className="w-4 h-4 stroke-amber-400" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
              </svg>
            </div>
            <span className="font-serif text-lg text-white tracking-wide">Music Academy</span>
          </div>
          <p className="text-[11px] uppercase tracking-widest text-white/30 pl-11">espace membre</p>
        </div>

        {/* Body */}
        <div className="bg-white dark:bg-slate-900 px-8 py-7">
          <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-5">
            Connexion à votre compte
          </p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}