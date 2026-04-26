export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <div className="rounded-2xl border border-slate-300 bg-white p-10 shadow-sm">
          <div className="mb-4 text-4xl">🎵</div>
          <h1 className="text-2xl font-semibold text-slate-950">
            Demande envoyée !
          </h1>
          <p className="mt-3 text-sm text-slate-700">
            Votre demande d'inscription a bien été reçue. L'équipe de l'académie
            va l'examiner et vous recevrez un email avec la suite à donner.
          </p>
          <a
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}