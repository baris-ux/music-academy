import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import argon2 from "argon2";

async function createStudent(formData: FormData) {
  "use server";

  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();

  if (!email || !password || !firstName || !lastName) {
    throw new Error("Champs obligatoires manquants");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email déjà utilisé");
  }

  const passwordHash = await argon2.hash(password); // hashage et salage du mot de passe

  await prisma.user.create({
    data: {
      email,
      passwordHash, // on enregistre le passwordHash et non password
      role: "STUDENT",
      student: {
        create: {
          firstName,
          lastName,
        },
      },
    },
  });

  revalidatePath("/admin/students");
}

async function deleteStudent(formData: FormData) {
  "use server";

  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const enrollmentCount = await prisma.enrollment.count({
    where: {
      studentId: id,
    },
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

  if (!student) {
    throw new Error("Étudiant introuvable");
  }

  await prisma.$transaction([
    prisma.student.delete({
      where: { id },
    }),
    prisma.user.delete({
      where: { id: student.user.id },
    }),
  ]);

  revalidatePath("/admin/students");
}


async function updateStudent(formData: FormData) {
  "use server";

  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const id = String(formData.get("id") ?? "");
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!id || !firstName || !lastName || !email) {
    throw new Error("Champs obligatoires manquants");
  }

  const student = await prisma.student.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!student) {
    throw new Error("Étudiant introuvable");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser && existingUser.id !== student.user.id) {
    throw new Error("Email déjà utilisé");
  }

  await prisma.$transaction([
    prisma.student.update({
      where: { id },
      data: {
        firstName,
        lastName,
      },
    }),
    prisma.user.update({
      where: { id: student.user.id },
      data: {
        email,
      },
    }),
  ]);

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
          Ajoutez et gérez les comptes étudiants de l’académie.
        </p>
      </div>

      <form
        action={createStudent}
        className="max-w-xl space-y-5 rounded-2xl border border-slate-300 bg-slate-50 p-6 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-slate-900"
            >
              Prénom
            </label>
            <input
              id="firstName"
              name="firstName"
              placeholder="Ex. Jean"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-slate-900"
            >
              Nom
            </label>
            <input
              id="lastName"
              name="lastName"
              placeholder="Ex. Dupont"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-slate-900">
            Adresse e-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="jean.dupont@email.com"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-900"
          >
            Mot de passe provisoire
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Choisir un mot de passe"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
            required
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Créer l’étudiant
        </button>
      </form>

      <div className="space-y-4">
        {students.length === 0 ? (
          <p className="text-sm text-slate-700">Aucun étudiant pour le moment.</p>
        ) : (
          students.map((student) => (
            <div
              key={student.id}
              className="space-y-4 rounded-2xl border border-slate-300 bg-white px-4 py-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-slate-950">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-sm text-slate-700">{student.user.email}</p>
                </div>

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

              <form
                action={updateStudent}
                className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-2"
              >
                <input type="hidden" name="id" value={student.id} />

                <input
                  name="firstName"
                  defaultValue={student.firstName}
                  placeholder="Prénom"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
                  required
                />

                <input
                  name="lastName"
                  defaultValue={student.lastName}
                  placeholder="Nom"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
                  required
                />

                <input
                  name="email"
                  type="email"
                  defaultValue={student.user.email}
                  placeholder="Adresse e-mail"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300 md:col-span-2"
                  required
                />

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 md:col-span-2"
                >
                  Enregistrer les modifications
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  );
}