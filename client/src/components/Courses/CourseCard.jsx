import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiBarChart2, FiArrowRight, FiBookmark } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const CourseCard = ({
  id,
  courseId,
  courseCode,
  courseLevel,
  image,
  title,
  metaTitle,
  metaDescription,
  duration,
  studentsEnrolled,
  originalPrice,
  discountedPrice,
  remainingSheets,
  categoryName
}) => {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>

        {/* <meta 
          name="title" 
          content={metaTitle} 
        />
        
        <meta property="og:title" content={metaTitle}  /> */}
      </Helmet>
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
              <span className="text-sm font-semibold text-gray-700">
                {(() => {
                  const days = duration;

                  if (days < 1) return `${Math.round(days * 24)} hours`;

                  // 1-6 days = show in days
                  if (days <= 6) return `${Math.round(days)} days`;

                  // 7-27 days = show in weeks
                  if (days <= 27) {
                    const weeks = (days / 7).toFixed(1);
                    return `${weeks.endsWith('.0') ? weeks.split('.')[0] : weeks} week${weeks !== '1' ? 's' : ''}`;
                  }

                  // 28-364 days = show in months
                  if (days <= 364) {
                    const months = (days / 30).toFixed(1); // Average month length
                    return `${months.endsWith('.0') ? months.split('.')[0] : months} month${months !== '1' ? 's' : ''}`;
                  }

                  // 365+ days = show in years
                  const years = (days / 365).toFixed(1);
                  return `${years.endsWith('.0') ? years.split('.')[0] : years} year${years !== '1' ? 's' : ''}`;
                })()}
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
          <div className="flex sm:items-center sm:justify-between flex-col sm:flex-row border-t border-gray-100 pt-3">
            <div className="flex items-baseline">
              {originalPrice && (
                <span className="text-gray-400 line-through mr-2 text-sm">₹{originalPrice}</span>
              )}
              <span className="text-lg font-bold text-[#FF7426]">₹{discountedPrice}</span>
            </div>

            <NavLink
              to={{
                pathname: `/${categoryName.toLowerCase()}/course/${courseCode}`,
              }}
              state={{ courseId, courseCode }}
            >
              <button
                className="flex items-center justify-center border-1 rounded-2xl border-[#4D2C5E] px-2 py-1 hover:bg-[#4D2C5E] cursor-pointer text-[#4D2C5E] hover:text-[#fff] transition-colors"
              >
                <span className="mr-1 font-normal">View more</span>
                <FiArrowRight />
              </button>
            </NavLink>

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
          </>
  );
};

export default CourseCard;
