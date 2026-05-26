"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Loader2, Copy, Check, ArrowRight, ExternalLink, Globe, Sparkles } from 'lucide-react';
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
  }, [url]);

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
    <div className="w-full max-w-3xl mx-auto">
      {/* Connected Interaction Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-[1px] rounded-3xl overflow-hidden group shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
      >
        {/* Glow border background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
        
        <div className="relative bg-[#060812]/90 backdrop-blur-3xl border border-white/10 rounded-[23px] p-6 md:p-8 space-y-6">
          
          {/* Subtitle Integrated INSIDE the Card */}
          <div className="text-center space-y-2 pb-2 border-b border-white/5">
            <p className="text-white/60 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
              Transform long, messy URLs into clean, powerful smart links. Track clicks and share beautifully across the web.
            </p>
          </div>

          {/* Form Input Section */}
          <form 
            onSubmit={handleSubmit}
            className="space-y-2"
          >
            <motion.div 
              animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`flex flex-col md:flex-row gap-2.5 p-1.5 bg-white/[0.02] border rounded-xl transition-all duration-300 ${
                errorMsg 
                  ? 'border-red-500/40 focus-within:border-red-500' 
                  : !isInputEmpty 
                    ? 'border-white/10 focus-within:border-blue-500/50' 
                    : 'border-white/5'
              }`}
            >
              <div className="flex-1 flex items-center px-3 gap-2.5">
                <AnimatePresence mode="wait">
                  {favicon ? (
                    <motion.img 
                      key="favicon"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      src={favicon} 
                      alt="favicon" 
                      className="w-4.5 h-4.5 rounded bg-white/10 p-[2px]"
                      onError={() => setFavicon(null)}
                    />
                  ) : (
                    <motion.div key="globe">
                      <Link2 className="text-white/30 w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <input 
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter original link here..."
                  className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-white/20 py-2.5 font-light"
                />
              </div>

              <button 
                type="submit"
                disabled={loading || isInputEmpty}
                className={`px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 relative overflow-hidden active:scale-[0.98] ${
                  isInputEmpty 
                    ? 'opacity-30 cursor-not-allowed' 
                    : 'hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:brightness-110'
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
                  className="text-red-400 text-[11px] font-light pl-2"
                >
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          {/* High Priority Success Result Card */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="mt-4 p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4"
              >
                {/* Result Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">ZipLink Ready</span>
                  </div>
                  {favicon && (
                    <div className="flex items-center gap-1.5 text-white/30 text-[10px] font-light">
                      <img src={favicon} alt="Domain" className="w-3.5 h-3.5 rounded" />
                      <span className="truncate max-w-[120px] italic">{result.originalUrl}</span>
                    </div>
                  )}
                </div>

                {/* Highly Dominant Shortened URL Presentation */}
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-between bg-black/30 p-4 rounded-xl border border-white/5 hover:border-blue-500/20 transition-all duration-300">
                  <div className="text-center sm:text-left space-y-0.5">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 block">Destination Alias</span>
                    <a 
                      href={`/${result.shortCode}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xl md:text-2xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors duration-200"
                    >
                      ziplink.io/<span className="text-blue-400">{result.shortCode}</span>
                    </a>
                  </div>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    {/* Copy Button */}
                    <button 
                      onClick={copyToClipboard}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all text-xs font-bold uppercase tracking-wider active:scale-[0.98]"
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
                      className="flex items-center justify-center p-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all active:scale-[0.98]"
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
