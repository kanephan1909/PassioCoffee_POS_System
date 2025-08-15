import React from 'react';

const FullScreenLoader = ({ 
  message = "Đang tải...", 
  size = "medium",
  color = "#A6CE39" 
}) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12", 
    large: "w-16 h-16"
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      {/* Spinner */}
      <div className="relative">
        <div 
          className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 border-t-transparent animate-spin`}
          style={{ borderTopColor: color }}
        ></div>
        
        {/* Inner spinning dot */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: color }}
        ></div>
      </div>
      
      {/* Loading message */}
      {message && (
        <p className="mt-4 text-gray-600 text-lg font-medium animate-pulse">
          {message}
        </p>
      )}
      
      {/* Animated dots */}
      <div className="flex space-x-1 mt-2">
        <div 
          className="w-2 h-2 rounded-full animate-bounce"
          style={{ backgroundColor: color, animationDelay: '0ms' }}
        ></div>
        <div 
          className="w-2 h-2 rounded-full animate-bounce"
          style={{ backgroundColor: color, animationDelay: '150ms' }}
        ></div>
        <div 
          className="w-2 h-2 rounded-full animate-bounce"
          style={{ backgroundColor: color, animationDelay: '300ms' }}
        ></div>
      </div>
    </div>
  );
};


export default FullScreenLoader;