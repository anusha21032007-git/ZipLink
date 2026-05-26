"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Sparkles, Loader2, Copy, Check, BarChart2, ArrowRight } from 'lucide-react';
import { shortenUrl, ShortenedURL } from '@/services/api';
import { toast } from 'sonner';

const ShortenForm = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ShortenedURL | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setResult(null);
    try {
      const data = await shortenUrl(url);
      setResult(data);
      toast.success('Your premium link is ready');
    } catch (error: any) {
      toast.error(error.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const shortUrl = `${window.location.origin}/${result.shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success('Link secured to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-12">
      <motion.form 
        onSubmit={handleSubmit}
        className="relative group"
      >
        <div className="absolute -inset-[2px] bg-gradient-to-r from-[#C5A059]/0 via-[#C5A059]/30 to-[#C5A059]/0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="relative flex flex-col md:flex-row gap-4 p-3 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl">
          <div className="flex-1 flex items-center px-6 gap-4">
            <Link2 className="text-[#C5A059] w-5 h-5 opacity-70" />
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your destination URL..."
              className="w-full bg-transparent border-none outline-none text-white text-lg placeholder:text-white/20 py-4 font-light"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="px-10 py-4 bg-gradient-to-br from-[#C5A059] to-[#8E7949] text-black font-bold rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 hover:brightness-110 shadow-lg active:scale-95"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span className="uppercase tracking-widest text-xs">Shorten</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.form>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-8 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-3xl border border-white/5 rounded-[2.5rem] relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-[#C5A059]">
              <Sparkles className="w-32 h-32" />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">Source link</p>
                  <p className="text-white/70 truncate max-w-sm font-light italic">{result.originalUrl}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">Impressions</p>
                  <p className="text-3xl font-serif text-white">{result.clicks}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">Generated Alias</p>
                  <p className="text-3xl font-serif text-white tracking-tight">
                    ziplink.io/<span className="text-[#C5A059]">{result.shortCode}</span>
                  </p>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10 uppercase tracking-widest text-[10px] font-bold"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#C5A059]" />
                      Secured
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#C5A059]" />
                      Capture Link
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShortenForm;