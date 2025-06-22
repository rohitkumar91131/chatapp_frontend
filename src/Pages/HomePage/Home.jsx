import Chat from "./Chat";
import Users from "./Users";
import { useEffect, useState } from "react"
import {  useSocket } from "../../context/Socket/SocketContext";


export default function HomePage() {
  const [users,setUsers] = useState([]);
  const socket   = useSocket();
  console.log(socket)
  useEffect(()=>{
      socket.connect();
      socket.on("connect",()=>{
          console.log("A user is connected with socket id "+ socket.id)
      })


      socket.on("connect_error",(err)=>{
        alert(err.message)
      })
      
  },[])
  return (
    <div className="grid grid-cols-[1fr_1fr]">
      <Users/>
      <Chat/>
    </div>
  )
}

