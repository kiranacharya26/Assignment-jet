"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ListItem from './ListItem';

const ScrollableList = () => {
  const containerRef = useRef(null);
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  const items = [
    "Home",
    "About",
    "Services",
    "Contact",
    "Blog",
    "FAQ"
  ];

  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    // Determine if the container has been scrolled past the last item
    const lastItem = containerRef.current.lastElementChild;
    const lastItemRect = lastItem.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    if (lastItemRect.bottom <= containerRect.bottom) {
      setIsScrolledPast(true);
    } else {
      setIsScrolledPast(false);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Framer Motion controls
  const scrollableControls = useAnimation();
  const footerControls = useAnimation();

  useEffect(() => {
    if (isScrolledPast) {
      scrollableControls.start({ opacity: 0, y: '-100%' });
      footerControls.start({ opacity: 1, y: '0%' });
    } else {
      scrollableControls.start({ opacity: 1, y: '0%' });
      footerControls.start({ opacity: 0, y: '100%' });
    }
  }, [isScrolledPast, scrollableControls, footerControls]);

  return (
    <div className="relative">
      <motion.div
        className="sticky top-0 left-0 right-0 bg-black text-gray-500"
        animate={scrollableControls}
        initial={{ opacity: 1, y: '0%' }}
        style={{ 
          height: '100vh', 
          overflowY: 'scroll', 
          display: 'flex', 
          flexDirection: 'column',
          zIndex: 10
        }}
      >
        <div
          ref={containerRef}
          className="flex-grow"
        >
          {items.map((item, index) => (
            <ListItem key={index} index={index} totalItems={items.length}>
              <a href={`#${item.toLowerCase()}`} className="hover:underline">
                {item}
              </a>
            </ListItem>
          ))}
        </div>
      </motion.div>

      <motion.footer
        className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-center py-4"
        animate={footerControls}
        initial={{ opacity: 0, y: '100%' }}
        style={{ transition: 'opacity 0.5s ease, transform 0.5s ease' }}
      >
        <p>© 2024 Your Company. All rights reserved.</p>
      </motion.footer>
    </div>
  );
};

export default ScrollableList;
