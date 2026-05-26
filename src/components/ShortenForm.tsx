"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Loader2, Copy, Check, ArrowRight, ExternalLink } from 'lucide-react';
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
      toast.success('Link generated');
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
    toast.success('Copied Successfully');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Input Section */}
      <motion.form 
        onSubmit={handleSubmit}
        className="relative group"
      >
        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#C5A059]/0 via-[#C5A059]/20 to-[#C5A059]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="relative flex flex-col md:flex-row gap-2 p-2 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl">
          <div className="flex-1 flex items-center px-4 gap-3">
            <Link2 className="text-[#C5A059] w-4 h-4 opacity-70" />
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your original long URL here..."
              className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-white/20 py-3 font-light"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-br from-[#C5A059] to-[#8E7949] text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:brightness-110 shadow-lg active:scale-95"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span className="uppercase tracking-widest text-[10px]">Shorten</span>
                <ArrowRight className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      </motion.form>

      {/* Result Section */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-2xl p-6 shadow-2xl space-y-6 overflow-hidden relative"
          >
            {/* Original Link */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059]/60 font-bold block">Original Link</label>
              <div className="bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-sm text-white/60 font-light truncate italic">
                {result.originalUrl}
              </div>
            </div>

            {/* Zipped Link */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059]/60 font-bold block">Zipped Link</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-black/40 border border-[#C5A059]/20 rounded-xl px-4 py-3 flex items-center justify-between group/link">
                  <a 
                    href={`/${result.shortCode}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-serif text-white hover:text-[#C5A059] transition-colors flex items-center gap-2"
                  >
                    ziplink.io/<span className="text-[#C5A059]">{result.shortCode}</span>
                    <ExternalLink className="w-3 h-3 opacity-30" />
                  </a>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10 uppercase tracking-widest text-[10px] font-bold whitespace-nowrap active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#C5A059]" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#C5A059]" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059]/60 font-bold">Impressions</p>
                <p className="text-2xl font-serif text-white">{result.clicks}</p>
              </div>
              <div className="text-[10px] uppercase tracking-[0.1em] text-white/10 font-medium">
                Verified Security • Private Beta
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShortenForm;
