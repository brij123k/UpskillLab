import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const VideoModal = ({ 
  isOpen, 
  onClose, 
  videoSrc, 
  title = "Video", 
  autoPlay = true,
  showControls = true
}) => {
  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-end justify-center sm:justify-end p-4"
        >
          {/* Backdrop without click handler */}
          <motion.div
            className="fixed inset-0"
          />

          {/* Modal container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: 0.3
            }}
            className="relative z-10 w-full max-w-md mx-4 mb-4"
          >
            {/* Modal content */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] p-3">
                <div className="flex items-center justify-between">
                  <motion.h2 
                    className="text-lg font-bold text-white truncate max-w-xs"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {title}
                  </motion.h2>
                  <motion.button
                    onClick={onClose}
                    className="text-white hover:text-[#FF7426] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Video player */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative w-full aspect-video bg-black"
                style={{ height: '240px' }}
              >
                <iframe
                  src={isOpen ? `${videoSrc}${autoPlay ? '&autoplay=1' : ''}` : ''}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>

              {/* Footer */}
              <motion.div 
                className="bg-gray-50 px-4 py-2 flex justify-end border-t border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={onClose}
                  className="px-3 py-1 text-sm font-medium text-[#4D2C5E] border border-[#4D2C5E] rounded-md hover:bg-[#4D2C5E] hover:text-white transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default VideoModal;