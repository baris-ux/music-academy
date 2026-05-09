"use server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendResetPasswordEmail } from "@/lib/email";

export type ForgotState = {
  error: string | null;
  success: string | null;
};

export async function requestPasswordReset(
  prevState: ForgotState,
  formData: FormData
): Promise<ForgotState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) return { error: "Email obligatoire.", success: null };

  const user = await prisma.user.findUnique({ where: { email } });

  // On ne révèle pas si l'email existe ou non
  if (!user) {
    return { error: null, success: "Si un compte existe, un email a été envoyé." };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 heure

  await prisma.user.update({
    where: { email },
    data: { resetToken: token, resetTokenExpiresAt: expiresAt },
  });

  await sendResetPasswordEmail({ to: email, token });

  return { error: null, success: "Si un compte existe, un email a été envoyé." };
}