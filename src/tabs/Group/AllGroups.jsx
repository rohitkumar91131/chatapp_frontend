import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/Socket/SocketContext";
import { BringGroupChatIntoScreen } from "./Animation/GroupAnimation";
import { useGroup } from "./context/GroupContext";

function AllGroups() {
  const socket = useSocket();
  const [allGroups, setAllGroups] = useState([]);
  const [noGroup, setNoGroup] = useState(false);
  const {GroupSlideRef , GroupsSlideRef, groupRoomId , setGroupRoomId} = useGroup();
  const groupRoomIdRef  = useRef();
  
  useEffect(() => {
    socket.emit("load-all-groups-of-the-user", {}, (response) => {
        console.log(response.allGroups)
      if (!response.success) {
        alert(response.msg);
        return;
      }
      if (response.msg === "No group found") {
        setNoGroup(true);
       // alert("yes")
        return;
      }
      setAllGroups(response.allGroups);
    });
  }, [noGroup]);

  if (noGroup) {
    return (
      <div className="flex items-center justify-center text-gray-600 h-full text-lg">
        No groups found 🙁. Create one or join a group!
      </div>
    );
  }
  const handleGroupOpenClick = (roomId)=>{
  if(!GroupSlideRef.current && GroupsSlideRef.current){
    return;
  }
  setGroupRoomId(roomId)
  console.log(groupRoomId)
  BringGroupChatIntoScreen(GroupsSlideRef.current , GroupSlideRef.current);
  }

  return (
    <div className="w-full  h-[81dvh] md:h-[90dvh]  overflow-y-auto">
      {allGroups.length > 0 ? (
        allGroups.map((group, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white shadow-sm  p-3 hover:bg-gray-100 transition"
            onClick={()=> handleGroupOpenClick(group?.room_id)}
          >
            <img
              src={group?.icon}
              className="h-12 w-12 rounded-full object-cover border"
              alt={group?.name}
            />
            <div>
              <p className="text-md font-medium text-gray-800">{group?.name}</p>
              {group?.description && (
                <p className="text-sm text-gray-500 truncate w-[200px]">{group?.description}</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center text-gray-600 h-full text-lg">Loading groups… ⏳</div>
      )}
    </div>
  );
}

export default AllGroups;
