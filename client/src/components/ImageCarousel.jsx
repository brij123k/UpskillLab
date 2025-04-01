import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const HiringPartnersShowcase = () => {
  const logos = [
    'company1.svg', 'company2.svg', 'company3.svg', 'company4.svg',
    'company5.svg', 'company6.svg', 'company7.svg', 'company8.svg',
    'company9.svg', 'company10.svg', 'company11.svg', 'company12.svg'
  ];

  // Double the array for seamless looping
  const doubledLogos = [...logos, ...logos];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Title with color accent */}
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our <span className="text-[#FF7426]">Hiring Partners</span>
        </motion.h2>

        {/* Primary Marquee - Right to Left */}
        <div className="py-2 mb-3 relative overflow-hidden">
          <motion.div
            className="flex items-center"
            animate={{
              x: ['0%', '-100%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {doubledLogos.map((logo, index) => (
              <motion.div 
                key={`marquee1-${index}`}
                className="flex-shrink-0 mx-8"
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.3 }
                }}
              >
                <img 
                  src={`./images/${logo}`} 
                  alt="Partner logo" 
                  className="h-16 object-contain grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            ))}
          </motion.div>
          {/* Gradient fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        </div>

        {/* Secondary Marquee - Left to Right (smaller logos) */}
        <div className="py-6 relative overflow-hidden">
          <motion.div
            className="flex items-center"
            animate={{
              x: ['-100%', '0%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {doubledLogos.map((logo, index) => (
              <motion.div 
                key={`marquee2-${index}`}
                className="flex-shrink-0 mx-6"
                whileHover={{
                  scale: 1.3,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <img 
                  src={`./images/${logo}`} 
                  alt="Partner logo" 
                  className="h-12 object-contain opacity-90 hover:opacity-100 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
          {/* Gradient fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        </div>

        {/* CTA with accent color */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
        <NavLink to="/ContactUs">  <motion.button
            className="px-8 py-3 bg-[#4D2C5E] text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all cursor-pointer"  
            whileHover={{ 
              scale: 1.05,
              backgroundColor: '#5F3A73'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Become a Partner
          </motion.button>
          </NavLink>
        </motion.div>
      </div>
    </div>
  );
};

export default HiringPartnersShowcase;