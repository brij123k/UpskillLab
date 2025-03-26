import React from 'react';
import Illustration from '../assets/illustration.png'; 
function InquirySection() {
  return (
    <div className="bg-[#f8f5f0] py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
        {/* Illustration */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img src={Illustration} alt="Inquiry Illustration" className="w-full" />
        </div>

        {/* Text and Buttons */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-[#e97d26] text-6xl md:text-7xl lg:text-8xl">W</span>
            <span>ant to stay</span>
          </div>
          <div className="text-xl md:text-2xl mb-8">
            <span>informed about new courses or have any doubts?</span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start space-y-4 md:space-y-0 md:space-x-4">
            <button className="bg-[#4D2C5E] text-white rounded-full px-6 py-3 font-semibold text-lg">
              Enquiry Now
            </button>
            <span className="font-semibold">or</span>
            <button className="bg-[#4D2C5E] text-white rounded-full px-6 py-3 font-semibold text-lg">
              Book Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InquirySection;