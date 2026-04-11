import { motion } from 'framer-motion'

interface SkillBadgeProps {
  name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.span 
      whileHover={{ scale: 1.05 }}
      className="px-4 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800 text-sm font-medium text-zinc-300 transition-colors hover:text-white hover:border-zinc-700"
    >
      {name}
    </motion.span>
  )
}
