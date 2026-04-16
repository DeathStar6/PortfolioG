"use client"

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { animate } from 'animejs'

export default function NavBar() {
  const navItems = ["Home", "About", "Projects", "Skills", "Achievements", "Contact"]
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = document.querySelectorAll('.nav-link')
    
    const handleMouseMove = (e: MouseEvent, el: Element) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      animate(el, {
        translateX: x * 0.3,
        translateY: y * 0.3,
        duration: 400,
        easing: 'easeOutExpo'
      })
    }

    const handleMouseLeave = (el: Element) => {
      animate(el, {
        translateX: 0,
        translateY: 0,
        duration: 600,
        easing: 'easeOutExpo'
      })
    }

    items.forEach(item => {
      item.addEventListener('mousemove', (e) => handleMouseMove(e as MouseEvent, item))
      item.addEventListener('mouseleave', () => handleMouseLeave(item))
    })
  }, [])

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 md:p-8 pointer-events-none"
    >
      <nav ref={navRef} className="tactile-panel px-6 md:px-10 py-3 md:py-4 rounded-full flex items-center gap-8 md:gap-12 pointer-events-auto border-t border-white/10 shadow-2xl">
        {/* Physical Detail: Brushed Metal Texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-full" />
        
        <div className="flex items-center gap-6 md:gap-10 relative z-10 overflow-x-auto no-scrollbar [mask-image:linear-gradient(to_right,black_85%,transparent_100%)] pr-8 pb-1 -mb-1">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="nav-link shrink-0 group flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-zinc-400 hover:text-white active:scale-90 transition-all relative py-3 md:py-1 px-1 touch-manipulation"
            >
              {/* Indicator LED */}
              <div className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-white transition-all shadow-[0_0_8px_rgba(255,255,255,0)] group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="relative">
                {item}
              </span>
            </a>
          ))}
        </div>
        
        <div className="hidden xs:block w-[1px] h-4 bg-white/5 relative z-10" />
        
        <div className="flex items-center gap-4 md:gap-6 relative z-10">
          <a href="https://github.com/DeathStar6" target="_blank" className="nav-link group p-3 md:p-1 text-zinc-400 hover:text-white active:scale-90 transition-all touch-manipulation">
            <Github size={16} />
          </a>
          <a href="https://www.linkedin.com/in/subhajit-chatterjee-a2b952222/" target="_blank" className="nav-link group p-3 md:p-1 text-zinc-400 hover:text-white active:scale-90 transition-all touch-manipulation">
            <Linkedin size={16} />
          </a>
          <a href="mailto:subhajitc939@gmail.com" className="nav-link group p-3 md:p-1 text-zinc-400 hover:text-white active:scale-90 transition-all touch-manipulation">
            <Mail size={16} />
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
