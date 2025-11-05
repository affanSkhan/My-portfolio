"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiFirebase,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiFlutter,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiVuedotjs,
  SiAngular,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiCplusplus,
  SiPhp,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiDart,
  SiGit,
  SiDocker,
  SiVercel,
  SiNetlify,
  SiGooglecloud,
  SiApacheairflow,
  SiLooker
} from "react-icons/si";
import { 
  TbMathSymbols,
  TbChartLine,
  TbBrain,
  TbDatabase,
  TbCloudComputing,
  TbAnalyze,
  TbSql
} from "react-icons/tb";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Type for project data
type Project = {
  title: string;
  description: string;
  stack: string[];
  year: number;
  links: {
    github?: string;
    live?: string;
  };
  featured: boolean;
  status: string;
  lessons: string[];
};

// Icon mapping for tech stack with colorful styling
const techIcons: Record<string, React.ReactElement> = {
  // Frontend Frameworks & Libraries
  "Next.js": <SiNextdotjs key="nextjs" className="text-white" />,
  "React": <SiReact key="react" className="text-cyan-400" />,
  "TypeScript": <SiTypescript key="typescript" className="text-blue-500" />,
  "JavaScript": <SiJavascript key="javascript" className="text-yellow-400" />,
  "HTML": <SiHtml5 key="html5" className="text-orange-500" />,
  "CSS": <SiCss3 key="css3" className="text-blue-400" />,
  "Tailwind CSS": <SiTailwindcss key="tailwind" className="text-teal-400" />,
  "Vue.js": <SiVuedotjs key="vuejs" className="text-green-500" />,
  "Angular": <SiAngular key="angular" className="text-red-500" />,
  "Svelte": <SiNextdotjs key="svelte" className="text-orange-400" />,
  "Bootstrap": <SiReact key="bootstrap" className="text-purple-500" />,
  
  // Backend Technologies
  "Node.js": <SiNodedotjs key="nodejs" className="text-green-500" />,
  "Express": <SiExpress key="express" className="text-gray-400" />,
  "Python": <SiPython key="python" className="text-yellow-400" />,
  "Java": <SiJavascript key="java" className="text-red-500" />,
  "C++": <SiCplusplus key="cplusplus" className="text-blue-600" />,
  "C#": <SiCplusplus key="csharp" className="text-purple-600" />,
  "Go": <SiNodedotjs key="golang" className="text-cyan-400" />,
  "Rust": <SiCplusplus key="rust" className="text-orange-600" />,
  "PHP": <SiPhp key="php" className="text-indigo-400" />,
  "Ruby": <SiCplusplus key="ruby" className="text-red-400" />,
  "SQL": <TbSql key="sql" className="text-blue-500" />,
  
  // Databases & Storage
  "MongoDB": <SiMongodb key="mongodb" className="text-green-500" />,
  "MySQL": <SiMysql key="mysql" className="text-blue-600" />,
  "PostgreSQL": <SiPostgresql key="postgresql" className="text-blue-500" />,
  "Firebase": <SiFirebase key="firebase" className="text-orange-400" />,
  "Redis": <SiMongodb key="redis" className="text-red-500" />,
  "SQLite": <SiMysql key="sqlite" className="text-blue-400" />,
  "Supabase": <SiFirebase key="supabase" className="text-green-400" />,
  "BigQuery": <SiGooglecloud key="bigquery" className="text-blue-500" />,
  
  // Cloud & DevOps
  "AWS": <SiGooglecloud key="aws" className="text-orange-400" />,
  "Azure": <SiGooglecloud key="azure" className="text-blue-500" />,
  "Google Cloud": <SiGooglecloud key="googlecloud" className="text-blue-500" />,
  "GCP": <SiGooglecloud key="gcp" className="text-blue-500" />,
  "Google Cloud Storage": <SiGooglecloud key="gcs" className="text-blue-400" />,
  "Cloud Composer (Airflow)": <SiApacheairflow key="airflow" className="text-red-500" />,
  "Looker Studio": <SiLooker key="looker" className="text-purple-500" />,
  "Airflow": <SiApacheairflow key="airflow-alt" className="text-red-500" />,
  "Docker": <SiDocker key="docker" className="text-blue-400" />,
  "Kubernetes": <SiDocker key="k8s" className="text-blue-600" />,
  "Terraform": <SiDocker key="terraform" className="text-purple-500" />,
  "Jenkins": <SiDocker key="jenkins" className="text-orange-500" />,
  
  // Mobile Development
  "Flutter": <SiFlutter key="flutter" className="text-blue-400" />,
  "React Native": <SiReact key="reactnative" className="text-cyan-400" />,
  "Dart": <SiDart key="dart" className="text-blue-500" />,
  "Swift": <SiDart key="swift" className="text-orange-500" />,
  "Kotlin": <SiDart key="kotlin" className="text-purple-500" />,
  "Ionic": <SiReact key="ionic" className="text-blue-400" />,
  
  // AI/ML & Data Science
  "TensorFlow": <TbBrain key="tensorflow" className="text-orange-500" />,
  "PyTorch": <TbBrain key="pytorch" className="text-red-500" />,
  "Keras": <TbBrain key="keras" className="text-red-400" />,
  "Scikit-Learn": <TbChartLine key="sklearn" className="text-orange-500" />,
  "NumPy": <TbMathSymbols key="numpy" className="text-blue-500" />,
  "Pandas": <TbDatabase key="pandas" className="text-purple-500" />,
  "Matplotlib": <TbChartLine key="matplotlib" className="text-blue-400" />,
  "Seaborn": <TbChartLine key="seaborn" className="text-teal-400" />,
  "OpenCV": <TbBrain key="opencv" className="text-green-500" />,
  "Jupyter": <TbMathSymbols key="jupyter" className="text-orange-400" />,
  
  // Data & Analytics
  "Data Pipeline": <TbAnalyze key="datapipeline" className="text-purple-500" />,
  "ETL": <TbCloudComputing key="etl" className="text-green-500" />,
  "Data Warehouse": <TbDatabase key="datawarehouse" className="text-blue-500" />,
  "Apache Spark": <TbAnalyze key="spark" className="text-orange-500" />,
  "Kafka": <TbAnalyze key="kafka" className="text-gray-400" />,
  "Elasticsearch": <TbDatabase key="elasticsearch" className="text-yellow-400" />,
  
  // Development Tools
  "Git": <SiGit key="git" className="text-orange-500" />,
  "GitHub": <SiGit key="github" className="text-gray-400" />,
  "GitLab": <SiGit key="gitlab" className="text-orange-600" />,
  "VS Code": <SiTypescript key="vscode" className="text-blue-500" />,
  "IntelliJ": <SiJavascript key="intellij" className="text-blue-600" />,
  "Postman": <SiExpress key="postman" className="text-orange-500" />,
  "Figma": <SiReact key="figma" className="text-pink-400" />,
  "Adobe XD": <SiReact key="adobexd" className="text-purple-500" />,
  
  // Deployment & Hosting
  "Vercel": <SiVercel key="vercel" className="text-white" />,
  "Netlify": <SiNetlify key="netlify" className="text-teal-400" />,
  "Heroku": <SiNetlify key="heroku" className="text-purple-500" />,
  "Railway": <SiVercel key="railway" className="text-purple-400" />,
  "DigitalOcean": <SiGooglecloud key="digitalocean" className="text-blue-500" />,
  
  // Testing & Quality
  "Jest": <SiJavascript key="jest" className="text-red-500" />,
  "Cypress": <SiJavascript key="cypress" className="text-green-500" />,
  "Playwright": <SiTypescript key="playwright" className="text-green-400" />,
  "ESLint": <SiJavascript key="eslint" className="text-purple-500" />,
  "Prettier": <SiJavascript key="prettier" className="text-pink-400" />,
  
  // Other Popular Technologies
  "GraphQL": <SiReact key="graphql" className="text-pink-500" />,
  "REST API": <SiExpress key="restapi" className="text-green-500" />,
  "WebSocket": <SiNodedotjs key="websocket" className="text-blue-400" />,
  "PWA": <SiReact key="pwa" className="text-purple-500" />,
  "Electron": <SiJavascript key="electron" className="text-cyan-400" />,
  "Three.js": <SiJavascript key="threejs" className="text-white" />,
  "D3.js": <SiJavascript key="d3js" className="text-orange-500" />,
  "Chart.js": <TbChartLine key="chartjs" className="text-pink-400" />,
};

