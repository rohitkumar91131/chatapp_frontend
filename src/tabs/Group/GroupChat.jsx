import React, { useRef, useState } from 'react';
import { useGroup } from './context/GroupContext';
import { useSocket } from '../../context/Socket/SocketContext';
import GroupChatMsgs from './GroupChatMsgs';

export default function GroupChat() {
  const { groupRoomId } = useGroup();
  const [msg, setMessage] = useState("");
  const socket = useSocket();
  const textareaRef = useRef();

  const handleGroupMessageFormSubmit = (e) => {
    e.preventDefault();

    if (!msg.trim()) return; // prevent empty messages

    socket.emit("send-a-new-msg-to-the-group", { msg, groupRoomId }, (response) => {
      console.log(response);
    });

    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset height after send
    }
  };

  const handleGroupInputChange = (e) => {
    setMessage(e.target.value);
  };

  const autoGrow = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  };

  return (
    <div className='h-[80dvh] md:h-[90dvh] grid grid-rows-[8fr_1fr] md:grid-rows-[9fr_1fr] bg-white shadow-xl rounded-xl overflow-hidden'>
      <div className='overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-gray-100 max-h-full'>
        <GroupChatMsgs />
      </div>
      <form className="grid grid-cols-[8fr_2fr] items-end p-2 gap-2" onSubmit={handleGroupMessageFormSubmit}>
        <textarea
          ref={textareaRef}
          className="border hover:outline-green-500 resize-none overflow-hidden w-full rounded-lg p-2"
          placeholder="💬 Type your message..."
          value={msg}
          rows="1"
          onChange={(e) => {
            handleGroupInputChange(e);
            autoGrow();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // prevent newline
              handleGroupMessageFormSubmit(e); // send msg
            }
          }}
        
        ></textarea>
        <button className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition">
          Send
        </button>
      </form>
    </div>
  );
}
