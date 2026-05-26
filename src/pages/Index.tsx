"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import ShortenForm from '@/components/ShortenForm';
import { Zap, Shield, BarChart3, Share2, Github, Twitter, Linkedin } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      title: "Lightning Fast",
      desc: "Redirect in milliseconds via our global edge network optimization."
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      title: "Secure & Reliable",
      desc: "Advanced encryption and anti-spam protection for every single link."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-indigo-400" />,
      title: "Track & Analyze",
      desc: "Detailed insights into your traffic sources and geographic locations."
    },
    {
      icon: <Share2 className="w-6 h-6 text-cyan-400" />,
      title: "Simple Sharing",
      desc: "Share links effortlessly across all platforms with custom aliases."
    }
  ];

  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500/30 bg-[#02040a]">
      <Background />
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 md:pt-48 pb-20">
        {/* Hero Section */}
        <section className="text-center space-y-8 mb-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-bold uppercase tracking-widest text-blue-400"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            Fast • Secure • Smart
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
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
            className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            Transform long, messy URLs into clean, powerful smart links. <br className="hidden md:block" />
            Track clicks and share beautifully across the web.
          </motion.p>
        </section>

        {/* Shortener Card */}
        <section className="mb-40">
          <ShortenForm />
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-6xl mx-auto mb-40">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-white/40">Everything you need to manage your links like a pro.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-3xl group hover:bg-white/[0.05] transition-all"
              >
                <div className="mb-6 p-3 bg-white/[0.03] rounded-2xl w-fit group-hover:scale-110 group-hover:bg-blue-500/10 transition-all shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                <p className="text-white/30 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 md:py-20 bg-black/20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">ZipLink</span>
            </div>
            <p className="text-white/20 text-sm">© 2024 ZipLink Technologies. Built for the modern web.</p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
