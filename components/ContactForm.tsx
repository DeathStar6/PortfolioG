"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate sending
    setTimeout(() => setStatus('sent'), 1500)
  }

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">01_NAME</label>
          <input 
            required
            type="text" 
            className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white focus:outline-none focus:border-white transition-all font-mono placeholder:text-zinc-800"
            placeholder="SYSTEM_ID_NAME"
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">02_EMAIL</label>
          <input 
            required
            type="email" 
            className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white focus:outline-none focus:border-white transition-all font-mono placeholder:text-zinc-800"
            placeholder="COMM_CHANNEL_ADDR"
          />
        </div>
      </div>
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">03_MESSAGE_PAYLOAD</label>
        <textarea 
          required
          rows={4}
          className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white focus:outline-none focus:border-white transition-all resize-none font-mono placeholder:text-zinc-800"
          placeholder="ENTER_DATA_HERE..."
        />
      </div>
      <button 
        disabled={status !== 'idle'}
        className="relative w-full py-4 bg-white text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-zinc-200 transition-all disabled:opacity-50 overflow-hidden"
      >
        <span className="relative z-10">
          {status === 'sent' ? 'DATA_TRANSMITTED' : status === 'sending' ? 'TRANSMITTING...' : 'INITIALIZE_CONTACT'}
        </span>
        {/* Rapid hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
      </button>
    </motion.form>
  )
}
