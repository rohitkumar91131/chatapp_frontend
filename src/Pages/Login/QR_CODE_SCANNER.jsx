import { useState } from "react";
import { QrCodeScanner } from "react-simple-qr-code-scanner";

export default function App() {
  const [scannedData, setScannedData] = useState("");

  return (
    <div>
      <QrCodeScanner
        onResult={(result, rawResult) => {
          if (result) {
            setScannedData(result);  // Save to state
            console.log("Scanned:", result);
          }
        }}
        onError={(error) => {
          console.error("Scanner Error:", error);
        }}
        facingMode={"environment"}
      />

      <h2>Scanned Result:</h2>
      <p>{scannedData || "No QR code scanned yet"}</p>
    </div>
  );
}
