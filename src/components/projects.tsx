"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiFirebase,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiFlutter
} from "react-icons/si";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Type for project data
type Project = {
  title: string;
  description: string;
  stack: string[];
  year: number;
  links: {
    github?: string;
    live?: string;
  };
  featured: boolean;
  status: string;
  lessons: string[];
};

// Icon mapping for tech stack
const techIcons: Record<string, React.ReactElement> = {
  "Next.js": <SiNextdotjs key="nextjs" />,
  "TypeScript": <SiTypescript key="typescript" />,
  "Tailwind CSS": <SiTailwindcss key="tailwind" />,
  "Firebase": <SiFirebase key="firebase" />,
  "React": <SiReact key="react" />,
  "Flutter": <SiFlutter key="flutter" />,
};

// FloatingParticles component to avoid hydration mismatch
function FloatingParticles({ count = 12 }) {
  const [positions, setPositions] = useState<{top:number;left:number;}[]>([]);
  useEffect(() => {
    setPositions(
      Array.from({ length: count }, () => ({
        top: Math.random() * 90,
        left: Math.random() * 90,
      }))
    );
  }, [count]);
  if (positions.length === 0) return null;
  return positions.map((pos, i) => (
    <motion.span
      key={i}
      className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-emerald-400 opacity-30"
      style={{
        top: `${pos.top}%`,
        left: `${pos.left}%`,
      }}
      animate={{
        y: [0, -10, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: i * 0.2,
      }}
    />
  ));
}

export default function Projects() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from API
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const res = await fetch("/api/content/projects.json");
        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.status}`);
        }
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const handleToggle = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  if (loading) {
    return (
      <motion.section
        id="projects"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-emerald-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 py-24 px-2 sm:px-6"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading projects...</p>
        </div>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section
        id="projects"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-emerald-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 py-24 px-2 sm:px-6"
      >
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-emerald-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 py-24 px-2 sm:px-6"
    >
      {/* Animated Gradient/Blob Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hidden md:block absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-400/30 via-fuchsia-400/20 to-emerald-400/20 blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gradient-to-tr from-pink-400/20 via-blue-400/20 to-indigo-400/20 blur-2xl opacity-50 animate-pulse" />
        <FloatingParticles count={12} />
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Glassmorphism Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-black/70 dark:bg-zinc-900/80 border border-white/30 dark:border-zinc-700/60 shadow-2xl backdrop-blur-2xl px-4 sm:px-10 py-12"
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-center mb-10 relative animate-shimmer"
          >
            🛠️ DIY & Projects Lab ({projects.length} projects)
            <span className="block h-1 w-16 mx-auto mt-2 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 rounded-full animate-pulse" />
          </motion.h2>
          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => {
              const isFlipped = flippedIndex === index;
              return (
                <motion.div
                  key={index}
                  className="w-full h-80 perspective cursor-pointer"
                  style={{ perspective: 1200 }}
                  onClick={() => handleToggle(index)}
                  onMouseEnter={() => setFlippedIndex(index)}
                  onMouseLeave={() => setFlippedIndex(null)}
                  whileHover={{ scale: 1.04, boxShadow: "0 12px 32px 0 rgba(80,80,180,0.18)", rotateX: -4, rotateZ: 1 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.08 * index }}
                >
                  <motion.div
                    className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    style={{ perspective: 1200 }}
                  >
                    {/* FRONT SIDE */}
                    <div className="absolute w-full h-full backface-hidden bg-white/80 dark:bg-zinc-900/80 border border-white/30 dark:border-zinc-700/60 rounded-xl p-6 shadow-xl flex flex-col justify-between backdrop-blur-lg">
                      <div>
                        <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-2">{project.title}</h3>
                        <div className="flex space-x-2 text-xl text-blue-500">
                          {project.stack.map((tech, i) => (
                            <span key={i} className="transition-transform group-hover:scale-125 group-hover:animate-pulse dark:drop-shadow-[0_0_12px_#6366f1cc]" title={tech}>
                              {techIcons[tech] || <span className="text-xs bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded">{tech}</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-zinc-500 mt-4">Tap or hover to flip</p>
                    </div>

                    {/* BACK SIDE */}
                    <div className="absolute w-full h-full rotate-y-180 backface-hidden bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-xl p-6 flex flex-col justify-between shadow-xl backdrop-blur-lg">
                      <div>
                        <p className="mb-3 text-sm">{project.description}</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {project.lessons.map((lesson, id) => (
                            <li key={id}>💡 {lesson}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        {project.links.github && (
                          <a href={project.links.github} target="_blank" className="text-sm underline flex items-center gap-1 transition-transform hover:scale-110 hover:text-indigo-200">
                            <FaGithub /> GitHub
                          </a>
                        )}
                        {project.links.live && (
                          <a href={project.links.live} target="_blank" className="text-sm underline flex items-center gap-1 transition-transform hover:scale-110 hover:text-emerald-200">
                            <FaExternalLinkAlt /> Live
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2.5s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-gradient-move {
          background-size: 400% 400%;
          animation: gradientMove 12s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </motion.section>
  );
}
