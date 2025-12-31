import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  
  const nodePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const count = 60;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.5 + Math.random() * 1.5;
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
        if (dist < 2 && Math.random() > 0.6) {
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
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={pos}>
            <sphereGeometry args={[0.04 + Math.random() * 0.03, 16, 16]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#00D9FF" : i % 3 === 1 ? "#8B5CF6" : "#00D9FF"}
              emissive={i % 3 === 0 ? "#00D9FF" : "#8B5CF6"}
              emissiveIntensity={0.8}
            />
          </mesh>
        </Float>
      ))}
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
          <lineBasicMaterial color="#00D9FF" transparent opacity={0.2} />
        </line>
      ))}
    </group>
  );
}

function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#0a0f1a"
          wireframe
          emissive="#00D9FF"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#00D9FF"
          transparent
          opacity={0.1}
          emissive="#00D9FF"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function NeuralNetwork() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00D9FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        
        <CoreSphere />
        <NetworkNodes />
        <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
