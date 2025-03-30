import React, { useState } from 'react';

const FAQ = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='w-full flex flex-col py-8 sm:py-12 lg:py-16 xl:py-20 2xl:py-24 justify-center items-center relative overflow-hidden bg-white'>
            {/* Background elements */}
            <div className='hidden lg:block w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] absolute bottom-[-150px] left-[-200px] sm:left-[-150px] lg:left-[-100px] blur-lg rounded-full bg-[#FF74261A]'></div>
            
            {/* Title section */}
            <div className='w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-6 sm:mb-8 lg:mb-10 xl:mb-12'>
                <h5 className='font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl mb-2 sm:mb-3 lg:mb-4'>
                    Frequently Asked Questions
                </h5>
                <p className='text-[#FF7426] font-bold text-sm sm:text-base lg:text-lg xl:text-xl'>
                    Most Frequently or Commonly asked Questions and Doubts by Enquiries
                </p>
            </div>

            {/* FAQ content */}
            <div className="w-full max-w-7xl bg-white flex flex-col lg:flex-row items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 xl:py-12">
                {/* Image section */}
                <div className='lg:w-[40%] xl:w-[45%] 2xl:w-[50%] relative overflow-hidden mb-8 lg:mb-0 flex justify-center'>
                    <img 
                        src="/images/FAQLogo.png" 
                        className='w-[280px] sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] 2xl:w-[550px]'
                        alt="FAQ Illustration"
                    />
                </div>

                {/* Questions section */}
                <div className="w-full lg:w-[60%] xl:w-[55%] 2xl:w-[50%] lg:pl-8 xl:pl-12 2xl:pl-16">
                    <div className="space-y-3 sm:space-y-4">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className={`border shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200 ${
                                    openIndex === index 
                                        ? "rounded-lg" 
                                        : "rounded-lg sm:rounded-r-full"
                                }`}
                            >
                                {/* Question */}
                                <div
                                    className="flex justify-between items-center px-4 py-3 sm:py-4 cursor-pointer bg-white hover:bg-gray-50 rounded-lg sm:rounded-r-full transition-colors duration-200"
                                    onClick={() => toggleAnswer(index)}
                                >
                                    <h3 className="text-base sm:text-lg lg:text-xl xl:text-xl font-medium text-gray-800">
                                        {faq.question}
                                    </h3>
                                    <span className="text-gray-600 ml-4">
                                        {openIndex === index ? (
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        )}
                                    </span>
                                </div>
                                
                                {/* Answer */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        openIndex === index ? 'max-h-[500px]' : 'max-h-0'
                                    }`}
                                >
                                    <div className="px-4 py-3 sm:py-4 border-t border-gray-200">
                                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;