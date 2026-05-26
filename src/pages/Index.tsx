"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import ShortenForm from '@/components/ShortenForm';
import { Zap, Shield, BarChart3, Share2 } from 'lucide-react';

const Index = () => {
  return (
    <div className="h-screen w-full text-white font-sans selection:bg-blue-500/30 bg-[#02040a] overflow-hidden flex flex-col">
      <Background />
      <Navbar />
      
      <main className="flex-1 flex flex-col justify-center items-center px-6 relative z-10 pt-16">
        <div className="w-full max-w-4xl mx-auto space-y-8 md:space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-bold uppercase tracking-widest text-blue-400 mx-auto"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Fast • Secure • Smart
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              Zip Your Links <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                Instantly.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/50 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed px-4"
            >
              Transform long, messy URLs into clean, powerful smart links.
              Track clicks and share beautifully across the web.
            </motion.p>
          </section>

          {/* Shortener Card */}
          <section className="relative">
            <ShortenForm />
          </section>

          {/* Mini Features - Inline and compact to avoid scrolling */}
          <div className="hidden md:flex justify-center gap-8 pt-4">
            {[
              { icon: <Zap className="w-4 h-4 text-blue-400" />, label: "Real-time Edge" },
              { icon: <Shield className="w-4 h-4 text-purple-400" />, label: "Secured Vault" },
              { icon: <BarChart3 className="w-4 h-4 text-indigo-400" />, label: "Smart Analytics" }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/20"
              >
                {f.icon}
                {f.label}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-6 text-center relative z-10">
        <p className="text-white/10 text-[9px] uppercase tracking-[0.4em]">
          © 2024 • ZipLink Prestige • Built for the 1%
        </p>
      </footer>
    </div>
  );
};

export default Index;
