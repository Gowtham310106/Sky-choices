import React from 'react';

function LoadingSpinner({ size = "medium" }) {
  const sizes = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  };
  
  return (
    <div className={`${sizes[size]} border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin`}></div>
  );
}

export default LoadingSpinner;