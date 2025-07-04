import { useState } from "react";
import { CloseNotification, CloseSetting, CreateGroupFormRef, NotificationRef, OpenCreateGroupForm, OpenNotification, OpenSetting, settingRef } from "./gsap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NewGroupForm from "./NewGroup";
import { Bell, Inbox } from 'lucide-react';
import Notification from "./Notification";

export default function Header() {
  const [isOpenSetting , setIsOpenSetting] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [isOpenNotification , setIsOpenNotification] = useState(false);

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
  const handleONOFFNotification = () =>{
      if(isOpenNotification){
        OpenNotification(NotificationRef.current);
        setIsOpenNotification(!isOpenNotification);
      }
      else{
        CloseNotification();
        setIsOpenNotification(!isOpenNotification);
      }
    

  }
  return (
    <div className="flex h-[70px] w-full justify-around items-center relative ">
        <div className="flex items-center gap-2">
        <img src="logo.svg"  className="w-[50px] h-[50px]"/>
        <p className="text-black text-3xl font-semibold">Vartalaap</p>
        </div>
        <div className=" gap-2">
          <div className="flex items-center gap-2">
            <div onClick={handleONOFFNotification}>
            <Bell className="w-6 h-6 text-gray-700 bg-red-500" />
            </div>  
            <img 
                src="setting.svg" 
                className="w-[50px] h-[50px]" 
                onClick={handleOpenSetting}
            />
          </div>
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
            <div ref={NotificationRef} className="opacity-0 invisible absolute right-1">
              <Notification/>
            </div>
        </div>
      
    </div>
  )
}

