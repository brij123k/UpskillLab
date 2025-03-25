import React from 'react';
import Girl from '../assets/girl.png';
import hearts from '../assets/hearts.png';
import jigsaw from '../assets/jigsaw.png';
import Group from '../assets/Group.png';

function LearningExperience() {
  return (
    <div className="bg-[#f9f5f1] relative" style={{ height: 'auto', minHeight: '636px', width: '100vw' }}> {/* Adjusted height and width */}
      <div className="container mx-auto px-4 py-8 flex items-center h-full">
        <div className="flex flex-col md:flex-row w-full"> {/* Made flex-col for mobile */}
          {/* Left Side: Illustration */}
          <div className="md:w-1/2 flex items-center justify-start pl-[5%] md:pl-[20px] mb-8 md:mb-0"> {/* Adjusted padding and margins */}
            <img 
              src={Girl}
              alt="Learning Illustration" 
              className="w-full max-h-[50vh] md:max-h-[597px]" // Responsive image height
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Right Side: Text and Features */}
          <div className="md:w-1/2 pl-4 md:pl-8 flex flex-col justify-center"> {/* Adjusted padding */}
            <h1 className="mt-0 text-[8vw] md:text-[45px] font-bold leading-tight mb-[8vw] md:mb-[60px]"> {/* Responsive text size */}
              <span className="text-black">Premium </span>
              <span className="text-[#FA8C3D]">Learning </span>
              <br />
              <span className="text-black">Experience</span>
            </h1>

            {/* Feature 1: Easily Accessible */}
            <div className="flex items-start mb-6">
              <div className="bg-[#4D2C5E] p-3 rounded-[15px] mr-4">
                <img src={hearts} alt="" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Easily Accessible</h3>
                <p className="text-gray-600">
                  Learning will feel very comfortable with Upskilllab.
                </p>
              </div>
            </div>

            {/* Feature 2: Fun Learning */}
            <div className="flex items-start mb-6">
              <div className="bg-[#4D2C5E] p-3 rounded-[15px] mr-4">
                <img src={jigsaw} alt="" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Fun Learning</h3>
                <p className="text-gray-600">
                  Learning will feel very comfortable with Upskilllab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo (Top Right) */}
      <div className="absolute top-[2vh] right-[2vw]"> {/* Responsive logo position */}
        <img 
          src={Group} 
          alt="Additional Icon" 
          className="h-[10vh] md:h-[191px]" // Responsive logo height
          style={{ marginRight: '2vw' }} // Responsive margin
        />
      </div>
    </div>
  );
}

export default LearningExperience;