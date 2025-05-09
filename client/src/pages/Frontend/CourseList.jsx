import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import TrainingBanner from "../../components/banners/TrainingBanner";
import FeedbaackBanner from "../../components/banners/FeedbackBanner";
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import EnrollmentModal from "../../components/Modal/EnrollmentModal";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getFilteredCourses } from "../../config/services";
import { getDataHandler } from "../../config/services";
import { useLocation } from "react-router-dom";
import BatchEnrollmentModal from "../../components/Modal/BatchEnrollmentModal";
import ApiConfig from "../../config/apiConfig";
import { toast } from "react-toastify";
import AdmissionFormModal from "../../components/Modal/BasicEnrollNowModal";
const bannerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

const imageVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.8,
    },
  },
};

const DropdownFilter = ({
  title,
  label,
  filters,
  dropdownOpen,
  filterOptions,
  toggleDropdown,
  handleFilterSelect,
  isLoading = false,
  hasNextPage = false,
  fetchNextPage,
  searchProps,
  colorScheme = {
    category: "bg-[#4D2C5E]/10 text-[#4D2C5E] border-[#4D2C5E]/30",
    instructor: "bg-[#7B4B9E]/10 text-[#4D2C5E] border-[#7B4B9E]/30",
    language: "bg-[#FF7426]/10 text-[#FF7426] border-[#FF7426]/30",
    priceRange: "bg-[#4D2C5E]/10 text-[#4D2C5E] border-[#4D2C5E]/30",
    levelBeginner: "bg-blue-100/80 text-blue-800 border-blue-200",
    levelIntermediate: "bg-purple-100/80 text-purple-800 border-purple-200",
    levelAdvanced: "bg-[#FF7426]/20 text-[#FF7426] border-[#FF7426]/30",
    default: "bg-gray-100 text-gray-700 border-gray-300",
  },
}) => {
  const dropdownRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: dropdownRef.current,
      rootMargin: "20px",
      threshold: 1.0,
    };

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isLoading) {
        fetchNextPage();
      }
    }, options);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isLoading, fetchNextPage]);

  const getFilterColor = ([{ value }]) => {
    if (title === "level") {
      if (value === "BEGINNER") return colorScheme.levelBeginner;
      if (value === "INTERMEDIATE") return colorScheme.levelIntermediate;
      return colorScheme.levelAdvanced;
    }
    return colorScheme[title] || colorScheme.default;
  };

  useEffect(() => {
    if (dropdownOpen === title && observerRef.current) {
      const lastItem = dropdownRef.current?.lastElementChild;
      if (lastItem) {
        observerRef.current.observe(lastItem);
      }
    }
  }, [dropdownOpen, title, filterOptions]);

  return (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(title)}
        className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg border-2 ${filters[title].length
          ? getFilterColor(filters[title])
          : "border-gray-200 hover:border-[#FF7426]/50"
          } transition-colors min-w-[120px]`}
      >
        <span className="truncate">
          {filters[title]?.at(0)?.label || label}
        </span>
        {dropdownOpen === title ? (
          <FiChevronUp className="ml-2 text-[#4D2C5E]" />
        ) : (
          <FiChevronDown className="ml-2 text-[#4D2C5E]" />
        )}
      </button>

      {dropdownOpen === title && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute z-10 mt-1 w-48 p-2 bg-white rounded-lg shadow-lg border border-[#4D2C5E]/20"
        >
          {/* Add search input if searchProps exists */}
          {searchProps && (
            <div className="px-2 pb-2">
              <input
                type="text"
                {...searchProps}
                className="w-full px-3 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#4D2C5E]"
              />
            </div>
          )}

          <div
            ref={dropdownRef}
            className="max-h-60 overflow-y-auto custom-scrollbar"
          >
            {isLoading && (
              <div className="flex justify-center p-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#4D2C5E]"></div>
              </div>
            )}

            {filterOptions[title]?.map((option) => {
              const value = typeof option === "object" ? option.value : option;
              const label = typeof option === "object" ? option.label : option;

              return (
                <button
                  key={value}
                  onClick={() => handleFilterSelect(title, value, label)}
                  className={`block w-full text-left cursor-pointer px-4 py-2 text-sm transition-colors ${filters[title].at(0)?.value === value
                    ? getFilterColor(value) + " font-bold"
                    : "text-gray-700 hover:bg-[#4D2C5E]/5"
                    }`}
                >
                  {label}
                </button>
              );
            })}

            {hasNextPage && (
              <div className="text-center text-sm text-gray-500 py-2">
                Loading more...
              </div>
            )}
          </div>

          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f3f4f6;
              border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #4d2c5e;
              border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #7b4b9e;
            }
          `}</style>
        </motion.div>
      )}
    </div>
  );
};

