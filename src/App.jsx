import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import QR_CODE_LOGIN from './Pages/Login/QR_CODE_LOGIN';
import QRScanComponent from './Pages/Login/QR_CODE_SCANNER';
import HomePage from './Pages/HomePage/Home';
import { SocketContext } from './context/Socket/SocketContext';
import {  UserProvider } from './context/User/UserContext';
import CallNotification from './Pages/HomePage/CallNotification';
import { IncomingCallAnimation, incomingCallNotificatioRef, incomingCallRef } from './ui/gsap';


const socket = io(import.meta.env.VITE_BACKEND_URL,{
  withCredentials : true,
  autoConnect : false
})

export default function App(){
   const [incomingCall , setIncomingCall] = useState(false);
   

  
  useEffect(()=>{
    if(incomingCall){
      IncomingCallAnimation(incomingCallRef.current);
    }
    
    
    socket.on("incoming-call-notification",()=>{
      setIncomingCall(true);
    })

    return () => {
      socket.off("incoming-call-notification");
    };
  },[incomingCall])




  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Connected with socket id:", socket.id);
  //   });
  
  //   socket.on("receive-message", (data) => {
  //     console.log("Received message:", data);
  //   });
  
  //   return () => {
  //     socket.off("connect");
  //     socket.off("receive-message");
  //   };
  // }, []);
  return (
    <SocketContext.Provider value={socket}>
          <UserProvider>
      <BrowserRouter>
      <CallNotification/>
       <Routes>
          
          <Route path='/' element={<HomePage/>} />
          <Route  path='/signup' element={<Signup/>}/>
          <Route  path='/login' element={<Login/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/qr-login' element={<QR_CODE_LOGIN/>} />
          <Route path="/qr-scan" element={<QRScanComponent/>} />
       </Routes>
      </BrowserRouter>
      </UserProvider>
    </SocketContext.Provider>  

  )
}