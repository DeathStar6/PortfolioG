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
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label
            htmlFor="contact-name"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500"
          >
            Name →
          </label>
          <input
            id="contact-name"
            name="name"
            required
            type="text"
            autoComplete="name"
            className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white focus:outline-none focus:border-white transition-all font-terminal placeholder:text-zinc-700"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-3">
          <label
            htmlFor="contact-email"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500"
          >
            Email →
          </label>
          <input
            id="contact-email"
            name="email"
            required
            type="email"
            autoComplete="email"
            className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white focus:outline-none focus:border-white transition-all font-terminal placeholder:text-zinc-700"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="contact-message"
          className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500"
        >
          Message →
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white focus:outline-none focus:border-white transition-all resize-none font-terminal placeholder:text-zinc-700"
          placeholder="Tell me about the project or role..."
        />
      </div>

      {/* Status feedback */}
      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs text-red-400 font-mono"
        >
          <AlertCircle size={14} />
          Something went wrong. Try emailing subhajitc939@gmail.com directly.
        </motion.p>
      )}

      <button
        type="submit"
        disabled={status === 'sending' || status === 'sent'}
        className="relative w-full py-4 text-black font-black uppercase tracking-[0.3em] text-xs transition-all disabled:opacity-60 overflow-hidden flex items-center justify-center gap-3"
        style={{ background: 'var(--foreground)' }}
      >
        {status === 'sent' ? (
          <>
            <CheckCircle size={16} />
            Message Sent
          </>
        ) : status === 'sending' ? (
          <>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Sending
            </motion.span>
            <span className="font-terminal">...</span>
          </>
        ) : (
          <>
            Send Message
            <Send size={14} />
          </>
        )}
      </button>
    </motion.form>
  )
}
