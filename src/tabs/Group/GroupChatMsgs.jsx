import { useEffect, useState } from "react";
import { useSocket } from "../../context/Socket/SocketContext"
import { useGroup } from "./context/GroupContext";
import { useUser } from "../../context/User/UserContext";

function GroupChatMsgs() {
    const socket = useSocket();
    const {groupRoomId ,loggedInUserId , setLoggedInUserId} = useGroup();
    const [allMessagesOfAGroup , setAllMessagesOfAGroup] = useState([]);
    const [ msgLoading , setMsgLoading] = useState(true);
    useEffect(()=>{
        if(!groupRoomId){
            return;
        }
        //console.log("nhi " +loggedInUserId)
        if(!loggedInUserId){
            return;
        }

        socket.emit("send-all-the-messages-of-a-group",groupRoomId,(response)=>{
            if(!response?.success){
                toast(response?.msg);
                return;
            }
            console.log(response?.allMessages)
            setAllMessagesOfAGroup(response?.allMessages);
            setMsgLoading(false);
        })

        socket.on("new-message",(response)=>{
            console.log(response)
            setAllMessagesOfAGroup(prev=> [
                ...prev , 
                response
            ])        
        })

        return ()=>{
            //setAllMessagesOfAGroup([]);
            //setMsgLoading(true);
            socket.off("new-message");
        }
    },[groupRoomId])
  return (
    <div className="h-full w-full overflow-x-hidden">
      {
        allMessagesOfAGroup?.length > 0 ?
        (
        <div className={"flex flex-col w-full "}>    
            {allMessagesOfAGroup.map((msg , index) =>(
              <div key={index} className={`flex w-full ${loggedInUserId === msg.senderId.toString() ? "justify-end" : "justify-start"}` }>  
                <div  className={`flex flex-col flex-wrap h-fit max-w-[80%] border !p-2 rounded-md `}>
                    <p className="break-all whitespace-pre-wrap ">{msg?.content}</p>
                    <p className="self-end">{new Date(msg?.createdAt).toDateString()}</p>
                </div>    
              </div>  
            ))
        }
        </div>    
        )
        :
        <div className="w-full h-full flex items-center justify-center">
            {
                msgLoading ? 
                <p>Loading</p>
                :
                <p>No chat found</p>
            }
        </div>    
      }
    </div>
  )
}

export default GroupChatMsgs
