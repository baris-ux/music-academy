import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation"; // affiche automatique la page 404 si la page n'existe pas 

type Props = {
  params: Promise<{ id: string }>; // convertit le string reçu en int pour prisma
};

export default async function EventDetailPage({ params }: Props) {
    const { id } = await params; // récupère l'id dynamique et l'attribue a la constante id

    const event = await prisma.event.findUnique({ 
        where: { id },
    });

    if (!event) { // si prisma ne trouve pas l'id de l'evenement dans la db
        notFound(); // alors affiche une page erreur 404
    }

    return (
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
        <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-950">
            {event.title}
            </h1>

            {event.description && (
            <p className="mt-4 text-sm text-slate-700">{event.description}</p>
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

            <div className="mt-6">
            <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                Continuer la réservation
            </button>
            </div>
        </div>
        </div>
    );
}