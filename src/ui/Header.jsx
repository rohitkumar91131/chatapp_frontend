import { useState } from "react";
import { CloseSetting, CreateGroupFormRef, OpenCreateGroupForm, OpenSetting, settingRef } from "./gsap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NewGroupForm from "./NewGroup";

export default function Header() {
  const [isOpenSetting , setIsOpenSetting] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const handleOpenSetting = () =>{
    if(!settingRef.current){
      alert("Setting Not Ready ");
      return;
    }
    if(isOpenSetting){
      CloseSetting();
      setIsOpenSetting(false)
    }
    else{
      OpenSetting(settingRef.current);
      setIsOpenSetting(true);
    }
  }
  const handleLogout = async()=>{
    try{
      let res = await fetch(`${BACKEND_URL}/logout`,{
        method : "POST",
        credentials : "include"
      })
      const data = await res.json();
      console.log(data);
      if(data.success){
        toast("Log out successful");
        navigate("/home");
      }
      else{
        toast("Error in logout ");
      }
    }
    catch(err){
      toast(err.message)
    }
  }
  const handleCreateGroup = ()=>{
    CloseSetting();
    OpenCreateGroupForm(CreateGroupFormRef.current);
   
  }
  return (
    <div className="flex h-[70px] w-full justify-around items-center relative ">
        <div className="flex items-center gap-2">
        <img src="logo.svg"  className="w-[50px] h-[50px]"/>
        <p className="text-black text-3xl font-semibold">Vartalaap</p>
        </div>
        <div className="">
            <img 
                src="setting.svg" 
                className="w-[50px] h-[50px]" 
                onClick={handleOpenSetting}
            />
            <div className="absolute right-3  h-fit w-fit flex flex-col gap-3 bg-green-500 !p-4 rounded-md  opacity-0 invisible" ref={settingRef}>
              <p 
                  className="flex gap-2 hover:border hover:border-black !p-2 hover:rounded-md" 
                  onClick={handleCreateGroup}
              ><img src="addGroup.svg" />New group</p>
              <button 
                  className="flex gap-2 hover:border hover:border-black !p-2 hover:rounded-md"
                  onClick={handleLogout}
              ><img src="logout.svg" /> Logout </button>
            </div>
            <div ref={CreateGroupFormRef} className=" opacity-0 invisible  absolute right-1 ">
              <NewGroupForm/>
            </div>
        </div>
      
    </div>
  )
}

