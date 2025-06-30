import React, { useEffect, useState } from "react";
import { QrCodeScanner } from "react-simple-qr-code-scanner";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function QRScannerPage() {
  const [result, setResult] = useState("");

  useEffect(() => {
    async function sendSessionIdToServer() {
      if (!result) return;

      try {
        const res = await fetch(`${BACKEND_URL}/save_userId_To_session`, {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ result }),
        });
        const data = await res.json();
        if (!data.success) toast(data.msg);
        else toast("✅ Login approved!");
      } catch (err) {
        toast(err.message);
      }
    }

    sendSessionIdToServer();
  }, [result]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-white to-blue-50">
      <div className="flex items-center gap-2 mb-6">
        <img src="/logo.svg" alt="logo" className="w-10 h-10" />
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">Vartalaap</h1>
      </div>

      <div className="w-full max-w-sm p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">Scan QR Code</h2>
        <QrCodeScanner
          onResult={(scannedText) => {
            if (scannedText && !result) {
              setResult(scannedText);
            }
          }}
          onError={(error) => {
            toast("Scanner error: " + error.message);
          }}
          facingMode="environment"
        />
        <p className="text-sm mt-4 text-center text-gray-600 break-all">
          Scanned: <span className="font-medium">{result || "Waiting..."}</span>
        </p>
      </div>
    </div>
  );
}
