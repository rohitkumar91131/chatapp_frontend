import { createContext, useContext, useRef } from "react";

export const VideoCallContext = createContext();
export const VideoCallProvider = ({children})=>{
    const remoteSocketIdRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const myStreamRef = useRef(null);
    const peerVideoRef = useRef(null);
    const myVideoRef = useRef(null);
  
    return <VideoCallContext.Provider>
        {children}
    </VideoCallContext.Provider>
}