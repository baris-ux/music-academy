import { redirect } from "next/navigation";
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

  const passwordHash = await argon2.hash(password);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: "STUDENT",
      student: {
        create: {
          firstName,
          lastName,
        },
      },
    },
  });
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
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Étudiants</h1>

      <form action={createStudent} className="space-y-3 max-w-md border p-4 rounded">
        <input 
          name="firstName" 
          placeholder="Prénom" 
          className="w-full border px-3 py-2 rounded" 
          required
        />

        <input 
          name="lastName" 
          placeholder="Nom" 
          className="w-full border px-3 py-2 rounded" 
          required
        />
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          className="w-full border px-3 py-2 rounded" 
          required
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Mot de passe" 
          className="w-full border px-3 py-2 rounded" 
          required
        />

        <button type="submit" className="border px-4 py-2 rounded">
          Créer étudiant
        </button>
      </form>

      <div className="space-y-2">
        {students.map((student) => (
          <div key={student.id} className="border p-3 rounded">
            <strong>{student.firstName} {student.lastName}</strong>
            <div className="text-sm">{student.user.email}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
