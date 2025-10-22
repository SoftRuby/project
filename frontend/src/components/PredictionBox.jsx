import { motion } from 'framer-motion';
import { Volume2, Trash2, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

const PredictionBox = ({ 
  prediction, 
  confidence, 
  modelUsed, 
  selectedModel, 
  onModelChange,
  sentence,
  onAddToSentence,
  onClearSentence 
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser');
    }
  };

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Model Selection */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Settings className="h-6 w-6 text-white" />
            <h3 className="text-xl font-bold text-white">AI Model</h3>
          </div>
        </div>
        
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onModelChange('vgg16')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              selectedModel === 'vgg16'
                ? 'bg-white text-indigo-600 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            VGG16
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onModelChange('resnet50')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              selectedModel === 'resnet50'
                ? 'bg-white text-indigo-600 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            ResNet50
          </motion.button>
        </div>
      </div>

      {/* Prediction Result */}
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-2xl p-8 shadow-2xl border-4 border-purple-500">
        <h3 className="text-2xl font-bold text-purple-300 mb-6 text-center">
          Translation Result
        </h3>
        
        {prediction ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="space-y-6"
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
                className="text-6xl font-black text-lime-400 mb-4 drop-shadow-[0_0_25px_rgba(163,230,53,0.5)]"
              >
                {prediction}
              </motion.div>
              
              <div className="flex items-center justify-center space-x-4 text-gray-300">
                <span className="text-sm">Confidence:</span>
                <span className="text-xl font-bold text-cyan-400">{confidence}%</span>
              </div>
              
              <div className="mt-2 text-xs text-gray-400">
                Model: <span className="text-purple-400 font-semibold">{modelUsed}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => speak(prediction)}
                disabled={isSpeaking}
                className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg hover:shadow-green-500/50 transition-all duration-200 disabled:opacity-50 glow-button"
              >
                <Volume2 className={`h-6 w-6 text-white ${isSpeaking ? 'animate-pulse' : ''}`} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onAddToSentence(prediction)}
                className="px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-200 glow-button"
              >
                Add to Sentence
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gray-400 text-lg"
            >
              <p className="mb-2">👋 Ready to translate!</p>
              <p className="text-sm">Capture or upload an ASL gesture</p>
            </motion.div>
          </div>
        )}
      </div>

      {/* Sentence Builder */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-2xl p-6 shadow-2xl border-2 border-blue-400">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Built Sentence</h3>
          {sentence && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClearSentence}
              className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-all duration-200"
            >
              <Trash2 className="h-5 w-5 text-red-400" />
            </motion.button>
          )}
        </div>
        
        <div className="min-h-[100px] bg-black/30 rounded-xl p-4 backdrop-blur-sm">
          {sentence ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-semibold text-white break-words"
            >
              {sentence}
            </motion.p>
          ) : (
            <p className="text-gray-500 italic text-center py-8">
              Your sentence will appear here...
            </p>
          )}
        </div>

        {sentence && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => speak(sentence)}
            className="mt-4 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-green-500/50 transition-all duration-200 flex items-center justify-center space-x-2 glow-button"
          >
            <Volume2 className="h-5 w-5" />
            <span>Speak Sentence</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default PredictionBox;
