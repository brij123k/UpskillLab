import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const EducationBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="w-full bg-[#FDF8EE] py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        

        {/* Text Content - Fade In From Right */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full md:w-1/2 lg:w-3/5 space-y-6"
        >
          {/* Row 1: Big Text */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          Training & <span className="text-[#FF7426]">Internship</span><br/>
          Programs
          </h2>
          
          {/* Row 2: Small Text */}
          <p className="text-lg text-gray-600">
          Learn the latest skills quickly with a personalised curriculum created to meet your needs.
          </p>
          
          {/* Row 3: Learn More Button */}
          <div className='flex flex-column gap-4' style={{display:'flex', flexDirection:'column'}}>
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-[#4d2c5e] w-fit text-white border-2 border-[#71567E] px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
  >
    Learn More
  </motion.button>
  
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-[#FF7426] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all cursor-pointer w-fit "
  >
    Book an Appointment
  </motion.button>
</div>
        </motion.div>
        {/* Image Section - Fade In From Left */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full md:w-1/2 lg:w-2/5"
        >
          <img
            src="/images/Educationimage.png"
            alt="Education Banner"
            className="w-full h-auto rounded-xl object-cover max-h-[400px]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EducationBanner;