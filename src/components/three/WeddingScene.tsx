'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Colour palette ─────────────────────────────── */
const GOLD   = '#D4A017';
const GOLD2  = '#FFD700';
const SILVER = '#C8C8C8';
const SILVER2= '#E8E8E8';
const GREEN  = '#2E7D52';
const GREEN2 = '#52C87A';

/* ─── Slow camera drift ──────────────────────────── */
function CameraRig() {
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.04) * 0.6;
    camera.position.y = Math.sin(t * 0.025) * 0.3 + 0.1;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ─── Star field ─────────────────────────────────── */
function StarField() {
  const ref = useRef<THREE.Points>(null!);
  const geo  = useMemo(() => {
    const pos = new Float32Array(4000 * 3);
    const col = new Float32Array(4000 * 3);
    for (let i = 0; i < 4000; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 60;
      pos[i*3+1] = (Math.random() - 0.5) * 60;
      pos[i*3+2] = (Math.random() - 0.5) * 60 - 15;
      const isGold = Math.random() > 0.6;
      const isSilver = !isGold && Math.random() > 0.4;
      col[i*3]   = isGold ? 1.0 : isSilver ? 0.78 : 0.2;
      col[i*3+1] = isGold ? 0.85: isSilver ? 0.78 : 0.49;
      col[i*3+2] = isGold ? 0.09: isSilver ? 0.78 : 0.32;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.012;
    ref.current.rotation.x = clock.elapsedTime * 0.004;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

/* ─── Particle ring (mandala layer) ──────────────── */
function Ring({ radius, count, speed, color, size, yTilt = 0 }: {
  radius: number; count: number; speed: number;
  color: string; size: number; yTilt?: number;
}) {
  const ref  = useRef<THREE.Points>(null!);
  const geo  = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 0.12;
      pos[i*3]   = Math.cos(a) * r;
      pos[i*3+1] = Math.sin(a) * r * 0.25;   // slight oval
      pos[i*3+2] = Math.sin(a) * r * 0.08;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count, radius]);

  const mat = useMemo(() =>
    new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.85, sizeAttenuation: true })
  , [color, size]);

  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.elapsedTime * speed;
    ref.current.rotation.x = yTilt;
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

/* ─── Rising firefly particles ───────────────────── */
function Fireflies() {
  const count = 120;
  const data  = useMemo(() =>
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 14,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 5 - 1,
      speed:  0.2 + Math.random() * 0.5,
      drift:  (Math.random() - 0.5) * 0.8,
      phase:  Math.random() * Math.PI * 2,
      color:  Math.random() < 0.4 ? GOLD2 : Math.random() < 0.5 ? SILVER : GREEN2,
      size:   0.03 + Math.random() * 0.04,
    }))
  , []);

  return (
    <>
      {data.map((d, i) => <Firefly key={i} {...d} totalHeight={10} />)}
    </>
  );
}

function Firefly({ x, y, z, speed, drift, phase, color, size, totalHeight }: {
  x: number; y: number; z: number; speed: number; drift: number;
  phase: number; color: string; size: number; totalHeight: number;
}) {
  const ref    = useRef<THREE.Mesh>(null!);
  const mat    = useMemo(() => new THREE.MeshBasicMaterial({ color, transparent: true }), [color]);
  const geo    = useMemo(() => new THREE.SphereGeometry(size, 6, 6), [size]);
  const startY = useRef(y);

  useFrame(({ clock }) => {
    const t   = clock.elapsedTime;
    const raw = ((t * speed + phase) % totalHeight);
    ref.current.position.y = startY.current + raw - totalHeight * 0.5;
    ref.current.position.x = x + Math.sin(t * 0.6 + phase) * drift;
    ref.current.position.z = z;
    mat.opacity = Math.abs(Math.sin(t * 0.8 + phase)) * 0.8 + 0.1;
  });

  return <mesh ref={ref} geometry={geo} material={mat} />;
}

/* ─── Petal shower ───────────────────────────────── */
function Petals() {
  const petals = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x:      (Math.random() - 0.5) * 18,
      startY: 8 + Math.random() * 6,
      z:      (Math.random() - 0.5) * 4 - 1,
      speed:  0.35 + Math.random() * 0.45,
      drift:  (Math.random() - 0.5) * 0.6,
      rotZ:   (Math.random() - 0.5) * 3,
      rotX:   (Math.random() - 0.5) * 2,
      scale:  0.06 + Math.random() * 0.08,
      color:  Math.random() < 0.45 ? GOLD : Math.random() < 0.5 ? SILVER : GREEN2,
      phase:  Math.random() * Math.PI * 2,
    }))
  , []);

  return (
    <>
      {petals.map(p => <Petal key={p.id} {...p} />)}
    </>
  );
}

