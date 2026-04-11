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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-xl mx-auto space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">Name</label>
          <input 
            required
            type="text" 
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">Email</label>
          <input 
            required
            type="email" 
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            placeholder="john@example.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400">Message</label>
        <textarea 
          required
          rows={5}
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none"
          placeholder="How can I help you?"
        />
      </div>
      <button 
        disabled={status !== 'idle'}
        className="premium-button w-full justify-center group"
      >
        {status === 'sent' ? 'Message Sent!' : status === 'sending' ? 'Sending...' : (
          <>
            Send Message 
            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </>
        )}
      </button>
    </motion.form>
  )
}
