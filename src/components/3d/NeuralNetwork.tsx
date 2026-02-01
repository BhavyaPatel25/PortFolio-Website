import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Animated particles representing data flow
function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 150;
  
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Create particles in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 3 + Math.random() * 2;
      
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);
      
      // Random velocities for flowing effect
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, velocities };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3] += velocities[i3];
        pos[i3 + 1] += velocities[i3 + 1];
        pos[i3 + 2] += velocities[i3 + 2];
        
        // Keep particles in bounds
        const dist = Math.sqrt(pos[i3] ** 2 + pos[i3 + 1] ** 2 + pos[i3 + 2] ** 2);
        if (dist > 5) {
          pos[i3] = positions[i3];
          pos[i3 + 1] = positions[i3 + 1];
          pos[i3 + 2] = positions[i3 + 2];
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00D9FF"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const nodePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const count = 50;
    
    // Create nodes in strategic clusters
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2 + Math.random() * 2;
      positions.push([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ]);
    }
    return positions;
  }, []);

  const connections = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = Math.sqrt(
          Math.pow(nodePositions[i][0] - nodePositions[j][0], 2) +
          Math.pow(nodePositions[i][1] - nodePositions[j][1], 2) +
          Math.pow(nodePositions[i][2] - nodePositions[j][2], 2)
        );
        if (dist < 2.5 && Math.random() > 0.65) {
          lines.push([
            new THREE.Vector3(...nodePositions[i]),
            new THREE.Vector3(...nodePositions[j]),
          ]);
        }
      }
    }
    return lines;
  }, [nodePositions]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary nodes */}
      {nodePositions.map((pos, i) => {
        const isHighlighted = i % 7 === 0;
        return (
          <Float key={i} speed={1.5 + Math.random() * 0.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <mesh position={pos}>
              <sphereGeometry args={[isHighlighted ? 0.08 : 0.035 + Math.random() * 0.025, 32, 32]} />
              <meshStandardMaterial
                color={isHighlighted ? "#FF006E" : i % 2 === 0 ? "#00D9FF" : "#8B5CF6"}
                emissive={isHighlighted ? "#FF006E" : i % 2 === 0 ? "#00D9FF" : "#8B5CF6"}
                emissiveIntensity={isHighlighted ? 1.2 : 0.6}
                metalness={0.4}
                roughness={0.3}
              />
            </mesh>
            {isHighlighted && (
              <mesh position={pos}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial
                  color="#FF006E"
                  emissive="#FF006E"
                  emissiveIntensity={0.3}
                  wireframe
                  transparent
                  opacity={0.3}
                />
              </mesh>
            )}
          </Float>
        );
      })}
      
      {/* Connection lines with gradient effect */}
      {connections.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...line[0].toArray(), ...line[1].toArray()])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color={Math.random() > 0.5 ? "#00D9FF" : "#8B5CF6"} 
            transparent 
            opacity={0.3}
            linewidth={2}
          />
        </line>
      ))}
    </group>
  );
}

// Rotating AI core - represents neural network heart
function AICore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const torousRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
    }
    if (torousRef.current) {
      torousRef.current.rotation.z = state.clock.elapsedTime * 0.3;
      torousRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.8}>
      {/* Central octahedron - represents AI processing */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.8, 3]} />
        <meshStandardMaterial
          color="#FF006E"
          emissive="#FF006E"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Wireframe sphere */}
      <mesh>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshStandardMaterial
          color="#00D9FF"
          wireframe
          emissive="#00D9FF"
          emissiveIntensity={0.4}
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Rotating torus - represents data flow */}
      <mesh ref={torousRef}>
        <torusGeometry args={[1.6, 0.15, 16, 100]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.6}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
}

export default function NeuralNetwork() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting for dramatic effect */}
        <ambientLight intensity={0.25} />
        <pointLight position={[15, 15, 15]} intensity={1.2} color="#00D9FF" />
        <pointLight position={[-12, -12, -8]} intensity={0.8} color="#8B5CF6" />
        <pointLight position={[0, 10, 0]} intensity={0.6} color="#FF006E" />
        
        {/* Main components */}
        <AICore />
        <NetworkNodes />
        <DataParticles />
        
        {/* Enhanced starfield */}
        <Stars 
          radius={80} 
          depth={60} 
          count={1500} 
          factor={5} 
          saturation={0.5} 
          fade 
          speed={0.5} 
        />
      </Canvas>
    </div>
  );
}
