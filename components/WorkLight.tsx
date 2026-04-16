"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

export default function WorkLight() {
  const [isVisible, setIsVisible] = useState(false)
  
  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [x, y, isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 30%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 40, // Above standard content but below cursor
        mixBlendMode: "overlay",
      }}
    />
  )
}
