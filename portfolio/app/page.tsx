"use client"

import { motion } from "framer-motion"
import { ArrowRight, Code2, BrainCircuit, Rocket, Award, GraduationCap } from "lucide-react"
import NavBar from "@/components/NavBar"
import ProjectCard from "@/components/ProjectCard"
import SkillBadge from "@/components/SkillBadge"

export default function Home() {
  const skills = {
    programming: ["C", "C++", "Python", "JavaScript", "SQL"],
    ai: ["TensorFlow", "PyTorch", "Scikit-Learn", "OpenCV", "NLP", "LLMs", "RAG", "Prompt Engineering"],
    web: ["HTML", "CSS", "React.js", "Next.js", "Node.js", "Express.js", "REST APIs"],
    tools: ["Flask", "Django", "LangChain", "Hugging Face", "AWS", "Docker", "Git/GitHub"],
  }

  const projects = [
    {
      title: "LLM-Powered Query System",
      description: "Built an AI-driven system to extract structured answers from policy documents using a RAG-based pipeline. Achieved sub-1.5s response times.",
      techStack: ["Next.js", "Python", "Flask", "LangChain", "RAG"],
      github: "https://github.com/DeathStar6",
    },
    {
      title: "University Landing Page",
      description: "Full-stack MERN application for student interaction with optimized frontend performance and dynamic content loading.",
      techStack: ["MongoDB", "Express", "React", "Node.js"],
      github: "https://github.com/DeathStar6",
    },
    {
      title: "Grade Manager (CLI + Web)",
      description: "Academic management system with JSON persistence and automated backup. Features custom HTTP server implementation.",
      techStack: ["Python", "JSON", "Bootstrap", "HTTP Server"],
      github: "https://github.com/DeathStar6",
    },
    {
      title: "Fake News Detection System",
      description: "Machine learning model utilizing TF-IDF vectorization and Scikit-Learn to classify misinformation with high accuracy.",
      techStack: ["Python", "Scikit-Learn", "NLP", "TF-IDF"],
      github: "https://github.com/DeathStar6",
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[128px]" />
        </div>

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 px-4 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-cyan-400 tracking-widest uppercase"
          >
            Available for opportunities
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter"
          >
            Subhajit <br />
            <span className="text-gradient">Chatterjee</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            AI & Machine Learning enthusiast and Frontend Developer crafting intelligent 
            web experiences. Currently pursuing B.Tech in Computer Science.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a 
              href="#projects" 
              className="px-8 py-4 rounded-full bg-primary text-white font-semibold flex items-center gap-2 hover:bg-primary/80 transition-all hover:scale-105"
            >
              View Projects <Rocket size={20} />
            </a>
            <a 
              href="mailto:subhajitc939@gmail.com"
              className="px-8 py-4 rounded-full glass border border-white/10 font-semibold hover:bg-white/5 transition-all hover:scale-105"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <BrainCircuit className="text-cyan-400" size={32} />
            <h2 className="text-4xl font-bold">Tech Stack</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {Object.entries(skills).map(([category, items], idx) => (
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                key={category}
              >
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-[0.2em] mb-6">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <SkillBadge key={skill} name={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <Code2 className="text-cyan-400" size={32} />
              <h2 className="text-4xl font-bold">Featured Projects</h2>
            </div>
            <a href="https://github.com/DeathStar6" target="_blank" className="text-sm font-medium text-cyan-400 flex items-center gap-1 group">
              See all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Award className="text-cyan-400" size={32} />
            <h2 className="text-4xl font-bold">Experience</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl glass border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Award size={120} />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
              <div>
                <h3 className="text-2xl font-bold text-cyan-400">Frontend Developer Intern</h3>
                <p className="text-lg font-medium">Creatiq Media</p>
              </div>
              <p className="text-sm font-mono text-muted-foreground">Aug 2025 — Dec 2025</p>
            </div>

            <ul className="space-y-4 text-muted-foreground">
              {[
                "Built responsive UI screens and reusable components with React.js, HTML, CSS, and JavaScript.",
                "Integrated REST APIs and improved frontend performance for smoother user experience.",
                "Fixed UI/UX bugs, optimized page rendering, and implemented mobile-friendly layouts.",
                "Used Git/GitHub for collaboration and code versioning across the team."
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-cyan-400 mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <GraduationCap className="text-cyan-400" size={32} />
            <h2 className="text-4xl font-bold">Education</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl glass-dark border border-white/5"
            >
              <p className="text-sm font-mono text-cyan-400 mb-2">2024 — 2028</p>
              <h3 className="text-xl font-bold mb-1">Bachelor of Technology</h3>
              <p className="text-muted-foreground mb-4">Computer Science & Engineering</p>
              <p className="text-sm font-medium">Brainware University | CGPA: 8.3</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl glass-dark border border-white/5"
            >
              <p className="text-sm font-mono text-cyan-400 mb-2">2018 — 2021</p>
              <h3 className="text-xl font-bold mb-1">Bachelor of Science</h3>
              <p className="text-muted-foreground mb-4">General Science</p>
              <p className="text-sm font-medium">Uluberia College (CU) | CGPA: 7.1</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Subhajit Chatterjee. Built with Next.js & Framer Motion.
        </p>
      </footer>
    </main>
  )
}
