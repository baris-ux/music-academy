import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CheckoutForm from "./CheckoutForm";

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

  const formattedDate = new Date(event.startAt).toLocaleString("fr-BE", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const formattedPrice = new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
  }).format(event.price / 100);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href={`/event/${event.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            ← Retour à l’événement
          </Link>
        </div>

        <div className="mb-10">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
            Paiement sécurisé
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Finaliser votre réservation
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Vérifiez les informations de votre réservation puis poursuivez vers
            le paiement sécurisé Stripe.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-6 py-6 text-white">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-200">
                Récapitulatif
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{event.title}</h2>
            </div>

            <div className="space-y-4 px-6 py-6">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Lieu
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  📍 {event.location}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Date et heure
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  🗓️ {formattedDate}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Prix unitaire
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-950">
                  🎟️ {formattedPrice}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-medium text-emerald-900">
                  Paiement traité de manière sécurisée via Stripe.
                </p>
                <p className="mt-1 text-sm text-emerald-800">
                  Vous serez redirigé vers une page de paiement sécurisée pour
                  finaliser votre commande.
                </p>
              </div>
            </div>
          </section>

          <section className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              Vos informations
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Indiquez votre adresse e-mail et le nombre de billets souhaités.
            </p>

            <div className="mt-6">
              <CheckoutForm event={event} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}