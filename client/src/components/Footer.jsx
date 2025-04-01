import React from 'react';
import { NavLink } from 'react-router-dom';
function Footer() {
    return (
        <footer className="bg-[#FDF8EE] text-[#606060] w-full py-8 sm:py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
                    {/* Logo and Description */}
                    <div className="lg:w-[30%] xl:w-[25%] 2xl:w-[20%]">
                        <img 
                            src='images/Logo.png' 
                            alt="Company Logo"
                            className="w-40 sm:w-48 md:w-52 lg:w-56 xl:w-60"
                        />
                        <p className="text-[#606060] text-sm sm:text-base mt-4 sm:mt-6 mb-6 sm:mb-8 lg:mb-0">
                            Lorem ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem ipsum has been the industry's standard dummy a type specimen book.
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full">
                        {/* Company Column 1 */}
                        <div>
                            <h3 className="text-[#00052E] text-lg sm:text-xl md:text-xl font-semibold mb-3 sm:mb-4">Company</h3>
                            <ul className="space-y-2 sm:space-y-3">
                                <li><NavLink to="#" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors">How to work?</NavLink></li>
                                <li><NavLink to="#" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors">Popular Course</NavLink></li>
                                <li><NavLink to="#" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors">Service</NavLink></li>
                            </ul>
                        </div>

                        {/* Company Column 2 */}
                        <div>
                            <h3 className="text-[#00052E] text-lg sm:text-xl md:text-xl font-semibold mb-3 sm:mb-4">Resources</h3>
                            <ul className="space-y-2 sm:space-y-3">
                                <li><NavLink to="#" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors">How to work?</NavLink></li>
                                <li><NavLink to="#" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors">Popular Course</NavLink></li>
                                <li><NavLink to="#" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors">Service</NavLink></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="text-[#00052E] text-lg sm:text-xl md:text-xl font-semibold mb-3 sm:mb-4">Support</h3>
                            <ul className="space-y-2 sm:space-y-3">
                                <li><NavLink to="#" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors">FAQ</NavLink></li>
                                <li><NavLink to="#" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors">Help Center</NavLink></li>
                                <li><NavLink to="#" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors">Career</NavLink></li>
                                <li><NavLink to="#" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors">Privacy</NavLink></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-[#00052E] text-lg sm:text-xl md:text-xl font-semibold mb-3 sm:mb-4">Contact</h3>
                            <ul className="space-y-2 sm:space-y-3">
                                <li><NavLink to="tel:+09137053875" className="text-[#606060] hover:text-[#FF7426] text-sm sm:text-base transition-colors">+0913-705-3875</NavLink></li>
                                <li className="text-[#606060] text-sm sm:text-base">4808 Skinner Hollow Road<br />Days Creek, OR 97429</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Copyright/Bottom Section */}
                <div className="border-t border-[#FFEED9] mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 text-center text-xs sm:text-sm">
                    <p className=' text-[#FF7426]'>Privacy Policy | Terms & Condition</p>
                    <p>© {new Date().getFullYear()} Upskillab.com All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;