import React from 'react';

export default function Button({ children, onClick }) {
  return (
    <button className="px-10 py-2 bg-gray-700 text-white rounded-lg" onClick={onClick}>
      {children}
    </button>
  );
}