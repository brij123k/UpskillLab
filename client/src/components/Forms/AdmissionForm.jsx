import React from 'react';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

const AdmissionForm = () => {
  return (
    <div className="bg-[#fff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Content */}
        <div className="flex flex-col justify-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
              Application <span className='text-[#FF7426]'>Process</span>
            </h2>
            <p className="text-lg sm:text-xl mb-6">
              Complete your Admission Process in just 3 simple steps
            </p>
            
          </div>
          
          <div className="w-full h-40 sm:h-50 lg:h-60 relative">
  {/* Yellow circle background */}
  <div className="absolute w-full h-full rounded-full bg-yellow-400 z-0 shadow-lg"></div>
  
  {/* Image container */}
  <div className="absolute w-full h-full rounded-full overflow-hidden z-10">
    <img 
      src="/images/college.png" 
      alt="Admission process illustration"
      className="absolute top-5 left-0 w-full h-full object-contain shadow-lg transform scale-105 transition-transform duration-500 hover:scale-130"
    />
  </div>
</div>
<div className='flex flex-col items-center mt-6'>
<h3 className="text-2xl sm:text-3xl font-bold text-[#FF7426] mb-8">
              Book your Demo Session, and Get Amazing Courses <div className='text-black'>Today!!!</div>
            </h3>
</div>
        </div>

        {/* Right Column - Form */}
        <div className="bg-[#FDF8EE] rounded-xl p-6 sm:p-8 lg:p-10 shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold text-[#4d2c5e] mb-6 text-center">
            Reserve Your Spot for a Free Demo Session
          </h3>
          
          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full px-4 py-2 rounded-4xl border border-gray-300 focus:ring-2 focus:ring-[#4d2c5e] focus:border-[#4d2c5e] transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 rounded-4xl border border-gray-300 focus:ring-2 focus:ring-[#4d2c5e] focus:border-[#4d2c5e] transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-2 rounded-4xl border border-gray-300 focus:ring-2 focus:ring-[#4d2c5e] focus:border-[#4d2c5e] transition-all"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Course Dropdown */}
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                Choose Course
              </label>
              <select
                id="course"
                name="course"
                className="w-full px-4 py-2 rounded-4xl border border-gray-300 focus:ring-2 focus:ring-[#4d2c5e] focus:border-[#4d2c5e] transition-all appearance-none bg-white"
                required
              >
                <option value="">Select a course</option>
                <option value="web-development">Web Development</option>
                <option value="data-science">Data Science</option>
                <option value="ux-design">UX/UI Design</option>
                <option value="digital-marketing">Digital Marketing</option>
              </select>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 flex flex-row justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="fresher"
                  name="fresher"
                  className="h-5 w-5 text-[#4d2c5e] rounded border-gray-300 focus:ring-[#4d2c5e]"
                />
                <label htmlFor="fresher" className="ml-3 text-sm font-medium text-gray-700">
                  Fresher
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="working"
                  name="working"
                  className="h-5 w-5 text-[#4d2c5e] rounded border-gray-300 focus:ring-[#4d2c5e]"
                />
                <label htmlFor="working" className="ml-3 text-sm font-medium text-gray-700">
                  Working Professional
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className='w-full flex justify-center'>            
                <button
              type="submit"
              className="w-50 bg-[#4d2c5e] hover:bg-[#3a2148] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              Submit
              <FiArrowRight className="ml-2" />
            </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;