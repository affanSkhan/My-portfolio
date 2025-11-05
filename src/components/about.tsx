"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Heart, Brain, Globe, Star } from "lucide-react";
import Image from "next/image";

// Type for about data
type AboutData = {
  name: string;
  title: string;
  location: string;
  roles: string[];
  profileImage: string;
  cv: string;
  bio: string;
};

// --- Typewriter Hook ---
function useTypewriter(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i > text.length) clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);
  return displayed;
}

// --- Particles ---
function FloatingParticles({ count = 12 }) {
  const [pos, setPos] = useState<{ top: number; left: number }[]>([]);

  useEffect(() => {
    setPos(
      Array.from({ length: count }, () => ({
        top: Math.random() * 90,
        left: Math.random() * 90,
      }))
    );
  }, [count]);

  // Don't render anything until positions are set (client-side only)
  if (pos.length === 0) return null;

  return pos.map((p, i) => (
    <motion.span
      key={i}
      className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-emerald-400 opacity-30"
      style={{ top: `${p.top}%`, left: `${p.left}%` }}
      animate={{ y: [0, -8, 0], opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.3 }}
    />
  ));
}

// --- Color Map for Badges ---
const colorMap = {
  indigo: {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-700 dark:text-indigo-200"
  },
  pink: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-700 dark:text-pink-200"
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-700 dark:text-purple-200"
  },
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-200"
  },
  emerald: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-200"
  }
};