const CategoryDropdownFilter = ({
  filters,
  dropdownOpen,
  toggleDropdown,
  handleFilterSelect,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["categories", searchValue],
    queryFn: ({ pageParam = 0 }) =>
      getDataHandler("category", {
        skip: pageParam,
        limit: 100,
        searchString: searchValue || undefined,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.length * 10;
      return loadedCount < lastPage.count ? loadedCount : undefined;
    },
  });

  // Transform categories data for dropdown
  const categoryOptions = useMemo(() => {
    if (!data?.pages) return [];
    console.log(data.pages)
    return data.pages.flatMap((page) =>
      page.data.filter((cat)=>cat.active).map((category) => ({
        value: category._id,
        label: category.categoryName,
      }))
    );
  }, [data]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <DropdownFilter
      title="category"
      label="Category"
      filters={filters}
      dropdownOpen={dropdownOpen}
      filterOptions={{ category: categoryOptions }}
      toggleDropdown={toggleDropdown}
      handleFilterSelect={handleFilterSelect}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      searchProps={{
        value: searchValue,
        onChange: handleSearch,
        placeholder: "Search categories...",
      }}
    />
  );
};

const LanguageDropdownFilter = ({
  filters,
  dropdownOpen,
  toggleDropdown,
  handleFilterSelect,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["languages", searchValue],
    queryFn: ({ pageParam = 0 }) =>
      getDataHandler("languages", {
        skip: pageParam,
        limit: 10,
        search: searchValue || undefined,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.length * 10;
      return loadedCount < lastPage.count ? loadedCount : undefined;
    },
  });

  // Transform languages data for dropdown
  const languageOptions = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) =>
      page.data.map((language) => ({
        value: language._id,
        label: language.languageName,
      }))
    );
  }, [data]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <DropdownFilter
      title="language"
      label="Language"
      filters={filters}
      dropdownOpen={dropdownOpen}
      filterOptions={{ language: languageOptions }}
      toggleDropdown={toggleDropdown}
      handleFilterSelect={handleFilterSelect}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      searchProps={{
        value: searchValue,
        onChange: handleSearch,
        placeholder: "Search languages...",
      }}
    />
  );
};

const LevelDropdownFilter = ({
  filters,
  dropdownOpen,
  toggleDropdown,
  handleFilterSelect,
}) => {
  const levelOptions = [
    { value: "BEGINNER", label: "Beginner" },
    { value: "INTERMEDIATE", label: "Intermediate" },
    { value: "ADVANCED", label: "Advanced" },
  ];

  return (
    <DropdownFilter
      title="level"
      label="Level"
      filters={filters}
      dropdownOpen={dropdownOpen}
      filterOptions={{ level: levelOptions }}
      toggleDropdown={toggleDropdown}
      handleFilterSelect={handleFilterSelect}
    />
  );
};

