import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function EventsPublicPage() {
  const events = await prisma.event.findMany({
    orderBy: { startAt: "asc" },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
            Académie de musique
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Prochains événements
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Découvrez les concerts, auditions et événements organisés par
            l’académie. Réservez vos places en quelques clics.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
              🎵
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Aucun événement prévu pour le moment
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Revenez bientôt pour découvrir les prochains rendez-vous de
              l’académie.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="border-b border-slate-100 bg-gradient-to-br from-slate-900 to-slate-700 px-6 py-5 text-white">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-200">
                    Événement
                  </p>
                  <h2 className="mt-2 line-clamp-2 text-xl font-semibold leading-tight">
                    {event.title}
                  </h2>
                </div>

                <div className="space-y-4 px-6 py-5">
                  {event.description ? (
                    <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                      {event.description}
                    </p>
                  ) : (
                    <p className="text-sm italic text-slate-400">
                      Aucune description disponible.
                    </p>
                  )}

                  <div className="space-y-3 rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-base shadow-sm">
                        📍
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Lieu
                        </p>
                        <p className="text-sm font-medium text-slate-800">
                          {event.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-base shadow-sm">
                        🗓️
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Date
                        </p>
                        <p className="text-sm font-medium text-slate-800">
                          {new Date(event.startAt).toLocaleString("fr-BE", {
                            dateStyle: "full",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Prix
                      </p>
                      <p className="text-2xl font-bold text-slate-950">
                        {(event.price / 100).toFixed(2)} €
                      </p>
                    </div>

                    <Link
                      href={`/event/${event.id}`}
                      className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      Réserver
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}