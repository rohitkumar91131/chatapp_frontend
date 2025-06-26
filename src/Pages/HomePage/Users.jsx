import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/Socket/SocketContext"
import { useUser } from "../../context/User/UserContext";
import { Slide1Animation, slide1ref, slide2ref } from "../../ui/gsap";


export default function Users() {
    const socket = useSocket();
    const userRef = useRef("");
    const {id ,setId} = useUser();
    const [allUsers , setAllUSers] = useState([]);

    useEffect(()=>{
        socket.on("load-users",(data)=>{
           setAllUSers(data);
        });

        return ()=>{
          socket.off("load-users");
        }
    },[]);

    const handleUserClick = (id)=>{
        userRef.current = id;
        console.log(userRef);
        setId(userRef.current);
        console.log(id);


        Slide1Animation(slide1ref.current ,slide2ref.current)


        // on tapping on a user a room will be created
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
