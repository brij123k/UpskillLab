import React from "react";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const TrainingBanner = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Floating background elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`bg-${i}`}
          className="absolute rounded-full bg-[#FF7426]/10 z-0"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 50],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0.05, 0.15, 0.05],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2 space-y-4"
            variants={itemVariants}
          >
            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4d2c5e]"
            >
              Fast Forward your career in Tech Fields with{" "}
              <motion.span 
                className="text-[#FF7426] inline-block"
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  visible: { 
                    scale: 1, 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      delay: 0.4
                    }
                  }
                }}
              >
                UpskillLab's
              </motion.span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600"
            >
              Best-in-class Training Programs.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="pt-2"
            >
              <motion.p
                variants={itemVariants}
                className="text-gray-600 mb-4 text-sm"
              >
                Here are some steps you can take to accelerate your career in the technology industry
              </motion.p>
              
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(255, 116, 38, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-[#FF7426] text-white rounded-lg font-medium relative overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  Explore Program
                </motion.button>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(77, 44, 94, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 border-2 border-[#FF7426] text-[#FF7426] rounded-lg font-medium"
                >
                  Enrol Now
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="lg:w-1/2 mt-6 lg:mt-0"
            variants={itemVariants}
          >
            <div className="relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.6 }}
                className="absolute -inset-2 bg-[#FFE0B2]/40 rounded-lg blur-md"
              />
              
              <motion.img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Tech professionals learning" 
                className="relative rounded-lg w-full h-auto object-cover shadow-xl border-2 border-white max-h-[250px]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  y: [0, -10, 0]
                }}
                transition={{
                  y: {
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ scale: 1.02 }}
              />
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  y: [0, -5, 0]
                }}
                transition={{ 
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }
                }}
                className="absolute -bottom-2 -right-2 bg-[#FF7426] text-white px-3 py-1 rounded-md shadow-md font-bold text-xs"
              >
                90% Placement Rate
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrainingBanner;