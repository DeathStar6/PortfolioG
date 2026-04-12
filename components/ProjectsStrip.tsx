"use client"

import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

const projects = [
  {
    title: "CivicSync AI",
    description: "Intelligence-driven civic management system using LLMs (Gemini 1.5 Flash) for automated triage. Classified issues and detected emergencies with 60% faster triage speed.",
    techStack: ["Node.js", "Express", "MongoDB", "Gemini AI", "Leaflet.js"],
    github: "https://github.com/DeathStar6",
  },
  {
    title: "LLM Policy Query System",
    description: "RAG-based system for extracting structured answers from policy/legal documents. Features semantic search and <1.5s response time.",
    techStack: ["Next.js", "Python", "LangChain", "Hugging Face", "RAG"],
    github: "https://github.com/DeathStar6",
  },
  {
    title: "University MERN Platform",
    description: "Full-stack interactive landing page for student data flow. Optimized for performance with reusable components and secure authentication.",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/DeathStar6",
  },
  {
    title: "Grade Manager System",
    description: "CLI + Web system for academic management with GPA analytics, CSV support, and automated backups using a custom Python server.",
    techStack: ["Python", "JSON", "Bootstrap", "Custom Server"],
    github: "https://github.com/DeathStar6",
  },
  {
    title: "Fake News Detection",
    description: "ML pipeline classifying real vs fake news using text preprocessing. Trained Logistic Regression and Naive Bayes models with improved accuracy.",
    techStack: ["Python", "Scikit", "NLP", "TF-IDF"],
    github: "https://github.com/DeathStar6",
  },
]

export default function ProjectsStrip() {
  return (
    <section className="py-32 px-6 relative z-10" id="projects">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-block px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-zinc-500 text-[10px] font-bold tracking-[0.4em] uppercase font-terminal mb-4"
          >
             Case Studies // Engineering Docs
          </motion.div>
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-6xl md:text-8xl font-black text-white tracking-tighter"
          >
             PROJECTS
          </motion.h2>
          <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-zinc-500 max-w-xl mx-auto font-medium"
          >
            A collection of intelligence-driven systems, from LLM-powered triage to high-performance RAG pipelines.
          </motion.p>
        </div>

        {/* 3-Up Grid (Top Row) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard 
              key={project.title} 
              {...project} 
              index={i} 
            />
          ))}
        </div>

        {/* 2-Down Flex (Bottom Row) */}
        <div className="flex flex-wrap justify-center gap-8">
          {projects.slice(3, 5).map((project, i) => (
            <div key={project.title} className="w-full md:w-[calc(50%-1rem)] lg:max-w-md">
              <ProjectCard 
                {...project} 
                index={i + 3} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03] select-none text-[20vw] font-black text-white overflow-hidden flex items-center justify-center whitespace-nowrap">
        010101 // SYSTEMS // 010101
      </div>
    </section>
  )
}
