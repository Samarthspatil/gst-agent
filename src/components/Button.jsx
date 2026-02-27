import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled = false,
  className = '',
  fullWidth = false 
}) => {
  const baseStyles = 'px-6 py-3 rounded-full font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-garnet text-white hover:bg-cotton hover:text-garnet focus:ring-cotton disabled:bg-gray-400 disabled:opacity-50 shadow-md',
    secondary: 'bg-cotton text-white hover:bg-cotton-dark focus:ring-cotton-light disabled:bg-gray-300 shadow-sm',
    success: 'bg-khaki text-white hover:bg-khaki-dark focus:ring-khaki-light disabled:bg-gray-400 disabled:opacity-50 shadow-sm',
    danger: 'bg-garnet-dark text-white hover:bg-garnet focus:ring-garnet-light disabled:bg-red-300 shadow-sm',
    outline: 'border-2 border-garnet text-garnet hover:bg-garnet hover:text-white focus:ring-garnet-light disabled:border-gray-400 disabled:text-gray-400',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className} disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

export default Button;
