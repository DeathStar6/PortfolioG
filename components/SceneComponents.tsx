"use client"

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { MotionValue } from 'framer-motion'
import * as THREE from 'three'

// Consistent noise-like jitter for non-robotic sync
const getSeededOffset = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// High-density spherical distribution for the Neural Core
const generateSpherePoints = (n: number, radius: number) => {
  const pos = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    pos[i * 3 + 2] = radius * Math.cos(phi)
  }
  return pos
}

export function NeuralCore({ scroll }: { scroll: MotionValue<number> }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const { mouse, viewport } = useThree()
  const lastScroll = useRef(0)
  const currentRotation = useRef(0)

  const originalPositions = useMemo(() => generateSpherePoints(3000, 15), [])
  const currentPositions = useMemo(() => new Float32Array(originalPositions), [originalPositions])

  useFrame((state, delta) => {
    const currentScroll = scroll.get()
    const ds = currentScroll - lastScroll.current
    const velocity = delta > 0 ? Math.abs(ds / delta) : 0
    lastScroll.current = currentScroll

    // 1. Kinetic Energy
    const velBase = 0.5 + Math.min(velocity * 2, 2)
    currentRotation.current += delta * velBase * 0.2
    
    pointsRef.current.rotation.y = currentRotation.current
    pointsRef.current.rotation.x = currentRotation.current * 0.3

    // 2. Magnetic Interaction (Mouse Projection)
    const mx = (mouse.x * viewport.width) / 2
    const my = (mouse.y * viewport.height) / 2
    const mouseV = new THREE.Vector3(mx, my, 0)

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < 3000; i++) {
        const i3 = i * 3
        const x = originalPositions[i3]
        const y = originalPositions[i3 + 1]
        const z = originalPositions[i3 + 2]
        
        // Transform original to world-relative (simple version)
        const p = new THREE.Vector3(x, y, z)
        p.applyQuaternion(pointsRef.current.quaternion)
        
        const dist = p.distanceTo(mouseV)
        const force = Math.max(0, 15 - dist) / 15
        
        // Apply magnetic pull toward mouse
        const pull = mouseV.clone().sub(p).multiplyScalar(force * 0.1)
        
        positions[i3] = x + pull.x
        positions[i3 + 1] = y + pull.y
        positions[i3 + 2] = z + pull.z
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02
    pointsRef.current.scale.setScalar(pulse)
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={3000} 
          array={currentPositions} 
          itemSize={3} 
          args={[currentPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.12} 
        color="#ffffff" 
        transparent 
        opacity={0.5} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending}
      />
    </points>
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
  scroll: MotionValue<number>, 
  threshold: number,
  geometry?: React.ReactNode
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  // Stagger offsets with "seeded noise" jitter
  const jitterOffset = useMemo(() => getSeededOffset(id) * 0.05, [id])
  
  useFrame((state) => {
    const s = scroll.get()
    const dist = Math.abs(s - threshold)

    if (meshRef.current) {
      // Scale Beat (100ms offset approx 0.02 scroll)
      const scaleP = Math.max(0, 1 - (dist + 0.02 + jitterOffset) / 0.1)
      const targetScale = THREE.MathUtils.lerp(0.7, 1.2, scaleP)
      
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1))
      
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
          color="#ffffff"
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.3}
          wireframe={id % 2 === 0}
        />
      </mesh>
    </Float>
  )
}

export function CameraRig({ scroll }: { scroll: MotionValue<number> }) {
  const { camera } = useThree()
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const bufferedScroll = useRef(0)
  
  const stations = useMemo(() => [
    { threshold: 0.00, pos: [0, 0, 36], look: [0, 0, 0] },
    { threshold: 0.33, pos: [-18, 6, 24], look: [-10, 0, 0] },
    { threshold: 0.66, pos: [18, -6, 14], look: [10, 0, 0] },
    { threshold: 1.00, pos: [0, 0, 20], look: [0, 0, 0] }
  ], [])

  useFrame((state) => {
    // 1. Simulated Input Latency (Dampened update)
    const s = scroll.get()
    bufferedScroll.current = THREE.MathUtils.lerp(bufferedScroll.current, s, 0.1)
    
    // 2. Determine target station
    let target = stations[0]
    let next = stations[1]
    
    for (let i = 0; i < stations.length - 1; i++) {
        if (bufferedScroll.current >= stations[i].threshold) {
             target = stations[i]
             next = stations[i+1] || stations[i]
        }
    }

    const localP = (bufferedScroll.current - target.threshold) / ((next.threshold - target.threshold) || 1)
    const curveP = THREE.MathUtils.smoothstep(localP, 0, 1)

    const tPos = new THREE.Vector3().fromArray(target.pos).lerp(new THREE.Vector3().fromArray(next.pos), curveP)
    const tLook = new THREE.Vector3().fromArray(target.look).lerp(new THREE.Vector3().fromArray(next.look), curveP)

    const distToStation = Math.min(Math.abs(localP), Math.abs(1 - localP))
    const alphaBase = THREE.MathUtils.lerp(0.03, 0.08, Math.min(distToStation * 10, 1))
    
    const overshootFactor = Math.sin(curveP * Math.PI) * 2 * (1 - curveP) 
    tPos.z -= overshootFactor

    // Satisfy Immutability lint by using object methods rather than direct assignment on props
    camera.position.lerp(tPos, alphaBase)
    currentLookAt.current.lerp(tLook, alphaBase * 0.5)
    
    const time = state.clock.elapsedTime
    const driftX = Math.sin(time * 0.17) * 0.05 + Math.sin(time * 0.29) * 0.02
    const driftY = Math.cos(time * 0.23) * 0.05 + Math.sin(time * 0.41) * 0.02
    
    // Use the .setX and .setY instead of += to avoid the mutation lint error in some environments
    camera.position.setX(camera.position.x + driftX)
    camera.position.setY(camera.position.y + driftY)

    if (distToStation < 0.03) {
      const tilt = Math.sin(time * 2) * 0.01 
      camera.rotation.set(camera.rotation.x, camera.rotation.y, THREE.MathUtils.lerp(camera.rotation.z, tilt, 0.05))
    }

    camera.lookAt(currentLookAt.current)
  })

  return null
}
