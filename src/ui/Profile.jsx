import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSocket } from "../context/Socket/SocketContext";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);
  // const { username } = useParams();
  const socket = useSocket();

  useEffect(() => {
    // if (!username) return;
    socket.connect();

    socket.emit("get-user-data-for-profile",{},(res)=>{
      setUser(res)
    })
    // async function loadUserData() {
    //   try {
    //     const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getUserData/${username}`);
    //     const data = await res.json();
    //     if (data.success) {
    //       setUser(data.user);
    //     } else {
    //       setNotFound(true);
    //       toast(data.msg)
    //     }
    //   } catch (err) {
    //     console.error(err.message);
    //     toast.error("Failed to load user data");
    //     setNotFound(true);
    //   }
    // }

    // loadUserData();
  }, []);

  if (notFound) {
    return (
      <div className="h-full  w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 text-gray-800 px-4 text-center">
        <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full">
          <img
            src="/no-user-found.svg"
            alt="Not Found"
            className="w-40 h-40 mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold mb-2">Oops! Profile Not Found</h1>
          <p className="text-gray-600 mb-6">
            The user <span className="font-semibold text-purple-700">@{username}</span> doesn’t exist or has been removed.
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
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 p-4 md:p-10 h-[90dvh] md:h-full w-full overflow-y-scroll">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user?.profilePhoto || "/default-avatar.png"}
            alt="avatar"
            className="w-32 h-32 rounded-full shadow-lg border-4 border-white object-cover"
          />
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
            <p className="text-sm text-gray-500">@{user?.username}</p>
            <p className="mt-2 text-gray-600">{user?.bio || "No bio available."}</p>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition">
                Message
              </button>
              <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-xl hover:bg-blue-100 transition">
                Add Friend
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-around mt-8 text-center">
          <div>
            <p className="text-lg font-semibold text-gray-700">{user?.friends?.length || 0}</p>
            <p className="text-sm text-gray-500">Friends</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700">{user?.posts?.length || 0}</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700">{user?.photos?.length || 0}</p>
            <p className="text-sm text-gray-500">Photos</p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <div className="flex gap-4 text-gray-600 mb-4">
            <button className="font-semibold border-b-2 border-blue-500 text-blue-500">
              About
            </button>
            <button className="hover:text-blue-500">Friends</button>
            <button className="hover:text-blue-500">Photos</button>
          </div>

          <div className="text-gray-700">
            <h2 className="font-semibold text-lg mb-2">About</h2>
            <p>
              {user?.bio ||
                "I'm a passionate conversationalist who loves connecting with people through meaningful conversations. In Vartalaap, I share thoughts, listen, and build bonds."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
