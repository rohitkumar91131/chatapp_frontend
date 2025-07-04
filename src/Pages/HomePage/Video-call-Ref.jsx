import { createContext, createRef, useContext, useState } from "react";

export const remoteSocketIdRef = createRef();
export const peerConnectionRef = createRef();
export const myStreamRef = createRef();
export const peerVideoRef = createRef();
export const myVideoRef = createRef();


export const createPeerConnection = (socket)=>{
    let pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    peerConnectionRef.current = pc;

    myStreamRef.current.getTracks().forEach(track=>{
        pc.addTrack(track , myStreamRef.current);
    })
    console.log(pc.current)

    pc.onicecandidate = (event) =>{
        if(event.candidate && remoteSocketIdRef.current){
            socket.emit("ice-candidate",{
                candidate : event.candidate,
                to : remoteSocketIdRef.current
            })
        }
    }

    pc.ontrack = (event) =>{
        peerVideoRef.current.srcObject = event.streams[0];
    }
}
export const startCall =async(socket ,setCallStatus ,)=>{
    if(!myStreamRef.current){
        alert("Fail to stream your video")
        return ;
    }
    if(!remoteSocketIdRef.current){
        alert("No peer available");
        return;
    }
    socket.emit("incoming-call-notification",{
        to : remoteSocketIdRef.current
    })
    setCallStatus("Calling")

    await createPeerConnection(socket);
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socket.emit("offer",{
        offer : offer,
        to : remoteSocketIdRef.current
    });
    
    
}

export const acceptCall = async(offer, from,socket , setCallStatus,setIncomingCall)=>{
    await getUserMedia();
    await createPeerConnection(socket);
    await peerConnectionRef.current.setRemoteDescription(offer);
    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
    socket.emit("answer",{
        answer , 
        to : from
    })
    console.log("Accepted");
    
    setCallStatus("Connected");
    setIncomingCall(false);
}


export const endCall = (socket , setCallStatus )=>{
    if(peerConnectionRef.current){
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
    }

    if(myStreamRef.current){
        myStreamRef.current.getTracks().forEach((track)=>{
            track.stop();
        })
        myStreamRef.current = null;
    }
    if(myVideoRef.current){
        myVideoRef.current.srcObject = null;
    }

    if(remoteSocketIdRef.current){
        socket.emit("end-call",({
            to : remoteSocketIdRef.current
        }))
    }

    setCallStatus("Call");
    remoteSocketIdRef.current = null;
    
    

}



export const getUserMedia = () =>{
    return navigator.mediaDevices.getUserMedia({
        audio : true,
        video : true
    }).
    then((stream)=>{
        if(myVideoRef.current){
            myVideoRef.current.srcObject = stream;
        }
        myStreamRef.current = stream;
        return true;
    })
    .catch(err=>{
        alert("Permission denied to camera and audio");
        return false;
    })
    
}

export const checkUserMedia = async()=>{
    if(!myStreamRef.current && !myVideoRef.current.srcObject){
       const granted = await  getUserMedia();
       return granted;
    }
    return true
}


// making a context for call status
export const CallStatusContext = createContext();
export const CallStatusProvider = ({children}) =>{
    const [callStatus , setCallStatus] = useState("Call");
    const [incomingCall , setIncomingCall] = useState(false);
    
    return <CallStatusContext.Provider value={{callStatus , setCallStatus , incomingCall , setIncomingCall }}>
        {children}
    </CallStatusContext.Provider>
}

