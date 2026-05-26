"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-start p-6 md:p-8 pointer-events-none">
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="pointer-events-auto bg-[#060812]/40 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 flex items-center shadow-2xl"
      >
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-lg shadow-blue-500/20">
            <Link2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white">
            ZipLink
          </span>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;