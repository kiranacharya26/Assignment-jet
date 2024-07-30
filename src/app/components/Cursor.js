"use client";
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    controls.start({
      x: mousePosition.x - 30, // Adjusted offset for larger cursor
      y: mousePosition.y - 30, // Adjusted offset for larger cursor
      transition: { type: 'spring', stiffness: 400, damping: 20 },
    });
  }, [mousePosition, controls]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-50"
        animate={controls}
      />
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 border-2 border-white rounded-full pointer-events-none z-40"
        animate={controls}
        initial={{ scale: 0 }}
        whileHover={{ scale: 1.5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        style={{ backgroundColor: 'transparent' }} // No fill inside the circle
      />
    </>
  );
};

export default Cursor;
