import { motion } from 'framer-motion'
import { Github, ExternalLink, Zap } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  github?: string
  link?: string
}

export default function ProjectCard({ title, description, techStack, github, link }: ProjectCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-8 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
        <Zap size={120} />
      </div>

      <div className="relative z-10">
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
  )
}
