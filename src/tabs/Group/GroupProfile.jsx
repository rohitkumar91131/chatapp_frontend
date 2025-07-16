import { useEffect } from "react";
import { BringGroupChatOutOfScreen, BringSettingOfAGroupChatOutOfPicture, HideGroupDetails } from "./Animation/GroupAnimation";
import { useGroup } from "./context/GroupContext";
import { useSocket } from "../../context/Socket/SocketContext";

function GroupProfile() {
  const { allmembers, groupRoomId, setAllGroups, allGroups, setAllMembers, setGroupRoomId, groupBasicDetails } = useGroup();
  const socket = useSocket();

  useEffect(() => {
    console.log(allmembers)
  }, [allmembers]);

  const handleExitGroup = async () => {
    socket.emit("leave-group-of-group-room-id", groupRoomId, (response) => {
      if (!response.success) {
        alert(response.msg);
        return;
      }
      let newGroups = allGroups.filter(group => group.room_id !== groupRoomId)
      setAllGroups(newGroups);
      setGroupRoomId(null);
      setAllMembers([])
    })
    HideGroupDetails();
    BringGroupChatOutOfScreen();
  }

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between overflow-y-auto bg-white">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <img src="icons/cross.svg" className="w-6 h-6 cursor-pointer" alt="Close" onClick={HideGroupDetails} />
          <p className="text-lg font-semibold">Group Info</p>
        </div>

        <div className="flex justify-center">
          <img
            src={groupBasicDetails?.icon || "https://i.ibb.co/zVvrpt7w/dpPhoto.webp"}
            className="h-24 w-24 md:h-48 md:w-48 rounded-full object-cover"
            alt="Group DP"
          />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold">{groupBasicDetails?.name || "Group Name"}</h2>
          <p className="text-gray-600 text-sm">{groupBasicDetails?.description || "Group Description"}</p>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold">{allmembers?.length} members</h1>

          <div className="space-y-2">
            {allmembers.length > 0 ? (
              allmembers.map((member, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img
                    src="https://i.ibb.co/zVvrpt7w/dpPhoto.webp"
                    className="h-8 w-8 rounded-full object-cover"
                    alt="Member"
                  />
                  <div>
                    <p className="font-medium">{member.name || "Name"}</p>
                    <p className="text-sm text-gray-500">{member.about || "About"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>

      <button className="flex items-center justify-center gap-2 text-red-600 font-semibold mt-6 hover:underline" onClick={handleExitGroup}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Exit Group
      </button>
    </div>
  );
}

export default GroupProfile;
