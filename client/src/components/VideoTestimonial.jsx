import React, { useState, useEffect, useRef } from 'react';
import { FiPlay, FiChevronLeft, FiChevronRight, FiVolume2, FiVolumeX, FiExternalLink, FiX, FiInfo, FiEye, FiEyeOff } from 'react-icons/fi';
import { getDataHandler } from '../config/services';

const VideoTestimonialGallery = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [muted, setMuted] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const cardRefs = useRef({});

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch active testimonials
  const fetchActiveTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDataHandler("videoTestimonials");
      if (response) {
        const activeTestimonials = response.filter(testimonial => testimonial.isActive);
        setTestimonials(activeTestimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError('Failed to load testimonials. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Extract YouTube video ID
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Check if URL is a direct video file
  const isDirectVideoFile = (url) => {
    if (!url) return false;
    const videoExtensions = /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv|3gp|m3u8)$/i;
    return videoExtensions.test(url);
  };

  // Get video thumbnail URL
  const getThumbnailUrl = (testimonial) => {
    if (testimonial.thumbnail) return testimonial.thumbnail;
    const youtubeId = getYouTubeVideoId(testimonial.videoUrl);
    if (youtubeId) return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
    return '/images/video-placeholder.jpg';
  };

  // Handle video play
  const handlePlayVideo = (index) => {
    setPlayingVideo(playingVideo === index ? null : index);
    setShowInfoPanel(true); // Reset info panel when opening modal
  };

  // Navigation handlers
  const nextSlide = () => {
    if (currentIndex < testimonials.length - itemsPerView) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Calculate center offset for the carousel
  const getTranslateX = () => {
    const totalSlides = testimonials.length;
    const visibleSlides = Math.min(itemsPerView, totalSlides);
    const maxIndex = Math.max(0, totalSlides - visibleSlides);
    const currentSlideIndex = Math.min(currentIndex, maxIndex);
    
    // Calculate percentage for centering
    const slideWidth = 100 / itemsPerView;
    const totalWidth = 100;
    const visibleWidth = visibleSlides * slideWidth;
    const offset = (totalWidth - visibleWidth) / 2;
    
    return `translateX(calc(${offset}% - ${currentSlideIndex * slideWidth}%))`;
  };

  // Handle mouse enter for tooltip
  const handleMouseEnter = (index, event, testimonial) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  useEffect(() => {
    fetchActiveTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-2">{error}</div>
        <button
          onClick={fetchActiveTestimonials}
          className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152]"
        >
          Retry
        </button>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center">
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-3">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Student <span className="text-[#FF7426]">Success Stories</span>
          </h2>
        </div>

        {/* Gallery Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {testimonials.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-20 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 ${
                  currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
              >
                <FiChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              
              <button
                onClick={nextSlide}
                disabled={currentIndex >= testimonials.length - itemsPerView}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-20 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 ${
                  currentIndex >= testimonials.length - itemsPerView ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
              >
                <FiChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </>
          )}

          {/* Testimonial Cards Grid - Centered */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: getTranslateX() }}
            >
              {testimonials.map((testimonial, index) => {
                const youtubeId = getYouTubeVideoId(testimonial.videoUrl);
                const isDirectVideo = isDirectVideoFile(testimonial.videoUrl);
                
                return (
                  <div 
                    key={testimonial._id}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / itemsPerView}%` }}
                    onMouseEnter={(e) => handleMouseEnter(index, e, testimonial)}
                    onMouseLeave={handleMouseLeave}
                    ref={el => cardRefs.current[index] = el}
                  >
                    {/* Card Container */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col relative">
                      {/* Video Container - Maintains original aspect ratio */}
                      <div className="relative bg-gray-900 flex-shrink-0">
                        {playingVideo === index ? (
                          // Video Player
                          <div className="relative w-full">
                            {youtubeId ? (
                              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=${muted ? 1 : 0}&controls=1&rel=0&modestbranding=1`}
                                  title={testimonial.title}
                                  className="absolute inset-0 w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </div>
                            ) : isDirectVideo ? (
                              <video
                                controls
                                autoPlay
                                muted={muted}
                                className="w-full h-auto"
                                style={{ display: 'block' }}
                                poster={getThumbnailUrl(testimonial)}
                              >
                                <source src={testimonial.videoUrl} type="video/mp4" />
                                <source src={testimonial.videoUrl.replace('.mp4', '.webm')} type="video/webm" />
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              // External video link - show thumbnail with play button
                              <div className="relative cursor-pointer" onClick={() => window.open(testimonial.videoUrl, '_blank')}>
                                <img
                                  src={getThumbnailUrl(testimonial)}
                                  alt={testimonial.title}
                                  className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                  <div className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
                                    <FiExternalLink className="mr-2" />
                                    Watch Video
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* Mute/Unmute Button for direct videos */}
                            {isDirectVideo && playingVideo === index && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMuted(!muted);
                                }}
                                className="absolute bottom-4 right-4 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-colors z-10"
                              >
                                {muted ? (
                                  <FiVolumeX className="w-5 h-5 text-white" />
                                ) : (
                                  <FiVolume2 className="w-5 h-5 text-white" />
                                )}
                              </button>
                            )}
                          </div>
                        ) : (
                          // Thumbnail with Play Button
                          <div className="relative cursor-pointer" onClick={() => handlePlayVideo(index)}>
                            <img
                              src={getThumbnailUrl(testimonial)}
                              alt={testimonial.title}
                              className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Play Button */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200 group-hover:opacity-100 opacity-90">
                              <FiPlay className="w-8 h-8 text-gray-900 ml-1" />
                            </div>
                            
                            {/* Title Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/70 to-transparent">
                              <h3 className="text-lg font-semibold truncate">
                                {testimonial.title}
                              </h3>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content - Always visible now */}
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 text-justify">
                          {testimonial.title}
                        </h3>
                        <p className="text-gray-600 text-justify line-clamp-3">
                          {testimonial.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hover Tooltip - Shows full title and description */}
          {hoveredCard !== null && testimonials[hoveredCard] && (
            <div 
              className="fixed z-50 bg-gray-900 text-white rounded-lg shadow-2xl p-4 max-w-sm pointer-events-none animate-fade-in"
              style={{
                top: tooltipPosition.y - 10,
                left: tooltipPosition.x,
                transform: 'translateX(-50%) translateY(-100%)'
              }}
            >
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900"></div>
              <h4 className="font-bold text-base mb-2 pr-6">{testimonials[hoveredCard].title}</h4>
              <p className="text-sm text-gray-200">{testimonials[hoveredCard].description}</p>
            </div>
          )}

          {/* Pagination Dots */}
          {testimonials.length > itemsPerView && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(testimonials.length / itemsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerView)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    Math.floor(currentIndex / itemsPerView) === index
                      ? 'bg-[#4D2C5E] w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Video Modal with Toggleable Info Panel */}
      {playingVideo !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4" onClick={() => setPlayingVideo(null)}>
          {/* Close button */}
          <button
            onClick={() => setPlayingVideo(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-20 transition-colors"
          >
            <FiX className="w-8 h-8" />
          </button>
          
          {/* Toggle Info Panel Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowInfoPanel(!showInfoPanel);
            }}
            className="absolute top-4 right-20 text-white hover:text-gray-300 z-20 transition-colors bg-black/50 p-2 rounded-full"
            title={showInfoPanel ? "Hide info panel" : "Show info panel"}
          >
            {showInfoPanel ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
          </button>

          <div className="w-full max-w-6xl mx-auto relative" onClick={(e) => e.stopPropagation()}>
            <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
              {/* Video Player */}
              {(() => {
                const testimonial = testimonials[playingVideo];
                const youtubeId = getYouTubeVideoId(testimonial.videoUrl);
                const isDirectVideo = isDirectVideoFile(testimonial.videoUrl);
                
                return (
                  <div className="relative">
                    {youtubeId ? (
                      <div className="relative" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1&showinfo=0`}
                          title={testimonial.title}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : isDirectVideo ? (
                      <video
                        controls
                        autoPlay
                        className="w-full h-auto max-h-[85vh] mx-auto"
                        style={{ display: 'block' }}
                        poster={getThumbnailUrl(testimonial)}
                      >
                        <source src={testimonial.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="text-center p-12">
                        <p className="text-white mb-4">Unable to play video directly</p>
                        <a
                          href={testimonial.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <FiExternalLink className="mr-2" />
                          Open Video in New Tab
                        </a>
                      </div>
                    )}

                    {/* Info Panel - Toggleable, positioned at top right of video */}
                    {showInfoPanel && (
                      <div className="absolute top-4 right-4 max-w-sm bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md rounded-xl shadow-2xl p-5 border border-white/10 animate-slide-in-right">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-white font-bold text-lg pr-6">
                            {testimonials[playingVideo]?.title}
                          </h3>
                          <button
                            onClick={() => setShowInfoPanel(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-gray-200 text-sm leading-relaxed">
                          {testimonials[playingVideo]?.description}
                        </p>
                        {/* Optional: Add a small indicator */}
                        <div className="mt-3 pt-2 border-t border-white/10">
                          <div className="flex items-center text-xs text-gray-400">
                            <FiInfo className="w-3 h-3 mr-1" />
                            <span>Student Testimonial</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default VideoTestimonialGallery;