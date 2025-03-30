import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const EnqueryBanner = () => {
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
        {/* Image Section - Fade In From Left */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full md:w-1/2 lg:w-2/5"
        >
          <img
            src="/images/bannerEnquery.png"
            alt="Banner Visual"
            className="w-full h-auto rounded-xl object-cover max-h-[400px]"
          />
        </motion.div>

        {/* Text Content - Fade In From Right */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full md:w-1/2 lg:w-3/5 space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center"><span className="text-[#FF7426]">W</span>ant to stay
            informed about new courses or have any doubts?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF7426] text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all m-auto cursor-pointer"
            >
              Enquiry Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnqueryBanner;