"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function NavBar() {
  const navItems = ["Skills", "Projects", "Experience", "Contact"]

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none"
    >
      <nav className="glass-panel px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-4 md:gap-8 pointer-events-auto">
        <div className="flex items-center gap-3 md:gap-6">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
        
        <div className="hidden xs:block w-px h-4 bg-zinc-800" />
        
        <div className="flex items-center gap-3 md:gap-4">
          <a href="https://github.com/DeathStar6" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
            <Github size={16} />
          </a>
          <a href="https://linkedin.com/in/subhajit-chatterjee" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
            <Linkedin size={16} />
          </a>
          <a href="mailto:subhajitc939@gmail.com" className="text-zinc-400 hover:text-white transition-colors">
            <Mail size={16} />
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
