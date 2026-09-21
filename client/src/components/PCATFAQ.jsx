import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is the PCAT (Psychology Career Admission Test)?",
      answer: "The PCAT is an online admission test by Upskillab designed to identify passionate and empathetic individuals who want to pursue a psychology career in India."
    },
    {
      question: "Why does India need the PCAT exam?",
      answer: "India faces a shortage of skilled and empathetic psychology professionals. The PCAT ensures that those entering the field are prepared with the right mindset, not just academic knowledge."
    },
    {
      question: "Who should take the PCAT?",
      answer: "Anyone passionate about a psychology career, looking to make a real difference in mental health or guidance counseling, should take the PCAT before enrolling in Upskillab's psychology programs."
    },
    {
      question: "How is the PCAT different from other entrance tests?",
      answer: "The PCAT focuses on evaluating empathy, practical skills, and real-world readiness, in addition to academic ability—making sure candidates are equipped to truly help others."
    },
    {
      question: "What is the format and duration of the PCAT exam?",
      answer: "The PCAT is an online exam lasting 20–30 minutes, featuring both objective and short-answer questions. Results are provided within 24–72 hours."
    },
    {
      question: "How do I register for the PCAT with Upskillab?",
      answer: "Visit the Upskillab PCAT Exam Portal, complete the registration, and receive detailed instructions via email."
    },
    {
      question: "What happens after passing the PCAT?",
      answer: "Qualifying candidates can enroll in Upskillab's professional psychology programs, gaining access to hands-on training, mentorship, and industry-recognized certifications."
    },
    {
      question: "Can I retake the PCAT if I don't pass the first time?",
      answer: "Yes, Upskillab allows candidates to retake the PCAT, encouraging continued growth and preparation for a successful psychology career."
    },
    {
      question: "Why should I choose Upskillab for my psychology journey?",
      answer: "Upskillab offers industry-recognized certifications, real-world case studies, 1:1 mentorship, and a unique focus on empathy and professional transformation—not just theory."
    }
  ];

  // Split FAQ data into two columns for larger screens
  const midIndex = Math.ceil(faqData.length / 2);
  const firstColumn = faqData.slice(0, midIndex);
  const secondColumn = faqData.slice(midIndex);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-purple-50 p-5 sm:p-6 md:p-8 rounded-2xl shadow-sm">
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4D2C5E]">
          Frequently Asked Questions (FAQs)
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about the PCAT exam and Upskillab's psychology programs
        </p>
      </div>
      
      <div className="lg:grid lg:grid-cols-2 lg:gap-6">
        {/* First Column */}
        <div className="space-y-3 sm:space-y-4">
          {firstColumn.map((faq, index) => (
            <FAQItem 
              key={index}
              faq={faq}
              index={index}
              activeIndex={activeIndex}
              toggleFAQ={toggleFAQ}
            />
          ))}
        </div>
        
        {/* Second Column */}
        <div className="space-y-3 sm:space-y-4 mt-4 lg:mt-0">
          {secondColumn.map((faq, index) => (
            <FAQItem 
              key={index + midIndex}
              faq={faq}
              index={index + midIndex}
              activeIndex={activeIndex}
              toggleFAQ={toggleFAQ}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-8 sm:mt-10 text-center">
        <p className="text-sm sm:text-base text-gray-600">
          Still have questions?{' '}
          <a href="#" className="text-[#4D2C5E] font-semibold hover:underline">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};

// Extracted FAQ Item component with smooth animation
const FAQItem = ({ faq, index, activeIndex, toggleFAQ }) => {
  const isActive = activeIndex === index;
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        className="flex justify-between items-center w-full p-4 sm:p-5 text-left focus:outline-none"
        onClick={() => toggleFAQ(index)}
        aria-expanded={isActive}
      >
        <span className="text-sm sm:text-base md:text-lg font-semibold text-[#4D2C5E] pr-4">
          {faq.question}
        </span>
        <span className="flex-shrink-0 ml-2">
          {isActive ? (
            <FiChevronUp className="h-5 w-5 text-[#4D2C5E]" />
          ) : (
            <FiChevronDown className="h-5 w-5 text-[#4D2C5E]" />
          )}
        </span>
      </button>
      
      <div 
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isActive ? '500px' : '0px',
          opacity: isActive ? 1 : 0,
        }}
      >
        <div className="px-4 pb-4 sm:px-5 sm:pb-5">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;