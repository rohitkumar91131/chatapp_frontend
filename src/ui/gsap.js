import { gsap } from "gsap";

export const tl = gsap.timeline({ paused: true });

export const initChatAnimation = (chatRef) => {
  tl.fromTo(
    chatRef,
    { x: "100%" },
    { x: "0%", duration: 0.4, ease: "power2.out" }
  );
};
