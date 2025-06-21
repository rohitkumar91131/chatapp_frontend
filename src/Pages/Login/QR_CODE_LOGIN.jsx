import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { Link, useNavigate } from "react-router-dom";

export default function QR_CODE_LOGIN() {
    const [value , setValue] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{

      async function get_session_id(){
        try{
           const res = await fetch(`${BACKEND_URL}/generate_session_id`,{
            method : "GET",
            "credentials" : "include"
           });
           const data = await res.json();
           if(!data.success){
             toast(data.msg)
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
    },[]);
    useEffect(()=>{

      async function check_login_status(){
        if(!value){
          return;
        }

        try{
          const res = await fetch(`${BACKEND_URL}/poll-login`,{
            method : "POST",
            "credentials" : "include",
            headers : {
              "content-type" :"application/json"
            },
            body : JSON.stringify({"result" : value})
          });
          const data = await res.json();
          console.log(data);
          
          
          if(data.success){
            toast(data.msg);
            navigate("/");
          }
          
        }
        catch(err){
          toast(err.message)
        }
      }
      
      const interval = setInterval(()=>{
        check_login_status()
        console.log("Polling request")
      },2000)

      return ()=>{
        clearInterval(interval)
      }
    },[value])
    if(!value){
      return <p>Loading</p>
    }
    return (
      <div style={{ display: "flex",flexDirection : "column",gap:4, justifyContent: "center", alignItems: "center", marginTop: "2rem" }}>
         <p className="text-3xl font-bold text-center mt-4">
             Log in via QR Code
         </p>        
         <div style={{ height: "auto", maxWidth: 256, width: "100%" }}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={value}
            viewBox={`0 0 256 256`}
          />
        </div>
        <p>Scan the Qr code from a logged in device to login </p>
        <Link to="/login" className="!p-2 bg-blue-500 rounded-md">Login via email@</Link>
      </div>
    );
}

