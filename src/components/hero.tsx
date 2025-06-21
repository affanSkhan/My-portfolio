"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";

const roles = ["AI Enthusiast", "Flutter Developer", "Tech Visionary"];

function useTypewriter(text: string, speed = 60) {
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

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const textParallax = { x: parallax.x * 0.3, y: parallax.y * 0.3 };
  const role = roles[currentRole];
  const typewriterRole = useTypewriter(role, 40);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500 + role.length * 40);
    return () => clearInterval(interval);
  }, [role]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    setParallax({ x, y });
  };

  const splineScene = "/scene (2).splinecode";

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-800 scroll-snap-start"
      onMouseMove={handleMouseMove}
      style={{ WebkitOverflowScrolling: "touch", paddingTop: 0, marginTop: 0 }}
    >
      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
        <div className="w-full h-full bg-gradient-to-tr from-blue-500/10 via-fuchsia-500/10 to-emerald-400/10 animate-gradient-move dark:hidden" />
        <div className="hidden dark:block w-full h-full bg-gradient-to-tr from-indigo-950/40 via-purple-950/30 to-zinc-900/30 animate-gradient-move" />
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Fullscreen background spline */}
      <div
        className="absolute inset-0 z-0 w-full h-full overflow-hidden"
        style={{
          transform: `rotateY(${parallax.x}deg) rotateX(${-parallax.y}deg)`,
          transition: "transform 0.2s",
        }}
      >
        <div className="absolute inset-0 w-full h-full z-0">
          <Spline scene={splineScene} />
        </div>
      </div>

      {/* Foreground content */}
      <motion.div
        className="z-20 text-center px-4 sm:px-6 max-w-3xl mx-auto"
        style={{
          transform: `translate3d(${textParallax.x}px, ${textParallax.y}px, 0)`,
          transition: "transform 0.2s",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-fuchsia-400 to-emerald-400 relative inline-block drop-shadow-lg animate-shimmer dark:drop-shadow-[0_0_32px_#6366f1cc]"
        >
          I&apos;m <span className="text-white bg-none">Affan</span>
          <span className="absolute left-0 top-0 w-full h-full shimmer" aria-hidden />
        </motion.h1>

        <motion.p
          key={currentRole}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.8 }}
          className="mt-4 text-xl md:text-3xl text-zinc-300 font-mono h-12 min-h-[2.5rem]"
          aria-live="polite"
        >
          {typewriterRole}
          <span className="inline-block w-2 h-6 bg-zinc-300 ml-1 animate-blink align-middle rounded-sm" />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8 flex justify-center"
        >
          <button
            className="relative group bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 focus:outline-none overflow-hidden dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:shadow-[0_0_24px_#6366f1cc] dark:ring-2 dark:ring-indigo-400/40 dark:ring-offset-2 dark:ring-offset-zinc-900"
            onClick={() => window.open('/cv.pdf', '_blank')}
            tabIndex={0}
            aria-label="Download my CV"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="transition-transform group-hover:-translate-y-1 group-hover:scale-110 duration-200">📄</span>
              Download My CV
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:scale-125 duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </span>
            <span className="absolute inset-0 group-active:scale-125 group-active:opacity-40 transition-all duration-300 bg-white/30 rounded-full pointer-events-none" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-12 backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30 shadow-2xl max-w-sm mx-auto relative dark:bg-zinc-900/60 dark:border-zinc-100/10 dark:shadow-[0_8px_40px_#6366f1cc] dark:backdrop-blur-2xl"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-fit mx-auto"
          >
            <Image
              src="/affan-profile.png"
              alt="Affan's Profile"
              width={120}
              height={120}
              className="rounded-full border-4 border-white shadow-xl mx-auto mb-4 bg-white/40"
            />
          </motion.div>
          <p className="text-white text-lg font-medium">Computer Engineering Student</p>
          <p className="text-zinc-300 text-sm">VIIT Pune | Rooted in Dharni</p>
        </motion.div>
      </motion.div>

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Custom Animations */}
      <style jsx>{`
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2.5s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          pointer-events: none;
        }
        .animate-blink {
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-gradient-move {
          background-size: 400% 400%;
          animation: gradientMove 12s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
