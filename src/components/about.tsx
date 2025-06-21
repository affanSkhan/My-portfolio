"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Heart, Brain, Globe, Star } from "lucide-react";
import Image from "next/image";

function useTypewriter(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

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

export default function About() {
  const [view, setView] = useState<"student" | "entrepreneur">("student");
  const intro = "I'm not just coding my future — I'm engineering a journey from Dharni to global impact.";
  const typewriterIntro = useTypewriter(intro, 30);

  const getViewContent = () =>
    view === "student" ? (
      <div className="space-y-3">
        <p className="text-indigo-500 font-semibold">🎓 Computer Engineering Student @ VIIT Pune</p>
        <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">
          Exploring AI, ML, and full-stack development by crafting real-world tools like the CIE Exam Reminder App and a Student Companion App.
        </p>
      </div>
    ) : (
      <div className="space-y-3">
        <p className="text-green-500 font-semibold">🚀 Rural Tech Entrepreneur in the Making</p>
        <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">
          Building tech-first ventures like &quot;One Area, One App&quot; from Dharni, combining local understanding with Pune&apos;s innovation power.
        </p>
      </div>
    );

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-emerald-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 py-24 px-4 sm:px-8"
    >
      {/* Animated Gradient/Blob Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hidden md:block absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-400/30 via-fuchsia-400/20 to-emerald-400/20 blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gradient-to-tr from-pink-400/20 via-blue-400/20 to-indigo-400/20 blur-2xl opacity-50 animate-pulse" />
        <FloatingParticles count={12} />
      </div>
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 bg-white/70 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-xl backdrop-blur-lg"
        >
          <div className="flex justify-center mb-6 relative">
            <Image
              src="/affan-profile.png"
              alt="Affan"
              width={120}
              height={120}
              className="rounded-full border-4 border-white dark:border-zinc-800 shadow-md"
            />
            <span className="absolute inset-0 rounded-full animate-pulse ring-2 ring-indigo-400/30" />
          </div>

          <ul className="flex flex-wrap gap-3 justify-center mb-6 text-sm font-semibold">
            <Badge icon={<Sparkles size={16} />} text="Innovative Thinker" color="indigo" />
            <Badge icon={<Heart size={16} />} text="Passionate Learner" color="pink" />
            <Badge icon={<Brain size={16} />} text="AI/ML Enthusiast" color="purple" />
            <Badge icon={<Globe size={16} />} text="Global Vision" color="blue" />
            <Badge icon={<Star size={16} />} text="Driven by Purpose" color="emerald" />
          </ul>

          <div className="grid grid-cols-3 text-center">
            <Stat value="98.94%" label="MHT-CET" color="indigo" />
            <Stat value="8+" label="Projects Built" color="green" />
            <Stat value="3" label="Awards Won" color="pink" />
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 max-w-xl"
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6 text-center lg:text-left">
            Who is Affan?
          </h2>

          <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 min-h-[2.5rem]">
            {typewriterIntro}
            <span className="inline-block w-1 h-5 bg-zinc-400 ml-1 animate-blink" />
          </p>

          <div className="flex gap-4 mb-6 justify-center lg:justify-start">
            <TabButton label="Student" isActive={view === "student"} onClick={() => setView("student")} />
            <TabButton label="Entrepreneur" isActive={view === "entrepreneur"} onClick={() => setView("entrepreneur")} />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow"
          >
            {getViewContent()}
          </motion.div>

          <div className="mt-10 text-sm text-center italic text-zinc-600 dark:text-zinc-400">
            &quot;Engineering my path from Dharni to Destiny — with code, heart, and a mission.&quot;
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Badge({ icon, text, color }: { icon: React.ReactNode; text: string; color: string }) {
  return (
    <li
      className={`flex items-center gap-2 px-3 py-1 rounded-full bg-${color}-100 dark:bg-${color}-900/30 text-${color}-700 dark:text-${color}-200 transition hover:scale-105`}
    >
      {icon}
      {text}
    </li>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div>
      <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-300">{label}</p>
    </div>
  );
}

function TabButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-medium transition shadow-sm focus:outline-none ${
        isActive
          ? "bg-indigo-600 text-white shadow-md scale-105"
          : "bg-zinc-200 dark:bg-zinc-800 dark:text-white hover:scale-105"
      }`}
    >
      {label === "Student" ? "🎓 " : "🚀 "}
      {label}
    </button>
  );
}
