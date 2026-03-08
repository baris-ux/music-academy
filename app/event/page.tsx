import { prisma } from "@/lib/prisma";

export default async function EventsPublicPage() {
  const events = await prisma.event.findMany({
    orderBy: { startAt: "asc" },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
        <div>
            <h1 className="text-3xl font-semibold text-slate-950">
            Événements
            </h1>
            <p className="mt-2 text-sm text-slate-700">
            Découvrez les prochains événements de l’académie.
            </p>
        </div>

        
        {events.length === 0 ? (
            <p className="text-sm text-slate-700">
            Aucun événement prévu pour le moment.
            </p>
        ) : (
            events.map((event) => (
            <div
                key={event.id}
                className="space-y-3 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm"
            >
                <h2 className="text-xl font-semibold text-slate-950">
                {event.title}
                </h2>

                {event.description && (
                <p className="text-sm text-slate-700">
                    {event.description}
                </p>
                )}

                <p className="text-sm text-slate-700">
                📍 {event.location}
                </p>

                <p className="text-sm text-slate-700">
                🗓️{" "}
                {new Date(event.startAt).toLocaleString("fr-BE", {
                    dateStyle: "full",
                    timeStyle: "short",
                })}
                </p>

                <p className="text-sm font-medium text-slate-900">
                🎟️ {(event.price / 100).toFixed(2)} €
                </p>
            </div>
            ))
        )}
    </div>
  );
}