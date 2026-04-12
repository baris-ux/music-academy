import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function DebugSessionPage() {
  const cookieStore = await cookies();

  return (
    <main style={{ padding: 24 }}>
      <h1>Debug session</h1>
      <pre>{JSON.stringify(cookieStore.getAll(), null, 2)}</pre>
    </main>
  );
}