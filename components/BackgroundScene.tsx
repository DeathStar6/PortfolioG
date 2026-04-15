"use client"

import { useState } from 'react'
import { MotionValue } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import ParticleMorphEngine from './ParticleMorphEngine'

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
    <div className="fixed inset-0 -z-0 overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* CSS fallback — always visible, gives depth even if WebGL is absent */}
      <CSSFallback />

      {/* WebGL canvas — Particle Morph Engine (Top layer of background) */}
      {!webglFailed && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ 
            width: '100%', 
            height: '100%', 
            position: 'absolute', 
            inset: 0,
            zIndex: 1 // Above the fallback, but still inside the fixed container which is at -z
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', () => {
              setWebglFailed(true)
            })
          }}
        >
          <ParticleMorphEngine scroll={scroll} />
        </Canvas>
      )}

      {/* CSS fallback — visible behind WebGL */}
      <CSSFallback />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  )
}
