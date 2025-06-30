import React, { useEffect, useReducer, useState } from 'react'
import { useSocket } from '../../context/Socket/SocketContext';
import { peerVideoReducer } from './GroupVideoCallRef';

export default function GroupVideoCall() {
    const roomName = "room"
    const socket = useSocket();
    const [isJoinedSuccessful , setIsJoinedSuccessful] = useState(false);
    const [isCreatedVideoCall , setIscreatedVideoCall] = useState(false);
    const [peerVideo , dispatch ]= useReducer(peerVideoReducer ,[])



    const handleJoinButtonClick = ()=>{
        socket.emit("join-group-video-call",{
            roomId : roomName
        })
    }
    const handleCreateVideoCall = ()=>{
        
    }
    useEffect(()=>{
        socket.connect();

        return ()=>{
            socket.disconnect();
        }
    },[])
    if(!isJoinedSuccessful && !isCreatedVideoCall){
        return <div className='h-screen w-screen flex items-center justify-center'>

            <button 
                className='!p-2 bg-blue-500 border rounded-md'
                onClick={handleJoinButtonClick}
            >Join VideoCall </button>
            <button 
                className='!p-2 bg-blue-500 border rounded-md'
                onClick={handleCreateVideoCall}
            >
                Create a video call
            </button>
        </div>
    }

    
  return (
    <div className='w-screen h-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {
        peerVideo.length > 0 ? 
        peerVideo.map((video , index)=>{
            <div className='aspect-square bg-black-rounded-md overflow-hidden'>
               <video 
                  className='w-full h-full object-cover'
                  autoPlay
                  playsInline
                  muted
                  ref={el=>{

                  }}
               />
            </div> 
        })
        :
        <p>No video found</p>
      }
    </div>
  )
}

