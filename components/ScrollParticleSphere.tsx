"use client"

import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MotionValue } from 'framer-motion'
import * as THREE from 'three'

// Fibonacci sphere for uniform distribution
const generateSpherePoints = (count: number, radius: number) => {
  const positions = new Float32Array(count * 3)
  const goldenRatio = (1 + Math.sqrt(5)) / 2
  
  for (let i = 0; i < count; i++) {
    const theta = 2 * Math.PI * i / goldenRatio
    const phi = Math.acos(1 - 2 * (i + 0.5) / count)
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
  }
  
  return positions
}

// Random scatter positions
const generateScatterPoints = (count: number, spread: number) => {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread
  }
  return positions
}

interface ScrollParticleSphereProps {
  scroll: MotionValue<number>
}

export default function ScrollParticleSphere({ scroll }: ScrollParticleSphereProps) {
  const pointsRef = useRef<THREE.Points>(null!)
  const { clock } = useThree()
  
  const particleCount = 800
  
  const spherePositions = useMemo(() => 
    generateSpherePoints(particleCount, 10), []
  )
  
  const scatterPositions = useMemo(() => 
    generateScatterPoints(particleCount, 40), []
  )

  const currentPositions = useMemo(() => 
    new Float32Array(spherePositions), []
  )

  useFrame(() => {
    const scrollProgress = scroll.get()
    
    // Smooth easing function
    const easedProgress = scrollProgress < 0.5
      ? 4 * scrollProgress * scrollProgress * scrollProgress
      : 1 - Math.pow(-2 * scrollProgress + 2, 3) / 2
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Interpolate between sphere and scatter
      const sphereX = spherePositions[i3]
      const sphereY = spherePositions[i3 + 1]
      const sphereZ = spherePositions[i3 + 2]
      
      const scatterX = scatterPositions[i3]
      const scatterY = scatterPositions[i3 + 1]
      const scatterZ = scatterPositions[i3 + 2]
      
      positions[i3] = sphereX + (scatterX - sphereX) * easedProgress
      positions[i3 + 1] = sphereY + (scatterY - sphereY) * easedProgress
      positions[i3 + 2] = sphereZ + (scatterZ - sphereZ) * easedProgress
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    
    // Rotate the whole system
    pointsRef.current.rotation.y = clock.elapsedTime * 0.1
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.2
    
    // Update opacity based on scroll
    if (pointsRef.current.material instanceof THREE.PointsMaterial) {
      pointsRef.current.material.opacity = 0.9 - easedProgress * 0.4
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particleCount} 
          array={currentPositions} 
          itemSize={3} 
          args={[currentPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.4} 
        color="#ffffff" 
        transparent 
        opacity={0.9} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
