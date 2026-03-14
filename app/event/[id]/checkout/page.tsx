import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createOrder } from "./actions";

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

  const unitPrice = event.price / 100;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-950">Checkout</h1>
        <p className="mt-2 text-sm text-slate-700">
          Finalisez votre réservation pour cet événement.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-slate-950">{event.title}</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <p>📍 {event.location}</p>
            <p>
              🗓️{" "}
              {new Date(event.startAt).toLocaleString("fr-BE", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>

        <div className="px-6 py-6">
          <form
            action={createOrder.bind(null, event.id)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-slate-800"
                >
                  Adresse e-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="vous@example.com"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-900"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Le billet sera lié à cette adresse e-mail.
                </p>
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="mb-1.5 block text-sm font-medium text-slate-800"
                >
                  Quantité
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min={1}
                  max={10}
                  defaultValue={1}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Maximum 10 billets par commande.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Récapitulatif
              </h3>

              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Prix unitaire</span>
                  <span className="font-medium text-slate-900">
                    {unitPrice.toFixed(2)} €
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Quantité</span>
                  <span className="font-medium text-slate-900">1</span>
                </div>

                <div className="border-t border-slate-200 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">Total estimé</span>
                    <span className="text-base font-semibold text-slate-950">
                      {unitPrice.toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Le total final sera recalculé côté serveur avant création de la
                commande.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                href={`/event/${event.id}`}
                className="inline-flex rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
              >
                Retour
              </Link>

              <button
                type="submit"
                className="inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Continuer vers le paiement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}