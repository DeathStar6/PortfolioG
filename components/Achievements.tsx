"use client"

import { motion } from 'framer-motion'
import { Award, FileText, ArrowUpRight } from 'lucide-react'

const certificates = [
  {
    title: "Frontend Developer Internship",
    issuer: "Creatiq Media",
    year: "2025",
    file: "Frontend Dev Intern.pdf",
    description: "Successfully completed research and development in modern frontend architectures and scalable UI systems."
  },
  {
    title: "NEXATHON 2025",
    issuer: "Technical Achievement",
    year: "2025",
    file: "NEXATHON 2025.pdf",
    description: "Recognized for technical excellence and innovation during the NEXATHON engineering challenge."
  },
  {
    title: "Smart India Hackathon 2025",
    issuer: "Ministry of Education, Govt. of India",
    year: "2025",
    file: "SIH 2025.pdf",
    description: "National-level recognition for developing innovative solutions to real-world civic and technical problems."
  },
  {
    title: "Smart India Hackathon 2026",
    issuer: "National Innovation Council",
    year: "2026",
    file: "SIH 2026.pdf",
    description: "Continued excellency in national-level hacking, contributing to large-scale engineering solutions."
  },
  {
    title: "Snakalpa 2026",
    issuer: "Institutional Excellence",
    year: "2026",
    file: "Snakalpa 2026.pdf",
    description: "Achievement in technical symposium and community engineering challenges."
  }
]

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 md:py-40 px-4 md:px-6 relative overflow-hidden bg-zinc-950/20">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter"
            >
              ACHIEVEMENTS
            </motion.h2>
            <p className="text-zinc-500 font-medium max-w-lg tracking-wide">
              Verified credentials and national-level recognitions in engineering and AI research.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-4 text-zinc-600 font-terminal text-xs uppercase tracking-[0.4em]"
          >
            <Award size={16} /> [ Verified_Credentials ]
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.file}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="glass-card p-8 h-full flex flex-col justify-between border border-white/5 hover:border-white/10 transition-colors">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-lg bg-white/5 text-zinc-400 group-hover:text-white transition-colors">
                      <FileText size={24} />
                    </div>
                    <span className="text-[10px] font-black font-terminal text-zinc-700 tracking-widest">{cert.year}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors uppercase">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-bold text-zinc-500 tracking-[0.2em] font-terminal uppercase">
                      {cert.issuer}
                    </p>
                  </div>
                  
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <a 
                    href={`/Certificates/${cert.file}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full text-[10px] font-black text-zinc-500 group-hover:text-white tracking-widest uppercase transition-colors"
                  >
                    View Certificate 
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  )
}
