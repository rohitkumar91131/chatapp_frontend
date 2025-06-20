import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function QR_CODE_LOGIN() {
    const [value , setValue] = useState("");
    useEffect(()=>{
      async function get_session_id(){
        try{
           const res = await fetch(`${BACKEND_URL}/generate_session_id`);
           const data = await res.json();
           if(!data.success){
            return;
           }
           if(data.success){
            setValue(data.sessionId)
           }
        }
        catch(err){
          toast("Try another login method")
        }
      }
      get_session_id();  
    },[])
    if(!value){
      return <p>Loading</p>
    }
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <div style={{ height: "auto", maxWidth: 256, width: "100%" }}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={value}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    );
}

