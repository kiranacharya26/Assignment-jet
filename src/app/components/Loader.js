"use client";
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
