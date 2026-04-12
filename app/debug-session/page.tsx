import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function DebugSessionPage() {
  const cookieStore = await cookies();
  const rawCookie = cookieStore.get("session_v3")?.value ?? null;
  const session = await getSession();

  return (
    <main className="min-h-screen p-6">
      <h1 className="mb-6 text-2xl font-bold">Debug session</h1>

      <div className="space-y-6">
        <section>
          <h2 className="mb-2 text-lg font-semibold">Cookie brut</h2>
          <pre className="rounded-xl border p-4 whitespace-pre-wrap">
            {rawCookie ?? "null"}
          </pre>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold">Session parsée</h2>
          <pre className="rounded-xl border p-4 whitespace-pre-wrap">
            {JSON.stringify(session, null, 2)}
          </pre>
        </section>
      </div>
    </main>
  );
}