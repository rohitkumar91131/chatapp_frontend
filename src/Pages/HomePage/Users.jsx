import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/Socket/SocketContext"
import { useUser } from "../../context/User/UserContext";

export default function Users() {
    const socket = useSocket();
    const userRef = useRef("");
    const {id ,setId} = useUser();
    

    const [allUsers , setAllUSers] = useState([]);
    useEffect(()=>{
        socket.on("load-users",(data)=>{
           setAllUSers(data)
        })


        return ()=>{
          socket.off("load-users")
        }
    },[])

    const handleUserClick = (id)=>{
        userRef.current = id;
        console.log(userRef);
        setId(userRef.current)
        console.log(id);

        // on tapping on an user a room will be created
       socket.emit("create-or-join-room",id);
    }
   
  return (
    <div>
      {
        allUsers.length > 0 ?
        allUsers.map((user,index)=>(
            <p 
                key={index} 
                className="w-full h-[50px] flex items-center justify-center border  border-collapse"
                onClick={()=>handleUserClick(user._id)}
                
            >
                {JSON.stringify(user?.name)}
            </p>
        ))
        :
        (<p>Loading...</p>)
      }
    </div>
  )
}


