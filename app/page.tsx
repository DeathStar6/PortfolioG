"use client"

import { motion } from 'framer-motion'
import { Rocket, BrainCircuit, Code2, Award, GraduationCap, Github, Linkedin, Mail, ExternalLink, ArrowRight, Zap } from 'lucide-react'
import NavBar from "@/components/NavBar"
import ProjectCard from "@/components/ProjectCard"
import SkillBadge from "@/components/SkillBadge"
import Marquee from "@/components/Marquee"
import GlitchText from "@/components/GlitchText"

export default function Home() {
  const skills = {
    programming: ["C", "C++", "Python", "JavaScript", "SQL"],
    ai: ["TensorFlow", "PyTorch", "Scikit", "OpenCV", "NLP", "LLMs", "RAG", "Prompting"],
    web: ["HTML", "CSS", "React.js", "Next.js", "Node.js", "Express", "APIs"],
    tools: ["Flask", "Django", "LangChain", "AWS", "Docker", "Git"],
  }

  const projects = [
    {
      title: "LLM-Powered Query System",
      description: "AI system to extract answers from policy docs using RAG. Sub-1.5s response time.",
      techStack: ["Next.js", "Python", "LangChain", "RAG"],
      github: "https://github.com/DeathStar6",
    },
    {
      title: "University Landing Page",
      description: "Full-stack MERN app for student interaction with optimized performance.",
      techStack: ["MongoDB", "Express", "React", "Node.js"],
      github: "https://github.com/DeathStar6",
    },
    {
      title: "Grade Manager (CLI + Web)",
      description: "Academic management system with JSON persistence and custom HTTP server.",
      techStack: ["Python", "JSON", "Bootstrap"],
      github: "https://github.com/DeathStar6",
    },
    {
      title: "Fake News Detection",
      description: "ML model classifying misinformation using TF-IDF and Scikit-Learn.",
      techStack: ["Python", "Scikit", "NLP", "TF-IDF"],
      github: "https://github.com/DeathStar6",
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-neon/40 relative overflow-x-hidden">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        {/* Background Decorative Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <h1 className="text-[25vw] font-black text-stroke leading-none">SUBHAJIT</h1>
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                className="inline-block mb-8 px-6 py-2 brutal-border bg-neon brutal-shadow-lg font-black uppercase tracking-[0.2em] text-xs transform -rotate-2"
              >
                Available for R&D Opportunities
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-7xl md:text-[10rem] font-black mb-12"
              >
                <GlitchText text="SUBHAJIT" />
                <br />
                <span className="bg-primary px-4 brutal-border brutal-shadow-lg inline-block my-4 transform rotate-1">
                  CHATTERJEE
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col md:flex-row gap-8 items-start md:items-center"
              >
                <p className="text-xl md:text-2xl font-black leading-tight border-l-8 border-black pl-8 max-w-lg">
                  AI ENGINEER & WEB ARCHITECT. <br />
                  <span className="opacity-50 text-base">CRAFTING HIGH-PERFORMANCE INTELLIGENT SYSTEMS THAT SCALE.</span>
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a href="#projects" className="brutal-button bg-black text-white px-10 py-5 text-xl">
                    PROVED WORK <Rocket size={24} />
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 5, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block brutal-card bg-secondary/10 p-1 transform rotate-6 hover:rotate-0 transition-transform cursor-none group"
            >
               <div className="brutal-border bg-white p-8 brutal-shadow relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap size={100} />
                  </div>
                  <h3 className="text-2xl font-black mb-4">THE_8_SEC_RULE</h3>
                  <p className="font-black text-sm opacity-60 leading-snug">
                    "Recruiters scan, they don't read. If your portfolio doesn't impress in seconds, you're already skipped."
                  </p>
                  <div className="mt-8 pt-8 border-t-4 border-black flex gap-4">
                    <div className="w-12 h-12 brutal-border bg-neon flex items-center justify-center font-black">AI</div>
                    <div className="w-12 h-12 brutal-border bg-accent flex items-center justify-center font-black">JS</div>
                    <div className="w-12 h-12 brutal-border bg-primary flex items-center justify-center font-black">PY</div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Separator */}
      <Marquee text="AI POWERED ARCHITECTURE / FUTURE OF WEB / LLM OPTIMIZED" className="transform -rotate-2 scale-110 z-20 relative" />

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-white border-y-8 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 gap-8">
            <div className="inline-block px-12 py-6 brutal-border bg-black text-white brutal-shadow-lg transform -rotate-1">
              <div className="flex items-center gap-6">
                <BrainCircuit size={48} />
                <h2 className="text-6xl font-black tracking-tighter">THE_TECH_OPS</h2>
              </div>
            </div>
            <p className="text-xl font-black max-w-md border-b-8 border-neon pb-4">
              I don't just use tools. I master ecosystems to deliver "The Proof".
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {Object.entries(skills).map(([category, items], idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={category}
                className="brutal-card group bg-white hover:bg-zinc-50"
              >
                <div className={`w-12 h-12 brutal-border mb-6 flex items-center justify-center font-black text-xs
                  ${idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-neon' : idx === 2 ? 'bg-accent' : 'bg-secondary'}`}>
                  0{idx + 1}
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-30">
                  [{category}]
                </h3>
                <div className="flex flex-wrap gap-2">
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
      <section id="projects" className="py-32 px-6 relative">
        {/* Background Decor */}
        <div className="absolute top-40 left-10 opacity-5 -z-10 rotate-12">
          <Code2 size={400} />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-10">
            <div className="flex items-center gap-6 bg-primary brutal-border px-12 py-6 brutal-shadow-lg transform rotate-2">
              <Code2 size={40} />
              <h2 className="text-5xl font-black">PROOF_OF_WORK</h2>
            </div>
            <a href="https://github.com/DeathStar6" target="_blank" className="brutal-button bg-accent text-lg">
              GITHUB_DUMP <Github size={24} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Separator 2 */}
      <Marquee text="8.3 CGPA / PRODUCTION READY / FULL STACK EXPERTISE" reverse className="transform rotate-1 scale-105 z-20 relative bg-neon" />

      {/* Experience & Education - Overlapping Layout */}
      <section id="experience" className="py-32 px-6 bg-accent/10 border-t-8 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 relative">
            
            {/* Experience */}
            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-16 px-10 py-5 brutal-border bg-secondary brutal-shadow-lg w-fit transform -rotate-2">
                <Award size={40} />
                <h2 className="text-4xl font-black">EXP_TIMELINE</h2>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="brutal-card bg-white relative p-12 overflow-hidden"
              >
                  <div className="absolute -top-10 -right-10 w-40 h-40 brutal-border bg-neon/10 rounded-full" />
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-12 pb-12 border-b-4 border-black gap-6">
                    <div>
                      <h3 className="text-4xl font-black mb-2 tracking-tighter">FRONTEND ARCHITECT INTERN</h3>
                      <p className="text-2xl font-black opacity-40">CREATIQ MEDIA</p>
                    </div>
                    <div className="bg-black text-white px-6 py-3 font-black text-base brutal-shadow transform rotate-3">
                      AUG 25 — DEC 25
                    </div>
                  </div>

                  <ul className="grid md:grid-cols-2 gap-8">
                    {[
                      { icon: <Zap />, text: "Built responsive UI screens and reusable components with React.js." },
                      { icon: <ArrowRight />, text: "Integrated REST APIs and optimized frontend performance." },
                      { icon: <Code2 />, text: "Fixed UI/UX bugs and implemented mobile-first strategies." },
                      { icon: <Github />, text: "Automated workflows using Git and version control." }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start font-black">
                        <div className="mt-1 text-neon">{item.icon}</div>
                        <span className="text-lg leading-tight">{item.text}</span>
                      </li>
                    ))}
                  </ul>
              </motion.div>
            </div>

            {/* Education "Sticker" Section */}
            <div className="lg:pt-24">
              <div id="education" className="flex items-center gap-4 mb-12 bg-white brutal-border px-8 py-4 brutal-shadow w-fit transform rotate-2">
                 <GraduationCap size={32} />
                 <h2 className="text-3xl font-black">ED_PATH</h2>
              </div>

              <div className="flex flex-col gap-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="brutal-card bg-primary transform -rotate-2 hover:rotate-0"
                >
                  <div className="text-xs font-black mb-2 bg-black text-white w-fit px-2 py-1">2024 — 28</div>
                  <h3 className="text-2xl font-black tracking-tighter">B.TECH IN CSE</h3>
                  <p className="font-black opacity-60 mb-6">BRAINWARE UNIVERSITY</p>
                  <div className="text-3xl font-black bg-white brutal-border p-4 brutal-shadow-lg text-center">
                    CGPA: 8.3
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="brutal-card bg-white transform rotate-3 hover:rotate-0"
                >
                  <div className="text-xs font-black mb-2 bg-black text-white w-fit px-2 py-1">2018 — 21</div>
                  <h3 className="text-2xl font-black tracking-tighter">B.SC (GENERAL)</h3>
                  <p className="font-black opacity-60 mb-6 font-mono text-xs">ULUBERIA COLLEGE (CU)</p>
                  <div className="text-3xl font-black border-4 border-black p-4 bg-accent brutal-shadow text-center">
                    CGPA: 7.1
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Connect */}
      <footer className="py-40 bg-black text-white relative overflow-hidden">
        {/* Animated Marquee in footer */}
        <div className="absolute top-0 left-0 w-full opacity-20">
          <Marquee text="HIRE THE FUTURE / BUILD THE AGENTIC WEB / CHATTERJEE" className="border-none bg-transparent text-white" />
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-8xl md:text-[14rem] font-black mb-16 tracking-[ -0.05em] leading-none"
          >
            LET'S_<br />
            <span className="text-stroke">CONNECT</span>
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-12 mb-20">
            {[
              { label: "GITHUB", icon: <Github />, href: "https://github.com/DeathStar6" },
              { label: "LINKEDIN", icon: <Linkedin />, href: "https://www.linkedin.com/in/subhajit-chatterjee-a2b952222/" },
              { label: "EMAIL", icon: <Mail />, href: "mailto:subhajitc939@gmail.com" }
            ].map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 brutal-border bg-white text-black flex items-center justify-center group-hover:bg-primary group-hover:-translate-y-2 transition-all brutal-shadow-lg">
                  {link.icon}
                </div>
                <span className="font-black tracking-widest text-sm">{link.label}</span>
              </a>
            ))}
          </div>

          <p className="text-xs font-black opacity-20 tracking-[0.8em] uppercase">
            DESIGNED TO STAND OUT. SC CONFIG © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  )
}
