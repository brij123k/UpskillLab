import React from 'react';
import Girl from '../assets/girl.png';
import hearts from '../assets/hearts.png';
import jigsaw from '../assets/jigsaw.png';
import Group from '../assets/Group.png';

function LearningExperience() {
  return (
    <div className="bg-[#f9f5f1] relative w-full min-h-[50vh] lg:min-h-[636px] 2xl:min-h-[800px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 sm:py-12 lg:py-16 xl:py-20 2xl:py-24 h-full">
        <div className="flex flex-col lg:flex-row w-full items-center">
          {/* Left Side: Illustration */}
          <div className="lg:w-1/2 flex items-center justify-center lg:justify-start mb-8 lg:mb-0 px-4 sm:px-6 lg:px-0">
            <img 
              src={Girl}
              alt="Learning Illustration" 
              className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-none h-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-[597px] xl:max-h-[700px] 2xl:max-h-[800px]"
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Right Side: Text and Features */}
          <div className="lg:w-1/2 lg:pl-8 xl:pl-12 2xl:pl-16 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
              <span className="text-black">Premium </span>
              <span className="text-[#FA8C3D]">Learning </span>
              <br className="hidden sm:block" />
              <span className="text-black">Experience</span>
            </h1>

            {/* Feature 1: Easily Accessible */}
            <div className="flex items-start mb-6 sm:mb-8 lg:mb-10">
              <div className="bg-[#4D2C5E] p-3 sm:p-4 rounded-[15px] mr-4 sm:mr-6">
                <img 
                  src={hearts} 
                  alt="Accessibility icon"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl lg:text-xl xl:text-2xl font-semibold mb-1 sm:mb-2">
                  Easily Accessible
                </h3>
                <p className="text-gray-600 text-sm sm:text-base lg:text-base xl:text-lg">
                  Learning will feel very comfortable with Upskillab.
                </p>
              </div>
            </div>

            {/* Feature 2: Fun Learning */}
            <div className="flex items-start mb-6 sm:mb-8 lg:mb-10">
              <div className="bg-[#4D2C5E] p-3 sm:p-4 rounded-[15px] mr-4 sm:mr-6">
                <img 
                  src={jigsaw} 
                  alt="Fun learning icon"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl lg:text-xl xl:text-2xl font-semibold mb-1 sm:mb-2">
                  Fun Learning
                </h3>
                <p className="text-gray-600 text-sm sm:text-base lg:text-base xl:text-lg">
                  Learning will feel very comfortable with Upskillab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo (Top Right) */}
      <div className="absolute top-4 sm:top-6 lg:top-8 xl:top-10 2xl:top-12 right-4 sm:right-6 lg:right-8 xl:right-10 2xl:right-12">
        <img 
          src={Group} 
          alt="Additional Icon" 
          className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 2xl:h-36 w-auto"
        />
      </div>
    </div>
  );
}

export default LearningExperience;