import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TextCarousel = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-advance every 8 seconds (pauses on hover/touch)
    useEffect(() => {
        if (isHovered) return;
        
        const interval = setInterval(() => {
            goToNext();
        }, 8000);
        return () => clearInterval(interval);
    }, [currentIndex, isHovered]);

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

    // Mobile swipe handlers
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
        setIsHovered(true);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        setIsHovered(false);
        if (touchStart - touchEnd > 50) {
            goToNext();
        }
        if (touchStart - touchEnd < -50) {
            goToPrev();
        }
    };

    // Animation variants
    const slideVariants = {
        enter: (direction) => ({
            x: direction === 'right' ? '100%' : '-100%',
            opacity: 0.8,
            scale: 0.98
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { 
                    type: 'spring', 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.6 
                },
                opacity: { duration: 0.4 },
                scale: { duration: 0.5 }
            }
        },
        exit: (direction) => ({
            x: direction === 'right' ? '-30%' : '30%',
            opacity: 0,
            scale: 0.98,
            transition: {
                x: { duration: 0.4 },
                opacity: { duration: 0.3 }
            }
        })
    };

    // Content animation variants
    const contentVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <div 
            className="relative w-full h-[500px] md:h-[500px] overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <AnimatePresence custom={direction} initial={false}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 flex flex-col md:flex-row bg-[#FDF8EE]"
                >
                    {/* Text Content */}
                    <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center order-2 md:order-1">
                        <motion.h1
                            variants={contentVariants}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-center md:text-left"
                        >
                            {slides[currentIndex].heading.split(' ').map((word, index) => (
                                <span key={index} className={index === 0 ? 'text-[#FF7426]' : 'text-gray-900'}>
                                    {word}{' '}
                                </span>
                            ))}
                        </motion.h1>

                        <motion.h2
                            variants={contentVariants}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-4 md:mb-6 text-center md:text-left"
                        >
                            {slides[currentIndex].subheading}
                        </motion.h2>

                        <motion.p
                            variants={contentVariants}
                            transition={{ delay: 0.2 }}
                            className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 text-center md:text-left"
                        >
                            {slides[currentIndex].description}
                        </motion.p>
                    </div>

                    {/* Image - Full width background on mobile */}
                    <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 order-1 md:order-2 bg-[#FDF8EE]">
                        <motion.div
                            variants={contentVariants}
                            transition={{ delay: 0.3 }}
                            className="relative h-full w-full flex items-center justify-center"
                        >
                            <motion.img
                                src={slides[currentIndex].image}
                                alt={slides[currentIndex].heading}
                                className="max-h-[250px] md:max-h-[80%] max-w-[80%] object-contain mix-blend-multiply"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-4 h-4 md:w-3 md:h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-[#FF7426] w-6 md:w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            
        </div>
    );
};

// Sample Data
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
