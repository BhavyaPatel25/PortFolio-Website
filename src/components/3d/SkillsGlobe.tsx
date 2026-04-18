import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingShape {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
  geometry: 'icosahedron' | 'tetrahedron' | 'octahedron' | 'dodecahedron';
}

const shapes: FloatingShape[] = [
  { position: [-3, 2, -2], scale: 0.8, speed: 1.2, color: '#8B5CF6', geometry: 'icosahedron' },
  { position: [3, -1, -1], scale: 0.6, speed: 0.8, color: '#00D9FF', geometry: 'tetrahedron' },
  { position: [-2, -2, -3], scale: 0.5, speed: 1.5, color: '#FF006E', geometry: 'octahedron' },
  { position: [2, 3, -2], scale: 0.7, speed: 1.0, color: '#00FF88', geometry: 'dodecahedron' },
  { position: [0, -3, -4], scale: 0.4, speed: 2.0, color: '#FFB800', geometry: 'icosahedron' },
  { position: [-4, 0, -3], scale: 0.55, speed: 1.3, color: '#FF6B6B', geometry: 'tetrahedron' },
  { position: [4, 1, -2], scale: 0.45, speed: 1.7, color: '#00D9FF', geometry: 'octahedron' },
];

function FloatingShape({ shape }: { shape: FloatingShape }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    switch (shape.geometry) {
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(shape.scale, 0);
      case 'tetrahedron':
        return new THREE.TetrahedronGeometry(shape.scale, 0);
      case 'octahedron':
        return new THREE.OctahedronGeometry(shape.scale, 0);
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(shape.scale, 0);
    }
  }, [shape.geometry, shape.scale]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * shape.speed * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * shape.speed;
      meshRef.current.rotation.z = state.clock.elapsedTime * shape.speed * 0.3;

      // Gentle floating motion
      meshRef.current.position.y = shape.position[1] + Math.sin(state.clock.elapsedTime * shape.speed) * 0.3;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = state.clock.elapsedTime * shape.speed * 0.5;
      wireframeRef.current.rotation.y = state.clock.elapsedTime * shape.speed;
      wireframeRef.current.position.y = shape.position[1] + Math.sin(state.clock.elapsedTime * shape.speed) * 0.3;
    }
  });

  return (
    <group position={shape.position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh ref={meshRef} geometry={geometry}>
          <meshStandardMaterial
            color={shape.color}
            emissive={shape.color}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh ref={wireframeRef} geometry={geometry}>
          <meshStandardMaterial
            color={shape.color}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
}

function SkillOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  const orbCount = 30;

  const positions = useMemo(() => {
    const pos: [number, number, number][] = [];
    for (let i = 0; i < orbCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 5 + Math.random() * 3;
      pos.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => {
        const colors = ['#8B5CF6', '#00D9FF', '#FF006E', '#00FF88', '#FFB800'];
        const color = colors[i % colors.length];
        return (
          <Float key={i} speed={1 + Math.random()} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh position={pos}>
              <sphereGeometry args={[0.08 + Math.random() * 0.05, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
                metalness={0.5}
                roughness={0.3}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

export default function SkillsGlobe() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D9FF" />

        {shapes.map((shape, i) => (
          <FloatingShape key={i} shape={shape} />
        ))}

        <SkillOrbs />

        <Sparkles
          count={100}
          scale={[12, 8, 6]}
          size={4}
          speed={0.4}
          color="#ffffff"
          direction={1}
        />
      </Canvas>
    </div>
  );
}
