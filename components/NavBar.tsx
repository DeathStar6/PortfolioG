"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

export default function NavBar() {
  const links = [
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4"
    >
      <div className="flex items-center gap-8 px-6 py-3 rounded-full glass-dark border border-white/10">
        <div className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="h-4 w-[1px] bg-white/10" />
        <div className="flex gap-4">
          <a href="https://github.com/DeathStar6" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/subhajit-chatterjee-a2b952222/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="mailto:subhajitc939@gmail.com" className="hover:text-cyan-400 transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
