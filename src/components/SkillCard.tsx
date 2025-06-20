// components/SkillCard.tsx
"use client";

import { motion } from "framer-motion";
import iconMap from "./iconMap";
import { Skill } from "./skillsData";

export default function SkillCard({ skill }: { skill: Skill }) {
  const IconComponent = iconMap[skill.iconName];

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="p-4 rounded-xl shadow-md bg-white dark:bg-zinc-800 flex flex-col items-center text-center"
    >
      <div className={`text-4xl mb-2 ${skill.colorClass}`}>
        {IconComponent ?? "❓"}
      </div>
      <h3 className="text-lg font-bold mb-1">{skill.name}</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-300">{skill.category}</p>
    </motion.div>
  );
}
