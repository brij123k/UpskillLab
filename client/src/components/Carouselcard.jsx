import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import VideoModal from './Modal/VideoModal';
import {useVideoModal} from './Modal/LandingVideoModal';
import { NavLink } from 'react-router-dom';
import { getDataHandler } from '../config/services';
const TextCarousel = ({ slides, autoPlayVideo = false }) => {
  const {
    isVideoModalOpen,
    videoSrc,
    openVideoModal,
    closeVideoModal,
    hasAutoPlayed
  } = useVideoModal();
  
  const demoVideoUrl = "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1";

  // Auto-play video on component mount if enabled
  useEffect(() => {
    if (autoPlayVideo && !hasAutoPlayed) {
      openVideoModal(demoVideoUrl, true);
    }
  }, [autoPlayVideo, hasAutoPlayed, openVideoModal]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const carouselRef = useRef(null);
  const isInView = useInView(carouselRef, { margin: "-100px" });

  // Auto-advance every 8 seconds only when visible
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex, isInView]);

  const goToNext = () => {
    setDirection('right');
    setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setDirection('left');
    setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    if (index !== currentIndex) {
      setDirection(index > currentIndex ? 'right' : 'left');
      setCurrentIndex(index);
    }
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction === 'right' ? '-30%' : '30%',
      opacity: 0,
      transition: { duration: 0.3 }
    })
  };

  // Viewport animations
  const viewportVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.5 }
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  // Floating animation for images
  const floatVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      ref={carouselRef}
      className="relative w-full h-[600px] overflow-hidden bg-[#FDF8EE]"
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={viewportVariants}
    >
      {/* Subtle background pattern animation */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: 'radial-gradient(#FF7426 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute 2xl:w-3/4 inset-0 flex flex-col md:flex-row 2xl:m-auto"
        >
          {/* Content - Left on desktop, bottom on mobile */}
          <div className="w-full md:w-1/2 order-2 md:order-1 p-6 md:p-12 flex flex-col justify-center">
            <motion.h1
              custom={0}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-3 md:mb-4"
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
              className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl text-gray-700 mb-4 md:mb-6"
            >
              {slides[currentIndex].subheading}
            </motion.h2>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-base md:text-lg 2xl:text-xl text-gray-600 mb-6 md:mb-8"
            >
              {slides[currentIndex].description}
            </motion.p>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
  <a href='#AdmissionForm' className='w-full sm:w-auto'>
    <motion.button
      custom={2}
      initial="hidden"
      animate="visible"
      variants={textVariants}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: "#4D2C5E",
        color: "white",
        transition: { 
          duration: 0.3,
          ease: "easeInOut" 
        }
      }}
      whileTap={{ scale: 0.95 }}
      className="bg-transparent border-2 border-[#4D2C5E] text-[#4D2C5E] px-6 py-3 rounded-lg transition-all flex items-center justify-center cursor-pointer w-full sm:w-fit shadow-md hover:shadow-lg"
    >
      <motion.span
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="
              M3 8 a2 2 0 0 1 2-2 h14 a2 2 0 0 1 2 2 v10 a2 2 0 0 1-2 2 h-5 l-5 4 v-4 H5 a2 2 0 0 1-2-2 V8 z
              M8 10 a1 1 0 1 0 0 0 a1 1 0 1 0 0 0
              M12 10 a1 1 0 1 0 0 0 a1 1 0 1 0 0 0
              M16 10 a1 1 0 1 0 0 0 a1 1 0 1 0 0 0
            " 
          />
        </svg>
      </motion.span>
      Get In Touch
    </motion.button>
  </a>
  
  <motion.button
    onClick={() => openVideoModal(demoVideoUrl)}
    custom={2}
    initial="hidden"
    animate="visible"
    variants={textVariants}
    whileHover={{ 
      scale: 1.05,
      backgroundColor: "white",
      color: "#4D2C5E",
      borderColor: "#4D2C5E",
      transition: { 
        duration: 0.3,
        ease: "easeInOut" 
      }
    }}
    whileTap={{ scale: 0.95 }}
    className="bg-[#4D2C5E] text-white px-6 py-3 rounded-lg border-2 border-[#4D2C5E] transition-all flex items-center justify-center cursor-pointer w-full sm:w-fit shadow-md hover:shadow-lg"
  >
    <motion.span
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <svg 
        className="w-5 h-5 mr-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="
            M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87 v4.263 a1 1 0 001.555.832 l3.197-2.132 a1 1 0 000-1.664 z
            M21 12 a9 9 0 11-18 0 9 9 0 0118 0 z
          " 
        />
      </svg>
    </motion.span>
    Watch Demo
  </motion.button>
</div>
</div>

          {/* Image - Right on desktop, top on mobile */}
          <div className="w-full md:w-1/2 order-1 md:order-2 flex items-center justify-center p-4 md:p-8 2xl:p-12">
            <motion.div
              variants={floatVariants}
              animate="float"
              className="relative h-[200px] md:h-full w-full flex items-center justify-center"
            >
              <motion.img
                src={slides[currentIndex].image}
                alt={slides[currentIndex].heading}
                className="h-full w-auto object-contain mix-blend-multiply"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="hidden absolute bottom-6 left-1/2 transform -translate-x-1/2 lg:flex gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-[#FF7426]' : 'bg-gray-300'}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: currentIndex === index ? [1, 1.2, 1] : 1,
              backgroundColor: currentIndex === index ? '#FF7426' : '#E5E7EB'
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Video Modal */}
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

      const newBanners = res.banners.map((item, index) => ({
        id: index + 1,
        heading: item.title || 'Default Heading',
        image: item.imageUrl || 'default-image.png',
        description: item.categoryDescription || 'Default description',
        subheading: item.subtitle || 'Default Subheading'
      }));

      setCarouselSlides(newBanners);
      setError(null);
    } catch (err) {
      console.error("Failed to load banners:", err);
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
      <div className="w-full h-[600px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7426]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center text-red-500">
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


// const carouselSlides = [
//   {
//     heading: "Transform Your Career",
//     subheading: "Industry-Relevant Programs",
//     description: "Gain practical skills that employers are looking for in today's competitive job market.",
//     image: "images/carouselimage.png"
//   },
//   {
//     heading: "Learn From Experts",
//     subheading: "Real-World Experience",
//     description: "Our instructors are industry professionals who bring current best practices to your learning.",
//     image: "images/carouselimage.png"
//   },
//   {
//     heading: "Career Support",
//     subheading: "Job Placement Assistance",
//     description: "We provide comprehensive career services to help you land your dream role.",
//     image: "images/carouselimage.png"
//   }
// ];
