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
