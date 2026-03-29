"use client";

import { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";

export default function ScanPage() {
  const [message, setMessage] = useState("En attente d’un scan...");
  const [isLoading, setIsLoading] = useState(false);
  const [lastCode, setLastCode] = useState("");
  const [debugError, setDebugError] = useState("");

  const isProcessingRef = useRef(false);
  const lastScannedRef = useRef("");
  const cooldownRef = useRef<NodeJS.Timeout | null>(null);

  async function validateTicket(qrCode: string) {
    if (!qrCode) return;

    if (isProcessingRef.current) return;
    if (qrCode === lastScannedRef.current) return;

    isProcessingRef.current = true;
    lastScannedRef.current = qrCode;

    setIsLoading(true);
    setLastCode(qrCode);
    setMessage("Validation du billet...");

    try {
      const res = await fetch(`/api/ticket/validate/${encodeURIComponent(qrCode)}`);
      const data = await res.json();

      if (data.status === "VALID") {
        setMessage(`✅ ${data.message}`);
      } else if (data.status === "ALREADY_USED") {
        setMessage(`⚠️ ${data.message}`);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch {
      setMessage("❌ Erreur pendant la validation");
    } finally {
      setIsLoading(false);
      isProcessingRef.current = false;

      if (cooldownRef.current) {
        clearTimeout(cooldownRef.current);
      }

      cooldownRef.current = setTimeout(() => {
        lastScannedRef.current = "";
        setLastCode("");
      }, 2000);
    }
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Scan des tickets</h1>
      <p className="mb-4">Scanne le QR code d’un billet avec la caméra.</p>

      <div className="rounded-xl border overflow-hidden bg-black">
        <div className="w-full aspect-video">
          <QrReader
            constraints={{ facingMode: { ideal: "environment" } }}
            onResult={(result, error) => {
              if (result) {
                validateTicket(result.getText());
              }

              if (error) {
                console.log("Erreur scanner :", error);
                setDebugError(String(error));
              }
            }}
            videoContainerStyle={{
              width: "100%",
              height: "100%",
              paddingTop: "0",
              position: "relative",
            }}
            containerStyle={{
              width: "100%",
              height: "100%",
            }}
            videoStyle={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>

      <div className="mt-4 rounded-lg border p-4">
        <strong>Résultat :</strong>
        <p className="mt-2">{message}</p>
      </div>

      {lastCode && (
        <div className="mt-4 rounded-lg border p-4">
          <strong>Dernier QR lu :</strong>
          <p className="mt-2 break-words text-sm">{lastCode}</p>
        </div>
      )}

      {debugError && (
        <div className="mt-4 rounded-lg border p-4">
          <strong>Debug caméra :</strong>
          <p className="mt-2 break-words text-sm">{debugError}</p>
        </div>
      )}
    </main>
  );
}