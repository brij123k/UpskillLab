import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import VideoModal from './Modal/VideoModal';
import { useVideoModal } from './Modal/LandingVideoModal';
import { getDataHandler } from '../config/services';

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const TextCarousel = ({ slides, autoPlayVideo = false }) => {
  const [demoVideoUrl, setDemoVideoUrl] = useState(null);
  const {
    isVideoModalOpen,
    videoSrc,
    openVideoModal,
    closeVideoModal,
    hasAutoPlayed,
  } = useVideoModal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const carouselRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(carouselRef, { margin: '-100px' });

  const getVideoSrc = async () => {
    try {
      const response = await getDataHandler('youtube');
      if (response?.videos?.length > 0) {
        const videoId = response.videos[0].videoId;
        const embedUrl = `${videoId}?autoplay=1&mute=1&rel=0&enablejsapi=1`;
        setDemoVideoUrl(embedUrl);
      }
    } catch (error) {
      console.error('Error fetching video:', error);
      setDemoVideoUrl(null);
    }
  };

  useEffect(() => {
    getVideoSrc();
  }, []);

  useEffect(() => {
    if (autoPlayVideo && !hasAutoPlayed && demoVideoUrl) {
      openVideoModal(demoVideoUrl, true);
    }
  }, [autoPlayVideo, hasAutoPlayed, openVideoModal, demoVideoUrl]);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      goToNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex, isInView]);

  const goToNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    if (index !== currentIndex) {
      setDirection(index > currentIndex ? 'right' : 'left');
      setCurrentIndex(index);
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction) => ({
      x: direction === 'right' ? '-30%' : '30%',
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  const viewportVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.5 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.2,
        ease: 'easeOut',
      },
    }),
  };

  const floatVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      ref={carouselRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#FDF8EE] to-[#f9f2e6]"
      initial="hidden"
      animate={isInView ? 'visible' : 'exit'}
      variants={viewportVariants}
    >
      {/* Background effects */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 50%, #FF7426 0%, transparent 20%),
            radial-gradient(circle at 70% 30%, #4D2C5E 0%, transparent 20%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      <div ref={contentRef} className="relative w-full">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative flex flex-col md:flex-row items-center justify-center w-full min-h-[400px] md:min-h-[600px] py-8 md:py-12"
          >
            {/* Content Section */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-12 flex flex-col justify-center z-10 order-2 md:order-1">
              <motion.h1
                custom={0}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight"
              >
                {slides[currentIndex].heading.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    className={i === 0 ? 'text-[#FF7426]' : 'text-gray-900'}
                    whileHover={{ scale: 1.05 }}
                  >
                    {word}{' '}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.h2
                custom={1}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 mb-4 md:mb-6"
              >
                {slides[currentIndex].subheading}
              </motion.h2>

              <motion.p
                custom={2}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 md:mb-8"
              >
                {slides[currentIndex].description}
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <a href="#AdmissionForm" className="w-full sm:w-auto">
                  <motion.button
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: '#4D2C5E',
                      color: 'white',
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-transparent border-2 border-[#4D2C5E] text-[#4D2C5E] px-6 py-3 rounded-lg w-full sm:w-fit shadow-md hover:shadow-lg"
                  >
                    Get In Touch
                  </motion.button>
                </a>

                <motion.button
                  onClick={() => openVideoModal(demoVideoUrl)}
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#4D2C5E] text-white px-6 py-3 rounded-lg w-full sm:w-fit shadow-md hover:shadow-lg"
                >
                  Watch Demo
                </motion.button>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex items-center justify-center order-1 md:order-2 relative">
              <motion.div
                className="absolute inset-0 opacity-30 blur-xl"
                style={{
                  background: `radial-gradient(circle at center, #FF7426 0%, transparent 70%)`,
                }}
                animate={{
                  opacity: [0.2, 0.3, 0.2],
                  scale: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <motion.div
                variants={floatVariants}
                animate="float"
                className="relative w-full h-[200px] sm:h-[250px] md:h-[400px] flex items-center justify-center"
              >
                <motion.img
                  src={slides[currentIndex].image}
                  alt={slides[currentIndex].heading}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  style={{
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-[#FF7426]' : 'bg-gray-300'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: currentIndex === index ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        videoSrc={videoSrc}
        title="Product Demo"
        autoPlay={true}
        showControls={true}
      />
    </motion.div>
  );
};

const CarouselContainer = () => {
  const [carouselSlides, setCarouselSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBanners = async () => {
    try {
      setIsLoading(true);
      const res = await getDataHandler('landingPageCarousel');

      if (!res || !res.banners) {
        throw new Error('Invalid API response structure');
      }

      const newBanners = res.banners
        .filter((item) => item.active)
        .map((item, index) => ({
          id: index + 1,
          heading: item.title || 'Default Heading',
          image: item.imageUrl || 'default-image.png',
          description: item.description || 'Default description',
          subheading: item.subtitle || 'Default Subheading',
        }));

      setCarouselSlides(newBanners);
      setError(null);
    } catch (err) {
      console.error('Failed to load banners:', err);
      setError(err.message);
      setCarouselSlides([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleBanners();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7426]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center text-red-500">
        Error loading carousel: {error}
        <button
          onClick={handleBanners}
          className="ml-4 px-4 py-2 bg-[#FF7426] text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <TextCarousel slides={carouselSlides} autoPlayVideo={true} />
    </div>
  );
};

export default CarouselContainer;