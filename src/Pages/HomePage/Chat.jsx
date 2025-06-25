import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/User/UserContext"
import { useSocket } from "../../context/Socket/SocketContext";

export default function Chat() {
    const {id} = useUser();
    const socket = useSocket();
    const [userData , setUserData] = useState();
    const [chatData ,setChatData ] = useState([]);
    const [message , setMessage] = useState(
      {
        msg : "",
        to : `${id}`
      }
    );

    useEffect(()=>{

      if(!id){
        return;
      }

      // it will load all the chats of a room
      socket.emit("load-all-chats-of-a-specific-roomId",id);
      socket.on("all-chat-of-a-specific-roomId-was-sended-from-server",(chatData)=>{
        setChatData(chatData);
      });

      // this is to get the user detail on which user has tap on
      socket.emit("give-specific-user-data-from-id-for-chat",id);
      socket.on("user-specific-data-from-id-for-chat",(data)=>{
       setUserData(data);
      });

      console.log("id" + id);
      console.log("msg -" + JSON.stringify(message));

      setMessage(prev=>({
        msg : "",
        id : id
      }));

      // this is to get new message
      socket.on("new-message",(data)=>{
        setChatData(prev=>(
         [ ...prev,
          data]
      ));
      });

      return ()=>{
        socket.off("new-message");
        socket.off("user-specific-data-from-id-for-chat");
        socket.off("all-chat-of-a-specific-roomId-was-sended-from-server");
      }
      
    },[id]);

    if(!id){
      return (
        <p className="flex text-3xl justify-center align-items h-screen">Start Chatting </p>
      );
    }

    const handleInputChange = (e)=>{
      let {value, name} = e.target;
      setMessage(prev=>({
        ...prev,
        msg : value
      }));
      console.log(message);
    }

    const handleMessageSubmit = (e) =>{
      e.preventDefault();
      if(!message.msg){
        return;
      }

      // this is to send message
      socket.emit("send-chat-to-a-roomId",message);
      setMessage(prev=>({
        ...prev,
        msg : ""
      }));
    }

    
  return (
    <div className="w-full h-screen grid grid-rows-[1fr_9fr_1fr]">
      <div className="w-full h-[50px] flex gap-2 items-center !ml-3">
        <img src="https://i.ibb.co/zVvrpt7w/dpPhoto.webp" className="w-[50px] h-[50px] rounded-full"/>
        <p>{userData?.name}</p>
        {/* <p>{userData && JSON.stringify(userData)}</p> */}
      </div>

      <div className="max-w-full w-full overflow-y-scroll relative">
        {/* {id} */}
        {
          chatData.length > 0 ?
          chatData.map((value,index)=>(
            <div>
                          <p 
                 key={index} 
                 className={`!px-4 !py-2 rounded-xl max-w-xs break-words text-2xl  ${id !== value.receiverID.toString() ? "absolute left-0" : "absolute right-0"}`}
            >   {value.msg}
            </p>
            <br/>
            </div>  
          ))
          :
          <p>No previous chat</p>
        }
      </div>

      <form onSubmit={handleMessageSubmit} className="grid grid-cols-[8fr_2fr]">
        <input 
            className="border hover:outline-green-500 "
            onChange={handleInputChange}
            value={message.msg}
            autoFocus
        />
        <button className="border flex items-center justify-center !p-1 bg-green-500">Send</button>
      </form>
    </div>
  )
}
