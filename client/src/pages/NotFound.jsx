import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="w-full min-h-screen bg-[#fdf8ee] flex items-center justify-center p-4 overflow-hidden relative">
            {/* Floating Orb Background Elements */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full ${i % 2 === 0 ? 'bg-[#4D2C5E]/10' : 'bg-[#FF7426]/10'}`}
                    style={{
                        width: `${Math.random() * 200 + 100}px`,
                        height: `${Math.random() * 200 + 100}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, Math.random() * 100 - 50],
                        x: [0, Math.random() * 100 - 50],
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: Math.random() * 15 + 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
            ))}

            <motion.div 
                className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl flex flex-col items-center text-center relative z-10 border-t-4 border-[#FF7426]"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                }}
            >
                {/* Animated 404 Number */}
                <motion.div 
                    className="relative mb-8"
                >
                    <motion.div
                        className="text-[7rem] font-black leading-none text-[#4D2C5E] relative"
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            repeatDelay: 2
                        }}
                    >
                        404
                    </motion.div>
                    <motion.div 
                        className="absolute -bottom-4 left-0 w-full h-2 bg-[#FF7426] rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            type: "spring"
                        }}
                    />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h1 className="text-3xl font-bold mb-3 text-[#4D2C5E]">
                        Page Not Found
                    </h1>
                    <p className="text-gray-600 mb-8">
                        The page you're looking for doesn't exist or has been moved.
                    </p>

                    {/* Animated Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <NavLink to="/">
                            <motion.button
                                className="px-6 py-3 rounded-lg font-medium relative overflow-hidden group"
                                style={{
                                    backgroundColor: '#4D2C5E',
                                    color: 'white'
                                }}
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: '0 4px 12px rgba(77, 44, 94, 0.3)'
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10 flex items-center cursor-pointer">
                                    <svg 
                                        className="w-5 h-5 mr-2" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Return Home
                                </span>
                                <motion.span
                                    className="absolute inset-0 bg-[#FF7426] opacity-0 group-hover:opacity-100"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>
                        </NavLink>
                    </motion.div>
                </motion.div>

                {/* Decorative Corner Elements */}
                <motion.div 
                    className="absolute bottom-0 rounded-bl-lg left-0 w-8 h-8 border-b-2 border-l-2 border-[#4D2C5E]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                />
                <motion.div 
                    className="absolute bottom-0 rounded-br-lg right-0 w-8 h-8 border-b-2 border-r-2 border-[#4D2C5E]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                />
            </motion.div>

            {/* Floating small dots */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full ${i % 2 === 0 ? 'bg-[#4D2C5E]' : 'bg-[#FF7426]'}`}
                    style={{
                        width: '8px',
                        height: '8px',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, Math.random() * 100 - 50],
                        x: [0, Math.random() * 100 - 50],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

export default NotFoundPage;