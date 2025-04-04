import React, {useEffect} from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Card from './Cards';
import Student from '../../assets/Students.jpg';
import Course from '../../assets/Course.jpg';
import Expert from '../../assets/Experts.jpg';
const StudentFeedBack = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false // Allows re-triggering when scrolling back
  });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
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
        damping: 10
      }
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  const floatingAnim = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start("show");
    } else {
      controls.start("exit");
    }
  }, [inView, controls]);

  return (
    <div ref={ref} className="hidden lg:block w-full px-3 md:px-4 py-6 md:py-8 bg-[#4D2C5E] rounded-2xl overflow-hidden relative">
      {/* Floating decorative elements */}
      {inView && (
        <>
          <motion.div 
            className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#FF7426] opacity-10 blur-xl"
            animate={floatingAnim}
          />
          <motion.div 
            className="absolute bottom-20 right-16 w-16 h-16 rounded-full bg-[#FF7426] opacity-15 blur-lg"
            animate={{
              ...floatingAnim,
              y: [0, -20, 0],
              transition: { ...floatingAnim.transition, delay: 1 }
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
        {/* Card 1 */}
        <motion.div variants={item} className="relative">
          <motion.div 
            className="absolute -inset-2 bg-[#FF7426] rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"
            animate={inView ? {
              scale: [1, 1.05, 1],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "loop"
              }
            } : { scale: 1 }}
          />
          <Card
            imageSrc={Student}
            title={18000}
            subtitle="Happy Students"
            animate={inView}
          />
        </motion.div>

        {/* Card 2 */}
        <motion.div variants={item} className="relative">
          <motion.div 
            className="absolute -inset-2 bg-[#FF7426] rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"
            animate={inView ? {
              scale: [1, 1.05, 1],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.5
              }
            } : { scale: 1 }}
          />
          <Card
            imageSrc={Course}
            title={18000}
            subtitle="Popular Courses"
            animate={inView}
          />
        </motion.div>

        {/* Card 3 */}
        <motion.div variants={item} className="relative">
          <motion.div 
            className="absolute -inset-2 bg-[#FF7426] rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"
            animate={inView ? {
              scale: [1, 1.05, 1],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                delay: 1
              }
            } : { scale: 1 }}
          />
          <Card
            imageSrc={Expert}
            title={18000}
            subtitle="Expert Instructors"
            animate={inView}
          />
        </motion.div>
      </motion.div>

      {/* Animated border */}
      <motion.div 
        className="absolute inset-0 border-2 border-[#FF7426] rounded-2xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? {
          opacity: 0.3,
          scale: 1,
          transition: { duration: 1, delay: 0.5 }
        } : {
          opacity: 0,
          scale: 0.95
        }}
      />
    </div>
  );
};

export default StudentFeedBack;