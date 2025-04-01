import React from 'react';
import { motion } from 'framer-motion';

const HiringPartnersCarousel = () => {
  // Sample company logos (replace with your actual logos)
  const companies = [
    'company1.svg',
    'company2.svg',
    'company3.svg',
    'company4.svg',
    'company5.svg',
    'company6.svg',
    'company7.svg',
    'company8.svg',
    'company9.svg',
    'company10.svg',
  ];

  // Duplicate the array to create seamless looping
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <div className="py-12 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Our Hiring  <span className='text-[#FF7426]'>Partners</span>
        </h2>
        
        {/* First Line - Right to Left */}
        <div className="mb-2">
          <motion.div
            className="flex"
            animate={{
              x: ['0%', '-100%'],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {duplicatedCompanies.map((company, index) => (
              <div key={`line1-${index}`} className="flex-shrink-0 mx-8">
                <img 
                  src={`./images/${company}`} 
                  alt="Company Logo" 
                  className="h-16 object-contain transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Line - Left to Right */}
        <div className="mb-2">
          <motion.div
            className="flex"
            animate={{
              x: ['-100%', '0%'],
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: 'linear',
            }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {duplicatedCompanies.map((company, index) => (
              <div key={`line2-${index}`} className="flex-shrink-0 mx-8">
                <img 
                  src={`./images/${company}`} 
                  alt="Company Logo" 
                  className="h-16 object-contain transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Third Line - Right to Left */}
        <div>
          <motion.div
            className="flex"
            animate={{
              x: ['0%', '-100%'],
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: 'linear',
            }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {duplicatedCompanies.map((company, index) => (
              <div key={`line3-${index}`} className="flex-shrink-0 mx-8">
                <img 
                  src={`./images/${company}`} 
                  alt="Company Logo" 
                  className="h-16 object-contain transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HiringPartnersCarousel;