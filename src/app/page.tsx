"use client";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Contact from "@/components/contact";
import { Resume } from "@/components/resume";
import About from "@/components/about";
import Projects from "@/components/projects";
import SkillsDashboard from "@/components/SkillsDashboard";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero is full-screen and handles its own animations and parallax */}
      <Hero />

      {/* Other sections animated on scroll */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        id="about"
      >
        <About />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
        id="skills"
      >
        <SkillsDashboard />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        id="projects"
      >
        <Projects />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
        id="resume"
      >
        <Resume />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        viewport={{ once: true }}
        id="contact"
      >
        <Contact />
      </motion.section>
    </>
  );
}
