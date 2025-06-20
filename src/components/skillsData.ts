// components/skillsData.ts

export type Skill = {
  name: string;
  iconName: string;  // must match keys in iconMap (lowercase, no "Si" prefix)
  colorClass: string;
  category: string;
};

export const skills: Skill[] = [
  { name: "HTML", iconName: "html", colorClass: "text-orange-500", category: "Frontend" },
  { name: "CSS", iconName: "css", colorClass: "text-blue-500", category: "Frontend" },
  { name: "JavaScript", iconName: "javascript", colorClass: "text-yellow-400", category: "Frontend" },
  { name: "TypeScript", iconName: "typescript", colorClass: "text-blue-600", category: "Frontend" },
  { name: "React", iconName: "react", colorClass: "text-cyan-500", category: "Frontend" },
  { name: "Next.js", iconName: "nextjs", colorClass: "text-black dark:text-white", category: "Frontend" },
  { name: "Tailwind CSS", iconName: "tailwind", colorClass: "text-sky-400", category: "Frontend" },
  { name: "Firebase", iconName: "firebase", colorClass: "text-yellow-500", category: "Backend" },
  { name: "Python", iconName: "python", colorClass: "text-blue-400", category: "AI/ML" },
  { name: "C++", iconName: "cplusplus", colorClass: "text-blue-600", category: "Backend" },
  { name: "MySQL", iconName: "mysql", colorClass: "text-blue-500", category: "Databases" },
  { name: "Git & GitHub", iconName: "git", colorClass: "text-orange-500", category: "Tools" },
];
