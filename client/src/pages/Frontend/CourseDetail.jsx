import React, { useRef, useState,useEffect  } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiDownload, FiChevronRight ,FiFilm, FiCode} from 'react-icons/fi';

import { FiClock, FiMonitor, FiCalendar, FiBook } from 'react-icons/fi';
import { FiUsers, FiAlertCircle, FiMessageSquare } from 'react-icons/fi';
import { FiAward, FiBriefcase, FiUserCheck, FiTrendingUp } from 'react-icons/fi';
import PurchaseModal from '../../components/Modal/EnrollmentModal';
import { FiFlag } from 'react-icons/fi';
import { FiBarChart2 } from 'react-icons/fi';
import ApiConfig from '../../config/apiConfig';
// import RazorpayLogo from '../assets/razorpay-logo.svg'; // Replace with actual import
const CourseHero = ({ course }) => {
   
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full overflow-hidden py-16 px-4 sm:px-6 lg:px-8"
        >
            {/* Animated background elements */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#FF7426] blur-3xl"
            />
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#4D2C5E] blur-3xl"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className="lg:w-1/2 space-y-8">
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "backOut" }}
                                className="text-4xl md:text-6xl font-bold text-[#4D2C5E] leading-tight"
                            >
                                {course?.courseName}
                            </motion.h1>
                        </div>

                        <div className="overflow-hidden">
                            <motion.p
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-xl text-gray-700"
                            >
                                {course?.shortDescription? "Master React, Node.js, and MongoDB to build scalable web applications." : course?.shortDescription}
                            </motion.p>
                        </div>

                        {/* Animated Tags */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
                            className="flex flex-wrap gap-3 mt-6"
                        >
                            {course?.tags?.length > 0 ? (
  course.tags.map((tag, index) => (
    <motion.span
      key={index}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{
        scale: 1.1,
        backgroundColor: '#4D2C5E',
        color: 'white',
        boxShadow: '0 4px 12px rgba(77, 44, 94, 0.3)'
      }}
      className="px-4 py-2 bg-white text-[#4D2C5E] rounded-full text-sm font-medium border border-[#4D2C5E]/20 shadow-sm cursor-default"
    >
      {tag}
    </motion.span>
  ))
) : (
  <motion.span
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    whileHover={{
      scale: 1.1,
      backgroundColor: '#4D2C5E',
      color: 'white',
      boxShadow: '0 4px 12px rgba(77, 44, 94, 0.3)'
    }}
    className="px-4 py-2 bg-white text-[#4D2C5E] rounded-full text-sm font-medium border border-[#4D2C5E]/20 shadow-sm cursor-default"
  >
    No tags available
  </motion.span>
)}
                        </motion.div>
                    </div>

                    {/* Right Side - Video with Floating Animation */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:w-1/2 w-full aspect-video rounded-3xl overflow-hidden shadow-2xl relative"
                    >
                        {/* Floating animation container */}
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="w-full h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#4D2C5E]/30 to-[#FF7426]/30 mix-blend-overlay pointer-events-none" />
                            <div className="absolute inset-0 border-4 border-white/20 rounded-3xl pointer-events-none" />
                            <iframe
                                src={course.youtubeUrl}
                                title="Course Preview"
                                className="w-full h-full relative z-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>

                        {/* Floating decorative elements */}
                        <motion.div
                            animate={{
                                y: [0, 20, 0],
                                rotate: [0, 5, 0]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                            className="absolute -top-6 -left-6 w-12 h-12 bg-[#FF7426] rounded-lg opacity-20"
                        />
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, -8, 0]
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                            className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#4D2C5E] rounded-full opacity-20"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};


const CourseKeyDetails = ({ course }) => {
    const details = [
        {
            icon: <FiClock />,
            label: "DURATION",
            value: course.courseDuration?  `${course.courseDuration} months` :"6 months" ,
            accent: "#FF7426",
            bg: "#4D2C5E"
        },
        {
            icon: <FiMonitor />,
            label: "MODE",
            value: course.courseMode? course.courseMode: "Online" ,
            accent: "#4D2C5E",
            bg: "#FF7426"
        },
        {
            icon: <FiBook />,
            label: "FORMAT",
            value: "Live + Recorded" ,
            accent: "#FF7426",
            bg: "#4D2C5E"
        },
        {
            icon: <FiCalendar />,
            label: "STARTING",
            value: course.batch?.startDate? course.batch?.startDate : "Coming Soon" ,
            accent: "#4D2C5E",
            bg: "#FF7426"
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#FDF8EE]"
        >
            {/* Floating background elements */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    x: [0, 15, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#FF7426]/10 blur-xl"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    x: [0, -20, 0],
                    rotate: [0, -8, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
                className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-[#4D2C5E]/10 blur-xl"
            />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {details.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                delay: index * 0.15,
                                type: "spring",
                                stiffness: 100,
                                damping: 10
                            }}
                            whileHover={{
                                y: -10,
                                scale: 1.03
                            }}
                            className="relative group cursor-pointer"
                        >
                            {/* Card background */}
                            <motion.div
                                initial={{ rotate: 0 }}
                                whileHover={{ rotate: 2 }}
                                className="absolute inset-0 rounded-2xl"
                                style={{
                                    backgroundColor: item.bg,
                                    opacity: 0.1
                                }}
                            />

                            {/* Main card */}
                            <motion.div
                                whileHover={{
                                    boxShadow: `0 20px 40px ${item.accent}20`
                                }}
                                className="relative bg-white rounded-xl p-8 h-full border border-gray-100 overflow-hidden"
                            >
                                {/* Animated icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.15 + 0.3 }}
                                    whileHover={{
                                        rotate: 15,
                                        scale: 1.1
                                    }}
                                    className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center mx-auto"
                                    style={{
                                        backgroundColor: `${item.accent}10`,
                                        color: item.accent
                                    }}
                                >
                                    <div className="text-2xl">
                                        {item.icon}
                                    </div>
                                </motion.div>

                                {/* Content */}
                                <motion.h3
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.15 + 0.4 }}
                                    className="text-sm font-semibold text-gray-500 uppercase tracking-wider text-center mb-2"
                                >
                                    {item.label}
                                </motion.h3>

                                <motion.p
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.15 + 0.5 }}
                                    className="text-2xl font-bold text-center"
                                    style={{ color: item.accent }}
                                >
                                    {item.value}
                                </motion.p>

                                {/* Animated underline */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "50%" }}
                                    className="h-1 mt-4 mx-auto"
                                    style={{ backgroundColor: item.accent }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const ProgramInfoWithEnroll = (props) => {
    const [course, batchCode] = props.course;
    const [selectedCourse, setSelectedCourse] = useState(null);
      const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
      const handleEnrollClick = (course) => {
        setSelectedCourse(course);
        setIsEnrollModalOpen(true);
      };

    
      const handleEnrollSubmit = () => {
        // Handle enrollment logic here
        setIsEnrollModalOpen(false);
      };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            {/* Floating background elements */}
            <motion.div
                animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-[#FF7426]/10 blur-xl"
            />
            <motion.div
                animate={{
                    y: [0, 40, 0],
                    x: [0, -15, 0]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute bottom-1/3 right-20 w-40 h-40 rounded-full bg-[#4D2C5E]/10 blur-xl"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Side - Program Details */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className="lg:w-2/3 space-y-10"
                    >
                        {/* Program Details Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6"
                        >
                            <motion.h2
                                initial={{ y: -20 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-4xl font-bold text-[#4D2C5E] relative inline-block"
                            >
                                Program Details
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="absolute bottom-0 left-0 h-1 bg-[#FF7426]"
                                />
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="text-lg text-gray-700 leading-relaxed"
                            >
                                {course.programDetails || "This comprehensive program covers modern full-stack development techniques with real-world projects."}
                            </motion.p>
                        </motion.div>

                        {/* Who Should Enroll Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="space-y-6"
                        >
                            <motion.h3
                                initial={{ x: -20 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.9 }}
                                className="text-2xl font-semibold text-[#4D2C5E]"
                            >
                                Who Should Enroll?
                            </motion.h3>

                            <motion.ul
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ staggerChildren: 0.1, delayChildren: 1 }}
                                className="space-y-4 pl-5"
                            >
                                {(course.targetAudience || [
                                    "Aspiring full-stack developers",
                                    "Computer science students",
                                    "Professionals transitioning to tech",
                                ]).map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 1 + index * 0.1 }}
                                        className="text-gray-700 relative pl-6"
                                    >
                                        <motion.span
                                            className="absolute left-0 top-2 w-2 h-2 rounded-full"
                                            style={{ backgroundColor: index % 2 ? '#FF7426' : '#4D2C5E' }}
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                opacity: [0.7, 1, 0.7]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: index * 0.2
                                            }}
                                        />
                                        {item}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Enroll Card */}
                    <motion.div
                        initial={{ y: 50, opacity: 0, rotate: 2 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="lg:w-1/3 lg:sticky lg:top-8 h-fit"
                    >
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="relative bg-white rounded-xl overflow-hidden shadow-2xl border border-[#4D2C5E]/10"
                        >
                            {/* Decorative gradient overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="absolute inset-0 bg-gradient-to-br from-[#4D2C5E]/5 to-[#FF7426]/5 mix-blend-overlay"
                            />

                            <div className="relative z-10 p-8 space-y-6">
                                <motion.h3
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="text-2xl font-bold text-[#4D2C5E]"
                                >
                                    Join the Program
                                </motion.h3>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ staggerChildren: 0.1, delayChildren: 0.9 }}
                                    className="space-y-5"
                                >
                                    {[
                                        {
                                            icon: <FiUsers className="text-xl" />,
                                            text: "Join our community to learn, connect with like-minded peers, and get updates."
                                        },
                                        {
                                            icon: <FiAlertCircle className="text-xl" />,
                                            text: "Limited Seats in the Cohort"
                                        },
                                        {
                                            icon: <FiMessageSquare className="text-xl" />,
                                            text: "Connect with a counselor to discuss your goals."
                                        }
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ x: 10, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.9 + index * 0.1 }}
                                            whileHover={{ x: 5 }}
                                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#4D2C5E]/5 transition-colors"
                                        >
                                            <motion.div
                                                animate={{
                                                    rotate: [0, 10, 0],
                                                    scale: [1, 1.1, 1]
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    delay: index * 0.5
                                                }}
                                                className={`p-2 rounded-full ${index % 2 ? 'bg-[#FF7426]/10 text-[#FF7426]' : 'bg-[#4D2C5E]/10 text-[#4D2C5E]'}`}
                                            >
                                                {item.icon}
                                            </motion.div>
                                            <p className={`text-gray-700 ${index === 1 ? 'font-medium' : ''}`}>
                                                {item.text}
                                            </p>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <motion.button
                                onClick={() => handleEnrollClick(course)}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 10px 25px rgba(255, 116, 38, 0.4)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-[#FF7426] to-[#FF9E5E] text-white font-bold py-4 px-6 rounded-lg shadow-lg relative overflow-hidden group"
                                >
                                    <span className="relative z-10">ENROLL NOW</span>
                                    <motion.span
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '0%' }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute inset-0 bg-[#E65100] z-0"
                                    />
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
       

{selectedCourse && (
    <PurchaseModal
      course={selectedCourse}
      batchCode={batchCode}
      isOpen={isEnrollModalOpen}
      onClose={() => setIsEnrollModalOpen(false)}
      onEnroll={handleEnrollSubmit}
    />
  )}
   </motion.div>
    );
};




const TeachingPlan = ({ course }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.1 });
    const [expandedWeek, setExpandedWeek] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const toggleWeek = (weekIndex) => {
        setExpandedWeek(expandedWeek === weekIndex ? null : weekIndex);
    };

    const downloadBrochure = async () => {
        setIsDownloading(true);
        
        try {
          // Check if brochure exists and is a valid File/Blob
          if (!course.brochure) {
            toast.error("No brochure available for this course");
            return;
          }
      
          // Create a downloadable URL
          const url = window.URL.createObjectURL(course.brochure);
          
          // Create a temporary anchor tag
          const link = document.createElement('a');
          link.href = url;
          link.download = `UpSkillLab-${course.title}-Brochure.pdf`;
          link.style.display = 'none'; // Hide the link
          
          // Trigger download
          document.body.appendChild(link);
          link.click();
          
          // Cleanup (revoke URL after a short delay)
          setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
          }, 100);
          
          toast.success('Brochure downloaded successfully!');
        } catch (error) {
          console.error('Download failed:', error);
          toast.error('Failed to download brochure');
        } finally {
          setIsDownloading(false);
        }
      };


      
    // Your actual data structure
    const weeks = course.weeks;



    return (
        <div ref={ref} className="w-full py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Floating background elements */}
            <motion.div
                animate={{
                    y: [0, -40, 0],
                    x: [0, 30, 0]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 left-0 w-48 h-48 rounded-full bg-[#FF7426]/10 blur-xl"
            />
            <motion.div
                animate={{
                    y: [0, 50, 0],
                    x: [0, -20, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
                className="absolute bottom-1/3 right-0 w-56 h-56 rounded-full bg-[#4D2C5E]/10 blur-xl"
            />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Animated header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        className="text-4xl font-bold text-[#4D2C5E] mb-4 relative inline-block"
                    >
                        Teaching Plan
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="absolute bottom-0 left-0 w-full h-1 bg-[#FF7426] rounded-full"
                        />
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Comprehensive roadmap for your learning journey
                    </motion.p>
                </motion.div>

                {/* Accordion-style weeks */}
                <div className="space-y-6">
                    {weeks.map((week, index) => (
                        <div key={index} className="overflow-hidden">
                            {/* Week Header - Clickable */}
                            <motion.div
                                className="flex justify-between items-center p-6 bg-white rounded-xl shadow-lg border border-[#4D2C5E]/10 cursor-pointer group"
                                onClick={() => toggleWeek(index)}
                                whileHover={{
                                    y: -3,
                                    boxShadow: "0 10px 25px rgba(77, 44, 94, 0.1)"
                                }}
                                initial={{ y: 30, opacity: 0 }}
                                animate={isInView ? {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        delay: index * 0.15,
                                        type: "spring",
                                        stiffness: 100
                                    }
                                } : {}}
                            >
                                <div className="flex items-center gap-4">
                                    <motion.span
                                        whileHover={{ scale: 1.1 }}
                                        className="px-5 py-2 bg-[#4D2C5E] text-white rounded-full font-bold shadow-md"
                                    >
                                        {week.week}
                                    </motion.span>
                                    <h3 className="text-xl font-bold text-[#4D2C5E]">
                                        {week.sessions.length} {week.sessions.length > 1 ? "Sessions" : "Session"}
                                    </h3>
                                </div>
                                <motion.div
                                    animate={{
                                        rotate: expandedWeek === index ? 180 : 0,
                                        color: expandedWeek === index ? '#FF7426' : '#4D2C5E'
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="text-[#4D2C5E] group-hover:text-[#FF7426]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </motion.div>
                            </motion.div>

                            {/* Week Content - Animated */}
                            <AnimatePresence>
                                {expandedWeek === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: "auto",
                                            opacity: 1,
                                            transition: {
                                                height: { duration: 0.4 },
                                                opacity: { duration: 0.3, delay: 0.1 }
                                            }
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                            transition: {
                                                height: { duration: 0.3 },
                                                opacity: { duration: 0.2 }
                                            }
                                        }}
                                        className="bg-white rounded-b-xl shadow-lg border-x border-b border-[#4D2C5E]/10"
                                    >
                                        <div className="p-6 space-y-8">
                                            {week.sessions.map((session, sIndex) => (
                                                <motion.div
                                                    key={sIndex}
                                                    className="border-b border-[#4D2C5E]/10 pb-8 last:border-0 last:pb-0"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: sIndex * 0.1 + 0.2 }}
                                                >
                                                    <h4 className="text-xl font-semibold text-[#4D2C5E] mb-4 flex items-center">
                                                        <motion.span
                                                            className="w-4 h-4 bg-[#FF7426] rounded-full mr-3"
                                                            animate={{
                                                                scale: [1, 1.2, 1],
                                                                opacity: [0.7, 1, 0.7]
                                                            }}
                                                            transition={{
                                                                duration: 2,
                                                                repeat: Infinity,
                                                                delay: sIndex * 0.3
                                                            }}
                                                        />
                                                        {session.title}
                                                    </h4>
                                                    <ul className="space-y-3 pl-7">
                                                        {session.topics.map((topic, tIndex) => (
                                                            <motion.li
                                                                key={tIndex}
                                                                className="flex items-start"
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    x: 0,
                                                                    transition: {
                                                                        delay: tIndex * 0.05 + sIndex * 0.1,
                                                                        type: "spring",
                                                                        stiffness: 100
                                                                    }
                                                                }}
                                                                whileHover={{ x: 5 }}
                                                            >
                                                                <motion.span
                                                                    className="w-2 h-2 bg-[#FF7426] rounded-full mt-2 mr-3 flex-shrink-0"
                                                                    animate={{
                                                                        scale: [1, 1.3, 1],
                                                                        backgroundColor: ['#FF7426', '#4D2C5E', '#FF7426']
                                                                    }}
                                                                    transition={{
                                                                        duration: 4,
                                                                        repeat: Infinity,
                                                                        delay: tIndex * 0.2
                                                                    }}
                                                                />
                                                                <span className="text-gray-700">{topic}</span>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Download Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="text-center mt-16 flex justify-center items-center"
                >
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={downloadBrochure}
                      disabled={isDownloading}
                      className={`flex items-center gap-2 px-6 py-3 border-2 rounded-lg transition-all duration-200 ${
                        isDownloading
                          ? 'bg-gray-200 border-gray-300 text-gray-500 cursor-wait'
                          : 'bg-white border-[#4D2C5E] text-[#4D2C5E] hover:bg-[#4D2C5E]/10 shadow-sm hover:shadow-md cursor-pointer'
                      }`}
                    >
                      {isDownloading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#4D2C5E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download Brochure
                        </>
                      )}
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

const CareerDevelopmentTrack = ({ course }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    // Matching Pregrad's data structure
    const careerData = course.careerData || [
        {
            icon: <FiBriefcase className="text-4xl text-[#FF7426]" />,
            title: "Pregrad Career Assist",
            items: [
                "Mentoring from industry experts",
                "Career-specific resume tailoring",
                "1:1 career guidance sessions"
            ]
        },
        {
            icon: <FiAward className="text-4xl text-[#4D2C5E]" />,
            title: "Personal Branding",
            items: [
                "Build and showcase your skills in public",
                "Strategic LinkedIn profiling",
                "GitHub portfolio development"
            ]
        },
        {
            icon: <FiUsers className="text-4xl text-[#FF7426]" />,
            title: "Community Sessions",
            items: [
                "Strengthen communication skills",
                "Improve presentation techniques",
                "Group discussion practice"
            ]
        },
        {
            icon: <FiBarChart2 className="text-4xl text-[#4D2C5E]" />,
            title: "Interview Preparation",
            items: [
                "Mock interview sessions",
                "Group discussion simulations",
                "Art of salary negotiation"
            ]
        },
        {
            icon: <FiBook className="text-4xl text-[#FF7426]" />,  // Using FiBook for Masterclasses
            title: "Domain Workshops",
            items: [
                "Masterclasses from industry professionals",
                "HR interview preparation sessions",
                "Technical deep-dive workshops"
            ]
        },
        {
            icon: <FiFlag className="text-4xl text-[#4D2C5E]" />,  // Using FiFlag for Career Kick-start
            title: "Career Kick-start",
            items: [
                "Internship application assistance",
                "Freelance opportunity guidance",
                "Final year placement support"
            ]
        }
    ];
    return (
        <section
            ref={ref}
            className="w-full py-24 relative overflow-hidden"
            style={{ background: 'linear-gradient(to bottom, #F9F9FF 0%, #FFFFFF 100%)' }}
        >
            {/* Floating background elements */}
            <motion.div 
                animate={{
                    y: [0, -40, 0],
                    x: [0, 30, 0]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 left-0 w-48 h-48 rounded-full bg-[#FF7426]/10 blur-xl"
            />
            <motion.div 
                animate={{
                    y: [0, 50, 0],
                    x: [0, -20, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
                className="absolute bottom-1/3 right-0 w-56 h-56 rounded-full bg-[#4D2C5E]/10 blur-xl"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Animated header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <motion.h2
                        className="text-4xl font-bold text-[#4D2C5E] mb-4 relative inline-block"
                    >
                        Career Development Track
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="absolute bottom-0 left-0 w-full h-1.5 bg-[#FF7426] rounded-full"
                        />
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Comprehensive career support to launch your tech career
                    </motion.p>
                </motion.div>

                {/* Career cards grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ staggerChildren: 0.5, delayChildren: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-10"
                >
                    {careerData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 50, opacity: 0, rotate: 1 }}
                            animate={isInView ? { y: 0, opacity: 1, rotate: 0 } : {}}
                            transition={{ 
                                type: "spring",
                                stiffness: 100,
                                damping: 10,
                                delay: index * 0.15
                            }}
                            whileHover={{ 
                                y: -10,
                                boxShadow: "0 15px 30px rgba(77, 44, 94, 0.15)"
                            }}
                            className="relative group"
                        >
                            {/* Floating card background */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                                transition={{ delay: index * 0.15 + 0.3 }}
                                className="absolute -inset-2 rounded-xl bg-gradient-to-br from-[#FF7426]/10 to-[#4D2C5E]/10 opacity-0 group-hover:opacity-100 blur-md transition-all duration-300"
                            />
                            
                            {/* Main card */}
                            <motion.div
                                className="relative bg-white rounded-xl p-8 h-full border border-[#4D2C5E]/10 transition-all duration-300 group-hover:border-transparent group-hover:bg-white/95 z-10 shadow-lg"
                            >
                                <div className="flex flex-col items-center text-center h-full">
                                    {/* Animated icon */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
                                        transition={{ delay: index * 0.15 + 0.4 }}
                                        whileHover={{ 
                                            rotate: [0, 10, -5, 0],
                                            scale: [1, 1.1, 1.05, 1]
                                        }}
                                        className="w-20 h-20 rounded-full mb-6 flex items-center justify-center"
                                        style={{
                                            backgroundColor: `${index % 2 ? '#4D2C5E' : '#FF7426'}10`,
                                            color: index % 2 ? '#4D2C5E' : '#FF7426'
                                        }}
                                    >
                                        <div className="text-4xl">
                                            {item.icon}
                                        </div>
                                    </motion.div>

                                    <motion.h3
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={isInView ? { y: 0, opacity: 1 } : {}}
                                        transition={{ delay: index * 0.15 + 0.5 }}
                                        className="text-2xl font-bold text-[#4D2C5E] mb-6"
                                    >
                                        {item.title}
                                    </motion.h3>

                                    <motion.ul 
                                        initial={{ opacity: 0 }}
                                        animate={isInView ? { opacity: 1 } : {}}
                                        transition={{ staggerChildren: 0.1, delayChildren: index * 0.15 + 0.6 }}
                                        className="space-y-4 flex-1 w-full px-4"
                                    >
                                        {item.items.map((point, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={isInView ? { x: 0, opacity: 1 } : {}}
                                                transition={{ delay: index * 0.15 + 0.6 + i * 0.1 }}
                                                whileHover={{ x: 5 }}
                                                className="text-gray-700 flex items-start text-left"
                                            >
                                                <motion.span
                                                    className="w-3 h-3 rounded-full mt-1.5 mr-3 flex-shrink-0"
                                                    style={{ backgroundColor: index % 2 ? '#4D2C5E' : '#FF7426' }}
                                                    animate={{
                                                        scale: [1, 1.3, 1],
                                                        opacity: [0.7, 1, 0.7]
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        delay: i * 0.3
                                                    }}
                                                />
                                                <span>{point}</span>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>

    );
};

const PricingSection = (props) => {
    const [course, batchCode] = props.course;
    
    const [selectedCourse, setSelectedCourse] = useState(null);
      const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
      const handleEnrollClick = (course) => {
        setSelectedCourse(course);
        setIsEnrollModalOpen(true);
      };

      const handleEnrollSubmit = () => {
        // Handle enrollment logic here
        setIsEnrollModalOpen(false);
      };

    return (
        
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full py-24 relative overflow-hidden"
        >
            {/* Floating background elements */}
            <motion.div 
                animate={{
                    y: [0, -40, 0],
                    x: [0, 30, 0]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 left-0 w-48 h-48 rounded-full bg-[#FF7426]/10 blur-xl"
            />
            <motion.div 
                animate={{
                    y: [0, 50, 0],
                    x: [0, -20, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
                className="absolute bottom-1/3 right-0 w-56 h-56 rounded-full bg-[#4D2C5E]/10 blur-xl"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Left Side - Pricing Info */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className="lg:w-1/2"
                    >
                        <motion.h2
                            className="text-4xl font-bold text-[#4D2C5E] mb-8 relative inline-block"
                        >
                            Program Investment
                            <motion.span
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="absolute bottom-0 left-0 w-full h-1.5 bg-[#FF7426] rounded-full"
                            />
                        </motion.h2>

                        <div className="space-y-8">
                            <div className="flex items-baseline gap-4">
                                <motion.span
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-5xl font-bold text-[#4D2C5E]"
                                >
                                    ₹{course.discountedPrice?.toLocaleString('en-IN') || '20,060'}
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-gray-500"
                                >
                                    Including tax
                                </motion.span>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#4D2C5E]/10 shadow-sm"
                            >
                                <motion.div
                                    animate={{
                                        rotate: [0, 10, -5, 0],
                                        scale: [1, 1.1, 1.05, 1]
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        delay: 1
                                    }}
                                    className="p-2 bg-[#FF7426]/10 rounded-full text-[#FF7426] flex-shrink-0"
                                >
                                    <FiAlertCircle className="text-xl" />
                                </motion.div>
                                <p className="text-gray-600">
                                    (Non-refundable after 7 days of enrollment)
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                                    alt="Happy students" 
                                    className="rounded-xl shadow-lg w-full h-auto object-cover"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side - Payment Features */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="lg:w-1/2"
                    >
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="relative bg-white rounded-xl shadow-2xl border border-[#4D2C5E]/10 overflow-hidden"
                        >
                            {/* Decorative gradient overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="absolute inset-0 bg-gradient-to-br from-[#4D2C5E]/5 to-[#FF7426]/5 mix-blend-overlay"
                            />
                            
                            <div className="relative z-10 p-8">
                                <motion.h3
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-2xl font-bold text-[#4D2C5E] mb-8"
                                >
                                    What's Included
                                </motion.h3>

                                <motion.ul
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ staggerChildren: 0.1, delayChildren: 0.7 }}
                                    className="space-y-6"
                                >
                                    {[
                                        {
                                            icon: <FiMonitor />,
                                            text: "Live Learning delivered by Industry veterans",
                                            color: "#FF7426"
                                        },
                                        {
                                            icon: <FiFilm />,
                                            text: "Session recordings & backup",
                                            color: "#4D2C5E"
                                        },
                                        {
                                            icon: <FiCode />,
                                            text: "Hands-on projects & challenges",
                                            color: "#FF7426"
                                        },
                                        {
                                            icon: <FiAward />,
                                            text: "Global Certifications",
                                            color: "#4D2C5E"
                                        },
                                        {
                                            icon: <FiBriefcase />,
                                            text: "Access to Career Assist cell*",
                                            color: "#FF7426"
                                        }
                                    ].map((item, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ x: 20, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.7 + index * 0.1 }}
                                            whileHover={{ x: 5 }}
                                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#4D2C5E]/5 transition-colors"
                                        >
                                            <motion.div
                                                animate={{ 
                                                    rotate: [0, 10, 0],
                                                    scale: [1, 1.1, 1]
                                                }}
                                                transition={{ 
                                                    duration: 6, 
                                                    repeat: Infinity,
                                                    delay: index * 0.5
                                                }}
                                                className={`p-3 rounded-full ${index % 2 ? 'bg-[#FF7426]/10 text-[#FF7426]' : 'bg-[#4D2C5E]/10 text-[#4D2C5E]'}`}
                                            >
                                                {item.icon}
                                            </motion.div>
                                            <span className="text-gray-700">{item.text}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                    className="mt-10 pt-8 border-t border-[#4D2C5E]/10"
                                >
                                    <h4 className="text-sm font-medium text-gray-500 mb-4">Secure Payment</h4>
                                    
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                                        <div className="flex items-center">
                                            <img 
                                                src="images/Cashfree Payments.png" 
                                                alt="Cashfree" 
                                                className="w-25 opacity-100 hover:opacity-100 transition-opacity" 
                                            />
                                        </div>
                                        
                                        <motion.button
                                         onClick={() => handleEnrollClick(course)}
                                            whileHover={{ 
                                                scale: 1.05,
                                                boxShadow: "0 10px 25px rgba(255, 116, 38, 0.4)"
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full sm:w-auto bg-gradient-to-r from-[#FF7426] to-[#FF9E5E] text-white font-bold py-4 px-8 rounded-lg shadow-lg relative overflow-hidden group"
                                        >
                                            <span className="relative z-10">ENROLL NOW</span>
                                            <motion.span
                                                initial={{ x: '-100%' }}
                                                whileHover={{ x: '0%' }}
                                                transition={{ duration: 0.4 }}
                                                className="absolute inset-0 bg-[#E65100] z-0"
                                            />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="mt-8"
                        >
                            <NavLink to='/ContactUs'>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-3 px-6 py-4 bg-[#4D2C5E] text-white rounded-lg font-medium w-full justify-center shadow-md hover:shadow-lg transition-all"
                            >
                                <FiMessageSquare className="text-xl" />
                                <span>Connect with counselor</span>
                            </motion.button>
                            </NavLink>
                        </motion.div>
                    </motion.div>
                </div>
            </div>


            {selectedCourse && (
        <PurchaseModal
          course={selectedCourse}
          batchCode={batchCode}
          isOpen={isEnrollModalOpen}
          onClose={() => setIsEnrollModalOpen(false)}
          onEnroll={handleEnrollSubmit}
        />
      )}
        </motion.div>
    );
};

import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';
import { getDataHandler } from '../../config/services';

const FAQSection = ({ course }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = course.faqs || [
        {
            category: "Admissions",
            questions: [
                {
                    q: "What are the eligibility criteria for this program?",
                    a: "The program is open to anyone with basic programming knowledge. Beginners are welcome as we start with fundamentals."
                },
                {
                    q: "Is there an admission test?",
                    a: "No admission test, but we recommend completing our free prep materials before starting."
                }
            ]
        },
        {
            category: "Curriculum",
            questions: [
                {
                    q: "Can I access the recordings after course completion?",
                    a: "Yes, you get lifetime access to all course materials including session recordings."
                },
                {
                    q: "How many hours per week should I dedicate?",
                    a: "We recommend 8-10 hours/week including live sessions and self-study."
                }
            ]
        },
        {
            category: "Payments",
            questions: [
                {
                    q: "What payment methods do you accept?",
                    a: "We accept credit/debit cards, UPI, net banking, and EMI options through Razorpay."
                },
                {
                    q: "Can I get a refund if I withdraw?",
                    a: "Full refund within 7 days of enrollment. No refunds after project work begins."
                }
            ]
        }
    ];

    const toggleQuestion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="w-full py-24 relative overflow-hidden bg-gradient-to-b from-white to-[#F9F9FF]">
      {/* Floating background elements */}
      <motion.div 
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-0 w-48 h-48 rounded-full bg-[#FF7426]/10 blur-xl"
      />
      <motion.div 
        animate={{
          y: [0, 50, 0],
          x: [0, -20, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
        className="absolute bottom-1/3 right-0 w-56 h-56 rounded-full bg-[#4D2C5E]/10 blur-xl"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl font-bold text-[#4D2C5E] mb-4 relative inline-block"
          >
            Frequently Asked Questions
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute bottom-0 left-0 w-full h-1.5 bg-[#FF7426] rounded-full"
            />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-600"
          >
            Find answers to common questions about our program
          </motion.p>
        </motion.div>

        {/* FAQ Sections */}
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
  className="space-y-10"
>
  {faqs.map((faq, index) => (
    <motion.div
      key={index}
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.15 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="divide-y divide-[#4D2C5E]/10">
        <div className="overflow-hidden">
          <motion.button
            onClick={() => toggleQuestion(index.toString())}
            whileHover={{ backgroundColor: "#4D2C5E/5" }}
            className="w-full flex justify-between items-center p-6 text-left transition-all"
          >
            <span className="font-medium text-lg text-[#4D2C5E]">
              {faq.question}
            </span>
            <motion.div
              animate={{ 
                rotate: activeIndex === index.toString() ? 180 : 0,
                color: activeIndex === index.toString() ? '#FF7426' : '#4D2C5E'
              }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown className="text-xl" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {activeIndex === index.toString() && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: 'auto', 
                  opacity: 1,
                  transition: {
                    height: { duration: 0.3 },
                    opacity: { duration: 0.2, delay: 0.1 }
                  }
                }}
                exit={{ 
                  height: 0, 
                  opacity: 0,
                  transition: {
                    height: { duration: 0.3 },
                    opacity: { duration: 0.1 }
                  }
                }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 text-gray-700">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  ))}
</motion.div>

        {/* Additional Help CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-gray-600 mb-6 text-lg"
          >
            Still have questions?
          </motion.p>
          <NavLink to="/ContactUs">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(255, 116, 38, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF7426] to-[#FF9E5E] text-white font-bold rounded-xl text-lg shadow-lg relative overflow-hidden group"
          >
            <FiMessageSquare className="mr-3 text-xl" />
            <span className="relative z-10">Contact Support</span>
            <motion.span
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-[#E65100] z-0"
            />
          </motion.button>
          </NavLink>
        </motion.div>
      </div>
    </div>
    );
};


const CourseDetails = () => {
      
    const [course, setCourse] = useState(null);
  const location = useLocation();
  const courseId = location.state?.courseId;
  const courseCode = location.state?.courseCode;
  const batchId = location.state?.batchId;
  const batchCode = location.state?.batchCode;
  useEffect(() => {
    if (!courseCode) {
      // Handle case where courseId isn't passed
      console.error("No course Code found in navigation state");
      // Optionally redirect back or to a fallback page
    }else{
        const fetchCourse = async () => {     
            // Get the endpoint URL by calling the ApiConfig function
            const endpointUrl = ApiConfig.getCourseByCode(courseCode);
            
            const response = await getDataHandler(endpointUrl, null, null,true); // pass endpointUrl directly
            
            setCourse(response);
          };
        fetchCourse();
    }
}, [courseCode]);
  console.log(courseId,courseCode,batchId,batchCode)
if (!course) return <div>Loding</div>;


    return (
        <div>
            <CourseHero course={course} />
            <CourseKeyDetails course={course} />
            <ProgramInfoWithEnroll course={[course,batchId]} />
            <TeachingPlan course={course} />
            <CareerDevelopmentTrack course={course} />
            <PricingSection course={[course,batchId]} />
            <FAQSection course={course} />
            {/* Add other components here */}

            

        </div>
    );
};

export default CourseDetails;