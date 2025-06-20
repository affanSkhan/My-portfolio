"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Heart, Brain, Globe, Star } from "lucide-react";
import Image from "next/image";

export default function About() {
  const [view, setView] = useState<"student" | "entrepreneur">("student");

  const getViewContent = () => {
    if (view === "student") {
      return (
        <div className="space-y-4">
          <p className="text-pink-600 font-semibold">🎓 Computer Engineering Student @ VIIT Pune</p>
          <p className="text-zinc-800 dark:text-zinc-200">
            I’m mastering AI, ML, and full-stack development — not just through books, but by building real-world applications like the CIE Exam Reminder App and a Student Services Companion.
          </p>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        <p className="text-green-600 font-semibold">🚀 Aspiring Entrepreneur from Dharni</p>
        <p className="text-zinc-800 dark:text-zinc-200">
          My vision is clear — build a rural startup that empowers people in Dharni through tech-driven platforms like “One Area, One App,” crafted with Pune’s resources and grassroots understanding.
        </p>
      </div>
    );
  };

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-8 md:px-16 bg-gradient-to-b from-white to-blue-50 dark:from-zinc-900 dark:to-zinc-800"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Image
            src="/affan-profile.png"
            alt="Affan's Profile"
            width={120}
            height={120}
            className="mx-auto rounded-full border-4 border-indigo-500 shadow-lg"
          />
        </motion.div>

        {/* Section Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ✨ Who is Affan?
        </motion.h2>

        {/* Section Intro */}
        <motion.p
          className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          I&apos;m not just coding my future — I&apos;m engineering a journey from Dharni to global impact.
        </motion.p>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setView("student")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              view === "student"
                ? "bg-indigo-600 text-white"
                : "bg-zinc-200 dark:bg-zinc-700 dark:text-white"
            }`}
          >
            🎓 Student
          </button>
          <button
            onClick={() => setView("entrepreneur")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              view === "entrepreneur"
                ? "bg-green-600 text-white"
                : "bg-zinc-200 dark:bg-zinc-700 dark:text-white"
            }`}
          >
            🚀 Entrepreneur
          </button>
        </div>

        {/* View Content */}
        <motion.div
          className="text-left rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-xl border border-zinc-200 dark:border-zinc-700"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {getViewContent()}

          <ul className="mt-6 space-y-3 text-zinc-700 dark:text-zinc-300">
            <li className="flex items-center gap-2">
              <Sparkles className="text-yellow-500" size={18} /> Innovative Thinker
            </li>
            <li className="flex items-center gap-2">
              <Heart className="text-red-500" size={18} /> Passionate Learner
            </li>
            <li className="flex items-center gap-2">
              <Brain className="text-purple-500" size={18} /> AI & ML Enthusiast
            </li>
            <li className="flex items-center gap-2">
              <Globe className="text-blue-500" size={18} /> Global Vision, Local Roots
            </li>
            <li className="flex items-center gap-2">
              <Star className="text-pink-500" size={18} /> Driven by Purpose
            </li>
          </ul>
        </motion.div>

        {/* Career Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
        >
          <div>
            <p className="text-2xl font-bold text-indigo-600">98.94%</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">MHT-CET Percentile</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">8+ Projects</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Built & Shipped</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-pink-600">3 Awards</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Chess, Art, Code</p>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          className="mt-12 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 italic px-6 py-4 rounded-lg shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          “Engineering my path from Dharni to Destiny — with code, heart, and a mission.”
        </motion.div>
      </div>
    </section>
  );
}
