import React, { useEffect, useRef } from 'react'
import { bringVideoCallInScreen, incomingCallRef, reverseIncomingCallAnimation, UserPAgeAnaimationAfterVedioCall, videoCallAfterTappingOnAcceptCall } from '../../ui/gsap'
import { useSocket } from '../../context/Socket/SocketContext';
import { acceptCall, remoteSocketIdRef } from './Video-call-Ref';

export default function CallNotification() {
  const socket  = useSocket();
  const incomingOfferRef = useRef();

  useEffect(()=>{
    socket.on("offer",({offer, from })=>{
      remoteSocketIdRef.current = from;
      incomingOfferRef.current = offer;
     // acceptCall(offer,from,socket);
    })


    return ()=>{
      socket.off("offer");
    }
  },[])
  const handleCallAccept = ()=>{
    acceptCall(incomingOfferRef.current,remoteSocketIdRef.current,socket);
    reverseIncomingCallAnimation();
    bringVideoCallInScreen(videoCallAfterTappingOnAcceptCall.current);
  }
  return (
    <div
      ref={incomingCallRef}
      className="fixed inset-0 h-screen w-screen bg-opacity-50 flex items-center justify-center z-50 absolute top-[100%]"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center space-y-6 w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Incoming Call</h2>
        <p className="text-gray-600">Someone is trying to call you</p>

        <div className="flex justify-center space-x-8">
          <button 
               className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition"
               onClick={handleCallAccept}
          >
            <img src="accept-call.png" alt="Accept" className="h-8 w-8" />
          </button>
          <button 
                className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transition"
                onClick={reverseIncomingCallAnimation}
          >
            <img src="reject-call.png" alt="Reject" className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  )
}
