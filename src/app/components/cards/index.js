'use client';
import Image from 'next/image';
import { useTransform, useScroll, motion } from 'framer-motion';
import { useRef } from 'react';

const Card = ({ i, src, color, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen w-screen flex items-center justify-center sticky top-0 m-0 p-0 bg-black">
      <div
        className={`relative h-screen w-screen rounded-none p-0 transform-origin-top`}
        style={{ scale, top: `calc(-5vh + ${i * 0}px)` }} // Adjust the top to 0 to remove gaps
      >
        <div className="relative w-full h-full rounded-none overflow-hidden">
          <motion.div
            className="w-full h-full"
            style={{ scale: imageScale }}
          >
            <Image
              fill
              src={`/images/${src}`}
              alt="image"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Card;
