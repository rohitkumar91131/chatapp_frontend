import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'
export default function Home(){
    const [user,setUser ] = useState([]);
    async function verify(){
        let res = await fetch("https://authentication-backend-kappa.vercel.app/verifyToken",{
            method :"GET",
            credentials :'include'
        });
        let data = await res.json();
        setUser(data);
        toast(data.msg);
    }
    const handleClick =()=>{
        verify();
    }
    const handleLogout = async()=>{
      try{
            let res =  await fetch("https://authentication-backend-kappa.vercel.app/logout",{
               method : "POST",
              credentials : "include"
           });
           let data = await res.json();
           toast(data.msg)
      }
      catch(err){
        console.log(err)
      }
    
    }
    return (
        <div className="w-screen h-screen p-10">
          <h1 className="text-center">Create Your Online Account</h1>
          <div className="flex flex-col mt-20 text-center">
              <h1>Already have an account <Link to="/login" className="font-semibold text-red-500">Login</Link></h1>
              <h2>Don't have an account <Link to="/signup" className="font-semibold text-red-500">Signup</Link></h2>
          </div>
          <button className="border bg-pink-500 w-40 h-30 " onClick={handleClick}>
            Tap on this 
          </button>
          {
            JSON.stringify(user)
          }

          <div>
              <button className="border bg-red-500 p-3 " onClick={handleLogout}>Logout button</button>
          </div>
          <ToastContainer position="top-right" autoClose={3000}/>
        </div>
    )
}
