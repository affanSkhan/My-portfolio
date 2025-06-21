"use client";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Text3D, Float, Environment, Center } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

// Use a public or local typeface.json font file
const fontUrl = "/fonts/helvetiker_regular.typeface.json"; // Place this file in public/fonts/

function AnimatedText3D() {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Animate emissive and scale
  useFrame((state) => {
    if (mesh.current) {
      const t = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(t * 2) * 0.04 + (hovered ? 0.08 : 0);
      mesh.current.scale.set(scale, scale, scale);
      // Parallax tilt
      mesh.current.rotation.x = parallax.y * 0.2;
      mesh.current.rotation.y = parallax.x * 0.2;
      // Animate emissive color
      const color = new THREE.Color().setHSL(0.6 + 0.2 * Math.sin(t), 0.7, 0.6);
      if (mesh.current.material && 'emissive' in mesh.current.material) {
        (mesh.current.material as THREE.MeshPhysicalMaterial).emissive = color;
      }
    }
  });

  // Mouse parallax
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    const x = (e.point.x / 4);
    const y = (e.point.y / 2);
    setParallax({ x, y });
  };
  const handlePointerOut = () => setParallax({ x: 0, y: 0 });

  return (
    <Center>
      <Text3D
        ref={mesh}
        font={fontUrl}
        size={1.2}
        height={0.3}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.04}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        onPointerOver={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        {`I'm Affan`}
        <meshPhysicalMaterial
          color="#fff"
          metalness={0.7}
          roughness={0.15}
          clearcoat={0.7}
          clearcoatRoughness={0.1}
          reflectivity={0.7}
          transmission={0.4}
          ior={1.3}
          thickness={0.5}
          emissive="#4f46e5"
          emissiveIntensity={0.5}
        />
      </Text3D>
    </Center>
  );
}

export default function ThreeDHeadline() {
  return (
    <div style={{ width: "100%", height: 220, position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} style={{ background: "none" }} shadows>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[0, 5, 10]}
          angle={0.35}
          penumbra={0.7}
          intensity={2.2}
          color="#6366f1"
          castShadow
        />
        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.7}>
            <AnimatedText3D />
          </Float>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
} 