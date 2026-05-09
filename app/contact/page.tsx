import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-slate-900">

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
                <h3 className="text-lg font-semibold">Adresse 1</h3>
                <p className="text-sm text-slate-600 mb-1">Rue Exemple 123, 1000 Bruxelles</p>
                <p className="text-xs text-slate-500 mb-4">Cours du mercredi</p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.214068678451!2d4.363046277172853!3d50.86423657167426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c3743f015555%3A0x9084a10d8d3ae25b!2sRue%20Liedts%2027%2C%201030%20Schaerbeek!5e0!3m2!1sfr!2sbe!4v1778337347856!5m2!1sfr!2sbe"
                  className="w-full h-64 rounded-xl border"
                  loading="lazy"
                />
              </div>

              {/* Lieu 2 */}
              <div>
                <h3 className="text-lg font-semibold">Adresse 2</h3>
                <p className="text-sm text-slate-600 mb-1">Avenue Exemple 45, 1050 Ixelles</p>
                <p className="text-xs text-slate-500 mb-4">Cours du dimanche</p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.458352726436!2d4.396915677173519!3d50.87822657167696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c325479671cd%3A0xb8f9034e18f92558!2sRue%20de%20la%20Marne%2089%2C%201140%20Bruxelles!5e0!3m2!1sfr!2sbe!4v1778337251547!5m2!1sfr!2sbe"
                  className="w-full h-64 rounded-xl border"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* HORAIRES */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold mb-8">Horaires des cours</h2>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Mercredi */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-base font-semibold text-slate-900 mb-1">Mercredi</h3>
              <p className="text-xs text-slate-500 mb-4">Adresse 1 — Rue Exemple 123, Bruxelles</p>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-center justify-between rounded-xl bg-white border border-slate-200 px-4 py-2.5">
                  <span>Guitare</span>
                  <span className="font-medium">14h – 16h</span>
                </div>
              </div>
            </div>

            {/* Dimanche */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-base font-semibold text-slate-900 mb-1">Dimanche</h3>
              <p className="text-xs text-slate-500 mb-4">Adresse 2 — Avenue Exemple 45, Ixelles</p>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-center justify-between rounded-xl bg-white border border-slate-200 px-4 py-2.5">
                  <span>Guitare</span>
                  <span className="font-medium">12h – 14h</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white border border-slate-200 px-4 py-2.5">
                  <span>Luth</span>
                  <span className="font-medium">14h – 16h</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CONTACT + FORMULAIRE */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-2">
            {/* INFOS */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Nous contacter</h2>
              <p className="text-slate-600 mb-6">
                Une question ? Une demande d'information ? N'hésitez pas à nous
                contacter via ce formulaire ou directement par e-mail.
              </p>
              <div className="space-y-3 text-sm text-slate-700">
                <p>📧 contact@academie-musique.be</p>
                <p>📞 +32 123 45 67 89</p>
              </div>
              <div className="mt-6 flex gap-4 text-sm">
                <a href="#" className="underline">Instagram</a>
                <a href="#" className="underline">Facebook</a>
                <a href="#" className="underline">YouTube</a>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}