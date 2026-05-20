'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* Colours that pop against the dark-green hero */
const GOLD   = new THREE.Color('#C9A84C');
const SILVER = new THREE.Color('#DDE2E4');
const WHITE  = new THREE.Color('#ffffff');

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);

  const { geo, mat } = useMemo(() => {
    const count = 1800;
    const pos   = new Float32Array(count * 3);
    const col   = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 28;
      pos[i*3+1] = (Math.random() - 0.5) * 18;
      pos[i*3+2] = (Math.random() - 0.5) * 14 - 4;

      const r = Math.random();
      const c = r < 0.5 ? GOLD : r < 0.8 ? SILVER : WHITE;
      col[i*3]   = c.r;
      col[i*3+1] = c.g;
      col[i*3+2] = c.b;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color',    new THREE.BufferAttribute(col, 3));

    const m = new THREE.PointsMaterial({
      size: 0.06, vertexColors: true, transparent: true, opacity: 0.7, sizeAttenuation: true,
    });
    return { geo: g, mat: m };
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.018;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.008) * 0.04;
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

function MandalaRing({ radius, count, speed, color, size }: {
  radius: number; count: number; speed: number; color: string; size: number;
}) {
  const ref = useRef<THREE.Points>(null!);
  const { geo, mat } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 0.1;
      pos[i*3]   = Math.cos(a) * r;
      pos[i*3+1] = Math.sin(a) * r * 0.22;
      pos[i*3+2] = (Math.random() - 0.5) * 0.05;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.9, sizeAttenuation: true });
    return { geo: g, mat: m };
  }, [count, radius, color, size]);

  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.elapsedTime * speed;
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

function GoldenCore() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.3;
    ref.current.rotation.z = clock.elapsedTime * 0.15;
    ref.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 0.8) * 0.08);
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.18, 2]} />
      <meshStandardMaterial color="#C9A84C" emissive="#8B6508" emissiveIntensity={0.9} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

function Petals() {
  const count = 40;
  const data = useMemo(() => Array.from({ length: count }, () => ({
    x:      (Math.random() - 0.5) * 20,
    startY: 8 + Math.random() * 6,
    z:      (Math.random() - 0.5) * 5 - 1,
    speed:  0.3 + Math.random() * 0.4,
    drift:  (Math.random() - 0.5) * 0.5,
    rotZ:   (Math.random() - 0.5) * 2.5,
    scale:  0.05 + Math.random() * 0.06,
    color:  Math.random() < 0.6 ? '#C9A84C' : '#DDE2E4',
    phase:  Math.random() * Math.PI * 2,
  })), []);

  return (
    <>
      {data.map((d, i) => <Petal key={i} {...d} />)}
    </>
  );
}

function Petal({ x, startY, z, speed, drift, rotZ, scale, color, phase }: {
  x: number; startY: number; z: number; speed: number; drift: number;
  rotZ: number; scale: number; color: string; phase: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.65, side: THREE.DoubleSide }), [color]);
  const geo = useMemo(() => new THREE.PlaneGeometry(1, 1.4), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ref.current.position.y = startY - ((t * speed + phase) % 18);
    ref.current.position.x = x + Math.sin(t * 0.5 + phase) * drift;
    ref.current.position.z = z;
    ref.current.rotation.z = t * rotZ;
    ref.current.rotation.x = Math.sin(t * 0.7 + phase) * 0.4;
    ref.current.scale.setScalar(scale);
  });

  return <mesh ref={ref} geometry={geo} material={mat} />;
}

function CameraRig() {
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.04) * 0.4;
    camera.position.y = Math.sin(t * 0.025) * 0.2;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function WeddingScene() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas camera={{ position: [0, 0, 9], fov: 55 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} color="#2D7A53" />
        <pointLight position={[3, 4, 3]}  intensity={2.5} color="#C9A84C" />
        <pointLight position={[-3,-3, 2]} intensity={1.2} color="#DDE2E4" />

        <ParticleField />
        <Petals />

        <group position={[0, -0.1, 0]}>
          <MandalaRing radius={1.2} count={60}  speed={ 0.14} color="#C9A84C" size={0.038} />
          <MandalaRing radius={1.9} count={90}  speed={-0.09} color="#DDE2E4" size={0.030} />
          <MandalaRing radius={2.7} count={120} speed={ 0.06} color="#A8892E" size={0.022} />
          <MandalaRing radius={3.5} count={32}  speed={-0.05} color="#C9A84C" size={0.048} />
          <GoldenCore />
        </group>

        <CameraRig />
      </Canvas>
    </div>
  );
}
