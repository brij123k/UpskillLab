import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";  // ✅ Correct import

function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const handleEnrollClick = () => {
        navigate('/#AdmissionForm'); // Navigate first
        
        // Scroll after a slight delay (ensures page loads)
        setTimeout(() => {
          const form = document.getElementById('AdmissionForm');
          if (form) form.scrollIntoView({ behavior: 'smooth' });
        }, 300); // Adjust delay if needed
      };
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
        document.body.style.overflow = isDrawerOpen ? 'auto' : 'hidden';
    };

    // NavLink active style
    const navLinkStyle = ({ isActive }) => ({
        color: isActive ? '#FF7426' : '#374151',
        fontWeight: isActive ? '600' : '400'
    });

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-3 flex items-center justify-between">
                {/* Logo */}
                <NavLink to="/">
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0"
                    >
                        <img 
                            src="/images/Logo.png" 
                            alt="Meritshot Logo" 
                            className="h-8 sm:h-10 lg:h-12 2xl:h-14 transition-all duration-200"
                        />
                    </motion.div>
                </NavLink>

                {/* Desktop Navigation - Optimized for 1024-1150px */}
                <div className="hidden lg:flex items-center">
                    <div className="flex items-center space-x-6 xl:space-x-8 2xl:space-x-10">
                        <NavLink 
                            to="/courses" 
                            style={navLinkStyle}
                            className="hover:text-[#FF7426] text-sm lg:text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap"
                        >
                            Courses
                        </NavLink>
                        <NavLink 
                            to="/Success-stories" 
                            style={navLinkStyle}
                            className="hover:text-[#FF7426] text-sm lg:text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap"
                        >
                            Success Stories
                        </NavLink>
                        <NavLink 
                            to="/upcoming-batches" 
                            style={navLinkStyle}
                            className="hover:text-[#FF7426] text-sm lg:text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap"
                        >
                            Upcoming Batches
                        </NavLink>
                        <NavLink 
                            to="/Students-Blog" 
                            style={navLinkStyle}
                            className="hover:text-[#FF7426] text-sm lg:text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap"
                        >
                            Student Blog
                        </NavLink>
                        <NavLink 
                            to="/ContactUs" 
                            style={navLinkStyle}
                            className="hover:text-[#FF7426] text-sm lg:text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap"
                        >
                            Contact us
                        </NavLink>
                    </div>
                    <div className="flex space-x-3 ml-6 xl:ml-8 2xl:ml-10">
                    <motion.button 
  onClick={handleEnrollClick}
  whileHover={{ y: -2 }}
  className="bg-[#4D2C5E] text-white px-4 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#3A2150] transition-all shadow-sm hover:shadow-md whitespace-nowrap"
>
  ENROLL NOW
</motion.button>
                        <motion.button 
                            whileHover={{ y: -2 }}
                            className="bg-[#FF7426] text-white px-4 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#E65100] transition-all shadow-sm hover:shadow-md whitespace-nowrap"
                        >
                            SIGN UP
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden flex items-center">
                    <div className='hidden sm:flex gap-3 mr-4'>
                        <button className="bg-[#4D2C5E] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#3A2150] transition-colors whitespace-nowrap">
                            ENROLL
                        </button>
                        <button className="bg-[#FF7426] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#E65100] transition-colors whitespace-nowrap">
                            SIGN UP
                        </button>
                    </div>
                    <button 
                        onClick={toggleDrawer}
                        className="text-gray-600 hover:text-[#FF7426] p-2 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        {/* Overlay with click-to-close */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40 lg:hidden"
                            onClick={toggleDrawer}
                        />

                        {/* Drawer Container - Fixed positioning */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", ease: "easeInOut" }}
                            className="fixed inset-0 w-full h-full z-50 lg:hidden pointer-events-none"
                        >
                            {/* Actual Drawer Content */}
                            <div className="absolute right-0 h-full w-72 sm:w-80 bg-white shadow-2xl flex flex-col pointer-events-auto">
                                {/* Close Button */}
                                <div className="flex justify-end p-4 shrink-0">
                                    <button 
                                        onClick={toggleDrawer}
                                        className="text-gray-600 hover:text-[#FF7426] p-2 focus:outline-none"
                                    >
                                        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Scrollable Content Area */}
                                <div className="flex-1 overflow-y-auto">
                                    <div className="space-y-2 px-4 pb-4">
                                        <NavLink 
                                            to="/courses" 
                                            style={navLinkStyle}
                                            className="block px-4 py-3 text-base font-medium hover:bg-[#FFF5EF] rounded-lg transition-all" 
                                            onClick={toggleDrawer}
                                        >
                                            Courses
                                        </NavLink>
                                        <NavLink 
                                            to="/Success-stories" 
                                            style={navLinkStyle}
                                            className="block px-4 py-3 text-base font-medium hover:bg-[#FFF5EF] rounded-lg transition-all" 
                                            onClick={toggleDrawer}
                                        >
                                            Success Stories
                                        </NavLink>
                                        <NavLink 
                                            to="/upcoming-batches" 
                                            style={navLinkStyle}
                                            className="block px-4 py-3 text-base font-medium hover:bg-[#FFF5EF] rounded-lg transition-all" 
                                            onClick={toggleDrawer}
                                        >
                                            Upcoming Batches
                                        </NavLink>
                                        <NavLink 
                                            to="/Students-Blog" 
                                            style={navLinkStyle}
                                            className="block px-4 py-3 text-base font-medium hover:bg-[#FFF5EF] rounded-lg transition-all" 
                                            onClick={toggleDrawer}
                                        >
                                            Student Blog
                                        </NavLink>
                                        <NavLink 
                                            to="/ContactUs" 
                                            style={navLinkStyle}
                                            className="block px-4 py-3 text-base font-bold hover:bg-[#FFF5EF] rounded-lg transition-all" 
                                            onClick={toggleDrawer}
                                        >
                                            Contact us
                                        </NavLink>
                                    </div>
                                </div>

                                {/* Fixed Bottom Buttons */}
                                <div className="p-4 border-t border-gray-100 shrink-0">
                                    <button className="w-full bg-[#4D2C5E] text-white px-6 py-3 rounded-full text-base font-medium hover:bg-[#3A2150] transition-colors shadow-sm mb-3">
                                        ENROLL NOW
                                    </button>
                                    <button className="w-full bg-[#FF7426] text-white px-6 py-3 rounded-full text-base font-medium hover:bg-[#E65100] transition-colors shadow-sm">
                                        SIGN UP
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Header;