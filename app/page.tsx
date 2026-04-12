'use client'

import { useRef, useEffect } from 'react'
import { animate, stagger } from 'animejs'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { 
  Rocket, 
  Code2, 
  Github, 
  Linkedin, 
  Mail, 
  Terminal,
  Database,
  Cloud,
  Cpu
} from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import BackgroundScene from '@/components/BackgroundScene'
import ProjectsStrip from '@/components/ProjectsStrip'
import NavBar from '@/components/NavBar'
import SkillBadge from '@/components/SkillBadge'
import Achievements from '@/components/Achievements'

const AnimatedTitle = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (containerRef.current) {
      const chars = containerRef.current.querySelectorAll('.char')
      animate(chars, {
        translateY: [100, 0],
        opacity: [0, 1],
        delay: stagger(25, { start: 300 }),
        easing: 'cubicBezier(.215, .61, .355, 1)',
        duration: 1000
      })
    }
  }, [])

  return (
    <div ref={containerRef} className="overflow-hidden flex flex-wrap justify-center font-black">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </span>
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
            <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 text-[10px] font-bold tracking-[0.3em] uppercase font-terminal">
              Open to Opportunities · 2026
            </div>
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl lg:text-[9.5rem] font-black tracking-tighter leading-[0.85] text-white">
              <AnimatedTitle text="SUBHAJIT" />
              <div className="text-outline">
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

            <div className="space-y-8">
              {[
                { year: "2025", role: "Frontend Developer Intern", co: "Creatiq Media", detail: "Scaled responsive UI components for high-traffic media platforms; 40% reduction in re-render cycles via memoization." },
                { year: "2024", role: "CivicSync AI", co: "Side Project", detail: "Built LLM-powered civic triage system (Gemini 1.5 Flash) — 60% faster issue routing, 1500+ test cases." },
                { year: "2023", role: "LLM Policy Query System", co: "Research", detail: "RAG pipeline on legal documents with semantic search; sub-1.5s response at 95th percentile." },
              ].map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
                  className="flex gap-8 group"
                >
                  <span className="font-terminal text-xs text-zinc-600 pt-1 w-10 shrink-0">{item.year}</span>
                  <div className="border-t border-white/5 pt-4 flex-1 group-hover:border-white/15 transition-colors">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 mb-1">{item.co}</p>
                    <h4 className="text-xl font-black text-white tracking-tight mb-3">{item.role}</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed font-medium">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProjectsStrip />

      <section id="skills" className="py-32 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              CAPABILITIES_<span className="text-zinc-500 text-2xl font-mono tracking-normal ml-4">[ SYSTEM_AUDIT ]</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-10 border border-white/5 bg-black/40 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 text-white/5 group-hover:text-white/10 transition-colors">
                  {skill.icon}
                </div>
                
                <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500 mb-8 border-b border-white/10 pb-4 group-hover:text-white transition-colors">
                  {skill.category}
                </h3>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {skill.items.map((item) => (
                    <SkillBadge key={item} name={item} />
                  ))}
                </div>

                {/* Industrial Scan-line effect */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Achievements />
      
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
              className="text-6xl md:text-8xl font-black text-white tracking-tighter"
            >
              LET&apos;S WORK
            </motion.h3>
            <p className="text-xl text-zinc-400 font-medium max-w-lg mx-auto">Open to ambitious AI engineering roles and high-scale technical systems architectures.</p>
          </div>
          
          <ContactForm />
        </div>
      </section>

      <footer className="py-20 px-6 border-t border-white/5 text-center space-y-6">
        <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.8em] font-terminal">
          © 2026 Subhajit Chatterjee — All rights reserved
        </p>
        <div className="flex justify-center gap-8">
          {[
            { label: "GitHub", icon: <Github size={16} />, href: "https://github.com/DeathStar6" },
            { label: "LinkedIn", icon: <Linkedin size={16} />, href: "https://www.linkedin.com/in/subhajit-chatterjee-a2b952222/" },
            { label: "Email", icon: <Mail size={16} />, href: "mailto:subhajitc939@gmail.com" }
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="text-zinc-600 hover:text-white transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </footer>
    </main>
  )
}
