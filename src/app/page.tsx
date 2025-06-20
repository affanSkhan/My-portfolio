"use client";

import Navbar  from "@/components/navbar";
import Hero from "@/components/hero";
import Contact  from "@/components/contact";
import { Resume } from "@/components/resume"; // Make sure file is resume.tsx
import About from "@/components/about";
import Projects from "@/components/projects"; // NEW IMPORT
import SkillsDashboard from "@/components/SkillsDashboard"; // new




export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <SkillsDashboard />
      <Projects />
      <Resume />
      <Contact />
    </>
  );
}


