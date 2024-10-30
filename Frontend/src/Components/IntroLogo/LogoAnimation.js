import React, { useEffect, useRef } from 'react';
import './LogoAnimation.css';

const LogoAnimation = () => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;

    setTimeout(() => {
        background.classList.add('fade-out');
    }, 1400); // Delay before starting the animation

    setTimeout(()=>{
        background.style.display = "none"
    }, 2400)
    
  }, []);

  return (
    <div className="background" ref={backgroundRef}></div>
  );
};

export default LogoAnimation;
