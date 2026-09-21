import { useState, useEffect } from 'react';

export const useVideoModal = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

  const [hasAutoPlayed, setHasAutoPlayed] = useState(() => {
    if (typeof window === 'undefined') return false;

    try {
      return window.sessionStorage.getItem('videoAutoPlayed') === 'true';
    } catch (error) {
      console.error('Failed to read video modal state:', error);
      return false;
    }
  });

  const openVideoModal = (src, isAutoPlay = false) => {
    // If this is autoplay and we've already autoplayed, return
    if (isAutoPlay && hasAutoPlayed) return;
    setVideoSrc(src);
    setIsVideoModalOpen(true);

    // Mark as autoplayed if this was an autoplay trigger
    if (isAutoPlay) {
      setHasAutoPlayed(true);
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('videoAutoPlayed', 'true');
      }
    }
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setVideoSrc('');
  };

  return {
    isVideoModalOpen,
    videoSrc,
    openVideoModal,
    closeVideoModal,
    hasAutoPlayed
  };
};