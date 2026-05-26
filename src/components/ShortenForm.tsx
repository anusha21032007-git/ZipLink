"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Loader2, Copy, Check, ArrowRight, ExternalLink, Sparkles, BarChart3, Clock } from 'lucide-react';
import { shortenUrl, getStoredLinks, ShortenedURL } from '@/services/api';
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
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);
  const [favicon, setFavicon] = useState<string | null>(null);
  const [recentLinks, setRecentLinks] = useState<ShortenedURL[]>([]);

  // Load links on mount
  useEffect(() => {
    setRecentLinks(getStoredLinks());
  }, []);

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
      setRecentLinks(getStoredLinks());
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

  const copyRecentToClipboard = (code: string, id: string) => {
    const shortUrl = `${window.location.origin}/${code}`;
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    toast.success('Copied Successfully');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isInputEmpty = !url.trim();

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Connected Interaction Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-[1px] rounded-3xl overflow-hidden group shadow-[0_25px_60px_rgba(0,0,0,0.8)] animate-fade-in"
      >
        {/* Glow border background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-indigo-500/30 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        <div className="relative bg-[#090d22]/95 backdrop-blur-3xl border border-white/15 rounded-[23px] p-5 md:p-8 space-y-5 md:space-y-6">
          
          {/* Subtitle Integrated INSIDE the Card */}
          <div className="text-center space-y-1 md:space-y-2 pb-2 md:pb-3 border-b border-white/10">
            <p className="text-white/80 text-xs md:text-sm font-medium max-w-xl mx-auto leading-relaxed">
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
              className={`flex flex-col md:flex-row gap-2.5 p-1.5 md:p-2 bg-white/[0.07] hover:bg-white/[0.09] focus-within:bg-white/[0.1] border rounded-xl transition-all duration-300 ${
                errorMsg 
                  ? 'border-red-500/60 focus-within:border-red-500' 
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

                <input 
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter original link here..."
                  className="w-full bg-transparent border-none outline-none text-white text-sm md:text-base placeholder:text-white/50 py-2 font-normal min-w-0"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto px-5 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 relative overflow-hidden active:scale-[0.98] ${
                  isInputEmpty 
                    ? 'opacity-80 hover:opacity-100 cursor-pointer hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
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

          {/* High Priority Success Result Card */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="mt-4 p-4 md:p-5 bg-white/[0.04] border border-white/15 rounded-2xl space-y-3 md:space-y-4"
              >
                {/* Result Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">ZipLink Ready</span>
                  </div>
                  {/* Total Click Badge inside active link */}
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[10px] text-white/70">
                    <BarChart3 className="w-3 h-3 text-blue-400" />
                    <span>{result.clicks} Clicks</span>
                  </div>
                </div>

                {/* Highly Dominant Shortened URL Presentation */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 justify-between bg-black/40 p-4 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <div className="text-center lg:text-left space-y-0.5 min-w-0 flex-1">
                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/50 block">Destination Alias</span>
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
                      className="flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 md:py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all text-xs font-bold uppercase tracking-wider active:scale-[0.98]"
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
                      className="flex items-center justify-center px-3.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-lg transition-all active:scale-[0.98]"
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

      {/* Dashboard showing list of stored shortened links */}
      {recentLinks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-2xl p-4 md:p-6 space-y-4"
        >
          {/* Responsive Header for Dashboard - Simplified to Remove Clear History */}
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white/80">My Shortened Links</h3>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-0.5">
            {recentLinks.map((link) => (
              <div 
                key={link.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all duration-200 gap-3"
              >
                {/* Text and info layout */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <a 
                      href={`/${link.shortCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-white hover:text-blue-400 transition-colors truncate max-w-full"
                    >
                      {window.location.host}/{link.shortCode}
                    </a>
                    <div className="flex items-center gap-1 text-[10px] text-white/40">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(link.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-white/40 truncate mt-1">
                    {link.originalUrl}
                  </p>
                </div>

                {/* Badges and action group */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-white/5 sm:border-none">
                  {/* Click Badge */}
                  <div className="px-2.5 py-1 bg-white/5 rounded-full border border-white/5 text-[10px] text-white/80 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{link.clicks} {link.clicks === 1 ? 'click' : 'clicks'}</span>
                  </div>

                  <div className="flex gap-1.5">
                    {/* Copy Link */}
                    <button
                      onClick={() => copyRecentToClipboard(link.shortCode, link.id)}
                      className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-white/70 hover:text-white transition-colors flex items-center justify-center"
                    >
                      {copiedId === link.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    {/* Visit */}
                    <a
                      href={`/${link.shortCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-white/70 hover:text-white transition-colors flex items-center justify-center"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ShortenForm;