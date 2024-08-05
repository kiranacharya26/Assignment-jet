'use client';
import Image from 'next/image';
import { useTransform, useScroll, motion } from 'framer-motion';
import { useRef } from 'react';

const Card = ({ i, src, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const start = i / 10;
  const end = (i + 1) / 10;

  const imageScale = useTransform(scrollYProgress, [start, end], [1, 0.9]);
  const scale = useTransform(progress, range, [1, targetScale]);

  const paddingSize = useTransform(
    scrollYProgress,
    [start, end],
    ['0px', '0px']
  );

  return (
    <div
      className="h-screen w-screen flex items-center justify-center sticky top-0 bg-black"
      ref={container}
      style={{ margin: 0 }}
    >
      <motion.div
        className="relative w-full h-screen overflow-hidden"
        style={{
          scale,
          padding: paddingSize,
          boxSizing: 'border-box',
        }}
        initial={{ scale: 1, padding: '0px' }}
        animate={{ scale, padding: paddingSize }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            scale: imageScale,
            overflow: 'hidden',
          }}
          initial={{ scale: 1 }}
          animate={{ scale: imageScale }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          <Image
            fill
            src={`/images/${src}`}
            alt="image"
            className="object-cover rounded-lg"
            style={{ borderRadius: '20px' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Card;
