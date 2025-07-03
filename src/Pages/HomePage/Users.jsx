import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/Socket/SocketContext"
import { useUser } from "../../context/User/UserContext";
import { IncomingCallAnimation, incomingCallRef, landingPageRef, Slide1Animation, slide1ref, slide2ref } from "../../ui/gsap";
import Header from "../../ui/Header";


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


        Slide1Animation(slide1ref.current ,slide2ref.current);


        // on tapping on a user a room will be created
    }
  //  if(!allUsers.length >0){
  //   return (
  //         <div className="h-[100dvh] w-full flex block md:hidden flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 text-gray-800 px-4">
  //           <div >
  //           <img
  //             src="logo.svg"
  //             alt="Vartalaap Logo"
  //             className="w-24 h-24 mb-6 drop-shadow-lg animate-bounce-slow"
  //           />
  //           <h1 className="text-4xl font-semibold mb-2 tracking-wide">Welcome to Vaartalap</h1>
  //           <p className="text-lg text-gray-600">Start chatting with your friends in real-time</p>
  //           </div>
  //         </div>
  //       );
  //  }
    
  return (
    <div className="w-full ">
      <div>
        <Header/>
      </div>
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
        (<p className="h-[100dvh] w-full flex items-center justify-center text-2xl">Loading...</p>)
      }
      </div>
    </div>
  )
}
