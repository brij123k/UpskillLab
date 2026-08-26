import React from "react";
import { motion } from 'framer-motion';
import { NavLink } from "react-router-dom";

const FeedbackBanner = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] py-8 px-6 sm:px-8 md:py-10 md:px-12">
            {/* Animated background elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#FF7426] mix-blend-multiply blur-xl"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 2 }}
                className="absolute -left-5 bottom-5 w-32 h-32 rounded-full bg-[#FF9142] mix-blend-multiply blur-xl"
            />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Text Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center md:text-left"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            Get In <span className="text-[#FF7426] drop-shadow-[0_2px_4px_rgba(77,44,94,0.3)]">Touch</span>
                        </h2>
                        <p className="text-white/90 text-sm sm:text-base">
                            For Queries, Feedback or Assistance
                        </p>
                    </motion.div>

                    {/* Contact Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <NavLink to="/ContactUs">
                            <motion.button 
                                whileHover={{ scale: 1.05, backgroundColor: "#E65100" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-[#FF7426] text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
                            >
                                Contact Us
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </motion.button>
                        </NavLink>
                    </motion.div>
                </div>

                {/* Decorative chat icon */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -bottom-4 -right-4 bg-white/20 backdrop-blur-sm rounded-full p-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </motion.div>
            </div>
        </div>
    )
}

export default FeedbackBanner;