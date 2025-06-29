import React, { useContext, useEffect } from 'react'
import { CallStatusContext, checkUserMedia, endCall, myStreamRef, myVideoRef, peerConnectionRef, peerVideoRef, remoteSocketIdRef, startCall } from './Video-call-Ref'
import { useSocket } from '../../context/Socket/SocketContext'
import { bringVideoCallOutOfScreen, videoCallAfterTappingOnAcceptCall } from '../../ui/gsap';

export default function VideoCall2() {
    const roomId = "room"
    const {callStatus ,setCallStatus ,incomingCall ,} = useContext(CallStatusContext);

    const socket = useSocket();
    useEffect(()=>{
        // navigator.mediaDevices.getUserMedia({
        //     audio : true,
        //     video : true
        //   })
        //   .then(stream=>{
        //     if(myVideoRef.current){
        //       myVideoRef.current.srcObject = stream
        //     }
        //     myStreamRef.current = stream
        //   })
        //   .catch((err)=>{
        //     console.log(err)
        //   })


          socket.emit("join-room",roomId);
          socket.on("user-joined",(data)=>{
            console.log(data);
            remoteSocketIdRef.current = data;
      
          });


          socket.on("answer",async({answer , to })=>{
            await peerConnectionRef.current.setRemoteDescription(answer);
            setCallStatus("Connected");

          })

          socket.on("ice-candidate",async({candidate , from})=>{
            if(peerConnectionRef.current){
                await peerConnectionRef.current.addIceCandidate(candidate);
            }
          })  
          socket.on("end-call", () => {
            // Just end the call locally — DO NOT re-emit
            if (peerConnectionRef.current) {
              peerConnectionRef.current.close();
              peerConnectionRef.current = null;
            }
          
            if (myStreamRef.current) {
              myStreamRef.current.getTracks().forEach((track) => track.stop());
              myStreamRef.current = null;
            }
          
            if (myVideoRef.current) {
              myVideoRef.current.srcObject = null;
            }
          
            // Optional: set call status, show UI, etc.
          });
          

          return ()=>{
            socket.off("ice-candidate");
            socket.off("answer");
            socket.off("user-joined");
            socket.off("end-call");
          }
          


    },[])

    const removeUserMedia = ()=>{
        if(myStreamRef.current){
            myStreamRef.current.getTracks().forEach(track=>{
                track.stop();
            })
            myStreamRef.current = null
        }
        // we will do this later
    }
    const handleCallReturn = ()=>{
        bringVideoCallOutOfScreen(videoCallAfterTappingOnAcceptCall.current);
        //removeUserMedia();
    }
    const handleStartCall = async()=>{
        const isGranted =await checkUserMedia();
        if(isGranted){
            startCall(socket , setCallStatus)
        }
        else{
            alert("Fail to do a video call")
        }
    }

    const handleEndCall = ()=>{
        endCall(socket , setCallStatus , );
        console.log(incomingCall);
    }

  return (
<div className="h-screen w-screen flex flex-col bg-gradient-to-br from-purple-800 via-indigo-700 via-blue-600 to-sky-500 text-white relative overflow-hidden">
  {/* Header with glassmorphism */}
  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md rounded-xl shadow-lg px-6 py-3 flex items-center gap-4 border border-white/20">
    <img
      src="return.svg"
      alt="Return"
      className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
      onClick={handleCallReturn}
    />

    <button
      onClick={handleStartCall}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-colors duration-200"
    >
      {callStatus && callStatus}
    </button>

    {peerConnectionRef.current && (
      <button
        onClick={handleEndCall}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-colors duration-200"
      >
        End Call
      </button>
    )}
  </div>

  {/* Videos */}
  <div className="flex-1 flex flex-col md:flex-row gap-4 p-4 mt-24 md:mt-0">
    {/* Local Video */}
    <div className="w-full md:w-1/2 h-1/2 md:h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      <video
        ref={myVideoRef}
        className="w-full h-full object-cover bg-transparent"
        autoPlay
        muted
        playsInline
      />
    </div>

    {/* Remote Video */}
    <div className="w-full md:w-1/2 h-1/2 md:h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      <video
        ref={peerVideoRef}
        className="w-full h-full object-cover bg-transparent"
        autoPlay
        playsInline
        muted
      />
    </div>
  </div>
</div>

  
  
  )
}


