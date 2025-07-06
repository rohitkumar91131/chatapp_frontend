import React from 'react'

function Status() {
  return (
    <div className="flex items-center justify-center h-full p-6 bg-gradient-to-br from-green-100 via-emerald-100 to-white">
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md animate-fadeIn border border-green-100">
        <div className="text-5xl mb-4">📶</div>
        <h1 className="text-3xl font-semibold text-green-700 mb-2">Status</h1>
        <p className="text-gray-600 mb-3">Status feature will come soon...</p>
        <span className="text-sm text-green-400 italic">🚧 This feature is in development mode</span>
      </div>
    </div>
  )
}

export default Status
