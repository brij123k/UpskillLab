import React, { useState } from 'react';
import Modal from '../Modal/CommonModal';
import { motion } from 'framer-motion';
const MentorshipCard = ({ image, title,icon, description }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-full max-w-xs 2xl:max-w-sm 3xl:max-w-md rounded-2xl shadow-2xl hover:shadow-[#FF7426]/20 transition-all duration-500 group relative cursor-pointer overflow-hidden m-auto"
      >
        {/* Background Image with Low Opacity */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#4d2c5e94] to-[#3a1d4a96]" />
        </div>
  
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FF7426_0%,transparent_70%)] opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0" />
  
        {/* Content Section */}
        <div className="relative z-10 p-6 2xl:p-7 3xl:p-8 h-full flex flex-col">
          {/* Animated Icon */}
          <motion.div
            className="w-14 h-14 2xl:w-16 2xl:h-16 mx-auto mb-4 rounded-full bg-[#FF7426] flex items-center justify-center shadow-lg"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {React.cloneElement(icon, { 
              className: "text-xl 2xl:text-2xl text-white" 
            })}
          </motion.div>
  
          {/* Text Content */}
          <div className="flex-grow">
            <motion.h3 
              className="text-xl 2xl:text-2xl font-bold text-white text-center mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h3>
            <motion.p 
              className="text-gray-300 text-center text-sm 2xl:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {description}
            </motion.p>
          </div>
  
          {/* Animated Button */}
          <motion.div
            className="mt-5 flex justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="px-5 py-2 bg-[#FF7426] text-white rounded-full text-sm 2xl:text-base font-medium shadow-md hover:shadow-[#FF7426]/50 transition-all" onClick={() => setOpenModal(true)}>
              Learn More
            </button>
          </motion.div>
        </div>
  
        {/* Floating Particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FF7426] opacity-30 z-0"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 20],
              x: [0, (Math.random() - 0.5) * 20],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default MentorshipCard;