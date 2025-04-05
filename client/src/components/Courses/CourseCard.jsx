import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiUsers, FiArrowRight, FiBookmark } from 'react-icons/fi';
import { NavLink,useNavigate } from 'react-router-dom';
const CourseCard = ({ 
  id,
  courseId,
  imageUrl, 
  title, 
  duration, 
  studentsEnrolled, 
  originalPrice, 
  discountedPrice,
  remainingSheets // New prop for remaining sheets count
}) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px 0px" }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full max-w-xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full cursor-pointer border m-auto border-gray-100 hover:border-[#FF7426]/50 transition-all duration-300 group relative"
    >
      {/* Remaining Sheets Label - Top Right Corner */}
      {typeof remainingSheets !== 'undefined' && remainingSheets !== null ? (
  <motion.div 
    className="absolute top-0 right-0 bg-[#FF7426] text-white px-3 py-1 rounded-bl-lg z-10 flex items-center"
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4 }}
  >
    <span className="text-xs font-semibold whitespace-nowrap">
      {remainingSheets === 0 
        ? 'No seats available' 
        : remainingSheets < 10 
          ? `Only ${remainingSheets} left!` 
          : `${remainingSheets} available`}
    </span>
  </motion.div>
) : null}

      {/* Image with hover zoom */}
      <motion.div 
        className="relative h-48 overflow-hidden"
        whileHover={{ scale: 1.02 }}
      >
        <motion.img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4d2c5e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <motion.h3 
          className="text-lg font-bold text-gray-900 mb-3 line-clamp-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h3>

        {/* Metadata */}
        <motion.div 
          className="flex flex-wrap items-center text-sm text-gray-600 mb-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center">
            <motion.div whileHover={{ scale: 1.1 }}>
              <FiClock className="mr-1.5 text-[#4d2c5e]" />
            </motion.div>
            <span>{duration} Days</span>
          </div>
          <div className="flex items-center">
            <motion.div whileHover={{ scale: 1.1 }}>
              <FiUsers className="mr-1.5 text-[#4d2c5e]" />
            </motion.div>
            <span>{studentsEnrolled} Students</span>
          </div>
        </motion.div>

        {/* Price and CTA */}
        <motion.div 
          className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-baseline">
            {originalPrice && (
              <span className="text-gray-400 line-through mr-2 text-sm">${originalPrice}</span>
            )}
            <span className="text-lg font-bold text-[#FF7426]">${discountedPrice}</span>
          </div>
          <motion.div
            className="flex items-center text-[#4d2c5e] hover:text-[#FF7426] transition-colors"
            whileHover={{ x: 3 }}
          >
           <button 
  onClick={() => navigate('/courseDetails', { state: { courseId } })}
  className="flex items-center text-[#FF7426] hover:text-[#FF915E] transition-colors"
>
  <span className="mr-1 font-medium">View more</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <FiArrowRight />
            </motion.div>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {typeof remainingSheets === 'number' && remainingSheets < 5 ? (
  <motion.div 
    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF7426] to-[#ff0000]"
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 0.5 }}
  />
) : null}

      {/* Floating accent elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FF7426]/20"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 20],
              x: [0, (Math.random() - 0.5) * 20],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CourseCard;