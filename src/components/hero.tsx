"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";

// Lazy-load Spline to prevent hydration issues
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

const roles = ["AI Enthusiast", "Flutter Developer","Tech Visionary"];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-800">
      
      {/* Background 3D Model */}
      <div className="absolute inset-0 z-0 scale-[1.3] sm:scale-100">
        <Spline scene="/scene (2).splinecode" />
      </div>

      {/* Text Overlay Content */}
      <div className="z-10 text-center px-6 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
        >
          I&apos;m <span className="text-blue-400">Affan</span>
        </motion.h1>

        <motion.p
          key={currentRole}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.8 }}
          className="mt-4 text-xl md:text-3xl text-zinc-300 font-mono h-12"
        >
          {roles[currentRole]}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8"
        >
        {/* Download Button */}
        <div className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform hover:scale-105">

          <a
            href="/cv.pdf"
            download
          >
            📄 Download My CV
          </a>
        </div>
        </motion.div>

        {/* Glass Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-12 backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/30 shadow-xl max-w-sm mx-auto"
        >
          <Image
            src="/affan-profile.png"
            alt="Affan's Profile"
            width={120}
            height={120}
            className="rounded-full border-4 border-white shadow-xl mx-auto mb-4"
          />
          <p className="text-white text-lg font-medium">Computer Engineering Student</p>
          <p className="text-zinc-300 text-sm">VIIT Pune | Rooted in Dharni</p>
        </motion.div>
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0" />
    </section>
  );
}
