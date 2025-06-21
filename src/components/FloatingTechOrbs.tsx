// "use client";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Float, Html } from "@react-three/drei";
// import { skills } from "./skillsData";
// import { Suspense } from "react";

// const orbColors = [
//   "#6366f1", // indigo
//   "#f59e42", // orange
//   "#38bdf8", // sky
//   "#fbbf24", // yellow
//   "#22d3ee", // cyan
//   "#f472b6", // pink
//   "#10b981", // green
//   "#ef4444", // red
//   "#a78bfa", // purple
//   "#facc15", // gold
// ];

// type TechOrbProps = {
//   position: [number, number, number];
//   color: string;
//   label: string;
//   onClick: () => void;
// };

// function TechOrb({ position, color, label, onClick }: TechOrbProps) {
//   return (
//     <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
//       <mesh position={position} onClick={onClick} castShadow>
//         <sphereGeometry args={[0.5, 32, 32]} />
//         <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
//         <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
//           <span style={{ color: color, fontWeight: 700, fontSize: 16, textShadow: "0 2px 8px #0008" }}>{label}</span>
//         </Html>
//       </mesh>
//     </Float>
//   );
// }

// export default function FloatingTechOrbs() {
//   return (
//     <div style={{ width: 500, height: 350 }}>
//       <Canvas camera={{ position: [0, 0, 6], fov: 50 }} shadows>
//         <ambientLight intensity={0.7} />
//         <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
//         <Suspense fallback={null}>
//           {skills.map((skill, i) => (
//             <TechOrb
//               key={skill.name}
//               position={[
//                 Math.sin((i / skills.length) * Math.PI * 2) * 2.5,
//                 Math.cos((i / skills.length) * Math.PI * 2) * 1.5,
//                 (i % 2 === 0 ? 1 : -1) * 0.7
//               ]}
//               color={orbColors[i % orbColors.length]}
//               label={skill.name}
//               onClick={() => alert(`You clicked ${skill.name}`)}
//             />
//           ))}
//         </Suspense>
//         <OrbitControls enablePan={false} enableZoom={false} />
//       </Canvas>
//     </div>
//   );
// } 