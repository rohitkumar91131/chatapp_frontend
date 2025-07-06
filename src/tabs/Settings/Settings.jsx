import React from 'react'

function Settings() {
  return (
    <div className="flex items-center justify-center h-full p-6 bg-gradient-to-br from-purple-100 via-violet-100 to-white">
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md animate-fadeIn border border-purple-100">
        <div className="text-5xl mb-4">⚙️</div>
        <h1 className="text-3xl font-semibold text-purple-700 mb-2">Settings</h1>
        <p className="text-gray-600 mb-3">Setting feature will come soon</p>
        <span className="text-sm text-purple-400 italic">🚧 This feature is in development mode</span>
      </div>
    </div>
  )
}

export default Settings
