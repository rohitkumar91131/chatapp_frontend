import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/User/UserContext";
import { bringVideoCallInScreen, landingPageRef, Slide2Animation, slide2ref, videoCallAfterTappingOnAcceptCall, VideoCallAnimation, videoCallRef } from "../../ui/gsap";
import { myStreamRef, myVideoRef, remoteSocketIdRef } from "./Video-call-Ref";
import { useSocket } from "../../context/Socket/SocketContext";

export default function Chat() {
  const { id } = useUser();
  const latestMessageRef = useRef(null);
  const socket = useSocket();
  const [userData, setUserData] = useState();
  const [chatData, setChatData] = useState([]);
  const [message, setMessage] = useState({ msg: "", to: `${id}` });
  const [onlineStatus , setOnlineStatus] = useState();
  const messageContainerRef = useRef(null);

  function formatWhatsAppDate(dateStr) {
    const today = new Date();
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const msgDate = new Date(dateStr);
    const msgMidnight = new Date(msgDate.getFullYear(), msgDate.getMonth(), msgDate.getDate());
    const diffTime = todayMidnight - msgMidnight;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) {
      return msgDate.toLocaleDateString("en-IN", { weekday: "long" });
    }
    return msgDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach((msg) => {
      const label = formatWhatsAppDate(msg.created_At);
      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(msg);
    });
    return groups;
  };

  

  useEffect(() => {
    if (!id) return;
    console.log(id)
    if(chatData && latestMessageRef.current){
      //latestMessageRef.current.scrollIntoView( { behavior : "smooth"})
    }

    socket.emit("create-or-join-room",id);
    socket.emit("check-user-online-status",id);
    socket.on("offline-user", status=>{
      setOnlineStatus(status)
    });
    socket.on("online-user", status=>{
      setOnlineStatus(status)
    })



    socket.emit("load-all-chats-of-a-specific-roomId", id);
    socket.on("all-chat-of-a-specific-roomId-was-sended-from-server", (chatData) => {
      setChatData(chatData);

    });

    socket.emit("give-specific-user-data-from-id-for-chat", id);
    socket.on("user-specific-data-from-id-for-chat", (data) => {
      setUserData(data);
    });

    setMessage((prev) => ({ msg: "", id: id }));

    socket.on("new-message", (data) => {
      setChatData((prev) => [...prev, data]);
      if(latestMessageRef.current){
        latestMessageRef.current.scrollIntoView({behavior : "smooth"});
      }
    });

    return () => {
      socket.off("new-message");
      socket.off("user-specific-data-from-id-for-chat");
      socket.off("all-chat-of-a-specific-roomId-was-sended-from-server");
      socket.off("online-user");
      socket.off("offline-user");
    };
  }, [id ]);

  useEffect(()=>{
    if(messageContainerRef.current){
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  },[chatData])

  const handleInputChange = (e) => {
    const { value } = e.target;
    setMessage((prev) => ({ ...prev, msg: value }));
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!message.msg) return;
    socket.emit("send-chat-to-a-roomId", message);
    setMessage((prev) => ({ ...prev, msg: "" }));
  };

  const groupedMessages = groupMessagesByDate(chatData);

  const getUserMedia = ()=>{
    navigator.mediaDevices.getUserMedia({
      audio : true,
      video : true
    }).then((stream)=>{
      if(myVideoRef.current){
        myVideoRef.current.srcObject = stream;
      }
      myStreamRef.current = stream;
    })
  }


  const handleVideocall = ()=>{
    console.log("Refs:", videoCallRef.current, slide2ref.current);
    //VideoCallAnimation(videoCallRef.current, slide2ref.current);
    getUserMedia();
    bringVideoCallInScreen(videoCallAfterTappingOnAcceptCall.current);
    socket.emit("join-video-call",{
      peerSocketId : id
    })
  }

  if(!id){
    return (
      <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 text-gray-800 px-4">
        <div ref={landingPageRef}>
        <img
          src="logo.svg"
          alt="Vaartalap Logo"
          className="w-24 h-24 mb-6 drop-shadow-lg animate-bounce-slow"
        />
        <h1 className="text-4xl font-semibold mb-2 tracking-wide">Welcome to Vartalaap</h1>
        <p className="text-lg text-gray-600">Start chatting with your friends in real-time</p>
        </div>
      </div>
    );
    
  }


  return (
    <div className="w-full h-[90dvh] md:h-[100dvh] grid grid-rows-[1fr_9fr_1fr]">
      <div className="w-full h-[60px] flex gap-2 items-center  !ml-3">
        <img src="return.svg" className="block md:hidden" onClick={Slide2Animation} />
        <img src="https://i.ibb.co/zVvrpt7w/dpPhoto.webp" className="w-[50px] h-[50px] rounded-full" />
        <p>{userData?.name}</p>
        <div>
        <img 
           src="video-calling.png" 
           className="w-[40px] h-[40px] flex-end"
           onClick={handleVideocall}
        />

        {
          onlineStatus=== "offline" && userData?.lastSeen ? 
          <p>{new Date(userData?.lastSeen).toLocaleString()}</p>
          :
          <p>online</p>
        }

        {/* {
          onlineStatus === "online" ?
          (<p>Online</p>)
          :
          ( <p>last seen at {new Date(userData?.lastseen).toLocaleDateString() }</p> )
        } */}
        {/* {
          userData?.lastSeen === Date.now() ?
         ( <p>{userData?.lastSeen}</p>)
          :
         ( <p>{onlineStatus && onlineStatus}</p>)

        } */}
        {/* <p>{userData?.lastSeen}</p>
        <p>{onlineStatus && onlineStatus}</p> */}
        </div>
      </div>

      <div className="max-w-full w-full flex flex-col overflow-y-scroll overflow-x-hidden p-2" ref={messageContainerRef}>
        {Object.entries(groupedMessages).map(([label, messages]) => (
          <div key={label} className="!space-y-2">
            <p className="text-center text-xs text-gray-500 mb-2">{label}</p>
            {messages.map((value, index) => (
              <div
                key={index}
                className={`flex ${id !== value.receiverID.toString() ? "justify-start" : "justify-end"}`}
              >
                <div className="border bg-red-500 rounded-md border-black flex flex-col max-w-[80%] h-fit">
                  <p className="px-4 py-2 text-2xl break-words">{value.msg}</p>
                  <p className="self-end text-xs px-2">
                    {new Date(value.created_At).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={latestMessageRef}></div>
      </div>

      <form onSubmit={handleMessageSubmit} className="grid grid-cols-[8fr_2fr]">
        <input
          className="border hover:outline-green-500"
          onChange={handleInputChange}
          value={message.msg}
          placeholder = "💬 Type your message..."
        />
        <button className="border flex items-center justify-center p-1 bg-green-500">Send</button>
      </form>
    </div>
  );
}
