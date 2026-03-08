import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function AdminPage() {
  const session = await getSession();

  if (!session) redirect("/login");
  if (session.role !== "ADMIN") redirect("/");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">
          Administration
        </h1>
        <p className="mt-1 text-sm text-slate-700">
          Connecté en tant que <span className="font-medium">{session.email}</span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Link
          href="/admin/students"
          className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
        >
          <p className="text-base font-semibold text-slate-950">
            Gérer les étudiants
          </p>
          <p className="mt-1 text-sm text-slate-700">
            Créer, consulter et supprimer les étudiants.
          </p>
        </Link>

        <Link
          href="/admin/courses"
          className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
        >
          <p className="text-base font-semibold text-slate-950">
            Gérer les cours
          </p>
          <p className="mt-1 text-sm text-slate-700">
            Ajouter et organiser les cours de l’académie.
          </p>
        </Link>

        <Link
          href="/admin/enrollments"
          className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
        >
          <p className="text-base font-semibold text-slate-950">
            Gérer les inscriptions
          </p>
          <p className="mt-1 text-sm text-slate-700">
            Associer les étudiants aux cours et suivre les inscriptions.
          </p>
        </Link>
      </div>

      <div>
        <Link
          href="/logout"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
        >
          Se déconnecter
        </Link>
      </div>
    </div>
  );
}