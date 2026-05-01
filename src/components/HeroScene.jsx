import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function ConnectionLine({ start, end }) {
  const geometry = useMemo(() => {
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute([...start, ...end], 3));
    return lineGeometry;
  }, [start, end]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#20f3ff" transparent opacity={0.28} toneMapped={false} />
    </line>
  );
}

function NeuralCore() {
  const group = useRef();
  const core = useRef();

  const nodes = useMemo(
    () => [
      [-1.2, 0.84, 0.18],
      [-0.74, -0.92, 0.46],
      [-0.2, 1.18, -0.52],
      [0.48, -1.1, -0.32],
      [1.1, 0.7, 0.26],
      [0.86, -0.04, 0.94],
      [-0.94, 0.05, -0.86],
      [0.08, 0.08, 1.12],
      [0.15, -0.12, -1.14],
      [-1.34, -0.36, -0.18],
      [1.3, -0.46, -0.1],
      [0.0, 1.38, 0.08],
      [0.0, -1.38, 0.06],
    ],
    [],
  );

  const links = useMemo(
    () => [
      [0, 2],
      [0, 6],
      [0, 7],
      [1, 3],
      [1, 6],
      [1, 12],
      [2, 4],
      [2, 11],
      [3, 5],
      [3, 12],
      [4, 5],
      [4, 10],
      [5, 7],
      [6, 8],
      [7, 10],
      [8, 9],
      [9, 12],
      [10, 12],
      [11, 2],
      [11, 4],
    ],
    [],
  );

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    if (!group.current || !core.current) return;

    group.current.rotation.y += delta * 0.16;
    group.current.rotation.x = Math.sin(elapsed * 0.45) * 0.08 + state.pointer.y * 0.1;
    group.current.rotation.z = state.pointer.x * 0.07;
    group.current.position.y = Math.sin(elapsed * 1.1) * 0.08;
    core.current.rotation.y -= delta * 0.28;
    core.current.rotation.x += delta * 0.18;
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.78, 1]} />
        <meshStandardMaterial
          color="#142949"
          emissive="#20f3ff"
          emissiveIntensity={0.42}
          roughness={0.28}
          metalness={0.68}
          transparent
          opacity={0.86}
        />
      </mesh>

      <mesh>
        <boxGeometry args={[2.05, 2.05, 2.05, 3, 3, 3]} />
        <meshBasicMaterial color="#20f3ff" transparent opacity={0.24} wireframe toneMapped={false} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.36, 0.008, 8, 160]} />
        <meshBasicMaterial color="#8c5cff" transparent opacity={0.76} toneMapped={false} />
      </mesh>
      <mesh rotation={[0.25, Math.PI / 2, 0.35]}>
        <torusGeometry args={[1.52, 0.006, 8, 160]} />
        <meshBasicMaterial color="#2f7dff" transparent opacity={0.54} toneMapped={false} />
      </mesh>

      {links.map(([from, to]) => (
        <ConnectionLine key={`${from}-${to}`} start={nodes[from]} end={nodes[to]} />
      ))}

      {nodes.map((position, index) => (
        <mesh key={position.join('-')} position={position}>
          <sphereGeometry args={[index % 4 === 0 ? 0.06 : 0.042, 14, 14]} />
          <meshStandardMaterial
            color={index % 3 === 0 ? '#8c5cff' : '#20f3ff'}
            emissive={index % 3 === 0 ? '#8c5cff' : '#20f3ff'}
            emissiveIntensity={0.72}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight position={[3.8, 3.2, 3.6]} intensity={2.5} color="#20f3ff" />
      <pointLight position={[-3.4, -2.4, 2.4]} intensity={1.8} color="#8c5cff" />
      <spotLight position={[0, 4, 5]} angle={0.32} penumbra={0.7} intensity={1.2} color="#ffffff" />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="pointer-events-auto absolute inset-0">
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 5.6], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        onCreated={({ gl }) => {
          gl.domElement.id = 'portfolio-scene';
          gl.setClearColor('#000000', 0);
        }}
      >
        <SceneLights />
        <NeuralCore />
      </Canvas>
    </div>
  );
}
