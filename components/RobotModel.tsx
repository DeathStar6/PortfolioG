"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function RobotModel() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])



  const onSplineLoad = () => {
    setIsLoaded(true)
  }

  return (
    <motion.div 
      ref={containerRef}
      style={{ transformOrigin: 'right center', mixBlendMode: 'screen' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 lg:bottom-auto lg:top-1/2 left-0 lg:left-auto lg:-right-[2%] lg:-translate-y-[40%] w-[100vw] lg:w-[40vw] h-[50vh] lg:h-[70vh] pointer-events-none z-[0] lg:z-[2]"
    >
      <div 
        className="w-full h-full relative" 
        style={{ 
          mixBlendMode: 'screen',
          /* Smoothly fade the hard edges of the Spline background into the site background */
          WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 50%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 50%, transparent 100%)',
          /* Surgically precise cut just for the Spline logo (170px wide, 55px tall) */
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 55px), calc(100% - 170px) calc(100% - 55px), calc(100% - 170px) 100%, 0 100%)' 
        }}
      >
        {isVisible && (
          <Spline 
            onLoad={onSplineLoad}
            scene="https://prod.spline.design/ytNb29B-70AARpHr/scene.splinecode" 
          />
        )}
      </div>
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-px bg-white/10 animate-pulse" />
        </div>
      )}
    </motion.div>
  )
}
