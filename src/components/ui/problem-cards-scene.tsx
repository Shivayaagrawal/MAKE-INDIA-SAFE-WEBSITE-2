import { useRef, type ComponentType } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, Float, Html, Sparkles } from '@react-three/drei'
import type { Group } from 'three'
import './problem-cards-scene.css'

export interface ProblemCardItem {
  label: string
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
  position: [number, number, number]
}

function ProblemCardFace({
  label,
  icon: Icon,
}: {
  label: string
  icon: ProblemCardItem['icon']
}) {
  return (
    <div className="problem-card-3d">
      <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

function Cards({ items }: { items: ProblemCardItem[] }) {
  const group = useRef<Group>(null)
  const idle = useRef(0)

  useFrame((state, delta) => {
    const node = group.current
    if (!node) return
    idle.current += delta * 0.05
    const { pointer } = state
    const targetY = Math.sin(idle.current) * 0.04 + pointer.x * 0.1
    const targetX = -pointer.y * 0.06
    node.rotation.y += (targetY - node.rotation.y) * 0.045
    node.rotation.x += (targetX - node.rotation.x) * 0.045
  })

  return (
    <group ref={group}>
      <Sparkles
        count={28}
        scale={[4.2, 3.6, 2.4]}
        size={1.4}
        speed={0.22}
        opacity={0.28}
        color="#1c4d6e"
      />
      {items.map((item, index) => (
        <Billboard key={item.label} position={item.position}>
          <Float
            speed={0.7 + (index % 3) * 0.15}
            rotationIntensity={0.06}
            floatIntensity={0.28 + (index % 4) * 0.08}
          >
            <Html center transform distanceFactor={9.2} occlude={false}>
              <ProblemCardFace label={item.label} icon={item.icon} />
            </Html>
          </Float>
        </Billboard>
      ))}
    </group>
  )
}

export function ProblemCardsScene({ items }: { items: ProblemCardItem[] }) {
  return (
    <Canvas
      className="problem-cards-canvas"
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 8.6], fov: 34 }}
    >
      <Cards items={items} />
    </Canvas>
  )
}
