import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const formatAnswerHTML = (htmlString) => {
        // Parse the HTML string into a document
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        
        // Apply styles to all h2 elements
        const h2Elements = doc.querySelectorAll('h2');
        h2Elements.forEach(h2 => {
          h2.style.fontSize = '1.5rem';
          h2.style.fontWeight = 'bold';
          h2.style.margin = '1rem 0 0.5rem 0';
          h2.style.color = '#4D2C5E';
        });
        
        // Apply styles to all p elements
        const pElements = doc.querySelectorAll('p');
        pElements.forEach(p => {
          p.style.fontSize = '1rem';
          p.style.lineHeight = '1.6';
          p.style.marginBottom = '1rem';
          p.style.color = '#4D2C5E';
        });
        
        // Return the modified HTML
        return doc.body.innerHTML;
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
            transition: { 
                duration: 0.6, 
                ease: [0.25, 0.1, 0.25, 1],
                type: "spring",
                stiffness: 100
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, x: -50, rotate: -5 },
        visible: {
            opacity: 1,
            x: 0,
            rotate: 0,
            transition: { 
                duration: 0.8, 
                ease: "easeOut",
                type: "spring",
                damping: 10
            }
        },
        hover: {
            rotate: [0, 2, -2, 0],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    };

    const answerVariants = {
        hidden: { 
            opacity: 0, 
            height: 0,
            paddingTop: 0,
            paddingBottom: 0
        },
        visible: { 
            opacity: 1, 
            height: "auto",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            transition: { 
                duration: 0.4,
                ease: "easeInOut"
            }
        },
        exit: { 
            opacity: 0, 
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            transition: { 
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    const floatingOrbs = {
        hidden: { opacity: 0 },
        visible: {
            opacity: [0, 0.3, 0.1, 0.3],
            transition: {
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    };

    return (
        <motion.section 
            className="relative overflow-hidden bg-gradient-to-b from-[#F9F5FF] to-[#FFF5F0] py-5 px-4 sm:px-6 lg:py-10 lg:px-8"
            id='faq'
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Floating decorative elements */}
            <motion.div 
                className="hidden lg:block absolute top-1/4 left-10 w-32 h-32 rounded-full bg-[#FF7426] blur-xl"
                variants={floatingOrbs}
            />
            <motion.div 
                className="hidden lg:block absolute bottom-1/4 right-20 w-40 h-40 rounded-full bg-[#4D2C5E] blur-xl"
                variants={floatingOrbs}
                transition={{ delay: 0.5 }}
            />
            <motion.div 
                className="hidden lg:block absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-[#FF7426] blur-xl"
                variants={floatingOrbs}
                transition={{ delay: 0.8 }}
            />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    className="text-center mb-16"
                    variants={itemVariants}
                >
                    <motion.h2 
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4D2C5E] mb-4"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.8,
                            type: "spring",
                            stiffness: 100
                        }}
                    >
                        Frequently Asked <span className="text-[#FF7426]">Questions</span>
                    </motion.h2>
                    <motion.p 
                        className="text-lg text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Find answers to common questions about our programs and admission process
                    </motion.p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* FAQ Items */}
                    <motion.div 
                        className="w-full lg:w-1/2 space-y-4"
                        variants={containerVariants}
                    >
                        {faqs.map((faq, index) => (
                            <motion.div 
                                key={index}
                                className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
                                    openIndex === index ? 'ring-2 ring-[#FF7426]' : ''
                                }`}
                                variants={itemVariants}
                                whileHover={{ 
                                    y: -3,
                                    boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)"
                                }}
                                layout
                            >
                                <motion.button
                                    className="flex w-full items-center justify-between p-6 text-left"
                                    onClick={() => toggleAnswer(index)}
                                    whileTap={{ scale: 0.98 }}
                                    layout
                                >
                                    <motion.h3 
                                        className="text-lg font-semibold text-[#4D2C5E]"
                                        layout
                                    >
                                        {faq.question}
                                    </motion.h3>
                                    <motion.div
                                        className="ml-4 h-6 w-6 rounded-full bg-[#FF7426] p-1 text-white"
                                        animate={{ 
                                            rotate: openIndex === index ? 180 : 0,
                                            backgroundColor: openIndex === index ? "#4D2C5E" : "#FF7426"
                                        }}
                                        transition={{ duration: 0.3 }}
                                        layout
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-4 w-4" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M19 9l-7 7-7-7" 
                                            />
                                        </svg>
                                    </motion.div>
                                </motion.button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            className="overflow-hidden"
                                            variants={answerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            layout
                                        >
                                        <div className="px-6 pb-6 pt-0">
  <div
  className=""
  dangerouslySetInnerHTML={{ __html: formatAnswerHTML(faq.answer) }}
/>
</div>


                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Image Section */}
                    <motion.div 
                        className="hidden lg:flex lg:w-1/2 items-center justify-center"
                        variants={imageVariants}
                    >
                        <motion.div 
                            className="relative"
                            whileHover="hover"
                        >
                            <div className="absolute -inset-8 rounded-3xl opacity-20  blur-xl"></div>
                            <motion.div 
                                className="relative overflow-hidden rounded-2xl shadow-2xl"
                                whileHover={{ scale: 1.02 }}
                            >
                                <img
                                    src="/images/7720441.png"
                                    alt="FAQ Illustration"
                                    className="h-auto w-full max-w-md object-cover"
                                />
                                {/* <motion.div 
                                    className="absolute inset-0 bg-gradient-to-t from-[#4D2C5E] to-transparent opacity-30"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.3 }}
                                    transition={{ delay: 1 }}
                                /> */}
                            </motion.div>
                            
                            {/* Floating elements */}
                            <motion.div
                                className="absolute -bottom-8 -left-8 h-16 w-16 rounded-full bg-[#FF7426]"
                                animate={{
                                    y: [0, -15, 0],
                                    opacity: [0.6, 0.8, 0.6]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div
                                className="absolute -top-8 -right-8 h-20 w-20 rounded-full bg-[#4D2C5E]"
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.4, 0.7, 0.4]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </div>

                
            </div>
        </motion.section>
    );
};

export default FAQ;