"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const NewSection = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isFixed, setIsFixed] = useState(true);

  const images = [
    '/images/01hero.jpg',
    '/images/02hero.jpg',
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const section = document.querySelector('#new-section');
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const windowHeight = window.innerHeight;
      const newImageIndex = Math.min(
        Math.floor(scrollTop / windowHeight),
        images.length - 1
      );
      if (newImageIndex !== imageIndex) {
        setImageIndex(newImageIndex);
      }
      if (scrollTop >= sectionTop + sectionHeight) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [imageIndex, images.length]);

  return (
    <section id="new-section" className={`relative px-4 md:px-16 bg-black pb-16 ${isFixed ? 'fixed top-0 left-0 w-full' : 'relative'}`}>
      <div className="relative w-full h-screen rounded-3xl overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={imageIndex}
            className="absolute top-0 left-0 w-full h-full"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <Image
              src={images[imageIndex]}
              alt="Background"
              layout="fill"
              objectFit="cover"
              style={{ objectPosition: 'center' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default NewSection;
