import { createRef } from "react";



export const peerVideoReducer = (state , action)=>{
    switch(action.type){
        case "add_peer" :{
            return [...state , action.payload];
        }
        default :{
            return state;
        }
    }
}


export const createPeerConnectionForGroupVideoCall = ()=>{
    if(!myStreamRefGroupVideoCall.current){
        alert("Fail to stream your video")
        return;
    }
    let pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    peerConnectionRefGroupVideoCall.current = pc;

    myStreamRef.current.getTracks().forEach(track=>{
        pc.addTrack(track , myStreamRef.current);
    })

    pc.onicecandidate = (event) =>{
        if(event.candidate && remoteSocketIdRefGroupVideoCall.current){
            socket.emit("ice-candidate",{
                candidate : event.candidate,
                to : remoteSocketIdRefGroupVideoCall.current
            })
        }
    }

    pc.ontrack = (event) =>{
        peerVideoRef.current.srcObject = event.streams[0];
    }
}


export const requestToJoinBySendingOfferFromNewJoinee = async(socket)=>{
if(!myStreamRefGroupVideoCall.current){
        alert("Fail to stream your video")
        return ;
    }
    if(!remoteSocketIdRefGroupVideoCall.current){
        alert("No peer available");
        return;
    }

    await createPeerConnectionForGroupVideoCall();
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socket.emit("offer",{
        offer : offer,
        to : remoteSocketIdRef.current
    });

}