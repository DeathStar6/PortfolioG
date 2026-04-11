"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  github?: string
  demo?: string
}

export default function ProjectCard({ title, description, techStack, github, demo }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl glass-dark border border-white/5 flex flex-col h-full group"
    >
      <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {techStack.map((tech) => (
          <span key={tech} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/5 border border-white/10 opacity-70">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            <Github size={20} />
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            <ExternalLink size={20} />
          </a>
        )}
      </div>
    </motion.div>
  )
}
