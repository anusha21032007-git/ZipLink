"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Loader2, Copy, Check, ArrowRight, BarChart3, Calendar } from 'lucide-react';
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
    try {
      const data = await shortenUrl(url);
      setResult(data);
      toast.success('Link zipped successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Error zipping link');
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

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-[1px] rounded-2xl overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 opacity-20 group-hover:opacity-40 transition-opacity" />
        
        <div className="relative bg-[#0a0c14]/40 backdrop-blur-2xl p-4 md:p-6 rounded-[15px] border border-white/5 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-4 flex items-center text-white/30">
                <Link2 className="w-4 h-4" />
              </div>
              <input 
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your original long URL here..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-10 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-xl hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 whitespace-nowrap"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  ZIP LINK
                  <ArrowRight className="w-3 h-3" />
                </>
              )}
            </button>
          </form>

          {/* Compact Result Card */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Shortened URL Display */}
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold ml-1">Zipped Alias</label>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-blue-400 font-medium truncate">
                          ziplink.io/{result.shortCode}
                        </div>
                        <button 
                          onClick={copyToClipboard}
                          className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-white transition-all text-[10px] font-bold uppercase tracking-wider active:scale-95"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Compact Stats */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-lg p-3 flex flex-col justify-center">
                        <span className="text-[8px] uppercase tracking-wider font-bold text-white/20 mb-0.5">Impressions</span>
                        <p className="text-xl font-bold text-white">{result.clicks}</p>
                      </div>
                      <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-lg p-3 flex flex-col justify-center">
                        <span className="text-[8px] uppercase tracking-wider font-bold text-white/20 mb-0.5">Security</span>
                        <p className="text-[10px] font-medium text-green-400/70">Verified</p>
                      </div>
                    </div>
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
