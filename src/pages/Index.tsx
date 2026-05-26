"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import ShortenForm from '@/components/ShortenForm';
import { Zap, Shield, BarChart3 } from 'lucide-react';

const Index = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="h-screen w-full text-white font-sans selection:bg-blue-500/30 bg-[#02040a] flex flex-col overflow-hidden">
      <Background />
      <Navbar />
      
      {/* Main content optimized for viewport usage */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 md:px-6 relative z-10 pt-12">
        <div className="w-full max-w-4xl mx-auto space-y-3 md:space-y-4">
          
          {/* Hero Section - reduced scale and spacing */}
          <section className="text-center space-y-1">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.2] text-center"
            >
              Zip Your Links <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                Instantly.
              </span>
            </motion.h1>
          </section>

          {/* Interactive Shortener Card - tighter spacing */}
          <section className="relative">
            <ShortenForm />
          </section>

          {/* Mini Features - compact spacing */}
          <div className="hidden sm:flex justify-center gap-8 pt-1">
            {[
              { icon: <Zap className="w-3.5 h-3.5 text-blue-400/80" />, label: "Real-time Edge" },
              { icon: <Shield className="w-3.5 h-3.5 text-purple-400/80" />, label: "Secured Vault" },
              { icon: <BarChart3 className="w-3.5 h-3.5 text-indigo-400/80" />, label: "Smart Analytics" }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2 text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold text-white/30 hover:text-white/60 transition-colors"
              >
                {f.icon}
                {f.label}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Fixed footer at the bottom */}
      <footer className="shrink-0 py-2 text-center relative z-10 px-4">
        <p className="text-white/20 hover:text-white/40 transition-colors duration-300 text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-semibold leading-relaxed">
          © {currentYear} ZipLink Premium • All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Index;
＜/dyad-write>

＜dyad-write path="src/components/ShortenForm.tsx" description="Refine mobile layout with optimized spacing, touch-friendly sizing, and proper responsive behavior for all elements.">
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Loader2, Copy, Check, ArrowRight, ExternalLink, Sparkles, BarChart3 } from 'lucide-react';
import { shortenUrl, ShortenedURL } from '@/services/api';
import { toast } from 'sonner';

const checkValidUrl = (string: string) => {
  if (!string) return false;
  try {
    let urlString = string;
    if (!/^https?:\/\//i.test(string)) {
      urlString = 'https://' + string;
    }
    const url = new URL(urlString);
    return url.hostname.includes('.') && url.hostname.split('.').pop()!.length >= 2;
  } catch (_) {
    return false;
  }
};

const getFaviconUrl = (urlString: string) => {
  try {
    let formatted = urlString;
    if (!/^https?:\/\//i.test(urlString)) {
      formatted = 'https://' + urlString;
    }
    const parsed = new URL(formatted);
    return `https://www.google.com/s2/favicons?sz=64&domain=${parsed.hostname}`;
  } catch (_) {
    return null;
  }
};

