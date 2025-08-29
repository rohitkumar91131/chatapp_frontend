export default function UserSkeleton({ count = 10 }) {
    return (
      <div className="space-y-2 px-4 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 bg-gray-200 animate-pulse h-12 rounded"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full" /> 
            <div className="flex-1 h-4 bg-gray-300 rounded" /> 
          </div>
        ))}
      </div>
    );
  }
  