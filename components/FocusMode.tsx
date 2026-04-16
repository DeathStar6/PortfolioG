"use client"

import { useState, useEffect } from 'react'
import { Disc, ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from 'lucide-react'

export default function FocusMode() {
  const [focusMode, setFocusMode] = useState(false)

  useEffect(() => {
    if (focusMode) {
      document.body.classList.add('focus-mode-active')
    } else {
      document.body.classList.remove('focus-mode-active')
    }
  }, [focusMode])

  useEffect(() => {
    let mouseTick = false
    
    // Approximate coordinates of the 3D Robot's eyes. 
    // This makes the beam originate biologically from the companion.
    const updateBeamAngle = (clientX: number, clientY: number) => {
      const originX = window.innerWidth * 0.78
      const originY = window.innerHeight * 0.45
      
      const dx = clientX - originX
      const dy = clientY - originY
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
      
      document.documentElement.style.setProperty('--beam-angle', angle.toString())
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (document.body.classList.contains('focus-mode-active')) {
        if (!mouseTick) {
          window.requestAnimationFrame(() => {
            updateBeamAngle(e.clientX, e.clientY)
            mouseTick = false
          })
          mouseTick = true
        }
      }
    }

    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial calculates to pre-position beam and scroll
    updateBeamAngle(window.innerWidth / 2, window.innerHeight / 2)
    handleScroll()
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className="flashlight-beam" />
      <button 
        onClick={() => setFocusMode(!focusMode)} 
        className={`focus-mode-btn group flex items-center relative overflow-visible !left-1/2 !-translate-x-1/2 !bottom-10 md:!left-24 md:!translate-x-0 md:!bottom-24 transition-all duration-700 ${!focusMode ? 'ring-2 ring-indigo-500/30 ring-offset-4 ring-offset-transparent shadow-[0_0_30px_rgba(99,102,241,0.2)]' : ''}`}
      >
        {/* Top Arrows */}
        <div className={`absolute top-[-2.5rem] md:top-[-3.5rem] left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-500 ${focusMode ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <ChevronDown size={20} className="text-indigo-400/30 animate-[pulse_1.5s_ease-in-out_infinite] md:w-6 md:h-6" />
          <ChevronDown size={20} className="text-indigo-400/60 animate-[pulse_1.5s_ease-in-out_infinite_200ms] -mt-3 md:w-6 md:h-6" />
          <ChevronDown size={20} className="text-indigo-400 animate-[pulse_1.5s_ease-in-out_infinite_400ms] -mt-3 md:w-6 md:h-6" />
        </div>

        {/* Bottom Arrows */}
        <div className={`absolute bottom-[-2.5rem] md:bottom-[-3.5rem] left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-500 ${focusMode ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <ChevronUp size={20} className="text-indigo-400 animate-[pulse_1.5s_ease-in-out_infinite_400ms] md:w-6 md:h-6" />
          <ChevronUp size={20} className="text-indigo-400/60 animate-[pulse_1.5s_ease-in-out_infinite_200ms] -mt-3 md:w-6 md:h-6" />
          <ChevronUp size={20} className="text-indigo-400/30 animate-[pulse_1.5s_ease-in-out_infinite] -mt-3 md:w-6 md:h-6" />
        </div>

        {/* Left Arrows */}
        <div className={`absolute left-[-2.5rem] md:left-[-4.5rem] top-1/2 -translate-y-1/2 flex items-center transition-all duration-500 ${focusMode ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>
          <ChevronRight size={20} className="text-indigo-400/30 animate-[pulse_1.5s_ease-in-out_infinite] md:w-6 md:h-6" />
          <ChevronRight size={20} className="text-indigo-400/60 -ml-4 animate-[pulse_1.5s_ease-in-out_infinite_200ms] md:w-6 md:h-6" />
          <ChevronRight size={20} className="text-indigo-400 animate-[pulse_1.5s_ease-in-out_infinite_400ms] -ml-4 md:w-6 md:h-6" />
        </div>
        
        {/* Right Arrows */}
        <div className={`absolute right-[-2.5rem] md:right-[-4.5rem] top-1/2 -translate-y-1/2 flex items-center transition-all duration-500 ${focusMode ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
          <ChevronLeft size={20} className="text-indigo-400 animate-[pulse_1.5s_ease-in-out_infinite_400ms] md:w-6 md:h-6" />
          <ChevronLeft size={20} className="text-indigo-400/60 animate-[pulse_1.5s_ease-in-out_infinite_200ms] -ml-4 md:w-6 md:h-6" />
          <ChevronLeft size={20} className="text-indigo-400/30 animate-[pulse_1.5s_ease-in-out_infinite] -ml-4 md:w-6 md:h-6" />
        </div>

        <Disc size={16} className={`transition-all duration-700 z-10 ${focusMode ? "animate-[spin_4s_linear_infinite] text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" : "text-zinc-600 group-hover:text-zinc-400"}`} />
        <span className="font-terminal text-xs tracking-[0.2em] uppercase mt-0.5 z-10">
          Focus_Mode: <span className={focusMode ? "text-indigo-400" : "text-zinc-500 hover:text-zinc-300"}>{focusMode ? 'Engaged' : 'Standby'}</span>
        </span>
      </button>
    </>
  )
}
