"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, MeshWobbleMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function GenerativeCore() {
  const mesh = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    mesh.current.rotation.x = time * 0.1
    mesh.current.rotation.y = time * 0.15
    
    // Smoothly scale the core based on overall mouse/time influence
    const s = 1 + Math.sin(time * 0.5) * 0.1
    mesh.current.scale.set(s, s, s)
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[8, 30]} />
        <MeshDistortMaterial
          color="#6366f1"
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.9}
          roughness={0.1}
          opacity={0.15}
          transparent
          wireframe
        />
      </mesh>
      
      {/* Secondary Inner Core */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <icosahedronGeometry args={[6, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.05} transparent />
      </mesh>
    </Float>
  )
}

function BackdropParticles({ count = 200 }) {
  const points = useRef<THREE.Points>(null!)
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60
      sz[i] = Math.random() * 2
    }
    return [pos, sz]
  }, [count])

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.02
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#4f46e5" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#030303] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#f472b6" />
        
        <GenerativeCore />
        <BackdropParticles />
      </Canvas>
    </div>
  )
}
