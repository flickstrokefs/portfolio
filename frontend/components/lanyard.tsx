'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import * as THREE from 'three'

extend({ MeshLineGeometry, MeshLineMaterial })

if (typeof window !== 'undefined') {
  const origWarn = console.warn
  console.warn = (...args: any[]) => {
    const msg = typeof args[0] === 'string' ? args[0] : (args[0]?.message || '')
    if (
      typeof msg === 'string' &&
      (msg.includes('THREE.Clock') ||
        msg.includes('THREE.WebGLProgram: Program Info Log') ||
        msg.includes('warning X4122') ||
        msg.includes('using deprecated parameters for the initialization function') ||
        msg.includes('computeBoundingSphere(): Computed radius is NaN'))
    ) {
      return
    }
    origWarn.apply(console, args)
  }

  const origError = console.error
  console.error = (...args: any[]) => {
    const msg = typeof args[0] === 'string' ? args[0] : (args[0]?.message || '')
    if (typeof msg === 'string' && msg.includes('computeBoundingSphere(): Computed radius is NaN')) {
      return
    }
    origError.apply(console, args)
  }
}

function createStrapTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // Dark technical fabric background
  ctx.fillStyle = '#0d1520'
  ctx.fillRect(0, 0, 1024, 256)

  // Fabric texture weave
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)'
  ctx.lineWidth = 1
  for (let i = -256; i < 1024 + 256; i += 8) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 128, 256); ctx.stroke()
  }
  for (let i = -256; i < 1024 + 256; i += 8) {
    ctx.beginPath(); ctx.moveTo(i + 128, 0); ctx.lineTo(i, 256); ctx.stroke()
  }

  // Hairline borders
  ctx.fillStyle = '#e24e45'
  ctx.fillRect(0, 0, 1024, 8)
  ctx.fillStyle = '#6f8da8'
  ctx.fillRect(0, 248, 1024, 8)

  // Clean repeating typography
  ctx.fillStyle = '#bad2e3'
  ctx.font = 'bold 54px monospace, sans-serif'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  ctx.fillText('S / LAB   ·   FIELD NOTEBOOK   ·   EXP. 01   ·   ', 20, 128)

  const texture = new THREE.CanvasTexture(canvas)
  texture.flipY = false
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 16
  texture.needsUpdate = true
  return texture
}

function distSq(
  a: { x: number; y: number; z: number },
  b: { x: number; y: number; z: number }
): number {
  const dx = a.x - b.x
  const dy = a.y - b.y
  const dz = a.z - b.z
  return dx * dx + dy * dy + dz * dz
}

