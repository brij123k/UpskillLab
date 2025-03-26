import React, { useState } from 'react';

const FAQ = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='flex flex-col py-10 justify-center items-center relative overflow-hidden'>
            <div className='w-100 h-100 absolute bottom-[-100px] left-[-250px] blur-lg  rounded-full bg-[#FF74261A]'></div>
            <h5 className='font-semibold text-3xl'>Frequently Asked Questions</h5>
            <p className='text-[#FF7426] font-semibold'>Most Frequently or Commonly asked Questions and Doubts by Enquiries</p>

            <div className="bg-white flex flex-col lg:flex-row items-center py-10 px-8 ">

                <div className='lg:w-[40%] relative overflow-hidden'>
                    <img src="/images/FAQLogo.png" className='w-[400px]' />

                </div>
                <div className="max-w-3xl mx-auto lg:px-16">

                    <div className="space-y-2">
                        {faqs.map((faq, index) => (
                            <div key={index} className={`border shadow-lg border-gray-300  ${openIndex === index ? "rounded-lg" : " transition-all duration-300 ease-in-out rounded-r-full"}`}>
                                {/* Question - Styled like the dropdown rectangle */}
                                <div
                                    className="flex justify-between items-center px-4 py-1 cursor-pointer bg-white rounded-full"
                                    onClick={() => toggleAnswer(index)}
                                >
                                    <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                                    <span className="text-gray-600">
                                        {openIndex === index ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        )}
                                    </span>
                                </div>
                                {/* Answer with animation */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-auto' : 'max-h-0'
                                        }`}
                                >
                                    <p className="text-gray-600 px-4 py-3 border-t border-gray-300">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </div>
    );
};

export default FAQ;