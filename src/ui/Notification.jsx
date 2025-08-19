import { useEffect, useState } from "react";
import { useSocket } from "../context/Socket/SocketContext";
import { useNotification } from "../context/notification/Notification";

export default function Notification() {
  const socket = useSocket();
  const [notifications, setNotifications] = useState([]);
  const {setNotification} = useNotification();

  const handleNewNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
    console.log(notification);
    setNotification("HomePage",true)
  };
  const handleNotification = (id)=>{
    console.log(id)
    socket.emit("accept-friend-request",id,(res)=>{
      res.msg
      console.log(res)
    });

  }

  useEffect(() => {
    socket.on("new-notification", handleNewNotification);

    socket.emit("send-all-notifications",{},(res)=>{
      console.log(res);
      setNotifications(res.allNotifications);
    })
    return () => {
      socket.off("new-notification", handleNewNotification);
    };
  }, [socket]);

  return (
    <div className="h-[70dvh] w-[70vw] md:w-[30vw] rounded-md flex flex-col items-center border p-4 bg-white">
        <p className="text-2xl font-md ">Notifications</p>
        
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <button key={index} className="w-full text-2xl !p-2 border rounded-md" onClick={()=>handleNotification(notification.from)}>
            {notification.msg} from {notification.from.name}
          </button>
        ))
      ) : (
        <p className="flex items-center justify-center w-full h-full">No notifications</p>
      )}
    </div>
  );
}
