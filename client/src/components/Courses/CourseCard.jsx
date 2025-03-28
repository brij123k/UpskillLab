import React from 'react';
import { FiClock, FiUsers, FiArrowRight } from 'react-icons/fi';

const CourseCard = ({ 
  imageUrl, 
  title, 
  duration, 
  studentsEnrolled, 
  originalPrice, 
  discountedPrice 
}) => {
  return (
    <div className="max-w-xs bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1 flex flex-col h-full cursor-pointer">
      {/* Course Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      
      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Course Title - Will take available space at top */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">{title}</h3>
        
        {/* Spacer to push bottom content down */}
        <div className="flex-grow"></div>
        
        {/* Bottom-aligned content */}
        <div className="mt-auto">
          {/* Duration and Students - Single Line */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <div className="flex items-center mr-4">
              <FiClock className="mr-1.5" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <FiUsers className="mr-1.5" />
              <span>{studentsEnrolled} Students</span>
            </div>
          </div>
          
          {/* Price and CTA */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center">
              <span className="text-gray-400 line-through mr-2 text-sm">${originalPrice}</span>
              <span className="text-lg font-bold text-green-600">${discountedPrice}</span>
            </div>
            <div className="text-[#FF7426] hover:text-[#E56722] flex items-center cursor-pointer transition-colors">
              <span className="mr-1 font-medium">View more</span>
              <FiArrowRight />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CourseCard;