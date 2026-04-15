"use client"

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Github, ExternalLink, Zap } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  github?: string
  link?: string
  index: number
}

export default function ProjectCard({ title, description, techStack, github, link, index }: ProjectCardProps) {
  // 1. Hover Physics
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", 17.5])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.8, 
        delay: (index % 3) * 0.15, // Stagger based on column index
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="flex-shrink-0"
    >
      <motion.div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
        }}
        className="tactile-panel p-10 group relative w-full lg:max-w-md aspect-[4/3] flex flex-col justify-between overflow-hidden cursor-pointer border border-white/10"
      >
        {/* Physical Detail: Corner Screws */}
        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-zinc-700 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),1px_1px_0px_rgba(255,255,255,0.1)] flex items-center justify-center">
          <div className="w-[1px] h-1.5 bg-zinc-900 rotate-45" />
        </div>
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-zinc-700 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),1px_1px_0px_rgba(255,255,255,0.1)] flex items-center justify-center">
          <div className="w-[1px] h-1.5 bg-zinc-900 -rotate-45" />
        </div>
        <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-zinc-700 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),1px_1px_0px_rgba(255,255,255,0.1)] flex items-center justify-center">
          <div className="w-[1px] h-1.5 bg-zinc-900 -rotate-45" />
        </div>
        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-zinc-700 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),1px_1px_0px_rgba(255,255,255,0.1)] flex items-center justify-center">
          <div className="w-[1px] h-1.5 bg-zinc-900 rotate-45" />
        </div>

        {/* Mechanical Scanning Effect */}
        <div className="absolute inset-x-0 h-[2px] bg-white opacity-[0.05] group-hover:opacity-[0.15] blur-[1px] top-0 group-hover:animate-[h holographic_3s_linear_infinite] pointer-events-none" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />

        <div 
          style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }}
          className="relative z-10 h-full flex flex-col justify-between"
        >
          <div>
            <div className="absolute -top-10 -right-10 p-6 opacity-[0.02] group-hover:opacity-5 transition-opacity">
              <Zap size={200} />
            </div>

            <h3 className="text-3xl font-black mb-4 text-zinc-100 group-hover:text-white transition-colors tracking-tighter">
              {title.toUpperCase()}
            </h3>
            <p className="text-zinc-500 mb-8 leading-relaxed text-sm font-medium">
              {description}
            </p>
          </div>
          
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {techStack.map((tech) => (
                <span key={tech} className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 bg-black/40 border border-white/5 px-2.5 py-1 rounded shadow-inner">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-6">
              {github && (
                <a 
                  href={github} 
                  target="_blank" 
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-[10px] font-black text-zinc-500 hover:text-white transition-colors tracking-widest"
                >
                  <Github size={14} /> SOURCE //
                </a>
              )}
              {link && (
                <a 
                  href={link} 
                  target="_blank" 
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-[10px] font-black text-zinc-500 hover:text-white transition-colors tracking-widest"
                >
                  <ExternalLink size={14} /> EXPLORE //
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
