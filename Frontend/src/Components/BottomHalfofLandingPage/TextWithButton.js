import React, { useEffect, useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HoverBorderGradientDemo } from '../StartChattingButton/HoverBorderGradientDemo';
// import HeroHighlightDemo from './HeroHighlightDemo'
import './TextWithButton.css';

const TextWithButton = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [1000, 2000], [0, 1]);
  const [breakpoints, setBreakpoints] = useState(["0vw", "0vw"]);
  const [yBreakpoints, setYBreakpoints] = useState(["0vh", "0vh"]);
  const translateX = useTransform(scrollY, [1200, 2000], breakpoints);
  const translateY = useTransform(scrollY, [1200, 2000], yBreakpoints);

//   scrollY.onChange((latest) => {
//     console.log('scrollY:', latest);
//     console.log('translateX:', translateX.get());
//   });
  useEffect(()=>{
    const mediaQuery = window.matchMedia("(max-width: 490px)");

    const handleMediaChange = (e) => {
      if (e.matches) {
        setBreakpoints(["0vw", "0vw"]); // Trigger scroll earlier for max width 490px
        setYBreakpoints(["-10vh", "0vh"]); // Trigger scroll earlier for max width 490px
      } else {
        setBreakpoints(["30vw", "7vw"]); // Default breakpoints
        setYBreakpoints(["0vh", "0vh"]); // Default breakpoints
      }
    };

    // Initial check
    handleMediaChange(mediaQuery);

    // Add listener
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {// Cleanup on unmount
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  },[])

  return (
    <motion.div style={{ translateX, translateY,opacity }} className="text-with-button">
      <span className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50'>
      <h2>Let us find your</h2>
      <h2>Perfect Product.</h2>
      </span>
      <p>Chat and Try It Out!</p>
      
      {/* <HeroHighlightDemo/> */}
    <HoverBorderGradientDemo/>
    </motion.div>
  );
};

export default TextWithButton;
