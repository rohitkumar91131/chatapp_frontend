// this file is used for the animation by gsap

import gsap from 'gsap'
import { createRef } from 'react';


const mm = gsap.matchMedia();
let tl;

mm.add("(max-width:768px)",()=>{
  tl = gsap.timeline({
    paused : true
  })

  return ()=>{
    tl.kill();
    tl = null;
  }
})
// this is for right to left
export const Slide1Animation = (element1 , element2) =>{
  tl.clear();
  tl.to(element1,{
    x:"-100%",
    duration : 1
  },1);
  tl.to(element2,{
    x:"-100%",
    duration : 1
  },1)
 tl.play();
}



// this is to reverse
export const Slide2Animation = ()=>{
  tl.reverse();
}


export const slide1ref = createRef();
export const slide2ref = createRef();
