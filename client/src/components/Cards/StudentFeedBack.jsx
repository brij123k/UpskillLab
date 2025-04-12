import React, {useEffect, useState} from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Card from './Cards';
import { getDataHandler } from '../../config/services';

const StudentFeedBack = () => {
  const controls = useAnimation();
  const [stats, setStats] = useState([]);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true // Changed to true to trigger only once
  });

  const handleFeedback = async () => {
    try {
      const res = await getDataHandler('stats');
      if(res && res.stats) {
        setStats(res.stats.slice(0, 3)); // Take first 3 stats
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    handleFeedback();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.4
      }
    }
  };

  const floatingAnim = {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      ease: "easeInOut"
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [inView, controls]);

  return (
    <div ref={ref} className="hidden lg:block w-full px-3 md:px-4 py-6 md:py-8 bg-[#4D2C5E] rounded-2xl overflow-hidden relative">
      {/* Floating decorative elements */}
      {inView && (
        <>
          <motion.div 
            className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#FF7426] opacity-10 blur-xl"
            initial={{ y: 0 }}
            animate={floatingAnim}
          />
          <motion.div 
            className="absolute bottom-20 right-16 w-16 h-16 rounded-full bg-[#FF7426] opacity-15 blur-lg"
            initial={{ y: 0 }}
            animate={{
              ...floatingAnim,
              y: [0, -20, 0],
              transition: { ...floatingAnim.transition, delay: 0.05 }
            }}
          />
        </>
      )}

      {/* Animated grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full"
      >
        {stats.map((stat, index) => (
          <motion.div key={stat.id || index} variants={item} className="relative">
            <motion.div 
              className="absolute -inset-2 bg-[#FF7426] rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-150"
              initial={{ scale: 1 }}
              animate={inView ? {
                scale: [1, 1.05, 1],
                transition: {
                  duration: 0.5,
                  delay: index * 0.05
                }
              } : { scale: 1 }}
            />
            <Card
              imageSrc={stat.imageUrl}
              title={stat.count}
              subtitle={stat.label}
              animate={inView}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Animated border */}
      <motion.div 
        className="absolute inset-0 border-2 border-[#FF7426] rounded-2xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? {
          opacity: 0.3,
          scale: 1,
          transition: { duration: 0.15, delay: 0.05 }
        } : {
          opacity: 0,
          scale: 0.95
        }}
      />
    </div>
  );
};

export default StudentFeedBack;