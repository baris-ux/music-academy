import Link from "next/link";

type Props = {
  searchParams: Promise<{ orderId?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { orderId } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-10">
      <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">
          Réservation enregistrée
        </h1>

        <p className="mt-3 text-sm text-slate-700">
          Votre commande a bien été créée.
        </p>

        {orderId && (
          <p className="mt-2 text-sm text-slate-700">
            Référence de commande :{" "}
            <span className="font-medium text-slate-950">{orderId}</span>
          </p>
        )}

        <div className="mt-6">
          <Link
            href="/event"
            className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Retour aux événements
          </Link>
        </div>
      </div>
    </div>
  );
}