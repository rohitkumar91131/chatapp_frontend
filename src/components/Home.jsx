import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Home() {
  const [user, setUser] = useState(null);

  const verify = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/chat/verifyLogin`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setUser(data.msg);
      toast(data.msg);
    } catch (err) {
      toast(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      toast(data.msg);
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-tr from-pink-100 via-white to-pink-200 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8 flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-4">
          <img
            src="logo.svg"
            alt="Vartalaap Logo"
            className="w-14 h-14 rounded-full object-cover shadow-md"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 tracking-wide">
            Vartalaap
          </h1>
        </div>

        <p className="text-sm sm:text-base text-gray-700 max-w-md">
          Create your online presence. Connect, chat, and explore.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow hover:bg-pink-600 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 bg-white border border-pink-500 text-pink-600 font-semibold rounded-lg shadow hover:bg-pink-50 transition"
          >
            Signup
          </Link>
        </div>

        <button
          onClick={verify}
          className="w-full px-6 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
        >
          Tap to Verify Login
        </button>

        <button
          onClick={handleLogout}
          className="w-full px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>

        {user && (
          <div className="w-full text-left bg-gray-100 p-4 rounded-md overflow-auto max-h-60">
            <pre className="text-xs sm:text-sm">{user}</pre>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
