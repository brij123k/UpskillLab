import React from 'react';
const Mentorship = ({ imageSrc, title, description }) => {
  return (
    <div className="
      font-poppins 
      w-full 
      bg-white 
      rounded-xl 
      overflow-hidden
      flex flex-col 
      items-center 
      border border-gray-100 
      transition-all 
      duration-300 
      hover:bg-gray-50 
      hover:shadow-lg 
      hover:scale-[1.02] 
      hover:border-gray-200
      shadow-md
      group
    ">
      {/* Image Container */}
      <div className='
        h-[180px] sm:h-[200px] md:h-[220px] 
        w-full 
        relative 
        overflow-hidden
        p-5
      '>
        <img
          src={imageSrc}
          alt={title}
          className="
            w-full h-full 
            
            rounded
            object-cover 
            transition-transform 
            duration-500 
            group-hover:scale-105
          "
        />
        {/* Gradient overlay */}
        <div className="
          absolute inset-0 
          bg-gradient-to-t from-white/10 to-transparent
        "></div>
      </div>

      {/* Content */}
      <div className="w-full p-4 sm:p-5 md:p-6 flex flex-col items-center">
        <h3 className="
          px-2 
          font-semibold 
          text-lg sm:text-xl md:text-2xl 
          text-gray-700 
          text-center 
          mb-2 md:mb-3
          group-hover:text-gray-900
        ">
          {title}
        </h3>
        
        <hr className="
          w-16 
          border-t-2 
          border-[#FF7426] 
          my-2
          opacity-80
        " />
        
        <p className="
          px-2 sm:px-3 
          font-normal 
          text-sm sm:text-base md:text-lg 
          text-gray-600 
          text-center 
          mb-4
          group-hover:text-gray-700
        ">
          {description}
        </p>
        
        {/* Optional Button */}
        <button className="
          mt-auto
          px-6 py-2
          bg-[#FF7426]
          text-white
          rounded-lg
          font-medium
          text-sm md:text-base
          transition-all
          duration-300
          hover:bg-[#E56722]
          hover:shadow-md
          transform
          group-hover:scale-105
        ">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Mentorship;