function Petal({ x, startY, z, speed, drift, rotZ, rotX, scale, color, phase }: {
  x: number; startY: number; z: number; speed: number; drift: number;
  rotZ: number; rotX: number; scale: number; color: string; phase: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color, transparent: true, opacity: 0.75, side: THREE.DoubleSide,
  }), [color]);
  const geo = useMemo(() => new THREE.PlaneGeometry(1, 1.5), []);
  const travel = 18;

  useFrame(({ clock }) => {
    const t   = clock.elapsedTime;
    const raw = (t * speed + phase) % travel;
    ref.current.position.y = startY - raw;
    ref.current.position.x = x + Math.sin(t * 0.5 + phase) * drift;
    ref.current.position.z = z;
    ref.current.rotation.z = t * rotZ;
    ref.current.rotation.x = Math.sin(t * 0.7 + phase) * rotX;
    ref.current.scale.setScalar(scale);
  });

  return <mesh ref={ref} geometry={geo} material={mat} />;
}

/* ─── Sacred geometry triangle grid ─────────────── */
function SacredGeometry() {
  const ref = useRef<THREE.Group>(null!);

  const triangles = useMemo(() => {
    const shapes: { points: [number, number, number][]; color: string; opacity: number }[] = [];
    // Upward triangles (gold)
    for (let r = 1; r <= 3; r++) {
      const s = r * 0.9;
      shapes.push({ points: [[0, s, 0], [-s*0.866, -s*0.5, 0], [s*0.866, -s*0.5, 0]], color: GOLD, opacity: 0.25 / r });
    }
    // Downward triangles (silver)
    for (let r = 1; r <= 3; r++) {
      const s = r * 0.9;
      shapes.push({ points: [[0, -s, 0], [-s*0.866, s*0.5, 0], [s*0.866, s*0.5, 0]], color: SILVER, opacity: 0.2 / r });
    }
    return shapes;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.06;
  });

  return (
    <group ref={ref}>
      {triangles.map((tri, i) => {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array([
          ...tri.points[0], ...tri.points[1], ...tri.points[2],
        ]);
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setIndex([0, 1, 2]);
        return (
          <lineLoop key={i} geometry={geo}>
            <lineBasicMaterial color={tri.color} transparent opacity={tri.opacity} />
          </lineLoop>
        );
      })}
    </group>
  );
}

/* ─── Central lotus core ─────────────────────────── */
function LotusCore() {
  const group  = useRef<THREE.Group>(null!);
  const petRef = useRef<THREE.Mesh[]>([]);
  const count  = 12;

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(0.15, 0.1, 0.18, 0.55, 0, 1.1);
    s.bezierCurveTo(-0.18, 0.55, -0.15, 0.1, 0, 0);
    return s;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    group.current.rotation.y = t * 0.18;
    group.current.rotation.x = Math.sin(t * 0.25) * 0.05;
    petRef.current.forEach((p, i) => {
      if (p) p.rotation.x = -(0.28 + Math.sin(t * 0.35 + i * 0.52) * 0.12);
    });
  });

  return (
    <group ref={group}>
      {/* Petals — alternating gold and silver-green */}
      {Array.from({ length: count }, (_, i) => {
        const angle  = (i / count) * Math.PI * 2;
        const isOuter = i >= count / 2;
        const col    = isOuter ? SILVER : GOLD;
        const emis   = isOuter ? '#4CAF50' : '#B8860B';
        return (
          <mesh
            key={i}
            ref={el => { if (el) petRef.current[i] = el; }}
            position={[Math.cos(angle) * 0.22, isOuter ? 0.06 : 0, Math.sin(angle) * 0.22]}
            rotation={[0, angle, 0]}
          >
            <shapeGeometry args={[shape]} />
            <meshStandardMaterial
              color={col} emissive={emis} emissiveIntensity={0.35}
              transparent opacity={0.88} side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}

      {/* Centre gem */}
      <mesh>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial color={GOLD2} emissive="#FF8C00" emissiveIntensity={1.2} />
      </mesh>
      <pointLight color="#FFD700" intensity={3} distance={4} decay={2} />
      <pointLight color="#52C87A" intensity={1.5} distance={3} decay={2} />
    </group>
  );
}

/* ─── Root scene ─────────────────────────────────── */
export default function WeddingScene() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 58 }} gl={{ antialias: true, alpha: true }}>
        {/* Lighting */}
        <ambientLight intensity={0.25} color="#0D2B1A" />
        <directionalLight position={[4, 6, 4]}  intensity={0.8} color="#D4A017" />
        <directionalLight position={[-4, -3, 2]} intensity={0.5} color="#52C87A" />

        <StarField />

        {/* Mandala rings — 6 concentric, alternating gold / silver / green */}
        <group position={[0, -0.2, 0]}>
          <Ring radius={1.1} count={55}  speed={ 0.15}  color={GOLD}   size={0.035} />
          <Ring radius={1.6} count={80}  speed={-0.10}  color={SILVER} size={0.028} yTilt={0.12} />
          <Ring radius={2.2} count={110} speed={ 0.07}  color={GREEN}  size={0.024} />
          <Ring radius={2.9} count={140} speed={-0.055} color={GOLD2}  size={0.020} yTilt={0.08} />
          <Ring radius={3.6} count={170} speed={ 0.04}  color={SILVER2}size={0.016} />
          <Ring radius={4.4} count={36}  speed={-0.06}  color={GOLD}   size={0.045} />

          <SacredGeometry />
          <LotusCore />
        </group>

        <Petals />
        <Fireflies />
        <CameraRig />
      </Canvas>
    </div>
  );
}
