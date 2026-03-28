import QRCode from "qrcode";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type GenerateTicketPdfParams = {
  qrCode: string;
  eventTitle?: string;
  buyerEmail: string;
};

export async function generateTicketPdf({
  qrCode,
  eventTitle = "Billet événement",
  buyerEmail,
}: GenerateTicketPdfParams): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const qrDataUrl = await QRCode.toDataURL(qrCode, {
    width: 300,
    margin: 1,
  });

  const qrImageBytes = Uint8Array.from(
    Buffer.from(qrDataUrl.split(",")[1], "base64")
  );

  const qrImage = await pdfDoc.embedPng(qrImageBytes);

  page.drawText("Votre billet", {
    x: 50,
    y: height - 70,
    size: 24,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Événement : ${eventTitle}`, {
    x: 50,
    y: height - 120,
    size: 14,
    font,
  });

  page.drawText(`Acheteur : ${buyerEmail}`, {
    x: 50,
    y: height - 145,
    size: 12,
    font,
  });

  page.drawText("Présentez ce QR code à l'entrée :", {
    x: 50,
    y: height - 190,
    size: 14,
    font,
  });

  page.drawImage(qrImage, {
    x: 50,
    y: height - 500,
    width: 220,
    height: 220,
  });

  page.drawText("Code de secours :", {
    x: 50,
    y: height - 540,
    size: 12,
    font: boldFont,
  });

  page.drawText(qrCode, {
    x: 50,
    y: height - 560,
    size: 10,
    font,
  });

  page.drawText(
    "Ce billet est personnel et ne peut être validé qu'une seule fois.",
    {
      x: 50,
      y: height - 610,
      size: 11,
      font,
    }
  );

  return await pdfDoc.save();
}