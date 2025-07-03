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
    <div className="w-screen min-h-[100dvh] bg-gradient-to-tr from-pink-100 via-white to-pink-200 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-7 flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <img
            src="logo.svg"
            alt="Vartalaap Logo"
            className="w-[100px] h-[100px] rounded-full object-cover shadow-md"
          />
          <Link
            to="/"
            className="text-4xl sm:text-5xl font-extrabold text-pink-600 tracking-wide hover:underline"
          >
            <h2 className="text-xl sm:text-2xl text-gray-800 font-medium">
               👋 Welcome to <span className="text-pink-600 font-semibold">Vartalaap</span>
            </h2>

          </Link>
        </div>

        <p className="text-base sm:text-lg text-gray-700 max-w-md leading-relaxed">
          Create your online presence. Connect, chat, and explore the world of conversations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            to="/login"
            className="w-full sm:w-auto px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow hover:bg-pink-600 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="w-full sm:w-auto px-6 py-3 bg-white border border-pink-500 text-pink-600 font-semibold rounded-lg shadow hover:bg-pink-50 transition"
          >
            Signup
          </Link>
        </div>

        <div className="flex flex-col gap-4 w-full">
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
        </div>

        {user && (
          <div className="w-full text-left bg-gray-100 p-4 rounded-md overflow-auto max-h-60 border border-gray-300">
            <pre className="text-sm font-mono text-gray-800">{user}</pre>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
