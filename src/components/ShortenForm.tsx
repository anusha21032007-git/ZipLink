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
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-[1px] rounded-3xl overflow-hidden group"
      >
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50 opacity-20 group-hover:opacity-40 transition-opacity" />
        
        <div className="relative bg-[#0a0c14]/40 backdrop-blur-2xl p-6 md:p-10 rounded-[23px] border border-white/5 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-4 flex items-center text-white/30">
                  <Link2 className="w-5 h-5" />
                </div>
                <input 
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter original link here..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-12 py-4 text-white placeholder:text-white/20 outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    ZIP LINK
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Result Card */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-10 pt-10 border-t border-white/5 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Shortened URL Display */}
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">Zipped Link</label>
                      <div className="flex gap-2">
                        <input 
                          readOnly
                          value={`ziplink.io/${result.shortCode}`}
                          className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-blue-400 font-medium outline-none"
                        />
                        <button 
                          onClick={copyToClipboard}
                          className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-white transition-all group/copy relative active:scale-90"
                        >
                          <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur opacity-0 group-hover/copy:opacity-100 transition-opacity" />
                          {copied ? <Check className="w-5 h-5 text-green-400 relative z-10" /> : <Copy className="w-5 h-5 relative z-10" />}
                        </button>
                      </div>
                    </div>

                    {/* Stats Display */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-white/30 mb-1">
                          <BarChart3 className="w-3 h-3" />
                          <span className="text-[9px] uppercase tracking-wider font-bold">Total Clicks</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{result.clicks}</p>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-white/30 mb-1">
                          <Calendar className="w-3 h-3" />
                          <span className="text-[9px] uppercase tracking-wider font-bold">Created</span>
                        </div>
                        <p className="text-sm font-medium text-white/80">
                          {new Date(result.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Animated Mini Graph Decoration */}
                  <div className="w-full h-12 bg-white/[0.02] rounded-xl overflow-hidden flex items-end px-2 gap-1">
                    {[40, 70, 45, 90, 65, 30, 80, 50, 60, 40, 85, 75, 55, 95, 60, 40, 70, 50].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, duration: 1 }}
                        className="flex-1 bg-gradient-to-t from-blue-500/20 to-purple-500/20 rounded-t-sm"
                      />
                    ))}
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
