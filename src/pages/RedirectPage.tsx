"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import { getUrlByCode } from '@/services/api';
import Background from '@/components/Background';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'error'>('loading');

  useEffect(() => {
    const performRedirect = async () => {
      if (!shortCode) return;
      
      const link = await getUrlByCode(shortCode);
      
      if (link) {
        // In a real app, this would be a server-side 301/302 redirect.
        // On the client, we use window.location.href.
        window.location.href = link.originalUrl;
      } else {
        setStatus('error');
      }
    };

    performRedirect();
  }, [shortCode]);

  if (status === 'error') {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center text-white p-6 bg-[#050505]">
        <Background />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-md p-10 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem]"
        >
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-bold">Invalid Alias</h1>
            <p className="text-white/40 font-light">The secure link you are trying to access does not exist or has expired.</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10 uppercase tracking-widest text-[10px] font-bold"
          >
            Return to Vault
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-white bg-[#050505]">
      <Background />
      <div className="relative flex flex-col items-center gap-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-t-2 border-r-2 border-[#C5A059] rounded-full"
        />
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[#C5A059] justify-center"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Establishing Secure Connection</span>
          </motion.div>
          <h2 className="text-2xl font-serif italic text-white/80">Verifying destination...</h2>
        </div>
      </div>
    </div>
  );
};

export default RedirectPage;