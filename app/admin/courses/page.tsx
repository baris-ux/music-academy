import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

async function createCourse(formData: FormData) {
  "use server";

  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const title = String(formData.get("title") ?? "").trim();
  const capacity = Number(formData.get("capacity") ?? 0);

  if (!title || capacity <= 0) {
    throw new Error("Titre et capacité valides obligatoires");
  }

  await prisma.course.create({
    data: {
      title,
      capacity,
    },
  });

  revalidatePath("/admin/courses");
}

async function deleteCourse(formData: FormData) {
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
      courseId: id,
    },
  });

  if (enrollmentCount > 0) {
    throw new Error(
      "Impossible de supprimer ce cours car il possède encore des inscriptions."
    );
  }

  await prisma.course.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/courses");
}

export default async function CoursesPage() {
  const session = await getSession();

  if (!session) redirect("/login");
  if (session.role !== "ADMIN") redirect("/");

  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Cours</h1>

      <form action={createCourse} className="space-y-3 max-w-md border p-4 rounded">
        <input
          name="title"
          placeholder="Titre du cours"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="capacity"
          type="number"
          placeholder="Capacité"
          className="w-full border px-3 py-2 rounded"
          required
          min={1}
        />

        <button type="submit" className="border px-4 py-2 rounded">
          Créer cours
        </button>
      </form>

      <div className="space-y-2">
        {courses.length === 0 ? (
          <p>Aucun cours pour le moment.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <strong>{course.title}</strong>
                <div className="text-sm text-gray-600">
                  Capacité : {course.capacity}
                </div>
              </div>

              <form action={deleteCourse}>
                <input type="hidden" name="id" value={course.id} />
                <button type="submit" className="text-red-600 text-sm">
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