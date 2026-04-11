'use client'

import { motion } from 'framer-motion'
import { 
  Rocket, 
  BrainCircuit, 
  Code2, 
  Award, 
  GraduationCap, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Terminal,
  Server,
  Database,
  Cloud,
  Cpu,
  ArrowRight
} from 'lucide-react'
import NavBar from '@/components/NavBar'
import ProjectCard from '@/components/ProjectCard'
import SkillBadge from '@/components/SkillBadge'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  const skills = [
    { category: "Programming", items: ["C", "C++", "Python", "JavaScript", "SQL"], icon: <Terminal size={18} /> },
    { category: "AI & Machine Learning", items: ["TensorFlow", "PyTorch", "NLP", "RAG", "LLM Integration", "Prompt Engineering"], icon: <Cpu size={18} /> },
    { category: "Web Development", items: ["React.js", "Next.js", "Node.js", "Express.js", "REST APIs"], icon: <Code2 size={18} /> },
    { category: "Databases & Data", items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "ETL Pipelines"], icon: <Database size={18} /> },
    { category: "Tools & Cloud", items: ["AWS (EC2/S3/Lambda)", "Docker", "Git/GitHub", "LangChain", "Hugging Face"], icon: <Cloud size={18} /> },
  ]

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
      description: "ML pipeline classifying real vs fake news using TF-IDF and Scikit-Learn models (Logistic Regression & Naive Bayes).",
      techStack: ["Python", "Scikit", "NLP", "TF-IDF"],
      github: "https://github.com/DeathStar6",
    },
  ]

  return (
    <main className="min-h-screen">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl md:text-8xl font-black text-gradient"
            >
              SUBHAJIT<br />CHATTERJEE
            </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Building intelligent systems with AI and scalable web technologies. 
            Transforming complex data into seamless products.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <a href="#projects" className="premium-button">
              View Projects <Rocket size={18} />
            </a>
            <a href="#contact" className="premium-button-outline">
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold mb-8"
          >
            The Approach
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-lg text-zinc-400 leading-relaxed font-medium"
          >
            Driven by a passion for AI and real-world problem solving, I specialize in building systems 
            that combine modern product engineering with advanced LLM integration. With a strong learning 
            mindset, I bridge the gap between complex research and production-ready applications.
          </motion.p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-zinc-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs font-bold tracking-[0.5em] text-zinc-500 uppercase mb-20 text-center">Technical Arsenal</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, i) => (
              <motion.div 
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 group"
              >
                <div className="flex items-center gap-4 mb-6 text-indigo-400">
                  {skillGroup.icon}
                  <h3 className="text-lg font-bold text-zinc-100">{skillGroup.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item) => (
                    <SkillBadge key={item} name={item} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <h2 className="text-indigo-400 font-bold tracking-widest uppercase text-xs">Featured Work</h2>
              <h3 className="text-5xl font-black">PROVED_OUTPUTS</h3>
            </div>
            <p className="text-zinc-500 font-medium max-w-sm">Every project is an iteration towards engineering excellence and intelligent automation.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Achievements */}
      <section id="experience" className="py-32 px-6 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20">
          
          {/* Experience */}
          <div className="space-y-12">
            <h3 className="text-2xl font-bold flex items-center gap-4"><Award className="text-indigo-400" /> Career Path</h3>
            <div className="relative border-l border-zinc-800 pl-8 space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-indigo-500/20 border-2 border-indigo-500" />
                <h4 className="text-xl font-bold text-white">Frontend Developer Intern</h4>
                <p className="text-indigo-400 text-sm font-bold mb-4 uppercase tracking-wider">Creatiq Media | 2025</p>
                <ul className="space-y-3 text-zinc-400 text-sm leading-relaxed">
                  <li>Built responsive UI screens and reusable components using React.js and modern CSS.</li>
                  <li>Integrated REST APIs and optimized performance across primary user flows.</li>
                  <li>Collaborated via Git/GitHub in a hybrid professional environment.</li>
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-12">
            <h3 className="text-2xl font-bold flex items-center gap-4"><GraduationCap className="text-indigo-400" /> Milestones</h3>
            <div className="grid gap-6">
              <div className="glass-card p-6 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-zinc-400 mb-1 uppercase tracking-widest">LeetCode Mastery</h4>
                  <p className="text-2xl font-black">100+ PROBLEMS SOLVED</p>
                </div>
                <div className="w-12 h-12 bg-indigo-500/10 flex items-center justify-center rounded-lg text-indigo-400">
                  <Code2 size={24} />
                </div>
              </div>

              <div className="glass-card p-6 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-zinc-400 mb-1 uppercase tracking-widest">B.Tech Honors</h4>
                  <p className="text-2xl font-black">8.3 CGPA</p>
                  <p className="text-[10px] text-zinc-500">BRAINWARE UNIVERSITY</p>
                </div>
                <div className="w-12 h-12 bg-emerald-500/10 flex items-center justify-center rounded-lg text-emerald-400">
                  <GraduationCap size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-indigo-400 font-bold tracking-widest uppercase text-xs">Let's Connect</h2>
            <h3 className="text-5xl font-black">START_BUILDING</h3>
          </div>
          <ContactForm />

          <div className="flex justify-center gap-8 pt-12">
            <a href="https://github.com/DeathStar6" target="_blank" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all hover:-translate-y-1">
              <Github size={20} /> <span className="text-xs font-bold uppercase tracking-wider">GitHub</span>
            </a>
            <a href="https://linkedin.com/in/subhajit-chatterjee" target="_blank" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all hover:-translate-y-1">
              <Linkedin size={20} /> <span className="text-xs font-bold uppercase tracking-wider">LinkedIn</span>
            </a>
            <a href="mailto:subhajitc939@gmail.com" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all hover:-translate-y-1">
              <Mail size={20} /> <span className="text-xs font-bold uppercase tracking-wider">Email</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-zinc-900 text-center">
        <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">
          Intelligent systems. Meticulous design. SC © {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  )
}