// Function to render tech stack item with colorful styling and hover effects
function renderTechItem(tech: string, index: number) {
  const icon = techIcons[tech];
  
  if (icon) {
    return (
      <motion.div
        key={index}
        className="group relative flex items-center gap-1 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
        title={tech}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <span className="text-lg opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-lg">
          {icon}
        </span>
        <span className="text-xs font-medium text-zinc-700 dark:text-white/80 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300 hidden sm:block">
          {tech}
        </span>
      </motion.div>
    );
  } else {
    // Fallback: show tech name as text with colorful styling
    return (
      <motion.div
        key={index}
        className="group relative flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg border border-purple-300/30 hover:border-purple-300/60 transition-all duration-300"
        title={tech}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <span className="text-xs font-bold text-purple-700 dark:text-purple-200 group-hover:text-purple-900 dark:group-hover:text-white transition-colors duration-300">
          {tech}
        </span>
      </motion.div>
    );
  }
}

// FloatingParticles component to avoid hydration mismatch
function FloatingParticles({ count = 12 }) {
  const [positions, setPositions] = useState<{top:number;left:number;}[]>([]);
  useEffect(() => {
    setPositions(
      Array.from({ length: count }, () => ({
        top: Math.random() * 90,
        left: Math.random() * 90,
      }))
    );
  }, [count]);
  if (positions.length === 0) return null;
  return positions.map((pos, i) => (
    <motion.span
      key={i}
      className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-emerald-400 opacity-30"
      style={{
        top: `${pos.top}%`,
        left: `${pos.left}%`,
      }}
      animate={{
        y: [0, -10, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: i * 0.2,
      }}
    />
  ));
}

export default function Projects() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from API
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const res = await fetch("/api/content/projects.json");
        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.status}`);
        }
        const data = await res.json();
        // Handle both array format and object format
        const projectsArray = Array.isArray(data) ? data : data.projects || [];
        setProjects(projectsArray);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const handleToggle = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  if (loading) {
    return (
      <motion.section
        id="projects"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-emerald-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 py-24 px-2 sm:px-6"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading projects...</p>
        </div>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section
        id="projects"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-emerald-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 py-24 px-2 sm:px-6"
      >
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-emerald-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 py-24 px-2 sm:px-6"
    >
      {/* Animated Gradient/Blob Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hidden md:block absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-400/30 via-fuchsia-400/20 to-emerald-400/20 blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gradient-to-tr from-pink-400/20 via-blue-400/20 to-indigo-400/20 blur-2xl opacity-50 animate-pulse" />
        <FloatingParticles count={12} />
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Glassmorphism Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-black/70 dark:bg-zinc-900/80 border border-white/30 dark:border-zinc-700/60 shadow-2xl backdrop-blur-2xl px-4 sm:px-10 py-12"
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-center mb-10 relative animate-shimmer"
          >
            🛠️ DIY & Projects Lab ({projects.length} projects)
            <span className="block h-1 w-16 mx-auto mt-2 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 rounded-full animate-pulse" />
          </motion.h2>
          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => {
              const isFlipped = flippedIndex === index;
              return (
                <motion.div
                  key={index}
                  className="w-full h-80 perspective cursor-pointer"
                  style={{ perspective: 1200 }}
                  onClick={() => handleToggle(index)}
                  onMouseEnter={() => setFlippedIndex(index)}
                  onMouseLeave={() => setFlippedIndex(null)}
                  whileHover={{ scale: 1.04, boxShadow: "0 12px 32px 0 rgba(80,80,180,0.18)", rotateX: -4, rotateZ: 1 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.08 * index }}
                >
                  <motion.div
                    className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    style={{ perspective: 1200 }}
                  >
                    {/* FRONT SIDE */}
                    <div className="absolute w-full h-full backface-hidden bg-white/80 dark:bg-zinc-900/80 border border-white/30 dark:border-zinc-700/60 rounded-xl p-6 shadow-xl flex flex-col justify-between backdrop-blur-lg">
                      <div>
                        <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-3">{project.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.stack.map((tech, i) => renderTechItem(tech, i))}
                        </div>
                        <div className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100/50 dark:bg-zinc-800/50 px-2 py-1 rounded-md">
                          {project.year} • {project.status}
                        </div>
                      </div>
                      <p className="text-sm text-zinc-500 mt-4">Tap or hover to flip</p>
                    </div>

                    {/* BACK SIDE */}
                    <div className="absolute w-full h-full rotate-y-180 backface-hidden bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-xl p-6 flex flex-col justify-between shadow-xl backdrop-blur-lg">
                      <div>
                        <p className="mb-3 text-sm">{project.description}</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {project.lessons.map((lesson, id) => (
                            <li key={id}>💡 {lesson}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        {project.links.github && (
                          <a href={project.links.github} target="_blank" className="text-sm underline flex items-center gap-1 transition-transform hover:scale-110 hover:text-indigo-200">
                            <FaGithub /> GitHub
                          </a>
                        )}
                        {project.links.live && (
                          <a href={project.links.live} target="_blank" className="text-sm underline flex items-center gap-1 transition-transform hover:scale-110 hover:text-emerald-200">
                            <FaExternalLinkAlt /> Live
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
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
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2.5s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-gradient-move {
          background-size: 400% 400%;
          animation: gradientMove 12s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </motion.section>
  );
}
