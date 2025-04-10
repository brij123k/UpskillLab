import React, { useRef, useState,useEffect  } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiDownload, FiHelpCircle  ,FiFilm, FiCode} from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { FiClock, FiMonitor, FiCalendar, FiBook } from 'react-icons/fi';
import { FiUsers, FiAlertCircle, FiMessageSquare } from 'react-icons/fi';
import { FiAward, FiBriefcase, FiCheck , FiTrendingUp } from 'react-icons/fi';
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
                                {course?.title}
                            </motion.h1>
                        </div>

                        <div className="overflow-hidden">
                            <motion.p
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-xl text-gray-700"
                            >
                                {course?.shortDescription? course?.shortDescription : "Master React, Node.js, and MongoDB to build scalable web applications." }
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
    const formatDuration = (days) => {
        if (!days || isNaN(days)) return "6 months";
        
        const daysNum = parseInt(days);
        
        // Years (with half-year precision)
        if (daysNum >= 180) { // 6 months = 0.5 year
          const years = (daysNum / 365).toFixed(1);
          return `${years % 1 === 0 ? Math.floor(years) : years} ${years == 1 ? 'year' : 'years'}`;
        }
        // Months (with half-month precision)
        else if (daysNum >= 15) { // 2 weeks = ~0.5 month
          const months = (daysNum / 30).toFixed(1);
          return `${months % 1 === 0 ? Math.floor(months) : months} ${months == 1 ? 'month' : 'months'}`;
        }
        // Weeks (with half-week precision)
        else if (daysNum >= 4) {
          const weeks = (daysNum / 7).toFixed(1);
          return `${weeks % 1 === 0 ? Math.floor(weeks) : weeks} ${weeks == 1 ? 'week' : 'weeks'}`;
        }
        else {
          return `${daysNum} ${daysNum === 1 ? 'day' : 'days'}`;
        }
      };

    const details = [
        {
            icon: <FiClock />,
            label: "DURATION",
            value: course.duration ? formatDuration(course.duration) : "6 months",
            accent: "#FF7426",
            bg: "#4D2C5E"
        },
        {
            icon: <FiMonitor />,
            label: "MODE",
            value: course.courseMode
  ? course.courseMode === "LIVE_ONLINE"
    ? "Live-Online"
    : course.courseMode === "OFFLINE"
      ? "Offline"
      : "Online"
  : "Online",

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
            value: course?.startDate
  ? new Date(course.startDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  : "Coming Soon",

            accent: "#4D2C5E",
            bg: "#FF7426"
        },
    ];

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-[#FDF8EE] to-[#FFF5E6]"
    >
        {/* Floating background elements - enhanced with more color */}
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
            className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-[#FF7426]/20 to-[#FF9E26]/20 blur-xl"
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
            className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-[#4D2C5E]/20 to-[#8A3FFC]/20 blur-xl"
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
                        {/* Enhanced card background with gradient */}
                        <motion.div
                            initial={{ rotate: 0 }}
                            whileHover={{ rotate: 2 }}
                            className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-20"
                            style={{
                                background: `linear-gradient(135deg, ${item.bg} 0%, ${item.accent} 100%)`,
                                filter: 'blur(8px)'
                            }}
                        />
    
                        {/* Main card with enhanced glow effect */}
                        <motion.div
                            whileHover={{
                                boxShadow: `0 20px 40px ${item.accent}40`
                            }}
                            className="relative bg-white rounded-xl p-8 h-full border border-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                            style={{
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(4px)'
                            }}
                        >
                            {/* Animated icon with enhanced glow */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.15 + 0.3 }}
                                whileHover={{
                                    rotate: 15,
                                    scale: 1.1
                                }}
                                className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center mx-auto shadow-lg"
                                style={{
                                    background: `linear-gradient(135deg, ${item.accent}10 0%, ${item.accent}30 100%)`,
                                    color: item.accent,
                                    boxShadow: `0 0 20px ${item.accent}30`
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
                                style={{ 
                                    color: item.accent,
                                    textShadow: `0 2px 10px ${item.accent}20`
                                }}
                            >
                                {item.value}
                            </motion.p>
    
                            {/* Enhanced animated underline */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileHover={{ width: "50%" }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="h-1.5 mt-4 mx-auto rounded-full"
                                style={{ 
                                    backgroundColor: item.accent,
                                    boxShadow: `0 0 10px ${item.accent}`
                                }}
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    </motion.div>
    );
};

const ProgramInfoWithEnroll = ({ course }) => {
    const batchCode=course.batchId;
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
      onClose={() => {setIsEnrollModalOpen(false); setSelectedCourse(null)}}
      onEnroll={handleEnrollSubmit}
    />
  )}
   </motion.div>
    );
};




