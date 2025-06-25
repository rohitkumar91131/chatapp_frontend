import Chat from "./Chat";
import Users from "./Users";
import { useEffect, useRef,  } from "react";
import { useSocket } from "../../context/Socket/SocketContext";
import { slide1ref, slide2ref } from "../../ui/gsap";

export default function HomePage() {
  const socket = useSocket();

  useEffect(() => {
    socket.connect();

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
      <div className="flex md:grid md:grid-cols-[1fr_1fr]   h-screen w-screen overflow-hidden">
        <div 
            className="border- block overflow-y-auto h-screen w-screen flex-shrink-0 md:w-full md:h-full"
            ref={slide1ref}
        >
          <Users />
        </div>
        <div 
            className="overflow-y-hidden overflow-x-hidden h-screen w-screen flex-shrink-0 md:h-full md:w-full "
            ref={slide2ref}
        >
          <Chat />
        </div>
      </div>
    );
  }

