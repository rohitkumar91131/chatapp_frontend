import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function QR_CODE_LOGIN() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function get_session_id() {
      try {
        const res = await fetch(`${BACKEND_URL}/generate_session_id`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!data.success) {
          toast(data.msg);
          return;
        }
        setValue(data.sessionId);
      } catch (err) {
        toast("Try another login method");
      }
    }
    get_session_id();
  }, []);

  useEffect(() => {
    async function check_login_status() {
      if (!value) return;
      try {
        const res = await fetch(`${BACKEND_URL}/poll-login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ result: value }),
        });
        const data = await res.json();
        if (data.success) {
          toast(data.msg);
          navigate("/");
        }
      } catch (err) {
        toast(err.message);
      }
    }

    const interval = setInterval(() => {
      check_login_status();
    }, 2000);

    return () => clearInterval(interval);
  }, [value]);

  if (!value) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-full h-[100dvh] flex flex-col items-center justify-center px-4 bg-gradient-to-br from-white to-blue-100">
      <div className="flex items-center gap-2 mb-8">
        <img src="/logo.svg" alt="logo" className="w-10 h-10" />
        <h1 className="text-3xl font-bold text-blue-600">Vartalaap</h1>
      </div>

      <p className="text-xl sm:text-2xl font-semibold text-gray-700 text-center mb-6">
        Log in via QR Code
      </p>

      <div className="p-4 bg-white shadow-xl rounded-lg w-60 sm:w-72">
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={value}
          viewBox={`0 0 256 256`}
        />
      </div>

      <p className="mt-4 text-sm text-gray-600 text-center">
        📱 Scan the QR code from a <span className="font-semibold">logged-in device</span> to log in.
      </p>

      <Link
        to="/login"
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all duration-200"
      >
        Login via username
      </Link>
    </div>
  );
}
