import React from 'react';

export default function Button({ children, onClick, className }) {
  return (
    <button className={`px-10 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}