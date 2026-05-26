"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Link2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            ZipLink
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Pricing</a>
          <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">API</a>
        </div>

        <button className="px-5 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all active:scale-95">
          Get Started
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;