import { NextResponse } from "next/server";
import argon2 from "argon2";
import { prisma } from "@/lib/prisma";
import logger from "@/lib/logger";

const SESSION_COOKIE = "session_v3";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      logger.warn({ email }, "Tentative de connexion avec champs manquants");
      return NextResponse.json(
        { error: "Email et mot de passe requis." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      logger.warn({ email }, "Tentative de connexion avec email inconnu");
      return NextResponse.json(
        { error: "Identifiants invalides." },
        { status: 401 }
      );
    }

    if (!user.passwordHash) {
      logger.warn({ email }, "Tentative de connexion sur un compte non activé");
      return NextResponse.json(
        { error: "Compte non activé. Vérifiez votre email pour activer votre compte." },
        { status: 401 }
      );
    }

    const isValidPassword = await argon2.verify(user.passwordHash, password);

    if (!isValidPassword) {
      logger.warn({ email }, "Tentative de connexion avec mauvais mot de passe");
      return NextResponse.json(
        { error: "Identifiants invalides." },
        { status: 401 }
      );
    }

    const sessionPayload = JSON.stringify({
      userId: user.id,
      role: user.role,
      email: user.email,
    });

    const response = NextResponse.json({
      success: true,
      role: user.role,
    });

    response.cookies.set(SESSION_COOKIE, sessionPayload, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {

    logger.error({ error }, "Erreur inattendue lors de la connexion");

    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}