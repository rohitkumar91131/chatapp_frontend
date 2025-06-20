import React, { useState } from "react";
import { QrCodeScanner } from "react-simple-qr-code-scanner";

export default function App() {
  const [result, setResult] = useState("");

  return (
    <div>
      <h1>QR Scanner</h1>
      <QrCodeScanner
        onResult={(scannedText, rawResult) => {
          if (scannedText && !result) {
            setResult(scannedText);
            console.log("Scanned result:", scannedText);
          }
        }}
        onError={(error) => {
          console.error("Scanner Error:", error);
        }}
        facingMode="environment"
      />
      <p>Scanned Result: {result}</p>
    </div>
  );
}
