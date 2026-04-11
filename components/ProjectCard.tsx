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
      whileHover={{ x: -4, y: -4 }}
      className="p-6 brutal-border brutal-shadow-lg bg-white flex flex-col h-full group hover:bg-zinc-50 transition-colors"
    >
      <h3 className="text-2xl font-black mb-3 group-hover:underline decoration-4 underline-offset-4">{title}</h3>
      <p className="text-black font-medium text-sm mb-6 flex-grow leading-relaxed">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {techStack.map((tech) => (
          <span key={tech} className="text-[10px] font-black uppercase tracking-widest px-2 py-1 brutal-border bg-accent/20">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="p-2 brutal-border bg-primary hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <Github size={20} />
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer" className="p-2 brutal-border bg-secondary hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <ExternalLink size={20} />
          </a>
        )}
      </div>
    </motion.div>
  )
}
