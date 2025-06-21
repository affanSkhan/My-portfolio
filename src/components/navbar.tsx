"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = localStorage.getItem("theme");
    const isDark = storedTheme === "dark" || (!storedTheme && systemPrefersDark);
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Scrollspy effect for active section highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["#hero", "#about", "#skills", "#projects", "#resume", "#contact"];
      let found = "#hero";
      for (const id of sections) {
        const el = document.querySelector(id);
        if (el && window.scrollY + 80 >= (el as HTMLElement).offsetTop) {
          found = id;
        }
      }
      setActiveSection(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Tech Skills" },
    { href: "#projects", label: "Projects Lab" },
    { href: "#resume", label: "My Journey" },
    { href: "#contact", label: "Connect" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm transition-all">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        {/* Logo */}
        <Link
          href="#hero"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-fuchsia-500 to-emerald-400 bg-clip-text text-transparent animate-shimmer-logo focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
          aria-label="Go to Home"
        >
          <span className="drop-shadow"></span>Affan.dev
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative font-semibold px-3 py-1 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/60 dark:focus:ring-fuchsia-400/60
                ${activeSection === link.href ? 'text-blue-600 dark:text-fuchsia-400 scale-105' : 'text-zinc-700 dark:text-zinc-300'}
                hover:text-blue-500 dark:hover:text-blue-400
              `}
              aria-current={activeSection === link.href ? 'page' : undefined}
              tabIndex={0}
            >
              <span className="inline-block relative">
                {link.label}
                <span
                  className="absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-gradient-to-r from-blue-400 via-fuchsia-400 to-emerald-400"
                  style={{ opacity: activeSection === link.href ? 1 : 0, transition: 'opacity 0.2s' }}
                />
              </span>
            </Link>
          ))}
          <Button
            onClick={() => setIsDarkMode(!isDarkMode)}
            variant="ghost"
            size="icon"
            className="ml-2"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
            )}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white dark:bg-zinc-900 px-6 py-4 shadow-md border-t dark:border-zinc-700"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-zinc-800 dark:text-zinc-200 font-medium hover:text-blue-500"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Toggle Theme</span>
              <Button
                onClick={() => setIsDarkMode(!isDarkMode)}
                variant="ghost"
                size="icon"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shimmer animation for logo */}
      <style jsx>{`
        .animate-shimmer-logo {
          background-size: 200% 100%;
          animation: shimmer 2.5s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </header>
  );
}
