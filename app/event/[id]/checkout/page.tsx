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
          </div>
        </div>

        <div className="px-6 py-6">
          <CheckoutForm event={event} />
        </div>
      </div>
    </div>
  );
}