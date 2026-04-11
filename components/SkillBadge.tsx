"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
  name: string
  category?: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, x: -2, y: -2 }}
      className="px-4 py-2 brutal-border bg-white brutal-shadow text-sm font-black uppercase tracking-tight whitespace-nowrap hover:bg-primary transition-colors cursor-default"
    >
      {name}
    </motion.span>
  )
}
