// components/skillsData.ts

export type Skill = {
  name: string;
  iconName: string;  // match keys in iconMap (lowercase, no "Si" prefix)
  colorClass: string;
  category: string;
  level: number; // percentage (0-100)
};

export const skills: Skill[] = [
  // === Frontend ===
  { name: "HTML", iconName: "html", colorClass: "text-orange-500", category: "Frontend", level: 95 },
  { name: "CSS", iconName: "css", colorClass: "text-blue-500", category: "Frontend", level: 90 },
  { name: "JavaScript", iconName: "javascript", colorClass: "text-yellow-400", category: "Frontend", level: 80 },
  { name: "TypeScript", iconName: "typescript", colorClass: "text-blue-600", category: "Frontend", level: 70 },
  { name: "React", iconName: "react", colorClass: "text-cyan-500", category: "Frontend", level: 70 },
  { name: "Next.js", iconName: "nextjs", colorClass: "text-black dark:text-white", category: "Frontend", level: 70 },
  { name: "Tailwind CSS", iconName: "tailwind", colorClass: "text-sky-400", category: "Frontend", level: 70 },

  // === Backend ===
  { name: "Java", iconName: "java", colorClass: "text-blue-600", category: "Backend", level: 60 },
  { name: "C++", iconName: "cplusplus", colorClass: "text-blue-600", category: "Backend", level: 60 },
  { name: "Firebase", iconName: "firebase", colorClass: "text-yellow-500", category: "Backend", level: 95 },

  // === Mobile ===
  { name: "Flutter", iconName: "flutter", colorClass: "text-sky-400", category: "Mobile", level: 75 },
  { name: "Dart", iconName: "dart", colorClass: "text-blue-400", category: "Mobile", level: 70 },

  // === AI/ML ===
  { name: "Python", iconName: "python", colorClass: "text-blue-400", category: "AI/ML", level: 80 },
  { name: "NumPy", iconName: "numpy", colorClass: "text-blue-400", category: "AI/ML", level: 75 },
  { name: "Pandas", iconName: "pandas", colorClass: "text-black", category: "AI/ML", level: 70 },
  { name: "Scikit-Learn", iconName: "scikitlearn", colorClass: "text-blue-600", category: "AI/ML", level: 70 },
  { name: "TensorFlow", iconName: "tensorflow", colorClass: "text-orange-600", category: "AI/ML", level: 60 },

  // === Databases ===
  { name: "MySQL", iconName: "mysql", colorClass: "text-blue-500", category: "Databases", level: 80 },
  { name: "MongoDB", iconName: "mongodb", colorClass: "text-green-500", category: "Databases", level: 75 },

  // === Tools & DevOps ===
  { name: "Git & GitHub", iconName: "git", colorClass: "text-orange-500", category: "Tools", level: 90 },
  { name: "Docker", iconName: "docker", colorClass: "text-blue-500", category: "Tools", level: 50 },
  { name: "Netlify", iconName: "netlify", colorClass: "text-black", category: "Tools", level: 80 },
  { name: "Linux", iconName: "linux", colorClass: "text-gray-600", category: "Tools", level: 65 },
  { name: "VS Code", iconName: "vscode", colorClass: "text-blue-500", category: "Tools", level: 95 },
];
