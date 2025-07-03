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
import { bringVideoCallInScreen, IncomingCallAnimation, incomingCallNotificatioRef, incomingCallRef, videoCallAfterTappingOnAcceptCall } from './ui/gsap';
import VideoCall2 from './Pages/HomePage/VideoCall2';
import { CallStatusProvider } from './Pages/HomePage/Video-call-Ref';
import { ToastContainer } from 'react-toastify';


const socket = io(import.meta.env.VITE_BACKEND_URL,{
  withCredentials : true,
  autoConnect : false
})

export default function App(){
   

   
  useEffect(()=>{
 


    //bringVideoCallInScreen(videoCallAfterTappingOnAcceptCall.current);

    return () => {
    };
  },[])




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
      <CallStatusProvider>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
          <UserProvider>
      <BrowserRouter>
      <CallNotification/>
      <div className='absolute top-[-100%]' ref={videoCallAfterTappingOnAcceptCall}>
         <VideoCall2/>
      </div>
       <Routes>
          
       <Route path='/' element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/login' element={<Login/>} />
       <Route path='/home' element={<Home/>} />
       <Route path='/qr-login' element={<QR_CODE_LOGIN/>} />
       <Route path='/qr-scan' element={<ProtectedRoute><QRScanComponent/></ProtectedRoute>} />

       </Routes>
      </BrowserRouter>
      </UserProvider>
      </CallStatusProvider>
    </SocketContext.Provider>  

  )
}


