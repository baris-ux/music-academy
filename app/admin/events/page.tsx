import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

async function createEvent(formData: FormData) {
  "use server";

  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const title = String(formData.get("title") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const startAtRaw = String(formData.get("startAt") ?? "").trim();
  const price = Number(formData.get("price") ?? 0);
  const capacity = Number(formData.get("capacity") ?? 0);

  if (!title || !location || !startAtRaw || price < 0 || capacity <= 0) {
    throw new Error("Champs obligatoires invalides");
  }

  const startAt = new Date(startAtRaw);

  if (Number.isNaN(startAt.getTime())) {
    throw new Error("Date de début invalide");
  }

  await prisma.event.create({
    data: {
      title,
      location,
      startAt,
      price,
      capacity,
    },
  });

  revalidatePath("/admin/events");
}

async function deleteEvent(formData: FormData) {
  "use server";

  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  await prisma.event.delete({
    where: { id },
  });

  revalidatePath("/admin/events");
}

export default async function EventsPage() {
  const session = await getSession();

  if (!session) redirect("/login");
  if (session.role !== "ADMIN") redirect("/");

  const events = await prisma.event.findMany({
    orderBy: { startAt: "asc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Événements</h1>
        <p className="mt-1 text-sm text-slate-700">
          Créez et gérez les événements de l’académie.
        </p>
      </div>

      <form
        action={createEvent}
        className="max-w-xl space-y-5 rounded-2xl border border-slate-300 bg-slate-50 p-6 shadow-sm"
      >
        <div className="space-y-1.5">
          <label htmlFor="title" className="text-sm font-medium text-slate-900">
            Titre de l’événement
          </label>
          <input
            id="title"
            name="title"
            placeholder="Ex. Concert de fin d’année"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="location"
            className="text-sm font-medium text-slate-900"
          >
            Lieu
          </label>
          <input
            id="location"
            name="location"
            placeholder="Ex. Salle communale"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="startAt"
            className="text-sm font-medium text-slate-900"
          >
            Date et heure de début
          </label>
          <input
            id="startAt"
            name="startAt"
            type="datetime-local"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="price"
              className="text-sm font-medium text-slate-900"
            >
              Prix (en centimes)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min={0}
              placeholder="Ex. 1500"
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
              min={1}
              placeholder="Ex. 100"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-600 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Créer l’événement
        </button>
      </form>

      <div className="space-y-3">
        {events.length === 0 ? (
          <p className="text-sm text-slate-700">
            Aucun événement pour le moment.
          </p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-2xl border border-slate-300 bg-white px-4 py-4 shadow-sm"
            >
              <div>
                <p className="text-base font-semibold text-slate-950">
                  {event.title}
                </p>
                <p className="text-sm text-slate-700">{event.location}</p>
                <p className="text-sm text-slate-700">
                  Début :{" "}
                  {new Date(event.startAt).toLocaleString("fr-BE", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
                <p className="text-sm text-slate-700">
                  Prix : {(event.price / 100).toFixed(2)} € • Capacité :{" "}
                  {event.capacity}
                </p>
              </div>

              <form action={deleteEvent}>
                <input type="hidden" name="id" value={event.id} />
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