"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useSpring } from "framer-motion"

export function useMagnetic(strength: number = 0.3) {
  const [isHovered, setIsHovered] = useState(false)
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isHovered) return

    const { clientX, clientY, target } = e
    const element = target as HTMLElement
    const rect = element.getBoundingClientRect()
    
    // Calculate center of element
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Relative distance
    const dx = (clientX - centerX) * strength
    const dy = (clientY - centerY) * strength

    x.set(dx)
    y.set(dy)
  }, [isHovered, x, y, strength])

  useEffect(() => {
    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove)
    } else {
      x.set(0)
      y.set(0)
      window.removeEventListener("mousemove", handleMouseMove)
    }
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isHovered, handleMouseMove, x, y])

  const mouseEnter = () => setIsHovered(true)
  const mouseLeave = () => setIsHovered(false)

  return {
    x,
    y,
    onMouseEnter: mouseEnter,
    onMouseLeave: mouseLeave,
  }
}
