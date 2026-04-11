"use client"

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function SceneController() {
  const { camera, size } = useThree()
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = winScroll / height
      setScroll(scrolled)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  useFrame(() => {
    const isMobile = size.width < 768
    const zBase = isMobile ? 45 : 25 

    const targetZ = THREE.MathUtils.lerp(zBase + 5, zBase - 5, scroll)
    const targetY = THREE.MathUtils.lerp(0, 10, scroll)
    
    camera.position.lerp(new THREE.Vector3(0, targetY, targetZ), 0.1)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function NeuralJourney() {
  const points = useRef<THREE.Points>(null!)
  const mesh = useRef<THREE.Mesh>(null!)
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = winScroll / height
      setScroll(scrolled)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  const count = 10000
  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const init = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 120
      const y = (Math.random() - 0.5) * 120
      const z = (Math.random() - 0.5) * 120
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      init[i * 3] = x
      init[i * 3 + 1] = y
      init[i * 3 + 2] = z
    }
    return [pos, init]
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (points.current) {
      const posAttr = points.current.geometry.attributes.position
      
      for (let i = 0; i < count; i++) {
        const idx = i * 3
        
        // Sphere Shape
        const phi = Math.acos(-1 + (2 * i) / count)
        const theta = Math.sqrt(count * Math.PI) * phi
        const tx = 12 * Math.cos(theta) * Math.sin(phi)
        const ty = 12 * Math.sin(theta) * Math.sin(phi)
        const tz = 12 * Math.cos(phi)

        // Explosion Shape
        const dx = initialPositions[idx]
        const dy = initialPositions[idx+1]
        const dz = initialPositions[idx+2]

        let targetX, targetY, targetZ
        if (scroll < 0.5) {
          const t = scroll * 2
          targetX = THREE.MathUtils.lerp(tx, dx, t)
          targetY = THREE.MathUtils.lerp(ty, dy, t)
          targetZ = THREE.MathUtils.lerp(tz, dz, t)
        } else {
          const t = (scroll - 0.5) * 2
          const sx = (i / count - 0.5) * 100
          const sy = Math.sin(i * 0.05 + time * 2) * 10
          const sz = Math.cos(i * 0.05 + time * 2) * 10
          targetX = THREE.MathUtils.lerp(dx, sx, t)
          targetY = THREE.MathUtils.lerp(dy, sy, t)
          targetZ = THREE.MathUtils.lerp(dz, sz, t)
        }

        posAttr.array[idx] = THREE.MathUtils.lerp(posAttr.array[idx], targetX, 0.1)
        posAttr.array[idx+1] = THREE.MathUtils.lerp(posAttr.array[idx+1], targetY, 0.1)
        posAttr.array[idx+2] = THREE.MathUtils.lerp(posAttr.array[idx+2], targetZ, 0.1)
      }
      
      posAttr.needsUpdate = true
      points.current.rotation.y += 0.001
    }

    if (mesh.current) {
      const s = Math.max(0, 1 - scroll * 4)
      mesh.current.scale.setScalar(s)
      mesh.current.rotation.x += 0.015
      mesh.current.rotation.y += 0.02
    }
  })

  return (
    <>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.15} color="#6366f1" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </points>

      <mesh ref={mesh}>
        <icosahedronGeometry args={[12, 4]} />
        <MeshDistortMaterial color="#6366f1" speed={5} distort={0.5} opacity={0.5} transparent wireframe />
      </mesh>
    </>
  )
}

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#000000] overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={1} />
        <pointLight position={[20, 20, 20]} intensity={5} color="#6366f1" />
        <pointLight position={[-20, -20, -20]} intensity={4} color="#f472b6" />
        <SceneController />
        <NeuralJourney />
      </Canvas>
    </div>
  )
}
