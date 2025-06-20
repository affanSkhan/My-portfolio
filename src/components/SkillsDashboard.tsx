// components/SkillsDashboard.tsx

"use client";

import { useState } from "react";
import SkillCard from "./SkillCard";
import { skills } from "./skillsData";

export default function SkillsDashboard() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Frontend", "Backend", "AI/ML", "Databases", "Tools"];

  const filteredSkills =
    filter === "All" ? skills : skills.filter((s) => s.category === filter);

  return (
    <section id="skills" className="py-16 px-6 bg-white dark:bg-zinc-900">
      <h2 className="text-4xl font-bold text-center mb-12 text-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        Tech Skills Dashboard
      </h2>

      <div className="flex justify-center gap-3 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === cat
                ? "bg-indigo-600 text-white"
                : "bg-zinc-200 dark:bg-zinc-700 dark:text-white"
            }`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredSkills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>
    </section>
  );
}