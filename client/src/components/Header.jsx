import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
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
  const { isAuthenticated, logout, getUserRole } = useAuth();
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [announcements, setAnnouncements] = useState([])


  const [showExitIntent, setShowExitIntent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ y: 0 });
  const [exitIntentTriggered, setExitIntentTriggered] = useState(false);


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

  const triggerExitIntent = () => {
    // Only trigger once per page view
    if (exitIntentTriggered) return;

    setShowExitIntent(true);
    setExitIntentTriggered(true);

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
    document.body.style.overflow = isDrawerOpen ? "auto" : "hidden";
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
  // const [announcements, setAnnouncements] = useState([
  //   "🚀 New Python Bootcamp starting June 15th!",
  //   "🎉 50% Scholarship for first 10 enrollments this week",
  //   "⭐ Student of the Month: Rohan Sharma (Data Science)",
  //   "📢 Upcoming Webinar: 'AI Career Paths' - May 25th, 5PM IST",
  //   "🚀 New Python Bootcamp starting June 15th!",
  //   "🎉 50% Scholarship for first 10 enrollments this week",
  //   "⭐ Student of the Month: Rohan Sharma (Data Science)",
  //   "📢 Upcoming Webinar: 'AI Career Paths' - May 25th, 5PM IST",
  //   "🚀 New Python Bootcamp starting June 15th!",
  //   "🎉 50% Scholarship for first 10 enrollments this week",
  //   "⭐ Student of the Month: Rohan Sharma (Data Science)",
  //   "📢 Upcoming Webinar: 'AI Career Paths' - May 25th, 5PM IST"
  // ]);

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
                className="hover:text-[#FF7426] text-sm lg:text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap flex items-center"
                style={
                  window.location.pathname === "/courses"
                    ? { color: "#FF7426", fontWeight: "600" }
                    : {}
                }
              >
                Courses
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${isCoursesDropdownOpen ? "rotate-180" : ""
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
                    className="absolute left-0 mt-2 w-full lg:w-[700px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
                    onMouseLeave={() => {
                      if (window.innerWidth >= 1024) { // Only auto-close on desktop
                        setIsCoursesDropdownOpen(false);
                      }
                    }}
                  >
                    {/* Close button for mobile */}
                    <button
                      onClick={() => setIsCoursesDropdownOpen(false)}
                      className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-[#FF7426] p-1 z-10"
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

                    <div className="flex flex-col lg:flex-row h-full max-h-[80vh] lg:max-h-[70vh] overflow-auto">
                      {/* Categories List */}
                      <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50">
                        <div className="p-4 sticky top-0 bg-gray-50 z-10">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Categories
                          </h3>
                        </div>
                        <ul className="space-y-1 px-4 pb-4">
                          {courseCategories
                            .filter((category) => category.courses.length !== 0)
                            .map((category) => (
                              <li key={category.id}>
                                <button
                                  onClick={() => handleCategorySelect(category)}
                                  className={`w-full text-left px-3 py-3 rounded-md text-sm font-medium ${selectedCategory?.id === category.id
                                    ? "bg-[#FF7426] text-white"
                                    : "text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                  <div className="flex items-center">
                                    <span className="truncate">
                                      {category.name}
                                    </span>
                                    <span className="ml-auto text-xs bg-white text-gray-700 px-2 py-0.5 rounded-full">
                                      {category.courses.length}
                                    </span>
                                  </div>
                                </button>
                              </li>
                            ))}
                        </ul>
                      </div>

                      {/* Courses List */}
                      <div className="w-full lg:w-2/3 p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {selectedCategory
                              ? selectedCategory.name + " Courses"
                              : "Featured Courses"}
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                          {(selectedCategory ? selectedCategory.courses : AllCourses.slice(0, 4)).map((course) => (
                            <NavLink
                              key={course.id}
                              to={{
                                pathname: `/${(selectedCategory?.name || course.category).toLowerCase()}/course/${course.courseCode}`,
                              }}
                              state={{ courseId: course.id, courseCode: course.courseCode }}
                              onClick={() => setIsCoursesDropdownOpen(false)}
                              className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer group relative"
                              onMouseEnter={(e) => {
                                if (window.innerWidth >= 1024) {
                                  setHoveredCourse(course);
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  setHoverPosition({
                                    x: rect.left - rect.width / 2,
                                    y: rect.top + rect.height,
                                  });
                                }
                              }}
                              onMouseLeave={() => {
                                if (window.innerWidth >= 1024) {
                                  setHoveredCourse(null);
                                }
                              }}
                            >
                              <div className="flex items-start">
                                <img
                                  src={course.image || course.imageUrl}
                                  alt={course.name || course.title}
                                  className="w-12 h-12 object-cover rounded-md mr-3 flex-shrink-0"
                                />
                                <div className="min-w-0">
                                  <h4 className="font-medium text-gray-800 group-hover:text-[#FF7426] truncate">
                                    {course.name || course.title}
                                  </h4>
                                  <p className="text-xs text-gray-500 lg:hidden mt-1">
                                    {course.duration || "Flexible duration"}
                                  </p>
                                </div>
                              </div>
                            </NavLink>

                          ))}
                        </div>

                        {/* Hover card - Desktop only */}
                        <AnimatePresence>
                          {hoveredCourse && window.innerWidth >= 1024 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                              style={{
                                position: "fixed",
                                left: `${hoverPosition.x}px`,
                                top: `${hoverPosition.y}px`,
                                transform: "translate(-50%, -50%)",
                                width: "300px",
                                backgroundColor: "white",
                                borderRadius: "12px",
                                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                                padding: "20px",
                                zIndex: 100,
                                pointerEvents: "none",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={hoveredCourse.image || hoveredCourse.imageUrl}
                                alt={hoveredCourse.name || hoveredCourse.title}
                                className="w-full h-40 object-cover rounded-lg mb-3"
                              />
                              <h4 className="text-lg font-semibold text-center text-gray-800">
                                {hoveredCourse.name || hoveredCourse.title}
                              </h4>
                              {/* {hoveredCourse.duration && (
                  <p className="text-sm text-gray-600 mt-2">
                    Duration: {hoveredCourse.duration} Days
                  </p>
                )} */}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* All Courses Link */}
                    <div className="border-t border-gray-200 bg-gray-50 p-3 sticky bottom-0">
                      <NavLink
                        to="/courselist"
                        className="flex items-center justify-center text-[#FF7426] font-medium hover:underline"
                        onClick={() => setIsCoursesDropdownOpen(false)}
                      >
                        View All Courses
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
            <NavLink
              to="/blog"
              style={navLinkStyle}
              className="hover:text-[#FF7426] text-sm lg:text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap"
            >
              Blog
            </NavLink>
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
                            View All Courses →
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
                    <NavLink
                      to="/blog"
                      style={navLinkStyle}
                      className="block px-4 py-3 text-base font-medium hover:bg-[#FFF5EF] rounded-lg transition-all"
                      onClick={toggleDrawer}
                    >
                      Blog
                    </NavLink>

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
