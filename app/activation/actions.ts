"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import argon2 from "argon2";

export async function activerCompte(formData: FormData) {
  const token = String(formData.get("token") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const confirm = String(formData.get("confirm") ?? "").trim();

  if (!token || !password || !confirm) {
    throw new Error("Champs obligatoires manquants");
  }

  if (password !== confirm) {
    throw new Error("Les mots de passe ne correspondent pas");
  }

  if (password.length < 8) {
    throw new Error("Le mot de passe doit faire au moins 8 caractères");
  }

  const user = await prisma.user.findUnique({
    where: { invitationToken: token },
  });

  if (!user) {
    throw new Error("Lien invalide");
  }

  if (!user.tokenExpiresAt || new Date() > user.tokenExpiresAt) {
    throw new Error("Lien expiré");
  }

  const passwordHash = await argon2.hash(password);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash,
      isActive: true,
      invitationToken: null,
      tokenExpiresAt: null,
    },
  });

  redirect("/login");
}