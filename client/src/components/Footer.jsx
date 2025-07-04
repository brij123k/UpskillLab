import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import CourseEnrollmentModal from './Modal/CourseEnrollmentModal';

function Footer() {
  const [showModal, setShowModal] = useState(false);
  return (
    <footer className="bg-[#FDF8EE] text-[#606060] w-full">
      {/* Main Footer Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 w-full">
          
          {/* Logo, Description, and Social Media - Takes full width on mobile, then 30% on larger screens */}
          <div className="w-full lg:w-[30%]">
            <img 
              src='/images/Logo.png' 
              alt="Company Logo"
              className="w-40 sm:w-48 md:w-52 lg:w-56 xl:w-60 mx-auto lg:mx-0"
            />
            <p className="text-[#606060] text-sm sm:text-base mt-4 sm:mt-6 mb-6 sm:mb-8 lg:mb-6 text-center lg:text-left">
              Empowering Students to reach their potential goal for next level challenge
            </p>
            <div className="text-center lg:text-left">
              <ul className="list-unstyled flex items-center gap-4 justify-center lg:justify-start">
                <li className="text-[#606060] text-sm sm:text-base">Follow Us On:</li>
                <li>
                  <NavLink 
                    to="https://www.facebook.com/upskillab/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors no-underline"
                  >
                    <FaFacebookF />
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="https://www.instagram.com/upskillab_" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors no-underline"
                  >
                    <FaInstagram />
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="https://whatsapp.com/channel/0029Vb6RBx0GufJ0RYlVaj2i" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors no-underline"
                  >
                    <FaWhatsapp />
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="https://www.linkedin.com/company/upskill-now-upskillab" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors no-underline"
                  >
                    <FaLinkedinIn />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Links Grid - Takes full width and adjusts columns responsively */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 w-full">
            
            {/* Company Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-[#00052E] text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Company</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><NavLink to="/" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors block">Home</NavLink></li>
                <li><NavLink to="/About" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors block">About Us</NavLink></li>
                <li><NavLink to="/CourseList" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors block">Popular Course</NavLink></li>
                <li><NavLink to="/upcoming-batches/" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors block">Latest Batches</NavLink></li>
                <li><NavLink to="/Students-Blog" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors block">Blog</NavLink></li>
                <li><button onClick={()=>setShowModal(true)} className="m-auto sm:m-0 text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors block">Payment</button></li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-[#00052E] text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Support</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="/Login" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors block">Login</a></li>
                <li><NavLink to="/contactUs" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors block">Help Center</NavLink></li>
                <li><NavLink to="/PrivacyPolicy" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors block">Privacy</NavLink></li>
                <li><NavLink to="/TermsOfService" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors block">Terms & Conditions</NavLink></li>
                <li><NavLink to="/RefundPolicy" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors block">Refund Policy</NavLink></li>
                <li><NavLink to="/Career" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors block">Career</NavLink></li>
              </ul>
            </div>

            {/* Contact Info - Takes 2 columns on mobile, 1 on larger screens */}
            <div className="text-center sm:text-left col-span-2 sm:col-span-1">
              <h3 className="text-[#00052E] text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Contact</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <NavLink
                    to="tel:+919958958123"
                    className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors block"
                  >
                    +91-9958958123
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="mailto:info@upskillab.com"
                    className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors block"
                  >
                    info@upskillab.com
                  </NavLink>
                </li>
                <li className="text-[#606060] text-sm sm:text-base">
                  Upskillab<br />
                  H-187, Lohia Rd, H Block, Sector 63<br />
                  Noida, Uttar Pradesh 201301
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section - Full width with centered content */}
      <div className="w-full border-t border-[#FFEED9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
            <NavLink to="/PrivacyPolicy" className="text-[#FF7426] text-sm hover:underline">Privacy Policy</NavLink>
            <span className="hidden sm:block text-[#FF7426]">|</span>
            <NavLink to="/TermsOfService" className="text-[#FF7426] text-sm hover:underline">Terms & Condition</NavLink>
          </div>
          <p className="text-center text-sm mt-2">© {new Date().getFullYear()} Upskillab.com All rights reserved.</p>
        </div>
      </div>

      {showModal && (
        <CourseEnrollmentModal 
          onClose={() => setShowModal(false)} 
        />
      )}
    </footer>
  );
}

export default Footer;
