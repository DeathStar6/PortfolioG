"use client"

import { useRef, useMemo, useCallback, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { MotionValue } from 'framer-motion'
import * as THREE from 'three'

// ─── Constants ────────────────────────────────────────────────────────────────
const N = 1500 // Slightly increased density (1200 -> 1500) as requested

// ─── Shape Generators ─────────────────────────────────────────────────────────
function genSphere(out: Float32Array) {
  for (let i = 0; i < N; i++) {
    const phi   = Math.acos(1 - 2 * (i + 0.5) / N)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    const r     = 1.8 + (Math.random() - 0.5) * 0.3
    out[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    out[i * 3 + 1] = r * Math.cos(phi)
    out[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
  }
}

function genScatter(out: Float32Array) {
  for (let i = 0; i < N; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)
    const r = 5 + Math.random() * 10 // Dispersed state
    out[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    out[i * 3 + 1] = r * Math.cos(phi)
    out[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
  }
}

// ─── Vertex Shader ────────────────────────────────────────────────────────────
const vertexShader = /* glsl */`
  attribute vec3 aTarget;
  attribute float aSize;
  uniform float uProgress;
  uniform float uTime;
  varying float vDist;

  void main() {
    // Direct interpolation between sphere and scatter
    vec3 pos = mix(position, aTarget, uProgress);
    
    // Dampened organic breathing
    pos.x += sin(uTime * 0.3 + pos.y * 1.5) * 0.008;
    pos.y += cos(uTime * 0.2 + pos.x * 1.2) * 0.008;
    pos.z += sin(uTime * 0.25 + pos.z * 1.1) * 0.008;
    
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * 240.0 / -mv.z;
    vDist = length(pos);
    gl_Position = projectionMatrix * mv;
  }
`

// ─── Fragment Shader ──────────────────────────────────────────────────────────
const fragmentShader = /* glsl */`
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying float vDist;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float alpha = 1.0 - smoothstep(0.85, 0.95, d);
    vec3 col = mix(uColor1, uColor2, clamp(vDist / 6.0, 0.0, 1.0));
    gl_FragColor = vec4(col, alpha);
  }
`

// ─── Component ────────────────────────────────────────────────────────────────
interface ParticleMorphEngineProps {
  scroll: MotionValue<number>
}

export default function ParticleMorphEngine({
  scroll
}: ParticleMorphEngineProps) {

  // Pre-allocate buffers for Sphere (Base) and Scatter (Target)
  const positionsBuf = useMemo(() => { const a = new Float32Array(N * 3); genSphere(a); return a }, [])
  const targetsBuf   = useMemo(() => { const a = new Float32Array(N * 3); genScatter(a); return a }, [])
  const sizesBuf     = useMemo(() => {
    const a = new Float32Array(N)
    for (let i = 0; i < N; i++) a[i] = 0.02 + Math.random() * 0.04
    return a
  }, [])

  const uniforms = useMemo(() => ({
    uProgress: { value: 0 },
    uTime:     { value: 0 },
    uColor1:   { value: new THREE.Color('#334155') },
    uColor2:   { value: new THREE.Color('#94a3b8') },
  }), [])

  const geoRef      = useRef<THREE.BufferGeometry>(null!)
  const pointsRef   = useRef<THREE.Points>(null!)
  const easedMouse    = useRef({ x: 0, y: 0 })
  const mouseRaw      = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (geoRef.current) {
      geoRef.current.setAttribute('position', new THREE.BufferAttribute(positionsBuf, 3))
      geoRef.current.setAttribute('aTarget',  new THREE.BufferAttribute(targetsBuf, 3))
      geoRef.current.setAttribute('aSize',    new THREE.BufferAttribute(sizesBuf, 1))
    }
  }, [positionsBuf, targetsBuf, sizesBuf])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRaw.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2
      mouseRaw.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    uniforms.uTime.value = t

    // Direct binding: Scroll 0 = Sphere, Scroll > 0 = Scattering
    // We use a slight exponent to ensure it stays in sphere form longer at the top
    const prog = Math.max(0, Math.min(scroll.get(), 1))
    uniforms.uProgress.value = Math.pow(prog, 1.5)

    // Smooth rotation and parallax
    const lerp = (a: number, b: number, val: number) => a + (b - a) * val
    easedMouse.current.x = lerp(easedMouse.current.x, mouseRaw.current.x, 0.05)
    easedMouse.current.y = lerp(easedMouse.current.y, mouseRaw.current.y, 0.05)

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05 + easedMouse.current.x * 0.2
      pointsRef.current.rotation.x = t * 0.02 + easedMouse.current.y * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
