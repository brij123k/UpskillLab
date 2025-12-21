import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import { FiHome, FiBook, FiCalendar, FiVideo, FiMessageSquare } from 'react-icons/fi';

const StudentFooter = () => {
  return (
    <footer className="bg-white text-[#606060] w-full border-t border-gray-200 shadow-sm">
      {/* Main Footer Content */}
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 w-full">
          
          {/* Logo and Description */}
          <div className="w-full lg:w-[30%]">
            <NavLink to="/student/dashboard">
              <img 
                src="/images/Logo.png"
                alt="Upskillab Logo"
                className="h-10 mx-auto lg:mx-0 mb-4"
              />
            </NavLink>
            <p className="text-[#606060] text-sm sm:text-base mt-4 sm:mt-6 mb-6 sm:mb-8 lg:mb-6 text-center lg:text-left">
              Where Skills Development Meets Mental Wellbeing
            </p>
            <div className="text-center lg:text-left">
              <ul className="flex items-center gap-4 justify-center lg:justify-start">
                <li className="text-[#606060] text-sm sm:text-base">Follow Us:</li>
                <li>
                  <NavLink 
                    to="https://www.facebook.com/upskillab/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base transition-colors"
                  >
                    <FaFacebookF />
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="https://www.instagram.com/upskillab_" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base transition-colors"
                  >
                    <FaInstagram />
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="https://whatsapp.com/channel/0029Vb6RBx0GufJ0RYlVaj2i" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base transition-colors"
                  >
                    <FaWhatsapp />
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="https://www.linkedin.com/company/upskill-now-upskillab" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base transition-colors"
                  >
                    <FaLinkedinIn />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 w-full">
            
            {/* Learning Resources */}
            <div className="text-center sm:text-left">
              <h3 className="text-[#4D2C5E] text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center justify-center sm:justify-start">
                <FiBook className="mr-2" />
                Learning
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <NavLink 
                    to="/student/StudyMaterials" 
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base block flex items-center justify-center sm:justify-start"
                  >
                    Study Materials
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/student/schedule" 
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base block flex items-center justify-center sm:justify-start"
                  >
                    Class Schedule
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/student/recorded-videos" 
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base block flex items-center justify-center sm:justify-start"
                  >
                    Recorded Videos
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Support Sections */}
            <div className="text-center sm:text-left">
              <h3 className="text-[#4D2C5E] text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center justify-center sm:justify-start">
                <FiMessageSquare className="mr-2" />
                Support
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <NavLink 
                    to="/student/doubts" 
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base block flex items-center justify-center sm:justify-start"
                  >
                    Doubt Resolution
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/student/Trends" 
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base block flex items-center justify-center sm:justify-start"
                  >
                    Teacher Suggestions
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/student/Jobs" 
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base block flex items-center justify-center sm:justify-start"
                  >
                    Job Openings
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/student/trends" 
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base block flex items-center justify-center sm:justify-start"
                  >
                    Market Trends
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center sm:text-left col-span-2 sm:col-span-1">
              <h3 className="text-[#4D2C5E] text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Contact Support</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <NavLink
                    to="tel:+919319427070"
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base block"
                  >
                    +91-9319427070
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="mailto:info@upskillab.com"
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base block"
                  >
                    info@upskillab.com
                  </NavLink>
                </li>
                <li className="text-[#606060] text-sm sm:text-base">
                  Trivision Partners Private Limited<br />
                  H-187, Lohia Rd, Sector 63<br />
                  Noida, Uttar Pradesh 201301
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-full border-t border-gray-200 bg-[#F8F9FA]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <p className="text-center text-sm mt-2">© {new Date().getFullYear()} Upskillab.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default StudentFooter;