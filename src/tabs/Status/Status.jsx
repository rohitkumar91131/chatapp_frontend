import { useEffect, useState } from "react"
import StatusHeader from "./StatusHeader"
import { useSocket } from "../../context/Socket/SocketContext";
import StatusShower from "./StatusShower";
import { useStatus } from "./StatusContext";
import { showStatusShower, statusShowerRef } from "../../ui/gsap";

function Status() {
  const [myStatus, setMyStatus] = useState([]);

  const [friendStatus, setFriendStatus] = useState([]);
  const {setStatus} = useStatus();
  const socket = useSocket();
  useEffect(()=>{
    socket.emit("get-all-my-status",{},(response)=>{
      if(response.success){
        //alert(response.msg);
        setStatus(response.allStatus);
      }
      else{
        alert(response.msg);
      }
    })


    return ()=>{
      socket.off("get-all-my-status")
    }
  },[])
  const handleMyStatusClick = ()=>{
    showStatusShower(statusShowerRef.current)
  }

  return (
    <div className="w-full md:w-[50%] bg-white shadow-sm rounded-lg overflow-hidden relative">

      <div>
        <StatusHeader/>
      </div>
      <div className="flex items-center px-4 py-4 border-b hover:bg-gray-100 transition"
           onClick={ handleMyStatusClick}
      >
        <img
          src={myStatus.imgSrcLink}
          className="w-14 h-14 rounded-full border-2 border-gray-400"
        />
        <div className="ml-4">
          <p className="font-semibold text-gray-900">My Status</p>
          <p className="text-sm text-gray-500">Click to add status update</p>
          <p className="text-xs text-gray-400">{myStatus.time}</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm text-gray-500 px-4 pt-4 pb-2 uppercase tracking-wide">
          Recent updates
        </h4>
        {
          friendStatus.length > 0 ? (
            friendStatus.map((fStatus, index) => (
              <div key={index} className="flex items-center px-4 py-3 hover:bg-gray-50 transition border-b">
                <img
                  src={fStatus.imgSrcLink}
                  className="w-14 h-14 rounded-full border-2 border-green-500"
                />
                <div className="ml-4">
                  <p className="font-medium text-gray-800">{fStatus.name}</p>
                  <p className="text-sm text-gray-500">{fStatus.creationTime}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6">No friend status updates yet</p>
          )
        }
      </div>
      <div className="invisible opacity-0  fixed inset-0  " ref={statusShowerRef}>
        <StatusShower/>
      </div>
    </div>
  )
}

export default Status
