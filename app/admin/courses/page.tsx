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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Cours</h1>
        <p className="mt-1 text-sm text-slate-700">
          Créez et gérez les cours proposés par l’académie.
        </p>
      </div>

      <form
        action={createCourse}
        className="max-w-xl space-y-5 rounded-2xl border border-slate-300 bg-slate-50 p-6 shadow-sm"
      >
        <div className="space-y-1.5">
          <label htmlFor="title" className="text-sm font-medium text-slate-900">
            Titre du cours
          </label>
          <input
            id="title"
            name="title"
            placeholder="Ex. Piano débutant"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="capacity"
            className="text-sm font-medium text-slate-900"
          >
            Capacité maximale
          </label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            placeholder="Ex. 10"
            min={1}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
            required
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Créer le cours
        </button>
      </form>

      <div className="space-y-3">
        {courses.length === 0 ? (
          <p className="text-sm text-slate-700">Aucun cours pour le moment.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="flex items-center justify-between rounded-2xl border border-slate-300 bg-white px-4 py-4 shadow-sm"
            >
              <div>
                <p className="text-base font-semibold text-slate-950">
                  {course.title}
                </p>
                <p className="text-sm text-slate-700">
                  Capacité : {course.capacity}
                </p>
              </div>

              <form action={deleteCourse}>
                <input type="hidden" name="id" value={course.id} />
                <button
                  type="submit"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 hover:text-red-800"
                >
                  Supprimer
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  );
}