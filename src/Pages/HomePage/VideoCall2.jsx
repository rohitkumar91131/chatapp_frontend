import React, { useContext, useEffect, useState } from 'react'
import { CallStatusContext, checkUserMedia, endCall, myStreamRef, myVideoRef, peerConnectionRef, peerVideoRef, remoteSocketIdRef, startCall } from './Video-call-Ref'
import { bringVideoCallOutOfScreen, IncomingCallAnimation, incomingCallRef, videoCallAfterTappingOnAcceptCall } from '../../ui/gsap'
import { useSocket } from '../../context/Socket/SocketContext'

export default function VideoCall2() {
  const roomId = "room"
  const { callStatus, setCallStatus, incomingCall, setIncomingCall } = useContext(CallStatusContext)
  const socket = useSocket()

  useEffect(() => {
    socket.on("incoming-call-notification", () => {
      setIncomingCall(true)
    })

    if (incomingCall) {
      IncomingCallAnimation(incomingCallRef.current)
    }

    socket.emit("join-room", roomId)

    socket.on("user-joined", (data) => {
      remoteSocketIdRef.current = data
    })

    socket.on("answer", async ({ answer }) => {
      await peerConnectionRef.current.setRemoteDescription(answer)
      setCallStatus("Connected")
    })

    socket.on("ice-candidate", async ({ candidate }) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.addIceCandidate(candidate)
      }
    })

    socket.on("end-call", () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close()
        peerConnectionRef.current = null
      }

      if (myStreamRef.current) {
        myStreamRef.current.getTracks().forEach((track) => track.stop())
        myStreamRef.current = null
      }

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = null
      }

      setCallStatus("Call")
      remoteSocketIdRef.current = null
    })

    socket.on("add-socket-id-to-remoteSocketIdRef", (data) => {
      remoteSocketIdRef.current = data
    })

    return () => {
      socket.off("ice-candidate")
      socket.off("answer")
      socket.off("user-joined")
      socket.off("end-call")
      socket.off("add-socket-id-to-remoteSocketIdRef")
      socket.off("incoming-call-notification")
    }
  }, [incomingCall])

  const removeUserMedia = () => {
    if (myStreamRef.current) {
      myStreamRef.current.getTracks().forEach(track => {
        track.stop()
      })
      myStreamRef.current = null
    }
  }

  const handleCallReturn = () => {
    bringVideoCallOutOfScreen(videoCallAfterTappingOnAcceptCall.current)
  }

  const handleStartCall = async () => {
    const isGranted = await checkUserMedia()
    if (isGranted) {
      startCall(socket, setCallStatus)
    } else {
      alert("Fail to do a video call")
    }
  }

  const handleEndCall = () => {
    endCall(socket, setCallStatus)
  }

  return (
    <div className="w-[100dvw] h-[100dvh] z-[9999] grid grid-rows-[auto_1fr] bg-gradient-to-br from-purple-800 via-indigo-700 via-blue-600 to-sky-500 text-white relative overflow-hidden">
      <div className="z-50 bg-white/10 backdrop-blur-md rounded-xl shadow-lg px-6 py-3 flex items-center justify-center gap-4 border border-white/20 m-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <video
            ref={myVideoRef}
            className="w-full h-full object-cover bg-transparent"
            autoPlay
            muted
            playsInline
          />
        </div>
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
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
