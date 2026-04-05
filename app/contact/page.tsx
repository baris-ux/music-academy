import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HEADER SIMPLE */}
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold">
            Académie de musique
          </Link>

          <nav className="flex gap-6 text-sm text-slate-600">
            <Link href="/">Accueil</Link>
            <Link href="/event">Événements</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl font-bold">Contact & Informations</h1>
        <p className="mt-4 text-slate-600 max-w-2xl">
          Retrouvez toutes les informations utiles concernant nos lieux de cours,
          nos horaires ainsi que les moyens de nous contacter.
        </p>
      </section>

      {/* ADRESSES + MAPS */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold mb-10">Nos lieux de cours</h2>

          <div className="grid gap-10 md:grid-cols-2">
            {/* Lieu 1 */}
            <div>
              <h3 className="text-lg font-semibold">
                Académie principale
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Rue Exemple 123, 1000 Bruxelles
              </p>

              <iframe
                src="https://www.google.com/maps?q=Bruxelles&output=embed"
                className="w-full h-64 rounded-xl border"
                loading="lazy"
              />
            </div>

            {/* Lieu 2 */}
            <div>
              <h3 className="text-lg font-semibold">
                Studio secondaire
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Avenue Exemple 45, 1050 Ixelles
              </p>

              <iframe
                src="https://www.google.com/maps?q=Ixelles&output=embed"
                className="w-full h-64 rounded-xl border"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HORAIRES */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold mb-6">Horaires</h2>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            "Lundi : 16h - 20h",
            "Mardi : 16h - 20h",
            "Mercredi : 14h - 20h",
            "Jeudi : 16h - 20h",
            "Vendredi : 16h - 19h",
            "Samedi : 10h - 16h",
          ].map((horaire) => (
            <div
              key={horaire}
              className="rounded-xl border border-slate-200 p-4 bg-slate-50 text-sm"
            >
              {horaire}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT + FORMULAIRE */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-2">
          {/* INFOS */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Nous contacter
            </h2>

            <p className="text-slate-600 mb-6">
              Une question ? Une demande d’information ? N’hésitez pas à nous
              contacter via ce formulaire ou directement par e-mail.
            </p>

            <div className="space-y-3 text-sm text-slate-700">
              <p>📧 contact@academie-musique.be</p>
              <p>📞 +32 123 45 67 89</p>
            </div>

            {/* RÉSEAUX */}
            <div className="mt-6 flex gap-4 text-sm">
              <a href="#" className="underline">Instagram</a>
              <a href="#" className="underline">Facebook</a>
              <a href="#" className="underline">YouTube</a>
            </div>
          </div>

          {/* FORMULAIRE */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nom"
              className="w-full rounded-xl border border-slate-300 px-4 py-2"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-slate-300 px-4 py-2"
            />

            <textarea
              placeholder="Votre message"
              rows={5}
              className="w-full rounded-xl border border-slate-300 px-4 py-2"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
            >
              Envoyer
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-500 flex justify-between">
          <p>© 2026 Académie de musique</p>
          <div className="flex gap-4">
            <Link href="/">Accueil</Link>
            <Link href="/event">Événements</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}