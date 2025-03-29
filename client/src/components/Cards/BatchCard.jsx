import React from 'react';
import { motion } from 'framer-motion';

const BatchCard = ({ 
  startDate,
  price,
  title,
  batchId,
  batchTime,
  duration,
  mode 
}) => {
  const [day, month, year] = startDate.split(' ');

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all h-full flex flex-col"
      whileHover={{ y: -3, shadow: "lg" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Compact Header with Date and Price */}
      <div className="flex justify-between items-center bg-[#ff7426] text-white p-3">
        <div className="text-center">
          <div className="text-lg font-bold leading-tight">{day}</div>
          <div className="text-xs uppercase">{month} {year}</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-[#000000]">₹{price}</div>
          <div className="text-[10px] text-white/80">Total Fee</div>
        </div>
      </div>

      {/* Course Title */}
      <div className="p-3 border-b border-gray-100 flex-grow">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-2">{title}</h3>
      </div>

      {/* Batch Details - Compact View */}
      <div className="p-3 space-y-2 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">ID:</span>
            <span className="font-medium truncate">{batchId}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">Time:</span>
            <span className="font-medium">{batchTime}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">Duration:</span>
            <span className="font-medium">{duration}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">Mode:</span>
            <span className="font-medium">{mode}</span>
          </div>
        </div>
      </div>

      {/* Compact Action Buttons */}
      <div className="p-3 flex justify-between border-t border-gray-100 bg-gray-50">
        <button className="text-[#ff7426] text-xs sm:text-sm font-medium hover:underline px-2 py-1">
          Details
        </button>
        <button className="bg-[#ff7426] text-white text-xs sm:text-sm px-3 py-1.5 rounded-md hover:bg-[#e56722] transition-colors">
          Enroll
        </button>
      </div>
    </motion.div>
  );
};

export default BatchCard;