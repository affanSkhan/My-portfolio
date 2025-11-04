// components/SkillsDashboard.tsx

"use client";

import { useState, useEffect } from "react";
import SkillCard from "./SkillCard";
import { motion } from "framer-motion";
import { FaLayerGroup, FaCode, FaDatabase, FaTools, FaRobot, FaAsterisk, FaMobile } from "react-icons/fa";
import React from "react";

// Type for skill data
type Skill = {
  name: string;
  iconName: string;
  colorClass: string;
  category: string;
  level: number;
};
// import FloatingTechOrbs from "./FloatingTechOrbs";

const categoryIcons: Record<string, React.ReactNode> = {
  All: <FaAsterisk className="text-indigo-400" />,
  Frontend: <FaCode className="text-pink-400" />,
  Backend: <FaLayerGroup className="text-green-400" />,
  Mobile: <FaMobile className= "text-yellow-400" />,
  "AI/ML": <FaRobot className="text-purple-400" />,
  Databases: <FaDatabase className="text-blue-400" />,
  Tools: <FaTools className="text-emerald-400" />,
};

// FloatingParticles component to avoid hydration mismatch
function FloatingParticles({ count = 12 }) {
  const [positions, setPositions] = useState<{top:number;left:number;}[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setPositions(
        Array.from({ length: count }, () => ({
          top: Math.random() * 90,
          left: Math.random() * 90,
        }))
      );
    }
  }, [count, mounted]);

  if (!mounted || positions.length === 0) return null;
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

export default function SkillsDashboard() {
  const [filter, setFilter] = useState("All");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch skills from API
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/content/skills.json");
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const categories = ["All", "Frontend", "Backend", "Mobile", "AI/ML", "Databases", "Tools"];

  const filteredSkills =
    filter === "All" ? skills : skills.filter((s: Skill) => s.category === filter);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading skills...</div>
      </div>
    );
  }

  // Show error state  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">Error: {error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.section
      id="skills"
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
        {mounted && <FloatingParticles count={12} />}
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Glassmorphism Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-white/70 dark:bg-zinc-900/80 border border-white/30 dark:border-zinc-700/60 shadow-2xl backdrop-blur-2xl px-4 sm:px-10 py-12"
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-center mb-10 relative animate-shimmer"
          >
            Tech Skills Dashboard
            <span className="block h-1 w-16 mx-auto mt-2 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 rounded-full animate-pulse" />
          </motion.h2>
          {/* Category Filter */}
          <div className="flex justify-center gap-3 flex-wrap mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400/30 dark:focus:ring-indigo-600/30 backdrop-blur-md border border-white/20 dark:border-zinc-700/40 ${
                  filter === cat
                    ? "bg-indigo-600 text-white scale-105 shadow-lg"
                    : "bg-white/60 dark:bg-zinc-800/60 text-zinc-700 dark:text-white hover:scale-105"
                }`}
                onClick={() => setFilter(cat)}
                style={{ WebkitTapHighlightColor: "transparent" }}
                aria-label={cat}
              >
                {categoryIcons[cat]}
                {cat}
              </button>
            ))}
          </div>
          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {filteredSkills.map((skill: Skill, index: number) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
      {/* Extra styles for shimmer, blink, animated gradient, and noise */}
      <style jsx>{`
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