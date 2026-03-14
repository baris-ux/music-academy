import Link from "next/link";

type Props = {
  searchParams: Promise<{ orderId?: string; session_id?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { orderId, session_id } = await searchParams;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-3xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 px-6 py-10 text-white sm:px-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-3xl">
              ✓
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Paiement confirmé
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base">
              Votre réservation a bien été prise en compte. Merci pour votre
              commande.
            </p>
          </div>

          <div className="space-y-6 px-6 py-8 sm:px-8">
            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="text-base font-semibold text-slate-950">
                Récapitulatif
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Votre paiement a été enregistré avec succès via Stripe. Vous
                pouvez conserver les informations ci-dessous comme référence.
              </p>

              <div className="mt-5 space-y-3">
                {orderId && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Référence de commande
                    </p>
                    <p className="mt-1 break-all text-sm font-medium text-slate-950">
                      {orderId}
                    </p>
                  </div>
                )}

                {session_id && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Référence de session Stripe
                    </p>
                    <p className="mt-1 break-all text-sm font-medium text-slate-950">
                      {session_id}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
              <h2 className="text-base font-semibold text-sky-950">
                Prochaine étape
              </h2>
              <p className="mt-2 text-sm leading-6 text-sky-900">
                Vous pourrez ensuite consulter les informations liées à votre
                réservation et, selon l’évolution de l’application, récupérer
                votre billet électronique.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/event"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Retour aux événements
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
              >
                Revenir à l’accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}