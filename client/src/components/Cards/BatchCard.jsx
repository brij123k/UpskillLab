import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const BatchCard = ({
  onEnroll,
  startDate,
  price,
  remainingSeats,
  originalPrice,
  title,
  batchId,
  courseId,
  courseCode,
  batchCode,
  batchTime,
  duration,
  mode,
}) => {
  const day = startDate.getDate();
  const month = startDate.toLocaleString("default", { month: "short" });
  const year = startDate.getFullYear();
  const navigate = useNavigate();
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all flex flex-col h-full cursor-pointer relative"
      whileHover={{
        y: -5,
        boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1)",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Solid color header */}
      <motion.div
        className="bg-[#4D2C5E] p-4 border-b border-[#3A2250]"
        whileHover={{ backgroundColor: "#3A2250" }}
      >
        <div className="flex justify-between items-start">
          {/* Date with bounce animation */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.03 }}
          >
            <motion.div
              className="bg-[#FF7426] text-white rounded-lg w-12 h-12 flex flex-col items-center justify-center shadow-md"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-lg font-bold leading-none">{day}</span>
              <span className="text-xs uppercase mt-1">{month}</span>
            </motion.div>
            <span className="text-gray-300 text-sm">{year}</span>
          </motion.div>

          {/* Price with floating animation */}
          <motion.div className="text-right">
            <span className="text-2xl font-bold text-white">₹{price}</span>
            <p className="text-xs text-gray-300 mt-1">Total Fee</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Card Body */}
      <div className="p-4 flex-grow">
        {/* Title with color change animation */}
        <motion.h3
          className="text-lg font-bold text-[#4D2C5E] mb-4 line-clamp-2"
          whileHover={{
            color: "#FF7426",
            x: 3,
          }}
          transition={{ type: "spring" }}
        >
          {title}
        </motion.h3>

        {/* Info chips with separate colors */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <motion.div
            className="flex items-center bg-[#FF7426]/10 px-3 py-2 rounded-lg border border-[#FF7426]/20"
            whileHover={{
              scale: 1.03,
              backgroundColor: "#FF7426/20",
            }}
          >
            <div className="w-6 h-6 bg-[#FF7426] rounded-full mr-2 flex items-center justify-center text-white">
              ⏰
            </div>
            <span className="text-sm text-[#FF7426]">{batchTime}</span>
          </motion.div>

          <motion.div
            className="flex items-center bg-[#4D2C5E]/10 px-3 py-2 rounded-lg border border-[#4D2C5E]/20"
            whileHover={{
              scale: 1.03,
              backgroundColor: "#4D2C5E/20",
            }}
          >
            <div className="w-6 h-6 bg-[#4D2C5E] rounded-full mr-2 flex items-center justify-center text-white">
              📆
            </div>
            <span className="text-sm text-[#4D2C5E]">{duration}</span>
          </motion.div>

          <motion.div
            className="flex items-center bg-[#FF7426]/10 px-3 py-2 rounded-lg border border-[#FF7426]/20"
            whileHover={{
              scale: 1.03,
              backgroundColor: "#FF7426/20",
            }}
          >
            <div className="w-6 h-6 bg-[#FF7426] rounded-full mr-2 flex items-center justify-center text-white">
              🖥️
            </div>
            <span className="text-sm text-[#FF7426]">{mode}</span>
          </motion.div>

          <motion.div
            className="flex items-center bg-[#4D2C5E]/10 px-3 py-2 rounded-lg border border-[#4D2C5E]/20"
            whileHover={{
              scale: 1.03,
              backgroundColor: "#4D2C5E/20",
            }}
          >
            <div className="w-6 h-6 bg-[#4D2C5E] rounded-full mr-2 flex items-center justify-center text-white">
              🔢
            </div>
            <span className="text-sm text-[#4D2C5E]">{remainingSeats} Seats</span>
          </motion.div>
        </div>
      </div>

      {/* Card Footer with solid color buttons */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between gap-3">
          <motion.button
            className="text-[#4D2C5E] text-sm font-medium px-4 py-2 rounded-md border-2 border-[#4D2C5E] hover:bg-[#4D2C5E] hover:text-white transition-colors flex-1"
            onClick={() => navigate(`/courseDetails/batch/${batchId}`, { 
              state: { 
                courseId,
                courseCode,
                batchId,
                batchCode 
              } 
            })}

            whileHover={{
              scale: 1.02,
              boxShadow: "0 2px 8px -1px rgba(77, 44, 94, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            View Details
          </motion.button>
          <motion.button
            className="bg-[#FF7426] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#E56722] transition-colors flex-1 shadow-sm"
            onClick={onEnroll}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 3px 10px -1px rgba(255, 116, 38, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Enroll Now
          </motion.button>
        </div>
      </div>

      {/* Floating decoration */}
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF7426]"
        animate={{
          scale: [1, 1.3, 1],
          transition: { repeat: Infinity, duration: 2 },
        }}
      />
    </motion.div>
  );
};

export default BatchCard;
