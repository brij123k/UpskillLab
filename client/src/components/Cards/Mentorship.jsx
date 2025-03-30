import React, { useState } from 'react';
import Modal from '../Modal/CommonModal';

const MentorshipCard = ({ imageSrc, title, description }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="font-poppins w-full bg-white rounded-2xl overflow-hidden flex flex-col border border-gray-200 hover:border-[#FFD9C5] transition-all duration-300 hover:shadow-xl group h-full">
        {/* Header with colored accent */}
        <div className="h-2 w-full bg-gradient-to-r from-[#FF7426] to-[#FF9142]"></div>
        
        {/* Content with image on top */}
        <div className="p-5 sm:p-6 flex flex-col flex-grow">
          {/* Image with frame */}
          <div className="relative mb-5 sm:mb-6 rounded-lg overflow-hidden aspect-video">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF7426]/10 to-[#FF7426]/30 mix-blend-multiply"></div>
          </div>

          {/* Text content */}
          <div className="flex-grow">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="h-1 w-8 bg-[#FF7426] mr-3"></div>
              <h3 className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-2xl font-semibold text-gray-800 group-hover:text-[#FF7426] transition-colors">
                {title}
              </h3>
            </div>

            <p className="text-gray-600 text-sm sm:text-base md:text-[0.95rem] mb-5 sm:mb-6 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Button with hover effect */}
          <button
            onClick={() => setOpenModal(true)}
            className="mt-auto w-full py-3 px-4 bg-gradient-to-r from-[#FF7426] to-[#FF9142] text-white rounded-lg font-medium text-sm sm:text-base hover:from-[#E65100] hover:to-[#FF7426] transition-all shadow-sm hover:shadow-md group-hover:shadow-orange-200"
          >
            Explore Program
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </button>
        </div>
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default MentorshipCard;