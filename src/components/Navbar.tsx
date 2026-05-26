"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-start p-4 md:p-8 pointer-events-none">
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="pointer-events-auto bg-[#060812]/50 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 md:px-5 md:py-2.5 flex items-center shadow-xl shadow-black/40"
      >
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="p-1 md:p-1.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-md shadow-blue-500/10">
            <Link2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
          </div>
          <span className="text-xs md:text-sm font-bold tracking-tight text-white">
            ZipLink
          </span>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;