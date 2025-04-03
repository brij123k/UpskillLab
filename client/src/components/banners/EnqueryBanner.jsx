import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { FiClock, FiUsers, FiArrowRight, FiBookmark } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
const EnqueryBanner = () => {
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
        duration: 0.8,
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
      className="w-full bg-[#FDF8EE] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      {/* Floating background elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#FF7426]/10"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
        {/* Image Section */}
        <motion.div
          variants={itemVariants}
          className="w-full md:w-1/2 lg:w-2/5"
        >
          <motion.img
            src="/images/bannerEnquery.png"
            alt="Banner Visual"
            className="w-full h-auto rounded-xl object-cover max-h-[400px]"
            initial={{ scale: 0.9 }}
            animate={{ 
              scale: 1,
              y: [0, -10, 0]
            }}
            transition={{
              delay: 0.5,
              duration: 6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          variants={itemVariants}
          className="w-full md:w-1/2 lg:w-3/5 space-y-6"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center"
            variants={itemVariants}
          >
            <motion.span 
              className="text-[#FF7426] inline-block"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            >
              W
            </motion.span>
            ant to stay informed about new courses or have any doubts?
          </motion.h2>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-4"
            variants={itemVariants}
          >
            <NavLink to="/Contactus">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(255, 116, 38, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF7426] text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all m-auto cursor-pointer relative overflow-hidden cursor-pointer"
              variants={itemVariants}
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
              Enquiry Now
              <motion.div
                className="ml-2 inline-block"
                animate={{
                  x: [0, 5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <FiArrowRight />
              </motion.div>
            </motion.button>
            </NavLink>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnqueryBanner;