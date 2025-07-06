import Chat from "./Chat";
import Users from "./Users";
import { useEffect, useRef,  } from "react";
import { useSocket } from "../../context/Socket/SocketContext";
import { landingAnimation, landingPageRef, slide1ref, slide2ref, UserPAgeAnaimationAfterVedioCall, videoCallAfterTappingOnAcceptCall, videoCallRef } from "../../ui/gsap";
import VideoCall from "./VideoCall";
import CallNotification from "./CallNotification";
import VideoCall2 from "./VideoCall2";

export default function HomePage() {
  const socket = useSocket();

  useEffect(() => {

    landingAnimation(landingPageRef.current)
    if(!socket.connected){
      socket.connect();
    }
    socket.on("connect", () => {
      console.log("Connected with socket ID:", socket.id);
    });

    socket.on("connect_error", (err) => {
      alert(err.message);
    });

    

    return () => {
      socket.disconnect();
    };
  }, []);

  

    return (
      <div className="flex md:grid md:grid-cols-[1fr_1fr]   h-full w-full overflow-hidden">
        <div 
            className="border- block overflow-y-auto h-[90dvh] w-screen flex-shrink-0 md:w-full md:h-full"
            ref={el=>{
              slide1ref.current = el
              UserPAgeAnaimationAfterVedioCall.current = el
            }}
        >
          <Users />
        </div>
        <div 
            className="overflow-y-hidden overflow-x-hidden h-[90dvh] w-screen flex-shrink-0 md:h-full md:w-full "
            ref={slide2ref}
        >
          <Chat />
        </div>
        {/* <div 
             className="h-[100dvh] w-screen flex-shrink-0 md:h-full md:w-full z-index-3 absolute right-[-100%]"   
             ref={el=>{
              videoCallRef.current = el,
              videoCallAfterTappingOnAcceptCall.current = el
             }}
        >  
          <VideoCall2/>
        </div> */}
      </div>
    );
  }

