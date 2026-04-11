"use client"

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Text } from '@react-three/drei'
import * as THREE from 'three'

// Consistent noise-like jitter for non-robotic sync
const getSeededOffset = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export function Atmosphere({ scrollVelocity }: { scrollVelocity: number }) {
  const count = 1200 // Total particles
  const pointsBack = useRef<THREE.Points>(null!)
  const pointsMid = useRef<THREE.Points>(null!)
  const pointsFront = useRef<THREE.Points>(null!)

  const generatePositions = (n: number, range: number) => {
    const pos = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      // Cluster toward center
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = range * Math.pow(Math.random(), 0.7) 
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }

  const [pBack, pMid, pFront] = useMemo(() => [
    generatePositions(600, 150),
    generatePositions(400, 100),
    generatePositions(200, 50)
  ], [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const velFactor = 1 + Math.min(scrollVelocity * 0.15, 0.15) // Clamped drift scaling

    pointsBack.current.rotation.y = time * 0.02 * velFactor
    pointsMid.current.rotation.y = time * 0.04 * velFactor
    pointsFront.current.rotation.y = time * 0.06 * velFactor
    
    // Slow drift
    pointsBack.current.position.z = Math.sin(time * 0.1) * 2
    pointsMid.current.position.z = Math.cos(time * 0.15) * 3
  })

  return (
    <group>
      <points ref={pointsBack}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={600} array={pBack} itemSize={3} args={[pBack, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.12} color="#4f46e5" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </points>
      <points ref={pointsMid}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={400} array={pMid} itemSize={3} args={[pMid, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.18} color="#6366f1" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </points>
      <points ref={pointsFront}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={200} array={pFront} itemSize={3} args={[pFront, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.25} color="#818cf8" transparent opacity={0.7} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  )
}

export function ProjectNode({ 
  position, 
  id, 
  scroll, 
  threshold,
  geometry = <icosahedronGeometry args={[6, 1]} /> 
}: { 
  position: [number, number, number], 
  id: number, 
  scroll: number, 
  threshold: number,
  geometry?: React.ReactNode
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [active, setActive] = useState(false)
  
  // Stagger offsets with "seeded noise" jitter
  const jitterOffset = useMemo(() => getSeededOffset(id) * 0.05, [id])
  
  useFrame((state) => {
    // Proximity check for Adaptive Throttling (logic would be more complex for full throttle, 
    // but we'll optimize update complexity here)
    const dist = Math.abs(scroll - threshold)
    const isInFocusRange = dist < 0.15
    
    if (dist < 0.08 && !active) setActive(true)
    if (dist > 0.15 && active) setActive(false)

    if (meshRef.current) {
      // 1. Glow Beat (immediate)
      const glowP = Math.max(0, 1 - dist / 0.1)
      
      // 2. Scale Beat (100ms offset approx 0.02 scroll)
      const scaleP = Math.max(0, 1 - (dist + 0.02 + jitterOffset) / 0.1)
      const targetScale = THREE.MathUtils.lerp(0.7, 1.2, scaleP)
      
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1))
      
      // 3. Ambient Breathing
      const breath = 1 + Math.sin(state.clock.elapsedTime * 0.5 + id) * 0.02
      meshRef.current.scale.multiplyScalar(breath)
      
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <MeshDistortMaterial
          color="#6366f1"
          speed={3}
          distort={0.3}
          radius={1}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.6}
          wireframe={id % 2 === 0}
        />
      </mesh>
    </Float>
  )
}

export function CameraRig({ scroll, velocity }: { scroll: number, velocity: number }) {
  const { camera, size } = useThree()
  const currentTarget = useRef(new THREE.Vector3(0, 0, 40))
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))
  
  // Internal buffer for 30-50ms latency simulation
  const bufferedScroll = useRef(0)
  
  const stations = useMemo(() => [
    { threshold: 0.00, pos: [0, 0, 36], look: [0, 0, 0] },
    { threshold: 0.33, pos: [-18, 6, 24], look: [-10, 0, 0] },
    { threshold: 0.66, pos: [18, -6, 14], look: [10, 0, 0] },
    { threshold: 1.00, pos: [0, 0, 20], look: [0, 0, 0] }
  ], [])

  useFrame((state) => {
    // 1. Simulated Input Latency (Dampened update)
    bufferedScroll.current = THREE.MathUtils.lerp(bufferedScroll.current, scroll, 0.1)
    
    // 2. Determine target station and "Lead Bias"
    let target = stations[0]
    let next = stations[1]
    
    for (let i = 0; i < stations.length - 1; i++) {
        if (bufferedScroll.current >= stations[i].threshold) {
             target = stations[i]
             next = stations[i+1] || stations[i]
        }
    }

    const localP = (bufferedScroll.current - target.threshold) / ((next.threshold - target.threshold) || 1)
    
    // S-Curve (Non-linear blending)
    const curveP = THREE.MathUtils.smoothstep(localP, 0, 1)

    // Interpolate Positions
    const tPos = new THREE.Vector3().fromArray(target.pos).lerp(new THREE.Vector3().fromArray(next.pos), curveP)
    const tLook = new THREE.Vector3().fromArray(target.look).lerp(new THREE.Vector3().fromArray(next.look), curveP)

    // 3. Critically Damped Journey Approach
    // Distance-aware alpha (faster far, floor near)
    const distToStation = Math.min(Math.abs(localP), Math.abs(1 - localP))
    const alphaBase = THREE.MathUtils.lerp(0.03, 0.08, Math.min(distToStation * 10, 1))
    
    // Overshoot settle logic (One overshoot settle)
    const overshootFactor = Math.sin(curveP * Math.PI) * 2 * (1 - curveP) 
    tPos.z -= overshootFactor // Subtle depth overshoot

    camera.position.lerp(tPos, alphaBase)
    currentLookAt.current.lerp(tLook, alphaBase * 0.5) // Slower lookAt lead bias
    
    // 4. Multi-Axis Idle Drift
    const time = state.clock.elapsedTime
    const driftX = Math.sin(time * 0.17) * 0.05 + Math.sin(time * 0.29) * 0.02
    const driftY = Math.cos(time * 0.23) * 0.05 + Math.sin(time * 0.41) * 0.02
    camera.position.x += driftX
    camera.position.y += driftY

    // 5. Arrival Tilt (1-2 degrees near stations)
    if (distToStation < 0.03) {
      const tilt = Math.sin(time * 2) * 0.01 // ~0.6 degrees 
      camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, tilt, 0.05)
    }

    camera.lookAt(currentLookAt.current)
  })

  return null
}
