/**
 * TwinForge AI — 3D Digital Twin Motor Component
 *
 * Uses React Three Fiber + Three.js to render a parametric 3D motor.
 * Health score drives color, animation speed, and fault highlighting.
 *
 * Phase 8 upgrade: Replace with GLTF model exported from Blender/SolidWorks.
 */
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import * as THREE from 'three'
import { healthColor } from '@/utils/health'

interface MotorProps {
  healthScore: number
  failureType?: string
  rpm?: number
}

function MotorGeometry({ healthScore, failureType, rpm = 1500 }: MotorProps) {
  const shaftRef = useRef<THREE.Group>(null)
  const fanRef = useRef<THREE.Group>(null)

  const color = healthColor(healthScore)
  const isBearingFault = failureType === 'bearing_wear'
  const isOverheat = failureType === 'overheating'

  // Rotation speed proportional to RPM and health
  const rpmFactor = (rpm / 1500) * (healthScore / 100)
  const rotationSpeed = rpmFactor * 0.08

  useFrame((_, delta) => {
    if (shaftRef.current) shaftRef.current.rotation.z += rotationSpeed
    if (fanRef.current) fanRef.current.rotation.z += rotationSpeed * 1.5
  })

  // Materials
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1e28', metalness: 0.8, roughness: 0.3,
  }), [])

  const healthMat = useMemo(() => new THREE.MeshStandardMaterial({
    color, emissive: color, emissiveIntensity: 0.15, metalness: 0.6, roughness: 0.4,
  }), [color])

  const bearingMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: isBearingFault ? '#ef4444' : '#2a3040',
    emissive: isBearingFault ? '#ef4444' : '#000',
    emissiveIntensity: isBearingFault ? 0.6 : 0,
  }), [isBearingFault])

  const hotMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: isOverheat ? '#f97316' : '#1a1e28',
    emissive: isOverheat ? '#f97316' : '#000',
    emissiveIntensity: isOverheat ? 0.4 : 0,
    metalness: 0.5, roughness: 0.5,
  }), [isOverheat])

  return (
    <group>
      {/* Main motor body (stator housing) */}
      <mesh material={bodyMat}>
        <cylinderGeometry args={[0.8, 0.8, 2.2, 32]} />
      </mesh>

      {/* Outer shell with health color */}
      <mesh material={healthMat}>
        <cylinderGeometry args={[0.82, 0.82, 2.2, 32, 1, true]} />
      </mesh>

      {/* Stator windings (visible through end) */}
      <mesh material={hotMat} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 2.0, 24]} />
      </mesh>

      {/* Cooling fins */}
      {Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.85, 0, Math.sin(angle) * 0.85]}
            rotation={[0, -angle, 0]} material={bodyMat}>
            <boxGeometry args={[0.06, 2.1, 0.18]} />
          </mesh>
        )
      })}

      {/* End shields (bearing caps) */}
      <mesh position={[0, 1.2, 0]} material={bearingMat}>
        <cylinderGeometry args={[0.82, 0.82, 0.15, 32]} />
      </mesh>
      <mesh position={[0, -1.2, 0]} material={bearingMat}>
        <cylinderGeometry args={[0.82, 0.82, 0.15, 32]} />
      </mesh>

      {/* Shaft (rotates) */}
      <group ref={shaftRef}>
        <mesh position={[0, 1.7, 0]} material={healthMat}>
          <cylinderGeometry args={[0.12, 0.12, 1.2, 16]} />
        </mesh>
        <mesh position={[0, -1.7, 0]} material={bodyMat}>
          <cylinderGeometry args={[0.12, 0.12, 1.2, 16]} />
        </mesh>
      </group>

      {/* Cooling fan (rear) */}
      <group ref={fanRef} position={[0, -1.5, 0]}>
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * 0.42, 0, Math.sin(a) * 0.42]}
              rotation={[0, -a + Math.PI / 4, 0]} material={bodyMat}>
              <boxGeometry args={[0.08, 0.1, 0.35]} />
            </mesh>
          )
        })}
      </group>

      {/* Terminal box */}
      <mesh position={[0.88, 0.3, 0]} material={bodyMat}>
        <boxGeometry args={[0.22, 0.35, 0.45]} />
      </mesh>

      {/* Health score text */}
      <Text
        position={[0, 1.7, 0.9]}
        fontSize={0.18}
        color={color}
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {`${healthScore.toFixed(0)}%`}
      </Text>

      {/* Fault label */}
      {isBearingFault && (
        <Text position={[0, -1.0, 0.9]} fontSize={0.13} color="#ef4444" anchorX="center" anchorY="middle">
          ⚠ Bearing Warn
        </Text>
      )}
    </group>
  )
}

interface Props {
  healthScore: number
  failureType?: string
  rpm?: number
  height?: number
}

export function MotorTwin3D({ healthScore, failureType, rpm, height = 400 }: Props) {
  return (
    <div style={{ height, width: '100%', background: '#0d0f14', borderRadius: 8 }}>
      <Canvas camera={{ position: [3.5, 2, 3.5], fov: 45 }} shadows>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <pointLight position={[-3, 3, -3]} intensity={0.5} color="#3b82f6" />
        <Environment preset="city" />

        <MotorGeometry healthScore={healthScore} failureType={failureType} rpm={rpm} />

        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.5}
        />

        {/* Grid floor */}
        <gridHelper args={[8, 16, '#1e2330', '#1e2330']} position={[0, -2, 0]} />
      </Canvas>
    </div>
  )
}
