'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { 
  Rocket, 
  BrainCircuit, 
  Code2, 
  GraduationCap, 
  Github, 
  Linkedin, 
  Mail, 
  Terminal,
  Database,
  Cloud,
  Cpu,
  ExternalLink
} from 'lucide-react'
import NavBar from '@/components/NavBar'
import ProjectCard from '@/components/ProjectCard'
import SkillBadge from '@/components/SkillBadge'
import ContactForm from '@/components/ContactForm'
import BackgroundScene from '@/components/BackgroundScene'

const AnimatedTitle = ({ text }: { text: string }) => {
  const characters = text.split("")
  
  return (
    <div className="overflow-hidden flex flex-wrap justify-center">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: i * 0.03,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
}

export default function Home() {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  })

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

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
      description: "ML pipeline classifying real vs fake news using text preprocessing. Trained Logistic Regression and Naive Bayes models with improved accuracy.",
      techStack: ["Python", "Scikit", "NLP", "TF-IDF"],
      github: "https://github.com/DeathStar6",
    },
  ]

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <NavBar />
      <BackgroundScene scroll={smoothScroll} />
      
      <motion.div 
        className="neural-progress" 
        style={{ scaleX: smoothScroll }} 
      />

      <section className="relative h-[120vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <div className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-[10px] font-bold tracking-[0.3em] uppercase">
              Now Available for 2026/28 Partnerships
            </div>
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl lg:text-[9.5rem] font-black tracking-tighter leading-[0.85] text-white">
              <AnimatedTitle text="SUBHAJIT" />
              <div className="text-gradient">
                <AnimatedTitle text="CHATTERJEE" />
              </div>
            </h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-400 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Engineering <span className="text-white">Intelligent Systems</span> with AI 
            and scalable web architectures. Designing the future of agentic products.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-6 pt-6"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects" 
              className="premium-button px-10 py-5 text-lg"
            >
              Examine Work <Rocket size={20} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className="premium-button-outline px-10 py-5 text-lg"
            >
              Contact Agent
            </motion.a>
          </motion.div>
        </div>

        <motion.div 
          style={{ opacity: useTransform(smoothScroll, [0, 0.1], [1, 0]) }}
          className="absolute bottom-12 flex flex-col items-center gap-4"
        >
          <div className="w-px h-24 bg-gradient-to-b from-indigo-500/50 to-transparent relative">
            <motion.div 
              animate={{ y: [0, 96, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" 
            />
          </div>
        </motion.div>
      </section>

      <section id="about" className="min-h-screen py-60 px-6 relative flex items-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-12"
          >
            <motion.h2 
              style={{ y: useTransform(smoothScroll, [0, 0.2], [0, -100]) }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none"
            >
              THE_INTELLIGENT_<br />
              <span className="text-indigo-500/50 italic">APPROACH</span>
            </motion.h2>
            <p className="text-2xl md:text-4xl text-zinc-400 font-medium leading-tight max-w-2xl">
              I specialize in bridging the gap between <span className="text-white">complex AI research</span> and 
              <span className="text-white"> production-ready systems</span>. 
              My focus is on RAG, LLM integration, and high-performance Web Architectures.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="experience" className="min-h-screen py-60 px-6 bg-zinc-950/20 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <motion.h2 
                style={{ x: useTransform(smoothScroll, [0.1, 0.3], [-50, 0]) }}
                className="text-xs font-bold tracking-[0.5em] text-indigo-500 uppercase"
              >
                Professional Timeline
              </motion.h2>
              <div className="space-y-20">
                <motion.div 
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   className="group relative pl-12 border-l border-zinc-800"
                >
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform" />
                  <h3 className="text-4xl font-bold text-white mb-2 tracking-tighter">Frontend Developer Intern</h3>
                  <p className="text-indigo-500 text-lg font-black mb-6 uppercase">Creatiq Media | 2025</p>
                  <div className="text-zinc-400 text-lg space-y-4 max-w-lg font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                    <p>Designed and scaled responsive UI components for high-traffic media platforms.</p>
                    <p>Integrated complex REST architectures with React.js, focusing on render performance and UX flow.</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {[
                { label: "LeetCode", value: "100+", sub: "Problems Solved", icon: <Code2 /> },
                { label: "B.Tech Honors", value: "8.3", sub: "Current CGPA", icon: <GraduationCap /> },
                { label: "Response Time", value: "<1.5s", sub: "RAG Systems", icon: <Cpu /> },
                { label: "Stack", value: "AI+WEB", sub: "Deep Synergy", icon: <BrainCircuit /> }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-10 flex flex-col justify-between aspect-square"
                >
                  <div className="text-indigo-400">{stat.icon}</div>
                  <div>
                    <h4 className="text-5xl font-black text-white mb-2">{stat.value}</h4>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[300vh]" id="projects">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="px-6 mb-12">
            <motion.div 
              style={{ y: useTransform(smoothScroll, [0.3, 0.45], [50, -50]) }}
              className="max-w-7xl mx-auto space-y-4"
            >
               <h2 className="text-xs font-bold tracking-[0.6em] text-zinc-600 uppercase">Curated Intelligence</h2>
               <h3 className="text-7xl md:text-9xl font-black text-white tracking-tighter">PROJECTS</h3>
            </motion.div>
          </div>

          <motion.div 
            style={{ x: useTransform(smoothScroll, [0.25, 0.7], ["0%", "-70%"]) }}
            className="cinema-strip px-6"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.title} {...project} index={i} scrollY={smoothScroll} />
            ))}
          </motion.div>
        </div>
      </section>

      <section id="skills" className="py-60 px-6 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {skills.map((skillGroup, i) => (
              <motion.div 
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-12 space-y-12 group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-indigo-400">{skillGroup.icon}</div>
                  <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">0{i+1}</span>
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tighter">{skillGroup.category.toUpperCase()}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((item) => (
                    <SkillBadge key={item} name={item} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-60 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-24">
          <div className="space-y-6">
            <motion.h2 
              style={{ x: useTransform(smoothScroll, [0.8, 1], [-200, 200]) }}
              className="text-[15vw] font-black text-white/5 absolute -top-20 left-0 tracking-tighter pointer-events-none uppercase"
            >
              CONNECT
            </motion.h2>
            <motion.h3 
              style={{ scale: useTransform(smoothScroll, [0.85, 0.95], [0.8, 1]) }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter underline decoration-indigo-500/50 decoration-8 underline-offset-8"
            >
              INITIATE_CONTACT
            </motion.h3>
            <p className="text-xl text-zinc-400 font-medium max-w-lg mx-auto">Available for ambitious AI engineering roles and high-scale technical systems architectures.</p>
          </div>
          
          <ContactForm />
          
          <div className="flex flex-wrap justify-center gap-16 pt-12">
            {[
              { label: "GITHUB", icon: <Github />, href: "https://github.com/DeathStar6" },
              { label: "LINKEDIN", icon: <Linkedin />, href: "https://linkedin.com/in/subhajit-chatterjee" },
              { label: "EMAIL", icon: <Mail />, href: "mailto:subhajitc939@gmail.com" }
            ].map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                className="group flex flex-col items-center gap-6"
              >
                <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-indigo-500 group-hover:bg-indigo-500/10 transition-all group-hover:-translate-y-2">
                  <span className="text-zinc-400 group-hover:text-indigo-400">{link.icon}</span>
                </div>
                <span className="text-[10px] font-black tracking-[0.4em] text-zinc-600 group-hover:text-white transition-colors uppercase">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 border-t border-zinc-900 text-center space-y-4">
        <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.8em]">
          METICULOUSLY CRAFTED @ 2026. SC_ENGINEERING_DOCS
        </p>
      </footer>
    </main>
  )
}
