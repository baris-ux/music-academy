import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

async function createEnrollment(formData: FormData) {
  "use server";

  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const studentId = String(formData.get("studentId") ?? "");
  const courseId = String(formData.get("courseId") ?? "");

  if (!studentId || !courseId) {
    throw new Error("Étudiant et cours obligatoires");
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      enrollments: true,
    },
  });

  if (!course) {
    throw new Error("Cours introuvable");
  }

  if (course.enrollments.length >= course.capacity) {
    throw new Error("Capacité maximale atteinte");
  }

  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId,
        courseId,
      },
    },
  });

  if (existingEnrollment) {
    throw new Error("Cet étudiant est déjà inscrit à ce cours");
  }

  await prisma.enrollment.create({
    data: {
      studentId,
      courseId,
    },
  });

  revalidatePath("/admin/enrollments");
}

export default async function EnrollmentsPage() {
  const session = await getSession();

  if (!session) redirect("/login");
  if (session.role !== "ADMIN") redirect("/");

  const students = await prisma.student.findMany({
    include: { user: true },
    orderBy: { lastName: "asc" },
  });

  const courses = await prisma.course.findMany({
    orderBy: { title: "asc" },
  });

  const enrollments = await prisma.enrollment.findMany({
    include: {
      student: {
        include: {
          user: true,
        },
      },
      course: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Inscriptions</h1>

      <form action={createEnrollment} className="space-y-3 max-w-md border p-4 rounded">
        <select
          name="studentId"
          className="w-full border px-3 py-2 rounded"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Choisir un étudiant
          </option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.firstName} {student.lastName} - {student.user.email}
            </option>
          ))}
        </select>

        <select
          name="courseId"
          className="w-full border px-3 py-2 rounded"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Choisir un cours
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title} (capacité : {course.capacity})
            </option>
          ))}
        </select>

        <button type="submit" className="border px-4 py-2 rounded">
          Créer inscription
        </button>
      </form>

      <div className="space-y-2">
        {enrollments.length === 0 ? (
          <p>Aucune inscription pour le moment.</p>
        ) : (
          enrollments.map((enrollment) => (
            <div key={enrollment.id} className="border p-3 rounded">
              <strong>
                {enrollment.student.firstName} {enrollment.student.lastName}
              </strong>
              <div className="text-sm text-gray-600">
                {enrollment.student.user.email}
              </div>
              <div className="text-sm">
                Cours : {enrollment.course.title}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
