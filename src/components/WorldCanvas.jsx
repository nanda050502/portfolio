import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls, Stars } from '@react-three/drei'
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import { ZONES } from '../data/zones'
import { useStoryStore } from '../store/useStoryStore'

function StoryCameraRig() {
  const camera = useThree((state) => state.camera)
  const currentAct = useStoryStore((state) => state.currentAct)
  const cameraMode = useStoryStore((state) => state.cameraMode)
  const focusTarget = useRef(new THREE.Vector3())

  useEffect(() => {
    const zone = ZONES.find((entry) => entry.act === currentAct) ?? ZONES[0]

    if (cameraMode === 'story') {
      gsap.killTweensOf(camera.position)
      gsap.killTweensOf(focusTarget.current)

      gsap.to(camera.position, {
        x: zone.cameraPos[0],
        y: zone.cameraPos[1],
        z: zone.cameraPos[2],
        duration: 1.7,
        overwrite: true,
        ease: 'power3.inOut',
      })

      gsap.to(focusTarget.current, {
        x: zone.lookAt[0],
        y: zone.lookAt[1],
        z: zone.lookAt[2],
        duration: 1.7,
        overwrite: true,
        ease: 'power3.inOut',
      })
    }
  }, [camera, currentAct, cameraMode])

  useFrame(() => {
    if (cameraMode === 'story') {
      camera.lookAt(focusTarget.current)
    }
  })

  return null
}

function CharacterGuide() {
  const ref = useRef()
  const currentAct = useStoryStore((state) => state.currentAct)
  const target = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    const zone = ZONES.find((entry) => entry.act === currentAct) ?? ZONES[0]
    target.set(zone.lookAt[0], 0.7, zone.lookAt[2] + 1.8)

    if (ref.current) {
      ref.current.position.lerp(target, delta * 2)
      ref.current.rotation.y += delta * 0.4
    }
  })

  return (
    <group ref={ref} position={[0, 0.7, 2]}>
      <mesh castShadow>
        <icosahedronGeometry args={[0.58, 0]} />
        <meshStandardMaterial color="#19f5c1" emissive="#0d5f50" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.75, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.45, 1.1, 12]} />
        <meshStandardMaterial color="#d7f8ff" metalness={0.2} roughness={0.45} />
      </mesh>
    </group>
  )
}

function ZonePlatforms() {
  const currentAct = useStoryStore((state) => state.currentAct)

  return (
    <group>
      {ZONES.map((zone) => {
        const active = currentAct === zone.act
        const isHidden = zone.hidden

        return (
          <group key={zone.id} position={zone.position}>
            <mesh receiveShadow castShadow>
              <boxGeometry args={[9, 0.8, 9]} />
              <meshStandardMaterial
                color={active ? zone.color : '#0d1524'}
                emissive={active ? zone.color : '#10192a'}
                emissiveIntensity={active ? 0.32 : 0.08}
                roughness={0.7}
                metalness={0.2}
              />
            </mesh>

            {!isHidden && (
              <Html position={[0, 1.55, 0]} center distanceFactor={20}>
                <div className="zone-chip">
                  <span>ACT {zone.act}</span>
                  <strong>{zone.label}</strong>
                </div>
              </Html>
            )}
          </group>
        )
      })}
    </group>
  )
}

function WorldScene({ isLowEnd }) {
  const cameraMode = useStoryStore((state) => state.cameraMode)

  return (
    <>
      <color attach="background" args={['#050810']} />
      <fog attach="fog" args={['#050810', 18, 120]} />

      <ambientLight intensity={0.35} color="#5cb8ff" />
      <directionalLight
        position={[8, 12, 4]}
        color="#ffd596"
        intensity={isLowEnd ? 0.85 : 1.1}
        castShadow={!isLowEnd}
        shadow-mapSize-width={isLowEnd ? 512 : 1024}
        shadow-mapSize-height={isLowEnd ? 512 : 1024}
      />
      <pointLight position={[-10, 3, -18]} color="#00f5c4" intensity={1.4} />
      <pointLight position={[12, 2, -26]} color="#ff6b6b" intensity={0.9} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.45, -20]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#070e1a" metalness={0.15} roughness={0.95} />
      </mesh>

      <Stars
        radius={150}
        depth={60}
        count={isLowEnd ? 900 : 2000}
        factor={isLowEnd ? 2.2 : 3}
        saturation={0.1}
        fade
        speed={0.3}
      />

      <ZonePlatforms />
      <CharacterGuide />
      <StoryCameraRig />

      <OrbitControls
        enabled={cameraMode === 'free'}
        enablePan
        enableZoom
        enableDamping
        dampingFactor={0.08}
        maxPolarAngle={Math.PI * 0.48}
        minDistance={5}
        maxDistance={26}
        target={[0, 0.8, -20]}
      />

      <EffectComposer multisampling={isLowEnd ? 0 : 4}>
        <Bloom intensity={isLowEnd ? 0.45 : 0.9} luminanceThreshold={0.3} mipmapBlur={!isLowEnd} />
        {!isLowEnd && (
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0009, 0.0012]} />
        )}
        <Noise opacity={isLowEnd ? 0.015 : 0.03} blendFunction={BlendFunction.SOFT_LIGHT} />
        <Vignette eskil={false} offset={0.22} darkness={isLowEnd ? 0.55 : 0.75} />
      </EffectComposer>
    </>
  )
}

export function WorldCanvas() {
  const isLowEnd = useMemo(() => {
    const cores = navigator.hardwareConcurrency ?? 8
    const memory = navigator.deviceMemory ?? 8
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    return isMobile || cores <= 6 || memory <= 4
  }, [])

  return (
    <Canvas
      shadows={!isLowEnd}
      dpr={isLowEnd ? [1, 1.2] : [1, 1.6]}
      gl={{ antialias: true, powerPreference: isLowEnd ? 'low-power' : 'high-performance' }}
      performance={{ min: 0.5 }}
      camera={{ position: [0, 2.8, 8], fov: 52, near: 0.1, far: 300 }}
    >
      <WorldScene isLowEnd={isLowEnd} />
    </Canvas>
  )
}
