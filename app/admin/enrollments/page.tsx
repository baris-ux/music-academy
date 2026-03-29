import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import EnrollmentForm from "./EnrollmentForm";
import DeleteEnrollmentButton from "./deleteEnrollmentButton";

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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">
          Inscriptions
        </h1>
        <p className="mt-1 text-sm text-slate-700">
          Gérez les associations entre étudiants et cours.
        </p>
      </div>

      <EnrollmentForm
        students={students}
        courses={courses}
        createEnrollment={createEnrollment}
      />

      <div className="space-y-3">
        {enrollments.length === 0 ? (
          <p className="text-sm text-slate-700">
            Aucune inscription pour le moment.
          </p>
        ) : (
          enrollments.map((enrollment) => (
            <div
              key={enrollment.id}
              className="flex items-center justify-between rounded-2xl border border-slate-300 bg-white px-4 py-4 shadow-sm"
            >
              <div>
                <p className="text-base font-semibold text-slate-950">
                  {enrollment.student.firstName}{" "}
                  {enrollment.student.lastName}
                </p>

                <p className="text-sm text-slate-700">
                  {enrollment.student.user.email}
                </p>

                <p className="mt-1 text-sm text-slate-800">
                  Cours :{" "}
                  <span className="font-medium">
                    {enrollment.course.title}
                  </span>
                </p>
              </div>
              <DeleteEnrollmentButton
                enrollmentId={enrollment.id}
                action={deleteEnrollment}
                studentName={`${enrollment.student.firstName} ${enrollment.student.lastName}`}
                courseTitle={enrollment.course.title}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
