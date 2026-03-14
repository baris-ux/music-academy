import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      startAt: true,
      price: true,
    },
  });

  if (!event) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">
          {event.title}
        </h1>

        {event.description && (
          <p className="mt-4 text-sm leading-6 text-slate-700">
            {event.description}
          </p>
        )}

        <div className="mt-6 space-y-2 text-sm text-slate-700">
          <p>📍 {event.location}</p>
          <p>
            🗓️{" "}
            {new Date(event.startAt).toLocaleString("fr-BE", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>
          <p className="font-medium text-slate-900">
            🎟️ {(event.price / 100).toFixed(2)} €
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href="/event"
            className="inline-flex rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
          >
            Retour
          </Link>

          <Link
            href={`/event/${event.id}/checkout`}
            className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Continuer la réservation
          </Link>
        </div>
      </div>
    </div>
  );
}