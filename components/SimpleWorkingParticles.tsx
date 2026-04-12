"use client"

import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MotionValue } from 'framer-motion'
import * as THREE from 'three'

interface SimpleWorkingParticlesProps {
  scroll: MotionValue<number>
}

export default function SimpleWorkingParticles({ scroll }: SimpleWorkingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!)
  
  const particleCount = 200
  const radius = 8
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const y = (Math.random() - 0.5) * radius * 2
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }
    return pos
  }, [])

  useFrame((state) => {
    const scrollProgress = scroll.get()
    
    if (pointsRef.current) {
      // Simple rotation
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.2
      
      // Scatter based on scroll
      const scatterAmount = scrollProgress * 20
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const originalX = positions[i3]
        const originalZ = positions[i3 + 2]
        
        // Scatter outward when scrolling
        positions[i3] = originalX + (originalX / radius) * scatterAmount
        positions[i3 + 2] = originalZ + (originalZ / radius) * scatterAmount
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particleCount} 
          array={positions} 
          itemSize={3} 
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={1.0} 
        color="#ffffff" 
        transparent 
        opacity={1.0} 
        sizeAttenuation={false}
        blending={THREE.AdditiveBlending}
        depthWrite={true}
      />
    </points>
  )
}
