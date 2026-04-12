"use client"

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 })
  const mouseY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 })
  
  const ringX = useSpring(0, { stiffness: 200, damping: 20, mass: 0.8 })
  const ringY = useSpring(0, { stiffness: 200, damping: 20, mass: 0.8 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.closest('button, a, .cursor-pointer, .nav-link')
      setIsPointer(!!isClickable)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY, ringX, ringY, isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Lagging Ring (Inverter) */}
      <motion.div 
        style={{ 
          x: ringX, 
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 2.5 : 1,
          opacity: 1
        }}
        className="w-8 h-8 rounded-full border border-white mix-blend-difference"
      />
      
      {/* Precision Dot */}
      <motion.div 
        style={{ 
          x: mouseX, 
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 0 : 1,
        }}
        className="w-1.5 h-1.5 bg-white rounded-full absolute top-0 left-0 mix-blend-difference"
      />
    </div>
  )
}
