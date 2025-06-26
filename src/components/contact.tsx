"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.sendForm(
        'service_btjtzk6',   // ✅ Replace this
        'template_05v7t0q',  // ✅ Replace this
        formRef.current!,
        'HqPAZZVITAPidjznY'    // ✅ Replace this
      );
      setStatus('success');
      formRef.current?.reset(); // Clear the form
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-950 dark:to-zinc-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hidden md:block absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-400/30 via-fuchsia-400/20 to-emerald-400/20 blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gradient-to-tr from-pink-400/20 via-blue-400/20 to-indigo-400/20 blur-2xl opacity-50 animate-pulse" />
        <FloatingParticles count={10} />
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-textShimmer"
        >
          Let&apos;s Connect
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-2xl bg-white/70 dark:bg-zinc-900/80 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-zinc-700/60 p-8"
        >
          <form
            ref={formRef}
            onSubmit={handleSend}
            className="flex flex-col gap-6"
            aria-label="Contact Form"
          >
            {/* Name */}
            <div className="relative">
              <label htmlFor="from_name" className="absolute left-3 top-2 text-sm text-zinc-500 peer-focus:text-indigo-500 transition-all">Name</label>
              <input id="from_name" name="from_name" type="text" placeholder="Your Name" required className="w-full peer p-3 pt-5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            {/* Email */}
            <div className="relative">
              <label htmlFor="from_email" className="absolute left-3 top-2 text-sm text-zinc-500 peer-focus:text-indigo-500 transition-all">Email Address</label>
              <input id="from_email" name="from_email" type="email" placeholder="you@example.com" required className="w-full peer p-3 pt-5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            {/* Message */}
            <div className="relative">
              <label htmlFor="message" className="absolute left-3 top-2 text-sm text-zinc-500 peer-focus:text-indigo-500 transition-all">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Your message..." required className="w-full peer p-3 pt-5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            {/* Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 32px #6366f1cc" }}
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="relative group bg-indigo-600/90 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-transform focus:outline-none overflow-hidden border border-white/30 dark:border-zinc-700/60 backdrop-blur-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>✉️</span>
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
                {status === 'loading' && <span className="ml-2 animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />}
                {status === 'success' && <span className="ml-2">✅</span>}
              </span>
              <span className="absolute inset-0 group-active:scale-125 group-active:opacity-40 transition-all duration-300 bg-white/30 rounded-full pointer-events-none" />
            </motion.button>

            {/* Message */}
            {status === 'success' && <p className="text-green-600 dark:text-green-400 text-center font-semibold mt-2">Thank you! I will get back to you soon.</p>}
            {status === 'error' && <p className="text-red-600 dark:text-red-400 text-center font-semibold mt-2">Something went wrong. Please try again later.</p>}
          </form>
        </motion.div>

        {/* Divider */}
        <div className="my-8 text-center text-zinc-500 dark:text-zinc-400">
          — or reach me through —
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 text-indigo-600 dark:text-indigo-400 text-xl">
          <motion.a whileHover={{ scale: 1.2 }} href="mailto:your-email@example.com" className="hover:text-indigo-800 transition" aria-label="Send an email">
            <Mail />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="tel:+919999999999" className="hover:text-indigo-800 transition" aria-label="Call phone number">
            <Phone />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="https://www.linkedin.com/in/affanSkhan" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-800 transition" aria-label="Visit LinkedIn profile">
            <Linkedin />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="https://github.com/affanSkhan" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-800 transition" aria-label="Visit GitHub profile">
            <Github />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

// Floating particles effect
function FloatingParticles({ count = 10 }) {
  const [positions, setPositions] = useState<{ top: number; left: number; }[]>([]);
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
      style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
      animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.2 }}
    />
  ));
}
