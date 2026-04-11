import { motion } from 'framer-motion'

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  return (
    <div className={`relative inline-block group cursor-none ${className}`}>
      <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-100">
        {text}
      </span>
      <span className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 glitch-hover text-primary">
        {text}
      </span>
      <span className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 glitch-hover text-secondary [animation-delay:0.1s] -translate-x-1">
        {text}
      </span>
      <span className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 glitch-hover text-accent [animation-delay:0.2s] translate-x-1">
        {text}
      </span>
    </div>
  )
}
