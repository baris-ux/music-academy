import { soumettreInscription } from "./actions";

export default function InscriptionPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-950">
            Demande d'inscription
          </h1>
          <p className="mt-1 text-sm text-slate-700">
            Remplissez ce formulaire pour rejoindre l'académie. Nous reviendrons
            vers vous après examen de votre demande.
          </p>
        </div>

        <form
          action={soumettreInscription}
          className="space-y-5 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-slate-900"
              >
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                placeholder="Ex. Jean"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-slate-900"
              >
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Ex. Dupont"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-900"
            >
              Adresse e-mail <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="jean.dupont@email.com"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="phoneNumber"
              className="text-sm font-medium text-slate-900"
            >
              Téléphone
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Ex. +32 470 00 00 00"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="text-sm font-medium text-slate-900"
            >
              Message (optionnel)
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Instrument souhaité, niveau, questions..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Envoyer ma demande
          </button>
        </form>
      </div>
    </div>
  );
}