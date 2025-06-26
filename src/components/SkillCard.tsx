// components/SkillCard.tsx
"use client";

import { motion } from "framer-motion";
import iconMap from "./iconMap";
import { Skill } from "./skillsData";

export default function SkillCard({ skill, index = 0 }: { skill: Skill; index?: number }) {
  const IconComponent = iconMap[skill.iconName];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.5 }}
      whileHover={{ scale: 1.07, boxShadow: "0 0 24px #6366f1cc" }}
      className="p-5 rounded-2xl shadow-xl bg-white/70 dark:bg-zinc-900/80 border border-white/30 dark:border-zinc-700/60 backdrop-blur-lg flex flex-col items-center text-center transition-all group"
      title={skill.name}
    >
      <div className={`text-4xl mb-2 transition-transform group-hover:scale-125 group-hover:animate-pulse ${skill.colorClass} drop-shadow dark:drop-shadow-[0_0_12px_#6366f1cc]`}>
        {IconComponent ?? "❓"}
      </div>
      <h3 className="text-lg font-bold mb-1">{skill.name}</h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-300 mb-2">{skill.category}</p>
      {/* Proficiency Bar (static for now) */}
      <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mt-2">
        <div className="h-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400" style={{ width: `${skill.level}%` }} />
      </div>
    </motion.div>
  );
}
