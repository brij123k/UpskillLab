import React from 'react';
import PlanetIconImage from '../../assets/PlanetIconImage.png'; 

function PageHeader() {
  return (
    <div className="relative">
      <h2 className="text-4xl font-semibold text-center mb-10">
        Explore Our World's Best Courses
      </h2>
      <div className="flex justify-end mt-8">
        <button className="bg-[#f0f0f0] rounded-full px-6 py-2 text-sm font-semibold">
          Explore All 
        </button>
      </div>
      <img src={PlanetIconImage} alt="Planet Icon" className="absolute top-4 right-4 h-16" />
    </div>
  );
}

export default PageHeader;