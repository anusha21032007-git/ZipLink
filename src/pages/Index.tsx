"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import ShortenForm from '@/components/ShortenForm';
import { MousePointerClick, Zap, ShieldCheck } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500/30">
      <Background />
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Premium URL Shortener
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Zip Your Links <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Instantly.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Transform long messy URLs into clean, smart, shareable links. 
            Track every click with our advanced analytics dashboard.
          </motion.p>
        </div>

        {/* Shortener Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ShortenForm />
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-5xl mx-auto">
          {[
            {
              icon: <Zap className="w-6 h-6 text-yellow-400" />,
              title: "Lightning Fast",
              desc: "Links generated in milliseconds, globally optimized for speed."
            },
            {
              icon: <MousePointerClick className="w-6 h-6 text-blue-400" />,
              title: "Live Analytics",
              desc: "Track clicks, referrers, and locations in real-time."
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
              title: "Secure Links",
              desc: "HTTPS-only redirection with advanced fraud protection."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group"
            >
              <div className="mb-4 p-3 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="py-10 text-center text-white/20 text-sm">
        <p>© 2024 ZipLink Premium. Built for the modern web.</p>
      </footer>
    </div>
  );
};

export default Index;