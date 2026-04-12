import { motion } from 'framer-motion'

interface SkillBadgeProps {
  name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.span 
      whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.4)" }}
      className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-white/5 border border-white/5 transition-all hover:text-white cursor-default"
    >
      {name}
    </motion.span>
  )
}
