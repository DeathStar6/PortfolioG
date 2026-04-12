"use client"

import { MotionValue } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { NeuralCore, CameraRig, ProjectNode } from './SceneComponents'

interface BackgroundSceneProps {
  scroll: MotionValue<number>
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
        <pointLight position={[20, 20, 20]} intensity={10} color="#ffffff" />
        <pointLight position={[-20, -20, -20]} intensity={5} color="#ffffff" />
        
        <NeuralCore scroll={scroll} />
        
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

        <ProjectNode 
          id={0} 
          position={[0, 0, 0]} 
          scroll={scroll} 
          threshold={0.0}
          geometry={<sphereGeometry args={[8, 32, 32]} />}
        />

        <CameraRig scroll={scroll} />
      </Canvas>
    </div>
  )
}
