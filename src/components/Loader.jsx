import React from 'react';

const Loader = ({ size = 'medium', text = 'Loading...' }) => {
  const sizes = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizes[size]} border-4 border-cotton/30 border-t-garnet rounded-full animate-spin`}></div>
      {text && <p className="text-garnet text-sm font-medium">{text}</p>}
    </div>
  );
};

export default Loader;
