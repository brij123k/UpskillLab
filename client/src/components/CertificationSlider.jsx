import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const CertificationSlider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const certifications = [
    {
      name: "MSME",
      image: "/images/msme.png",
      description: "Registered under Ministry of Micro, Small & Medium Enterprises"
    },
    {
      name: "MCA",
      image: "/images/mca.png",
      description: "Registered with Ministry of Corporate Affairs, Government of India"
    },
    {
      name: "NCS",
      image: "/images/ncs.png",
      description: "Partnered with National Career Service, Ministry of Labour & Employment"
    },
    {
      name: "Startup India",
      image: "/images/startup.jpeg",
      description: "Recognized by Startup India Initiative, DPIIT"
    },
    {
      name: "ISO",
      image: "/images/iso.jpeg",
      description: "ISO 9001:2015 Certified for Quality Management Systems"
    }
  ];

  const sliderVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const infiniteScrollVariants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear"
        }
      }
    }
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          ref={ref}
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sliderVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 mb-4">
            Accreditations and Associations
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted and recognized by government bodies and international organizations
          </motion.p>
        </motion.div>

        {/* Desktop - Infinite Scrolling Slider */}
        <div className="hidden md:block overflow-hidden">
          <motion.div
            className="flex"
            variants={infiniteScrollVariants}
            animate="animate"
          >
            {/* Double the array to create seamless loop */}
            {[...certifications, ...certifications].map((cert, index) => (
              <div key={`desktop-${index}`} className="flex-shrink-0 px-8 w-64">
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col items-center">
                  <div className="h-24 flex items-center mb-4">
                    <img 
                      src={cert.image} 
                      alt={cert.name} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 text-center">{cert.name}</h3>
                  <p className="text-sm text-gray-500 text-center mt-2">{cert.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile - Static Grid */}
        <motion.div 
          className="grid grid-cols-2 gap-4 md:hidden"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sliderVariants}
        >
          {certifications.map((cert, index) => (
            <motion.div 
              key={`mobile-${index}`}
              variants={itemVariants}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="h-16 flex items-center justify-center mb-2">
                <img 
                  src={cert.image} 
                  alt={cert.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-900 text-center">{cert.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CertificationSlider;