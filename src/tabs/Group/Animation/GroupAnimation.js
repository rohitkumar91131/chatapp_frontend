import gsap from 'gsap';

const mm = gsap.matchMedia();
let tl;

mm.add("(max-width:768px)", () => {
  tl = gsap.timeline({
    paused: true,
    reversed: true,
  });

  return () => {
    tl.kill();
    tl = null;
  };
});

export const BringGroupChatIntoScreen = (ele1, ele2) => {
  if (!tl) return;
  tl.clear();
  tl.to(ele1, {
    x: "-100%",
    duration: 0.6,
    ease: "power3.out",
  }, 0);
  tl.to(ele2, {
    x: "-100%",
    duration: 0.6,
    ease: "power3.out",
  }, 0);
  tl.seek(0).play();
};

export const BringGroupChatOutOfScreen = () => {
  if (tl) tl.reverse();
};

let tl2 = gsap.timeline({
  paused: true,
  reversed: true,
});

export const BringSettingOfAGroupChatIntoPicture = (ele) => {
  tl2.clear();
  tl2.to(ele, {
    autoAlpha: 1,
    duration: 0.2,
  });
  tl2.seek(0).play();
};

export const BringSettingOfAGroupChatOutOfPicture = () => {
  return new Promise((resolve) => {
    tl2.eventCallback("onReverseComplete", resolve);
    tl2.reverse();
  });
};

let tl3 = gsap.timeline({
  paused: true,
  reversed: true,
});

export const BringAddMembersForm = (ele) => {
  tl3.clear();
  tl3.to(ele, {
    autoAlpha: 1,
    duration: 0.2,
  });
  tl3.seek(0).play();
};

export const HideAddMembersForm = () => {
  tl3.reverse();
};

let tl4 = gsap.timeline({
  paused: true,
  reversed: true,
});

export const BringGroupDetails = (ele) => {
  tl4.clear();
  tl4.to(ele, {
    top: "0%",
    duration: 1,
    ease: "power2.out",
  });
  tl4.seek(0).play();
};

export const HideGroupDetails = () => {
  return new Promise((resolve) => {
    tl4.eventCallback("onReverseComplete", resolve);
    tl4.reverse();
  });
};
