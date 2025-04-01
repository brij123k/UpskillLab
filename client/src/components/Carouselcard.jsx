import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { NavLink } from 'react-router-dom';
const TextCarousel = ({ slides }) => {
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
      className="relative w-full h-[500px] overflow-hidden bg-[#FDF8EE]"
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
          </div>

          {/* Image - Right on desktop, top on mobile */}
          <div className="w-full md:w-1/2 order-1 md:order-2 flex items-center justify-center p-4 md:p-8 2xl:p-12">
            <motion.div
              variants={floatVariants}
              animate="float"
              className="relative h-[200px] md:h-full w-full flex items-center justify-center"
            >
              <motion.img
                src={`/${slides[currentIndex].image}`}
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
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
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
    </motion.div>
  );
};

// Sample data
const carouselSlides = [
  {
    heading: "Transform Your Career",
    subheading: "Industry-Relevant Programs",
    description: "Gain practical skills that employers are looking for in today's competitive job market.",
    image: "images/carouselimage.png"
  },
  {
    heading: "Learn From Experts",
    subheading: "Real-World Experience",
    description: "Our instructors are industry professionals who bring current best practices to your learning.",
    image: "images/carouselimage.png"
  },
  {
    heading: "Career Support",
    subheading: "Job Placement Assistance",
    description: "We provide comprehensive career services to help you land your dream role.",
    image: "images/carouselimage.png"
  }
];

const CarouselContainer = () => {
  return (
    <div className="w-full">
      <TextCarousel slides={carouselSlides} />
    </div>
  );
};

export default CarouselContainer;