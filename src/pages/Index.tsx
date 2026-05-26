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
    <div className="h-screen w-full text-white font-sans selection:bg-blue-500/30 bg-[#02040a] flex flex-col overflow-hidden">
      <Background />
      <Navbar />
      
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 relative z-10 pt-12">
        <div className="w-full max-w-2xl mx-auto space-y-3 md:space-y-4">
          
          {/* Hero */}
          <section className="text-center space-y-1">
            <motion.h1              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight leading-[1.2]"
            >
              Zip Your Links <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                Instantly.
              </span>
            </motion.h1>
          </section>

          {/* Shorten form */}
          <section className="relative">
            <ShortenForm />
          </section>

          {/* Mobile feature icons – only icons, no text */}
          <div className="flex justify-center gap-6 pt-2 sm:hidden">
            <motion.div              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center w-8 h-8 text-blue-400"
            >
              <Zap className="w-5 h-5" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center w-8 h-8 text-purple-400"
            >
              <Shield className="w-5 h-5" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center w-8 h-8 text-indigo-400"
            >
              <BarChart3 className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Desktop feature row – keep text labels */}
          <div className="hidden sm:flex justify-center gap-6 pt-2">
            {[
              { icon: <Zap className="w-3.5 h-3.5 text-blue-400/80" />, label: "Real-time Edge" },
              { icon: <Shield className="w-3.5 h-3.5 text-purple-400/80" />, label: "Secured Vault" },
              { icon: <BarChart3 className="w-3.5 h-3.5 text-indigo-400/80" />, label: "Smart Analytics" }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2 text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold text-white/30 hover:text-white/60 transition-colors"
              >
                {f.icon}
                {f.label}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer – now guaranteed to be visible */}
      <footer className="py-3 text-center relative z-20 px-4">
        <p className="text-white/20 hover:text-white/40 transition-colors duration-300 text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-semibold leading-relaxed">
          © {currentYear} ZipLink Premium • All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Index;