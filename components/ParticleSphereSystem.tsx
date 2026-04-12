"use client"

import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MotionValue } from 'framer-motion'
import * as THREE from 'three'

// Fibonacci sphere distribution for uniform particle placement
const generateFibonacciSphere = (count: number, radius: number) => {
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

// Organic scatter positions with directional bias
const generateScatterPositions = (count: number, spread: number) => {
  const positions = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    // Add directional bias - slight upward and outward tendency
    const angle1 = Math.random() * Math.PI * 2
    const angle2 = Math.random() * Math.PI
    
    const radius = spread * (0.5 + Math.random() * 0.5) // Variable spread
    const bias = 1.2 // Slight upward bias
    
    positions[i * 3] = radius * Math.sin(angle2) * Math.cos(angle1) * (1 + Math.random() * 0.3)
    positions[i * 3 + 1] = radius * Math.sin(angle2) * Math.sin(angle1) * bias
    positions[i * 3 + 2] = radius * Math.cos(angle2) * (0.8 + Math.random() * 0.4)
  }
  
  return positions
}

// Per-particle delay offsets for organic wave effect
const generateDelayOffsets = (count: number) => {
  const offsets = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    // Use noise-like pattern for delays
    offsets[i] = (Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1
  }
  return offsets
}

// Particle size variation for depth
const generateSizes = (count: number) => {
  const sizes = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    sizes[i] = 0.15 + Math.random() * 0.35 // Size variation
  }
  return sizes
}

interface ParticleSphereSystemProps {
  scroll: MotionValue<number>
}

export default function ParticleSphereSystem({ scroll }: ParticleSphereSystemProps) {
  const pointsRef = useRef<THREE.Points>(null!)
  const { mouse, viewport, clock } = useThree()
  const lastScroll = useRef(0)
  const scrollVelocity = useRef(0)
  const currentIdleOffset = useRef(0)

  // Responsive particle count
  const particleCount = useMemo(() => {
    return window.innerWidth < 768 ? 400 : 1000
  }, [])
  
  // Debug: Log when component mounts
  useEffect(() => {
    console.log('ParticleSphereSystem mounted with particle count:', particleCount)
  }, [particleCount])

  // Generate all particle data
  const spherePositions = useMemo(() => 
    generateFibonacciSphere(particleCount, 10), [particleCount]
  )
  
  const scatterPositions = useMemo(() => 
    generateScatterPositions(particleCount, 35), [particleCount]
  )

  const delayOffsets = useMemo(() => 
    generateDelayOffsets(particleCount), [particleCount]
  )

  const sizes = useMemo(() => 
    generateSizes(particleCount), [particleCount]
  )

  // Current positions buffer
  const currentPositions = useMemo(() => 
    new Float32Array(spherePositions), [spherePositions]
  )

  // Smooth scroll tracking with velocity
  useEffect(() => {
    const unsubscribe = scroll.on('change', (v) => {
      const delta = v - lastScroll.current
      scrollVelocity.current = Math.abs(delta)
      lastScroll.current = v
    })
    return unsubscribe
  }, [scroll])

  useFrame((state, delta) => {
    const scrollProgress = scroll.get()
    
    // Debug: Log scroll progress to verify it's working
    if (state.clock.elapsedTime % 2 < 0.016) {
      console.log('Scroll progress:', scrollProgress)
    }
    
    // Smooth velocity decay
    scrollVelocity.current *= 0.95
    
    // Idle motion offset
    currentIdleOffset.current += delta * 0.3

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    
    // Update each particle
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Test animation: Force some movement to verify particles are visible
      const testAnimation = Math.sin(state.clock.elapsedTime + i * 0.1) * 2
      
      // Individual particle delay for wave effect
      const delayOffset = delayOffsets[i]
      const delayedProgress = THREE.MathUtils.smoothstep(
        Math.max(0, scrollProgress - delayOffset * 0.1), 
        0, 1
      )
      
      // Apply easing (easeInOutCubic)
      const easedProgress = delayedProgress < 0.5
        ? 4 * delayedProgress * delayedProgress * delayedProgress
        : 1 - Math.pow(-2 * delayedProgress + 2, 3) / 2
      
      // Velocity influence (subtle reactivity)
      const velocityInfluence = Math.min(scrollVelocity.current * 0.5, 0.2)
      const finalProgress = Math.min(easedProgress + velocityInfluence, 1)
      
      // Interpolate between sphere and scatter positions
      const sphereX = spherePositions[i3]
      const sphereY = spherePositions[i3 + 1]
      const sphereZ = spherePositions[i3 + 2]
      
      const scatterX = scatterPositions[i3]
      const scatterY = scatterPositions[i3 + 1]
      const scatterZ = scatterPositions[i3 + 2]
      
      // Smooth lerp between positions
      let currentX = sphereX + (scatterX - sphereX) * finalProgress
      let currentY = sphereY + (scatterY - sphereY) * finalProgress
      let currentZ = sphereZ + (scatterZ - sphereZ) * finalProgress
      
      // Add subtle idle motion (more pronounced when in sphere form)
      const idleStrength = (1 - finalProgress) * 0.3
      const idleX = Math.sin(currentIdleOffset.current + i * 0.1) * idleStrength
      const idleY = Math.cos(currentIdleOffset.current + i * 0.15) * idleStrength
      const idleZ = Math.sin(currentIdleOffset.current * 0.7 + i * 0.2) * idleStrength * 0.5
      
      currentX += idleX + testAnimation
      currentY += idleY
      currentZ += idleZ
      
      // Subtle mouse interaction (stronger when scattered)
      const mouseInfluence = finalProgress * 0.1
      const mouseVector = new THREE.Vector3(
        (mouse.x * viewport.width) / 8,
        (mouse.y * viewport.height) / 8,
        0
      )
      
      const particleVector = new THREE.Vector3(currentX, currentY, currentZ)
      const distance = particleVector.distanceTo(mouseVector)
      const mouseForce = Math.max(0, 15 - distance) / 15
      
      const mouseOffset = new THREE.Vector3()
        .subVectors(mouseVector, particleVector)
        .multiplyScalar(mouseForce * mouseInfluence)
      
      positions[i3] = currentX + mouseOffset.x
      positions[i3 + 1] = currentY + mouseOffset.y
      positions[i3 + 2] = currentZ + mouseOffset.z
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    
    // Update material properties based on scroll
    if (pointsRef.current.material instanceof THREE.PointsMaterial) {
      // Opacity fade when scattering
      const baseOpacity = 0.8
      const scatterOpacity = 0.3
      pointsRef.current.material.opacity = baseOpacity + (scatterOpacity - baseOpacity) * scrollProgress
      
      // Subtle color shift
      const color = new THREE.Color()
      color.r = 1 - scrollProgress * 0.2
      color.g = 1 - scrollProgress * 0.1
      color.b = 1
      pointsRef.current.material.color = color
    }
    
    // Gentle rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1
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
        size={0.5} 
        color="#ffffff" 
        transparent 
        opacity={1} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
