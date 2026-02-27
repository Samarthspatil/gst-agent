import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const types = {
    success: 'bg-khaki',
    error: 'bg-garnet',
    warning: 'bg-cotton',
    info: 'bg-garnet-light',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`fixed top-4 right-4 ${types[type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 z-50 animate-slide-in border-2 border-white/30`}>
      <span className="text-xl font-bold">{icons[type]}</span>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 font-bold"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
