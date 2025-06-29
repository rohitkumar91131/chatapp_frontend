import React, { useEffect } from 'react'
import { myStreamRef, myVideoRef, peerConnectionRef, peerVideoRef, remoteSocketIdRef, startCall } from './Video-call-Ref'
import { useSocket } from '../../context/Socket/SocketContext'

export default function VideoCall2() {
    const roomId = "room"

    const socket = useSocket();
    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({
            audio : true,
            video : true
          })
          .then(stream=>{
            if(myVideoRef.current){
              myVideoRef.current.srcObject = stream
            }
            myStreamRef.current = stream
          })
          .catch((err)=>{
            console.log(err)
          })


          socket.emit("join-room",roomId);
          socket.on("user-joined",(data)=>{
            console.log(data);
            remoteSocketIdRef.current = data;
      
          });


          socket.on("answer",async({answer , to })=>{
            await peerConnectionRef.current.setRemoteDescription(answer);

          })

          socket.on("ice-candidate",async({candidate , from})=>{
            if(peerConnectionRef.current){
                await peerConnectionRef.current.addIceCandidate(candidate);
            }
          })  


          return ()=>{
            socket.off("ice-candidate");
            socket.off("answer");
            socket.off("user-joined");

          }
          


    },[])
  return (
    <div className="grid grid-rows-[1fr_1fr_1fr] h-screen">
      <div>
        <button 
            className="border !p-2 bg-red-500"
            onClick={()=>startCall(socket)}
        >Call</button>
        <button className={peerConnectionRef.current ? "!p-2 border bg-green-500 " : "hidden"}
               
        
        >End Call</button>

      </div>

      <div className="w-full h-full object-cover">
        <video 
           ref={myVideoRef}
           className="w-full h-full"
           autoPlay
           muted
           playsInline
        />
      </div>
      <div>
         <video 
             className="w-full h-full"
             autoPlay
             muted
             playsInline
             ref={peerVideoRef}
         />
      </div>
    </div>
  )
}


