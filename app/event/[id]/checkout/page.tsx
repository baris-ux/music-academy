import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EventCheckoutPage({ params }: Props) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      location: true,
      startAt: true,
      price: true,
    },
  });

  if (!event) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-10">
      <div>
        <h1 className="text-3xl font-semibold text-slate-950">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-slate-700">
          Finalisez votre réservation pour cet événement.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">
          {event.title}
        </h2>

        <div className="mt-4 space-y-2 text-sm text-slate-700">
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

        <form className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-800"
            >
              Adresse e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="vous@example.com"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-0 transition focus:border-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="mb-1 block text-sm font-medium text-slate-800"
            >
              Quantité
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min={1}
              defaultValue={1}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-800 outline-none transition focus:border-slate-500"
            />
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <p>
              Prix unitaire :{" "}
              <span className="font-medium text-slate-900">
                {(event.price / 100).toFixed(2)} €
              </span>
            </p>
            <p className="mt-1">
              Le paiement Stripe sera branché à l’étape suivante.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              href={`/event/${event.id}`}
              className="inline-flex rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
            >
              Retour
            </Link>

            <button
              type="submit"
              className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Continuer vers le paiement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}