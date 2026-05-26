"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#02040a]">
      {/* Neon blob 1 */}
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full bg-purple-600/15 blur-3xl"
      />
      {/* Neon blob 2 */}
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 120, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/3 right-0 w-[250px] h-[250px] rounded-full bg-cyan-600/15 blur-3xl"
      />
      {/* Star/particle overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.04),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.04),transparent_60%)]" />
    </div>
  );
};

export default Background;