const TeachingPlan = ({ course }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.1 });
    const [expandedWeek, setExpandedWeek] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const toggleWeek = (weekIndex) => {
        setExpandedWeek(expandedWeek === weekIndex ? null : weekIndex);
    };

    const downloadBrochure = () => {
        if (!course?.brochure) {
          window.alert("No brochure available for this course");
          return;
        }
      
        // Create a direct link and let browser handle it
        const link = document.createElement("a");
        link.href = course.brochure;
        link.setAttribute("download", ""); // Hint browser to download
        link.setAttribute("target", "_blank"); // Optional: opens in new tab
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                    duration: 4,
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
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.1 // Reduced from 0.2
                }}
                className="absolute bottom-1/3 right-0 w-56 h-56 rounded-full bg-[#4D2C5E]/10 blur-xl"
            />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Animated header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.15 }} // Reduced from 0.2
                    className="text-center mb-12" // Reduced mb-16 to mb-12
                >
                    <motion.h2
                        className="text-4xl font-bold text-[#4D2C5E] mb-4 relative inline-block"
                    >
                        Teaching Plan
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ delay: 0.1, duration: 0.3 }} // Reduced delays
                            className="absolute bottom-0 left-0 w-full h-1 bg-[#FF7426] rounded-full"
                        />
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.15 }} // Reduced from 0.3
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Comprehensive roadmap for your learning journey
                    </motion.p>
                </motion.div>

                {/* Accordion-style weeks */}
                <div className="space-y-4"> {/* Reduced space-y-6 to space-y-4 */}
                    {weeks.map((week, index) => (
                        <div key={index} className="overflow-hidden">
                            {/* Week Header - Clickable */}
                            <motion.div
                                className="flex justify-between items-center p-5 bg-white rounded-xl shadow-lg border border-[#4D2C5E]/10 cursor-pointer group" // Reduced p-6 to p-5
                                onClick={() => toggleWeek(index)}
                                whileHover={{
                                    y: -2, // Reduced from -3
                                    boxShadow: "0 8px 20px rgba(77, 44, 94, 0.1)" // Reduced shadow
                                }}
                                initial={{ y: 20, opacity: 0 }} // Reduced y from 30
                                animate={isInView ? {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        delay: index * 0.2, // Reduced from 0.5
                                        type: "spring",
                                        stiffness: 150, // Increased stiffness
                                        damping: 10
                                    }
                                } : {}}
                            >
                                <div className="flex items-center gap-3"> {/* Reduced gap-4 to gap-3 */}
                                    <motion.span
                                        whileHover={{ scale: 1.05 }} // Reduced from 1.1
                                        className="px-4 py-1.5 bg-[#4D2C5E] text-white rounded-full font-bold shadow-md" // Reduced padding
                                    >
                                        {week.week}
                                    </motion.span>
                                    <h3 className="text-lg font-bold text-[#4D2C5E]"> {/* Reduced text-xl to text-lg */}
                                        {week.sessions.length} {week.sessions.length > 1 ? "Sessions" : "Session"}
                                    </h3>
                                </div>
                                <motion.div
                                    animate={{
                                        rotate: expandedWeek === index ? 180 : 0,
                                        color: expandedWeek === index ? '#FF7426' : '#4D2C5E'
                                    }}
                                    transition={{ duration: 0.2 }} // Reduced from 0.3
                                    className="text-[#4D2C5E] group-hover:text-[#FF7426]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5" // Reduced from h-6 w-6
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
                                                height: { duration: 0.15 }, // Reduced from 0.2
                                                opacity: { duration: 0.1 } // Removed delay
                                            }
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                            transition: {
                                                height: { duration: 0.15 }, // Reduced from 0.2
                                                opacity: { duration: 0.1 }
                                            }
                                        }}
                                        className="bg-white rounded-b-xl shadow-lg border-x border-b border-[#4D2C5E]/10"
                                    >
                                        <div className="p-5 space-y-6"> {/* Reduced p-6 to p-5 */}
                                            {week.sessions.map((session, sIndex) => (
                                                <motion.div
                                                    key={sIndex}
                                                    className="border-b border-[#4D2C5E]/10 pb-6 last:border-0 last:pb-0" // Reduced pb-8 to pb-6
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: sIndex * 0.05 + 0.1 }} // Reduced delays
                                                >
                                                    <h4 className="text-lg font-semibold text-[#4D2C5E] mb-3 flex items-center"> {/* Reduced text-xl to text-lg */}
                                                        <motion.span
                                                            className="w-3 h-3 bg-[#FF7426] rounded-full mr-2" // Reduced size
                                                            animate={{
                                                                scale: [1, 1.1, 1], // Reduced scale
                                                                opacity: [0.7, 1, 0.7]
                                                            }}
                                                            transition={{
                                                                duration: 1.5, // Reduced from 2
                                                                repeat: Infinity,
                                                                delay: sIndex * 0.15 // Reduced from 0.3
                                                            }}
                                                        />
                                                        {session.title}
                                                    </h4>
                                                    <ul className="space-y-2 pl-5"> {/* Reduced space-y-3 to space-y-2 */}
                                                        {session.topics.map((topic, tIndex) => (
                                                            <motion.li
                                                                key={tIndex}
                                                                className="flex items-start"
                                                                initial={{ opacity: 0, x: -10 }} // Reduced x from -20
                                                                animate={{
                                                                    opacity: 1,
                                                                    x: 0,
                                                                    transition: {
                                                                        delay: tIndex * 0.01 + sIndex * 0.05, // Reduced delays
                                                                        type: "spring",
                                                                        stiffness: 150 // Increased stiffness
                                                                    }
                                                                }}
                                                                whileHover={{ x: 3 }} // Reduced from 5
                                                            >
                                                                <motion.span
                                                                    className="w-1.5 h-1.5 bg-[#FF7426] rounded-full mt-2 mr-2 flex-shrink-0" // Reduced size
                                                                    animate={{
                                                                        scale: [1, 1.1, 1], // Reduced scale
                                                                        backgroundColor: ['#FF7426', '#4D2C5E', '#FF7426']
                                                                    }}
                                                                    transition={{
                                                                        duration: 3, // Reduced from 4
                                                                        repeat: Infinity,
                                                                        delay: tIndex * 0.1 // Reduced from 0.2
                                                                    }}
                                                                />
                                                                <span className="text-gray-700 text-sm"> {/* Added text-sm */}
                                                                    {topic}
                                                                </span>
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
                    initial={{ opacity: 0, y: 20 }} // Reduced y from 30
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }} // Reduced from 0.2
                    className="text-center mt-12 flex justify-center items-center" // Reduced mt-16 to mt-12
                >
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }} // Reduced from 1.03
                      whileTap={{ scale: 0.98 }}
                      onClick={downloadBrochure}
                      disabled={isDownloading}
                      className={`flex items-center gap-2 px-5 py-2.5 border-2 rounded-lg transition-all duration-200 ${
                        isDownloading
                          ? 'bg-gray-200 border-gray-300 text-gray-500 cursor-wait'
                          : 'bg-white border-[#4D2C5E] text-[#4D2C5E] hover:bg-[#4D2C5E]/10 shadow-sm hover:shadow-md cursor-pointer'
                      }`}
                    >
                      {isDownloading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#4D2C5E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="w-full py-10 relative overflow-hidden"
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


// Add this component after the CareerDevelopmentTrack section in your CourseDetails.js
const CertificateSection = ({ course }) => {
    const [certificateImage, setCertificateImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                setIsLoading(true);
                setCertificateImage(course.certificateImage || "/images/SAMPLE CERTIFICATE.jpg");
            } catch (error) {
                console.error("Failed to load certificate:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCertificate();
    }, [course.id]);

    return (
        <section
            ref={ref}
            className="w-full py-10 relative overflow-hidden bg-gradient-to-b from-[#F9F9FF] to-white"
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
                    className="text-center mb-16"
                >
                    <motion.h2
                        className="text-4xl font-bold text-[#4D2C5E] mb-4 relative inline-block"
                    >
                        Your Achievement
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
                        Earn a recognized certificate upon successful completion
                    </motion.p>
                </motion.div>

                {/* Certificate Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col lg:flex-row gap-12 items-center"
                >
                    {/* Certificate Image */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="lg:w-1/2 bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-white cursor-pointer"
                    >
                        {isLoading ? (
                            <div className="w-full aspect-[4/3] flex items-center justify-center bg-gray-100">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF7426]"></div>
                            </div>
                        ) : (
                            <img
                                src={certificateImage}
                                alt="Sample Certificate"
                                className="w-full h-auto object-contain"
                            />
                        )}
                    </motion.div>

                    {/* Certificate Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 }}
                        className="lg:w-1/3 space-y-6"
                    >
                        <motion.h3
                            className="text-2xl font-bold text-[#4D2C5E]"
                        >
                            Program Certificate
                        </motion.h3>

                        <motion.ul
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ staggerChildren: 0.1, delayChildren: 0.7 }}
                            className="space-y-4"
                        >
                            {[
                                "Industry-recognized certification",
                                "Digital and printable format",
                                "Verification QR code",
                                "Skills validation for employers",
                                "Shareable on LinkedIn"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                    className="flex items-start gap-3"
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
                                        className={`p-2 rounded-full ${index % 2 ? 'bg-[#FF7426]/10 text-[#FF7426]' : 'bg-[#4D2C5E]/10 text-[#4D2C5E]'}`}
                                    >
                                        <FiCheck className="text-xl" />
                                    </motion.div>
                                    <span className="text-gray-700">{item}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};


const PricingSection = ({ course }) => {
    const batchCode=course.batchId;
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
            className="w-full py-10 relative overflow-hidden"
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
          onClose={() => {setIsEnrollModalOpen(false); setSelectedCourse(null)}}
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

    // Color variations for different categories
    const categoryColors = {
        "Admissions": { accent: "#FF7426", bg: "bg-[#FF7426]/5" },
        "Curriculum": { accent: "#4D2C5E", bg: "bg-[#4D2C5E]/5" },
        "Payments": { accent: "#2C8E5E", bg: "bg-[#2C8E5E]/5" }
    };

    return (
        <div className="w-full py-16 relative overflow-hidden bg-[#FDF8EE]">
            {/* Subtle floating elements */}
            <motion.div 
                animate={{
                    y: [0, -40, 0],
                    x: [0, 30, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 left-0 w-48 h-48 rounded-full bg-[#FF7426]/5 blur-xl"
            />
            <motion.div 
                animate={{
                    y: [0, 50, 0],
                    x: [0, -20, 0]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute bottom-1/3 right-0 w-56 h-56 rounded-full bg-[#4D2C5E]/5 blur-xl"
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header with animated underline */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-12"
                >
                    <motion.h2
                        className="text-3xl font-bold text-[#4D2C5E] mb-4 relative inline-block"
                    >
                        Frequently Asked Questions
                        <motion.span
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="absolute bottom-0 left-0 w-full h-1 bg-[#FF7426] rounded-full"
                        />
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-gray-600"
                    >
                        Find answers to common questions about our program
                    </motion.p>
                </motion.div>

                {/* FAQ Cards */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid gap-6"
                >
                    {faqs.map((faq, index) => {
                        const colors = categoryColors[faq.category] || categoryColors["Admissions"];
                        return (
                            <motion.div
                                key={index}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                            >
                                {/* Colored decoration */}
                                <motion.div
                                    className={`absolute -inset-1 rounded-xl ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                />
                                
                                {/* White card */}
                                <motion.div
                                    whileHover={{ 
                                        y: -3,
                                        boxShadow: `0 10px 30px ${colors.accent}20`
                                    }}
                                    className="relative bg-white rounded-xl p-6 border border-gray-100 shadow-sm overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleQuestion(index.toString())}
                                        className="w-full flex justify-between items-center text-left gap-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Colored icon circle */}
                                            <motion.div
                                                className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors.bg}`}
                                                whileHover={{ rotate: 10 }}
                                            >
                                                <FiHelpCircle className={`text-xl ${colors.accent ? `text-[${colors.accent}]` : ''}`} />
                                            </motion.div>
                                            
                                            <span className="font-semibold text-gray-800">
                                                {faq.question}
                                            </span>
                                        </div>
                                        <motion.div
                                            animate={{ 
                                                rotate: activeIndex === index.toString() ? 180 : 0,
                                                color: activeIndex === index.toString() ? colors.accent : '#6B7280'
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <FiChevronDown className="text-xl" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {activeIndex === index.toString() && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ 
                                                    height: 'auto', 
                                                    opacity: 1,
                                                    transition: {
                                                        height: { duration: 0.2 },
                                                        opacity: { duration: 0.1 }
                                                    }
                                                }}
                                                exit={{ 
                                                    height: 0, 
                                                    opacity: 0,
                                                    transition: {
                                                        height: { duration: 0.2 },
                                                        opacity: { duration: 0.1 }
                                                    }
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-4 pl-16 text-gray-600">
                                                    {faq.answer}
                                                </div>
                                                {/* Animated underline */}
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ delay: 0.1 }}
                                                    className="h-0.5 mt-4 bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-600 mb-6"
                    >
                        Still have questions?
                    </motion.p>
                    <NavLink to="/ContactUs">
                        <motion.button
                            whileHover={{ 
                                scale: 1.03,
                                boxShadow: "0 10px 25px rgba(255, 116, 38, 0.3)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center px-8 py-3.5 bg-white border-2 border-[#FF7426] text-[#FF7426] font-bold rounded-xl text-lg shadow-sm hover:shadow-md transition-all"
                        >
                            <FiMessageSquare className="mr-3" />
                            Contact Support
                            {/* Hover effect */}
                            <motion.span
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF7426] rounded-full"
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
  const [directCourse,setDirectCourse]=useState(null)
  const [directBatch,setDirectBatch]=useState(null)
  const location = useLocation();
  const courseId = location.state?.courseId;
  const courseCode = location.state?.courseCode;
  const batchId = location.state?.batchId;
  const batchCode = location.state?.batchCode;
  const { id } = useParams();
  const type = window.location.pathname.includes('/batch/') ? 'batch' : 'course';

  useEffect(() => {
    if (type === 'course') {
        fetchCourse(id)
    } else if (type === 'batch') {
        fetchBtachCourse(id)
    }
  }, [type, id]);

  const fetchCourse = async (courseCode) => {     
    // Get the endpoint URL by calling the ApiConfig function
    const endpointUrl = ApiConfig.getCourseByCode(courseCode);
    
    const response = await getDataHandler(endpointUrl, null, null,true); // pass endpointUrl directly
    let custemDataSet={
        id:response._id,
        batchId:response.batch._id,
        title:response.courseName,
        imageUrl:response.courseImage,
        batchCode:response.batch.batchCode,
        shortDescription:response.shortDescription,
        tags:response.tags,
        youtubeUrl:response.youtubeUrl,
        duration:response.courseDuration,
        startDate:response.batch.startDate,
        programDetails:response.programDetails,
        targetAudience:response.targetAudience,
        weeks:response.weeks,
        brochure:response.brochure,
        courseMode:response.courseMode,
        discountedPrice:response.discountedPrice,
        originalPrice:response.originalPrice,
        faqs:response.faqs
    }
    setCourse(custemDataSet);
  };
  const fetchBtachCourse = async (id) => {     
    // Get the endpoint URL by calling the ApiConfig function
    const endpointUrl = ApiConfig.courseByBatchId(id);
    const res = await getDataHandler(endpointUrl, null, null,true); // pass endpointUrl directly
    const response = res.batch
    const endpointUrl2 = ApiConfig.getCourseByCode(response.course.courseCode);
    const res2 = await getDataHandler(endpointUrl2, null, null,true);
    let custemDataSet={
        id:response._id,
        batchId:response._id,
        title:res2.courseName,
        batchCode:response.batchCode,
        shortDescription:res2.shortDescription,
        tags:res2.tags,
        imageUrl:res2.courseImage,
        youtubeUrl:res2.youtubeUrl,
        duration:res2.courseDuration,
        startDate:response.startDate,
        programDetails:res2.programDetails,
        targetAudience:res2.targetAudience,
        weeks:res2.weeks,
        courseMode:res2.courseMode,
        brochure:res2.brochure,
        discountedPrice:res2.discountedPrice,
        originalPrice:res2.originalPrice,
        faqs:res2.faqs
    }
    setCourse(custemDataSet);
  };


   // Timeout component
   const TimeoutMessage = ({ delay }) => {
    const [showMessage, setShowMessage] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowMessage(true);
      }, delay);
  
      return () => clearTimeout(timer);
    }, [delay]);
  
    if (!showMessage) return null;
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 p-4 bg-white rounded-lg shadow-md text-center"
      >
        <div className="text-[#FF7426] mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#4D2C5E] mb-1">
          No Batch Found
        </h3>
        <p className="text-gray-600">
          We couldn't find any available batches for this course.
        </p>
      </motion.div>
    );
  };

  
  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF8EE] p-4">
        <motion.div
          initial={{ rotate: 0, scale: 0.8 }}
          animate={{ 
            rotate: 360,
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-20 h-20 mb-6"
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-[#4D2C5E]/20"
            animate={{
              borderWidth: [4, 8, 4],
              borderColor: ["#4D2C5E/20", "#FF7426/50", "#4D2C5E/20"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
          
          {/* Inner spinner */}
          <motion.div
            className="absolute inset-2 rounded-full border-t-4 border-r-4 border-transparent"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Center dot */}
          <motion.div
            className="absolute inset-6 rounded-full bg-[#4D2C5E]"
            animate={{
              scale: [1, 1.2, 1],
              backgroundColor: ["#4D2C5E", "#FF7426", "#4D2C5E"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        </motion.div>
  
        <motion.p
          className="text-[#4D2C5E] text-lg font-medium text-center max-w-md"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          Loading course details...
        </motion.p>
  
        {/* Timeout message after 15 seconds */}
        <TimeoutMessage delay={15000} />
      </div>
    );
  }
  
 


    return (
        <div>
            <CourseHero course={course} />
            <CourseKeyDetails course={course} />
            <ProgramInfoWithEnroll course={course} />
            <TeachingPlan course={course} />
            <CareerDevelopmentTrack course={course} />
            <CertificateSection course={course} />
            <PricingSection course={course} />
            <FAQSection course={course} />
            {/* Add other components here */}

            

        </div>
    );
};

export default CourseDetails;