import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Music, CalendarDays, MapPin, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Cours de musique",
    description:
      "Un accompagnement structuré pour progresser à votre rythme, quel que soit votre niveau.",
  },
  {
    title: "Événements & concerts",
    description:
      "Consultez les événements organisés par l'académie et réservez vos billets en ligne.",
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

const gallery = [
  { src: "/images/cours_guitare_1.jpg", alt: "Cours de guitare" },
  { src: "/images/cours_guitare_2.jpg", alt: "Cours de guitare avancé" },
  { src: "/images/cours_luth_1.jpg", alt: "Cours de luth" },
  { src: "/images/cours_luth_2.webp", alt: "Atelier luth" },
  { src: "/images/cours_luth_3.webp", alt: "Cours de luth en groupe" },
];

export default async function HomePage() {
  const upcomingEvents = await prisma.event.findMany({
    where: { startAt: { gte: new Date() } },
    orderBy: { startAt: "asc" },
    take: 3,
  });

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-slate-900">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#f8f7f4]/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f1923]">
              <Music size={14} className="stroke-[#d4a85a]" />
            </div>
            <span className="font-sans text-base font-normal tracking-wide text-slate-900">
              Music Academy
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-500 md:flex">
            <Link href="/" className="transition hover:text-slate-900">Accueil</Link>
            <Link href="/event" className="transition hover:text-slate-900">Événements</Link>
            <Link href="/contact" className="transition hover:text-slate-900">Contact</Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/login"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Se connecter
            </Link>
            <Link
              href="/event"
              className="rounded-xl bg-[#0f1923] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1a2a38]"
            >
              Événements
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-slate-500">
              <Music size={11} className="stroke-[#d4a85a]" />
              Académie de musique · Bruxelles
            </div>

            <h1 className="fmt-6 text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
              Une académie moderne, claire et accessible
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-slate-500">
              Cours de musique, billetterie en ligne et espace étudiant — tout
              en un seul endroit, pensé pour les élèves et les visiteurs.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/event"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0f1923] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1a2a38]"
              >
                Réserver un billet
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                Mon espace étudiant
              </Link>
            </div>
          </div>

          {/* Image hero */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <Image
              src="/images/image_de_groupe.jpg"
              alt="Étudiants de la Music Academy en cours"
              width={600}
              height={420}
              className="h-[360px] w-full object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f1923]/75 to-transparent p-5">
              <p className="font-serif text-base font-normal text-white">
                Nos étudiants en action
              </p>
              <p className="mt-0.5 text-[12px] text-white/55">
                Cours individuels et collectifs · Tous niveaux
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <h2 className="font-sans text-2xl font-normal text-slate-950">
            Une plateforme pensée pour l'académie
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            Tout est organisé pour faciliter l'accès aux informations essentielles.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f1923]">
                <Music size={14} className="stroke-[#d4a85a]" />
              </div>
              <h3 className="font-medium text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Galerie ── */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <h2 className="font-sans text-2xl font-normal text-slate-950">
            La vie à l'académie
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            Guitare, luth, piano — découvrez l'ambiance de nos cours.
          </p>
        </div>

        {/* Grille asymétrique : grande image à gauche, 4 petites à droite */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {gallery.map((img, i) => (
            <div
              key={img.src}
              className={`overflow-hidden rounded-2xl border border-slate-200 ${
                i === 0 ? "col-span-2 md:col-span-1 md:row-span-2" : ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={600}
                className={`w-full object-cover transition duration-300 hover:scale-105 ${
                  i === 0 ? "h-56 md:h-full md:min-h-[360px]" : "h-44"
                }`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Bénéfices + image luth ── */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid md:grid-cols-2">

          {/* Image luth */}
          <div className="relative hidden h-full min-h-[300px] md:block">
            <Image
              src="/images/cours_luth_1.jpg"
              alt="Cours de luth à la Music Academy"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#0f1923]/25" />
            <div className="absolute bottom-5 left-5">
              <span className="rounded-lg border border-white/20 bg-[#0f1923]/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-widest text-white/70 backdrop-blur-sm">
                Cours de luth
              </span>
            </div>
          </div>

          {/* Bénéfices */}
          <div className="p-8">
            <h2 className="font-sanstext-2xl font-normal text-slate-950">
              Pourquoi choisir notre académie ?
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              Une expérience fluide pour les visiteurs, claire pour les élèves.
            </p>

            <ul className="mt-6 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#d4a85a]/15">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#d4a85a]" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Nous contacter
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Événements à venir ── */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-sans text-2xl font-normal text-slate-950">
              Événements à venir
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Les prochains rendez-vous de l'académie.
            </p>
          </div>
          <Link
            href="/event"
            className="hidden text-sm font-medium text-slate-500 underline underline-offset-4 transition hover:text-slate-900 md:block"
          >
            Voir tout
          </Link>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-400">
            Aucun événement prévu pour le moment.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {upcomingEvents.map((event) => (
              <article
                key={event.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-slate-300"
              >
                <div className="bg-[#0f1923] px-5 py-4">
                  <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-white/35">
                    Événement
                  </p>
                  <h3 className="font-sans text-base font-normal text-white line-clamp-2">
                    {event.title}
                  </h3>
                </div>

                <div className="p-5">
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-[12.5px] text-slate-500">
                      <CalendarDays size={13} className="flex-shrink-0 stroke-slate-400" />
                      {new Date(event.startAt).toLocaleDateString("fr-BE", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-[12.5px] text-slate-500">
                      <MapPin size={13} className="flex-shrink-0 stroke-slate-400" />
                      {event.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="font-sans text-lg text-slate-900">
                      {event.price === 0
                        ? "Gratuit"
                        : `${(event.price / 100).toFixed(2)} €`}
                    </span>
                    <Link
                      href={`/event/${event.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0f1923] px-3.5 py-1.5 text-[12.5px] font-medium text-white transition hover:bg-[#1a2a38]"
                    >
                      Réserver
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-4 md:hidden">
          <Link
            href="/event"
            className="block w-full rounded-xl border border-slate-200 bg-white py-2.5 text-center text-sm font-medium text-slate-700 transition hover:border-slate-300"
          >
            Voir tous les événements
          </Link>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="overflow-hidden rounded-2xl bg-[#0f1923]">
          <div className="grid md:grid-cols-2">

            {/* Image guitare */}
            <div className="relative hidden h-auto min-h-[220px] md:block">
              <Image
                src="/images/cours_guitare_2.jpg"
                alt="Cours de guitare à la Music Academy"
                fill
                className="object-cover opacity-50"
              />
            </div>

            {/* Texte */}
            <div className="px-8 py-10">
              <h2 className="font-sans text-2xl font-normal text-white">
                Prêt à rejoindre l'académie ?
              </h2>
              <p className="mt-2 text-sm leading-7 text-white/45">
                Consultez les événements à venir ou connectez-vous à votre
                espace personnel.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/event"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#d4a85a] px-5 py-2.5 text-sm font-medium text-[#0f1923] transition hover:bg-[#c49a4e]"
                >
                  Voir les événements
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}