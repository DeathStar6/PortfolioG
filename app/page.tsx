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
import DecryptedText from "@/components/DecryptedText"
import { useMagnetic } from "@/hooks/useMagnetic"
import FocusMode from "@/components/FocusMode"
import dynamic from "next/dynamic"

const RobotModel = dynamic(() => import('@/components/RobotModel'), { ssr: false })

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

  const magneticWork = useMagnetic(0.25)
  const magneticContact = useMagnetic(0.25)

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
      
      {/* Root-level RobotModel to ensure proper mix-blend-screen with background particles */}
      <RobotModel />
      <FocusMode />
      
      <motion.div 
        className="neural-progress" 
        style={{ scaleX: smoothScroll }} 
      />

      <div className="ui-layer">
        <section className="relative min-h-screen flex items-center justify-center px-6">
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.85] text-white">
              <DecryptedText text="SUBHAJIT" as="div" />
              <div className="text-outline">
                <DecryptedText text="CHATTERJEE" as="div" />
              </div>
            </h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto font-medium leading-relaxed"
          >
            Engineering <span className="text-white">Intelligent Systems</span> with AI 
            and scalable web architectures. Designing the future of agentic products.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-6 pt-6 relative z-10"
          >
            <motion.a 
              {...magneticWork}
              style={{ x: magneticWork.x, y: magneticWork.y }}
              href="#projects" 
              className="premium-button px-8 py-4 text-base"
            >
              Examine Work <Rocket size={18} />
            </motion.a>
            <motion.a 
              {...magneticContact}
              style={{ x: magneticContact.x, y: magneticContact.y }}
              href="#contact" 
              className="premium-button-outline px-8 py-4 text-base"
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

      <section id="about" className="min-h-screen py-24 px-6 relative flex items-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-12"
          >
            <motion.h2 
              style={{ y: useTransform(smoothScroll, [0, 0.2], [0, -100]) }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none"
            >
              THE_INTELLIGENT_<br />
              <span className="text-indigo-500/50 italic">APPROACH</span>
            </motion.h2>
            <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-tight max-w-xl">
              I specialize in bridging the gap between <span className="text-white">complex AI research</span> and 
              <span className="text-white"> production-ready systems</span>. 
              My focus is on RAG, LLM integration, and high-performance Web Architectures.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="experience" className="min-h-[70vh] py-24 px-6 bg-zinc-950/20 flex items-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="space-y-16">
            <motion.h2 
              style={{ x: useTransform(smoothScroll, [0.1, 0.3], [-50, 0]) }}
              className="text-xs font-bold tracking-[0.5em] text-indigo-500 uppercase flex items-center gap-4"
            >
              <span className="w-12 h-px bg-indigo-500/30" />
              <DecryptedText text="Professional Timeline" />
            </motion.h2>

            <div className="relative pl-12 border-l border-white/5 space-y-12">
              <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="group relative"
              >
                <div className="absolute -left-[3.4rem] top-0 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] group-hover:scale-150 transition-transform" />
                
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-6">
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Frontend Developer Intern</h3>
                  <span className="text-indigo-500/50 font-mono text-sm ml-auto md:ml-0 md:pl-4">2025 // PRESENT</span>
                </div>

                <p className="text-indigo-500 text-lg font-black mb-8 uppercase tracking-widest">Creatiq Media</p>
                
                <div className="text-zinc-400 text-lg space-y-6 max-w-2xl font-medium leading-relaxed">
                  <p className="opacity-80 group-hover:opacity-100 transition-opacity">
                    Designing and scaling responsive UI components for high-traffic media platforms. 
                    Specializing in high-performance React architectures and cinematic WebGL integrations.
                  </p>
                  
                  <ul className="space-y-3 text-sm font-mono opacity-60">
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full" />
                      Integrated complex REST architectures with React.js
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full" />
                      Optimized render performance and UX flow for scale
                    </li>
                  </ul>
                </div>
              </motion.div>
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
              <DecryptedText text="CAPABILITIES" />_<span className="text-zinc-500 text-2xl font-mono tracking-normal ml-4">[ SYSTEM_AUDIT ]</span>
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
      
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-24">
          <div className="space-y-6">
            <motion.h2 
              style={{ x: useTransform(smoothScroll, [0.8, 1], [-200, 200]) }}
              className="text-[8vw] font-black text-white/5 absolute -top-10 left-0 tracking-tighter pointer-events-none uppercase"
            >
              CONNECT
            </motion.h2>
            <motion.h3 
              style={{ scale: useTransform(smoothScroll, [0.85, 0.95], [0.8, 1]) }}
              className="text-4xl md:text-6xl font-black text-white tracking-tighter"
            >
              <DecryptedText text="LET'S WORK" />
            </motion.h3>
            <p className="text-lg text-zinc-400 font-medium max-w-md mx-auto">Open to ambitious AI engineering roles and high-scale technical systems architectures.</p>
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
      </div>
    </main>
  )
}
