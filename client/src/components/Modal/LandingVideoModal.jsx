import { useState, useEffect } from 'react';

export const useVideoModal = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');
  
  // Use sessionStorage instead of localStorage so it only persists for the session
  const [hasAutoPlayed, setHasAutoPlayed] = useState(
    sessionStorage.getItem('videoAutoPlayed') === 'true'
  );

  const openVideoModal = (src, isAutoPlay = false) => {
    // If this is autoplay and we've already autoplayed, return
    if (isAutoPlay && hasAutoPlayed) return;
    
    setVideoSrc(src);
    setIsVideoModalOpen(true);
    
    // Mark as autoplayed if this was an autoplay trigger
    if (isAutoPlay) {
      setHasAutoPlayed(true);
      sessionStorage.setItem('videoAutoPlayed', 'true');
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