import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe obligatoires" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404 }
      );
    }

    const validPassword = await argon2.verify(user.passwordHash, password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      role: user.role,
    });

    response.cookies.set("session_v3", JSON.stringify({
      userId: user.id,
      email: user.email,
      role: user.role,
    }), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("[api/login] error =", error);

    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}