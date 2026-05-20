'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Trail } from '@react-three/drei';
import * as THREE from 'three';

function MandalaRing({ radius, count, speed, color, size }: {
  radius: number; count: number; speed: number; color: string; size: number;
}) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 0.15;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.sin(angle) * r;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    return pos;
  }, [count, radius]);

  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial size={size} color={color} transparent opacity={0.8} sizeAttenuation />
    </Points>
  );
}

function StarField() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50 - 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = state.clock.elapsedTime * 0.005;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial size={0.03} color="#FFD700" transparent opacity={0.6} sizeAttenuation />
    </Points>
  );
}

function FloatingPetals() {
  const petals = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 16,
      y: Math.random() * 12 - 2,
      z: (Math.random() - 0.5) * 5 - 2,
      speed: 0.3 + Math.random() * 0.5,
      drift: (Math.random() - 0.5) * 0.3,
      rotSpeed: (Math.random() - 0.5) * 2,
      scale: 0.03 + Math.random() * 0.05,
      color: Math.random() > 0.5 ? '#FF6B35' : '#FFD700',
      phase: Math.random() * Math.PI * 2,
    }))
  , []);

  return (
    <>
      {petals.map(petal => (
        <Petal key={petal.id} {...petal} />
      ))}
    </>
  );
}

function Petal({ x, y, z, speed, drift, rotSpeed, scale, color, phase }: {
  x: number; y: number; z: number; speed: number; drift: number;
  rotSpeed: number; scale: number; color: string; phase: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const initY = useRef(y);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.position.y = initY.current - ((t * speed + phase) % 14);
    ref.current.position.x = x + Math.sin(t * 0.5 + phase) * drift * 2;
    ref.current.rotation.z = t * rotSpeed;
    ref.current.rotation.x = Math.sin(t * 0.7 + phase) * 0.5;
  });

  return (
    <mesh ref={ref} position={[x, y, z]} scale={scale}>
      <planeGeometry args={[1, 1.4]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} side={THREE.DoubleSide} />
    </mesh>
  );
}

function LotusCore() {
  const groupRef = useRef<THREE.Group>(null!);
  const petalRefs = useRef<THREE.Mesh[]>([]);
  const petalCount = 12;

  const petalShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.15, 0.1, 0.2, 0.5, 0, 1);
    shape.bezierCurveTo(-0.2, 0.5, -0.15, 0.1, 0, 0);
    return shape;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.05;

    petalRefs.current.forEach((petal, i) => {
      if (petal) {
        const openAmt = 0.3 + Math.sin(t * 0.4 + i * 0.3) * 0.15;
        petal.rotation.x = -openAmt;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: petalCount }, (_, i) => {
        const angle = (i / petalCount) * Math.PI * 2;
        const layer = i < 6 ? 0 : 1;
        return (
          <mesh
            key={i}
            ref={el => { if (el) petalRefs.current[i] = el; }}
            position={[Math.cos(angle) * 0.2, layer * 0.05, Math.sin(angle) * 0.2]}
            rotation={[0, angle, 0]}
          >
            <shapeGeometry args={[petalShape]} />
            <meshStandardMaterial
              color={layer === 0 ? '#FF6B35' : '#FFD700'}
              emissive={layer === 0 ? '#FF4500' : '#B8860B'}
              emissiveIntensity={0.4}
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
      {/* Center sphere - Om glow */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#FFD700" emissive="#FF8C00" emissiveIntensity={1} />
      </mesh>
      <pointLight color="#FF8C00" intensity={2} distance={3} />
    </group>
  );
}

function OmParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 500;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const r = 2 + Math.sin(t * 3) * 0.3;
      const spiralT = t * 3;
      const spiralR = (spiralT / (Math.PI * 6)) * 2;

      pos[i * 3] = Math.cos(t) * r + Math.cos(spiralT) * spiralR * 0.3;
      pos[i * 3 + 1] = Math.sin(t) * r * 0.5 + Math.sin(spiralT) * spiralR * 0.3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.3;

      const mix = i / count;
      col[i * 3] = 1.0;
      col[i * 3 + 1] = mix * 0.85;
      col[i * 3 + 2] = 0.0;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </Points>
  );
}

function DiamondSparkles() {
  const count = 30;
  const sparkles = useMemo(() =>
    Array.from({ length: count }, () => ({
      pos: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4 - 2,
      ] as [number, number, number],
      speed: 0.5 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
      size: 0.03 + Math.random() * 0.04,
    }))
  , []);

  return (
    <>
      {sparkles.map((s, i) => (
        <Sparkle key={i} {...s} />
      ))}
    </>
  );
}

function Sparkle({ pos, speed, phase, size }: {
  pos: [number, number, number]; speed: number; phase: number; size: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = Math.abs(Math.sin(t)) * 0.9;
    ref.current.scale.setScalar(Math.abs(Math.sin(t * 0.7)) * 1.5 + 0.5);
    ref.current.rotation.z = t * 2;
  });

  return (
    <mesh ref={ref} position={pos}>
      <octahedronGeometry args={[size, 0]} />
      <meshBasicMaterial color="#FFD700" transparent opacity={0.8} />
    </mesh>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.05) * 0.5;
    camera.position.y = Math.sin(t * 0.03) * 0.3 + 0.2;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function WeddingScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} color="#3D0C5E" />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#FFD700" />
        <pointLight position={[-5, -3, 3]} intensity={0.8} color="#FF6B35" />
        <pointLight position={[0, 0, 4]} intensity={0.5} color="#9B1B30" />

        <StarField />
        <OmParticles />
        <FloatingPetals />
        <DiamondSparkles />

        <group position={[0, -0.3, 0]}>
          <LotusCore />
          <MandalaRing radius={1.2} count={60} speed={0.12} color="#D4A017" size={0.03} />
          <MandalaRing radius={1.8} count={90} speed={-0.08} color="#FF6B35" size={0.025} />
          <MandalaRing radius={2.5} count={120} speed={0.05} color="#FFD700" size={0.02} />
          <MandalaRing radius={3.2} count={150} speed={-0.04} color="#9B1B30" size={0.015} />
          <MandalaRing radius={4.0} count={36} speed={0.06} color="#D4A017" size={0.04} />
        </group>

        <CameraRig />
      </Canvas>
    </div>
  );
}
