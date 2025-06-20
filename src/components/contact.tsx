"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 px-6 bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-950 dark:to-zinc-900"
    >
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
        >
          Let’s Connect
        </motion.h2>

        <Card className="p-8 shadow-xl border border-zinc-300 dark:border-zinc-800">
          <form className="flex flex-col gap-6">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                required
                className="w-full peer p-3 pt-5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <label className="absolute left-3 top-2 text-sm text-zinc-500 peer-focus:text-indigo-500 transition-all">
                Your Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                required
                className="w-full peer p-3 pt-5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <label className="absolute left-3 top-2 text-sm text-zinc-500 peer-focus:text-indigo-500 transition-all">
                Email Address
              </label>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                required
                rows={5}
                className="w-full peer p-3 pt-5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <label className="absolute left-3 top-2 text-sm text-zinc-500 peer-focus:text-indigo-500 transition-all">
                Message
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition"
            >
              Send Message
            </motion.button>
          </form>
        </Card>

        {/* Divider */}
        <div className="my-8 text-center text-zinc-500 dark:text-zinc-400">— or reach me through —</div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 text-indigo-600 dark:text-indigo-400 text-xl">
          <a
            href="mailto:your-email@example.com"
            className="hover:text-indigo-800 transition"
            aria-label="Email"
          >
            <Mail />
          </a>
          <a
            href="tel:+919999999999"
            className="hover:text-indigo-800 transition"
            aria-label="Phone"
          >
            <Phone />
          </a>
          <a
            href="https://linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-800 transition"
            aria-label="LinkedIn"
          >
            <Linkedin />
          </a>
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-800 transition"
            aria-label="GitHub"
          >
            <Github />
          </a>
        </div>
      </div>
    </section>
  );
}
