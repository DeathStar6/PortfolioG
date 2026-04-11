"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { MotionValue } from 'framer-motion'

function SceneController({ progress }: { progress: MotionValue<number> }) {
  const { camera } = useThree()
  
  useFrame(() => {
    const p = progress.get()
    
    // Scene Stations
    // 0.0 - 0.2: Hero [0,0,30]
    // 0.2 - 0.4: Philosophy [15,0,25]
    // 0.4 - 0.6: Experience [0,20,20]
    // 0.6 - 0.8: Projects [-15,0,35]
    // 0.8 - 1.0: Contact [0,0,15]

    let targetPos = new THREE.Vector3(0, 0, 30)

    if (p < 0.2) {
      targetPos.set(0, 0, 35)
    } else if (p < 0.4) {
      targetPos.set(20, 5, 25)
    } else if (p < 0.6) {
      targetPos.set(-15, 20, 20)
    } else if (p < 0.8) {
      targetPos.set(15, -10, 30)
    } else {
      targetPos.set(0, 0, 20)
    }
    
    camera.position.lerp(targetPos, 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function NeuralJourney({ progress }: { progress: MotionValue<number> }) {
  const points = useRef<THREE.Points>(null!)
  const mesh = useRef<THREE.Mesh>(null!)
  
  const count = 15000
  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const init = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100
      const y = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 100
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
        
        // Station 0: Singularity (Sphere)
        const phi = Math.acos(-1 + (2 * i) / count)
        const theta = Math.sqrt(count * Math.PI) * phi
        const tx = 10 * Math.cos(theta) * Math.sin(phi)
        const ty = 10 * Math.sin(theta) * Math.sin(phi)
        const tz = 10 * Math.cos(phi)

        // Station 1: Dispersion (Starfield)
        const dx = initialPositions[idx]
        const dy = initialPositions[idx+1]
        const dz = initialPositions[idx+2]

        // Station 2: Stream (Abstract River)
        const sx = (i / count - 0.5) * 80
        const sy = Math.sin(i * 0.02 + time) * 5
        const sz = Math.cos(i * 0.02 + time) * 5

        let targetX, targetY, targetZ

        if (p < 0.2) {
          targetX = tx; targetY = ty; targetZ = tz
        } else if (p < 0.4) {
          const t = (p - 0.2) / 0.2
          targetX = THREE.MathUtils.lerp(tx, dx, t)
          targetY = THREE.MathUtils.lerp(ty, dy, t)
          targetZ = THREE.MathUtils.lerp(tz, dz, t)
        } else if (p < 0.6) {
          const t = (p - 0.4) / 0.2
          targetX = THREE.MathUtils.lerp(dx, sx, t)
          targetY = THREE.MathUtils.lerp(dy, sy, t)
          targetZ = THREE.MathUtils.lerp(dz, sz, t)
        } else if (p < 0.8) {
          const t = (p - 0.6) / 0.2
          targetX = THREE.MathUtils.lerp(sx, dx * 0.5, t)
          targetY = THREE.MathUtils.lerp(sy, dy * 0.5, t)
          targetZ = THREE.MathUtils.lerp(sz, dz * 0.5, t)
        } else {
          const t = (p - 0.8) / 0.2
          targetX = THREE.MathUtils.lerp(dx * 0.5, tx * 0.3, t)
          targetY = THREE.MathUtils.lerp(dy * 0.5, ty * 0.3, t)
          targetZ = THREE.MathUtils.lerp(dz * 0.5, tz * 0.3, t)
        }

        posAttr.array[idx] = THREE.MathUtils.lerp(posAttr.array[idx], targetX, 0.05)
        posAttr.array[idx+1] = THREE.MathUtils.lerp(posAttr.array[idx+1], targetY, 0.05)
        posAttr.array[idx+2] = THREE.MathUtils.lerp(posAttr.array[idx+2], targetZ, 0.05)
      }
      
      posAttr.needsUpdate = true
      points.current.rotation.y += 0.0005
    }

    if (mesh.current) {
      const visibility = p < 0.2 ? 1 : 0
      mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, visibility, 0.1))
      mesh.current.rotation.x += 0.01
      mesh.current.rotation.y += 0.015
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
          size={0.08}
          color="#6366f1"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh ref={mesh}>
        <icosahedronGeometry args={[10, 2]} />
        <MeshDistortMaterial
          color="#6366f1"
          speed={4}
          distort={0.5}
          radius={1}
          metalness={1}
          roughness={0}
          opacity={0.3}
          transparent
          wireframe
        />
      </mesh>
    </>
  )
}

export default function BackgroundScene({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="fixed inset-0 -z-10 bg-[#010101] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[20, 20, 20]} intensity={2} color="#6366f1" />
        <pointLight position={[-20, -20, -20]} intensity={1} color="#f472b6" />
        <fog attach="fog" args={["#010101", 10, 60]} />
        
        <SceneController progress={progress} />
        <NeuralJourney progress={progress} />
      </Canvas>
    </div>
  )
}
