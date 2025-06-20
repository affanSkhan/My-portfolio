"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { GraduationCap, Rocket, Lightbulb, Award } from "lucide-react";

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
    year: "2023",
    title: "Won Competitions",
    desc: "Chess & Drawing awards",
    icon: <Award className="text-indigo-600 w-6 h-6" />,
  },
  {
    year: "2025",
    title: "College Services App",
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
    title: "AI from Dharni",
    desc: "Solo rural AI startup",
    icon: <Lightbulb className="text-green-500 w-6 h-6" />,
  },
  {
    year: "2025",
    title: "Muslim.AI Vision",
    desc: "Faith + AI model",
    icon: <Rocket className="text-green-500 w-6 h-6" />,
  },
];

export function Resume() {
  const [view, setView] = useState<'student' | 'entrepreneur'>('student');
  const timeline = view === 'student' ? studentTimeline : entrepreneurTimeline;

  return (
    <section id="resume" className="py-16 px-4 sm:px-8 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-5xl mx-auto">
        {/* Lottie Title Header */}
        <div className="text-center mb-8">
          <Player
            autoplay
            loop
            src="/my-journey-animation.json" // Make sure this is in your public/ folder
            style={{ height: "100px", width: "100px", margin: "0 auto" }}
          />
          <h2 className="text-4xl font-bold text-center mb-0 text-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            My Journey
          </h2>
          
        </div>

        {/* Toggle View */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            className={`px-5 py-2 text-sm font-semibold rounded-full transition ${
              view === 'student'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-zinc-700 dark:text-white'
            }`}
            onClick={() => setView('student')}
          >
            Student View
          </button>
          <button
            className={`px-5 py-2 text-sm font-semibold rounded-full transition ${
              view === 'entrepreneur'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 dark:bg-zinc-700 dark:text-white'
            }`}
            onClick={() => setView('entrepreneur')}
          >
            Entrepreneur View
          </button>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-4 border-indigo-400 dark:border-indigo-600 pl-6 space-y-10">
          {timeline.map((item, i) => (
            <div key={i} className="relative flex gap-4 items-start group">
              <div className="absolute -left-[1.3rem] top-1">
                <div className="w-4 h-4 rounded-full bg-indigo-500 group-hover:scale-110 transition" />
              </div>
              <div className="bg-white dark:bg-zinc-800 p-5 rounded-xl shadow-md w-full">
                <div className="flex items-center gap-3 mb-2">
                  {item.icon}
                  <h4 className="text-lg font-semibold text-zinc-800 dark:text-white">
                    {item.title}
                  </h4>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-1">
                  {item.desc}
                </p>
                <span className="text-xs text-indigo-400 dark:text-indigo-300">
                  {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