export default function Lanyard({ position = [0, 0, 18], gravity = [0, -40, 0], fov = 22, transparent = true }: { position?: [number, number, number]; gravity?: [number, number, number]; fov?: number; transparent?: boolean }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => { const onResize = () => setIsMobile(window.innerWidth < 768); window.addEventListener('resize', onResize); return () => window.removeEventListener('resize', onResize) }, [])
  return <div className="lanyard-wrapper" aria-label="Interactive student field ID badge">
    <Canvas
      camera={{ position, fov }}
      dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 2, 2.5) : 2]}
      gl={{ alpha: transparent, powerPreference: 'high-performance', antialias: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color(0x000000), 0)
        gl.outputColorSpace = THREE.SRGBColorSpace
        if (gl.debug) gl.debug.checkShaderErrors = false
      }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[0, 6, 8]} intensity={1.1} color="#fffdf8" />
      <Suspense fallback={null}>
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}><Band isMobile={isMobile} /></Physics>
        <Environment blur={0.85}>
          <Lightformer intensity={0.8} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={1.0} color="#fff5ea" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={1.0} color="#fff5ea" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={2.5} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Suspense>
    </Canvas>
  </div>
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: { maxSpeed?: number; minSpeed?: number; isMobile?: boolean }) {
  const band = useRef<any>(null), fixed = useRef<any>(null), j1 = useRef<any>(null), j2 = useRef<any>(null), j3 = useRef<any>(null), card = useRef<any>(null)
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3()
  const segmentProps = { type: 'dynamic' as const, canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 }
  const { nodes, materials } = useGLTF('/card.glb') as any
  const stockTexture = useTexture('/lanyard.png')
  const cardTexture = useTexture('/assets/id-card-atlas.png')
  const strapCustomTexture = useMemo(() => createStrapTexture(), [])

  useMemo(() => {
    if (cardTexture) {
      cardTexture.flipY = false
      cardTexture.colorSpace = THREE.SRGBColorSpace
      cardTexture.anisotropy = 16
      cardTexture.minFilter = THREE.LinearMipmapLinearFilter
      cardTexture.magFilter = THREE.LinearFilter
      cardTexture.generateMipmaps = true
      cardTexture.needsUpdate = true
    }
  }, [cardTexture])

  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 2, 0),
    new THREE.Vector3(0, 3, 0)
  ]))
  const [dragged, drag] = useState<THREE.Vector3 | false>(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.9])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.9])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.9])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.65, 0]])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => { document.body.style.cursor = 'auto' }
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach(ref => {
        if (ref.current && typeof ref.current.wakeUp === 'function') {
          ref.current.wakeUp()
        }
      })
      if (typeof card.current.setNextKinematicTranslation === 'function') {
        card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
      }
    }
    if (fixed.current && card.current && j1.current && j2.current && j3.current && band.current?.geometry) {
      ;[j1, j2].forEach(ref => {
        if (!ref.current || typeof ref.current.translation !== 'function') return
        const trans = ref.current.translation()
        if (!trans || !Number.isFinite(trans.x) || !Number.isFinite(trans.y) || !Number.isFinite(trans.z)) return
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(trans)
        const d = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(trans)))
        ref.current.lerped.lerp(trans, delta * (minSpeed + d * (maxSpeed - minSpeed)))
      })
      if (
        typeof j3.current.translation === 'function' &&
        j2.current.lerped &&
        j1.current.lerped &&
        typeof fixed.current.translation === 'function'
      ) {
        const j3Trans = j3.current.translation()
        const fixedTrans = fixed.current.translation()
        if (
          j3Trans && fixedTrans &&
          Number.isFinite(j3Trans.x) && Number.isFinite(j3Trans.y) && Number.isFinite(j3Trans.z) &&
          Number.isFinite(fixedTrans.x) && Number.isFinite(fixedTrans.y) && Number.isFinite(fixedTrans.z) &&
          Number.isFinite(j1.current.lerped.x) && Number.isFinite(j1.current.lerped.y) && Number.isFinite(j1.current.lerped.z) &&
          Number.isFinite(j2.current.lerped.x) && Number.isFinite(j2.current.lerped.y) && Number.isFinite(j2.current.lerped.z)
        ) {
          const p0 = j3Trans
          const p1 = j2.current.lerped
          const p2 = j1.current.lerped
          const p3 = fixedTrans

          if (
            distSq(p0, p1) > 0.0001 &&
            distSq(p1, p2) > 0.0001 &&
            distSq(p2, p3) > 0.0001
          ) {
            curve.points[0].copy(p0)
            curve.points[1].copy(p1)
            curve.points[2].copy(p2)
            curve.points[3].copy(p3)
            curve.updateArcLengths()

            if (typeof band.current.geometry?.setPoints === 'function') {
              const rawPoints = curve.getPoints(isMobile ? 16 : 32)
              const cleanPoints: THREE.Vector3[] = []
              for (let i = 0; i < rawPoints.length; i++) {
                const p = rawPoints[i]
                if (p && Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.z)) {
                  if (cleanPoints.length === 0 || distSq(cleanPoints[cleanPoints.length - 1], p) > 0.0001) {
                    cleanPoints.push(p)
                  }
                }
              }
              if (cleanPoints.length >= 2) {
                try {
                  band.current.geometry.setPoints(cleanPoints)
                } catch {
                  // Ignore rare transient step exceptions
                }
              }
            }
          }
        }
      }
      if (
        typeof card.current.angvel === 'function' &&
        typeof card.current.rotation === 'function' &&
        typeof card.current.setAngvel === 'function'
      ) {
        const cardAng = card.current.angvel()
        const cardRot = card.current.rotation()
        if (
          cardAng && cardRot &&
          Number.isFinite(cardAng.x) && Number.isFinite(cardAng.y) && Number.isFinite(cardAng.z) &&
          Number.isFinite(cardRot.x) && Number.isFinite(cardRot.y) && Number.isFinite(cardRot.z)
        ) {
          ang.copy(cardAng)
          rot.copy(cardRot)
          card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
        }
      }
    }
  })

  curve.curveType = 'chordal'
  stockTexture.wrapS = stockTexture.wrapT = THREE.RepeatWrapping

  return <>
    <group position={[0, 4.0, 0]}>
      <RigidBody ref={fixed} {...segmentProps} type="fixed" />
      <RigidBody position={[0.4, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody position={[0.8, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody position={[1.2, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody position={[1.6, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
        <CuboidCollider args={[0.92, 1.25, 0.01]} />
        <group
          scale={2.6}
          position={[0, -1.35, -0.05]}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onPointerUp={e => { ;(e.target as HTMLElement)?.releasePointerCapture?.(e.pointerId); drag(false) }}
          onPointerDown={e => { ;(e.target as HTMLElement)?.setPointerCapture?.(e.pointerId); drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))) }}
        >
          <mesh geometry={nodes.card.geometry}>
            <meshPhysicalMaterial
              map={cardTexture || materials.base.map}
              map-anisotropy={16}
              clearcoat={isMobile ? 0 : 0.15}
              clearcoatRoughness={0.3}
              roughness={0.78}
              metalness={0.0}
              envMapIntensity={0.12}
            />
          </mesh>
          <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.2} />
          <mesh geometry={nodes.clamp.geometry} material={materials.metal} material-roughness={0.2} />
        </group>
      </RigidBody>
    </group>
    <mesh ref={band}>
      <meshLineGeometry />
      <meshLineMaterial
        color="white"
        depthTest={false}
        resolution={isMobile ? [1000, 2000] : [1000, 1000]}
        useMap
        map={strapCustomTexture || stockTexture}
        repeat={[-3.5, 1]}
        lineWidth={1.25}
      />
    </mesh>
  </>
}

useGLTF.preload('/card.glb')
useTexture.preload('/lanyard.png')
useTexture.preload('/assets/id-card-atlas.png')



