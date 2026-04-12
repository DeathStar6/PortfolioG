"use client"

import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MotionValue } from 'framer-motion'
import * as THREE from 'three'

// Generate sphere positions for particles
const generateSpherePositions = (count: number, radius: number) => {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
  }
  return positions
}

// Generate scattered positions for particles
const generateScatteredPositions = (count: number, spread: number) => {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread
  }
  return positions
}

interface ParticleSphereProps {
  scroll: MotionValue<number>
}

export default function ParticleSphere({ scroll }: ParticleSphereProps) {
  const pointsRef = useRef<THREE.Points>(null!)
  const { mouse, viewport } = useThree()
  const lastScroll = useRef(0)
  const currentRotation = useRef(0)
  
  // Alternative scroll tracking using window scroll
  const [windowScroll, setWindowScroll] = React.useState(0)
  
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollY / maxScroll
      setWindowScroll(scrollPercent)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Generate particle positions
  const particleCount = 2500
  const sphereRadius = 12
  const scatterSpread = 60

  const spherePositions = useMemo(() => 
    generateSpherePositions(particleCount, sphereRadius), []
  )
  
  const scatteredPositions = useMemo(() => 
    generateScatteredPositions(particleCount, scatterSpread), []
  )

  // Current positions buffer
  const currentPositions = useMemo(() => 
    new Float32Array(spherePositions), [spherePositions]
  )

  // Particle sizes for variation
  const sizes = useMemo(() => {
    const sizeArray = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      sizeArray[i] = Math.random() * 0.5 + 0.3
    }
    return sizeArray
  }, [])

  useFrame((state, delta) => {
    const s = scroll.get()
    const ds = s - lastScroll.current
    const velocity = delta > 0 ? Math.abs(ds / delta) : 0
    lastScroll.current = s

    // Use window scroll as fallback if framer scroll isn't working
    const effectiveScroll = Math.max(s, windowScroll)
    
    // Debug: Log scroll values to see what's happening
    if (state.clock.elapsedTime % 1 < 0.016) { // Log once per second
      console.log('Framer scroll:', s, 'Window scroll:', windowScroll, 'Effective:', effectiveScroll)
    }

    // Use a much more sensitive scroll calculation
    const morphFactor = Math.min(effectiveScroll * 2, 1) // More sensitive
    
    // Debug: Force some animation to test the system
    const testAnimation = (Math.sin(state.clock.elapsedTime * 0.2) + 1) * 0.1
    const finalMorphFactor = Math.max(morphFactor, testAnimation)
    
    // Rotation animation
    const rotSpeed = 0.5 + velocity * 0.2
    currentRotation.current += delta * rotSpeed * 0.1
    
    pointsRef.current.rotation.y = currentRotation.current
    pointsRef.current.rotation.x = currentRotation.current * 0.3

    // Mouse interaction
    const mouseVector = new THREE.Vector3(
      (mouse.x * viewport.width) / 4,
      (mouse.y * viewport.height) / 4,
      0
    )

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    
    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Morph between sphere and scattered positions
      const targetX = spherePositions[i3] + (scatteredPositions[i3] - spherePositions[i3]) * finalMorphFactor
      const targetY = spherePositions[i3 + 1] + (scatteredPositions[i3 + 1] - spherePositions[i3 + 1]) * finalMorphFactor
      const targetZ = spherePositions[i3 + 2] + (scatteredPositions[i3 + 2] - spherePositions[i3 + 2]) * finalMorphFactor

      // Apply rotation
      const rotatedPos = new THREE.Vector3(targetX, targetY, targetZ)
      rotatedPos.applyQuaternion(pointsRef.current.quaternion)
      
      // Mouse interaction - particles react to cursor
      const distance = rotatedPos.distanceTo(mouseVector)
      const influence = Math.max(0, 15 - distance) / 15
      const mouseStrength = influence * 0.15 * (1 - finalMorphFactor) // Less influence when scattered
      
      const mouseOffset = new THREE.Vector3().subVectors(mouseVector, rotatedPos).multiplyScalar(mouseStrength)
      
      positions[i3] = targetX + mouseOffset.x
      positions[i3 + 1] = targetY + mouseOffset.y
      positions[i3 + 2] = targetZ + mouseOffset.z
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // Update opacity and color based on scroll state
    if (pointsRef.current.material instanceof THREE.PointsMaterial) {
      pointsRef.current.material.opacity = 0.4 + (1 - finalMorphFactor) * 0.3
      // Change color based on morph factor for visual feedback
      const color = new THREE.Color().lerpColors(
        new THREE.Color(0x6366f1), // Blue when scattered
        new THREE.Color(0xffffff), // White when in sphere
        1 - finalMorphFactor
      )
      pointsRef.current.material.color = color
    }

    // Add subtle pulsing effect
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02
    pointsRef.current.scale.setScalar(pulse)
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
        <bufferAttribute 
          attach="attributes-size" 
          count={particleCount} 
          array={sizes} 
          itemSize={1} 
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.25} 
        color="#ffffff" 
        transparent 
        opacity={0.7} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
