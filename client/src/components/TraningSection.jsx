import React from 'react';
import training from '../assets/training.png';

function TrainingSection() {
  return (
    <div className="bg-[#f8f5f0] py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
        {/* Text and Buttons */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Corporate Training & Professional Service
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Learn the latest skills quickly with a personalised curriculum created to meet your needs.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start space-y-4 md:space-y-0 md:space-x-4">
            <button className="bg-gradient-to-r from-[#6b489b] to-[#805cbc] text-white rounded-full px-6 py-3 font-semibold flex items-center shadow-md">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707L9 6.586 8.293 7.293 11.586 10l-3.293 3.293 1.414 1.414L13.707 10l-3.293-3.293z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="bg-gradient-to-r from-[#e97d26] to-[#f09a4f] text-white rounded-full px-6 py-3 font-semibold flex items-center shadow-md">
              Book an Appointment
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 10-2 0v1H5a1 1 0 01-1-1V3a1 1 0 011-1h10a1 1 0 011 1v1h1a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1h1V3a1 1 0 011-1h2a1 1 0 011 1v1h2V3a1 1 0 011-1h2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div className="w-full lg:w-1/2">
          <img src={training} alt="Training Illustration" className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default TrainingSection;