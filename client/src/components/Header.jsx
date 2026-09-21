import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AdmissionFormModal from "./Modal/BasicEnrollNowModal";
import { useQuery } from "@tanstack/react-query";
// import { categoryAPI, courseAPI } from "../config/api-repository";
import { getDataHandler } from "../config/services";
import { useAuth } from "../context/AuthContext";
import ExitIntentModalData from "./CustomInputs/ExitIntentModalData";
import Chatbot from "./Chatbot";


function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated, logout, getUserRole } = useAuth();
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [announcements, setAnnouncements] = useState([])
const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);

  const [showExitIntent, setShowExitIntent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ y: 0 });
  const [exitIntentTriggered, setExitIntentTriggered] = useState(false);

const handleCategoryClick = (category) => {
  console.log(category)
  navigate(`/CourseList/`, { state: { category } });
};
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Show exit intent when mouse moves toward top of screen
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 50 && !exitIntentTriggered) {
        triggerExitIntent();
      }
    };

    window.addEventListener('mouseout', handleMouseLeave);
    return () => window.removeEventListener('mouseout', handleMouseLeave);
  }, [exitIntentTriggered]);

  // Random timer for exit intent
  useEffect(() => {
    if (exitIntentTriggered) return;

    // Random time between 4-10 seconds
    const minTime = 4000; // 4 seconds minimum
    const maxTime = 10000; // 10 seconds maximum
    const randomTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;

    const timer = setTimeout(() => {
      triggerExitIntent();
    }, randomTime);

    return () => clearTimeout(timer);
  }, [exitIntentTriggered]);

  const triggerExitIntent = async () => {
    // Only trigger once per page view
    if (exitIntentTriggered) return;
try {
      const res = await fetch('https://api.upskillab.com/api/marketing-prompt');
      const data = await res.json();
      if(data.length>0){
      setShowExitIntent(true);
      setExitIntentTriggered(true);
      }else{
        setShowExitIntent(false);
        setExitIntentTriggered(false);
      }
      } catch (error) {
        console.error(error)
      } 
    // setShowExitIntent(true);
    // setExitIntentTriggered(true);

    // Close automatically after 15 seconds if not closed by user
    setTimeout(() => {
      setShowExitIntent(false);
    }, 60000);
  };

  const handleCloseExitIntent = () => {
    setShowExitIntent(false);
  };


  // Fetch categories using React Query
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const categories = await getDataHandler("category", {
        featured: true,
      });



      const allCourses = await getDataHandler("courseDisplay", null, {
        categoryIds: categories.data.map(({ _id }) => _id),
      });

      return { categories, allCourses };
    },
    select: ({ categories, allCourses }) => {
      return categories.data.map((category) => ({
        id: category._id,
        name: category.categoryName,
        code: category.categoryCode,
        image: category.categoryImage,
        description: category.categoryDescription,
        courses: allCourses.data
          .filter((course) => course.category._id === category._id && course.active)
          .map((course) => ({
            id: course._id,
            courseCode: course.courseCode,
            name: course.courseName,
            image: course.courseImage,

          })),
      }));
    },
    throwOnError: true,
  });

  const courseCategories = categoriesData || [];

  const { data: featuredCoursesData } = useQuery({
    queryKey: ["featuredCourses"],
    queryFn: async () => {
      const courses = await getDataHandler("courseDisplay", null, {
        limit: 4,
        featured: true,
      });
      return courses.data;
    },
    select: (data) => {
      return data
        .filter((course) => course.featured === true && course.active)
        .map((course) => ({
          id: course._id,
          title: course.courseName,
          imageUrl: course.courseImage,
          duration: course.courseDuration,
          courseCode: course.courseCode,
          category: course.category.categoryName

        }));
    },
  });

  const AllCourses = featuredCoursesData || [];
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    if (typeof document !== "undefined") {
      document.body.style.overflow = isDrawerOpen ? "auto" : "hidden";
    }
  };

  const toggleCoursesDropdown = () => {
    setIsCoursesDropdownOpen(!isCoursesDropdownOpen);
    if (!isCoursesDropdownOpen) {
      setSelectedCategory(null);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#FF7426" : "#374151",
    fontWeight: isActive ? "600" : "400",
  });

  useEffect(() => {
    const announcementsHandler = async () => {
      try {
        const response = await getDataHandler('getAnnouncements')

        const messages = response
          .filter(item => item.isActive)
          .map(item => item.message);
        setAnnouncements(messages);
      } catch (err) {
        console.error(err)
      }
    }
    announcementsHandler()
  }, [])

  return (

    <header className="bg-white shadow-sm sticky top-0 z-50">

      {/* News Ticker - Add this */}
      <div className="bg-[#4D2C5E] text-white py-2 px-4 overflow-hidden">

        <div className="max-w-8xl mx-auto relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#4D2C5E] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#4D2C5E] to-transparent z-10"></div>

          <div className="flex items-center">
            <span className="font-bold mr-4 whitespace-nowrap text-sm sm:text-base">
              LATEST:
            </span>
            <div className="overflow-hidden flex-1">
              <motion.div
                className="flex whitespace-nowrap"
                animate={{
                  x: ["0%", "-100%"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {announcements.map((item, index) => (
                  <span key={index} className="text-sm sm:text-base mr-16">
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/">
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <img
              src="/images/Logo.png"
              alt="Upskillab Logo"
              className="h-8 sm:h-10 lg:h-12 2xl:h-14 transition-all duration-200"
            />
          </motion.div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <div className="flex items-center space-x-6 xl:space-x-8 2xl:space-x-10">
            {/* Courses Dropdown */}
           <div className="relative">
      <a
        onClick={toggleCoursesDropdown}
        className="hover:text-[#FF7426] text-sm lg:text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap flex items-center cursor-pointer"
        style={
          pathname === "/courses"
            ? { color: "#FF7426", fontWeight: "600" }
            : {}
        }
      >
        Courses
        <svg
          className={`ml-1 h-4 w-4 transition-transform ${
            isCoursesDropdownOpen ? "rotate-180" : ""
          }`}
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
      </a>

      <AnimatePresence>
        {isCoursesDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute -left-1/2 mt-2 w-screen max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:w-[900px] xl:w-[1000px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
            onMouseLeave={() => {
              if (typeof window !== "undefined" && window.innerWidth >= 1024) {
                setIsCoursesDropdownOpen(false);
              }
            }}
          >
            {/* Close button for mobile */}
            <button
              onClick={() => setIsCoursesDropdownOpen(false)}
              className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-[#FF7426] p-1 z-10 bg-white rounded-full shadow-sm"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="max-h-[80vh] lg:max-h-[70vh] overflow-auto p-6">
              {/* Group categories by their parent/main category */}
              {(() => {
                // Group categories by parent category
                const groupedCategories = {};
                
                courseCategories
                  .filter((category) => category.courses.length !== 0)
                  .forEach((category) => {
                    const parentCategory = category.parentCategory || 
                      category.name.split(' - ')[0] || 
                      category.name.split(' > ')[0] || 
                      'Other';
                    
                    if (!groupedCategories[parentCategory]) {
                      groupedCategories[parentCategory] = [];
                    }
                    groupedCategories[parentCategory].push(category);
                  });

                // Convert to array and split into two columns
                const parentCategories = Object.entries(groupedCategories);
                const midPoint = Math.ceil(parentCategories.length / 2);
                const leftColumn = parentCategories.slice(0, midPoint);
                const rightColumn = parentCategories.slice(midPoint);

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Left Column */}
  <div className="space-y-6">
    {leftColumn.map(([parentName, categories]) => (
      <div key={parentName} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        {/* Categories with Courses */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="group">
              {/* Category Header */}
                                <NavLink 
  to={`/category/${category.name.toLowerCase()}`} 

                onClick={() => setIsCoursesDropdownOpen(false)}
                className="block mb-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center">
                   <span className="w-2 h-6 bg-gradient-to-b from-[#FF7426] to-orange-400 rounded-full mr-3"></span>
                    <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#FF7426] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {category.name.replace(`${parentName} - `, '').replace(`${parentName} > `, '')}
                  </h3>
                  <span className="text-xs bg-gradient-to-r from-[#FF7426] to-orange-400 text-white px-2 py-1 rounded-full font-medium">
                    {category.courses.length} courses
                  </span>
                </div>
              </NavLink>

              {/* Courses List */}
              <div className="space-y-1.5 ml-6">
                {category.courses.slice(0, 4).map((course) => (
                  <NavLink
                    key={course.id}
                    to={{
                      pathname: `/${category.name.toLowerCase()}/course/${course.courseCode}`,
                    }}
                    state={{ courseId: course.id, courseCode: course.courseCode }}
                    onClick={() => setIsCoursesDropdownOpen(false)}
                    className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-25 transition-all group/course border border-transparent hover:border-orange-100"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-gray-700 group-hover/course:text-[#FF7426] transition-colors truncate font-medium">
                        {course.name || course.title}
                      </h4>
                      {course.duration && (
                        <div className="flex items-center mt-1">
                          <svg className="w-3 h-3 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-xs text-gray-500">{course.duration}</p>
                        </div>
                      )}
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover/course:text-[#FF7426] transition-colors flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </NavLink>
                ))}
                
                {/* Show More Link */}
                {category.courses.length > 4 && (
                                    <NavLink 
  to={`/category/${category.name.toLowerCase()}`} 

                    onClick={() => setIsCoursesDropdownOpen(false)}
                    className="flex items-center text-xs text-[#FF7426] font-medium hover:underline mt-2 ml-2 group/more"
                  >
                    <span>+{category.courses.length - 4} more courses</span>
                    <svg className="w-3 h-3 ml-1 group-hover/more:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </NavLink>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>

  {/* Right Column */}
  <div className="space-y-6">
    {rightColumn.map(([parentName, categories]) => (
      <div key={parentName} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        {/* Parent Category Header */}
        {/* <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <span className="w-2 h-6 bg-gradient-to-b from-[#FF7426] to-orange-400 rounded-full mr-3"></span>
            {parentName}
          </h2>
          <span className="text-xs bg-gradient-to-b from-[#FF7426] to-orange-400 text-white px-2 py-1 rounded-full font-medium">
            {categories.reduce((total, cat) => total + cat.courses.length, 0)} courses
          </span>
        </div> */}

        {/* Categories with Courses */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="group">
              {/* Category Header */}
                                 <NavLink 
  to={`/category/${category.name.toLowerCase()}`} 

                onClick={() => setIsCoursesDropdownOpen(false)}
                className="block mb-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center">
                   <span className="w-2 h-6 bg-gradient-to-b from-[#FF7426] to-orange-400 rounded-full mr-3"></span>
                    <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#FF7426] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {category.name.replace(`${parentName} - `, '').replace(`${parentName} > `, '')}
                  </h3>
                  <span className="text-xs bg-gradient-to-r from-[#FF7426] to-orange-400 text-white px-2 py-1 rounded-full font-medium">
                    {category.courses.length} courses
                  </span>
                </div>
              </NavLink>

              {/* Courses List */}
              <div className="space-y-1.5 ml-6">
                {category.courses.slice(0, 4).map((course) => (
                  <NavLink
                    key={course.id}
                    to={{
                      pathname: `/${category.name.toLowerCase()}/course/${course.courseCode}`,
                    }}
                    state={{ courseId: course.id, courseCode: course.courseCode }}
                    onClick={() => setIsCoursesDropdownOpen(false)}
                    className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-25 transition-all group/course border border-transparent hover:border-orange-100"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-gray-700 group-hover/course:text-[#FF7426] transition-colors truncate font-medium">
                        {course.name || course.title}
                      </h4>
                      {course.duration && (
                        <div className="flex items-center mt-1">
                          <svg className="w-3 h-3 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-xs text-gray-500">{course.duration}</p>
                        </div>
                      )}
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover/course:text-[#FF7426] transition-colors flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </NavLink>
                ))}
                
                {/* Show More Link */}
                {category.courses.length > 4 && (
                  <NavLink 
  to={`/category/${category.name.toLowerCase()}`} 

                    onClick={() => setIsCoursesDropdownOpen(false)}
                    className="flex items-center text-xs text-[#FF7426] font-medium hover:underline mt-2 ml-2 group/more"
                  >
                    <span>+{category.courses.length - 4} more courses</span>
                    <svg className="w-3 h-3 ml-1 group-hover/more:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </NavLink>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>
                );
              })()}
            </div>

            {/* All Courses Link */}
            <div className="border-t border-gray-200 bg-gray-50 p-4">
              <NavLink
                to="/courselist"
                className="flex items-center justify-center text-[#FF7426] font-medium hover:underline text-sm sm:text-base"
                onClick={() => setIsCoursesDropdownOpen(false)}
              >
                Browse All Courses
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

            <NavLink
              to="/success-stories"
              style={navLinkStyle}
              className="hover:text-[#FF7426] text-sm lg:text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap"
            >
              Success Stories
            </NavLink>
            <NavLink
              to="/upcoming-batches"
              style={navLinkStyle}
              className="hover:text-[#FF7426] text-sm lg:text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap"
            >
              Upcoming Batches
            </NavLink>
<div className="relative">
  <a
    onClick={() => setIsResourcesDropdownOpen(!isResourcesDropdownOpen)}
    className="text-sm lg:text-xs xl:text-sm transition-colors whitespace-nowrap flex items-center"
    style={
      pathname === "/self-test" || 
      pathname === "/blog" || 
      pathname === "/ebooks" ||
      pathname === "/newsletter" 
        ? { color: "#FF7426", fontWeight: "600" }
        : {}
    }
  >
    Resources
    <svg
      className={`ml-1 h-4 w-4 transition-transform ${isResourcesDropdownOpen ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </a>

  <AnimatePresence>
    {isResourcesDropdownOpen && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
        onMouseLeave={() => {
          if (typeof window !== "undefined" && window.innerWidth >= 1024) {
            setIsResourcesDropdownOpen(false);
          }
        }}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsResourcesDropdownOpen(false)}
          className="lg:hidden absolute top-2 right-2 text-gray-500 hover:text-[#FF7426] p-1 z-10"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="py-2">

          <NavLink
            to="/self-test"
            onClick={() => setIsResourcesDropdownOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#FF7426] transition-colors"
            style={({ isActive }) => ({
              color: isActive ? "#FF7426" : "#374151",
              fontWeight: isActive ? "600" : "400",
              backgroundColor: isActive ? "#FFF5EF" : "transparent"
            })}
          >
            Self Test
          </NavLink>


          <NavLink
            to="/blog"
            onClick={() => setIsResourcesDropdownOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#FF7426] transition-colors"
            style={({ isActive }) => ({
              color: isActive ? "#FF7426" : "#374151",
              fontWeight: isActive ? "600" : "400",
              backgroundColor: isActive ? "#FFF5EF" : "transparent"
            })}
          >
            Blog
          </NavLink>
          <NavLink
            to="/ebooks"
            onClick={() => setIsResourcesDropdownOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#FF7426] transition-colors"
            style={({ isActive }) => ({
              color: isActive ? "#FF7426" : "#374151",
              fontWeight: isActive ? "600" : "400",
              backgroundColor: isActive ? "#FFF5EF" : "transparent"
            })}
          >
            Ebooks
          </NavLink>
          
          <NavLink
            to="/newsletter"
            onClick={() => setIsResourcesDropdownOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#FF7426] transition-colors"
            style={({ isActive }) => ({
              color: isActive ? "#FF7426" : "#374151",
              fontWeight: isActive ? "600" : "400",
              backgroundColor: isActive ? "#FFF5EF" : "transparent"
            })}
          >
            Newsletter
          </NavLink>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
            <NavLink
              to="/PCATExamPortal"
              style={navLinkStyle}
              className="hover:text-[#FF7426] text-sm lg:text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap"
            >
              PCAT
            </NavLink>
            <NavLink
              to="/whyus"
              style={navLinkStyle}
              className="hover:text-[#FF7426] text-sm lg:text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap"
            >
              Why Us
            </NavLink>

            <NavLink
              to="/contactus"
              style={navLinkStyle}
              className="hover:text-[#FF7426] text-sm lg:text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap"
            >
              Contact us
            </NavLink>
          </div>
          <div className="flex space-x-3 ml-6 xl:ml-8 2xl:ml-10">
            {isAuthenticated ? (
              <>
                <NavLink to={
                  getUserRole() === 'STUDENT' ? '/student/dashboard' :
                    getUserRole() === 'TEACHER' ? '/teacher/dashboard' :
                      '/login'
                }>
                  <motion.button className="bg-[#4D2C5E] text-white px-4 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#3A2150] transition-all shadow-sm hover:shadow-md whitespace-nowrap">
                    Dashboard
                  </motion.button>
                </NavLink>
                <motion.button
                  onClick={() => logout()}
                  whileHover={{ y: -2 }}
                  className="bg-[#FF7426] text-white px-4 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#E65100] transition-all shadow-sm hover:shadow-md whitespace-nowrap cursor-pointer"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ y: -2 }}
                  className="bg-[#4D2C5E] text-white px-4 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#3A2150] transition-all shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  ENROLL NOW
                </motion.button>
                <NavLink to="/Login">
                  <motion.button
                    whileHover={{ y: -2 }}
                    className="bg-[#FF7426] text-white px-4 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#E65100] transition-all shadow-sm hover:shadow-md whitespace-nowrap cursor-pointer"
                  >
                    Login
                  </motion.button>
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation (unchanged) */}
        <div className="lg:hidden flex items-center">
          <div className="hidden sm:flex gap-3 mr-4">
            {isAuthenticated ? (
              <>
                <NavLink to={
                  getUserRole() === 'STUDENT' ? '/student/dashboard' :
                    getUserRole() === 'TEACHER' ? '/teacher/dashboard' :
                      '/Login'
                }>
                  <motion.button className="bg-[#4D2C5E] text-white px-4 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#3A2150] transition-all shadow-sm hover:shadow-md whitespace-nowrap">
                    Dashboard
                  </motion.button>
                </NavLink>
                <motion.button
                  onClick={() => logout()}
                  whileHover={{ y: -2 }}
                  className="bg-[#FF7426] text-white px-4 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#E65100] transition-all shadow-sm hover:shadow-md whitespace-nowrap cursor-pointer"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <button
                  className="bg-[#4D2C5E] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#3A2150] transition-colors whitespace-nowrap"
                  onClick={() => setIsModalOpen(true)}
                >
                  ENROLL
                </button>
                <NavLink to="/login">
                  <button className="bg-[#FF7426] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#E65100] transition-colors whitespace-nowrap">
                    Login
                  </button>
                </NavLink>
              </>
            )}
          </div>
          <button
            onClick={toggleDrawer}
            className="text-gray-600 hover:text-[#FF7426] p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 sm:h-7 sm:w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={toggleDrawer}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut" }}
              className="fixed inset-0 w-full h-full z-50 lg:hidden pointer-events-none"
            >
              <div className="absolute right-0 h-full w-72 sm:w-80 bg-white shadow-2xl flex flex-col pointer-events-auto">
                <div className="flex justify-end p-4 shrink-0">
                  <button
                    onClick={toggleDrawer}
                    className="text-gray-600 hover:text-[#FF7426] p-2 focus:outline-none"
                  >
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-2 px-4 pb-4">
                    <div className="mb-4">
                      <button
                        onClick={() => setIsCoursesDropdownOpen(!isCoursesDropdownOpen)}
                        className="w-full flex justify-between items-center px-4 py-3 text-base font-medium hover:bg-[#FFF5EF] rounded-lg transition-all"
                      >
                        <span>Courses</span>
                        <svg
                          className={`ml-2 h-5 w-5 transition-transform ${isCoursesDropdownOpen ? "rotate-180" : ""
                            }`}
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
                      </button>

                      {/* Courses Dropdown Content */}
                      {isCoursesDropdownOpen && (
                        <div className="mt-2 pl-4 space-y-2">
                          {/* Categories List with Courses */}
                          <div className="space-y-4">
                            {courseCategories
                              .filter((category) => category.courses.length !== 0)
                              .map((category) => {
                                const isCategoryOpen = selectedCategory?.id === category.id;
                                return (
                                  <div key={category.id}>
                                    {/* Category Button */}
                                    <button
                                      onClick={() => {
                                        if (isCategoryOpen) {
                                          setSelectedCategory(null);
                                        } else {
                                          setSelectedCategory(category);
                                        }
                                      }}
                                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex justify-between items-center ${isCategoryOpen
                                        ? "bg-[#FF7426] text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                      <span>{category.name}</span>
                                      <svg
                                        className={`h-4 w-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""
                                          }`}
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
                                    </button>

                                    {/* Courses List */}
                                    {isCategoryOpen && (
                                      <div className="mt-2 ml-4 space-y-2 overflow-hidden">
                                        {category.courses.map((course) => (
                                          <NavLink
                                            key={course.id}
                                            to={{
                                              pathname: `/${selectedCategory.name.toLowerCase()}/course/${course.courseCode}`,
                                            }}
                                            state={{ courseId: course.id, courseCode: course.courseCode }}
                                            onClick={() => {
                                              toggleDrawer();
                                              setIsCoursesDropdownOpen(false);
                                            }}
                                            className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                                          >
                                            <div className="flex items-start">
                                              <img
                                                src={course.image}
                                                alt={course.name}
                                                className="w-8 h-8 object-cover rounded-md mr-2 flex-shrink-0"
                                              />
                                              <div className="min-w-0">
                                                <p className="font-medium text-gray-800 group-hover:text-[#FF7426] break-words line-clamp-2">
                                                  {course.name}
                                                </p>
                                                <div className="flex flex-wrap items-center mt-1">
                                                  <p className="text-xs text-gray-500 mr-2">{course.duration}</p>
                                                </div>
                                              </div>
                                            </div>
                                          </NavLink>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                          </div>

                          {/* All Courses Link */}
                          <NavLink
                            to="/courselist"
                            onClick={() => {
                              toggleDrawer();
                              setIsCoursesDropdownOpen(false);
                            }}
                            className="block px-3 py-2 text-sm font-medium text-[#FF7426] hover:underline mt-4"
                          >
                            View All Courses Ã¢â€ â€™
                          </NavLink>
                        </div>
                      )}
                    </div>

                    {/* Other Navigation Links */}
                    <NavLink
                      to="/success-stories"
                      style={navLinkStyle}
                      className="block px-4 py-3 text-base font-medium hover:bg-[#FFF5EF] rounded-lg transition-all"
                      onClick={toggleDrawer}
                    >
                      Success Stories
                    </NavLink>
                    <NavLink
                      to="/upcoming-batches"
                      style={navLinkStyle}
                      className="block px-4 py-3 text-base font-medium hover:bg-[#FFF5EF] rounded-lg transition-all"
                      onClick={toggleDrawer}
                    >
                      Upcoming Batches
                    </NavLink>
                    <div className="mb-4">
  <button
    onClick={() => setIsResourcesDropdownOpen(!isResourcesDropdownOpen)}
    className="w-full flex justify-between items-center px-4 py-3 text-sm font-medium hover:bg-[#FFF5EF] rounded-lg transition-all"
  >
    <span>Resources</span>
    <svg
      className={`ml-2 h-5 w-5 transition-transform ${isResourcesDropdownOpen ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {/* Resources Dropdown Content */}
  {isResourcesDropdownOpen && (
    <div className="mt-2 pl-4 space-y-2">
      <NavLink
        to="/self-test"
        onClick={() => {
          toggleDrawer();
          setIsResourcesDropdownOpen(false);
        }}
        className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        style={({ isActive }) => ({
          color: isActive ? "#FF7426" : "#374151",
          fontWeight: isActive ? "600" : "400",
        })}
      >
        Self Test
      </NavLink>

      <NavLink
        to="/blog"
        onClick={() => {
          toggleDrawer();
          setIsResourcesDropdownOpen(false);
        }}
        className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        style={({ isActive }) => ({
          color: isActive ? "#FF7426" : "#374151",
          fontWeight: isActive ? "600" : "400",
        })}
      >
        Blog
      </NavLink>
      
      <NavLink
        to="/ebooks"
        onClick={() => {
          toggleDrawer();
          setIsResourcesDropdownOpen(false);
        }}
        className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        style={({ isActive }) => ({
          color: isActive ? "#FF7426" : "#374151",
          fontWeight: isActive ? "600" : "400",
        })}
      >
        Ebooks
      </NavLink>
      
      <NavLink
        to="/newsletter"
        onClick={() => {
          toggleDrawer();
          setIsResourcesDropdownOpen(false);
        }}
        className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        style={({ isActive }) => ({
          color: isActive ? "#FF7426" : "#374151",
          fontWeight: isActive ? "600" : "400",
        })}
      >
        Newsletter
      </NavLink>
    </div>
  )}
</div>

                    <NavLink
                      to="/PCATExamPortal"
                      style={navLinkStyle}
                      className="block px-4 py-3 text-base font-medium hover:bg-[#FFF5EF] rounded-lg transition-all"
                      onClick={toggleDrawer}
                    >
                      PCAT
                    </NavLink>

                     <NavLink
                      to="/whyus"
                      style={navLinkStyle}
                      className="block px-4 py-3 text-base font-medium hover:bg-[#FFF5EF] rounded-lg transition-all"
                      onClick={toggleDrawer}
                    >
                      Why Us
                    </NavLink>


                    <NavLink
                      to="/contactus"
                      style={navLinkStyle}
                      className="block px-4 py-3 text-base font-bold hover:bg-[#FFF5EF] rounded-lg transition-all"
                      onClick={toggleDrawer}
                    >
                      Contact us
                    </NavLink>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-100 shrink-0 ml-6 xl:ml-8 2xl:ml-10">
                  {isAuthenticated ? (
                    <>
                      <NavLink to={getUserRole() === 'Teacher' ? '/Teacher/Dashboard' : '/Student/Dashboard'}>
                        <motion.button
                          whileHover={{ y: -2 }}
                          className="w-full bg-[#4D2C5E] text-white px-4 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#3A2150] transition-all shadow-sm hover:shadow-md whitespace-nowrap mb-3"
                        >
                          Dashboard
                        </motion.button>
                      </NavLink>
                      <motion.button
                        onClick={() => logout()}
                        whileHover={{ y: -2 }}
                        className="w-full bg-[#FF7426] text-white px-4 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#E65100] transition-all shadow-sm hover:shadow-md whitespace-nowrap cursor-pointer"
                      >
                        Logout
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        onClick={() => setIsModalOpen(true)}
                        whileHover={{ y: -2 }}
                        className="w-full bg-[#4D2C5E] text-white px-4 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#3A2150] transition-all shadow-sm hover:shadow-md whitespace-nowrap mb-3"
                      >
                        ENROLL NOW
                      </motion.button>
                      <NavLink to="/Login">
                        <motion.button
                          whileHover={{ y: -2 }}
                          className="w-full bg-[#FF7426] text-white px-4 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#E65100] transition-all shadow-sm hover:shadow-md whitespace-nowrap cursor-pointer"
                        >
                          Login
                        </motion.button>
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AdmissionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <AnimatePresence>
        {showExitIntent && (
          <ExitIntentModalData onClose={handleCloseExitIntent} />
        )}
      </AnimatePresence>

      <Chatbot/>
    </header>
  );
}

export default Header;
