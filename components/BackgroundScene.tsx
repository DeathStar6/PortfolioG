"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 800 }) {
  const points = useRef<THREE.Points>(null!)
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 50
      temp[i * 3 + 1] = (Math.random() - 0.5) * 50
      temp[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return temp
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.05
    points.current.rotation.x = time * 0.2
    points.current.rotation.y = time * 0.3
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#a1a1aa"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  )
}

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#030303]">
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <Particles />
      </Canvas>
    </div>
  )
}
