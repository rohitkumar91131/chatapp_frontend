import React, { useEffect, useState } from "react";
import { QrCodeScanner } from "react-simple-qr-code-scanner";
import { toast } from "react-toastify";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [result, setResult] = useState("");
  useEffect(()=>{
    async function sent_sessionId_to_server(){
      if(!result){
        return;
      }
      try{
        const res = await fetch(`${BACKEND_URL}/save_userId_To_session`,{
          method: "POST",
          credentials :"include",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify({result})
        });
        const data = await res.json();
        console.log(data);
      }
      catch(err){
        toast(err.message);
      }
    }

    sent_sessionId_to_server();
    console.log(result)
  },[result])
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
