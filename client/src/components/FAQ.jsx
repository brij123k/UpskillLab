import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        exit: { opacity: 0, y: -20 }
    };

    const imageVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <motion.div 
            className='w-full flex flex-col py-8 sm:py-12 lg:py-16 xl:py-20 2xl:py-24 justify-center items-center relative overflow-hidden bg-white'
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Background elements */}
            <motion.div 
                className='hidden lg:block w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] absolute bottom-[-150px] left-[-200px] sm:left-[-150px] lg:left-[-100px] blur-lg rounded-full bg-[#FF74261A]'
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            {/* Title section */}
            <motion.div 
                className='w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-6 sm:mb-8 lg:mb-10 xl:mb-12'
                variants={itemVariants}
            >
                <h5 className='font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl mb-2 sm:mb-3 lg:mb-4'>
                    Frequently Asked Questions
                </h5>
                <p className='text-[#FF7426] font-bold text-sm sm:text-base lg:text-lg xl:text-xl'>
                    Most Frequently or Commonly asked Questions and Doubts by Enquiries
                </p>
            </motion.div>

            {/* FAQ content */}
            <div className="w-full max-w-7xl bg-white flex flex-col lg:flex-row items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 xl:py-12">
                {/* Image section */}
                <motion.div 
                    className='lg:w-[40%] xl:w-[45%] 2xl:w-[50%] relative overflow-hidden mb-8 lg:mb-0 flex justify-center'
                    variants={imageVariants}
                >
                    <motion.img 
                        src="/images/FAQLogo.png" 
                        className='w-[280px] sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] 2xl:w-[550px]'
                        alt="FAQ Illustration"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    />
                </motion.div>

                {/* Questions section */}
                <motion.div 
                    className="w-full lg:w-[60%] xl:w-[55%] 2xl:w-[50%] lg:pl-8 xl:pl-12 2xl:pl-16"
                    variants={containerVariants}
                >
                    <div className="space-y-3 sm:space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div 
                                key={index} 
                                className={`border shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200 ${
                                    openIndex === index 
                                        ? "rounded-lg" 
                                        : "rounded-lg sm:rounded-r-full"
                                }`}
                                variants={itemVariants}
                                whileHover={{ scale: 1.01 }}
                            >
                                {/* Question */}
                                <motion.div
                                    className="flex justify-between items-center px-4 py-3 sm:py-4 cursor-pointer bg-white hover:bg-gray-50 rounded-lg sm:rounded-r-full transition-colors duration-200"
                                    onClick={() => toggleAnswer(index)}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <h3 className="text-base sm:text-lg lg:text-xl xl:text-xl font-medium text-gray-800">
                                        {faq.question}
                                    </h3>
                                    <motion.span 
                                        className="text-gray-600 ml-4"
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </motion.span>
                                </motion.div>
                                
                                {/* Answer */}
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            className="overflow-hidden"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ 
                                                opacity: 1, 
                                                height: "auto",
                                                transition: { duration: 0.3 }
                                            }}
                                            exit={{ 
                                                opacity: 0, 
                                                height: 0,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <div className="px-4 py-3 sm:py-4 border-t border-gray-200">
                                                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default FAQ;