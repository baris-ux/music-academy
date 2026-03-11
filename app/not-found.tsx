import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center">
        <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur md:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
            404
          </div>

          <Image
            src="/events/electrical_guitar.svg"
            alt="Illustration page introuvable"
            width={260}
            height={260}
            className="mx-auto mb-6"
            priority
          />

          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Oups… cette page est introuvable
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-300 md:text-base">
            La page que vous recherchez n’existe pas, a été déplacée
            ou l’adresse saisie est incorrecte.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-w-[180px] items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:scale-[1.02] hover:bg-slate-100"
            >
              Retour à l’accueil
            </Link>

          </div>

          <p className="mt-8 text-xs tracking-wide text-slate-400">
            Music Academy · Page non trouvée
          </p>
        </div>
      </div>
    </div>
  );
}