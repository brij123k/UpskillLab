import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, children, title = "Modal", disableOutsideClick = true }) => {
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                    {/* Backdrop - Removed onClick handler to prevent closing */}
                    <motion.div
                        initial={{ backdropFilter: 'blur(0px)' }}
                        animate={{ backdropFilter: 'blur(4px)' }}
                        exit={{ backdropFilter: 'blur(0px)' }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm"
                    />

                    {/* Modal container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ 
                            type: "spring",
                            damping: 20,
                            stiffness: 300,
                            duration: 0.3
                        }}
                        className="relative z-10 w-full max-w-lg mx-auto"
                    >
                        {/* Modal content */}
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                            {/* Gradient header */}
                            <div className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] p-5">
                                <div className="flex items-center justify-between">
                                    <motion.h2 
                                        className="text-xl font-bold text-white"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {title}
                                    </motion.h2>
                                    <motion.button
                                        onClick={onClose}
                                        className="text-white hover:text-[#FF7426] transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </div>

                            {/* Scrollable content with custom scrollbar */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="max-h-[70vh] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#4D2C5E] scrollbar-track-[#F3F4F6] scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                            >
                                {children}
                            </motion.div>

                            {/* Footer with action buttons */}
                            <motion.div 
                                className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <button
                                    onClick={onClose}
                                    className="px-5 py-2 text-sm font-medium text-[#4D2C5E] border border-[#4D2C5E] rounded-md hover:bg-[#4D2C5E] hover:text-white transition-colors"
                                >
                                    Close
                                </button>
                            </motion.div>
                        </div>

                        {/* Decorative elements */}
                        <motion.div 
                            className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#FF7426]"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default Modal;