import { activerCompte } from "./actions";

export default async function ActivationPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="rounded-2xl border border-slate-300 bg-white p-10 shadow-sm">
            <p className="text-sm text-slate-700">Lien d'activation invalide.</p>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Contacter l'académie
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-md">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-950">
            Activez votre compte
          </h1>
          <p className="mt-1 text-sm text-slate-700">
            Choisissez un mot de passe pour accéder à votre espace étudiant.
          </p>
        </div>

        <form
          action={activerCompte}
          className="space-y-5 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm"
        >
          <input type="hidden" name="token" value={token} />

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-900"
            >
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Au moins 8 caractères"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
              required
              minLength={8}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="confirm"
              className="text-sm font-medium text-slate-900"
            >
              Confirmer le mot de passe <span className="text-red-500">*</span>
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="Répétez votre mot de passe"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Activer mon compte
          </button>
        </form>
      </div>
    </div>
  );
}