import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import WebcamCapture from './components/WebcamCapture';
import PredictionBox from './components/PredictionBox';
import Footer from './components/Footer';
import { AlertCircle } from 'lucide-react';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [modelUsed, setModelUsed] = useState('');
  const [selectedModel, setSelectedModel] = useState('vgg16');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sentence, setSentence] = useState('');

  const handleCapture = async (imageSrc) => {
    setIsLoading(true);
    setError(null);

    try {
      // Convert base64 to blob
      const response = await fetch(imageSrc);
      const blob = await response.blob();

      // Create form data
      const formData = new FormData();
      formData.append('image', blob, 'capture.jpg');
      formData.append('model', selectedModel);

      // Send to backend
      const apiResponse = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Update state with prediction results
      setPrediction(data.prediction);
      setConfidence(data.confidence);
      setModelUsed(data.model_used);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message || 'Failed to get prediction. Make sure the backend server is running on port 5000.');
      setPrediction(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
    // Clear previous prediction when switching models
    setPrediction(null);
    setConfidence(0);
  };

  const handleAddToSentence = (word) => {
    setSentence(prev => prev ? `${prev} ${word}` : word);
  };

  const handleClearSentence = () => {
    setSentence('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-500/20 border-2 border-red-500 rounded-xl p-4 backdrop-blur-sm"
          >
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
              <div>
                <p className="text-red-200 font-semibold">Error</p>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Webcam */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                📸 Capture Gesture
              </h2>
              <WebcamCapture onCapture={handleCapture} isLoading={isLoading} />
            </motion.div>
          </div>

          {/* Right Column - Prediction */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                🔮 AI Translation
              </h2>
              <PredictionBox
                prediction={prediction}
                confidence={confidence}
                modelUsed={modelUsed}
                selectedModel={selectedModel}
                onModelChange={handleModelChange}
                sentence={sentence}
                onAddToSentence={handleAddToSentence}
                onClearSentence={handleClearSentence}
              />
            </motion.div>
          </div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/30"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-5xl mb-3">📹</div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                1. Capture
              </h3>
              <p className="text-gray-300 text-sm">
                Use your webcam or upload an image of an ASL gesture
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">🤖</div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                2. AI Processing
              </h3>
              <p className="text-gray-300 text-sm">
                Deep learning models (VGG16/ResNet50) analyze the gesture
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">💬</div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                3. Translation
              </h3>
              <p className="text-gray-300 text-sm">
                Get instant text and audio translation of the sign
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-2xl p-8 backdrop-blur-sm border border-cyan-500/30"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-cyan-300 font-semibold">✨ Real-time Recognition</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-cyan-300 font-semibold">🎯 High Accuracy</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-cyan-300 font-semibold">🔊 Text-to-Speech</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-cyan-300 font-semibold">📝 Sentence Builder</p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
