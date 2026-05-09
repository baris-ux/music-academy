import Link from "next/link";
import { redirect } from "next/navigation";
import ResetForm from "./ResetForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  if (!token) redirect("/login");

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-sm border border-slate-200">
        <div className="bg-[#0f1923] px-8 py-7">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition mb-6 tracking-wide">
            ← Retour à la connexion
          </Link>
          <p className="text-white font-semibold text-lg">Nouveau mot de passe</p>
          <p className="text-white/40 text-xs mt-1">Choisissez un mot de passe sécurisé</p>
        </div>
        <div className="bg-white px-8 py-7">
          <ResetForm token={token} />
        </div>
      </div>
    </main>
  );
}