// this file is used for the animation by gsap

import gsap from 'gsap'
import { createRef } from 'react';


const mm = gsap.matchMedia();
let tl ;
let tl2;
let tl3;

mm.add("(max-width:768px)",()=>{
  tl = gsap.timeline({
    paused : true
  })
  tl2 = gsap.timeline({
    paused : true
  })



  return ()=>{
    tl.kill();
    tl2.kill();
    tl.kill();
    tl2 = null;
    tl = null;
  }
})
// this is for right to left
export const Slide1Animation = (element1 , element2) =>{
  tl.clear();
  tl.to(element1,{
    x:"-100%",
    duration : 0.2
  },0.2);
  tl.to(element2,{
    x:"-100%",
    duration : 0.2
  },0.2)
 tl.play();
}



// this is to reverse
export const Slide2Animation = ()=>{
  tl.reverse();
}


export const slide1ref = createRef();
export const slide2ref = createRef();


export const VideoCallAnimation = (element ,element2)=>{
  tl2.clear();
  tl2.to(element,{
    x : "-200%",
    duration : 0.2
  },1)
  tl2.to(element2,{
    x :"-200%",
    duration:0.2
  },1)
  tl2.play();
}


export const videoCallRef = createRef();

tl3 = gsap.timeline({
  paused : true
})
export const IncomingCallAnimation  = (element) =>{
  tl3.clear();
  tl3.to(element,{
    top:0,
    duration : 1
  })
  tl3.play();

}
export const reverseIncomingCallAnimation = () =>{
  tl3.reverse();
}
export const incomingCallRef = createRef();

export const incomingCallNotificatioRef = createRef();
incomingCallNotificatioRef.current = false;