import { useState } from "react";

export default function ThirdPartyCookiesAlert() {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText("authentication-frontend-mdye.onrender.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="h-[100dvh] w-[100dvw] flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 animate-fade-in">
      <div className="max-w-2xl bg-white border-2 border-yellow-400 rounded-2xl shadow-xl p-6 space-y-4 transform transition duration-500 hover:scale-[1.01]">
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-700 tracking-wide">
          ⚠️ Attention Required
        </h2>
        <p className="text-base sm:text-lg text-yellow-800 leading-relaxed">
          Our website <span className="font-semibold text-yellow-900">relies on third-party cookies</span> to function properly.
        </p>
        <p className="text-base sm:text-lg text-yellow-800 leading-relaxed">
          To continue, please <span className="underline underline-offset-2">enable third-party cookies</span> in your browser, or add this domain to your exceptions:
        </p>

        <div
          onClick={handleClick}
          className="cursor-pointer font-mono text-sm sm:text-base text-yellow-900 bg-yellow-100 hover:bg-yellow-200 transition rounded-md px-4 py-2 inline-block select-all border border-yellow-300"
        >
          authentication-frontend-mdye.onrender.com
        </div>

        <p className="text-sm text-yellow-700 italic">
          We truly appreciate your patience and understanding.
        </p>
      </div>

      {copied && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-slide-up-fade">
          ✅ Copied to clipboard!
        </div>
      )}
    </div>
  );
}
