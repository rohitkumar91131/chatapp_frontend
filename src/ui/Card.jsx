import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSocket } from "../context/Socket/SocketContext";

export default function Login_Signup_Card({ formName, accountAlready }) {
  const socket = useSocket();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [passwordSame, setPasswordSame] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...dataToSend } = formData;
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/${formName.toLowerCase()}`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(dataToSend),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      let data = await res.json();
      toast(data.msg);
      if (formName === "login" && data.success) {
        socket.connect();
        navigate("/");
      }
      if (formName === "signup" && data.success) navigate("/login");
    } catch (err) {
      toast(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      setPasswordSame(formData.password === formData.confirmPassword);
    }
  }, [formData.password, formData.confirmPassword]);

  useEffect(() => {
    if(inputRef.current){
        inputRef.current.focus();

    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min- flex items-center justify-center bg-gradient-to-tr from-red-100 to-red-200 p-6"
    >
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="flex flex-col items-center">
          <img src="logo.svg" alt="Logo" className="w-16 h-16 mb-2" />
          <Link
            to="/home"
            className="text-4xl sm:text-5xl font-extrabold text-pink-600 tracking-wide hover:underline"
          >
            Vartalaap
          </Link>
          <h2 className="text-xl font-semibold mt-4 text-gray-700">
            {formName} Form
          </h2>
        </div>

        {formName === "signup" && (
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              id="name"
              ref={inputRef}
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
        )}

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <input
            id="password"
            required
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirm-password" className="text-sm font-semibold">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            required
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          {!passwordSame && (
            <p className="text-sm text-red-500 mt-1">
              Password and Confirm Password do not match.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <button
            disabled={!passwordSame}
            className={`w-full py-2 px-4 rounded-md font-semibold transition-all ${
              !passwordSame
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {formName}
          </button>
          {formName === "login" && (
            <Link
              to="/qr-login"
              className="w-full py-2 px-4 text-center bg-red-100 text-red-600 rounded-md border border-red-300 hover:bg-red-200"
            >
              Login via QR Code
            </Link>
          )}
        </div>

        <div className="text-center text-sm mt-4">
          {accountAlready ? (
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 font-semibold">
                Login here
              </Link>
            </p>
          ) : (
            <p>
              Don’t have an account?{" "}
              <Link to="/signup" className="text-red-500 font-semibold">
                Signup here
              </Link>
            </p>
          )}
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </form>
  );
}
