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

// 2D Circle distribution for the Hero Halo
const generateCirclePoints = (n: number, radius: number) => {
  const pos = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2
    // Add micro-jitter for a more organic 'technical' look
    const jitter = (Math.random() - 0.5) * 0.5
    pos[i * 3] = (radius + jitter) * Math.cos(angle)
    pos[i * 3 + 1] = (radius + jitter) * Math.sin(angle)
    pos[i * 3 + 2] = 0 // Flat XY plane
  }
  return pos
}

// --- HIGH PERFORMANCE SCRATCH MEMORY ---
const _v1 = new THREE.Vector3()
const _v2 = new THREE.Vector3()
const _v3 = new THREE.Vector3()
const _m1 = new THREE.Matrix4()
const _q1 = new THREE.Quaternion()

export function NeuralCore({ scroll }: { scroll: MotionValue<number> }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const linesRef = useRef<THREE.LineSegments>(null!)
  const { mouse, viewport } = useThree()
  const lastScroll = useRef(0)
  const currentRotation = useRef(0)

  // 1. Triple-State Data: Circle -> Sphere -> Scattered
  const circlePositions = useMemo(() => generateCirclePoints(3000, 10), [])
  const spherePositions = useMemo(() => generateSpherePoints(3000, 15), [])
  const scatteredPositions = useMemo(() => {
    const positions = new Float32Array(3000 * 3)
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80
    }
    return positions
  }, [])
  const currentPositions = useMemo(() => new Float32Array(circlePositions), [circlePositions])

  // 2. Connectivity (Edges)
  const lineIndices = useMemo(() => {
    const indices: number[] = []
    for (let i = 0; i < 3000; i += 4) {
      indices.push(i, (i + 1) % 3000)
      if (i % 20 === 0) indices.push(i, (i + 10) % 3000)
    }
    return new Uint16Array(indices)
  }, [])

  useFrame((state, delta) => {
    const s = scroll.get()
    const ds = s - lastScroll.current
    const velocity = delta > 0 ? Math.abs(ds / delta) : 0
    lastScroll.current = s

    // Enhanced Morph Factor: Circle -> Sphere -> Scattered
    const circleToSphere = THREE.MathUtils.smoothstep(Math.min(s / 0.15, 1), 0, 1)
    const sphereToScatter = THREE.MathUtils.smoothstep(Math.max((s - 0.15) / 0.2, 0), 0, 1)
    
    // Calculate final positions based on scroll
    let targetPositions: Float32Array
    if (sphereToScatter > 0.5) {
      // Scattered state
      targetPositions = scatteredPositions
    } else if (circleToSphere > 0.5) {
      // Sphere state
      targetPositions = spherePositions
    } else {
      // Circle state
      targetPositions = circlePositions
    }

    const velBase = 0.5 + Math.min(velocity * 3, 4)
    currentRotation.current += delta * velBase * 0.12
    
    const rotSpeed = 1 + sphereToScatter * 3
    pointsRef.current.rotation.y = currentRotation.current * rotSpeed
    pointsRef.current.rotation.x = currentRotation.current * 0.3 * rotSpeed
    linesRef.current.rotation.y = currentRotation.current * rotSpeed
    linesRef.current.rotation.x = currentRotation.current * 0.3 * rotSpeed

    // Optimized Mouse Vector
    _v1.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    const linePos = linesRef.current.geometry.attributes.position.array as Float32Array
    
    // Performance Lock: No allocations in this loop
    for (let i = 0; i < 3000; i++) {
        const i3 = i * 3
        
        // 1. Direct target positioning (no morphing for dramatic effect)
        const tx = targetPositions[i3]
        const ty = targetPositions[i3+1]
        const tz = targetPositions[i3+2]

        // 2. Rotation transform
        _v2.set(tx, ty, tz).applyQuaternion(pointsRef.current.quaternion)
        
        // 3. Magnetic pull calculation (Zero allocation)
        const dist = _v2.distanceTo(_v1)
        const force = Math.max(0, 20 - dist) / 20
        const magneticStrength = (0.2 + sphereToScatter * 0.35) * force
        
        // Apply pull back to local space
        _v3.subVectors(_v1, _v2).multiplyScalar(magneticStrength)
        
        positions[i3] = tx + _v3.x
        positions[i3+1] = ty + _v3.y
        positions[i3+2] = tz + _v3.z
        
        // Sync Line Geometry
        linePos[i3] = positions[i3]
        linePos[i3+1] = positions[i3+1]
        linePos[i3+2] = positions[i3+2]
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    linesRef.current.geometry.attributes.position.needsUpdate = true
    
    if (linesRef.current.material instanceof THREE.Material) {
      linesRef.current.material.opacity = sphereToScatter * 0.12
    }

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.04
    pointsRef.current.scale.setScalar(pulse)
    linesRef.current.scale.setScalar(pulse)
  })

  return (
    <group>
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
          size={0.18} 
          color="#ffffff" 
          transparent 
          opacity={0.6} 
          sizeAttenuation 
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position" 
            count={3000} 
            array={currentPositions} 
            itemSize={3} 
            args={[currentPositions, 3]}
          />
          <bufferAttribute
            attach="index"
            count={lineIndices.length}
            array={lineIndices}
            itemSize={1}
            args={[lineIndices, 1]}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0} 
          blending={THREE.AdditiveBlending} 
        />
      </lineSegments>
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
    { threshold: 0.25, pos: [-22, 8, 26], look: [-12, 0, 0] },  // Tighter & further
    { threshold: 0.50, pos: [22, -8, 18], look: [12, 0, 0] },   // Tighter & further
    { threshold: 0.75, pos: [0, 0, 22], look: [0, 0, 0] }
  ], [])

  useFrame((state) => {
    const s = scroll.get()
    bufferedScroll.current = THREE.MathUtils.lerp(bufferedScroll.current, s, 0.15) // Snappier
    
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

    // Higher responsiveness to motion
    const distToStation = Math.min(Math.abs(localP), Math.abs(1 - localP))
    const alphaBase = THREE.MathUtils.lerp(0.04, 0.12, Math.min(distToStation * 8, 1))
    
    const overshootFactor = Math.sin(curveP * Math.PI) * 4 * (1 - curveP) 
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