const ShortenForm = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ShortenedURL | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);
  const [favicon, setFavicon] = useState<string | null>(null);

  useEffect(() => {
    if (checkValidUrl(url)) {
      setFavicon(getFaviconUrl(url));
      setErrorMsg('');
    } else {
      setFavicon(null);
    }
  }, [url];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!url.trim()) return;

    if (!checkValidUrl(url)) {
      setErrorMsg('Please enter a valid destination URL (e.g., google.com)');
      setShake(true);
      toast.error('Invalid URL specified');
      setTimeout(() => setShake(false), 500);
      return;
    }

    setLoading(true);
    try {
      const data = await shortenUrl(url.startsWith('http') ? url : `https://${url}`);
      setResult(data);
      toast.success('ZipLink created successfully');
    } catch (error: any) {
      setErrorMsg(error.message || 'Error creating ZipLink');
      setShake(true);
      toast.error('Failed to create ZipLink');
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const shortUrl = `${window.location.origin}/${result.shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success('Copied Successfully');
    setTimeout(() => setCopied(false), 2000);
  };

  const isInputEmpty = !url.trim();

  return (
    <div className="w-full max-w-3xl mx-auto space-y-2">
      {/* Connected Interaction Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-[1px] rounded-3xl overflow-hidden group shadow-[0_25px_60px_rgba(0,0,0,0.8)] animate-fade-in"
      >
        {/* Glow border background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-indigo-500/30 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        <div className="relative bg-[#090d22]/95 backdrop-blur-3xl border border-white/15 rounded-[23px] p-3 md:p-5 space-y-1.5">
          
          {/* Subtitle Integrated INSIDE the Card */}
          <div className="text-center space-y-1 pb-1 md:pb-1.5 border-b border-white/10">
            <p className="text-white/80 text-xs md:text-sm font-medium max-w-xl mx-auto leading-relaxed">
              Transform long, messy URLs into clean, powerful smart links. Track clicks and share beautifully across the web.
            </p>
          </div>

          {/* Form Input Section */}
          <form 
            onSubmit={handleSubmit}
            className="space-y-1.5"
          >
            <motion.div 
              animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`flex flex-col md:flex-row gap-2 p-1.5 md:p-2 bg-white/[0.07] hover:bg-white/[0.09] focus-within:bg-white/[0.1] rounded-xl transition-all duration-300 ${
                errorMsg                   ? 'border-red-500/60 focus-within:border-red-500' 
                  : !isInputEmpty 
                    ? 'border-white/20 focus-within:border-blue-500/70 focus-within:shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                    : 'border-white/15 focus-within:border-blue-500/50'
              }`}
            >
              <div className="flex-1 flex items-center px-2 md:px-3 gap-2">
                <AnimatePresence mode="wait">
                  {favicon ? (
                    <motion.img 
                      key="favicon"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      src={favicon} 
                      alt="favicon" 
                      className="w-4 h-4 md:w-5 md:h-5 rounded bg-white/20 p-[2px] flex-shrink-0"
                      onError={() => setFavicon(null)}
                    />
                  ) : (
                    <motion.div key="globe" className="flex-shrink-0">
                      <Link2 className="text-white/60 w-4 h-4 md:w-5 md:h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <input                   type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter original link here..."
                  className="w-full bg-transparent border-none outline-none text-white text-sm md:text-base placeholder:text-white/50 py-1.5 font-normal min-w-0"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 relative overflow-hidden active:scale-[0.98] transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:brightness-110 cursor-pointer ${
                  isInputEmpty                     ? 'opacity-80 hover:opacity-100 cursor-pointer' 
                    : 'hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:brightness-110 cursor-pointer'
                }`}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span className="uppercase tracking-widest text-[10px]">Create ZipLink</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </motion.div>

            {/* Error messaging */}
            <AnimatePresence>
              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-400 text-xs font-medium pl-2"
                >
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          {/* High Priority Success Result Card - tighter spacing */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="p-2 md:p-3 bg-white/[0.04] border border-white/15 rounded-2xl space-y-1.5"
              >
                {/* Result Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">ZipLink Ready</span>
                  </div>
                  {/* Total Click Badge inside active link */}
                  <div className="flex items-center gap-1 px-1 py-0.5 bg-white/5 border border-white/10 rounded-full text-[8px] md:text-[9px] text-white/70">
                    <BarChart3 className="w-3 h-3 text-blue-400" />
                    <span>{result.clicks} Clicks</span>
                  </div>
                </div>

                {/* Highly Dominant Shortened URL Presentation */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 justify-between bg-black/40 p-2 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <div className="text-center lg:text-left space-y-0.5 min-w-0 flex-1">
                    <span className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-white/50 block">Destination Alias</span>
                    <a 
                      href={`/${result.shortCode}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg md:text-2xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors duration-200 block truncate"
                    >
                      {window.location.host}/<span className="text-blue-400">{result.shortCode}</span>
                    </a>
                  </div>
                  
                  <div className="flex gap-2 w-full lg:w-auto">
                    {/* Copy Button */}
                    <button 
                      onClick={copyToClipboard}
                      className="flex-1 lg:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 md:py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all text-xs font-bold uppercase tracking-wider active:scale-[0.98] transform hover:scale-[1.01] hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    {/* Open Button */}
                    <a 
                      href={`/${result.shortCode}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-lg transition-all active:scale-[0.98]"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
};

export default ShortenForm;
＜/dyad-write>

<dyad-chat-summary>Completely refined mobile layout with optimized spacing, touch-friendly sizing, and proper responsive behavior＜/dyad-chat-summary></think><dyad-write path="src/pages/Index.tsx" description="Refine mobile layout with proper spacing, hero scaling, and container proportions to create a breathable, mobile-first experience without redesigning the brand.">
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import ShortenForm from '@/components/ShortenForm';
import { Zap, Shield, BarChart3 } from 'lucide-react';

const Index = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="h-screen w-full text-white font-sans selection:bg-blue-500/30 bg-[#02040a] flex flex-col overflow-hidden">
      <Background />
      <Navbar />
      
      {/* Mobile-optimized main content */}
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 relative z-10 pt-12">
        <div className="w-full max-w-2xl mx-auto space-y-3 md:space-y-4">
          
          {/* Mobile-optimized hero section */}
          <section className="text-center space-y-1">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight leading-[1.2] text-center"
            >
              Zip Your Links <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                Instantly.
              </span>
            </motion.h1>
          </section>

          {/* Mobile-first interactive card */}
          <section className="relative">
            <ShortenForm />
          </section>

          {/* Mobile-friendly feature highlights */}
          <div className="flex flex-col sm:hidden gap-4 pt-2">
            {[
              { icon: <Zap className="w-4 h-4 text-blue-400/70" />, label: "Real-time Edge" },
              { icon: <Shield className="w-4 h-4 text-purple-400/70" />, label: "Secured Vault" },
              { icon: <BarChart3 className="w-4 h-4 text-indigo-400/70" />, label: "Smart Analytics" }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-medium text-white/40 hover:text-white/70 transition-colors"
              >
                {f.icon}
                {f.label}
              </motion.div>
            ))}
          </div>

          {/* Desktop feature row - hidden on mobile */}
          <div className="hidden sm:flex justify-center gap-6 pt-2">
            {[
              { icon: <Zap className="w-3.5 h-3.5 text-blue-400/80" />, label: "Real-time Edge" },
              { icon: <Shield className="w-3.5 h-3.5 text-purple-400/80" />, label: "Secured Vault" },
              { icon: <BarChart3 className="w-3.5 h-3.5 text-indigo-400/80" />, label: "Smart Analytics" }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2 text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold text-white/30 hover:text-white/60 transition-colors"
              >
                {f.icon}
                {f.label}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Natural footer placement */}
      <footer className="py-3 text-center relative z-10 px-4">
        <p className="text-white/20 hover:text-white/40 transition-colors duration-300 text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-semibold leading-relaxed">
          © {currentYear} ZipLink Premium • All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Index;