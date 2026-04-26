import { prisma } from "@/lib/prisma";
import InscriptionForm from "./InscriptionForm";

export default async function InscriptionPage() {
  const cours = await prisma.course.findMany({
    orderBy: { title: "asc" },
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-950">
            Demande d'inscription
          </h1>
          <p className="mt-1 text-sm text-slate-700">
            Remplissez ce formulaire pour rejoindre l'académie. Nous reviendrons
            vers vous après examen de votre demande.
          </p>
        </div>
        <InscriptionForm cours={cours} />
      </div>
    </div>
  );
}