import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSocket } from "../context/Socket/SocketContext";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);
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
  }, []);

  if (notFound) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl">
          <img
            src="/no-user-found.svg"
            alt="Not Found"
            className="w-32 h-32 mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-4">Something went wrong. Please try again later.</p>
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
            <p className="text-sm text-gray-500 mb-2">username :- @{user?.username}</p>
            <p className="text-gray-600 italic">
              {user?.bio || "No bio available. Let the world know who you are!"}
            </p>
          </div>
        </div>

        <div className="flex justify-around mt-8 text-center">
          <div>
            <p className="text-2xl font-semibold text-blue-600">{user?.connections.friends?.length || 0}</p>
            <p className="text-sm text-gray-500">Friends</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-blue-600">{user?.posts?.length || 0}</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-blue-600">{user?.photos?.length || 0}</p>
            <p className="text-sm text-gray-500">Photos</p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-gray-700">
          <h2 className="font-semibold text-xl mb-4 text-center md:text-left">About</h2>
          <p className="leading-relaxed text-center md:text-left">
            {user?.bio ||
              "I'm a passionate conversationalist who loves connecting with people through meaningful conversations. In Vartalaap, I share thoughts, listen, and build bonds."}
          </p>
        </div>
      </div>
    </div>
  );
}
