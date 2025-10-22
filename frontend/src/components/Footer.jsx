import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Developer Info */}
          <div className="text-center md:text-left">
            <p className="text-white text-lg font-semibold flex items-center justify-center md:justify-start space-x-2">
              <span>Developed with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="h-5 w-5 text-red-500 fill-current" />
              </motion.span>
              <span>by Aswin S</span>
            </p>
            <p className="text-purple-300 text-sm mt-1">
              B.Sc. Computer Science (AI & Data Science)
            </p>
            <p className="text-purple-400 text-xs">
              Sree Narayan Guru College
            </p>
          </div>

          {/* Project Info */}
          <div className="text-center">
            <p className="text-purple-200 text-sm font-medium">
              AI-Powered Accessibility Project
            </p>
            <p className="text-purple-400 text-xs mt-1">
              Computer Vision • Deep Learning • Web AI Systems
            </p>
          </div>

          {/* Social Links (Optional - can be customized) */}
          <div className="flex items-center space-x-4">
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              href="#"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200"
              title="GitHub"
            >
              <Github className="h-5 w-5 text-white" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              href="#"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200"
              title="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              href="#"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200"
              title="Email"
            >
              <Mail className="h-5 w-5 text-white" />
            </motion.a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-purple-700/50 text-center">
          <p className="text-purple-400 text-xs">
            © {new Date().getFullYear()} Sign Language Translator. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
