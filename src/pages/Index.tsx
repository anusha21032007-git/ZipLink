"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import ShortenForm from '@/components/ShortenForm';
import { Shield, BarChart3, Globe2 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-[#C5A059]/30 bg-[#050505]">
      <Background />
      <Navbar />
      
      <main className="container mx-auto px-6 pt-48 pb-32 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#C5A059]/5 border border-[#C5A059]/20 text-[#C5A059] text-[10px] uppercase tracking-[0.3em] font-bold"
          >
            Established 2024 • Private Beta
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-serif font-medium tracking-tight leading-[0.9]"
          >
            Zip Your Links <br />
            <span className="italic text-[#C5A059]">Instantly.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
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

        {/* Intelligence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-40 max-w-6xl mx-auto">
          {[
            {
              icon: <Globe2 className="w-5 h-5 text-[#C5A059]" />,
              title: "Global Edge",
              desc: "Instant redirection via our private high-speed luxury network."
            },
            {
              icon: <BarChart3 className="w-5 h-5 text-[#C5A059]" />,
              title: "Deep Intel",
              desc: "Sophisticated tracking that provides more than just raw numbers."
            },
            {
              icon: <Shield className="w-5 h-5 text-[#C5A059]" />,
              title: "Vault Secure",
              desc: "Military-grade encryption for every link in your portfolio."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="group relative"
            >
              <div className="mb-6 w-12 h-12 flex items-center justify-center bg-white/[0.03] border border-white/5 rounded-2xl group-hover:border-[#C5A059]/30 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-sm uppercase tracking-[0.2em] font-bold mb-3 text-white/90">{feature.title}</h3>
              <p className="text-white/30 text-sm leading-relaxed font-light">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 text-center">
        <div className="container mx-auto px-6 flex flex-col items-center gap-8">
          <div className="text-xl font-serif font-bold text-white/20 tracking-widest uppercase">
            ZipLink Prestige
          </div>
          <p className="text-white/10 text-[10px] uppercase tracking-[0.4em]">
            © 2024 • All Rights Reserved • Built for the 1%
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;