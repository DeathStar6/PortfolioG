import { motion } from 'framer-motion'
import { 
  SiTensorflow, SiPytorch, SiReact, SiNextdotjs, SiNodedotjs, 
  SiExpress, SiMongodb, SiPostgresql, SiMysql, SiFirebase, 
  SiDocker, SiGithub, SiPython, SiCplusplus, SiC, 
  SiJavascript, SiLangchain, SiHuggingface, SiTypescript, SiTailwindcss, SiVite
} from 'react-icons/si'
import { 
  LuBrainCircuit, LuFileSearch, LuNetwork, LuType, 
  LuWebhook, LuArrowRightLeft, LuDatabase, LuCpu 
} from 'react-icons/lu'
import { FaAws } from 'react-icons/fa'

interface SkillBadgeProps {
  name: string
}

const getIcon = (name: string) => {
  const n = name.toLowerCase()
  if (n.includes('tensorflow')) return <SiTensorflow size={14} />
  if (n.includes('pytorch')) return <SiPytorch size={14} />
  if (n.includes('react')) return <SiReact size={14} />
  if (n.includes('next.js')) return <SiNextdotjs size={14} />
  if (n.includes('node.js')) return <SiNodedotjs size={14} />
  if (n.includes('express')) return <SiExpress size={14} />
  if (n.includes('mongodb')) return <SiMongodb size={14} />
  if (n.includes('postgresql')) return <SiPostgresql size={14} />
  if (n.includes('mysql') || n === 'sql') return <SiMysql size={14} />
  if (n.includes('firebase')) return <SiFirebase size={14} />
  if (n.includes('aws')) return <FaAws size={14} />
  if (n.includes('docker')) return <SiDocker size={14} />
  if (n.includes('github') || n === 'git') return <SiGithub size={14} />
  if (n.includes('python')) return <SiPython size={14} />
  if (n === 'c++') return <SiCplusplus size={14} />
  if (n === 'c') return <SiC size={14} />
  if (n.includes('javascript')) return <SiJavascript size={14} />
  if (n.includes('typescript')) return <SiTypescript size={14} />
  if (n.includes('tailwind')) return <SiTailwindcss size={14} />
  if (n.includes('vite')) return <SiVite size={14} />
  if (n.includes('langchain')) return <SiLangchain size={14} />
  if (n.includes('hugging face')) return <SiHuggingface size={14} />
  
  // Lucide Logic Fallbacks
  if (n.includes('nlp')) return <LuBrainCircuit size={14} />
  if (n.includes('rag')) return <LuFileSearch size={14} />
  if (n.includes('llm')) return <LuNetwork size={14} />
  if (n.includes('prompt')) return <LuType size={14} />
  if (n.includes('api')) return <LuWebhook size={14} />
  if (n.includes('etl') || n.includes('pipeline')) return <LuArrowRightLeft size={14} />
  if (n.includes('database') || n.includes('data')) return <LuDatabase size={14} />
  
  return <LuCpu size={14} /> // Default fallback
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -1 }}
      className="group px-3 py-1.5 bg-zinc-800/80 border border-white/5 shadow-[2px_2px_0px_rgba(0,0,0,0.5),inset_1px_1px_0px_rgba(255,255,255,0.05)] rounded-sm transition-all cursor-default flex items-center gap-2.5 overflow-hidden relative active:shadow-none active:translate-y-[1px]"
    >
      {/* Physical Bevel/Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none opacity-50" />
      
      <div className="text-zinc-500 group-hover:text-white transition-colors relative z-10 font-black">
        {getIcon(name)}
      </div>

      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors relative z-10">
        {name}
      </span>
      
      <motion.div 
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }}
        className="w-[1px] h-2.5 bg-zinc-700 group-hover:bg-white transition-colors relative z-10"
      />
    </motion.div>
  )
}
