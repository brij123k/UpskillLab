import React from 'react';

const Cards = ({ imageSrc, title, subtitle }) => {
  return (
    <div className='flex flex-row' >
      
      
      <div className='w-[249.73px] h-[254px] bg-[#71567e] rounded-[23px] flex items-center justify-center'>
        <img src={imageSrc} alt={title} className="w-[209.39px] h-[192px] rounded-[23px]" />
        </div>
        <div className='w-[280px] h-[163px] flex flex-col mt-[84px] px-[20.24px]'>
        <h3 className="text-[28px]  font-bold text-[#FF7426]">{title}</h3>
        <p className="text-[32px] font-semibold text-white">{subtitle}</p>
        </div>
     
    </div>
  );
};

export default Cards;
