import React, {useEffect, useRef} from 'react'
import './Header.css'
import logo from '../../logo.svg'
import { motion, useScroll, useTransform } from 'framer-motion'
import {Link} from 'react-router-dom'


const Header = () => {
  const wrapperRef = useRef(null)
  const textRef = useRef(null)

  const { scrollY } = useScroll();

  const color = useTransform(scrollY, [400, 401 ], ['#ffffff', '#000000'])

  useEffect(()=>{
    const wrapper = wrapperRef.current
    const text = textRef.current
    
      wrapper.classList.add('shrink')
      function preventDefault(e) {
        e.preventDefault();
      }
      
      // Add event listeners to disable scroll
      window.addEventListener('wheel', preventDefault, { passive: false });
      window.addEventListener('touchmove', preventDefault, { passive: false });
      window.addEventListener('keydown', function(e) {
        // Prevent scrolling with arrow keys, spacebar, and page up/down
        if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
          preventDefault(e);
        }
      }, { passive: false });
      
      // Enable scrolling
      function enableScroll() {
        window.removeEventListener('wheel', preventDefault);
        window.removeEventListener('touchmove', preventDefault);
        window.removeEventListener('keydown', preventDefault);
      }
      
      setTimeout(()=>{
        text.classList.add('visiblee')
        
      },1800)

      setTimeout(()=>{
        enableScroll()
      },2400)
  },[])
  
  return (
    <div className='main'>
      <div className="logowrapper" ref={wrapperRef}>
      <img src={logo} alt="Logo" className="logo" />
      </div>
      <div >
        <motion.a style={{color:'white'}} className='title' href='/' ref={textRef}>Rosa AI</motion.a>
      </div>
    </div>
  )
}

export default Header