import { useState } from "react";
import { CloseTextStatusForm } from "../../ui/gsap"
import {useSocket} from '../../context/Socket/SocketContext'
function StatusForm() {
    const [statusMessage , setStatusMessage] = useState("");
    const [addingStatusMsg , setAddingStatusMsg] = useState("Add to status");
    const socket = useSocket(); 
    const handleTextStatusSubmit = (e)=>{
        e.preventDefault();
        socket.emit("add-text-to-status",statusMessage,(response)=>{
            if(response.success){
                setAddingStatusMsg("Added");
                CloseTextStatusForm();
                //setAddingStatusMsg("Add to status")
            }
            else{
                setAddingStatusMsg("Fail to add your status");
                CloseTextStatusForm();
            }
            setAddingStatusMsg("Add to status")
        });
        setAddingStatusMsg("Adding")
    }
    const handleInputChange = (e) =>{
        setStatusMessage(e.target.value);
    }
    return (
      <form className="w-80 h-52 bg-white rounded-xl shadow-md p-5 flex flex-col justify-between"
            onSubmit={handleTextStatusSubmit}
      >
        <button
          type="button"
          className="text-sm text-gray-500 hover:text-gray-700 self-start mb-2"
          onClick={CloseTextStatusForm}
        >
          ← Return
        </button>
  
        <input
          type="text"
          placeholder="What's on your mind?"
          value={statusMessage}
          name="statusMessage"
          onChange={(e)=>handleInputChange(e)}
          className="w-full !p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition text-sm"
        />
  
        <button
          type="submit"
          className={`w-full py-2 rounded-md text-sm transition font-medium 
            ${statusMessage.trim()
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"}
            `}
          disabled={!statusMessage.trim()}
        >
          {
            addingStatusMsg
          }
        </button>
      </form>
    )
  }
  
  export default StatusForm
  