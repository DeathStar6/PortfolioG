import { motion } from 'framer-motion'

interface MarqueeProps {
  text: string
  reverse?: boolean
  className?: string
}

export default function Marquee({ text, reverse = false, className = "" }: MarqueeProps) {
  return (
    <div className={`overflow-hidden py-4 border-y-4 border-black bg-white select-none ${className}`}>
      <motion.div
        animate={{ x: reverse ? [0, -1000] : [-1000, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap gap-8 items-center"
      >
        {[...Array(20)].map((_, i) => (
          <span key={i} className="text-4xl font-black uppercase tracking-tighter flex items-center gap-8">
            {text}
            <span className="w-8 h-8 brutal-border bg-primary rotate-45" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
