"use server";

import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import argon2 from "argon2";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    throw new Error("Email et mot de passe obligatoires");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  const validPassword = await argon2.verify(user.passwordHash, password);

  if (!validPassword) {
    throw new Error("Mot de passe incorrect");
  }

  console.log("[login] user found =", user.email, user.role);

  await createSession({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    success: true,
    role: user.role,
  };
}