import React, {useEffect, useRef} from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';
import './NewLandingPage.css'


import { SpotlightPreview } from '../../Components/Spotlight/SpotlightPreview';
import TextWithButton from '../../Components/BottomHalfofLandingPage/TextWithButton'; 

const NewLandingPage = () => {
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 500], [20, 0]);

  const translateY = useTransform(scrollY, [0,800], ["70vh", "9vh"]);
  const translateY1 = useTransform(scrollY, [0,800], ["70vh", "20vh"]);
  const translateY2 = useTransform(scrollY, [1200,2100], ["20vh", "-65vh"]);

  const translateX = useTransform(scrollY, [1200, 2000], ["0vw", "30vw"]);

  const scaleNew1 = useTransform(scrollY, [0, 600], [1.1, 1]);
  const scaleNew2 = useTransform(scrollY, [1200, 1800], [1, 1.1]);

  const scaleNew = useTransform(scrollY, (value) => {
      if (value <= 600) {
      return scaleNew1.get();
      } else {
      return scaleNew2.get();
      } 
  });

  const translateNew = useTransform(scrollY, (value) => {
      if (value <= 800) {
      return translateY1.get();
      } else {
      return translateY2.get();
      } 
  });

  // Combine the perspective and rotations into a single transform string
  const transform = useTransform(
    [rotateX, translateY, scaleNew, translateX],
    ([latestRotateX, latestTranslateY, latestScale, latestTranslateX]) =>
        `scale(${latestScale}) perspective(1000px) rotateX(${latestRotateX}deg) translateY(${latestTranslateY}) translateX(${latestTranslateX})`
  );
  const transform2 = useTransform(
    [rotateX, translateNew, scaleNew1],
    ([latestRotateX, latestTranslateY, latestScale]) =>
        `scale(${latestScale}) perspective(1000px) rotateX(${latestRotateX}deg) translateY(${latestTranslateY}) `
  );

  const ipadRef = useRef(null)
  const iphoneRef = useRef(null)
  const ipadVidRef = useRef(null)
  const scrollerRef = useRef(null)

  useEffect(()=>{
    const ipad = ipadRef.current
    const iphone = iphoneRef.current
    const ipadVid = ipadVidRef.current

    // Scroll to top on refresh
    const handleScroll = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set scroll position

    setTimeout(()=>{
      ipad.classList.add('show')
      iphone.classList.add('show')
      ipadVid.classList.add('show')
      window.removeEventListener('scroll', handleScroll);
    },1200)

    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
    };
  },[])


  return (
    <>
      <motion.div className='background-container'>
      </motion.div>
      <div ref={scrollerRef} style={{zIndex:'0',overflowX:'hidden',display: 'flex', alignItems: 'center', flexDirection:'column',height: '325vh', width:'100%', overflow:'hidden'}}>
        <div className='grid-check'></div>
        <SpotlightPreview></SpotlightPreview>
        <div className='landing-main' style={{ zIndex: '2', height:'100vh', position:'fixed', width: '100%', display:'flex', justifyContent:'center', alignItems: 'center', textAlign: 'center', flexDirection: 'column'}}>             
        </div>
        <motion.img alt='' ref={ipadRef} className='ipad' style={{transform,position: 'fixed', width: '70%',zIndex:'7'}} src="./rectangle.png" />
        <motion.img alt='' ref={iphoneRef} className='iphone' style={{transform: transform2,position: 'fixed', width: '70%',zIndex:'7'}} src="./rectangle2.png" />
        <motion.div className='ipad' ref={ipadVidRef} style={{transform,borderRadius:'2%', zIndex:'8',position: 'fixed', width: '57.8%', height:'67.4%', marginTop:'6%', overflow:'hidden'}}>
          <video style={{transform:'scale(1.45)'}} autoPlay playsInline muted loop>
            <source src='./videoplayback.mp4' type='video/mp4'/>
          </video>
        </motion.div>
        <TextWithButton />
      </div>
    </>
  )
}

export default NewLandingPage;