const CourseList = () => {
  const [batch, setbatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enrollCourse, setEnrollCourse] = useState(null);
  // const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleEnrollClick = async (course) => {
    // setSelectedCourse(course);
    const today = new Date();
   today.setHours(0, 0, 0, 0);
    const endpointUrl = ApiConfig.getCourseByCode(course.courseCode);
    const response = await getDataHandler(endpointUrl, null, null, true);
    if (response.batch && new Date(response.batch.startDate) >= today) {
    let custemDataSet = {
      id: response.batch._id,
      batchCode: response.batch.batchCode,
      batchId: response.batch._id,
      courseCode: response.courseCode,
      courseId: response._id,
      originalPrice: response.originalPrice,
      price: response.discountedPrice,
      remainingSeats: response.batch.remainingSeats,
      startDate: response.batch.startDate,
      startTime: response.batch.startTime,
      title: response.courseName,
      totalSeats: response.totalSeats,
    }
    setEnrollCourse(custemDataSet)
  }
  else{
     setIsModalOpen(true)
  }
    // setIsEnrollModalOpen(true);
  };

  // const handleEnrollSubmit = () => {
  //   // Handle enrollment logic here
  //   setIsEnrollModalOpen(false);
  // };

  // Enhanced course data
  const [queryParams, setQueryParams] = useState({
    skip: 0,
    limit: 25,
    categoryIds: location.state?.category
      ? [location.state.category.categoryId]
      : [],
    languageIds: [],
    courseLevels: [],
    search: "",
  });


  // State for filters
  const [filters, setFilters] = useState({
    category: location.state?.category
      ? [{
        value: location.state.category.categoryId,
        label: location.state.category.title
      }]
      : [],
    level: [],
    instructor: [],
    language: [],
    priceRange: [],
  });
  const { data: coursesData } = useQuery({
    queryKey: ["courses", queryParams],
    queryFn: () => getFilteredCourses(queryParams),
  });

  // Transform filters to API params when filters change
  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      categoryIds: filters.category.map((cat) => cat.value),
      languageIds: filters.language.map((lang) => lang.value),
      courseLevels: filters.level.map((level) => level.value),
    }));
  }, [filters]);

  useEffect(() => {
    if (location.state?.category) {
      const { categoryId, title } = location.state.category;
      setFilters(prev => ({
        ...prev,
        category: [{ value: categoryId, label: title }]
      }));

      setQueryParams(prev => ({
        ...prev,
        categoryIds: [categoryId]
      }));
    }
  }, [location.state?.category]);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (filterName) => {
    setDropdownOpen(dropdownOpen === filterName ? null : filterName);
  };

  const handleFilterSelect = (filterName, value, label) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: [...prev[filterName], { value, label }],
    }));
    setDropdownOpen(null);
  };

  const handleFilterDelete = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: prev[filterName].filter((item) => item.value !== value),
    }));
    setDropdownOpen(null);
  };

  const resetFilters = () => {
    setFilters({
      category: [],
      level: [],
      instructor: [],
      language: [],
      priceRange: [],
    });
  };

  const courses = (coursesData?.data || []).filter(course => course.active === true);
  
  const totalCourses = coursesData?.count || 0;

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
                Join thousands who've transformed their careers with our
                cutting-edge programs
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-4">
                <a href="#Courses" variants={itemVariants}
                    className="bg-[#FF7426] hover:bg-[#E65100] text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg" >
                  <motion.button
                    className="text-center w-full" 
                  >
                    Browse Courses
                  </motion.button>
                </a>
                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    variants={itemVariants}
                    className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full transition-colors border border-white/20"
                  >
                    Speak to Advisor
                  </motion.button>
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
                  alt="studentsEnrolled collaborating"
                  className="relative rounded-xl w-full h-auto object-cover shadow-2xl z-10 border-4 border-white"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  className="absolute -bottom-5 -right-5 bg-white text-[#4D2C5E] px-5 py-2 rounded-lg shadow-lg font-bold z-30 border-2 border-[#FF7426]"
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-1 text-[#FF7426]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        id="Courses"
      >
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-3xl font-bold text-[#4D2C5E]"
          >
            Explore Our Courses
          </motion.h2>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden sm:flex items-center space-x-2"
          >
            {Object.values(filters).some(filterArray => filterArray.length > 0) && (
              <button
                onClick={resetFilters}
                className="text-sm text-[#FF7426] hover:underline flex items-center"
              >
                Clear all
                <FiX className="ml-1" />
              </button>
            )}
          </motion.div>
        </div>

        {/* Compact Filter Row */}
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <CategoryDropdownFilter
            filters={filters}
            dropdownOpen={dropdownOpen}
            toggleDropdown={toggleDropdown}
            handleFilterSelect={handleFilterSelect}
          />
          <LanguageDropdownFilter
            filters={filters}
            dropdownOpen={dropdownOpen}
            toggleDropdown={toggleDropdown}
            handleFilterSelect={handleFilterSelect}
          />
          <LevelDropdownFilter
            filters={filters}
            dropdownOpen={dropdownOpen}
            toggleDropdown={toggleDropdown}
            handleFilterSelect={handleFilterSelect}
          />
          {/* Other filters */}
        </motion.div>

        {/* Active Filters */}
        {Object.values(filters).some(filterArray => filterArray.length > 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {Object.entries(filters).map(([key, arrayValue]) =>
              arrayValue.map(({ value, label }, index) => (
                <motion.span
                  key={`${key}-${index}`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#4D2C5E]/10 text-[#4D2C5E]"
                >
                  {label}
                  <button
                    onClick={() => handleFilterDelete(key, value)}
                    className="ml-1.5 inline-flex text-gray-400 hover:text-gray-500"
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </motion.span>
              ))
            )}
          </motion.div>
        )}

        {/* Results Count */}
        <motion.div whileHover={{ scale: 1.01 }} className="mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-bold text-[#4D2C5E]">{courses.length}</span>{" "}
            courses {` (of ${courses.length})`}
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses
          .filter(course => course.active === true)
          .map((course, index) => (
          
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 10px 25px -5px rgba(77, 44, 94, 0.2)",
              }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-[#4D2C5E]/10 flex flex-col"
            >
              {/* Course Image Section */}
              <div className="relative">
                <motion.img
                  src={course.courseImage}
                  alt={course.courseName}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-4 left-4 bg-[#fff] text-xs font-bold px-3 py-1 rounded-full shadow-md"
                  >
                    <img src={course?.certifierLogo || "/images/Logo.png"} className="h-5" />

                  </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute bottom-4 right-4 bg-white/90 text-[#FF7426] text-xs font-bold px-2 py-1 rounded"
                >
                  {(() => {
                    const days = course.courseDuration;

                    // Less than 1 day = show in hours
                    if (days < 1) return `${Math.round(days * 24)} hours`;

                    // 1-6 days = show in days
                    if (days <= 6) return `${Math.round(days)} days`;

                    // 7-27 days = show in weeks
                    if (days <= 27) {
                      const weeks = (days / 7).toFixed(1);
                      return `${weeks.endsWith('.0') ? weeks.split('.')[0] : weeks} week${weeks !== '1' ? 's' : ''}`;
                    }

                    // 28-364 days = show in months
                    if (days <= 364) {
                      const months = (days / 30.44).toFixed(1); // Average month length
                      return `${months.endsWith('.0') ? months.split('.')[0] : months} month${months !== '1' ? 's' : ''}`;
                    }

                    // 365+ days = show in years
                    const years = (days / 365).toFixed(1);
                    return `${years.endsWith('.0') ? years.split('.')[0] : years} year${years !== '1' ? 's' : ''}`;
                  })()}
                </motion.div>
              </div>

              {/* Course Content Section */}
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`text-xs px-2 py-1 rounded-full ${course.courseLevel.code === "BEGINNER"
                      ? "bg-blue-100 text-blue-800"
                      : course.courseLevel.code === "INTERMEDIATE"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-[#FF7426]/20 text-[#FF7426]"
                      }`}
                  >
                    {course.courseLevel.name}
                  </motion.span>
                  <div className="flex items-center text-yellow-500">
                    <span className="text-sm font-bold mr-1">
                      {course.courseRating}
                    </span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
<button onClick={() => navigate(`/courseDetails/course/${course.courseCode}`, {
                    state: {
                      courseCode: course.courseCode
                    }
                  })}>
                <h3 className="text-xl font-bold text-[#4D2C5E] mb-2">
                  {course.courseName}
                </h3>
                </button>
                <p className="text-gray-600 mb-4">
                  {course.category.categoryName}
                </p>

                <div className="flex items-center justify-end gap-1 mb-4">
                  <div className="text-sm font-bold line-through text-[#4D2C5E]">
                    ₹{course.originalPrice}
                  </div>
                  <div className="text-md font-bold text-[#4D2C5E]">
                    ₹{course.discountedPrice}
                  </div>

                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="px-6 pb-6 pt-0 flex justify-between gap-3">
                <button
                  onClick={() => navigate(`/courseDetails/course/${course.courseCode}`, {
                    state: {
                      courseCode: course.courseCode
                    }
                  })}
                  className="flex-1 text-center text-[#4D2C5E] font-medium hover:underline flex items-center justify-center py-2 border border-[#4D2C5E]/30 rounded-lg hover:bg-[#4D2C5E]/5 transition-colors cursor-pointer"
                >
                  View Details
                  <motion.svg
                    whileHover={{ x: 5 }}
                    className="ml-1 h-4 w-4"
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
                  </motion.svg>
                </button>

                <motion.button
                  whileHover={{
                    backgroundColor: "#E65100",
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleEnrollClick(course)}
                  className="flex-1 bg-[#FF7426] text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Enroll Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {courses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-medium text-[#4D2C5E] mb-2">
              No courses found
            </h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters</p>
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "#E65100",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={resetFilters}
              className="px-4 py-2 bg-[#FF7426] text-white rounded-lg shadow-md transition-colors"
            >
              Reset Filters
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Keep your existing banners */}
      <TrainingBanner />
      <FeedbaackBanner />
      {enrollCourse && (
        <BatchEnrollmentModal
          batch={enrollCourse}
          onClose={() => setEnrollCourse(null)}
        />
      )}

<AdmissionFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default CourseList;