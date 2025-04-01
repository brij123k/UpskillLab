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
  className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#FFE5D5] hover:shadow-md transition-all flex flex-col h-full cursor-pointer"
  whileHover={{ y: -3 }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  {/* Card Header with Accent */}
  <div className="bg-[#FFF5EF] p-4 border-b border-[#FFD9C5]">
    <div className="flex justify-between items-start">
      {/* Date */}
      <div className="flex items-center space-x-3">
        <div className="bg-[#FF7426] text-white rounded-lg w-12 h-12 flex flex-col items-center justify-center">
          <span className="text-lg font-bold leading-none">{day}</span>
          <span className="text-xs uppercase mt-1">{month}</span>
        </div>
        <span className="text-gray-500 text-sm">{year}</span>
      </div>
      
      {/* Price */}
      <div className="text-right">
        <span className="text-2xl font-bold text-[#FF7426]">₹{price}</span>
        <p className="text-xs text-gray-500 mt-1">Total Fee</p>
      </div>
    </div>
  </div>

  {/* Card Body */}
  <div className="p-4 flex-grow">
    <h3 className="text-lg font-bold text-[#4d2c5e] mb-4 line-clamp-2">
      {title}
    </h3>
    
    {/* Details Grid */}
    <div className="space-y-3">
      <div className="flex items-center">
        <div className="w-6 h-6 bg-[#FFF5EF] rounded-full mr-2 flex items-center justify-center text-[#FF7426]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <span className="text-sm text-gray-600">
          <span className="text-gray-500">Batch ID:</span> {batchId}
        </span>
      </div>
      
      <div className="flex items-center">
        <div className="w-6 h-6 bg-[#FFF5EF] rounded-full mr-2 flex items-center justify-center text-[#FF7426]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="text-sm text-gray-600">
          <span className="text-gray-500">Time:</span> {batchTime}
        </span>
      </div>
      
      <div className="flex items-center">
        <div className="w-6 h-6 bg-[#FFF5EF] rounded-full mr-2 flex items-center justify-center text-[#FF7426]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="text-sm text-gray-600">
          <span className="text-gray-500">Duration:</span> {duration}
        </span>
      </div>
      
      <div className="flex items-center">
        <div className="w-6 h-6 bg-[#FFF5EF] rounded-full mr-2 flex items-center justify-center text-[#FF7426]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="text-sm text-gray-600">
          <span className="text-gray-500">Mode:</span> {mode}
        </span>
      </div>
    </div>
  </div>

  {/* Card Footer */}
  <div className="p-4 border-t border-[#FFE5D5] bg-[#FFF9F5]">
    <div className="flex justify-between">
      <button className="text-[#FF7426] text-sm font-medium hover:underline px-3 py-1.5 rounded hover:bg-[#FFF0E5] transition-colors">
        View Details
      </button>
      <button className="bg-[#FF7426] text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-[#E56722] transition-colors shadow-sm">
        Enroll Now
      </button>
    </div>
  </div>
</motion.div>
  );
};

export default BatchCard;