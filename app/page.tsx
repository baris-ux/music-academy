import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

const features = [
  {
    title: "Cours de musique",
    description:
      "Découvrez un accompagnement structuré pour progresser à votre rythme.",
  },
  {
    title: "Événements & concerts",
    description:
      "Consultez les événements organisés par l’académie et réservez vos billets.",
  },
  {
    title: "Espace étudiant",
    description:
      "Accédez à vos cours, vos informations utiles et vos ressources pédagogiques.",
  },
];

const benefits = [
  "Paiement sécurisé en ligne",
  "Billets envoyés par e-mail",
  "Accès étudiant simplifié",
  "Académie moderne et centralisée",
];

export default async function HomePage() {
  const upcomingEvents = await prisma.event.findMany({
    where: {
      startAt: {
        gte: new Date(),
      },
    },
    orderBy: {
      startAt: "asc",
    },
    take: 3,
  });

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Académie de musique
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <Link href="/" className="transition hover:text-slate-900">
              Accueil
            </Link>
            <Link href="/contact" className="transition hover:text-slate-900">
              Contact
            </Link>
            <Link href="/event" className="transition hover:text-slate-900">
              Événements
            </Link>
            <Link href="/login" className="transition hover:text-slate-900">
              Connexion
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Se connecter
            </Link>
            <Link
              href="/event"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Voir les événements
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 shadow-sm">
              Cours, événements et billetterie
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
              Une académie de musique moderne, claire et accessible
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Découvrez les cours proposés, consultez les événements à venir et
              réservez vos billets simplement depuis une plateforme pensée pour
              les élèves et les visiteurs.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/event"
                className="rounded-xl bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Réserver un billet
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Accéder à mon espace
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="grid gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                  Prochains événements
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  Billetterie en ligne
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Réservez vos places facilement et recevez votre billet par
                  e-mail.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                  Espace étudiant
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  Suivi personnalisé
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Consultez vos informations utiles, vos cours et vos ressources
                  en quelques clics.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                  Expérience simple
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  Navigation claire
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Une interface pensée pour guider rapidement les visiteurs et
                  les élèves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Une plateforme pensée pour l’académie
          </h2>
          <p className="mt-3 text-slate-600">
            Tout est organisé pour faciliter l’accès aux informations
            essentielles, à la billetterie et à l’espace étudiant.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Événements à venir
              </h2>
              <p className="mt-3 text-slate-600">
                Découvrez les prochains rendez-vous proposés par l’académie.
              </p>
            </div>

            <Link
              href="/event"
              className="text-sm font-semibold text-slate-900 underline underline-offset-4"
            >
              Voir tous les événements
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {upcomingEvents.length === 0 ? (
              <div className="md:col-span-3 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
                Aucun événement prévu pour le moment.
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >

                  <div className="p-6">
                    <p className="text-sm text-slate-500">
                      {new Date(event.startAt).toLocaleDateString("fr-BE", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold text-slate-900">
                      {event.title}
                    </h3>

                    <p className="text-sm text-slate-500">{event.location}</p>

                    <p className="mt-4 text-sm text-slate-600">
                      {event.description ?? "Aucune description disponible pour cet événement."}
                    </p>

                    <Link
                      href={`/event/${event.id}`}
                      className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      Voir plus
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Pourquoi choisir cette plateforme ?
            </h2>
            <p className="mt-4 max-w-xl text-slate-600">
              Une expérience plus fluide pour les visiteurs, plus claire pour les
              élèves, et plus professionnelle pour l’académie.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700"
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-slate-900 px-8 py-12 text-white shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">
                Prêt à découvrir l’académie ?
              </h2>
              <p className="mt-3 text-slate-300">
                Consultez les événements à venir ou connectez-vous à votre espace
                personnel.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/event"
                className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Voir les événements
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-slate-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-slate-900 px-8 py-12 text-white shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">
                Besoin d’informations ?
              </h2>
              <p className="mt-3 text-slate-300">
                Consultez nos lieux de cours, nos horaires ou contactez-nous
                directement.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Nous contacter
              </Link>
            </div>

          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Académie de musique. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-slate-700">
              Accueil
            </Link>
            <Link href="/event" className="hover:text-slate-700">
              Événements
            </Link>
            <Link href="/login" className="hover:text-slate-700">
              Connexion
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}