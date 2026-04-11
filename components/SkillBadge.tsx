"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
  name: string
  category?: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, y: -2 }}
      className="px-4 py-2 rounded-full glass border border-white/10 text-sm font-medium whitespace-nowrap"
    >
      {name}
    </motion.span>
  )
}
