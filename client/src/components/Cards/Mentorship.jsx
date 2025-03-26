import React from 'react';

const Mentorship = ({ imageSrc, title, description }) => {
  return (
    <div
      className="font-poppins w-full bg-white rounded-xl flex flex-col items-center border border-gray-50 transition-all duration-300 hover:bg-gray-50 hover:shadow-xl hover:scale-105 hover:border-gray-200"
      style={{ boxShadow: "0px 6px 6px 0px #00000040" }}
    >
      <div className='h-[200px] w-full flex items-center justify-center p-4'>
        <img
          src={imageSrc}
          alt={title}
          className="h-full object-cover rounded-xl transition-transform duration-300 hover:scale-110"
        />
      </div>
      <hr className="border-t-2 border-[#ACACAC] w-full" />
      <h3 className="px-4 font-medium text-lg md:text-2xl text-[#666666] text-center my-2">
        {title}
      </h3>
      <p className="px-4 font-[400] md:text-lg text-center text-black mb-4">
        {description}
      </p>
    </div>
  );
};

export default Mentorship;