import React, { useEffect, useRef, useState } from "react";
import { Spotlight } from "./spotlight";
import { motion, useScroll, useTransform} from 'framer-motion';
import './SpotlightPreview.css'
import { FlipWordsDemo } from "../FlipWords/FlipWordsDemo";
import { HoverBorderGradientDemo } from "../StartChattingButton/HoverBorderGradientDemo";

export function SpotlightPreview() {
  const landingtextRef = useRef(null)
  const {scrollY} = useScroll();
  const [scrollBreakpoints, setScrollBreakpoints] = useState([800, 801]);
  const opacity = useTransform(scrollY, scrollBreakpoints, [1, 0]);

  useEffect(()=>{
    const landingText = landingtextRef.current;
    setTimeout(()=>{
      landingText.classList.add('show')
    },1200)
    const mediaQuery = window.matchMedia("(max-width: 490px)");
    const handleMediaChange = (e) => {
      if (e.matches) {
        setScrollBreakpoints([100, 500]); // Trigger scroll earlier for max width 490px
      } else {
        setScrollBreakpoints([800, 801]); // Default breakpoints
      }
    };

    // Initial check
    handleMediaChange(mediaQuery);
    // Add listener
    mediaQuery.addEventListener('change', handleMediaChange);

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  },[])


  return (
    <>
      <div style={{position:'fixed', height:'100vh'}} className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white" />
      </div>
      <motion.div  style={{display:'flex', width:'auto', flexDirection:'column',alignItems:'center', justifyContent:'center', height:'100vh', position:'fixed', opacity, zIndex:'7'}} ref={landingtextRef} className="landing-text  p-4 max-w-7xl  mx-auto relative z-10  w-full pt-0 md:pt-0">
        <h1 className="mobile-view text-[2.8rem] leading-snug md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Shop smarter with Rosa.
        </h1>
        <span className="my-4 mx-0 font-bold  text-neutral-300">
          <FlipWordsDemo />
        </span>
        <span className="mt-2 md:mt-4">
          <HoverBorderGradientDemo />
        </span>
      </motion.div>
    </>
  );
}
