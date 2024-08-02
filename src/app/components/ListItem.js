"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ListItem = ({ index, totalItems, children }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  // Calculate the range for each item based on total items
  const rangeStart = index / totalItems;
  const rangeEnd = (index + 1) / totalItems;

  // Transform scroll progress to text color and size
  const color = useTransform(
    scrollYProgress,
    [rangeStart, rangeEnd],
    ['rgba(255, 255, 255, 0.5)', 'white']
  );

  // Further increased font size
  const fontSize = useTransform(
    scrollYProgress,
    [rangeStart, rangeEnd],
    ['2rem', '4rem'] // Increased to a larger size
  );

  return (
    <motion.div
      ref={container}
      style={{ color, fontSize }}
      className="flex items-center justify-center py-2" // Reduced padding to minimize gap
    >
      {children}
    </motion.div>
  );
};

export default ListItem;
