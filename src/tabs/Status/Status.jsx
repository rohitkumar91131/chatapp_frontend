import { useEffect, useState } from "react"
import StatusHeader from "./StatusHeader"
import { useSocket } from "../../context/Socket/SocketContext";
import StatusShower from "./StatusShower";
import { useStatus } from "./StatusContext";
import { showStatusShower, statusShowerRef } from "../../ui/gsap";
import StatusForm from "./StatusForm";

function Status() {
  const [myStatus, setMyStatus] = useState([]);
  const [myDetails , setMyDetails ]= useState(""); 
  const [friendStatus, setFriendStatus] = useState([]);
  const { setStatus } = useStatus();
  const socket = useSocket();
  const [showForm, setShowForm] = useState(false);

  useEffect(()=>{
    socket.emit("get-my-details-for-status",{},(response)=>{
      setMyDetails(response?.user);
    })
    socket.emit("get-friend-status-overview",{},(response)=>{
      if(response.success){
        if(response.msg === "No status of friends"){
          setFriendStatus([]);
          return;
        }
        setFriendStatus(response?.friends);
      }
    })
  },[])

  const handleMyStatusClick = ()=>{
    socket.emit("get-all-my-status",{},(response)=>{
      if(response.success){
        setMyStatus(response.allStatus);
        if (response.allStatus.length === 0) {
          setShowForm(true);
        } else {
          setStatus(response.allStatus);
          setShowForm(false);
          showStatusShower(statusShowerRef.current);
        }
      } else {
        alert(response.msg);
      }
    })
  }

  const handleFriendStatus = (id) =>{
    socket.emit("get-all-status-of-a-friend-from-user-id",id,(response)=>{
      if(!response.success) return;
      setStatus(response.allStatus);
      setShowForm(false);
      showStatusShower(statusShowerRef.current);
    });
  }

  return (
    <div className="w-full md:w-[50%] bg-white shadow rounded-lg overflow-hidden relative">

      <StatusHeader/>

      <div 
        className="flex items-center p-4 border-b hover:bg-gray-50 cursor-pointer transition"
        onClick={ handleMyStatusClick }
      >
        <img
          src={myDetails?.profilePhoto}
          className="w-14 h-14 rounded-full border-2 border-gray-400"
        />
        <div className="ml-4">
          <p className="font-semibold text-gray-900">My Status</p>
          <p className="text-sm text-gray-500">
            {myStatus.length === 0 ? "Click to add status update" : "See your status updates"}
          </p>
        </div>
      </div>

      <div>
        <h1 className="px-4 py-2 font-bold text-gray-700">Recent Status</h1>
        <div>
          {
            friendStatus.length > 0 ?
              friendStatus.map((status ,index)=>(
                <div 
                  key={index} 
                  className="flex w-full items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer rounded-md transition"
                  onClick={()=>handleFriendStatus(status?.user?._id)} 
                >
                  <img src={status?.user?.profilePhoto} className="h-14 w-14 rounded-full"/>
                  <div>
                    <p className="font-medium">{status.user.name}</p>
                    <p className="text-xs text-gray-500">{new Date(status.createdAt).toLocaleString()}</p>
                  </div>  
                </div>  
              ))
            :
            <p className="px-4 py-6 text-sm text-gray-500 text-center">
              No status updates from your friends yet.
            </p>
          }
        </div>
      </div>

      <div className="invisible opacity-0 fixed inset-0" ref={statusShowerRef}>
        {showForm ? <StatusForm/> : <StatusShower/>}
      </div>
    </div>
  )
}

export default Status
