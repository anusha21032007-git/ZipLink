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
    <div className="h-screen w-full text-white font-sans selection:bg-blue-500/30 bg-[#02040a] overflow-hidden flex flex-col">
      <Background />
      <Navbar />
      
      <main className="flex-1 flex flex-col justify-center items-center px-6 relative z-10 pt-12 md:pt-16">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          
          {/* Header Section */}
          <section className="text-center space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1] text-center"
            >
              Zip Your Links <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                Instantly.
              </span>
            </motion.h1>
          </section>

          {/* Combined Interactive Shortener Card */}
          <section className="relative">
            <ShortenForm />
          </section>

          {/* Mini Features */}
          <div className="hidden md:flex justify-center gap-12 pt-2">
            {[
              { icon: <Zap className="w-4 h-4 text-blue-400/80" />, label: "Real-time Edge" },
              { icon: <Shield className="w-4 h-4 text-purple-400/80" />, label: "Secured Vault" },
              { icon: <BarChart3 className="w-4 h-4 text-indigo-400/80" />, label: "Smart Analytics" }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 hover:text-white/60 transition-colors"
              >
                {f.icon}
                {f.label}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-6 text-center relative z-10">
        <p className="text-white/20 hover:text-white/40 transition-colors duration-300 text-[10px] uppercase tracking-[0.3em] font-semibold">
          © {currentYear} ZipLink Premium • All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Index;