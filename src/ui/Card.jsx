import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useRef} from 'react'
import {ToastContainer,toast} from 'react-toastify'

export default function Login_Signup_Card({formName ,accountAlready}){
    const navigate = useNavigate();
    const [formData,setFormData] =useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const inputRef = useRef(null)
    const [passwordSame,setPasswordSame] = useState(true)
    const handleSubmit =async(e) =>{
        e.preventDefault();
        const {confirmPassword, ...dataToSend} = formData;
        try{
            let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${formName.toLowerCase()}`,{
                method:"POST",
                "credentials":"include",
                body : JSON.stringify(dataToSend),
                headers : {
                    "content-type" :"application/json"
                }
            });
            // if(!res.ok){
            //    throw new Error("Failed to connect server")  
            // }
            let data = await res.json();
            
            const toastMessage = data.msg;
            toast(toastMessage);
            if(formName === "login" && data.success){
                navigate("/")
            }
            if(formName === "signup" && data.success){
                toast(data.msg)
                navigate("/login");
            }
        }
        catch(err){
            let r = err.message;
            toast(r);
        }
    }
    const handleChange =(e) =>{
        setFormData(prev=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
    useEffect(()=>{
        if(formData.password && formData.confirmPassword) {
            setPasswordSame(formData.password === formData.confirmPassword)
        }
    },[formData.password,formData.confirmPassword])
    useEffect(()=>{
        inputRef.current.focus();
    },[])
    return (
        <form className="w-screen h-screen p-8  space-y-5 border border-3 "  onSubmit={handleSubmit} >
            <div >
               <h1 className="text-center font-bold text-lg">{formName} Form</h1>    
            </div>
            <div className="space-y-10 flex flex-col">
            <div className="flex flex-col h-[80%]">
                    <label 
                        htmlFor="name" 
                        className="peer-focus:text-red-500 transition-all"   
                    >    Your name
                    </label>
                    <input 
                        id="name" 
                        required
                        ref={inputRef}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="peer border border-black p-1 rounded-md focus:outline-none focus:ring focus:ring-black "
                    />
                </div>
                <div className="flex flex-col">
                    <label 
                        htmlFor="email" 
                        className="peer-focus:text-red-500 transition-all"   
                    >    Email
                    </label>
                    <input 
                        id="email" 
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="peer border border-black p-1 rounded-md focus:outline-none focus:ring focus:ring-black "
                    />
                </div>
                <div className="flex flex-col">
                    <label 
                        htmlFor="password" 
                        className="peer-focus:text-red-500 transition-all"   
                    >    Password
                    </label>
                    <input 
                        id="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="peer border border-black p-1 rounded-md focus:outline-none focus:ring focus:ring-black "
                    />
                </div>                
                <div className="flex flex-col">
                    <label 
                        htmlFor="confirm-password" 
                        className="peer-focus:text-red-500 transition-all"   
                    >    Confirm Password
                    </label>
                    <input 
                        id="confirm-password" 
                        required
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="peer border border-black p-1 rounded-md focus:outline-none focus:ring focus:ring-black "
                    />
                    <div className="h-5">
                    {
                        !passwordSame && <h1 className="text-red-600 font-semibold ">Password and confirm password are not same</h1>
                    }
                    </div>
                </div>
               <div className="flex gap-4">
               <button disabled={!passwordSame} className={`w-30 bg-red-500 border rounded-md p-3 ${!passwordSame ? "cursor-not-allowed opacity-50": "text-white" }`} >{formName}</button>
                {
                    formName === "login" && <Link className="w-30 bg-red-500 border rounded-md p-3 text-white flex items-center justify-center" to="/qr-login">Login via QRCode</Link>
                }
               </div>
                <ToastContainer position="top-right" autoClose={3000} />
                {
                    accountAlready ? 
                    <h1 className="text-sm">Already have an account <Link className="font-semibold text-red-500" to='/login'>Login here</Link> </h1> :
                    <h1 className="text-sm">Don't have an account <Link className="font-semibold text-red-500" to="/signup">Singup here </Link></h1>
                }
            </div>
        </form>
    ) 
}
