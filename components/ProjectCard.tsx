"use client"

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { Github, ExternalLink, Zap } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  github?: string
  link?: string
}

export default function ProjectCard({ title, description, techStack, github, link }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // 1. Hover Physics
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  // 2. Focal Pop Engine (Tracking position relative to viewport)
  const { scrollXProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  // Smooth out the focal mapping
  const smoothFocalProgress = useSpring(scrollXProgress, { stiffness: 100, damping: 30 })

  // Map focal progress to visual states (Peak at 0.5 - Center of viewport)
  const scale = useTransform(smoothFocalProgress, [0, 0.5, 1], [0.85, 1.1, 0.85])
  const opacity = useTransform(smoothFocalProgress, [0, 0.5, 1], [0.4, 1, 0.4])
  const blur = useTransform(smoothFocalProgress, (v) => {
    const intensity = Math.abs(v - 0.5) * 20 // Max 10px blur at edges
    return `blur(${intensity}px)`
  })
  const shadowIntensity = useTransform(smoothFocalProgress, [0, 0.5, 1], [0, 1, 0])

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
    <div ref={cardRef} className="flex-shrink-0 py-20">
      <motion.div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          scale, 
          opacity, 
          filter: blur,
          transformStyle: "preserve-3d",
          boxShadow: useTransform(shadowIntensity, [0, 1], ["0 0 0 rgba(99,102,241,0)", "0 25px 50px -12px rgba(99,102,241,0.5)"])
        }}
        className="glass-card p-10 group relative w-[450px] overflow-hidden cursor-pointer"
      >
        <div 
          style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
          className="relative z-10"
        >
          <div className="absolute -top-10 -right-10 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
            <Zap size={150} />
          </div>

          <h3 className="text-2xl font-bold mb-3 text-zinc-100 group-hover:text-indigo-400 transition-colors">
            {title}
          </h3>
          <p className="text-zinc-400 mb-6 leading-relaxed text-sm">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {techStack.map((tech) => (
              <span key={tech} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-950 px-2 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            {github && (
              <a href={github} target="_blank" className="flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-white transition-colors">
                <Github size={14} /> SOURCE
              </a>
            )}
            {link && (
              <a href={link} target="_blank" className="flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-white transition-colors">
                <ExternalLink size={14} /> DEMO
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
