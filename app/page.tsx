import { prisma } from "../lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();
  const courses = await prisma.course.findMany();

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Music Academy</h1>

      <h2>Base de données connectée ✅</h2>

      <p>Nombre d'utilisateurs : {users.length}</p>
      <p>Nombre de cours : {courses.length}</p>
    </main>
  );
}

