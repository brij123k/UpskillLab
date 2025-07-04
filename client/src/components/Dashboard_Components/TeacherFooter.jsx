import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn  } from 'react-icons/fa';
import { FiBook,FiHome , FiUsers, FiCalendar, FiMessageSquare, FiTrendingUp, FiVideo,FiUpload } from 'react-icons/fi';

function TeacherFooter() {
  return (
    <footer className="bg-white text-[#606060] w-full border-t border-gray-200 shadow-sm">
      {/* Main Footer Content */}
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 w-full">
          
          {/* Logo and Description */}
          <div className="w-full lg:w-[30%]">
            <NavLink to="/Teacher/Dashboard">
              <img 
                src='/images/Logo.png'
                alt="Upskillab Logo"
                className="h-10 mx-auto lg:mx-0 mb-4"
              />
            </NavLink>
            <p className="text-[#606060] text-sm sm:text-base mt-4 sm:mt-6 mb-6 sm:mb-8 lg:mb-6 text-center lg:text-left">
              Empowering educators to deliver exceptional learning experiences
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

          {/* Links Grid - Matches header navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 w-full">
            
            {/* Teaching Sections */}
            <div className="text-center sm:text-left">
              <h3 className="text-[#4D2C5E] text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center justify-center sm:justify-start">
                <FiBook className="mr-2" />
                Teaching
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <NavLink 
                    to="/Teacher/StudyMaterials" 
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base block flex items-center justify-center sm:justify-start"
                  >
                    <FiUpload className="mr-1 text-xs" />
                    Study Materials
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/Teacher/Schedule" 
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base block flex items-center justify-center sm:justify-start"
                  >
                    <FiCalendar className="mr-1 text-xs" />
                    Class Schedule
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/Teacher/Doubts" 
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base block flex items-center justify-center sm:justify-start"
                  >
                    <FiMessageSquare className="mr-1 text-xs" />
                    Doubt Handling
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Insights Sections */}
            <div className="text-center sm:text-left">
              <h3 className="text-[#4D2C5E] text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center justify-center sm:justify-start">
                <FiTrendingUp className="mr-2" />
                Insights
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <NavLink 
                    to="/Teacher/Dashboard" 
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base block flex items-center justify-center sm:justify-start"
                  >
                    <FiHome className="mr-1 text-xs" />
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/Teacher/Analysis" 
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base block flex items-center justify-center sm:justify-start"
                  >
                    <FiTrendingUp className="mr-1 text-xs" />
                    Market Analysis
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/Teacher/Profile" 
                    className="text-[#606060] hover:text-[#4D2C5E] text-sm sm:text-base block flex items-center justify-center sm:justify-start"
                  >
                    <FiUsers className="mr-1 text-xs" />
                    Student Analytics
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
                    to="tel:+919958958123"
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

      {/* Copyright Section - Matches header style */}
      <div className="w-full border-t border-gray-200 bg-[#F8F9FA]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
            <NavLink to="/teacher/privacy" className="text-[#FF7426] text-sm hover:underline">Privacy Policy</NavLink>
            <span className="hidden sm:block text-[#FF7426]">|</span>
            <NavLink to="/teacher/terms" className="text-[#FF7426] text-sm hover:underline">Terms & Conditions</NavLink>
          </div>
          <p className="text-center text-sm mt-2">© {new Date().getFullYear()} Upskillab.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default TeacherFooter;