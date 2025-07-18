import { useEffect, useState } from "react";
import { useSocket } from "../../context/Socket/SocketContext";
import { useGroup } from "./context/GroupContext";
import GroupChat from "./GroupChat";
import { BringAddMembersForm, BringGroupChatOutOfScreen, BringGroupDetails, BringSettingOfAGroupChatIntoPicture, BringSettingOfAGroupChatOutOfPicture, HideAddMembersForm } from "./Animation/GroupAnimation";
import GroupsIntro from "./GroupsIntro";
import { toast } from "react-toastify";
import AddMembersForm from "./AddMembersForm";

export default function Group() {
    const socket = useSocket();
    const { groupRoomId , setGroupRoomId , GroupSettingRef ,MembersAddFormRef , allGroups, setAllGroups ,GroupDetailsRef ,setAllMembers} = useGroup();
    const [groupBasicDetails , setGroupBasicDetails ] = useState();
    const [isSettingOpen , setIsOpenSetting ] = useState(false);
    const [isFormOpen , setIsFormOpen] = useState(false);
    useEffect(()=>{
      if(!groupRoomId){
        return;
      }
      socket.emit("get-group-basic-details",groupRoomId,(response)=>{
          console.log(response);
          if(!response.success){
            alert(response.msg);
            return;
          }
          setGroupBasicDetails(response?.basicDetails); 
          setAllMembers(response?.basicDetails?.members);         
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
      //console.log("Clicked")
    }
    const handleAddMembers = ()=>{
        // socket.emit("get-all-friends-details-for-adding-to-a-group-new",groupRoomId,(response)=>{
        //   if(!response.success){
        //     alert(response.msg);
        //     return;
        //   }
        //   setFriends(response?.allFriends);
        // })
        BringAddMembersForm(MembersAddFormRef.current);
    }
    const handleLeaveGroup = ()=>{
      socket.emit("leave-group-of-group-room-id",groupRoomId , (response)=>{
        //console.log(response);
        if(!response.success){
          alert(response.msg);
          return;
        }
        let newGroups = allGroups.filter(group => group.room_id !== groupRoomId )
        setAllGroups(newGroups);
        setGroupRoomId(null);
        BringGroupChatOutOfScreen();
      })

    }
  return (
    <div className="grid grid-rows-[1fr_9fr] relative ">
      <div className="flex w-full gap-4 items-center justify-between !p-3 ">
        <div className="flex gap-4 cursor-pointer" >
          <img src="return.svg" className="h-7 w-7 md:hidden" onClick={BringGroupChatOutOfScreen}/>
          <div className="w-full flex  gap-2" onClick={()=>BringGroupDetails(GroupDetailsRef.current)}>
          <img src={groupBasicDetails?.icon}
            className="w-[40px] h-[40px] rounded-full" />
        <span>
            <p>{groupBasicDetails?.name}</p>
            <p>{groupBasicDetails?.description}</p>
        </span>
          </div>
        </div>
        <span>
          <img src="setting.svg" className="h-[50px] w-[50px] cursor-pointer" onClick={handleOpenSetting}/>
          <div className="bg-white flex flex-col !p-2 rounded-md w-fit h-fit !bg-green-500 invisible opacity-0 absolute right-2" ref={GroupSettingRef}>
            <button 
              className="hover:underline rounded-md !p-2 active:scale-95"
              onClick={handleShare}
            >🔗 Share Group </button>
           <button className="flex items-center gap-2 !p-2 hover:underline active:scale-95" onClick={handleAddMembers}>
             ➕ Add Members
           </button>
            <button className="hover:underline !p-2 active:scale-95" onClick={handleLeaveGroup}>👋 Leave Group</button>
            <button className="hover:underline !p-2 active:scale-95" onClick={()=>BringGroupDetails(GroupDetailsRef.current)}>Show members</button>
          </div>
          <div className="flex bg-white !p-2 absolute right-2 !bg-blue-500 max-h-[50dvh] border invisible opacity-0 max-w-[80%] w-[50%]" ref={MembersAddFormRef}>
            <AddMembersForm/>
          </div>
        </span>
      </div>
      <div className="">
        <GroupChat/>
      </div>


    </div>
  )
}
