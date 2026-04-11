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
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6"
    >
      <div className="flex items-center gap-8 px-8 py-4 brutal-border brutal-shadow-lg bg-white">
        <div className="text-xl font-black tracking-tighter hidden md:block">
          S<span className="bg-primary px-1">C</span>.
        </div>
        <div className="h-6 w-[2px] bg-black hidden md:block" />
        <div className="flex gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-black uppercase tracking-tight hover:text-secondary group transition-all"
            >
              {link.name}
              <span className="block h-1 w-0 bg-primary group-hover:w-full transition-all" />
            </a>
          ))}
        </div>
        <div className="h-6 w-[2px] bg-black" />
        <div className="flex gap-4">
          <a href="https://github.com/DeathStar6" target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-accent transition-colors">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/subhajit-chatterjee-a2b952222/" target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-secondary transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
