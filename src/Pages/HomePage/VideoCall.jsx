import { useEffect, useRef, useState } from "react"
import { useSocket } from "../../context/Socket/SocketContext";
import { useUser } from "../../context/User/UserContext";


export default function VideoCall() {
  const myVideoRef = useRef();
  const myStreamRef = useRef();
  const peerVideoRef = useRef();
  const socket = useSocket();
  const {id} = useUser();
  const remoteSocketIdRef = useRef();
  const peerConnectionRef = useRef();
  const [ status , setStatus ]= useState("Call");


  const roomId = "room"

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


    socket.on("offer",async({offer , from})=>{
      remoteSocketIdRef.current = from;
      await createPeerConnection();
      await peerConnectionRef.current.setRemoteDescription(offer);
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socket.emit("answer",{answer , to : from});

    })

    socket.on("answer",async({answer , from})=>{
      await peerConnectionRef.current.setRemoteDescription(answer);
      setStatus("Connected");
    })


    socket.on("ice-candidate",async({candidate , from})=>{
      try{
        await peerConnectionRef.current.addIceCandidate(candidate);
      }
      catch(err){
        alert(err.message)
      }
    })


    socket.on("end-call",()=>{
      if(peerConnectionRef.current){
        peerConnectionRef.current.close();
        peerConnection.current = null;
      }

      if(myStreamRef.current){
        myStreamRef.current.getTracks().forEach(track => track.stop());
        myStream.current= null
      }

      setStatus("Call Ended")
      alert("The other user has ended the call");
      
    })


    return () => {
      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("end-call")
    };
    


  },[]);


  const createPeerConnection = async() =>{
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    peerConnectionRef.current = pc;

    myStreamRef.current.getTracks().forEach(track => {
      pc.addTrack(track, myStreamRef.current);
    });

    pc.onicecandidate = (event) => {
      if (event.candidate && remoteSocketIdRef.current) {
        socket.emit('ice-candidate', {
          candidate: event.candidate,
          to: remoteSocketIdRef.current,
        });
      }
    };

    pc.ontrack = (event) => {
      peerVideoRef.current.srcObject = event.streams[0];
    };
  }
  const startCall = async()=>{
    if(!remoteSocketIdRef.current) 
      {
        alert("No peer available")
        return;
      }

      console.log(myStreamRef.current)


    await createPeerConnection();
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socket.emit("offer",{offer , to : remoteSocketIdRef.current});
    setStatus("Calling");
    console.log("Calling")

  }

  const endCall = ()=>{
    if(peerConnectionRef.current){
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if(myStreamRef.current){
      myStreamRef.current.getTracks().forEach(track => track.stop());
      myStreamRef.current = null;
    }

    socket.emit("end-call",{to : remoteSocketIdRef.current});
    setStatus("Call Ended")
  }
  return (
    <div className="grid grid-rows-[1fr_1fr_1fr] h-screen">
      <div>
        <button 
            className="border !p-2 bg-red-500"
            onClick={startCall}
        >{status}</button>
        <button className={peerConnectionRef.current ? "!p-2 border bg-green-500 " : "hidden"}
                onClick={endCall}
        
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


