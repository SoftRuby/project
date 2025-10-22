import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { Camera, Upload, Loader2 } from 'lucide-react';

const WebcamCapture = ({ onCapture, isLoading }) => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
        onCapture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: 'user',
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Webcam Container */}
      <div className="relative">
        <div className="border-4 border-cyan-400 rounded-2xl overflow-hidden shadow-2xl bg-gray-900 animate-glow">
          {imgSrc ? (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={imgSrc}
              alt="Captured"
              className="w-full h-[480px] object-cover"
            />
          ) : (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-[480px] object-cover"
              mirrored={true}
            />
          )}
        </div>
        
        {/* Overlay when loading */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center"
          >
            <div className="text-center">
              <Loader2 className="h-16 w-16 text-cyan-400 animate-spin mx-auto" />
              <p className="text-white mt-4 text-lg font-semibold">Analyzing gesture...</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={capture}
          disabled={isLoading}
          className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed glow-button"
        >
          <Camera className="h-6 w-6" />
          <span>Capture & Translate</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-purple-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed glow-button"
        >
          <Upload className="h-6 w-6" />
          <span>Upload Image</span>
        </motion.button>

        {imgSrc && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setImgSrc(null)}
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-red-500/50 transition-all duration-200 glow-button"
          >
            Clear
          </motion.button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </motion.div>
  );
};

export default WebcamCapture;
