"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
    >
      <div className="bg-black/40 backdrop-blur-2xl border border-white/5 rounded-full px-8 py-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#C5A059] to-[#8E7949] rounded-full shadow-[0_0_20px_rgba(197,160,89,0.3)]">
            <Link2 className="w-5 h-5 text-black" />
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight text-white">
            ZipLink<span className="text-[#C5A059]">.</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Features', 'Intelligence', 'Enterprise'].map((item) => (
            <a key={item} href="#" className="text-xs uppercase tracking-[0.2em] font-semibold text-white/50 hover:text-[#C5A059] transition-all">
              {item}
            </a>
          ))}
        </div>

        <button className="px-6 py-2.5 rounded-full bg-[#C5A059] text-black text-xs uppercase tracking-widest font-bold hover:bg-[#D9B36A] transition-all hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] active:scale-95">
          Join Elite
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;