"use client"

import { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Atmosphere, CameraRig, ProjectNode } from './SceneComponents'

export default function BackgroundScene() {
  const [scroll, setScroll] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const lastScroll = useRef(0)
  const lastTime = useRef(0)

  useEffect(() => {
    lastTime.current = Date.now()
    const handleScroll = () => {
      const winScroll = window.scrollY
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = winScroll / height
      
      // Calculate Scroll Velocity
      const now = Date.now()
      const dt = (now - lastTime.current) / 1000
      const ds = scrolled - lastScroll.current
      const vel = dt > 0 ? Math.abs(ds / dt) : 0
      
      setVelocity(vel)
      setScroll(scrolled)
      
      lastScroll.current = scrolled
      lastTime.current = now
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
        
        <Atmosphere scrollVelocity={velocity} />
        
        {/* Project Stations Linked to 0.33 and 0.66 Thresholds */}
        <ProjectNode 
          id={1} 
          position={[-10, 0, -5]} 
          scroll={scroll} 
          threshold={0.33} 
        />
        
        <ProjectNode 
          id={2} 
          position={[10, 0, -10]} 
          scroll={scroll} 
          threshold={0.66} 
        />

        {/* The Intelligence Core (Hero Anchor) */}
        <ProjectNode 
          id={0} 
          position={[0, 0, 0]} 
          scroll={scroll} 
          threshold={0.0}
          geometry={<sphereGeometry args={[8, 32, 32]} />}
        />

        <CameraRig scroll={scroll} velocity={velocity} />
      </Canvas>
    </div>
  )
}
