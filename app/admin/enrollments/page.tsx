import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import EnrollmentForm from "./EnrollmentForm";

type FormState = {
  error: string | null;
  success: string | null;
};

async function createEnrollment(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  "use server";

  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const studentId = String(formData.get("studentId") ?? "");
  const courseId = String(formData.get("courseId") ?? "");

  if (!studentId || !courseId) {
    return {
      error: "Étudiant et cours obligatoires",
      success: null,
    };
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      enrollments: true,
    },
  });

  if (!course) {
    return {
      error: "Cours introuvable",
      success: null,
    };
  }

  if (course.enrollments.length >= course.capacity) {
    return {
      error: "Capacité maximale atteinte",
      success: null,
    };
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
    return {
      error: "Cet étudiant est déjà inscrit à ce cours",
      success: null,
    };
  }

  await prisma.enrollment.create({
    data: {
      studentId,
      courseId,
    },
  });

  revalidatePath("/admin/enrollments");

  return {
    error: null,
    success: "Inscription créée avec succès",
  };
}

async function deleteEnrollment(formData: FormData) {
  "use server";

  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  await prisma.enrollment.delete({
    where: { id },
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

      <EnrollmentForm
        students={students}
        courses={courses}
        createEnrollment={createEnrollment}
      />

      <div className="space-y-2">
        {enrollments.length === 0 ? (
          <p>Aucune inscription pour le moment.</p>
        ) : (
          enrollments.map((enrollment) => (
            <div key={enrollment.id} className="border p-3 rounded flex justify-between items-center">
              <div>
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

              <form action={deleteEnrollment}>
                <input type="hidden" name="id" value={enrollment.id} />
                <button
                  type="submit"
                  className="text-red-600 text-sm"
                >
                  Supprimer
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
