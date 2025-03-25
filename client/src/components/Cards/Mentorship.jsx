import React from 'react';
import line from '../../assets/line.png';

const Mentorship = ({ imageSrc, title, description }) => {
  return (
    <div 
      className="w-full max-w-[490px] h-auto bg-white rounded-[14px] p-6 mx-2 flex flex-col items-center justify-between"
      style={{ boxShadow: "0px 6px 6px 0px #00000040" }}
    >
      {/* Image */}
      <img 
        src={imageSrc} 
        alt={title} 
        className="w-full max-w-[288px] h-[200px] md:h-[266px] mb-4 object-cover rounded-2xl" 
      />

      {/* Line */}
      <img src={line} alt="" className="w-full max-w-[200px] mb-4" />

      {/* Title */}
      <h3 className="font-poppins font-[500] text-[24px] md:text-[32px] text-[#666666] text-center mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="font-rokkitt font-[400] text-[16px] md:text-[20px] text-center text-black mb-4">
        {description}
      </p>
    </div>
  );
};

export default Mentorship;
