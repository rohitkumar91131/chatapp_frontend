import gsap from 'gsap'


const mm = gsap.matchMedia();
let tl;
mm.add("(max-width:768px)" , ()=>{
    tl = gsap.timeline({
        paused : true,
        reversed : true
    });

    return ()=>{
        tl.kill();
        tl = null
    }

})


export const BringGroupChatIntoScreen = (ele1 , ele2)=>{
    tl.clear();
    tl.to(ele1,{
        x : "-100%",
        duration : 0.6,
        ease: "power3.out"
    },1);
    tl.to(ele2,{
        x : "-100%",
        duration : 0.6,
        ease: "power3.out"
    },1)
    tl.play();
}

export const BringGroupChatOutOfScreen = () =>{
    tl.reverse();
}


let tl2 = gsap.timeline({
    paused : true,
    reversed : true
})

export const BringSettingOfAGroupChatIntoPicture = (ele)=>{
    tl2.clear();
    tl2.to(ele,{
        autoAlpha : 1,
        duration : 0.2
    })
    tl2.play();
}
export const BringSettingOfAGroupChatOutOfPicture = ()=>{
    tl2.reverse();
}