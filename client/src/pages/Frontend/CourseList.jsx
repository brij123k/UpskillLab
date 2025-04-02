import React,{useState} from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import TrainingBanner from '../../components//banners/TrainingBanner';
import FeedbaackBanner from '../../components/banners/FeedbackBanner';
// Animation variants
const bannerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.5
    }
  }
};

const imageVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.8
    }
  }
};

const CourseList = () => {
  // Sample course data
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const allCourses = [
    {
      id: 1,
      name: "Full Stack Development",
      duration: "6 months",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      level: "Advanced",
      bestseller: true,
      students: 1250,
      category: "Web Development",
      rating: 4.8
    },
    // Add other courses...
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Animated Banner */}
      <motion.div 
  initial="hidden"
  animate="visible"
  variants={bannerVariants}
  className="w-full bg-gradient-to-br from-[#4D2C5E] to-[#7B4B9E] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
>
  {/* Floating decorative elements */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10">
    <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-[#FF7426] mix-blend-multiply"></div>
    <div className="absolute bottom-10 right-32 w-32 h-32 rounded-full bg-[#FF7426] mix-blend-multiply"></div>
  </div>

  <div className="max-w-8xl mx-auto relative z-10">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
      {/* Text Content */}
      <motion.div 
        variants={itemVariants}
        className="lg:w-1/2 space-y-8 text-white"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-5xl font-bold leading-tight sm:text-6xl"
        >
          <span className="block mb-3">Unlock Your</span>
          <span className="block text-[#FF7426] drop-shadow-[0_4px_8px_rgba(77,44,94,0.3)]">
            Tech Potential
          </span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl max-w-2xl text-white/90"
        >
          Join thousands who've transformed their careers with our cutting-edge programs
        </motion.p>
        
        <motion.div className="flex flex-col sm:flex-row gap-4">
        <a href="#Courses">
          <motion.button
            variants={itemVariants}
            className="bg-[#FF7426] hover:bg-[#E65100] text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg"
          >
            Browse Courses
          </motion.button>
          </a>
          <NavLink to="/ContactUs">
          <motion.button
            variants={itemVariants}
            className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full transition-colors border border-white/20"
          >
            Speak to Advisor
          </motion.button>
          </NavLink>
        </motion.div>
      </motion.div>
      
      {/* Image with Animation */}
      <motion.div 
        variants={imageVariants}
        className="lg:w-1/2 flex justify-center relative"
      >
        <div className="relative w-full max-w-lg">
          <div className="absolute -top-5 -left-5 w-full h-full rounded-2xl bg-[#FF7426]/20 z-0"></div>
          <motion.img 
            whileHover={{ scale: 1.03 }}
            src="https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Students collaborating"
            className="relative rounded-xl w-full h-auto object-cover shadow-2xl z-10 border-4 border-white"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute -bottom-5 -right-5 bg-white text-[#4D2C5E] px-5 py-2 rounded-lg shadow-lg font-bold z-30 border-2 border-[#FF7426]"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1 text-[#FF7426]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">94% Success Rate</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
</motion.div>

      {/* Courses Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id='Courses'>
        {/* Categories Filter */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="mb-12"
>
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
    <h2 className="text-3xl font-bold text-[#4D2C5E]">Explore Our Courses</h2>
    
    {/* Filter Dropdown */}
    <div className="relative">
      <button 
        className="flex items-center gap-2 px-4 py-2 bg-white text-[#4D2C5E] border border-[#4D2C5E]/20 rounded-full font-medium hover:bg-[#4D2C5E]/10 transition-colors"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <span>Filters</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Filter Dropdown Menu */}
      {isFilterOpen && (
        <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          fixed sm:absolute inset-x-0 mx-4 sm:mx-0 sm:left-1/2 sm:-translate-x-1/2
          top-20 sm:top-auto sm:mt-2 w-[calc(100vw-2rem)] sm:w-80 md:w-96 lg:w-[28rem]
          bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4
          max-h-[75vh] overflow-y-auto
        `}
      >
        {/* Close Button */}
        <button 
          onClick={onClose} // Pass this handler from parent
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      
        <div className="space-y-4 pr-2">
          {/* Instructor Filter */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-[#4D2C5E] text-base sm:text-lg">Instructor</h3>
              <span className="text-xs text-gray-500">(Select multiple)</span>
            </div>
            <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2 space-y-2">
              {instructors.map(instructor => (
                <label key={instructor.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="
                        appearance-none h-5 w-5 rounded border-2 border-gray-300
                        checked:bg-[#4D2C5E] checked:border-[#4D2C5E]
                        focus:ring-2 focus:ring-[#FF7426] focus:ring-offset-2
                        transition-colors duration-200 cursor-pointer
                      "
                      checked={selectedInstructors.includes(instructor.id)}
                      onChange={() => toggleInstructor(instructor.id)}
                    />
                    <svg 
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-white pointer-events-none"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      style={{ display: selectedInstructors.includes(instructor.id) ? 'block' : 'none' }}
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-800 flex-1 truncate">
                    {instructor.name} ({instructor.specialty})
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Language Filter */}
          <div>
            <h3 className="font-medium text-[#4D2C5E] text-base sm:text-lg mb-2">Language</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {languages.map(lang => (
                <label key={lang} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="
                        appearance-none h-5 w-5 rounded border-2 border-gray-300
                        checked:bg-[#4D2C5E] checked:border-[#4D2C5E]
                        focus:ring-2 focus:ring-[#FF7426] focus:ring-offset-2
                        transition-colors duration-200 cursor-pointer
                      "
                    />
                    <svg 
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-white pointer-events-none"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      style={{ display: 'none' }} /* Controlled by checked state */
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-800">{lang}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button className="
              flex-1 px-4 py-2.5 bg-[#FF7426] text-white 
              rounded-md hover:bg-[#E65100] transition-colors 
              flex items-center justify-center gap-2
              text-sm sm:text-base font-medium shadow-md
            ">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Apply Filters
            </button>
            <button className="
              flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 
              rounded-md hover:bg-gray-200 transition-colors
              flex items-center justify-center gap-2
              text-sm sm:text-base font-medium
            ">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
        </div>
      </motion.div>
      )}
    </div>
  </div>

  {/* Categories */}
  <div className="flex flex-wrap gap-4">
    <button className="px-6 py-2 bg-[#FF7426] text-white rounded-full font-medium shadow-md hover:bg-[#E65100] transition-colors">
      All Courses
    </button>
    {['Web Development', 'Data Science', 'Mobile Development', 'Cloud Computing'].map((category) => (
      <button 
        key={category}
        className="px-6 py-2 bg-white text-[#4D2C5E] border border-[#4D2C5E]/20 rounded-full font-medium hover:bg-[#4D2C5E]/10 transition-colors"
      >
        {category}
      </button>
    ))}
  </div>
</motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCourses.map((course) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.name}
                  className="w-full h-48 object-cover"
                />
                {course.bestseller && (
                  <div className="absolute top-4 left-4 bg-[#4D2C5E] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Bestseller
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-white/90 text-[#FF7426] text-xs font-bold px-2 py-1 rounded">
                  {course.duration}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    course.level === 'Beginner' ? 'bg-blue-100 text-blue-800' :
                    course.level === 'Intermediate' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {course.level}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <span className="text-sm font-bold mr-1">{course.rating}</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{course.name}</h3>
                <p className="text-gray-600 mb-4">{course.category}</p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {course.students.toLocaleString()}+ students
                  </div>
                  
                  <NavLink
                    to={`/courses/${course.id}`}
                    className="text-[#FF7426] font-medium hover:underline flex items-center"
                  >
                    View Details
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </NavLink>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
        <TrainingBanner/>
        <FeedbaackBanner/>
      
    </div>
  );
};

export default CourseList;