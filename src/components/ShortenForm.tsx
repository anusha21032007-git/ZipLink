"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Loader2, Copy, Check, ArrowRight, ExternalLink, Globe } from 'lucide-react';
import { shortenUrl, ShortenedURL } from '@/services/api';
import { toast } from 'sonner';

// URL validator helper
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

// Domain extractor for favicon
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

  // Auto detect favicon on valid URL input
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

    if (!url.trim()) {
      return;
    }

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
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const isInputEmpty = !url.trim();

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Input Section */}
      <motion.form 
        onSubmit={handleSubmit}
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="relative group"
      >
        {/* Glow behind container */}
        <div className={`absolute -inset-[2px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-indigo-500/30 rounded-2xl blur-lg opacity-0 transition-opacity duration-500 ${!isInputEmpty ? 'group-hover:opacity-100' : ''}`} />
        
        <div className={`relative flex flex-col md:flex-row gap-2.5 p-2 bg-white/[0.02] backdrop-blur-3xl border rounded-2xl transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${
          errorMsg 
            ? 'border-red-500/40 focus-within:border-red-500' 
            : !isInputEmpty 
              ? 'border-white/10 focus-within:border-blue-500/50 focus-within:shadow-[0_0_25px_rgba(59,130,246,0.15)]' 
              : 'border-white/5'
        }`}>
          <div className="flex-1 flex items-center px-4 gap-3">
            <AnimatePresence mode="wait">
              {favicon ? (
                <motion.img 
                  key="favicon"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  src={favicon} 
                  alt="favicon" 
                  className="w-5 h-5 rounded-md bg-white/10 p-[2px]"
                  onError={() => setFavicon(null)}
                />
              ) : (
                <motion.div
                  key="globe"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
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
              className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-white/20 py-3 font-light"
            />
          </div>

          <button 
            type="submit"
            disabled={loading || isInputEmpty}
            className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 relative overflow-hidden group/btn active:scale-[0.98] ${
              isInputEmpty 
                ? 'opacity-40 cursor-not-allowed' 
                : 'hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:brightness-110'
            }`}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span className="uppercase tracking-widest">Create ZipLink</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </motion.form>

      {/* Inline Error State */}
      <AnimatePresence>
        {errorMsg && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-400 text-xs font-light tracking-wide pl-2"
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Enhanced Success Card */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative p-[1px] rounded-2xl overflow-hidden shadow-3xl group/result"
          >
            {/* Subtle card glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 opacity-30 group-hover/result:opacity-50 transition-opacity duration-500" />
            
            <div className="relative bg-[#060812]/80 backdrop-blur-3xl border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
              
              {/* Card Header with favicon and title */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/[0.04] rounded-lg border border-white/5">
                    {favicon ? (
                      <img src={favicon} alt="Domain" className="w-5 h-5 rounded" />
                    ) : (
                      <Globe className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white/80 uppercase tracking-widest">Secure Link Ready</h4>
                    <p className="text-[10px] text-white/30 font-light truncate max-w-[200px] md:max-w-md italic">{result.originalUrl}</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-md font-semibold">
                  Active
                </span>
              </div>

              {/* Generated link presentation */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1 block">Zipped Alias</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 flex items-center justify-between">
                    <span className="text-lg md:text-xl font-medium tracking-tight text-white font-serif">
                      ziplink.io/<span className="text-blue-400 font-semibold">{result.shortCode}</span>
                    </span>
                  </div>
                  
                  <div className="flex gap-2.5">
                    {/* Copy Button */}
                    <button 
                      onClick={copyToClipboard}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10 text-xs font-bold uppercase tracking-wider active:scale-[0.98]"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-400 animate-scale" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-blue-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    {/* Open Button */}
                    <a 
                      href={`/${result.shortCode}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 rounded-xl transition-all active:scale-[0.98]"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Animated waveform visual decoration */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30 tracking-widest uppercase font-semibold">
                <span>Enterprise Edge Encryption</span>
                <span>Active Vault Route</span>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShortenForm;
