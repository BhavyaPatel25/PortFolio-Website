import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, Text } from '@react-three/drei';
import * as THREE from 'three';

// Animated ring that rotates around the core
function RotatingRing({ position, color, speed, size }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * speed;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[size, 0.08, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

// Floating code snippets / tech symbols
function FloatingTech() {
  const groupRef = useRef<THREE.Group>(null);
  const symbols = ['⚡', '🧠', '⚛️', '🔥', '💻', '🚀'];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {symbols.map((symbol, i) => {
        const angle = (i / symbols.length) * Math.PI * 2;
        const radius = 4;
        return (
          <Float
            key={i}
            speed={1.5 + i * 0.2}
            rotationIntensity={0.5}
            floatIntensity={0.8}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 1.5,
              Math.sin(angle) * radius - 3,
            ]}
          >
            <mesh>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color={['#8B5CF6', '#00D9FF', '#FF006E', '#00FF88', '#FFB800', '#FF6B6B'][i]}
                emissive={['#8B5CF6', '#00D9FF', '#FF006E', '#00FF88', '#FFB800', '#FF6B6B'][i]}
                emissiveIntensity={0.6}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

// Central AI core with pulsing effect
function AICoreEnhanced() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.3;
      const innerScale = 1 + Math.cos(state.clock.elapsedTime * 3) * 0.15;
      innerRef.current.scale.set(innerScale, innerScale, innerScale);
    }
  });

  return (
    <group>
      {/* Outer icosahedron */}
      <mesh ref={meshRef} position={[0, 0, -2]}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#FF006E"
          emissive="#FF006E"
          emissiveIntensity={1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Inner core */}
      <mesh ref={innerRef} position={[0, 0, -2]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={1.5}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Wireframe sphere */}
      <mesh position={[0, 0, -2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#8B5CF6"
          wireframe
          emissive="#8B5CF6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Rotating rings */}
      <RotatingRing position={[0, 0, -2]} color="#00D9FF" speed={0.5} size={1.5} />
      <RotatingRing position={[0, 0, -2]} color="#FF006E" speed={-0.3} size={2} />
      <RotatingRing position={[0, 0, -2]} color="#8B5CF6" speed={0.4} size={2.5} />
    </group>
  );
}

// Mouse-reactive particles
function MouseParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 15;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return { positions };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

export default function HeroEnhanced() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[15, 15, 10]} intensity={1.5} color="#00D9FF" />
        <pointLight position={[-15, -15, -10]} intensity={1} color="#FF006E" />
        <pointLight position={[0, 10, 5]} intensity={0.8} color="#8B5CF6" />

        <AICoreEnhanced />
        <FloatingTech />
        <MouseParticles />

        <Stars
          radius={100}
          depth={80}
          count={2000}
          factor={6}
          saturation={0.8}
          fade
          speed={0.8}
        />

        <Sparkles
          count={150}
          scale={[10, 8, 8]}
          size={5}
          speed={0.5}
          color="#ffffff"
          direction={1}
        />
      </Canvas>
    </div>
  );
}
