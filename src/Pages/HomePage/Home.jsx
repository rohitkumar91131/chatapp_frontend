import Chat from "./Chat";
import Users from "./Users";
import { useEffect,  } from "react";
import { useSocket } from "../../context/Socket/SocketContext";

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
      <div className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_1fr]  h-screen">
        <div className="border-r overflow-y-auto">
          <Users />
        </div>
        <div className="overflow-y-hidden overflow-x-hidden">
          <Chat />
        </div>
      </div>
    );
  }

