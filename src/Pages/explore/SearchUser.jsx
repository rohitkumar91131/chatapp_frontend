import { useEffect, useState } from "react";
import { useSocket } from "../../context/Socket/SocketContext";
import { Link } from "react-router-dom";

export default function SearchUser() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const socket = useSocket();

  useEffect(() => {
    if(!socket.connected){
      socket.connect();
    }
    const fetchUsers = async () => {
      if (!search.trim()) {
        setUsers([]);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search }),
        });

        const data = await res.json();
        if (data.success) {
          setUsers(data.users);
        } else {
          setUsers([]);
        }
      } catch (err) {
        setUsers([]);
      }
    };

    fetchUsers();
  }, [search]);

  const handleAddFriend = async (userId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat/verifyLogin`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        if (socket && socket.connected) {
          socket.emit("send-friend-request", userId, (res) => {
            if (res.success) {
              alert("Friend request sent successfully");
            } else {
              alert("Failed to send friend request");
            }
          });
        } else {
          alert("Socket not connected.");
        }
      } else {
        alert(data.msg || "You must be logged in to send a friend request.");
      }
    } catch (err) {
      alert("An error occurred while sending the friend request.");
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex justify-center items-center ">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          🔍 Search Users
        </h2>

        <input
          type="text"
          placeholder="Type a name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 mb-8 border border-gray-300 rounded-2xl text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />

        {users.length === 0 ? (
          <p className="text-gray-500 text-center">No users found.</p>
        ) : (
          <div className="space-y-5 max-h-96 overflow-y-auto pr-2">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center bg-purple-50 border border-purple-200 rounded-2xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4">
                  <Link to={`/${user.username}`} ><img
                    src={user.profilePhoto || "https://i.ibb.co/WvJ6ZRP/profile.png"}
                    alt={user.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-purple-300 shadow-sm"
                  /></Link>
                  <div>
                    <p className="text-lg font-semibold text-purple-800">{user.name}</p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleAddFriend(user._id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-5 py-2 rounded-xl shadow transition-all duration-200"
                >
                  Add Friend
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
