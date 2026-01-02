import React, { useState, useEffect } from 'react';
import { FiPlay, FiChevronLeft, FiChevronRight, FiVolume2, FiVolumeX, FiExternalLink } from 'react-icons/fi';
import apiService from '../config/apiConfig';
import { getDataHandler } from '../config/services';

const VideoTestimonialGallery = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [muted, setMuted] = useState(true);
  const [error, setError] = useState(null);

  // Number of testimonials to show per slide
  const itemsPerView = 4;

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
    // Priority 1: Custom thumbnail
    if (testimonial.thumbnail) return testimonial.thumbnail;
    
    // Priority 2: YouTube thumbnail
    const youtubeId = getYouTubeVideoId(testimonial.videoUrl);
    if (youtubeId) return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
    
    // Priority 3: Fallback to video placeholder
    return '/images/video-placeholder.jpg';
  };

  // Handle video play
  const handlePlayVideo = (index) => {
    setPlayingVideo(playingVideo === index ? null : index);
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

  // Format testimonial text
  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
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
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No video testimonials available</div>
        <p className="text-gray-400">Check back soon for student testimonials</p>
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
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 ${
                  currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
              >
                <FiChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              
              <button
                onClick={nextSlide}
                disabled={currentIndex >= testimonials.length - itemsPerView}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 ${
                  currentIndex >= testimonials.length - itemsPerView ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
              >
                <FiChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </>
          )}

          {/* Testimonial Cards Grid */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {testimonials.map((testimonial, index) => {
                const youtubeId = getYouTubeVideoId(testimonial.videoUrl);
                const isDirectVideo = isDirectVideoFile(testimonial.videoUrl);
                
                return (
                  <div 
                    key={testimonial._id}
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/4 px-3"
                  >
                    {/* Card Container */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
                      {/* Video Container - 9:16 Aspect Ratio */}
                      <div className="relative pt-[177.78%] bg-gray-900"> {/* 9/16 = 0.5625, inverse = 1.7778 */}
                        {/* Video or Thumbnail */}
                        {playingVideo === index ? (
                          // Video Player
                          <div className="absolute inset-0">
                            {youtubeId ? (
                              <iframe
                                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=${muted ? 1 : 0}&controls=1&rel=0&modestbranding=1`}
                                title={testimonial.title}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : isDirectVideo ? (
                              <div className="relative w-full h-full">
                                <video
                                  controls
                                  autoPlay
                                  muted={muted}
                                  className="absolute inset-0 w-full h-full object-cover"
                                  poster={getThumbnailUrl(testimonial)}
                                >
                                  <source src={testimonial.videoUrl} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                                {/* Mute/Unmute Button for direct videos */}
                                <button
                                  onClick={() => setMuted(!muted)}
                                  className="absolute bottom-4 right-4 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-colors"
                                >
                                  {muted ? (
                                    <FiVolumeX className="w-5 h-5 text-white" />
                                  ) : (
                                    <FiVolume2 className="w-5 h-5 text-white" />
                                  )}
                                </button>
                              </div>
                            ) : (
                              // External video link - show thumbnail with play button
                              <div className="absolute inset-0">
                                <img
                                  src={getThumbnailUrl(testimonial)}
                                  alt={testimonial.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                  <a
                                    href={testimonial.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                                  >
                                    <FiExternalLink className="mr-2" />
                                    Watch Video
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          // Thumbnail with Play Button
                          <>
                            <img
                              src={getThumbnailUrl(testimonial)}
                              alt={testimonial.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Play Button */}
                            <button
                              onClick={() => handlePlayVideo(index)}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200 group-hover:opacity-100 opacity-90"
                            >
                              <FiPlay className="w-8 h-8 text-gray-900 ml-1" />
                            </button>
                            
                            {/* Title Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                              <h3 className="text-lg font-semibold truncate">
                                {testimonial.title}
                              </h3>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                          {testimonial.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {truncateText(testimonial.description, 120)}
                        </p>
                        
                        {/* View Full Button */}
                        {testimonial.description && testimonial.description.length > 120 && (
                          <button
                            onClick={() => {
                              // You could implement a modal to show full description
                              alert(testimonial.description);
                            }}
                            className="text-sm text-[#4D2C5E] hover:text-[#3a2152] font-medium"
                          >
                            Read More
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

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

      {/* Full Screen Video Modal (optional enhancement) */}
      {playingVideo !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setPlayingVideo(null)}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
          >
            ✕
          </button>
          <div className="w-full max-w-4xl">
            {/* Video player would go here */}
            <div className="aspect-w-16 aspect-h-9">
              {(() => {
                const testimonial = testimonials[playingVideo];
                const youtubeId = getYouTubeVideoId(testimonial.videoUrl);
                if (youtubeId) {
                  return (
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=1&rel=0`}
                      title={testimonial.title}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  );
                } else {
                  return (
                    <video
                      controls
                      autoPlay
                      className="w-full h-full rounded-lg"
                      poster={getThumbnailUrl(testimonial)}
                    >
                      <source src={testimonial.videoUrl} type="video/mp4" />
                    </video>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTestimonialGallery;