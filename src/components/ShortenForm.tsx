"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Sparkles, Loader2, Copy, Check, BarChart2 } from 'lucide-react';
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
      toast.success('Link shortened successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const shortUrl = `${window.location.origin}/${result.shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <motion.form 
        onSubmit={handleSubmit}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex flex-col md:flex-row gap-3 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <div className="flex-1 flex items-center px-4 gap-3">
            <Link2 className="text-white/40 w-5 h-5" />
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long link here..."
              className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/20 py-3"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Shorten
              </>
            )}
          </button>
        </div>
      </motion.form>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BarChart2 className="w-24 h-24" />
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-white/40 font-medium">Original URL</p>
                  <p className="text-white truncate max-w-md font-medium">{result.originalUrl}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/40 font-medium">Total Clicks</p>
                  <p className="text-2xl font-bold text-blue-400">{result.clicks}</p>
                </div>
              </div>

              <div className="h-px bg-white/10 w-full" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-white/40 font-medium">Shortened Link</p>
                  <p className="text-xl font-bold text-white tracking-tight">
                    ziplink.io/<span className="text-blue-500">{result.shortCode}</span>
                  </p>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Link
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