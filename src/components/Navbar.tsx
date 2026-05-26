"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-6xl flex justify-center"
      >
        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center shadow-2xl overflow-hidden">
          {/* Logo Only */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-lg shadow-blue-500/20">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              ZipLink
            </span>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
