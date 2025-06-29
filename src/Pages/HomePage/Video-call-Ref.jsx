import { createRef } from "react";
import { useSocket } from "../../context/Socket/SocketContext";

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
export const startCall =async(socket)=>{
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

    await createPeerConnection(socket);
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socket.emit("offer",{
        offer : offer,
        to : remoteSocketIdRef.current
    });
    console.log("Calling");
}

export const acceptCall = async(offer, from,socket)=>{
    await createPeerConnection(socket);
    await peerConnectionRef.current.setRemoteDescription(offer);
    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
    socket.emit("answer",{
        answer , 
        to : from
    })
    console.log("Accepted")
}