"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function NavBar() {
  const navItems = ["Skills", "Projects", "Experience", "Contact"]

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none"
    >
      <nav className="glass-panel px-6 py-3 rounded-full flex items-center gap-8 pointer-events-auto">
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
        
        <div className="w-px h-4 bg-zinc-800" />
        
        <div className="flex items-center gap-4">
          <a href="https://github.com/DeathStar6" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/subhajit-chatterjee" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="mailto:subhajitc939@gmail.com" className="text-zinc-400 hover:text-white transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
