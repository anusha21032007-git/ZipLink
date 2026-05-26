import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, ExternalLink, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#02040a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 max-w-md"
      >
        <div className="w-16 h-16 bg-[#050505]/80 border border-white/10 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-[#C5A059] animate-pulse" />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Link Not Found
          </h1>
          <p className="text-white/70 font-light max-w-md mx-auto">
            The smart link you are trying to access does not exist or has expired.
          </p>
        </div>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10 uppercase tracking-widest text-[10px] font-bold"
        >
          Return to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;