import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { useSocket } from "../../context/Socket/SocketContext";

export default function SearchUser() {
  const socket = useSocket();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useRef(
    debounce((value) => {
      socket.emit("search-user", value, (response) => {
        setUsers(response);
      });
    }, 300)
  ).current;

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
  }, []);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value || value.trim().length === 0) {
      console.log("No values");
      setUsers([]);
      return;
    }
    debouncedSearch(value);
  };

  const handleAddFriend = (userId) => {
    socket.emit("send-friend-request", userId, (response) => {
      if (response.success) {
        alert("Friend request sent!");
      } else {
        alert("Failed to send request.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-start pt-20 px-4">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🔍 Search Users</h2>

        <input
          type="text"
          placeholder="Type a name..."
          value={search}
          onChange={handleSearchInputChange}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />

        <div className="space-y-3">
          {users.length === 0 ? (
            <p className="text-gray-500 text-center">No users found.</p>
          ) : (
            users.map((user) => (
              <div
                key={user._id || user.name}
                className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl shadow hover:shadow-md transition duration-200"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.profilePhoto || "https://ibb.co/WvJ6ZRP1"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border border-purple-200"
                  />
                  <p className="text-lg font-medium text-gray-700">{user.name}</p>
                </div>

                <button
                  onClick={() => handleAddFriend(user._id)}
                  className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-xl transition"
                >
                  Add to Friend
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
