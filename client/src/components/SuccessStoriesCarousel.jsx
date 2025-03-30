import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessStoriesCarousel = () => {
  // Sample student success stories data
  const successStories = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Senior Software Engineer",
      company: "Microsoft",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      story: "After completing the Full Stack Development program, I transitioned from a support role to a ₹22 LPA engineering position at Microsoft within 6 months. The hands-on projects and career coaching were game-changers for me.",
      salaryIncrease: "300%",
      duration: "6 months",
      skills: ["React", "Node.js", "AWS"],
      before: "IT Support Engineer",
      after: "Senior Software Engineer"
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Data Scientist",
      company: "Amazon",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      story: "The Data Science bootcamp gave me the practical skills I needed. I went from analyst to Data Scientist with a 200% salary hike in just 4 months! The real-world datasets we worked with prepared me perfectly for interviews.",
      salaryIncrease: "200%",
      duration: "4 months",
      skills: ["Python", "Machine Learning", "SQL"],
      before: "Business Analyst",
      after: "Data Scientist II"
    },
    {
      id: 3,
      name: "Arjun Singh",
      role: "Product Manager",
      company: "Google",
      photo: "https://randomuser.me/api/portraits/men/67.jpg",
      story: "The Product Management certification helped me systemize my approach. I now lead a team of 10 PMs at Google after switching from marketing. The capstone project became a key talking point in my interviews.",
      salaryIncrease: "180%",
      duration: "8 months",
      skills: ["Agile", "UX", "Roadmapping"],
      before: "Marketing Manager",
      after: "Product Lead"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-rotate stories every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => 
        prevIndex === successStories.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    return () => clearInterval(interval);
  }, [successStories.length]);

  const student = successStories[currentIndex];

  return (
    <section className="py-8 sm:py-12 2xl:py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF9F5]">
  <div className="max-w-5xl 2xl:max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-6 sm:mb-10 2xl:mb-12"
    >
      <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#4d2c5e]">
        Transformative <span className="text-[#FF7426]">Success Stories</span>
      </h2>
      <p className="mt-2 sm:mt-3 2xl:mt-4 text-sm sm:text-base 2xl:text-lg text-gray-600 max-w-3xl 2xl:max-w-4xl mx-auto">
        See how our students transformed their careers
      </p>
    </motion.div>

    <div className="relative">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="bg-white rounded-xl sm:rounded-2xl 2xl:rounded-3xl shadow-md sm:shadow-xl 2xl:shadow-2xl overflow-hidden border border-[#FFD9C5] flex flex-col sm:flex-row">
            {/* Student Photo Section */}
            <div className="w-full sm:w-2/5 bg-gradient-to-br from-[#FFF0E5] to-[#FFE5D5] p-4 sm:p-6 2xl:p-8 flex flex-col items-center justify-center">
              <div className="relative mb-4 sm:mb-6 2xl:mb-8">
                <div className="absolute -inset-1 sm:-inset-2 2xl:-inset-3 rounded-full bg-gradient-to-r from-[#FF9142] to-[#FF7426] opacity-75 blur"></div>
                <img 
                  src={student.photo} 
                  alt={student.name} 
                  className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 2xl:w-40 2xl:h-40 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>
              <h3 className="text-lg sm:text-xl 2xl:text-2xl font-bold text-[#4d2c5e] text-center">{student.name}</h3>
              <p className="text-[#FF7426] font-medium text-sm sm:text-base 2xl:text-lg">{student.role}</p>
              <p className="text-gray-600 mb-2 sm:mb-3 2xl:mb-4 text-xs sm:text-sm 2xl:text-base">at {student.company}</p>
              
              <div className="mt-3 sm:mt-4 2xl:mt-6 w-full max-w-[200px] 2xl:max-w-[250px]">
                <div className="flex justify-between text-xs 2xl:text-sm mb-1">
                  <span className="text-gray-500">Before:</span>
                  <span className="font-medium">{student.before}</span>
                </div>
                <div className="flex justify-between text-xs 2xl:text-sm">
                  <span className="text-gray-500">After:</span>
                  <span className="font-medium text-[#FF7426]">{student.after}</span>
                </div>
              </div>
            </div>
            
            {/* Story Content Section */}
            <div className="w-full sm:w-3/5 p-4 sm:p-6 2xl:p-8 flex flex-col">
              <div className="mb-3 sm:mb-4 2xl:mb-6">
                <div className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-bold text-[#FF7426]">
                  {student.salaryIncrease}
                </div>
                <p className="text-gray-600 text-xs sm:text-sm 2xl:text-base">Salary increase in {student.duration}</p>
              </div>
              
              <div className="relative mb-3 sm:mb-4 2xl:mb-6 flex-grow">
                <div className="absolute -left-3 2xl:-left-4 top-0 h-full w-1 bg-[#FFB38A] rounded-full"></div>
                <blockquote className="pl-4 2xl:pl-6 text-gray-700 italic text-sm sm:text-base 2xl:text-lg overflow-y-auto max-h-[120px] sm:max-h-[150px] 2xl:max-h-[180px]">
                  "{student.story}"
                </blockquote>
              </div>
              
              <div className="mb-3 sm:mb-4 2xl:mb-6">
                <h4 className="text-xs 2xl:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1 2xl:mb-2">
                  Skills Gained
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-2 2xl:gap-3">
                  {student.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="inline-block px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full text-xs 2xl:text-sm font-medium bg-[#FFE5D5] text-[#D4560E]"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              {/* Progress indicators */}
              <div className="flex justify-center space-x-2 2xl:space-x-3">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 2xl:w-3 2xl:h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-[#FF7426] w-4 2xl:w-6' : 'bg-gray-300'}`}
                    aria-label={`Go to story ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
</section>
  );
};

export default SuccessStoriesCarousel;

