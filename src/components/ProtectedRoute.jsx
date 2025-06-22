import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ProtectedRoute ({children}){
    const navigate = useNavigate();
    useEffect(()=>{
        async function check_Authentication (){
            try{
                let res = await fetch(`${BACKEND_URL}/chat/verifyLogin`,{
                    method : "GET",
                    credentials : "include"
                })
                let data = await res.json();
                console.log(data)
                if(data.success){
                    navigate("/");
                }
                else{
                    toast(data.msg);
                    navigate("/login")
                }
            }
            catch(err){
                toast("😵‍💫 500 Server Error")
                toast(err.message)
            }
        }
        check_Authentication();
    },[])
    return (
        <div>
            {children}
        </div>
    )
}