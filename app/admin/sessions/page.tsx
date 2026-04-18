import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import SessionForm from "./SessionForm";
import DeleteSessionButton from "./DeleteSessionButton";

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("fr-BE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminSessionsPage() {
  const session = await getSession();

  if (!session) redirect("/login");
  if (session.role !== "ADMIN") redirect("/");

  const [courses, sessions] = await Promise.all([
    prisma.course.findMany({
      orderBy: { title: "asc" },
      select: {
        id: true,
        title: true,
      },
    }),
    prisma.session.findMany({
      include: {
        course: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        startsAt: "asc",
      },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Gestion des séances</h1>
        <p className="mt-1 text-sm text-slate-700">
          Programmez les séances des cours depuis cette page.
        </p>
      </div>

      <SessionForm courses={courses} />

      <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-950">Séances programmées</h2>
          <p className="mt-1 text-sm text-slate-600">
            Liste des prochaines séances enregistrées.
          </p>
        </div>

        {sessions.length === 0 ? (
          <p className="text-sm text-slate-600">Aucune séance programmée pour le moment.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-700">
                  <th className="px-3 py-2 font-semibold">Cours</th>
                  <th className="px-3 py-2 font-semibold">Début</th>
                  <th className="px-3 py-2 font-semibold">Fin</th>
                  <th className="px-3 py-2 font-semibold">Durée</th>
                  <th className="px-3 py-2 font-semibold">Statut</th>
                  <th className="px-3 py-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100">
                    <td className="px-3 py-3 text-slate-900">{item.course.title}</td>
                    <td className="px-3 py-3 text-slate-700">{formatDateTime(item.startsAt)}</td>
                    <td className="px-3 py-3 text-slate-700">{formatDateTime(item.endsAt)}</td>
                    <td className="px-3 py-3 text-slate-700">{item.hours} h</td>
                    <td className="px-3 py-3 text-slate-700">{item.status}</td>
                    <td className="px-3 py-3">
                      <DeleteSessionButton id={item.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}