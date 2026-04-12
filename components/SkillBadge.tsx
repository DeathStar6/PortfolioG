import { motion } from 'framer-motion'

interface SkillBadgeProps {
  name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="group px-3 py-1 bg-white/5 border border-white/5 transition-all cursor-default flex items-center gap-1.5 overflow-hidden"
    >
      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 group-hover:text-white transition-colors">
        {name}
      </span>
      <motion.div 
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
        className="w-[3px] h-3 bg-white/20 group-hover:bg-white transition-colors"
      />
    </motion.div>
  )
}
