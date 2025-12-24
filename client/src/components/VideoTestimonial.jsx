import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiChevronLeft, FiChevronRight, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { getDataHandler } from '../config/services';

const VideoTestimonial = () => {
  const [videoTestimonials, setVideoTestimonials] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const videoRef = useRef(null);
  const youtubePlayerRef = useRef(null);
  const containerRef = useRef(null);
  const autoPlayInterval = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const isYoutubeVideo = useRef(false);

  const handleVideoTestimonialsData = async () => {
    try {
      setIsLoading(true);
      const res = await getDataHandler("videoTestimonials");
      console.log(res)
      if (res) {
        const activeTestimonials = res.filter(testimonial => testimonial.isActive);
        setVideoTestimonials(activeTestimonials);
        if (activeTestimonials.length > 0) {
          setCurrentVideoIndex(0);
        }
      }
    } catch (error) {
      console.error("Error fetching video testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if URL is YouTube
  const isYouTubeUrl = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Extract YouTube video ID
  const getYouTubeId = (url) => {
    if (!url) return '';
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : '';
  };

  useEffect(() => {
    handleVideoTestimonialsData();
    
    // Handle fullscreen change
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      stopAutoPlay();
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Handle scroll to top when video changes
  useEffect(() => {
    if (videoTestimonials.length > 0) {
      // Scroll video to top when changing
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      // Reset progress and playing state
      setVideoProgress(0);
      setIsPlaying(true);
    }
  }, [currentVideoIndex, videoTestimonials.length]);

  // Handle autoplay
  useEffect(() => {
    if (videoTestimonials.length > 0 && !isHovering) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => {
      stopAutoPlay();
    };
  }, [videoTestimonials.length, currentVideoIndex, isHovering]);

  // Initialize YouTube player if needed
  useEffect(() => {
    const currentVideo = videoTestimonials[currentVideoIndex];
    if (!currentVideo?.videoUrl) return;

    if (isYouTubeUrl(currentVideo.videoUrl)) {
      isYoutubeVideo.current = true;
      // YouTube player will be loaded in the iframe
    } else {
      isYoutubeVideo.current = false;
      // Handle regular video autoplay
      if (videoRef.current && isPlaying) {
        videoRef.current.play().catch(e => {
          console.log("Autoplay prevented:", e);
          setIsPlaying(false);
        });
      }
    }
  }, [currentVideoIndex, videoTestimonials, isPlaying]);

  // YouTube API callback
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.onYouTubeIframeAPIReady) {
      window.onYouTubeIframeAPIReady = () => {
        console.log('YouTube API ready');
      };
    }
  }, []);

  const startAutoPlay = () => {
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
    }

    autoPlayInterval.current = setInterval(() => {
      nextVideo();
    }, 10000);
  };

  const stopAutoPlay = () => {
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
      autoPlayInterval.current = null;
    }
  };

  const nextVideo = () => {
    if (videoTestimonials.length === 0 || isHovering) return;
    
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === videoTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevVideo = () => {
    if (videoTestimonials.length === 0) return;
    
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === 0 ? videoTestimonials.length - 1 : prevIndex - 1
    );
  };

  const togglePlayPause = () => {
    if (isYoutubeVideo.current && youtubePlayerRef.current) {
      // Handle YouTube player
      if (isPlaying) {
        youtubePlayerRef.current.pauseVideo();
      } else {
        youtubePlayerRef.current.playVideo();
      }
    } else if (videoRef.current) {
      // Handle regular video
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (isYoutubeVideo.current && youtubePlayerRef.current) {
      // Handle YouTube mute/unmute
      if (isMuted) {
        youtubePlayerRef.current.unMute();
      } else {
        youtubePlayerRef.current.mute();
      }
    } else if (videoRef.current) {
      // Handle regular video mute/unmute
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleVideoClick = () => {
    togglePlayPause();
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    stopAutoPlay();
    setShowProgress(true);
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowProgress(false);
    
    if (isPlaying) {
      startAutoPlay();
    }
  };

  const handleRegularVideoEnd = () => {
    nextVideo();
  };

  const handleRegularVideoTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress || 0);
    }
  };

  // YouTube player functions
  const onYouTubePlayerReady = (event) => {
    youtubePlayerRef.current = event.target;
    youtubePlayerRef.current.mute(); // Start muted
    if (isPlaying) {
      youtubePlayerRef.current.playVideo();
    }
  };

  const onYouTubePlayerStateChange = (event) => {
    switch(event.data) {
      case window.YT.PlayerState.PLAYING:
        setIsPlaying(true);
        break;
      case window.YT.PlayerState.PAUSED:
        setIsPlaying(false);
        break;
      case window.YT.PlayerState.ENDED:
        nextVideo();
        break;
    }
  };

  const currentVideo = videoTestimonials[currentVideoIndex];

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-[#f3f4f8] to-[#e9ecef] p-6 md:py-12 md:px-30 rounded-xl min-h-[500px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF7426]"></div>
      </div>
    );
  }

  if (videoTestimonials.length === 0) {
    return (
      <div className="bg-gradient-to-b from-[#f3f4f8] to-[#e9ecef]">
      </div>
    );
  }

  const isYouTube = currentVideo?.videoUrl && isYouTubeUrl(currentVideo.videoUrl);
  const youtubeId = isYouTube ? getYouTubeId(currentVideo.videoUrl) : '';

  return (
    <div className="bg-gradient-to-b from-[#f3f4f8] to-[#e9ecef] p-6 md:py-12 md:px-30 rounded-xl">
      <div 
        ref={containerRef}
        className={`relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl ${
          isFullscreen ? 'fixed inset-0 z-50 !rounded-none' : ''
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Video Container - Full Width */}
        <div className="relative pt-[56.25%] w-full">
          {isYouTube ? (
            // YouTube Player
            <div className="absolute inset-0 w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&enablejsapi=1`}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
                id="youtube-player"
                onLoad={() => {
                  // Load YouTube API if needed
                  if (!window.YT) {
                    const tag = document.createElement('script');
                    tag.src = 'https://www.youtube.com/iframe_api';
                    const firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                  }
                }}
              />
            </div>
          ) : (
            // Regular Video Player
            <>
              <video
                ref={videoRef}
                src={currentVideo?.videoUrl}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay={isPlaying}
                muted={isMuted}
                onEnded={handleRegularVideoEnd}
                onTimeUpdate={handleRegularVideoTimeUpdate}
                onClick={handleVideoClick}
                playsInline
              />
              
              {/* Overlay Play/Pause Button for regular video */}
              <motion.button
                onClick={handleVideoClick}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {!isPlaying && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <FiPlay className="w-12 h-12 md:w-14 md:h-14 text-white" />
                  </motion.div>
                )}
              </motion.button>
            </>
          )}

          {/* Video Info Overlay - Top Left */}
          <div className="absolute top-4 left-4 right-4 md:right-auto md:max-w-lg">
            <motion.div
              className="bg-black/70 backdrop-blur-sm rounded-xl p-4 md:p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg md:text-2xl font-bold text-white mb-2">
                {currentVideo?.title}
              </h3>
              <p className="text-white/90 text-sm md:text-base line-clamp-2">
                "{currentVideo?.description}"
              </p>
              <div className="flex items-center gap-4 mt-3">
                {/* Mute/Unmute Button */}
                <motion.button
                  onClick={toggleMute}
                  className="text-white hover:text-[#FF7426] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <FiVolumeX className="w-6 h-6" />
                  ) : (
                    <FiVolume2 className="w-6 h-6" />
                  )}
                </motion.button>
                
                {/* Fullscreen Toggle Button */}
                <motion.button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-[#FF7426] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <FiMinimize2 className="w-6 h-6" />
                  ) : (
                    <FiMaximize2 className="w-6 h-6" />
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Video Controls - Bottom Bar (Visible on hover) */}
        <AnimatePresence>
          {showProgress && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4"
            >
              {/* Progress Bar (only for non-YouTube videos) */}
              {!isYouTube && (
                <div 
                  className="w-full h-2 bg-white/30 rounded-full mb-3 cursor-pointer"
                  onClick={(e) => {
                    if (videoRef.current && videoRef.current.duration) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      videoRef.current.currentTime = pos * videoRef.current.duration;
                      setVideoProgress(pos * 100);
                    }
                  }}
                >
                  <motion.div 
                    className="h-full bg-[#FF7426] rounded-full"
                    style={{ width: `${videoProgress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${videoProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              )}

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={togglePlayPause}
                    className="text-white hover:text-[#FF7426] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <FiPause className="w-6 h-6 md:w-7 md:h-7" />
                    ) : (
                      <FiPlay className="w-6 h-6 md:w-7 md:h-7" />
                    )}
                  </motion.button>

                  <div className="flex items-center space-x-3">
                    <motion.button
                      onClick={prevVideo}
                      className="text-white hover:text-[#FF7426] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Previous"
                    >
                      <FiChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </motion.button>

                    <motion.button
                      onClick={nextVideo}
                      className="text-white hover:text-[#FF7426] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Next"
                    >
                      <FiChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </motion.button>
                  </div>
                </div>
              </div> */}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auto-play Indicator */}
        {/* {!isHovering && (
          <div className="absolute top-4 right-4 bg-[#FF7426]/90 text-white text-xs px-3 py-1 rounded-full">
            Auto-play
          </div>
        )} */}
      </div>

      <div className="flex justify-center space-x-2 mt-6">
        {videoTestimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setCurrentVideoIndex(index);
              setIsPlaying(true);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentVideoIndex 
                ? 'bg-[#FF7426] w-10' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoTestimonial;