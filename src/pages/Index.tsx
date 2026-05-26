"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import ShortenForm from '@/components/ShortenForm';
import { Shield, BarChart3, Globe2 } from 'lucide-react';

const Index = () => {
  return (
    <div className="h-screen w-full text-white font-sans selection:bg-[#C5A059]/30 bg-[#050505] overflow-hidden flex flex-col">
      <Background />
      <Navbar />
      
      <main className="flex-1 flex flex-col justify-center items-center px-6 relative z-10 pt-20">
        <div className="w-full max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#C5A059]/5 border border-[#C5A059]/20 text-[#C5A059] text-[10px] uppercase tracking-[0.3em] font-bold mx-auto"
            >
              Established 2024 • Private Beta
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight leading-[1] text-center"
            >
              Zip Your Links <br />
              <span className="italic text-[#C5A059]">Instantly.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-white/40 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed text-center"
            >
              The world's most sophisticated URL architecture. Transform your digital presence with elegant, high-conversion aliases.
            </motion.p>
          </div>

          {/* Shortener Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <ShortenForm />
          </motion.div>

          {/* Intelligence Grid - Simplified for single screen */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-4">
            {[
              {
                icon: <Globe2 className="w-4 h-4 text-[#C5A059]" />,
                title: "Global Edge",
                desc: "Instant redirection via private networks."
              },
              {
                icon: <BarChart3 className="w-4 h-4 text-[#C5A059]" />,
                title: "Deep Intel",
                desc: "Sophisticated tracking systems."
              },
              {
                icon: <Shield className="w-4 h-4 text-[#C5A059]" />,
                title: "Vault Secure",
                desc: "Military-grade encryption standards."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white/[0.03] border border-white/5 rounded-xl">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/90">{feature.title}</h3>
                  <p className="text-white/30 text-[11px] leading-tight font-light">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-8 text-center mt-auto">
        <p className="text-white/10 text-[9px] uppercase tracking-[0.4em]">
          © 2024 • ZipLink Prestige • Built for the 1%
        </p>
      </footer>
    </div>
  );
};

export default Index;