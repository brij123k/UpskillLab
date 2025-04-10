import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiBarChart2, FiArrowRight, FiBookmark } from 'react-icons/fi';
import { NavLink,useNavigate } from 'react-router-dom';
const CourseCard = ({ 
  id,
  courseId,
  courseCode,
  courseLevel,
  image, 
  title, 
  duration, 
  studentsEnrolled, 
  originalPrice, 
  discountedPrice,
  remainingSheets
}) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px 0px" }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full max-w-xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full cursor-pointer border border-gray-100 hover:border-[#FF7426]/50 transition-all duration-300 group relative"
    >
      {/* Remaining Sheets Label */}
      {typeof remainingSheets !== 'undefined' && remainingSheets !== null && (
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
      )}

      {/* Image */}
      <motion.div 
        className="relative h-full overflow-hidden"
        whileHover={{ scale: 1.02 }}
      >
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4d2c5e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Content */}
      <div className="p-5 flex flex-col h-full">
        {/* Title at top */}
        <motion.h3 
          className="text-lg font-bold text-gray-900 mb-3 line-clamp-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h3>

        {/* Bottom-aligned content */}
        <div className="mt-auto">
          {/* Duration and Students */}
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <FiClock className="mr-1.5 text-[#4d2c5e]" />
              <span>
                {duration < 1 ? `${Math.round(duration * 24)} hours` :
                 duration <= 6 ? `${Math.round(duration)} days` :
                 duration <= 27 ? `${(duration/7).toFixed(1).replace('.0','')} week${duration >= 14 ? 's' : ''}` :
                 duration <= 364 ? `${(duration/30.44).toFixed(1).replace('.0','')} month${duration >= 60 ? 's' : ''}` :
                 `${(duration/365).toFixed(1).replace('.0','')} year${duration >= 730 ? 's' : ''}`}
              </span>
            </div>
            <motion.div 
  className="flex items-center bg-[#4D2C5E]/10 px-3 py-1 rounded-lg"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <motion.div
    animate={{
      rotate: [0, 5, -5, 0],
    }}
    transition={{ duration: 1, repeat: Infinity }}
  >
    <FiBarChart2 className="mr-1.5 text-[#4D2C5E]" />
  </motion.div>
  <span className="capitalize font-bold text-[#4D2C5E]">
    {courseLevel.toLowerCase()}
  </span>
</motion.div>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-baseline">
              {originalPrice && (
                <span className="text-gray-400 line-through mr-2 text-sm">₹{originalPrice}</span>
              )}
              <span className="text-lg font-bold text-[#FF7426]">₹{discountedPrice}</span>
            </div>
            <button 
              onClick={() => navigate(`/courseDetails/course/${courseCode}`, { state: { courseId, courseCode } })}
              className="flex items-center text-[#FF7426] hover:text-[#FF915E] transition-colors"
            >
              <span className="mr-1 font-medium">View more</span>
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Low availability indicator */}
      {typeof remainingSheets === 'number' && remainingSheets < 5 && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF7426] to-[#ff0000]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  );
};

export default CourseCard;