export default function About() {
  const [view, setView] = useState<"student" | "entrepreneur">("student");
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch about data from API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/content/about.json");
        if (!response.ok) {
          throw new Error("Failed to fetch about data");
        }
        const data = await response.json();
        setAboutData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const intro = useTypewriter("I'm not just coding my future — I'm engineering a journey from Dharni to global impact.", 30);
  
  const funFacts = [
    "🏆 Topped Dharni Tehsil in MHT‑CET",
    "🎨 Drawing competition runner‑up",
    "♟️ Junior college chess champ",
    "🌐 Trilingual: Hindi, Marathi & English",
  ];

  const studentBio = (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
      <p className="text-indigo-500 font-semibold">🎓 {aboutData?.title || "Computer Engineering Student @ VIIT Pune"}</p>
      <p className="text-zinc-700 dark:text-zinc-300 mt-2">
        {aboutData?.bio || "Exploring AI, ML, and full‑stack development via practical tools like the AI Prompts Lab and CIE Exam App."}
      </p>
    </motion.div>
  );
  const entrepreneurBio = (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
      <p className="text-green-500 font-semibold">🚀 Rural Tech Entrepreneur in the Making</p>
      <p className="text-zinc-700 dark:text-zinc-300 mt-2">
        Building initiatives like &quot;One Area, One App&quot; from Dharni powered by Pune&apos;s tech ecosystem.
      </p>
    </motion.div>
  );

  // Show loading state
  if (loading) {
    return (
      <section id="about" className="relative min-h-[100dvh] py-16 px-4 sm:py-20 sm:px-8 md:px-12 bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-emerald-50 dark:from-zinc-900 dark:to-zinc-950">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-indigo-600 text-xl">Loading about information...</div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section id="about" className="relative min-h-[100dvh] py-16 px-4 sm:py-20 sm:px-8 md:px-12 bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-emerald-50 dark:from-zinc-900 dark:to-zinc-950">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">Error: {error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about"
      className="relative min-h-[100dvh] py-16 px-4 sm:py-20 sm:px-8 md:px-12 bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-emerald-50 dark:from-zinc-900 dark:to-zinc-950">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingParticles count={12} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* ——— Left Column ——— */}
        <div className="w-full lg:w-1/2 space-y-8">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}
            whileHover={{ rotate: [0, 5, -5, 0] }} className="flex justify-center">
            <Image src={aboutData?.profileImage || "/affan-profile1.jpg"} alt={`${aboutData?.name || "Affan"} profile`}
              width={140} height={140} className="rounded-full border-4 border-white dark:border-zinc-800 shadow-lg"
              aria-label={`Photo of ${aboutData?.name || "Affan"}`} />
          </motion.div>

          <motion.ul initial="hidden" animate="visible" variants={{
            visible: { transition: { staggerChildren: 0.1 }},
          }} className="flex flex-wrap gap-2 justify-center">
            {aboutData?.roles.map((role, i) => {
              // Map roles to icons and colors
              const roleConfig = {
                "AI Enthusiast": { icon: Brain, color: "purple" },
                "Flutter Developer": { icon: Sparkles, color: "indigo" },
                "Tech Visionary": { icon: Globe, color: "blue" },
                "Innovative Thinker": { icon: Sparkles, color: "indigo" },
                "Passionate Learner": { icon: Heart, color: "pink" },
                "AI/ML Enthusiast": { icon: Brain, color: "purple" },
                "Global Vision": { icon: Globe, color: "blue" },
                "Purpose Driven": { icon: Star, color: "emerald" },
              };
              
              const config = roleConfig[role as keyof typeof roleConfig] || { icon: Star, color: "indigo" };
              const IconComponent = config.icon;
              const { bg, text } = colorMap[config.color as keyof typeof colorMap];
              
              return (
                <motion.li key={i} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity:1,y:0 } }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full ${bg} ${text}`}>
                  <IconComponent width={16} height={16} aria-hidden />
                  {role}
                </motion.li>
              );
            })}
          </motion.ul>

          <div className="mt-8">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 text-center lg:text-left">
              Hi, I&apos;m {aboutData?.name || "Affan"}!
            </h2>
            <p className="mt-2 text-base text-zinc-700 dark:text-zinc-300 text-center lg:text-left">
              {intro}<span className="inline-block w-1 h-5 bg-zinc-400 ml-1 animate-blink" />
            </p>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <TabButton label="Student" isActive={view === "student"} onClick={() => setView("student")} />
            <TabButton label="Entrepreneur" isActive={view === "entrepreneur"} onClick={() => setView("entrepreneur")} />
          </div>

          <div className="mt-4 min-h-[90px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.35, type: "spring", stiffness: 200, damping: 22 }}
                className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(99,102,241,0.10)" }}
              >
                {view === "student" ? studentBio : entrepreneurBio}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* ——— Right Column ——— */}
        <div className="w-full lg:w-1/2 space-y-8">

          {/* Career Goals */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h3 className="text-xl font-semibold text-indigo-600">🎯 Career Goals</h3>
            <div className="mt-3 space-y-3">
              {[
                { label: "Short‑term", text: "Secure a role in AI/ML or full‑stack development" },
                { label: "Long‑term", text: "Build a rural‑tech startup rooted in innovation" },
              ].map((g, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(99,102,241,0.10)" }}
                  whileTap={{ scale: 0.97, boxShadow: "0 2px 8px rgba(99,102,241,0.08)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <h4 className="font-medium text-zinc-800 dark:text-zinc-200">{g.label}</h4>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-400">{g.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>


          {/* Milestones & Moments */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <h3 className="text-xl font-semibold text-pink-600">✨ Milestones & Moments</h3>
            <motion.ul initial="hidden" animate="visible" variants={{ visible:{ transition: { staggerChildren: 0.2 } } }}
              className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-300">
              {funFacts.map((f,i)=>(
                <motion.li key={i} variants={{ hidden:{opacity:0,x:-20}, visible:{opacity:1,x:0} }}>
                  {f}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>



                    {/* What I Believe */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <h3 className="text-xl font-semibold text-purple-600">🧭 What I Believe In</h3>
            <motion.ul initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
              className="list-disc list-inside mt-3 space-y-1 text-zinc-700 dark:text-zinc-300">
              {["Tech should uplift remote regions",
                "Consistency > Motivation",
                "Learning is lifelong"].map((val,i) => (
                <motion.li key={i} variants={{ hidden:{opacity:0,y:10}, visible:{opacity:1,y:0} }}>
                  {val}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div className="grid grid-cols-3 gap-4 text-center" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}>
            {[
              ["98.94%", "MHT‑CET", "indigo"],
              ["8+", "Projects", "green"],
              ["3", "Awards", "blue"],
            ].map(([v, l, c], i) => (
              <div key={i}>
                <p className={`text-2xl font-bold text-${c}-600`}>{v}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-300">{l}</p>
              </div>
            ))}
          </motion.div>


        </div>

      </div>
    </section>
  );
}

// --- Components ---
function TabButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <motion.button
      aria-label={`Switch to ${label}`}
      onClick={onClick}
      whileHover={{ scale: 1.08, boxShadow: "0 4px 16px rgba(99,102,241,0.15)" }}
      whileTap={{ scale: 0.96 }}
      className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none transition-all duration-200
        ${isActive ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg border-2 border-indigo-400 dark:border-pink-400" :
        "bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 hover:shadow-md border border-transparent"}
      `}
      style={{ position: "relative", zIndex: isActive ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <span className="mr-1">{label === "Student" ? "🎓" : "🚀"}</span>
      {label}
      {isActive && (
        <motion.span
          layoutId="tab-underline"
          className="absolute left-0 right-0 bottom-0 h-1 rounded-b bg-gradient-to-r from-indigo-400 to-pink-400"
          style={{ zIndex: -1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />
      )}
    </motion.button>
  );
}
