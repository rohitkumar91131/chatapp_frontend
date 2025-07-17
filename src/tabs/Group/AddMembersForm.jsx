import { useEffect, useState } from "react";
import { useGroup } from "./context/GroupContext";
import { useSocket } from "../../context/Socket/SocketContext";
import { HideAddMembersForm } from "./Animation/GroupAnimation";

export default function AddMembersForm() {
  const [friends, setFriends] = useState([]);
  const { groupRoomId } = useGroup();
  const socket = useSocket();
  const [selectedFriends, setSelectedFriends] = useState([]);

  useEffect(() => {
    if (!groupRoomId) return;

    socket.emit("get-all-friends-details-for-adding-to-a-group-new", groupRoomId, (response) => {
      if (!response.success) {
        alert(response.msg);
        return;
      }
      setFriends(response.allFriends || []);
    });

    return () => {
      setFriends([]);
      setSelectedFriends([]);
    };
  }, [groupRoomId]);

  const handleGroupAddClick = () => {
    socket.emit("add-these-user-ids-to-group-and-room", { groupRoomId, selectedFriends }, (response) => {
      alert(response.msg);
    });
  };

  const handleInputTickChange = (e, id) => {
    if (e.target.checked) {
      setSelectedFriends((prev) => [...prev, id]);
    } else {
      setSelectedFriends((prev) => prev.filter((friend) => friend !== id));
    }
  };

  const handleAddFormReturn = () => {
    HideAddMembersForm();
  };

  return (
    <div className="w-full max-h-[70dvh] md:max-h-[90dvh] overflow-y-auto">
      {friends?.length > 0 ? (
        <div className="w-full flex flex-col max-h-[50dvh] overflow-y-auto">
          <img
            src="return.svg"
            alt="Return"
            className="w-6 h-6 cursor-pointer mb-2"
            onClick={handleAddFormReturn}
          />
          {friends.map((friend, index) => (
            <div className="flex justify-between w-full p-2" key={index}>
              <label className="text-xl">{friend.name}</label>
              <input
                type="checkbox"
                className="w-5 h-5"
                onChange={(e) => handleInputTickChange(e, friend._id)}
              />
            </div>
          ))}
          <button
            disabled={selectedFriends.length === 0}
            className={`border p-2 bg-red-500 rounded-md active:scale-95 mt-3 ${
              selectedFriends.length === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleGroupAddClick}
          >
            Add to group
          </button>
        </div>
      ) : (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-md bg-yellow-100 text-black font-medium hover:bg-yellow-200 cursor-pointer transition-all duration-200"
        >
          <img src="return.svg" alt="Return" className="w-5 h-5"           onClick={handleAddFormReturn} />
          <span>No new friends to add in this group — please find new friends on Vartalaap.</span>
        </div>
      )}
    </div>
  );
}
