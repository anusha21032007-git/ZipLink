"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Link2,
  Loader2,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Sparkles,
  BarChart3,
} from 'lucide-react';
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
      toast.success('ZipLink created successfully', {
        position: 'bottom-center',
        style: {
          background: 'rgba(0,0,0,0.75)',
          color: '#fff',
          fontSize: '0.85rem',
          padding: '8px 14px',
          borderRadius: '999px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        },
        duration: 4000,
      });
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
    toast.success('Copied Successfully', {
      position: 'bottom-center',
      style: {
        background: 'rgba(0,0,0,0.75)',
        color: '#fff',
        fontSize: '0.85rem',
        padding: '8px 14px',
        borderRadius: '999px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
      },
      duration: 3000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const isInputEmpty = !url.trim();

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Glass card with neon border */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-[1px] rounded-2xl overflow-hidden bg-[#090d22]/60 backdrop-blur-xl border border-white/10"
      >
        {/* Neon border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 opacity-30 rounded-2xl pointer-events-none" />
        <div className="relative bg-[#090d22]/80 backdrop-blur-xl rounded-xl p-4 space-y-3">
          <form onSubmit={handleSubmit} className="space-y-2">
            <motion.div
              animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg focus-within:ring-2 focus-within:ring-purple-500 transition-colors ${
                errorMsg ? 'border border-red-500/60' : 'border border-white/15'
              }`}
            >
              <AnimatePresence mode="wait">
                {favicon ? (
                  <motion.img
                    key="favicon"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    src={favicon}
                    alt="favicon"
                    className="w-5 h-5 rounded bg-white/20 p-[2px]"
                    onError={() => setFavicon(null)}
                  />
                ) : (
                  <motion.div key="globe" className="flex-shrink-0">
                    <Link2 className="w-5 h-5 text-white/60" />
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
                placeholder="Enter original link..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/40"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-xs font-medium text-white rounded-md hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Create</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </motion.div>

            {/* Error message */}
            <AnimatePresence>
              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-400 text-xs pl-2"
                >
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          {/* Result card – compact glass style */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0a0e1f]/70 backdrop-blur-md border border-white/10 rounded-xl p-3 space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-white/60">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>{result.clicks} Clicks</span>
                </div>

                <div className="flex flex-col gap-1">
                  <a
                    href={result.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/70 hover:text-white truncate"
                  >
                    {result.originalUrl}
                  </a>
                  <a
                    href={`/${result.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-purple-400 hover:underline"
                  >
                    {window.location.host}/{result.shortCode}
                  </a>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-md text-xs transition-colors"
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
                  <a
                    href={`/${result.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
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