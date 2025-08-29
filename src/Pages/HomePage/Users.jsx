import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/User/UserContext";
import { IncomingCallAnimation, incomingCallRef, landingPageRef, Slide1Animation, slide1ref, slide2ref } from "../../ui/gsap";
import Header from "../../ui/Header";
import { useSocket } from "../../context/Socket/SocketContext";
import { Link } from "react-router-dom";
import UserSkeleton from "./UsersSkeleton";


export default function Users() {
    const socket = useSocket();
    const userRef = useRef("");
    const {id ,setId} = useUser();
    const [allUsers , setAllUSers] = useState([]);
    const [loading ,setLoading ] = useState(true);

    useEffect(() => {
      socket.emit("get-friends");
    
      socket.on("load-users", (data) => {
        if (data?.friends) {
          setAllUSers(data.friends);
          console.log("Friends:", data.friends);
        }
        setLoading(false);
      });
    
      return () => {
        socket.off("load-users");
      };
    }, []);
    

    const handleUserClick = (id)=>{
        userRef.current = id;
        console.log(userRef);
        setId(userRef.current);
        console.log(id);


        Slide1Animation(slide1ref.current ,slide2ref.current);


        // on tapping on a user a room will be created
    }

    if(loading){
      return <div className="sc">
        <Header/>
        <UserSkeleton/>
      </div>
    }
    
  return (
    <div className="w-full ">
      <div>
        <Header/>
      </div>
      <div>
      {
        Array.isArray(allUsers) &&  allUsers.length > 0 ?
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
        (<Link to="/search" className="h-[100dvh] w-full flex items-center justify-center text-2xl">Add friend to start chatting</Link>)
      }
      </div>
    </div>
  )
}
