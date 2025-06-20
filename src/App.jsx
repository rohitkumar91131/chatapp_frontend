import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import { io } from "socket.io-client";
import { useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import QR_CODE_LOGIN from './Pages/Login/QR_CODE_LOGIN';
import QRScanComponent from './Pages/Login/QR_CODE_SCANNER';
const socket = io("http://localhost:4000", {
  withCredentials: true,
  autoConnect:false
});

export default function App(){
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
      <BrowserRouter>
       <Routes>
          <Route  path='/signup' element={<Signup/>}/>
          <Route  path='/login' element={<Login/>} />
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path='/qr-login' element={<QR_CODE_LOGIN/>} />
          <Route path="/qr-scan" element={<QRScanComponent/>} />
       </Routes>
      </BrowserRouter>
  )
}