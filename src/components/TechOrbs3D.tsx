// "use client";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Float, Html } from "@react-three/drei";
// import { useRef } from "react";
// import type { Mesh } from "three";
// import styles from "./TechOrbs3D.module.css";

// const techs = [
//   { name: "React", color: "#61dafb", icon: "⚛️" },
//   { name: "Next.js", color: "#000", icon: "⏭️" },
//   { name: "Tailwind", color: "#38bdf8", icon: "🌊" },
//   { name: "Firebase", color: "#ffcb2b", icon: "🔥" },
//   { name: "Python", color: "#3776ab", icon: "🐍" },
//   { name: "C++", color: "#00599c", icon: "💻" },
// ];

// interface TechOrbProps {
//   position: [number, number, number];
//   color: string;
//   icon: string;
//   name: string;
// }

// function TechOrb({ position, color, icon, name }: TechOrbProps) {
//   const mesh = useRef<Mesh>(null);
//   return (
//     <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
//       <mesh ref={mesh} position={position} castShadow>
//         <sphereGeometry args={[0.5, 32, 32]} />
//         <meshStandardMaterial color={color} />
//         <Html center distanceFactor={8} className={styles.orbLabel}>
//           <span title={name}>{icon}</span>
//         </Html>
//       </mesh>
//     </Float>
//   );
// }

// export default function TechOrbs3D() {
//   return (
//     <div className={styles.orbsContainer}>
//       <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
//         <ambientLight intensity={0.7} />
//         <directionalLight position={[5, 5, 5]} intensity={0.7} />
//         {techs.map((tech, i) => (
//           <TechOrb
//             key={tech.name}
//             position={[Math.cos((i / techs.length) * Math.PI * 2) * 2, Math.sin((i / techs.length) * Math.PI * 2) * 1, 0]}
//             color={tech.color}
//             icon={tech.icon}
//             name={tech.name}
//           />
//         ))}
//         <OrbitControls enableZoom={false} enablePan={false} />
//       </Canvas>
//     </div>
//   );
// } 