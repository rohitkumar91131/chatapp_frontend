import { useEffect, useState } from "react"
import StatusHeader from "./StatusHeader"
import { useSocket } from "../../context/Socket/SocketContext";
import StatusShower from "./StatusShower";
import { useStatus } from "./StatusContext";
import { showStatusShower, statusShowerRef } from "../../ui/gsap";

function Status() {
  const [myStatus, setMyStatus] = useState([]);
  const [myDetails , setMyDetails ]= useState(""); 

  const [friendStatus, setFriendStatus] = useState([]);
  const {setStatus} = useStatus();
  const socket = useSocket();
  // useEffect(()=>{
  //   socket.emit("get-all-my-status",{},(response)=>{
  //     if(response.success){
  //       //alert(response.msg);
  //       setStatus(response.allStatus);
  //     }
  //     else{
  //       alert(response.msg);
  //     }
  //   })


  //   return ()=>{
  //     socket.off("get-all-my-status")
  //   }
  // },[])

  useEffect(()=>{
    socket.emit("get-my-details-for-status",{},(response)=>{
      //console.log(response);
      setMyDetails(response?.user);
    })
    socket.emit("get-friend-status-overview",{},(response)=>{
      //console.log(response?.friends)
      if(response.success){
        if(response.msg === "No status of friends"){
          setFriendStatus({
            msg : "No status updates from your friends yet."
          })
          return;
        }
        setFriendStatus(response?.friends)
      }
    })
  },[])
  const handleMyStatusClick = ()=>{
    socket.emit("get-all-my-status",{},(response)=>{
      console.log(response.allStatus)
      if(response.success){
        setStatus(response.allStatus);
        showStatusShower(statusShowerRef.current);
      }
      else{
        alert(response.msg)
      }
    })
    
  }
  const handleFriendStatus = (id) =>{
    //alert(id)
    socket.emit("get-all-status-of-a-friend-from-user-id",id,(response)=>{
      console.log(response);
      if(!response.success){
        //alert(response.msg)
        return;
      }
      setStatus(response.allStatus)
      showStatusShower(statusShowerRef.current);

    });

  }

  return (
    <div className="w-full md:w-[50%] bg-white shadow-sm rounded-lg overflow-hidden relative">

      <div>
        <StatusHeader/>
      </div>
      <div className="flex items-center !p-4 border-b hover:bg-gray-100 transition"
           onClick={ handleMyStatusClick}
      >
        <img
          src={myDetails?.profilePhoto}
          className="w-14 h-14 rounded-full border-2 border-gray-400"
        />
        <div className="ml-4">
          <p className="font-semibold text-gray-900">My Status</p>
          <p className="text-sm text-gray-500">Click to add status update</p>
          <p className="text-xs text-gray-400">{myStatus.time}</p>
        </div>
      </div>

      <div>
        <h1 className="!px-4 !py-1 font-bold">Recent Status</h1>
        <div>
          {
            friendStatus.length > 0 ?
            (
              friendStatus.map((status ,index)=>(
                <div key={index} className="flex w-full items-center gap-3 !p-4" onClick={()=>handleFriendStatus(status?.user?._id)} >
                  <img src={status?.user?.profilePhoto} className="h-14 w-14 rounded-full"/>
                  <div>
                    <p>{status.user.name}</p>
                    <p>{new Date(status.createdAt).toLocaleString()}</p>
                  </div>  
                  
                </div>  
              ))
            )
            :
            "No status updates from your friends yet."
          }
        </div>
      </div>
      <div className="invisible opacity-0  fixed inset-0  " ref={statusShowerRef}>
        <StatusShower/>
      </div>
    </div>
  )
}

export default Status
