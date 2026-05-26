"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import ShortenForm from '@/components/ShortenForm';
import { Zap, Shield, BarChart3 } from 'lucide-react';

const Index = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen w-full bg-[#02040a] text-white font-sans flex flex-col overflow-hidden relative">
      <Background />
      <Navbar />

      {/* Hero & main content */}
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 pt-20 md:pt-24 relative z-10">
        {/* Floating neon blobs (tiny) */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(138,43,226,0.15), transparent 60%)',
              'radial-gradient(circle at 80% 70%, rgba(0,191,255,0.15), transparent 60%)',
            ],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        />

        <div className="w-full max-w-2xl mx-auto space-y-6 text-center">
          {/* Hero heading with animated gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-extrabold tracking-tight"
          >
            Zip Your Links{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 animate-gradient-x">
              Instantly.
            </span>
          </motion.h1>

          {/* Sub‑heading placed directly under the hero */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm md:text-base text-white/70 max-w-md mx-auto"
          >
            Transform long, messy URLs into clean, powerful smart links. Track clicks and share beautifully across the web.
          </motion.p>

          {/* Shorten form */}
          <section className="mt-4">
            <ShortenForm />
          </section>

          {/* Feature icons */}
          <div className="hidden sm:flex justify-center gap-8 pt-4">
            {[
              { icon: <Zap className="w-4 h-4 text-purple-400" />, label: 'Real‑time Edge' },
              { icon: <Shield className="w-4 h-4 text-indigo-400" />, label: 'Secured Vault' },
              { icon: <BarChart3 className="w-4 h-4 text-cyan-400" />, label: 'Smart Analytics' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex flex-col items-center gap-1 text-xs uppercase tracking-wider text-white/40 hover:text-white/70 transition-colors"
              >
                {f.icon}
                <span>{f.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-white/30">
        © {currentYear} ZipLink Premium • All Rights Reserved
      </footer>
    </div>
  );
};

export default Index;