import QRCode from "qrcode";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type GenerateTicketPdfParams = {
  qrCode: string;
  eventTitle?: string;
  buyerEmail: string;
};

export async function generateTicketPdf({
  qrCode,
  eventTitle = "Concert de l'académie",
  buyerEmail,
}: GenerateTicketPdfParams): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // 🎨 Couleurs
  const primary = rgb(0.1, 0.2, 0.6);
  const gray = rgb(0.5, 0.5, 0.5);

  // 🎵 Header
  page.drawRectangle({
    x: 0,
    y: height - 100,
    width,
    height: 100,
    color: primary,
  });

  page.drawText("ACADÉMIE DE MUSIQUE", {
    x: 50,
    y: height - 50,
    size: 18,
    font: bold,
    color: rgb(1, 1, 1),
  });

  // 🎟️ Titre billet
  page.drawText("BILLET D'ÉVÉNEMENT", {
    x: 50,
    y: height - 140,
    size: 22,
    font: bold,
  });

  // 📍 Infos
  page.drawText(`Événement : ${eventTitle}`, {
    x: 50,
    y: height - 180,
    size: 14,
    font,
  });

  page.drawText(`Acheteur : ${buyerEmail}`, {
    x: 50,
    y: height - 200,
    size: 12,
    font,
    color: gray,
  });

  // 🔲 QR code
  const qrDataUrl = await QRCode.toDataURL(qrCode, {
    width: 300,
    margin: 1,
  });

  const qrImageBytes = Uint8Array.from(
    Buffer.from(qrDataUrl.split(",")[1], "base64")
  );

  const qrImage = await pdfDoc.embedPng(qrImageBytes);

  const qrSize = 220;

  page.drawImage(qrImage, {
    x: (width - qrSize) / 2,
    y: height - 500,
    width: qrSize,
    height: qrSize,
  });

  // 🔐 Code texte
  page.drawText("Code de secours :", {
    x: 50,
    y: height - 520,
    size: 12,
    font: bold,
  });

  page.drawText(qrCode, {
    x: 50,
    y: height - 540,
    size: 10,
    font,
  });

  // ⚠️ Info
  page.drawText(
    "Présentez ce QR code à l'entrée. Ce billet est unique et valable une seule fois.",
    {
      x: 50,
      y: height - 580,
      size: 11,
      font,
      color: gray,
      maxWidth: 500,
    }
  );

  // 🧾 Footer
  page.drawLine({
    start: { x: 50, y: 100 },
    end: { x: width - 50, y: 100 },
    thickness: 1,
    color: gray,
  });

  page.drawText("Merci pour votre achat", {
    x: 50,
    y: 80,
    size: 12,
    font,
  });

  return await pdfDoc.save();
}