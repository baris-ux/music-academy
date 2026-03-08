import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export default async function StudentPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "STUDENT") {
    redirect("/");
  }

  const student = await prisma.student.findUnique({
    where: {
      userId: session.userId,
    },
    include: {
      user: true,
      enrollments: {
        include: {
          course: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!student) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-950">
          Portail étudiant
        </h1>
        <p className="text-sm text-slate-700">
          Aucun profil étudiant associé à ce compte.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">
          Portail étudiant
        </h1>
        <p className="mt-1 text-sm text-slate-700">
          Bienvenue {student.firstName} {student.lastName}.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Mes informations</h2>
        <div className="mt-3 space-y-1 text-sm text-slate-700">
          <p>
            <span className="font-medium text-slate-900">Nom :</span>{" "}
            {student.firstName} {student.lastName}
          </p>
          <p>
            <span className="font-medium text-slate-900">Email :</span>{" "}
            {student.user.email}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Mes cours</h2>

        {student.enrollments.length === 0 ? (
          <p className="mt-3 text-sm text-slate-700">
            Vous n’êtes inscrit à aucun cours pour le moment.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {student.enrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <p className="font-medium text-slate-950">
                  {enrollment.course.title}
                </p>
                <p className="text-sm text-slate-700">
                  Inscription enregistrée le{" "}
                  {new Date(enrollment.createdAt).toLocaleDateString("fr-BE")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}