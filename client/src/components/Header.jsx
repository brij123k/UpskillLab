import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdmissionFormModal from "./Modal/BasicEnrollNowModal";
import { useQuery } from "@tanstack/react-query";
import { categoryAPI, courseAPI } from "../config/api-repository";

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch categories using React Query
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      console.log("Fetching categories...");
      const categories = await categoryAPI.getCategories({
        limit: 5,
        featured: true,
      });

      const allCourses = await courseAPI
        .getCourseDisplay({
          categoryIds: categories.data.map(({ _id }) => _id),
        })
        .then(({ data }) => data);
      return { categories, allCourses };
    },
    select: ({ categories, allCourses }) => {
      return categories.data.map((category) => ({
        id: category._id,
        name: category.categoryName,
        code: category.categoryCode,
        image: category.categoryImage,
        description: category.categoryDescription,
        courses: allCourses
          .filter((course) => course.category._id === category._id)
          .map((course) => ({
            id: course._id,
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
      const courses = await courseAPI.getCourseDisplay({
        limit: 10,
        featured: true,
      });
      return courses.data;
    },
    select: (data) => {
      return data.map((course) => ({
        id: course._id,
        title: course.courseName,
        imageUrl: course.courseImage,
        duration: course.courseDuration,
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

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/">
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <img
              src="/images/Logo.png"
              alt="Meritshot Logo"
              className="h-8 sm:h-10 lg:h-12 2xl:h-14 transition-all duration-200"
            />
          </motion.div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <div className="flex items-center space-x-6 xl:space-x-8 2xl:space-x-10">
            {/* Courses Dropdown */}
            <div className="relative">
              <button
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
              </button>

              <AnimatePresence>
                {isCoursesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-[700px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
                    onMouseLeave={() => setIsCoursesDropdownOpen(false)}
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

                    <div className="flex flex-col lg:flex-row h-full">
                      {/* Categories List */}
                      <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50 overflow-y-auto">
                        <div className="p-4 sticky top-0 bg-gray-50 z-10">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Categories
                          </h3>
                        </div>
                        <ul className="space-y-1 px-4 pb-4">
                          {courseCategories.map((category) => (
                            <li key={category.id}>
                              <button
                                onClick={() => handleCategorySelect(category)}
                                className={`w-full text-left px-3 py-3 rounded-md text-sm font-medium ${
                                  selectedCategory?.id === category.id
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
                      <div className="w-full lg:w-2/3 overflow-y-auto">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {selectedCategory
                                ? selectedCategory.name + " Courses"
                                : "Featured Courses"}
                            </h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedCategory
                              ? selectedCategory.courses.map((course) => (
                                  <NavLink
                                    to={`/courseDetails/${course.id}`}
                                    key={course.id}
                                    className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer group"
                                    onClick={() => {
                                      setIsCoursesDropdownOpen(false);
                                    }}
                                  >
                                    <div className="flex items-start">
                                      <img
                                        src={course.image}
                                        alt={course.name}
                                        className="w-12 h-12 object-cover rounded-md mr-3 flex-shrink-0"
                                      />
                                      <div className="min-w-0">
                                        <h4 className="font-medium text-gray-800 group-hover:text-[#FF7426] truncate">
                                          {course.name}
                                        </h4>
                                      </div>
                                    </div>
                                  </NavLink>
                                ))
                              : AllCourses.slice(0, 4).map((course) => (
                                  <NavLink
                                    to={`/courseDetails/${course.id}`}
                                    key={course.id}
                                    className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer group"
                                    onClick={() => {
                                      setIsCoursesDropdownOpen(false);
                                    }}
                                  >
                                    <div className="flex items-start">
                                      <img
                                        src={course.imageUrl}
                                        alt={course.title}
                                        className="w-12 h-12 object-cover rounded-md mr-3 flex-shrink-0"
                                      />
                                      <div className="min-w-0">
                                        <h4 className="font-medium text-gray-800 group-hover:text-[#FF7426] truncate">
                                          {course.title}
                                        </h4>
                                      </div>
                                    </div>
                                  </NavLink>
                                ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* All Courses Link */}
                    <div className="border-t border-gray-200 bg-gray-50 p-3 sticky bottom-0">
                      <NavLink
                        to="/CourseList"
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
              to="/Success-stories"
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
              to="/Students-Blog"
              style={navLinkStyle}
              className="hover:text-[#FF7426] text-sm lg:text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap"
            >
              Student Blog
            </NavLink>
            <NavLink
              to="/ContactUs"
              style={navLinkStyle}
              className="hover:text-[#FF7426] text-sm lg:text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap"
            >
              Contact us
            </NavLink>
          </div>
          <div className="flex space-x-3 ml-6 xl:ml-8 2xl:ml-10">
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ y: -2 }}
              className="bg-[#4D2C5E] text-white px-4 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#3A2150] transition-all shadow-sm hover:shadow-md whitespace-nowrap"
            >
              ENROLL NOW
            </motion.button>
            <NavLink to="/Register">
              <motion.button
                whileHover={{ y: -2 }}
                className="bg-[#FF7426] text-white px-4 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#E65100] transition-all shadow-sm hover:shadow-md whitespace-nowrap cursor-pointer"
              >
                SIGN UP
              </motion.button>
            </NavLink>
          </div>
        </div>

        {/* Mobile Navigation (unchanged) */}
        <div className="lg:hidden flex items-center">
          <div className="hidden sm:flex gap-3 mr-4">
            <button
              className="bg-[#4D2C5E] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#3A2150] transition-colors whitespace-nowrap"
              onClick={() => setIsModalOpen(true)}
            >
              ENROLL
            </button>
            <NavLink to="/Register">
              <button className="bg-[#FF7426] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#E65100] transition-colors whitespace-nowrap">
                SIGN UP
              </button>
            </NavLink>
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
                        onClick={() =>
                          setIsCoursesDropdownOpen(!isCoursesDropdownOpen)
                        }
                        className="w-full flex justify-between items-center px-4 py-3 text-base font-medium hover:bg-[#FFF5EF] rounded-lg transition-all"
                      >
                        <span>Courses</span>
                        <svg
                          className={`ml-2 h-5 w-5 transition-transform ${
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
                      </button>

                      {/* Courses Dropdown Content */}
                      {isCoursesDropdownOpen && (
                        <div className="mt-2 pl-4 space-y-2">
                          {/* Categories List with Courses */}
                          <div className="space-y-4">
                            {courseCategories.map((category) => {
                              const isCategoryOpen =
                                selectedCategory?.id === category.id;
                              return (
                                <div key={category.id}>
                                  {/* Category Button */}
                                  <button
                                    onClick={() => {
                                      // Toggle this category
                                      if (isCategoryOpen) {
                                        setSelectedCategory(null);
                                      } else {
                                        setSelectedCategory(category);
                                      }
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex justify-between items-center ${
                                      isCategoryOpen
                                        ? "bg-[#FF7426] text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                  >
                                    <span>{category.name}</span>
                                    <svg
                                      className={`h-4 w-4 transition-transform ${
                                        isCategoryOpen ? "rotate-180" : ""
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

                                  {/* Courses List (shown only for selected category) */}
                                  {isCategoryOpen && (
                                    <div className="mt-2 ml-4 space-y-2">
                                      {category.courses.map((course) => (
                                        <NavLink
                                          key={course.id}
                                          to={`/courseDetails/${course.id}`}
                                          onClick={() => {
                                            toggleDrawer();
                                            setIsCoursesDropdownOpen(false);
                                          }}
                                          className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                                        >
                                          <div className="flex items-center">
                                            <img
                                              src={course.image}
                                              alt={course.name}
                                              className="w-8 h-8 object-cover rounded-md mr-2"
                                            />
                                            <div>
                                              <p className="font-medium">
                                                {course.name}
                                              </p>
                                              <p className="text-xs text-gray-500">
                                                {course.duration}
                                              </p>
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
                            to="/CourseList"
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
                      to="/Success-stories"
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
                      to="/Students-Blog"
                      style={navLinkStyle}
                      className="block px-4 py-3 text-base font-medium hover:bg-[#FFF5EF] rounded-lg transition-all"
                      onClick={toggleDrawer}
                    >
                      Student Blog
                    </NavLink>
                    <NavLink
                      to="/ContactUs"
                      style={navLinkStyle}
                      className="block px-4 py-3 text-base font-bold hover:bg-[#FFF5EF] rounded-lg transition-all"
                      onClick={toggleDrawer}
                    >
                      Contact us
                    </NavLink>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-100 shrink-0">
                  <button
                    className="w-full bg-[#4D2C5E] text-white px-6 py-3 rounded-full text-base font-medium hover:bg-[#3A2150] transition-colors shadow-sm mb-3"
                    onClick={() => setIsModalOpen(true)}
                  >
                    ENROLL NOW
                  </button>
                  <NavLink to="/Register">
                    <button className="w-full bg-[#FF7426] text-white px-6 py-3 rounded-full text-base font-medium hover:bg-[#E65100] transition-colors shadow-sm">
                      SIGN UP
                    </button>
                  </NavLink>
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
    </header>
  );
}

export default Header;
