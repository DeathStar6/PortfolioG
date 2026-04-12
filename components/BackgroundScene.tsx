"use client"

import { useRef } from 'react'
import { motion } from 'framer-motion-3d'
import { MotionValue } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Atmosphere, CameraRig, ProjectNode } from './SceneComponents'

interface BackgroundSceneProps {
  scroll: MotionValue<number>
}

function SceneOrchestrator({ scroll }: { scroll: MotionValue<number> }) {
  const scrollValue = useRef(0)
  const velocityValue = useRef(0)
  const lastScroll = useRef(0)
  
  useFrame((state, delta) => {
    const current = scroll.get()
    const ds = current - lastScroll.current
    const vel = delta > 0 ? Math.abs(ds / delta) : 0
    
    scrollValue.current = current
    velocityValue.current = vel
    lastScroll.current = current
  })

  return (
    <>
      <Atmosphere scrollVelocity={velocityValue.current} />
      
      {/* Project Stations Linked to 0.33 and 0.66 Thresholds */}
      <ProjectNode 
        id={1} 
        position={[-10, 0, -5]} 
        scroll={scrollValue.current} 
        threshold={0.33} 
      />
      
      <ProjectNode 
        id={2} 
        position={[10, 0, -10]} 
        scroll={scrollValue.current} 
        threshold={0.66} 
      />

      {/* The Intelligence Core (Hero Anchor) */}
      <ProjectNode 
        id={0} 
        position={[0, 0, 0]} 
        scroll={scrollValue.current} 
        threshold={0.0}
        geometry={<sphereGeometry args={[8, 32, 32]} />}
      />

      <CameraRig scroll={scrollValue.current} velocity={velocityValue.current} />
    </>
  )
}

export default function BackgroundScene({ scroll }: BackgroundSceneProps) {
  if (!scroll) return null

  return (
    <div className="fixed inset-0 -z-10 bg-[#000000] overflow-hidden pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 40], fov: 60 }} 
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 20, 20]} intensity={10} color="#6366f1" />
        <pointLight position={[-20, -20, -20]} intensity={8} color="#f472b6" />
        
        <SceneOrchestrator scroll={scroll} />
      </Canvas>
    </div>
  )
}
