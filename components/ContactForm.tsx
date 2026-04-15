"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      // Formspree endpoint — replace YOUR_FORM_ID with your actual Formspree form ID
      // Get a free endpoint at https://formspree.io (takes 60 seconds)
      const res = await fetch('https://formspree.io/f/mnnqvjqd', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto space-y-10"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label
            htmlFor="contact-name"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1"
          >
            Terminal User //
          </label>
          <div className="recessed-slot rounded-sm overflow-hidden">
            <input
              id="contact-name"
              name="name"
              required
              type="text"
              autoComplete="name"
              className="w-full bg-transparent px-4 py-3 text-white focus:outline-none transition-all font-terminal placeholder:text-zinc-700"
              placeholder="Identification required"
            />
          </div>
        </div>
        <div className="space-y-3">
          <label
            htmlFor="contact-email"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1"
          >
            Access Port //
          </label>
          <div className="recessed-slot rounded-sm overflow-hidden">
            <input
              id="contact-email"
              name="email"
              required
              type="email"
              autoComplete="email"
              className="w-full bg-transparent px-4 py-3 text-white focus:outline-none transition-all font-terminal placeholder:text-zinc-700"
              placeholder="protocol@node.com"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="contact-message"
          className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1"
        >
          Data Payload //
        </label>
        <div className="recessed-slot rounded-sm overflow-hidden">
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            className="w-full bg-transparent px-4 py-3 text-white focus:outline-none transition-all resize-none font-terminal placeholder:text-zinc-700"
            placeholder="Signal content..."
          />
        </div>
      </div>

      {/* Status feedback */}
      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs text-red-400 font-mono"
        >
          <AlertCircle size={14} />
          Uplink failed. Local bypass: subhajitc939@gmail.com
        </motion.p>
      )}

      <button
        type="submit"
        disabled={status === 'sending' || status === 'sent'}
        className="tactile-button relative w-full py-4 text-white font-black uppercase tracking-[0.4em] text-xs transition-all disabled:opacity-60 overflow-hidden flex items-center justify-center gap-3 rounded-sm group"
      >
        {/* Button Inner Detail */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        
        {status === 'sent' ? (
          <>
            <CheckCircle size={16} className="text-green-500" />
            Transfer Complete
          </>
        ) : status === 'sending' ? (
          <>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Uplinking
            </motion.span>
            <span className="font-terminal">...</span>
          </>
        ) : (
          <>
            Execute Transmission
            <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </>
        )}
      </button>
    </motion.form>
  )
}
