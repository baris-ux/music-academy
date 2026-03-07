import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function AdminPage() {
  const session = await getSession();

  if (!session) redirect("/login");
  if (session.role !== "ADMIN") redirect("/");

  return (
    <main className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Administration</h1>
        <p className="text-sm text-gray-600">
          Connecté en tant que {session.email}
        </p>
      </div>

      <div className="space-y-3">
        <Link href="/admin/students" className="block border rounded p-4">
          Gérer les étudiants
        </Link>
        <Link href="/admin/courses" className="block border rounded p-4">
          Gérer les cours
        </Link>
        <Link href="/admin/enrollments" className="block border rounded p-4">
          Gérer les inscriptions
        </Link>
	<Link href="/logout" className="inline-block border rounded px-4 py-2">
 	  Se déconnecter
	</Link>
      </div>
    </main>
  );
}
