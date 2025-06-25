"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { GraduationCap, Rocket, Lightbulb, Award } from "lucide-react";
import { motion } from "framer-motion";

// Dynamically import Player from lottiefiles (client-side only)
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then(mod => mod.Player), {
  ssr: false,
});

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const studentTimeline: TimelineItem[] = [
    {
    year: "2020",
    title: "Won Competitions",
    desc: "Chess & Drawing awards",
    icon: <Award className="text-indigo-600 w-6 h-6" />,
  },
  {
    year: "2023",
    title: "Topped in Taluqa",
    desc: "98.94%ile in MHT-CET",
    icon: <Award className="text-indigo-600 w-6 h-6" />,
  },
  {
    year: "2023",
    title: "Joined VIIT Pune",
    desc: "B.Tech Computer Engg.",
    icon: <GraduationCap className="text-indigo-600 w-6 h-6" />,
  },
  {
    year: "2025",
    title: "CIE Exam App",
    desc: "Real-world project",
    icon: <Lightbulb className="text-indigo-600 w-6 h-6" />,
  },
];

const entrepreneurTimeline: TimelineItem[] = [
  {
    year: "2024",
    title: "One Area One App",
    desc: "Local commerce platform",
    icon: <Rocket className="text-green-500 w-6 h-6" />,
  },
  {
    year: "2025",
    title: "AI Prompts Lab",
    desc: "Solo AI startup",
    icon: <Lightbulb className="text-green-500 w-6 h-6" />,
  },
  {
    year: "2025",
    title: "Muslim.AI Vision",
    desc: "Faith + AI model",
    icon: <Rocket className="text-green-500 w-6 h-6" />,
  },
];

// FloatingParticles component to avoid hydration mismatch
function FloatingParticles({ count = 12 }) {
  const [positions, setPositions] = useState<{ top: number; left: number }[]>([]);
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

export function Resume() {
  const [view, setView] = useState<'student' | 'entrepreneur'>('student');
  const timeline = view === 'student' ? studentTimeline : entrepreneurTimeline;
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  return (
    <motion.section
      id="resume"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative py-20 px-4 sm:px-8 flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-emerald-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900"
    >
      {/* Animated Gradient/Blob Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hidden md:block absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-400/30 via-fuchsia-400/20 to-emerald-400/20 blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gradient-to-tr from-pink-400/20 via-blue-400/20 to-indigo-400/20 blur-2xl opacity-50 animate-pulse" />
        {isClient && <FloatingParticles count={12} />}
      </div>
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* Glassy Lottie Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 rounded-2xl bg-white/60 dark:bg-zinc-900/70 backdrop-blur-xl shadow-xl border border-white/30 dark:border-zinc-700/60 px-6 py-6 flex flex-col items-center"
        >
          <Player
            autoplay
            loop
            src="/my-journey-animation.json"
            style={{ height: "72px", width: "72px", margin: "0 auto", filter: "drop-shadow(0 4px 24px #a5b4fc88)" }}
          />
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-3xl font-bold text-center mb-0 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 relative animate-textShimmer"
          >
            My Journey
            <span className="block h-1 w-16 mx-auto mt-2 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 rounded-full animate-pulse" />
          </motion.h2>
          <p className="mt-2 text-center text-zinc-600 dark:text-zinc-300 text-base sm:text-sm max-w-xl mx-auto">
            A quick look at my academic and entrepreneurial milestones, achievements, and projects—each step shaping my journey in tech and innovation.
          </p>
        </motion.div>
        {/* Animated Tabs for View */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            className={`px-5 py-2 text-sm font-semibold rounded-full transition shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/40 dark:focus:ring-indigo-600/40 focus-visible:ring-4 focus-visible:ring-indigo-400/60 dark:focus-visible:ring-indigo-600/60 ${
              view === 'student'
                ? 'bg-indigo-600 text-white scale-105 shadow-lg'
                : 'bg-gray-200 dark:bg-zinc-700 dark:text-white hover:scale-105'
            }`}
            onClick={() => setView('student')}
            aria-label="Show student timeline"
            tabIndex={0}
          >
            Student View
          </button>
          <button
            className={`px-5 py-2 text-sm font-semibold rounded-full transition shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400/40 dark:focus:ring-green-600/40 focus-visible:ring-4 focus-visible:ring-green-400/60 dark:focus-visible:ring-green-600/60 ${
              view === 'entrepreneur'
                ? 'bg-green-600 text-white scale-105 shadow-lg'
                : 'bg-gray-200 dark:bg-zinc-700 dark:text-white hover:scale-105'
            }`}
            onClick={() => setView('entrepreneur')}
            aria-label="Show entrepreneur timeline"
            tabIndex={0}
          >
            Entrepreneur View
          </button>
        </div>
        {/* Responsive Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col items-center"
        >
          {/* Timeline area with border/shadow for depth */}
          <div className="relative w-full py-20 sm:py-16 md:py-8 lg:py-12 xl:py-20">
            {/* Timeline line: horizontal on md+, vertical on mobile */}
            <div
              className="absolute md:top-1/2 md:left-0 md:w-full md:h-2 top-0 left-1/2 w-2 h-full bg-gradient-to-r md:bg-gradient-to-r bg-gradient-to-b from-indigo-400 via-fuchsia-400 to-emerald-400 opacity-70 z-0 rounded-full shadow-lg"
              style={{ transform: 'md:translateY(-50%) translateX(-50%)' }}
            />
            <motion.div
              className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-12 md:gap-0"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.25 } },
                hidden: {},
              }}
            >
              {timeline.map((item, i) => {
                const isAbove = i % 2 === 0;
                const isFirst = i === 0;
                const isLast = i === timeline.length - 1;
                return (
                  <motion.div
                    key={i}
                    className={`relative flex flex-col items-center md:w-1/4 z-10 group focus-within:ring-4 focus-within:ring-indigo-400/40 focus-within:rounded-2xl ${isFirst ? 'mt-0' : 'mt-12'} ${isLast ? 'mb-0' : 'mb-12'} md:mt-0 md:mb-0`}
                    tabIndex={0}
                    aria-label={item.title + ' - ' + item.year}
                    variants={{
                      visible: { opacity: 1, x: 0, y: 0 },
                      hidden: { opacity: 0, x: -40, y: isAbove ? -40 : 40 },
                    }}
                    transition={{ duration: 0.7, type: "spring" }}
                  >
                    {/* Timeline card */}
                    <motion.div
                      whileHover={{ scale: 1.045, boxShadow: "0 8px 32px 0 rgba(99,102,241,0.10), 0 1.5px 8px 0 rgba(99,102,241,0.08)" }}
                      whileTap={{ scale: 0.98 }}
                      tabIndex={0}
                      aria-label={item.title + ' - ' + item.year}
                      className={`bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl shadow-lg border border-white/40 dark:border-zinc-700/70 px-4 py-4 rounded-xl transition-all duration-300 group-hover:scale-105 w-full sm:w-64 md:w-48 xl:w-64 md:${isAbove ? 'mb-10 bottom-full' : 'mt-10 top-full'} md:static focus:outline-none focus:ring-4 focus:ring-indigo-400/40`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {item.icon}
                        <h4 className="text-base sm:text-sm font-semibold text-zinc-800 dark:text-white">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-1">
                        {item.desc}
                      </p>
                      <span className="text-xs text-indigo-400 dark:text-indigo-300">
                        {item.year}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}