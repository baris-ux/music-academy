"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function soumettreInscription(formData: FormData) {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!firstName || !lastName || !email) {
    throw new Error("Champs obligatoires manquants");
  }

  const existing = await prisma.inscriptionRequest.findUnique({
    where: { email },
  });

  if (existing) {
    throw new Error("Une demande existe déjà pour cet email");
  }

  await prisma.inscriptionRequest.create({
    data: {
      firstName,
      lastName,
      email,
      phoneNumber: phoneNumber || null,
      message: message || null,
    },
  });

  redirect("/inscription/confirmation");
}