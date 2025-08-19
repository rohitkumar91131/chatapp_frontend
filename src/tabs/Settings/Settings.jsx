import React, { useState } from "react";
import { Sun, Moon, Bell, LogOut } from "lucide-react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    console.log("User logged out");
    // Add your logout logic here
  };

  const showNotifications = () => {
    console.log("Showing notifications");
    // Replace with your actual notifications popup/page
  };

  return (
    <div className="flex items-center justify-center h-full p-6 bg-gradient-to-br from-purple-100 via-violet-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 w-full max-w-md animate-fadeIn border border-purple-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-6 text-center">
          ⚙️ Settings
        </h1>

        <div className="space-y-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-between w-full p-4 rounded-xl bg-purple-50 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-gray-700 transition"
          >
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {darkMode ? "Dark Mode" : "Light Mode"}
            </span>
            {darkMode ? (
              <Moon className="w-5 h-5 text-purple-500" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-500" />
            )}
          </button>

          {/* Notifications */}
          <button
            onClick={showNotifications}
            className="flex items-center justify-between w-full p-4 rounded-xl bg-purple-50 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-gray-700 transition"
          >
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              Show Notifications
            </span>
            <Bell className="w-5 h-5 text-purple-500" />
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-between w-full p-4 rounded-xl bg-red-50 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-gray-700 transition"
          >
            <span className="text-red-600 dark:text-red-400 font-medium">
              Logout
            </span>
            <LogOut className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
