import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendInvitationEmail({
  to,
  firstName,
  token,
}: {
  to: string;
  firstName: string;
  token: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY manquant — email non envoyé");
    return;
  }

  const lien = `${process.env.NEXT_PUBLIC_APP_URL}/activation?token=${token}`;

  console.log("Envoi email à:", to);
  console.log("Lien:", lien);

  const result = await resend.emails.send({
    from: "Académie de Musique <onboarding@resend.dev>",
    to,
    subject: "Bienvenue — Activez votre compte",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
        <h2>Bonjour ${firstName},</h2>
        <p>Votre demande d'inscription à l'Académie de Musique a été acceptée.</p>
        <p>Cliquez sur le bouton ci-dessous pour choisir votre mot de passe et accéder à votre espace étudiant :</p>
        <a href="${lien}" style="display:inline-block;margin-top:16px;background:#0f172a;color:white;padding:12px 24px;border-radius:10px;text-decoration:none;font-size:14px;">
          Activer mon compte
        </a>
        <p style="margin-top:24px;font-size:12px;color:#94a3b8;">
          Ce lien expire dans 48 heures. Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.
        </p>
      </div>
    `,
  });

  console.log("Résultat Resend:", result);
}