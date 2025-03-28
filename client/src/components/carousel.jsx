import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// Main Carousel Component
const TextCarousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('left');

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    setDirection('right');
    setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setDirection('left');
    setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  // Animation variants
  const slideVariants = {
    hiddenRight: { x: '100%', opacity: 0 },
    hiddenLeft: { x: '-100%', opacity: 0 },
    visible: {
      x: '0',
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.5
      }
    },
    exitRight: { x: '-100%', opacity: 0 },
    exitLeft: { x: '100%', opacity: 0 }
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-[#FDF8EE] overflow-hidden rounded-xl shadow-lg">

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={direction === 'right' ? 'hiddenRight' : 'hiddenLeft'}
          animate="visible"
          exit={direction === 'right' ? 'exitLeft' : 'exitRight'}
          variants={slideVariants}
          className="absolute inset-0 flex "
        >
          {/* Text Content */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center ">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl
    md:text-4xl
    lg:text-5xl 
    xl:text-6xl
    font-bold sm:text-black md:text-gray-900 mb-4 "
            >
              {slides[currentIndex].heading.split(' ').map((word, index) => (
                <span key={index} className={index === 0 ? 'text-[#FF7426]' : 'text-gray-900'}>
                  {word}{' '}
                </span>
              ))}
            </motion.h1>


            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl
    lg:text-2xl 
    xl:text-3xl sm:text-black md:text-gray-700 mb-6"
            >
              {slides[currentIndex].subheading}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-sm md:text-base
    lg:text-lg 
    xl:text-xl sm:text-black md:text-gray-500"
            >
              {slides[currentIndex].description}
            </motion.p>
          </div>

          {/* Image */}
          <div className="
  absolute right-0 inset-0 
  flex items-center justify-center
  md:relative md:w-1/2
">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              src={slides[currentIndex].image}
              alt={slides[currentIndex].heading}
              className="
      max-h-[80%] max-w-[80%] 
      object-contain 
      mix-blend-multiply
      opacity-100  // Low opacity on small screens
      md:opacity-100  // Full opacity on medium+
      blur-sm  // Slight blur on small screens
      md:blur-none  // Clear on medium+
      z-0  // Behind text
    "
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-gray-800 w-6' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

// Sample Data (could also be passed as props)
const carouselSlides = [
  {
    heading: "Redefine Your Career",
    subheading: "with Industry relevant PG Programs",
    description: "Upskilllab is an education and career transformation pioneer specializing in today’s most in-demand corporate skills.",
    image: "images/carouselimage.png"
  },
  {
    heading: "Redefine Your Career",
    subheading: "with Industry relevant PG Programs",
    description: "Upskilllab is an education and career transformation pioneer specializing in today’s most in-demand corporate skills.",
    image: "images/carouselimage.png"
  },
  {
    heading: "Redefine Your Career",
    subheading: "with Industry relevant PG Programs",
    description: "Upskilllab is an education and career transformation pioneer specializing in today’s most in-demand corporate skills.",
    image: "images/carouselimage.png"
  }
];

// Container Component that uses the Carousel
const CarouselContainer = () => {
  return (
    <div className="w-full">
      <TextCarousel slides={carouselSlides} />
    </div>
  );
};

export default CarouselContainer;

//  const CarouselContainer =()=>{return <div>rishah</div>}
// export  default CarouselContainer 
