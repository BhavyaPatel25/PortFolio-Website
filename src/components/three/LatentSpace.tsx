import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Deterministic PRNG so the cloud shape is stable across reloads.   */
/* ------------------------------------------------------------------ */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COLOR_BASE = new THREE.Color('#46413a'); // warm dim slate
const COLOR_HOT = new THREE.Color('#c6f24e'); // acid lime
const COLOR_EDGE = new THREE.Color('#c6f24e');

/* ------------------------------------------------------------------ */
/*  The particle cloud + connection graph.                            */
/* ------------------------------------------------------------------ */
type CloudProps = { count: number; reduced: boolean };

function PointCloud({ count, reduced }: CloudProps) {
  const group = useRef<THREE.Group>(null!);
  const { viewport, pointer } = useThree();

  // Build positions, scales, neighbour edges once.
  const { positions, scales, edges } = useMemo(() => {
    const rng = mulberry32(20260627);
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const pts: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      // Distribute in a flattened sphere -> feels like a latent manifold.
      const r = 2.2 + rng() * 1.8;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi);
      pts.push(new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]));
      scales[i] = 0.6 + rng() * 1.4;
    }

    // 2 nearest neighbours per point, deduped.
    const edgeSet = new Set<string>();
    const edgeList: number[] = [];
    for (let i = 0; i < count; i++) {
      const a = pts[i];
      const dists: { j: number; d: number }[] = [];
      for (let j = 0; j < count; j++) {
        if (i === j) continue;
        dists.push({ j, d: a.distanceToSquared(pts[j]) });
      }
      dists.sort((p, q) => p.d - q.d);
      for (let k = 0; k < 2; k++) {
        const j = dists[k].j;
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edgeList.push(i, j);
        }
      }
    }
    const edges = new Float32Array(edgeList.length * 3);
    for (let e = 0; e < edgeList.length; e++) {
      const idx = edgeList[e];
      edges[e * 3] = positions[idx * 3];
      edges[e * 3 + 1] = positions[idx * 3 + 1];
      edges[e * 3 + 2] = positions[idx * 3 + 2];
    }
    return { positions, scales, edges };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
      uSize: { value: 18 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColorBase: { value: COLOR_BASE },
      uColorHot: { value: COLOR_HOT },
    }),
    [],
  );

  const targetRot = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    // Map pointer to a 3D cursor point on the z=0 plane in world space.
    const mx = pointer.x * viewport.width * 0.5;
    const my = pointer.y * viewport.height * 0.5;
    uniforms.uMouse.value.set(mx, my, 0);
    uniforms.uTime.value += delta;

    if (!reduced) {
      targetRot.current.y = pointer.x * 0.5;
      targetRot.current.x = -pointer.y * 0.35;
      g.rotation.y += delta * 0.06; // slow auto-rotation
    }

    g.rotation.x += (targetRot.current.x - g.rotation.x) * 0.05;
    g.rotation.z += (targetRot.current.y * 0.1 - g.rotation.z) * 0.05;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        </bufferGeometry>
        <shaderMaterial
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader={/* glsl */ `
            attribute float aScale;
            uniform float uTime;
            uniform vec3 uMouse;
            uniform float uSize;
            uniform float uPixelRatio;
            varying float vDist;
            void main() {
              vec3 p = position;
              p += normalize(p + vec3(0.001)) * sin(uTime * 0.6 + p.x * 1.5) * 0.04;
              vec4 mv = modelViewMatrix * vec4(p, 1.0);
              vDist = distance(p, uMouse);
              gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
              gl_Position = projectionMatrix * mv;
            }
          `}
          fragmentShader={/* glsl */ `
            uniform vec3 uColorBase;
            uniform vec3 uColorHot;
            varying float vDist;
            void main() {
              vec2 uv = gl_PointCoord - 0.5;
              float d = length(uv);
              if (d > 0.5) discard;
              float alpha = smoothstep(0.5, 0.0, d);
              float heat = smoothstep(2.6, 0.0, vDist);
              vec3 col = mix(uColorBase, uColorHot, heat);
              gl_FragColor = vec4(col, alpha * (0.35 + heat * 0.65));
            }
          `}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={COLOR_EDGE}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  The live WebGL scene. Mount only when WebGL is supported and      */
/*  motion is allowed — this is what gets code-split / lazy-loaded.   */
/* ------------------------------------------------------------------ */
export default function LatentSpaceScene({
  count,
  reduced,
  className = '',
}: {
  count: number;
  reduced: boolean;
  className?: string;
}) {
  const [visible, setVisible] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        frameloop={visible ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <PointCloud count={count} reduced={reduced} />
      </Canvas>
    </div>
  );
}
