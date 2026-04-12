"use client"

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'
import { Github, ExternalLink, Zap } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  github?: string
  link?: string
  index: number
  scrollY: MotionValue<number>
}

export default function ProjectCard({ title, description, techStack, github, link, index, scrollY }: ProjectCardProps) {
  // 1. Hover Physics
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  // 2. Professional Depth-Pop Engine (Entrance)
  const entranceStart = 0.35
  const entranceEnd = 0.45
  const entranceProgress = useTransform(scrollY, [entranceStart, entranceEnd], [0, 1])
  
  // Transform: Horizon to Foreground (Absolute Z-Depth)
  const depthZ = useTransform(entranceProgress, [0, 1], [-500, 0])
  const entranceOpacity = useTransform(entranceProgress, [0, 0.4], [0, 1])
  const landingScale = useTransform(entranceProgress, [0, 0.8, 1], [0.5, 1.05, 1])
  const entranceRotate = useTransform(entranceProgress, [0, 1], [15, 0]) // Subtle tilt arrival
  
  // 3. Deterministic Focal Engine (Selection logic)
  const targetThreshold = 0.45 + (index * 0.04) 
  const focalProgress = useTransform(
    scrollY, 
    [targetThreshold - 0.05, targetThreshold, targetThreshold + 0.05], 
    [0, 1, 0]
  )

  const scale = useTransform(focalProgress, [0, 1], [1, 1.1])
  const zIndex = useTransform(focalProgress, [0, 0.5, 1], [1, 10, 50])
  const shadowColor = useTransform(focalProgress, [0, 1], ["rgba(255,255,255,0)", "rgba(255,255,255,0.2)"])

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
    <div className="flex-shrink-0 py-20">
      <motion.div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          scale: landingScale, 
          opacity: entranceOpacity, 
          zIndex,
          z: depthZ,
          rotate: entranceRotate,
          transformStyle: "preserve-3d",
          boxShadow: useTransform(shadowColor, (v) => `0 25px 50px -12px ${v}`)
        }}
        className="glass-card p-10 group relative w-[450px] overflow-hidden cursor-pointer border border-white/5"
      >
        {/* Laser Scan Effect */}
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-x-0 h-[1px] bg-white opacity-50 blur-[1px] animate-[holographic_2s_linear_infinite]" 
               style={{ top: '50%', boxShadow: '0 0 15px rgba(255,255,255,0.8)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div 
          style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }}
          className="relative z-10"
        >
          <div className="absolute -top-10 -right-10 p-6 opacity-[0.02] group-hover:opacity-5 transition-opacity">
            <Zap size={200} />
          </div>

          <h3 className="text-3xl font-black mb-4 text-zinc-100 group-hover:text-white transition-colors tracking-tighter">
            {title.toUpperCase()}
          </h3>
          <p className="text-zinc-500 mb-8 leading-relaxed text-sm font-medium">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-10">
            {techStack.map((tech) => (
              <span key={tech} className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 bg-white/5 border border-white/5 px-2.5 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-6">
            {github && (
              <a href={github} target="_blank" className="flex items-center gap-2 text-[10px] font-black text-zinc-500 hover:text-white transition-colors tracking-widest">
                <Github size={14} /> SOURCE //
              </a>
            )}
            {link && (
              <a href={link} target="_blank" className="flex items-center gap-2 text-[10px] font-black text-zinc-500 hover:text-white transition-colors tracking-widest">
                <ExternalLink size={14} /> EXPLORE //
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
