"use client"

import { useState } from 'react'
import { MotionValue } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { CameraRig, ProjectNode } from './SceneComponents'
import SimpleWorkingParticles from './SimpleWorkingParticles'

interface BackgroundSceneProps {
  scroll: MotionValue<number>
}

// CSS-only fallback: visible even without WebGL
function CSSFallback() {
  return (
    <div className="absolute inset-0" style={{
      background: `
        radial-gradient(ellipse 80% 60% at 50% -10%, oklch(18% 0.015 265) 0%, transparent 70%),
        radial-gradient(ellipse 40% 40% at 20% 80%, oklch(14% 0.01 265) 0%, transparent 60%)
      `
    }} />
  )
}

export default function BackgroundScene({ scroll }: BackgroundSceneProps) {
  const [webglFailed, setWebglFailed] = useState(false)

  if (!scroll) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* CSS fallback — always visible, gives depth even if WebGL is absent */}
      <CSSFallback />

      {/* Noise texture overlay for surface texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* WebGL canvas — hidden if it errors */}
      {!webglFailed && (
        <Canvas
          camera={{ position: [0, 0, 30], fov: 75 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
          onCreated={({ gl }) => {
            // If context is lost after creation, fall back to CSS
            gl.domElement.addEventListener('webglcontextlost', () => {
              setWebglFailed(true)
            })
          }}
        >
          <ambientLight intensity={1.0} />
          <pointLight position={[20, 20, 20]} intensity={10} color="#ffffff" />
          <pointLight position={[-20, -20, -20]} intensity={5} color="#ffffff" />

          <SimpleWorkingParticles scroll={scroll} />

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
      )}
    </div>
  )
}
