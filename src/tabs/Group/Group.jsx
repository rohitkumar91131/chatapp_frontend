import { useEffect, useState } from "react";
import { useSocket } from "../../context/Socket/SocketContext";
import { useGroup } from "./context/GroupContext";
import GroupChat from "./GroupChat";
import { BringGroupChatOutOfScreen, BringSettingOfAGroupChatIntoPicture, BringSettingOfAGroupChatOutOfPicture } from "./Animation/GroupAnimation";
import GroupsIntro from "./GroupsIntro";
import { toast } from "react-toastify";

export default function Group() {
    const socket = useSocket();
    const {groupRoomId , setGroupRoomId , GroupSettingRef} = useGroup();
    const [groupBasicDetails , setGroupBasicDetails ] = useState();
    const [isSettingOpen , setIsOpenSetting ] = useState(false);
    useEffect(()=>{
      if(!groupRoomId){
        return;
      }
      socket.emit("get-group-basic-details",groupRoomId,(response)=>{
          //console.log(response);
          if(!response.success){
            alert(response.msg);
            return;
          }
          setGroupBasicDetails(response?.basicDetails);          
      })
    },[groupRoomId])

    if(!groupRoomId){
      return <div>
        <GroupsIntro/>
      </div>
    }
    const handleShare = ()=>{
      const groupInvitationLink = `${import.meta.env.VITE_BACKEND_URL}/addToGroup/${groupRoomId}`;
      navigator.clipboard.writeText(groupInvitationLink)
      .then(()=>toast(`🔗 Link copied to clipboard!`))
      .catch(()=>toast("❌ Failed to copy link"))
    }
    const handleOpenSetting = ()=>{
      if(!isSettingOpen){
        setIsOpenSetting(!isSettingOpen);
        BringSettingOfAGroupChatIntoPicture(GroupSettingRef.current)
      }
      else{
        setIsOpenSetting(!isSettingOpen);
        BringSettingOfAGroupChatOutOfPicture();
      }
      console.log("Clicked")
    }
  return (
    <div className="grid grid-rows-[1fr_9fr] relative">
      <div className="flex w-full gap-4 items-center justify-between !p-3 ">
        <div className="flex gap-4">
          <img src="return.svg" className="h-7 w-7" onClick={BringGroupChatOutOfScreen}/>
          <img src={groupBasicDetails?.icon}
            className="w-[40px] h-[40px] rounded-full" />
        <span>
            <p>{groupBasicDetails?.name}</p>
            <p>{groupBasicDetails?.description}</p>
        </span>
        </div>
        <span>
          <img src="setting.svg" className="h-[50px] w-[50px]" onClick={handleOpenSetting}/>
          <div className="bg-white flex flex-col !p-2 rounded-md w-fit h-fit !bg-green-500 invisible opacity-0 absolute right-2" ref={GroupSettingRef}>
            <button 
              className="hover:underline rounded-md !p-2 active:scale-95"
              onClick={handleShare}
            >🔗 Share Group </button>
            <button className="hover:underline !p-2 active:scale-95">👋 Leave Group</button>
          </div>
        </span>
      </div>
      <div className="">
        <GroupChat/>
      </div>


    </div>
  )
}
