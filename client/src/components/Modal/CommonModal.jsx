// components/Modal.jsx (unchanged from the Framer Motion version)
import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, children, title = "Modal" }) => {
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-transpatent bg-opacity-50 backdrop-blur-sm"
                        onClick={onClose}
                    ></motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 w-full max-w-md mx-auto bg-white rounded-lg shadow-xl"
                    >
                        <div className="flex items-center justify-between p-4 ">
                            <h2 className="text-lg font-semibold text-gray-900"></h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4 max-h-[70vh] overflow-y-auto MentorshipModal">
                            {children}
                        </div>

                        <div className="flex justify-end p-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default Modal