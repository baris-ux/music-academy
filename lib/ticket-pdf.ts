import QRCode from "qrcode";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type GenerateTicketPdfParams = {
  qrCode: string;
  eventTitle?: string;
  buyerEmail: string;
  eventDate?: string;
  eventLocation?: string;
};

export async function generateTicketPdf({
  qrCode,
  eventTitle = "Concert de l'académie",
  buyerEmail,
  eventDate = "Samedi 15 juin 2026 · 20:00",
  eventLocation = "Salle de spectacle",
}: GenerateTicketPdfParams): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Palette
  const navy = rgb(0.09, 0.14, 0.33);
  const blue = rgb(0.18, 0.35, 0.78);
  const gold = rgb(0.93, 0.75, 0.33);
  const lightBg = rgb(0.96, 0.97, 0.99);
  const cardBg = rgb(1, 1, 1);
  const softGray = rgb(0.55, 0.58, 0.64);
  const text = rgb(0.15, 0.17, 0.22);
  const border = rgb(0.88, 0.9, 0.94);

  // Fond général
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: lightBg,
  });

  // Halo décoratif haut
  page.drawRectangle({
    x: 0,
    y: height - 180,
    width,
    height: 180,
    color: rgb(0.9, 0.93, 1),
  });

  // Carte principale + ombre
  const cardX = 45;
  const cardY = 70;
  const cardW = width - 90;
  const cardH = height - 140;

  page.drawRectangle({
    x: cardX + 6,
    y: cardY - 6,
    width: cardW,
    height: cardH,
    color: rgb(0.85, 0.88, 0.94),
    opacity: 0.35,
  });

  page.drawRectangle({
    x: cardX,
    y: cardY,
    width: cardW,
    height: cardH,
    color: cardBg,
    borderColor: border,
    borderWidth: 1,
  });

  // Bandeau header
  page.drawRectangle({
    x: cardX,
    y: cardY + cardH - 110,
    width: cardW,
    height: 110,
    color: navy,
  });

  page.drawRectangle({
    x: cardX,
    y: cardY + cardH - 110,
    width: 10,
    height: 110,
    color: gold,
  });

  page.drawText("ACADÉMIE DE MUSIQUE", {
    x: cardX + 28,
    y: cardY + cardH - 45,
    size: 20,
    font: bold,
    color: rgb(1, 1, 1),
  });

  page.drawText("Billet officiel", {
    x: cardX + 28,
    y: cardY + cardH - 70,
    size: 11,
    font,
    color: rgb(0.9, 0.92, 1),
  });

  // Badge à droite
  page.drawRectangle({
    x: cardX + cardW - 125,
    y: cardY + cardH - 72,
    width: 85,
    height: 28,
    color: blue,
  });

  page.drawText("ENTRÉE", {
    x: cardX + cardW - 101,
    y: cardY + cardH - 62,
    size: 11,
    font: bold,
    color: rgb(1, 1, 1),
  });

  // Titre principal
  page.drawText(eventTitle.toUpperCase(), {
    x: cardX + 28,
    y: cardY + cardH - 155,
    size: 24,
    font: bold,
    color: text,
    maxWidth: cardW - 56,
  });

  // Ligne déco
  page.drawRectangle({
    x: cardX + 28,
    y: cardY + cardH - 170,
    width: 70,
    height: 4,
    color: gold,
  });

  // Bloc infos
  const infoTopY = cardY + cardH - 220;

  page.drawText("Date", {
    x: cardX + 28,
    y: infoTopY,
    size: 11,
    font: bold,
    color: softGray,
  });

  page.drawText(eventDate, {
    x: cardX + 28,
    y: infoTopY - 18,
    size: 13,
    font,
    color: text,
  });

  page.drawText("Lieu", {
    x: cardX + 28,
    y: infoTopY - 55,
    size: 11,
    font: bold,
    color: softGray,
  });

  page.drawText(eventLocation, {
    x: cardX + 28,
    y: infoTopY - 73,
    size: 13,
    font,
    color: text,
  });

  page.drawText("Acheteur", {
    x: cardX + 28,
    y: infoTopY - 110,
    size: 11,
    font: bold,
    color: softGray,
  });

  page.drawText(buyerEmail, {
    x: cardX + 28,
    y: infoTopY - 128,
    size: 13,
    font,
    color: text,
    maxWidth: 240,
  });

  // Encadré QR
  const qrBoxX = cardX + cardW - 235;
  const qrBoxY = cardY + cardH - 470;
  const qrBoxSize = 185;

  page.drawRectangle({
    x: qrBoxX - 16,
    y: qrBoxY - 16,
    width: qrBoxSize + 32,
    height: qrBoxSize + 50,
    color: rgb(0.98, 0.99, 1),
    borderColor: border,
    borderWidth: 1,
  });

  page.drawText("SCAN D'ACCÈS", {
    x: qrBoxX + 28,
    y: qrBoxY + qrBoxSize + 12,
    size: 11,
    font: bold,
    color: blue,
  });

  const qrDataUrl = await QRCode.toDataURL(qrCode, {
    width: 500,
    margin: 1,
    color: {
      dark: "#1A2454",
      light: "#FFFFFF",
    },
  });

  const qrImageBytes = Uint8Array.from(
    Buffer.from(qrDataUrl.split(",")[1], "base64")
  );

  const qrImage = await pdfDoc.embedPng(qrImageBytes);

  page.drawImage(qrImage, {
    x: qrBoxX,
    y: qrBoxY,
    width: qrBoxSize,
    height: qrBoxSize,
  });

  // Ligne de séparation type ticket
  const sepY = cardY + 210;
  for (let i = 0; i < 34; i++) {
    page.drawLine({
      start: { x: cardX + 25 + i * 15, y: sepY },
      end: { x: cardX + 33 + i * 15, y: sepY },
      thickness: 1,
      color: border,
    });
  }

  // Effet perforation latérale
  for (const cy of [sepY]) {
    page.drawCircle({
      x: cardX,
      y: cy,
      size: 8,
      color: lightBg,
      borderColor: border,
      borderWidth: 1,
    });

    page.drawCircle({
      x: cardX + cardW,
      y: cy,
      size: 8,
      color: lightBg,
      borderColor: border,
      borderWidth: 1,
    });
  }

  // Code de secours
  page.drawText("Code de secours", {
    x: cardX + 28,
    y: sepY - 45,
    size: 11,
    font: bold,
    color: softGray,
  });

  page.drawRectangle({
    x: cardX + 28,
    y: sepY - 88,
    width: cardW - 56,
    height: 34,
    color: rgb(0.98, 0.99, 1),
    borderColor: border,
    borderWidth: 1,
  });

  page.drawText(qrCode, {
    x: cardX + 40,
    y: sepY - 76,
    size: 12,
    font: bold,
    color: navy,
    maxWidth: cardW - 80,
  });

  // Message d'information
  page.drawText(
    "Présentez ce QR code à l'entrée. Ce billet est personnel, unique et valable une seule fois.",
    {
      x: cardX + 28,
      y: sepY - 125,
      size: 11,
      font,
      color: softGray,
      maxWidth: cardW - 56,
      lineHeight: 14,
    }
  );

  // Footer
  page.drawLine({
    start: { x: cardX + 28, y: cardY + 45 },
    end: { x: cardX + cardW - 28, y: cardY + 45 },
    thickness: 1,
    color: border,
  });

  page.drawText("Merci pour votre achat", {
    x: cardX + 28,
    y: cardY + 24,
    size: 12,
    font: bold,
    color: navy,
  });

  page.drawText("Académie de Musique · Billet numérique sécurisé", {
    x: cardX + cardW - 220,
    y: cardY + 24,
    size: 10,
    font,
    color: softGray,
  });

  return await pdfDoc.save();
}