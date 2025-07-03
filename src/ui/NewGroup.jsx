import { UserPlus, AlignLeft, ArrowLeft } from "lucide-react";
import { CloseCreateForm } from "./gsap";
import { useSocket } from "../context/Socket/SocketContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function NewGroupForm() {

  const socket = useSocket();
  useEffect(()=>{
    socket.on("new-room-created",(data)=>{
      console.log(data)
    })
  },[])
  const [formData ,setFormData ] = useState({
    groupName : "",
    groupDescription : ""
  })
    const handleReturnForm = ()=>{
        CloseCreateForm();
    }
    const handleNewFormSubmit = (e)=>{
      e.preventDefault();
      socket.emit("create-new-group",formData ,(response)=>{
        console.log(response);
        if(response){
           toast(response)
        }
      });
      
    }
    const handleInputChange = (e)=>{
      const { name , value } = e.target;
      setFormData(prev=>({
        ...prev,
        [name] : value
      }))
      console.log(formData)
    }
  return (
    <form 
      className="relative max-w-lg mx-auto backdrop-blur-xl bg-white/5 border border-black/20 p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] space-y-8 text-black"
      onSubmit={handleNewFormSubmit}
    >

      <button
        type="button"
        onClick={handleReturnForm} 
        className="absolute top-4 left-4 flex items-center gap-1 text-sm text-black hover:underline hover:scale-105 transition"
      >
        <ArrowLeft size={16} />
        Return
      </button>

      <h2 className="text-3xl font-bold text-center text-black tracking-wide">
        ✨ Create New Group
      </h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium flex items-center gap-2">
          <UserPlus size={16} />
          Group Name
        </label>
        <input
          type="text"
          placeholder="e.g. Friends Forever"
          name="groupName"
          required
          value={formData.groupName}
          onChange={ handleInputChange}
          className="w-full px-4 py-3 text-black bg-white/10 border border-black/30 rounded-xl placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium flex items-center gap-2">
          <AlignLeft size={16} />
          Group Description
        </label>
        <textarea
          rows={4}
          required
          placeholder="What's this group about?"
          name="groupDescription"
          value={formData.groupDescription}
          onChange={ handleInputChange}
          className="w-full px-4 py-3 text-black bg-black/10 border border-black/30 rounded-xl placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-xl text-black font-semibold hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-lg"
      >
        {/* {
          JSON.stringify(formData)
        } */}
        🚀 Create Group
      </button>
    </form>
  );
}
