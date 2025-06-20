"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiFirebase,
  SiTailwindcss,
  SiNextdotjs
} from "react-icons/si";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "CIE Exam Reminder App",
    description:
      "A smart reminder app for internal exams with class-wise scheduling, notifications & alarm triggers.",
    tech: [<SiReact key="react" />, <SiFirebase key="firebase" />, <SiTailwindcss key="tailwind" />],
    github: "https://github.com/your-username/cie-reminder",
    live: "https://cie-reminder.vercel.app",
    lessons: ["Notification APIs", "User input validation", "Timely UX design"]
  },
  {
    title: "AI Job Recommender",
    description:
      "AI-powered job suggestion system based on user skills with keyword mapping and minimal UI.",
    tech: [<SiNextdotjs key="next" />, <SiTailwindcss key="tailwind" />, <SiFirebase key="firebase" />],
    github: "https://github.com/your-username/ai-job-recommender",
    live: "https://ai-job.vercel.app",
    lessons: ["AI UX design", "Keyword clustering", "Career logic modeling"]
  },
  {
    title: "Fashion E-Com App with Admin",
    description:
      "An elegant fashion store with shopping cart, Firebase-based admin panel, and clean responsive design.",
    tech: [<SiReact key="react" />, <SiFirebase key="firebase" />, <SiTailwindcss key="tailwind" />],
    github: "https://github.com/your-username/fashion-store",
    live: "https://fashion-ecom.vercel.app",
    lessons: ["State management", "CRUD with Firebase", "Component modularity"]
  },
  {
    title: "One Area One App",
    description:
      "Commission-based platform for rural business discovery, bookings, and payment automation.",
    tech: [<SiNextdotjs key="next" />, <SiFirebase key="firebase" />, <SiTailwindcss key="tailwind" />],
    github: "https://github.com/your-username/one-area-one-app",
    live: "https://one-area-app.vercel.app",
    lessons: ["Multi-role UX", "Rural-friendly UI", "Payment system structure"]
  }
];

export default function Projects() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-8 bg-gray-100 dark:bg-zinc-950">
      <h2 className="text-4xl font-bold text-center mb-12 text-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        🛠️ DIY & Projects Lab
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => {
          const isFlipped = flippedIndex === index;
          return (
            <div
              key={index}
              className="w-full h-80 perspective cursor-pointer"
              onClick={() => handleToggle(index)}
              onMouseEnter={() => setFlippedIndex(index)}
              onMouseLeave={() => setFlippedIndex(null)}
            >
              <motion.div
                className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
              >
                {/* FRONT SIDE */}
                <div className="absolute w-full h-full backface-hidden bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl p-6 shadow-xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-2">{project.title}</h3>
                    <div className="flex space-x-2 text-xl text-blue-500">
                      {project.tech.map((icon, i) => (
                        <span key={i}>{icon}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 mt-4">Tap or hover to flip</p>
                </div>

                {/* BACK SIDE */}
                <div className="absolute w-full h-full rotate-y-180 backface-hidden bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <p className="mb-3 text-sm">{project.description}</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {project.lessons.map((lesson, id) => (
                        <li key={id}>💡 {lesson}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <a href={project.github} target="_blank" className="text-sm underline flex items-center gap-1">
                      <FaGithub /> GitHub
                    </a>
                    <a href={project.live} target="_blank" className="text-sm underline flex items-center gap-1">
                      <FaExternalLinkAlt /> Live
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
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
      `}</style>
    </section>
  );
}
