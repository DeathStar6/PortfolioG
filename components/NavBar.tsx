"use client"

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { anime } from 'animejs'

export default function NavBar() {
  const navItems = ["Home", "Projects", "Skills", "Contact"]
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = document.querySelectorAll('.nav-link')
    
    const handleMouseMove = (e: MouseEvent, el: Element) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      anime({
        targets: el,
        translateX: x * 0.3,
        translateY: y * 0.3,
        duration: 400,
        easing: 'easeOutExpo'
      })
    }

    const handleMouseLeave = (el: Element) => {
      anime({
        targets: el,
        translateX: 0,
        translateY: 0,
        duration: 600,
        easing: 'easeOutElastic(1, .8)'
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
      <nav ref={navRef} className="glass-panel px-6 md:px-8 py-3 md:py-4 rounded-xl flex items-center gap-8 md:gap-12 pointer-events-auto border border-white/10 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-6 md:gap-10">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="nav-link text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-zinc-500 hover:text-white transition-colors relative"
            >
              {item}
            </a>
          ))}
        </div>
        
        <div className="hidden xs:block w-px h-5 bg-white/5" />
        
        <div className="flex items-center gap-4 md:gap-6">
          <a href="https://github.com/DeathStar6" target="_blank" className="nav-link text-zinc-500 hover:text-white transition-opacity">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/subhajit-chatterjee" target="_blank" className="nav-link text-zinc-500 hover:text-white transition-opacity">
            <Linkedin size={18} />
          </a>
          <a href="mailto:subhajitc939@gmail.com" className="nav-link text-zinc-500 hover:text-white transition-opacity">
            <Mail size={18} />
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
