"use server";
import { sendContactEmail } from "@/lib/email";

export type ContactFormState = {
  error: string | null;
  success: string | null;
};

export async function submitContact(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "Tous les champs sont obligatoires.", success: null };
  }

  try {
    await sendContactEmail({ name, email, message });
    return { error: null, success: "Votre message a bien été envoyé !" };
  } catch {
    return { error: "Une erreur est survenue. Veuillez réessayer.", success: null };
  }
}