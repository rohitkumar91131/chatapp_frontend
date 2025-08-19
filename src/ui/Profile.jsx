import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSocket } from "../context/Socket/SocketContext";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    socket.emit("get-user-data-for-profile", {}, (res) => {
      if (res?.success === false) {
        toast.error(res.msg || "User not found");
        setNotFound(true);
      } else {
        setUser(res);
      }
    });

    socket.emit("get-friends");
    socket.on("load-users", (res) => {
      if (Array.isArray(res)) {
        setFriends(res);
      } else if (res?.error) {
        toast.error(res.error || "Failed to load friends");
      } else {
        setFriends([]);
      }
    });

    return () => {
      socket.off("load-users");
    };
  }, [socket]);

  if (notFound) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl">
          <img
            src="/no-user-found.svg"
            alt="Not Found"
            className="w-32 h-32 mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            Something went wrong. Please try again later.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 rounded-full bg-purple-600 text-white font-medium shadow hover:bg-purple-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 p-6 md:p-12 h-[90dvh] md:h-full w-full overflow-y-auto">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="flex flex-col items-center gap-6">
          <img
            src={user?.profilePhoto || "/default-avatar.png"}
            alt="avatar"
            className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
            <p className="text-sm text-gray-500 mb-2">@{user?.username}</p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-gray-700">
          <h2 className="font-semibold text-xl mb-4 text-center md:text-left">
            About
          </h2>
          <p className="leading-relaxed text-center md:text-left">
            {user?.bio ||
              "I'm a passionate conversationalist who loves connecting with people through meaningful conversations. In Vartalaap, I share thoughts, listen, and build bonds."}
          </p>
        </div>

        {/* Friends Toggle Section */}
        <div className="mt-10 border-t pt-6 text-gray-700 text-center">
          <button
            onClick={() => setShowFriends(!showFriends)}
            className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
          >
            {showFriends ? "Hide Friends" : `Show Friends (${friends.length})`}
          </button>

          {showFriends && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {friends.length > 0 ? (
                friends.map((friend, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition flex flex-col items-center"
                  >
                    <img
                      src={friend.profilePhoto || "/default-avatar.png"}
                      alt={friend.name}
                      className="w-16 h-16 rounded-full object-cover mb-2"
                    />
                    <p className="text-sm font-medium text-gray-800">
                      {friend.name}
                    </p>
                    <p className="text-xs text-gray-500">@{friend.username}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-full">No friends yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
