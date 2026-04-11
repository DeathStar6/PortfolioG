"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { MotionValue } from 'framer-motion'

function SceneController({ progress }: { progress: MotionValue<number> }) {
  const { camera, viewport } = useThree()
  
  useFrame(() => {
    const p = progress.get()
    const isMobile = viewport.width < 15
    const zBase = isMobile ? 35 : 25 

    let targetPos = new THREE.Vector3(0, 0, zBase)

    if (p < 0.25) {
      // Scene 0: Hero - Front & Center
      targetPos.set(0, 0, zBase + 10)
    } else if (p < 0.5) {
      // Scene 1: About - High Angle looking down
      targetPos.set(0, 8, zBase)
    } else if (p < 0.75) {
      // Scene 2: Projects - Pulled Back for wide network
      targetPos.set(0, -5, zBase + 20)
    } else {
      // Scene 3: Contact - Focused Core Close-up
      targetPos.set(0, 0, zBase - 10)
    }
    
    camera.position.lerp(targetPos, 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function NeuralJourney({ progress }: { progress: MotionValue<number> }) {
  const points = useRef<THREE.Points>(null!)
  const mesh = useRef<THREE.Mesh>(null!)
  
  const count = 12000
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
    const p = progress.get()
    const time = state.clock.getElapsedTime()
    
    if (points.current) {
      const posAttr = points.current.geometry.attributes.position
      
      for (let i = 0; i < count; i++) {
        const idx = i * 3
        
        // Singularity (Sphere)
        const phi = Math.acos(-1 + (2 * i) / count)
        const theta = Math.sqrt(count * Math.PI) * phi
        const tx = 11 * Math.cos(theta) * Math.sin(phi)
        const ty = 11 * Math.sin(theta) * Math.sin(phi)
        const tz = 11 * Math.cos(phi)

        // Dispersion
        const dx = initialPositions[idx]
        const dy = initialPositions[idx+1]
        const dz = initialPositions[idx+2]

        // Stream
        const sx = (i / count - 0.5) * 70
        const sy = Math.sin(i * 0.03 + time) * 6
        const sz = Math.cos(i * 0.03 + time) * 6

        let targetX, targetY, targetZ

        if (p < 0.3) {
          targetX = tx; targetY = ty; targetZ = tz
        } else if (p < 0.6) {
          const t = (p - 0.3) / 0.3
          targetX = THREE.MathUtils.lerp(tx, dx, t)
          targetY = THREE.MathUtils.lerp(ty, dy, t)
          targetZ = THREE.MathUtils.lerp(tz, dz, t)
        } else {
          const t = (p - 0.6) / 0.4
          targetX = THREE.MathUtils.lerp(dx, sx, t)
          targetY = THREE.MathUtils.lerp(dy, sy, t)
          targetZ = THREE.MathUtils.lerp(dz, sz, t)
        }

        posAttr.array[idx] = THREE.MathUtils.lerp(posAttr.array[idx], targetX, 0.08)
        posAttr.array[idx+1] = THREE.MathUtils.lerp(posAttr.array[idx+1], targetY, 0.08)
        posAttr.array[idx+2] = THREE.MathUtils.lerp(posAttr.array[idx+2], targetZ, 0.08)
      }
      
      posAttr.needsUpdate = true
      points.current.rotation.y += 0.0008
    }

    if (mesh.current) {
      const visibility = p < 0.35 ? 1 : 0
      mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, visibility, 0.08))
      mesh.current.rotation.x += 0.015
      mesh.current.rotation.y += 0.02
    }
  })

  return (
    <>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#818cf8"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh ref={mesh}>
        <icosahedronGeometry args={[11, 2]} />
        <MeshDistortMaterial
          color="#6366f1"
          speed={4}
          distort={0.4}
          radius={1}
          metalness={1}
          roughness={0}
          opacity={0.4}
          transparent
          wireframe
        />
      </mesh>
    </>
  )
}

export default function BackgroundScene({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="fixed inset-0 -z-10 bg-[#000000] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[20, 20, 20]} intensity={3} color="#6366f1" />
        <pointLight position={[-20, -20, -20]} intensity={2} color="#f472b6" />
        
        <SceneController progress={progress} />
        <NeuralJourney progress={progress} />
      </Canvas>
    </div>
  )
}
