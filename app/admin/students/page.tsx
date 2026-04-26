import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { sendInvitationEmail } from "@/lib/email";
import crypto from "crypto";

async function deleteStudent(formData: FormData) {
  "use server";

  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login");

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const enrollmentCount = await prisma.enrollment.count({
    where: { studentId: id },
  });

  if (enrollmentCount > 0) {
    throw new Error(
      "Impossible de supprimer cet étudiant car il a encore des inscriptions."
    );
  }

  const student = await prisma.student.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!student) throw new Error("Étudiant introuvable");

  await prisma.$transaction([
    prisma.student.delete({ where: { id } }),
    prisma.user.delete({ where: { id: student.user.id } }),
  ]);

  revalidatePath("/admin/students");
}

async function renvoyerInvitation(formData: FormData) {
  "use server";

  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login");

  const userId = String(formData.get("userId") ?? "");
  if (!userId) return;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { student: true },
  });

  if (!user || !user.student) throw new Error("Étudiant introuvable");
  if (user.isActive) throw new Error("Ce compte est déjà actif");

  const invitationToken = crypto.randomBytes(32).toString("hex");
  const tokenExpiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

  await prisma.user.update({
    where: { id: userId },
    data: { invitationToken, tokenExpiresAt },
  });

  await sendInvitationEmail({
    to: user.email,
    firstName: user.student.firstName,
    token: invitationToken,
  });

  revalidatePath("/admin/students");
}

export default async function StudentsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "ADMIN") redirect("/");

  const students = await prisma.student.findMany({
    include: { user: true },
    orderBy: { lastName: "asc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Étudiants</h1>
        <p className="mt-1 text-sm text-slate-700">
          Consultez et gérez les comptes étudiants de l'académie.
        </p>
      </div>

      {students.length === 0 ? (
        <p className="text-sm text-slate-700">Aucun étudiant pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-300 bg-white px-5 py-4 shadow-sm"
            >
              <div>
                <p className="text-base font-semibold text-slate-950">
                  {student.firstName} {student.lastName}
                </p>
                <p className="text-sm text-slate-700">{student.user.email}</p>
                <span
                  className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    student.user.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {student.user.isActive ? "Compte actif" : "En attente d'activation"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {!student.user.isActive && (
                  <form action={renvoyerInvitation}>
                    <input type="hidden" name="userId" value={student.user.id} />
                    <button
                      type="submit"
                      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      Renvoyer le lien
                    </button>
                  </form>
                )}

                <form action={deleteStudent}>
                  <input type="hidden" name="id" value={student.id} />
                  <button
                    type="submit"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}