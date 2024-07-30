"use client";
import React from 'react';
import { motion } from 'framer-motion'; // Ensure this import is present
import Cursor from './Cursor'; // Import the Cursor component
import NewSection from './NewSection'; // Import the NewSection component

const headingText = "Montaya";
const paragraphText = "WE ARE A CREATIVE STUDIO, SPECIALIZED IN STRATEGY, BRANDING \n DESIGN, AND DEVELOPMENT. OUR WORK IS ALWAYS AT THE INTERSECTION \n OF DESIGN AND TECHNOLOGY.";

const textVariants = {
  hover: {
    scaleY: 1.5, // Expands height (Y-axis) only
    transition: { duration: 0.3 },
  },
};

const HeroSection = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen bg-black text-center">
        <div>
          <h1
            className="text-white font-thin text-[14rem] leading-[12rem]"
          >
            {headingText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={textVariants}
                whileHover="hover"
                className="inline-block"
                style={{ display: 'inline-block' }} // Ensures height transformation works
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          <p className="text-gray-400 text-[1.2rem] leading-[2rem] mt-12">
            {paragraphText.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}<br />
              </React.Fragment>
            ))}
          </p>
        </div>
        <Cursor /> {/* Add the Cursor component */}
      </section>

      <NewSection /> {/* Add the NewSection component */}
    </>
  );
};

export default HeroSection;
