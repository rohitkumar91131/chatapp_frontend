function ProfileSkeleton() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 animate-pulse">
        <div className="flex items-center gap-6 w-full max-w-lg">
          <div className="w-24 h-24 rounded-full bg-gray-300"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
            <div className="h-8 w-28 bg-gray-400 rounded-2xl mt-2"></div>
          </div>
        </div>
  
        <div className="mt-10 w-full max-w-lg">
          <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="p-2 flex flex-col items-center border rounded-lg shadow bg-white animate-pulse"
              >
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div className="h-4 w-16 bg-gray-200 rounded mt-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default ProfileSkeleton;
  