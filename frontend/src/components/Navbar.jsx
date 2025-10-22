import { motion } from 'framer-motion';
import { Languages, Sparkles } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Languages className="h-10 w-10 text-yellow-300" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
                <span>Sign Language Translator</span>
                <Sparkles className="h-6 w-6 text-yellow-300" />
              </h1>
              <p className="text-sm text-purple-200">AI-Powered ASL Recognition</p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <span className="px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
                Real-time Translation
              </span>
              <span className="px-4 py-2 rounded-full bg-green-500/30 text-green-200 text-sm font-medium backdrop-blur-sm flex items-center space-x-2">
                <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Live</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
