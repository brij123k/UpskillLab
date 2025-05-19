import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiDownload, FiHelpCircle, FiFilm, FiCode } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { FiClock, FiMonitor, FiCalendar, FiBook } from 'react-icons/fi';
import { FiUsers, FiAlertCircle, FiMessageSquare, FiCompass, FiDollarSign } from 'react-icons/fi';
import { FiAward, FiBriefcase, FiCheck, FiTrendingUp } from 'react-icons/fi';
import PurchaseModal from '../../components/Modal/EnrollmentModal';
import { FiFlag } from 'react-icons/fi';
import { FiBarChart2, FiGlobe } from 'react-icons/fi';
import ApiConfig from '../../config/apiConfig';
import { toast } from "react-toastify";
import AdmissionFormModal from '../../components/Modal/BasicEnrollNowModal';

import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';
import { getDataHandler } from '../../config/services';
// import RazorpayLogo from '../assets/razorpay-logo.svg'; // Replace with actual import
// const CourseHero = ({ course }) => {

//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="relative w-full overflow-hidden py-16 px-4 sm:px-6 lg:px-8"
//         >
//             {/* Animated background elements */}
//             <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 0.1 }}
//                 transition={{ duration: 1.5, delay: 0.3 }}
//                 className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#FF7426] blur-3xl"
//             />
//             <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 0.1 }}
//                 transition={{ duration: 1.5, delay: 0.5 }}
//                 className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#4D2C5E] blur-3xl"
//             />

//             <div className="max-w-7xl mx-auto relative z-10">
//                 <div className="flex flex-col lg:flex-row gap-12 items-center">
//                     {/* Left Side - Text Content */}
//                     <div className="lg:w-1/2 space-y-8">
//                         <div className="overflow-hidden">
//                             <motion.h1
//                                 initial={{ y: 50, opacity: 0 }}
//                                 animate={{ y: 0, opacity: 1 }}
//                                 transition={{ duration: 0.8, ease: "backOut" }}
//                                 className="text-4xl md:text-6xl font-bold text-[#4D2C5E] leading-tight"
//                             >
//                                 {course?.title}
//                             </motion.h1>
//                         </div>

//                         <div className="overflow-hidden">
//                             <motion.p
//                                 initial={{ y: 30, opacity: 0 }}
//                                 animate={{ y: 0, opacity: 1 }}
//                                 transition={{ duration: 0.6, delay: 0.3 }}
//                                 className="text-xl text-gray-700"
//                             >
//                                 {course?.shortDescription ? course?.shortDescription : "Master React, Node.js, and MongoDB to build scalable web applications."}
//                             </motion.p>
//                         </div>

//                         {/* Animated Tags */}
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
//                             className="flex flex-wrap gap-3 mt-6"
//                         >
//                             {course?.tags?.length > 0 ? (
//                                 course.tags.map((tag, index) => (
//                                     <motion.span
//                                         key={index}
//                                         initial={{ y: 20, opacity: 0 }}
//                                         animate={{ y: 0, opacity: 1 }}
//                                         whileHover={{
//                                             scale: 1.1,
//                                             backgroundColor: '#4D2C5E',
//                                             color: 'white',
//                                             boxShadow: '0 4px 12px rgba(77, 44, 94, 0.3)'
//                                         }}
//                                         className="px-4 py-2 bg-white text-[#4D2C5E] rounded-full text-sm font-medium border border-[#4D2C5E]/20 shadow-sm cursor-default"
//                                     >
//                                         {tag}
//                                     </motion.span>
//                                 ))
//                             ) : (
//                                 <motion.span
//                                     initial={{ y: 20, opacity: 0 }}
//                                     animate={{ y: 0, opacity: 1 }}
//                                     whileHover={{
//                                         scale: 1.1,
//                                         backgroundColor: '#4D2C5E',
//                                         color: 'white',
//                                         boxShadow: '0 4px 12px rgba(77, 44, 94, 0.3)'
//                                     }}
//                                     className="px-4 py-2 bg-white text-[#4D2C5E] rounded-full text-sm font-medium border border-[#4D2C5E]/20 shadow-sm cursor-default"
//                                 >
//                                     No tags available
//                                 </motion.span>
//                             )}
//                         </motion.div>
//                     </div>

//                     {/* Right Side - Video with Floating Animation */}
//                     <motion.div
//                         initial={{ x: 100, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ duration: 0.8, delay: 0.4 }}
//                         className="lg:w-1/2 w-full aspect-video rounded-3xl overflow-hidden shadow-2xl relative"
//                     >
//                         {/* Floating animation container */}
//                         <motion.div
//                             animate={{
//                                 y: [0, -15, 0],
//                             }}
//                             transition={{
//                                 duration: 6,
//                                 repeat: Infinity,
//                                 ease: "easeInOut"
//                             }}
//                             className="w-full h-full"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-br from-[#4D2C5E]/30 to-[#FF7426]/30 mix-blend-overlay pointer-events-none" />
//                             <div className="absolute inset-0 border-4 border-white/20 rounded-3xl pointer-events-none" />

//                             {course?.youtubeUrl ? (<iframe
//                                 src={course.youtubeUrl}
//                                 title="Course Preview"
//                                 className="w-full h-full relative z-0"
//                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                 allowFullScreen
//                             />
//                             ) : (
//                                 <>
//                                     <img
//                                         src={course.imageUrl}
//                                         title="Course Preview"
//                                         className="w-full h-full relative z-0"

//                                     />
//                                 </>
//                             )}
//                         </motion.div>

//                         {/* Floating decorative elements */}
//                         <motion.div
//                             animate={{
//                                 y: [0, 20, 0],
//                                 rotate: [0, 5, 0]
//                             }}
//                             transition={{
//                                 duration: 8,
//                                 repeat: Infinity,
//                                 ease: "easeInOut",
//                                 delay: 0.5
//                             }}
//                             className="absolute -top-6 -left-6 w-12 h-12 bg-[#FF7426] rounded-lg opacity-20"
//                         />
//                         <motion.div
//                             animate={{
//                                 y: [0, -15, 0],
//                                 rotate: [0, -8, 0]
//                             }}
//                             transition={{
//                                 duration: 7,
//                                 repeat: Infinity,
//                                 ease: "easeInOut",
//                                 delay: 1
//                             }}
//                             className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#4D2C5E] rounded-full opacity-20"
//                         />
//                     </motion.div>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };


const CourseHero = ({ course }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full overflow-hidden py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FDF8EE] to-[#FFF5E6]"
        >
            {/* Floating 3D spheres */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className="lg:w-1/2 space-y-8">
                        <div className="overflow-hidden">
                            <motion.h1
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, ease: "backOut" }}
  className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#4D2C5E] leading-tight"
>
  {course?.title}
  <motion.span 
    className="block w-16 h-1.5 bg-gradient-to-r from-[#FF7426] to-[#4D2C5E] mt-2 rounded-full"
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ delay: 0.4, duration: 0.8 }}
  />
</motion.h1>
                        </div>

                        <div className="overflow-hidden">
                            <motion.p
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-lg lg:text-xl text-[#4D2C5E]/90"
                            >
                                {course?.shortDescription || "Master modern technologies with industry experts through hands-on projects."}
                            </motion.p>
                        </div>

                        {/* Enhanced Tags */}
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
                                            scale: 1.05,
                                            backgroundColor: '#4D2C5E',
                                            color: 'white',
                                            boxShadow: '0 6px 16px rgba(77, 44, 94, 0.3)',
                                            transition: { duration: 0.2 }
                                        }}
                                        className="px-4 py-2 bg-white text-[#4D2C5E] rounded-full text-sm font-medium border border-[#4D2C5E]/20 shadow-sm cursor-default transition-all"
                                    >
                                        {tag}
                                    </motion.span>
                                ))
                            ) : (
                                <motion.span
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: '#4D2C5E',
                                        color: 'white',
                                        boxShadow: '0 6px 16px rgba(77, 44, 94, 0.3)'
                                    }}
                                    className="px-4 py-2 bg-white text-[#4D2C5E] rounded-full text-sm font-medium border border-[#4D2C5E]/20 shadow-sm cursor-default transition-all"
                                >
                                    Industry-Relevant
                                </motion.span>
                            )}
                        </motion.div>

                        {/* Enhanced CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-wrap gap-4 mt-8"
                        >
                            <motion.button
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: '0 8px 24px rgba(255, 116, 38, 0.3)'
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-3 bg-[#FF7426] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                            >
                                Enroll Now
                            </motion.button>
                            <motion.button
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: '0 8px 24px rgba(77, 44, 94, 0.1)'
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-3 bg-white text-[#4D2C5E] font-medium rounded-lg border border-[#4D2C5E]/20 hover:bg-[#4D2C5E]/5 transition-all"
                            >
                                Watch Preview
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Right Side - Enhanced Media Container */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:w-1/2 w-full aspect-video rounded-2xl overflow-hidden shadow-2xl relative group"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4D2C5E]/10 to-[#FF7426]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        
                        {/* Border animation */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF7426]/30 transition-all duration-500 rounded-2xl pointer-events-none" />
                        
                        {/* Media content */}
                        {course?.youtubeUrl ? (
                            <iframe
                                src={course.youtubeUrl}
                                title="Course Preview"
                                className="w-full h-full relative z-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className="relative w-full h-full">
                                <img
                                    src={course.imageUrl}
                                    alt="Course Preview"
                                    className="w-full h-full object-cover"
                                />
                                {/* Play button overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl cursor-pointer"
                                    >
                                        <svg className="w-6 h-6 text-[#FF7426] ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </div>
                        )}
                        
                        {/* Floating elements */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                x: [0, 5, 0],
                                rotate: [0, 2, 0]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute top-4 left-4 w-8 h-8 bg-[#FF7426] rounded-full opacity-20"
                        />
                        <motion.div
                            animate={{
                                y: [0, 15, 0],
                                x: [0, -8, 0],
                                rotate: [0, -3, 0]
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                            className="absolute bottom-4 right-4 w-12 h-12 bg-[#4D2C5E] rounded-full opacity-20"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};




const CourseKeyDetails = ({ course }) => {
    const formatDuration = (days) => {
        if (!days || isNaN(days)) return "Coming Soon";

        const daysNum = parseInt(days);

        if (daysNum >= 180) {
            const years = (daysNum / 365).toFixed(1);
            return `${years % 1 === 0 ? Math.floor(years) : years} ${years == 1 ? 'year' : 'years'}`;
        } else if (daysNum >= 15) {
            const months = (daysNum / 30).toFixed(1);
            return `${months % 1 === 0 ? Math.floor(months) : months} ${months == 1 ? 'month' : 'months'}`;
        } else if (daysNum >= 4) {
            const weeks = (daysNum / 7).toFixed(1);
            return `${weeks % 1 === 0 ? Math.floor(weeks) : weeks} ${weeks == 1 ? 'week' : 'weeks'}`;
        } else {
            return `${daysNum} ${daysNum === 1 ? 'day' : 'days'}`;
        }
    };

    const getBatchStatus = (startDate) => {
        if (!startDate) return "Coming Soon";

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const batchDate = new Date(startDate);
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(today.getDate() + 7);

        if (batchDate < today) {
            return "Batch Started • Next Batch Coming Soon";
        }
        if (batchDate.toDateString() === today.toDateString()) {
            return "Starting Today!";
        }
        if (batchDate <= oneWeekFromNow) {
            return batchDate.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
            });
        }

        return `Starts ${batchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    };

    const details = [
        {
            icon: <FiClock className="w-5 h-5" />,
            label: "DURATION",
            value: course.duration ? formatDuration(course.duration) : "6 months",
            accent: "#FF7426",
            bg: "#4D2C5E"
        },
        {
            icon: <FiBook className="w-5 h-5" />,
            label: "FORMAT",
            value: "Live + Recorded",
            accent: "#4D2C5E",
            bg: "#FF7426"
        },
        {
            icon: <FiGlobe className="w-5 h-5" />,
            label: "Language",
            value: course.language || "English",
            accent: "#FF7426",
            bg: "#4D2C5E"
        },
        {
            icon: <FiCalendar className="w-5 h-5" />,
            label: "Date of Commencement",
            value: getBatchStatus(course?.startDate),
            accent: "#4D2C5E",
            bg: "#FF7426"
        }
    ];

    // Split details into pairs for mobile and tablet views
    const pairs = [
        [details[0], details[1]], // First card: Duration + Format
        [details[2], details[3]]  // Second card: Language + Date
    ];

    // MobileSplitCard Component
    const MobileSplitCard = ({ pair, pairIndex }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: pairIndex * 0.2 }}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4"
        >
            {pair.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                    <div
                        className="p-2 rounded-full"
                        style={{ backgroundColor: item.bg, color: item.accent }}
                    >
                        {item.icon}
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500">{item.label}</p>
                        <p className="text-sm font-medium text-gray-800">{item.value}</p>
                    </div>
                </div>
            ))}
        </motion.div>
    );

    // TabletSplitCard Component (unchanged, included for completeness)
    const TabletSplitCard = ({ pair, pairIndex }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: pairIndex * 0.2 }}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-6"
        >
            {pair.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                    <div
                        className="p-3 rounded-full"
                        style={{ backgroundColor: item.bg, color: item.accent }}
                    >
                        {item.icon}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">{item.label}</p>
                        <p className="text-base font-medium text-gray-800">{item.value}</p>
                    </div>
                </div>
            ))}
        </motion.div>
    );

    // DesktopCard Component (unchanged, included for completeness)
    const DesktopCard = ({ item, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4"
        >
            <div
                className="p-3 rounded-full"
                style={{ backgroundColor: item.bg, color: item.accent }}
            >
                {item.icon}
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-500">{item.label}</p>
                <p className="text-base font-medium text-gray-800">{item.value}</p>
            </div>
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-[#FDF8EE] to-[#FFF5E6]"
        >
            {/* Background elements */}
            <motion.div
                animate={{
                    y: [0, -10, 0],
                    x: [0, 8, 0],
                    rotate: [0, 3, 0]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#FF7426]/10 to-[#FF9E26]/10 blur-lg"
            />
            <motion.div
                animate={{
                    y: [0, 15, 0],
                    x: [0, -10, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
                className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-br from-[#4D2C5E]/10 to-[#8A3FFC]/10 blur-lg"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Mobile: 2 cards with paired content */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {pairs.map((pair, pairIndex) => (
                        <MobileSplitCard key={pairIndex} pair={pair} pairIndex={pairIndex} />
                    ))}
                </div>

                {/* Tablet: 2 split cards */}
                <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
                    {pairs.map((pair, pairIndex) => (
                        <TabletSplitCard key={pairIndex} pair={pair} pairIndex={pairIndex} />
                    ))}
                </div>

                {/* Desktop: 4 cards */}
                <div className="hidden lg:grid grid-cols-4 gap-6">
                    {details.map((item, index) => (
                        <DesktopCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};


// Mobile Card (single column)
const MobileCard = ({ item, index }) => {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 150,
                damping: 10
            }}
            className="relative bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300"
            style={{
                boxShadow: `0 4px 15px ${item.accent}10`
            }}
        >
            <CardContent item={item} index={index} />
        </motion.div>
    );
};

// Tablet Split Card (two sections per card)
const TabletSplitCard = ({ pair, pairIndex }) => {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                delay: pairIndex * 0.15,
                type: "spring",
                stiffness: 150,
                damping: 10
            }}
            className="relative bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300"
            style={{
                boxShadow: `0 4px 15px ${pair[0].accent}10`
            }}
        >
            <div className="flex h-full">
                {/* Left section */}
                <div className="w-1/2 pr-3 border-r border-gray-200">
                    <CardContent item={pair[0]} index={pairIndex * 2} />
                </div>

                {/* Right section */}
                <div className="w-1/2 pl-3">
                    <CardContent item={pair[1]} index={pairIndex * 2 + 1} />
                </div>
            </div>
        </motion.div>
    );
};

// Desktop Card (normal size)
const DesktopCard = ({ item, index }) => {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 150,
                damping: 10
            }}
            whileHover={{
                y: -4,
                scale: 1.02
            }}
            className="relative bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300"
            style={{
                boxShadow: `0 4px 15px ${item.accent}10`
            }}
        >
            <CardContent item={item} index={index} />
        </motion.div>
    );
};

// Reusable card content
const CardContent = ({ item, index }) => {
    return (
        <>
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{
                    rotate: 10,
                    scale: 1.1
                }}
                className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center mx-auto"
                style={{
                    background: `linear-gradient(135deg, ${item.accent}10 0%, ${item.accent}20 100%)`,
                    color: item.accent,
                }}
            >
                {item.icon}
            </motion.div>

            <motion.h3
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center mb-1"
            >
                {item.label}
            </motion.h3>

            <motion.p
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="text-lg font-bold text-center"
                style={{
                    color: item.accent,
                }}
            >
                {item.value}
            </motion.p>

            <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "40%" }}
                transition={{ type: "spring", stiffness: 400 }}
                className="h-0.5 mt-3 mx-auto rounded-full"
                style={{
                    backgroundColor: item.accent,
                }}
            />
        </>
    );
};

// export default CourseKeyDetails;
const ProgramInfoWithEnroll = ({ course }) => {
    const batchCode = course.batchId;
    const startDate = course.startDate;
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

    const handleEnrollClick = () => {
        if (batchCode === "0") {
            toast.error("No available batches for this course");
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const batchStartDate = new Date(startDate || 0);

        if (batchStartDate >= today) {
            setSelectedCourse(course);
            setIsEnrollModalOpen(true);
        } else {
            toast.error("This batch has already started");
        }
    };

    const isBatchAvailable = batchCode !== "0" &&
        (!startDate || new Date(startDate) >= new Date(new Date().setHours(0, 0, 0, 0)));

    return (
        <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-blue-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Content - Program Details */}
                    <div className="lg:w-2/3 space-y-12">
                        {/* Program Details */}
                        <div className="space-y-6">
                            <motion.h3
                                className="text-4xl md:text-5xl font-bold text-[#4D2C5E] mb-4 relative inline-block"
                            >
                                <span className="text-[rgb(255,116,38)]">Program</span> Details
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    animate={useInView ? { scaleX: 1 } : {}}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    className="absolute -bottom-2 left-0 w-full h-1.5 bg-[rgb(255,116,38)] rounded-full"
                                />
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg text-black leading-relaxed"
                            >
                                {course.programDetails || "This comprehensive program covers modern development techniques with real-world projects."}
                            </motion.p>
                        </div>

                        {/* Who Should Enroll */}
                        <div className="space-y-6">
                            <motion.h3
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-2xl font-semibold text-[#4D2C5E]"
                            >
                                Who Should Enroll?
                            </motion.h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(course.targetAudience || [
                                    "Aspiring developers",
                                    "Computer science students",
                                    "Career changers",
                                    "Tech professionals"
                                ]).map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-start p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-[rgb(255,116,38)] transition-colors"
                                    >
                                        <motion.div
                                            className={`w-3 h-3 rounded-full mt-1.5 mr-3 flex-shrink-0 ${index % 2 ? 'bg-[rgb(255,116,38)]' : 'bg-[#4D2C5E]'}`}
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                transition: { repeat: Infinity, duration: 2, delay: index * 0.3 }
                                            }}
                                        />
                                        <span className="text-black">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Compact Enroll Card */}
                    <div className="lg:w-1/3 lg:sticky lg:top-8 h-fit">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
                            whileHover={{ y: -5 }}
                        >
                            <div className="p-5 space-y-4">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="text-center"
                                >
                                    <h3 className="text-xl font-bold text-[#4D2C5E] mb-1">Ready to Enroll?</h3>
                                    <p className="text-sm text-black/80">Start your learning journey today</p>
                                </motion.div>

                                <div className="space-y-3">
                                    {[
                                        {
                                            icon: <FiUsers className="text-[#4D2C5E] text-sm" />,
                                            text: "Join our learning community"
                                        },
                                        {
                                            icon: <FiClock className="text-[rgb(255,116,38)] text-sm" />,
                                            text: "Limited seats available"
                                        },
                                        {
                                            icon: <FiMessageSquare className="text-[#4D2C5E] text-sm" />,
                                            text: "1-on-1 counselor support"
                                        }
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ x: 20, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.8 + index * 0.1 }}
                                            className="flex items-center gap-2 p-2 rounded-lg bg-gray-50"
                                        >
                                            <div className="p-1.5 rounded-lg bg-white shadow-sm">
                                                {item.icon}
                                            </div>
                                            <p className="text-sm text-black">{item.text}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.button
                                    onClick={handleEnrollClick}
                                    disabled={!isBatchAvailable}
                                    className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all text-sm ${!isBatchAvailable
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-[rgb(255,116,38)] hover:shadow-lg"
                                        }`}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                    whileHover={isBatchAvailable ? { scale: 1.02 } : {}}
                                >
                                    {batchCode === "0"
                                        ? "NO BATCHES AVAILABLE"
                                        : !isBatchAvailable
                                            ? "BATCH STARTED"
                                            : "ENROLL NOW"}
                                </motion.button>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 1.3 }}
                                    className="flex items-center justify-center gap-2 pt-2"
                                >
                                    <div className="flex-1 h-px bg-gray-200"></div>
                                    <span className="text-xs text-gray-500">or</span>
                                    <div className="flex-1 h-px bg-gray-200"></div>
                                </motion.div>

                                <motion.button
                                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 1.4 }}
                                    whileHover={{ x: 5 }}
                                >
                                    <FiMessageSquare className="text-[#4D2C5E]" />
                                    <span className="font-medium text-black">Talk to an advisor</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {selectedCourse && (
                <PurchaseModal
                    course={selectedCourse}
                    batchCode={batchCode}
                    isOpen={isEnrollModalOpen}
                    onClose={() => { setIsEnrollModalOpen(false); setSelectedCourse(null) }}
                    onEnroll={() => setIsEnrollModalOpen(false)}
                />
            )}
        </div>
    );
};

// const TeachingPlan = ({ course }) => {
//     const batchCode = course.batchId;
//     const startDate = course.startDate;
//     const brochure = course.brochure
//     const courseId = course.title
//     const ref = useRef(null);
//     const isInView = useInView(ref, { once: false, amount: 0.1 });
//     const [expandedSession, setExpandedSession] = useState(null);
//     const [isDownloading, setIsDownloading] = useState(false);
//     const [selectedCourse, setSelectedCourse] = useState(null);
//     const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const handleEnrollClick = (course) => {
//         setSelectedCourse(course);
//         setIsEnrollModalOpen(true);
//     };

//     const handleEnrollSubmit = () => {
//         setIsEnrollModalOpen(false);
//     };
//     const toggleSession = (sessionIndex) => {
//         setExpandedSession(expandedSession === sessionIndex ? null : sessionIndex);
//     };

//     // const downloadBrochure = () => {
//     //     if (!course?.brochure) {
//     //         window.alert("No brochure available for this course");
//     //         return;
//     //     }

//     //     const link = document.createElement("a");
//     //     link.href = course.brochure;
//     //     link.setAttribute("download", "");
//     //     link.setAttribute("target", "_blank");
//     //     document.body.appendChild(link);
//     //     link.click();
//     //     document.body.removeChild(link);
//     // };

//     // Flatten all sessions from all weeks into a single array
//     const allSessions = course.weeks.flatMap(week => week.sessions);

//     return (
//         <div ref={ref} className="w-full py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//             {/* Floating background elements */}
//             <motion.div
//                 animate={{
//                     y: [0, -40, 0],
//                     x: [0, 30, 0]
//                 }}
//                 transition={{
//                     duration: 4,
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                 }}
//                 className="absolute top-1/4 left-0 w-48 h-48 rounded-full bg-[#FF7426]/10 blur-xl"
//             />
//             <motion.div
//                 animate={{
//                     y: [0, 50, 0],
//                     x: [0, -20, 0]
//                 }}
//                 transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                     delay: 0.1
//                 }}
//                 className="absolute bottom-1/3 right-0 w-56 h-56 rounded-full bg-[#4D2C5E]/10 blur-xl"
//             />

//             <div className="max-w-4xl mx-auto relative z-10">
//                 {/* Animated header */}
//                 <motion.div
//                     initial={{ opacity: 0, y: -30 }}
//                     animate={isInView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.15 }}
//                     className="text-center mb-12"
//                 >
//                     <motion.h2
//                         className="text-4xl font-bold text-[#4D2C5E] mb-4 relative inline-block"
//                     >
//                         Course Sessions
//                         <motion.span
//                             initial={{ scaleX: 0 }}
//                             animate={isInView ? { scaleX: 1 } : {}}
//                             transition={{ delay: 0.1, duration: 0.3 }}
//                             className="absolute bottom-0 left-0 w-full h-1 bg-[#FF7426] rounded-full"
//                         />
//                     </motion.h2>
//                     <motion.p
//                         initial={{ opacity: 0 }}
//                         animate={isInView ? { opacity: 1 } : {}}
//                         transition={{ delay: 0.15 }}
//                         className="text-lg text-gray-600 max-w-2xl mx-auto"
//                     >
//                         Detailed breakdown of all learning sessions
//                     </motion.p>
//                 </motion.div>

//                 {/* Sessions list */}
//                 <div className="space-y-4">
//                     {allSessions.map((session, index) => (
//                         <div key={index} className="overflow-hidden">
//                             {/* Session Header - Clickable */}
//                             <motion.div
//                                 className="flex justify-between items-center p-5 bg-white rounded-xl shadow-lg border border-[#4D2C5E]/10 cursor-pointer group"
//                                 onClick={() => toggleSession(index)}
//                                 whileHover={{
//                                     y: -2,
//                                     boxShadow: "0 8px 20px rgba(77, 44, 94, 0.1)"
//                                 }}
//                                 initial={{ y: 20, opacity: 0 }}
//                                 animate={isInView ? {
//                                     y: 0,
//                                     opacity: 1,
//                                     transition: {
//                                         delay: index * 0.1,
//                                         type: "spring",
//                                         stiffness: 150,
//                                         damping: 10
//                                     }
//                                 } : {}}
//                             >
//                                 <div className="flex items-center gap-3">
//                                     <motion.span
//                                         whileHover={{ scale: 1.05 }}
//                                         className="px-4 py-1.5 bg-[#4D2C5E] text-white rounded-full font-bold shadow-md"
//                                     >
//                                         Session {index + 1}
//                                     </motion.span>
//                                     <h3 className="text-lg font-bold text-[#4D2C5E]">
//                                         {session.title.split(':').slice(1).join(':').trim()}
//                                     </h3>
//                                 </div>
//                                 <motion.div
//                                     animate={{
//                                         rotate: expandedSession === index ? 180 : 0,
//                                         color: expandedSession === index ? '#FF7426' : '#4D2C5E'
//                                     }}
//                                     transition={{ duration: 0.2 }}
//                                     className="text-[#4D2C5E] group-hover:text-[#FF7426]"
//                                 >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="h-5 w-5"
//                                         viewBox="0 0 20 20"
//                                         fill="currentColor"
//                                     >
//                                         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                                     </svg>
//                                 </motion.div>
//                             </motion.div>

//                             {/* Session Content - Animated */}
//                             <AnimatePresence>
//                                 {expandedSession === index && (
//                                     <motion.div
//                                         initial={{ height: 0, opacity: 0 }}
//                                         animate={{
//                                             height: "auto",
//                                             opacity: 1,
//                                             transition: {
//                                                 height: { duration: 0.15 },
//                                                 opacity: { duration: 0.1 }
//                                             }
//                                         }}
//                                         exit={{
//                                             height: 0,
//                                             opacity: 0,
//                                             transition: {
//                                                 height: { duration: 0.15 },
//                                                 opacity: { duration: 0.1 }
//                                             }
//                                         }}
//                                         className="bg-white rounded-b-xl shadow-lg border-x border-b border-[#4D2C5E]/10"
//                                     >
//                                         <div className="p-5">
//                                             <div>
//                                                 <h5 className="text-md font-medium text-[#4D2C5E] mb-3">
//                                                     Topics Covered:
//                                                 </h5>
//                                                 <ul className="space-y-2 pl-5">
//                                                     {session.topics.map((topic, tIndex) => (
//                                                         <motion.li
//                                                             key={tIndex}
//                                                             className="flex items-start"
//                                                             initial={{ opacity: 0, x: -10 }}
//                                                             animate={{
//                                                                 opacity: 1,
//                                                                 x: 0,
//                                                                 transition: {
//                                                                     delay: tIndex * 0.05,
//                                                                     type: "spring",
//                                                                     stiffness: 150
//                                                                 }
//                                                             }}
//                                                             whileHover={{ x: 3 }}
//                                                         >
//                                                             <motion.span
//                                                                 className="w-1.5 h-1.5 bg-[#FF7426] rounded-full mt-2 mr-2 flex-shrink-0"
//                                                                 animate={{
//                                                                     scale: [1, 1.1, 1],
//                                                                     backgroundColor: ['#FF7426', '#4D2C5E', '#FF7426']
//                                                                 }}
//                                                                 transition={{
//                                                                     duration: 3,
//                                                                     repeat: Infinity,
//                                                                     delay: tIndex * 0.1
//                                                                 }}
//                                                             />
//                                                             <span className="text-gray-700">
//                                                                 {topic}
//                                                             </span>
//                                                         </motion.li>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                         </div>
//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Download Button */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={isInView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ delay: 0.1 }}
//                     className="text-center mt-12 flex justify-center items-center"
//                 >
//                     <motion.button
//                         type="button"
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         // onClick={downloadBrochure}
//                         onClick={() => {
//                             if (batchCode === "0") {
//                                 setIsModalOpen(true)
//                             } else {
//                                 // Get today's date (normalized to start of day)
//                                 const today = new Date();
//                                 today.setHours(0, 0, 0, 0);

//                                 // Get batch start date (ensure it's a valid Date object)
//                                 const batchStartDate = new Date(startDate || 0);

//                                 if (batchStartDate >= today) {
//                                     // handleEnrollClick(course);
//                                     setIsModalOpen(true)
//                                 } else {
//                                     setIsModalOpen(true)
//                                 }
//                             }
//                         }}
//                         disabled={isDownloading}
//                         className={`flex items-center gap-2 px-5 py-2.5 border-2 rounded-lg transition-all duration-200 ${isDownloading
//                             ? 'bg-gray-200 border-gray-300 text-gray-500 cursor-wait'
//                             : 'bg-white border-[#4D2C5E] text-[#4D2C5E] hover:bg-[#4D2C5E]/10 shadow-sm hover:shadow-md cursor-pointer'
//                             }`}
//                     >
//                         {isDownloading ? (
//                             <>
//                                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#4D2C5E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                                 Downloading...
//                             </>
//                         ) : (
//                             <>
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                                 </svg>
//                                 Download Brochure
//                             </>
//                         )}
//                     </motion.button>
//                 </motion.div>
//             </div>
//             {selectedCourse && (
//                 <PurchaseModal
//                     course={selectedCourse}
//                     batchCode={batchCode}
//                     isOpen={isEnrollModalOpen}
//                     onClose={() => { setIsEnrollModalOpen(false); setSelectedCourse(null) }}
//                     onEnroll={handleEnrollSubmit}
//                     topic='Continue the form to download the brochure'
//                 />
//             )}
//             <AdmissionFormModal

//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 topic='Continue the form to download the brochure'
//                 brochure={brochure}
//                 currentCourseName={courseId}
//             />
//         </div>
//     );
// }




// import { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useInView } from 'framer-motion';

// const TeachingPlan = ({ course }) => {
//   const batchCode = course.batchId;
//   const startDate = course.startDate;
//   const brochure = course.brochure;
//   const courseId = course.title;
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: false, amount: 0.1 });
//   const [expandedSession, setExpandedSession] = useState(0); // First session open by default
//   const [isDownloading, setIsDownloading] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleEnrollClick = (course) => {
//     setSelectedCourse(course);
//     setIsEnrollModalOpen(true);
//   };

//   const handleEnrollSubmit = () => {
//     setIsEnrollModalOpen(false);
//   };

//   const toggleSession = (sessionIndex) => {
//     setExpandedSession(expandedSession === sessionIndex ? null : sessionIndex);
//   };

//   // const downloadBrochure = () => {
//   //   if (!course?.brochure) {
//   //     window.alert("No brochure available for this course");
//   //     return;
//   //   }
//   //   const link = document.createElement("a");
//   //   link.href = course.brochure;
//   //   link.setAttribute("download", "");
//   //   link.setAttribute("target", "_blank");
//   //   document.body.appendChild(link);
//   //   link.click();
//   //   document.body.removeChild(link);
//   // };

//   // Flatten all sessions from all weeks into a single array
//   const allSessions = course.weeks.flatMap(week => week.sessions);

//   return (
//     <div ref={ref} className="w-full py-6 sm:py-8 px-4 sm:px-6 md:px-8 bg-white relative overflow-hidden font-sans antialiased">
//       <style>
//         {`
//           .timeline {
//             border-left-width: 2px;
//             border-color: #e5e7eb; /* Tailwind gray-200 */
//             position: relative;
//           }
//           .timeline-dot {
//             width: 10px;
//             height: 10px;
//             background-color: rgb(255, 116, 38); /* Orange accent */
//             border-radius: 9999px;
//             position: absolute;
//             left: -6px;
//             top: 1.5rem;
//           }
//           .accordion-content {
//             max-height: 0;
//             opacity: 0;
//             overflow: hidden;
//             transition: max-height 0.4s ease, opacity 0.4s ease;
//           }
//           .accordion-content[aria-expanded="true"] {
//             max-height: 1000px;
//             opacity: 1;
//             overflow: visible;
//           }
//         `}
//       </style>
//       <main className="max-w-4xl mx-auto relative z-10">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5 }}
//           className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-6 sm:mb-8 text-center sm:text-left"
//           style={{ color: 'rgb(77, 44, 94)' }} /* Purple primary */
//         >
//           Course Sessions for <span style={{ color: 'rgb(255, 116, 38)' }}>{courseId}</span> {/* Orange accent */}
//         </motion.h1>

//         <section className="space-y-4 relative timeline" id="sessions">
//           {allSessions.map((session, index) => (
//             <motion.article
//               key={index}
//               className="relative bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-transparent"
//               initial={{ y: 20, opacity: 0 }}
//               animate={isInView ? { y: 0, opacity: 1 } : {}}
//               transition={{ delay: index * 0.1, type: "spring", stiffness: 150, damping: 10 }}
//             >
//               <span className="timeline-dot" style={{ top: `${1.5 + index * 1.5}rem` }}></span>
//               <header
//                 className="flex justify-between items-center mb-3 cursor-pointer select-none"
//                 aria-controls={`content-${index + 1}`}
//                 aria-expanded={expandedSession === index ? "true" : "false"}
//                 role="button"
//                 tabIndex={0}
//                 id={`header-${index + 1}`}
//                 onClick={() => toggleSession(index)}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter' || e.key === ' ') {
//                     e.preventDefault();
//                     toggleSession(index);
//                   }
//                 }}
//               >
//                 <div>
//                   <h2 className="font-extrabold text-base sm:text-lg md:text-xl leading-tight" style={{ color: 'rgb(77, 44, 94)' }}>
//                     {session.title.split(':').slice(1).join(':').trim()}
//                   </h2>
//                   <p className="text-xs sm:text-sm text-gray-700 mt-1">Session {index + 1}</p>
//                 </div>
//                 <motion.button
//                   aria-label={`Toggle Session ${index + 1}`}
//                   className="w-7 h-7 rounded-full flex items-center justify-center"
//                   style={{ backgroundColor: 'rgba(255, 116, 38, 0.1)', color: 'rgb(255, 116, 38)' }} /* Orange accent */
//                   animate={{ rotate: expandedSession === index ? 180 : 0 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <i className={`fas ${expandedSession === index ? 'fa-chevron-up' : 'fa-chevron-down'} text-sm`}></i>
//                 </motion.button>
//               </header>
//               <hr className="border-gray-300 mb-4" />
//               <AnimatePresence>
//                 {expandedSession === index && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ height: { duration: 0.4 }, opacity: { duration: 0.4 } }}
//                     className="accordion-content text-gray-800 text-sm sm:text-base leading-relaxed max-w-3xl"
//                     id={`content-${index + 1}`}
//                     aria-labelledby={`header-${index + 1}`}
//                     aria-expanded={expandedSession === index ? "true" : "false"}
//                   >
//                     <div className="mb-4">
//                       <h3 className="font-semibold text-sm sm:text-base mb-2" style={{ color: 'rgb(77, 44, 94)' }}>
//                         Topics Covered
//                       </h3>
//                       <ul className="space-y-2 text-gray-900 text-sm sm:text-base">
//                         {session.topics.map((topic, tIndex) => (
//                           <motion.li
//                             key={tIndex}
//                             className="flex items-center gap-2"
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: tIndex * 0.05, type: "spring", stiffness: 150 }}
//                           >
//                             <i className="fas fa-check-circle text-sm" style={{ color: 'rgb(77, 44, 94)' }}></i>
//                             <span>{topic}</span>
//                           </motion.li>
//                         ))}
//                       </ul>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.article>
//           ))}
//         </section>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.3 }}
//           className="flex justify-center mt-8"
//         >
//           <motion.button
//             type="button"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => {
//               if (batchCode === "0") {
//                 setIsModalOpen(true);
//               } else {
//                 const today = new Date();
//                 today.setHours(0, 0, 0, 0);
//                 const batchStartDate = new Date(startDate || 0);
//                 if (batchStartDate >= today) {
//                   setIsModalOpen(true);
//                 } else {
//                   setIsModalOpen(true);
//                 }
//               }
//             }}
//             disabled={isDownloading}
//             className={`flex items-center gap-2 px-4 py-2 border-2 rounded-lg transition-all duration-200 text-sm sm:text-base ${
//               isDownloading
//                 ? 'bg-gray-200 border-gray-300 text-gray-500 cursor-wait'
//                 : 'bg-white border-[rgb(77,44,94)] text-[rgb(77,44,94)] hover:bg-[rgba(255,116,38,0.1)] shadow-sm hover:shadow-md cursor-pointer'
//             }`}
//             style={{ borderColor: 'rgb(77, 44, 94)', color: 'rgb(77, 44, 94)' }}
//           >
//             {isDownloading ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4" style={{ color: 'rgb(77, 44, 94)' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Downloading...
//               </>
//             ) : (
//               <>
//                 <i className="fas fa-download text-sm" style={{ color: 'rgb(77, 44, 94)' }}></i>
//                 Download Brochure
//               </>
//             )}
//           </motion.button>
//         </motion.div>
//       </main>

//       {selectedCourse && (
//         <PurchaseModal
//           course={selectedCourse}
//           batchCode={batchCode}
//           isOpen={isEnrollModalOpen}
//           onClose={() => {
//             setIsEnrollModalOpen(false);
//             setSelectedCourse(null);
//           }}
//           onEnroll={handleEnrollSubmit}
//           topic="Continue the form to download the brochure"
//         />
//       )}
//       <AdmissionFormModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         topic="Continue the form to download the brochure"
//         brochure={brochure}
//         currentCourseName={courseId}
//       />
//     </div>
//   );
// };





// import { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useInView } from 'framer-motion';

const TeachingPlan = ({ course }) => {
  const batchCode = course.batchId;
  const startDate = course.startDate;
  const brochure = course.brochure;
//   console.log(brochure)
  const courseId = course.title;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [expandedSession, setExpandedSession] = useState(0); // First session open by default
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setIsEnrollModalOpen(true);
  };

  const handleEnrollSubmit = () => {
    setIsEnrollModalOpen(false);
  };

  const toggleSession = (sessionIndex) => {
    setExpandedSession(expandedSession === sessionIndex ? null : sessionIndex);
  };

  // const downloadBrochure = () => {
  //   if (!course?.brochure) {
  //     window.alert("No brochure available for this course");
  //     return;
  //   }
  //   const link = document.createElement("a");
  //   link.href = course.brochure;
  //   link.setAttribute("download", "");
  //   link.setAttribute("target", "_blank");
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  // Flatten all sessions from all weeks into a single array
  const allSessions = course.weeks.flatMap(week => week.sessions);

  return (
    <div ref={ref} className="w-full py-6 sm:py-8 px-4 sm:px-6 md:px-8 bg-white relative overflow-hidden font-sans antialiased">
      <style>
        {`
          .timeline {
            border-left-width: 2px;
            border-color: #e5e7eb; /* Tailwind gray-200 */
            position: relative;
          }
          .timeline-dot {
            width: 10px;
            height: 10px;
            background-color: rgb(255, 116, 38); /* Orange accent */
            border-radius: 9999px;
            position: absolute;
            left: -6px;
            top: 1.5rem;
          }
          .accordion-content {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: max-height 0.4s ease, opacity 0.4s ease;
          }
          .accordion-content[aria-expanded="true"] {
            max-height: 1000px;
            opacity: 1;
            overflow: visible;
          }
        `}
      </style>
      <main className="max-w-4xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-6 sm:mb-8 text-center sm:text-left"
          style={{ color: 'rgb(77, 44, 94)' }} /* Purple primary */
        >
          Course Sessions for <span style={{ color: 'rgb(255, 116, 38)' }}>{courseId}</span> {/* Orange accent */}
        </motion.h1>

        <section className="space-y-4 relative timeline" id="sessions">
          {allSessions.map((session, index) => (
            <motion.article
              key={index}
              className="relative bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-transparent"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 150, damping: 10 }}
            >
              <span className="timeline-dot" style={{ top: `${1.5 + index * 1.5}rem` }}></span>
              <header
                className="flex justify-between items-center mb-3 cursor-pointer select-none"
                aria-controls={`content-${index + 1}`}
                aria-expanded={expandedSession === index ? "true" : "false"}
                role="button"
                tabIndex={0}
                id={`header-${index + 1}`}
                onClick={() => toggleSession(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSession(index);
                  }
                }}
              >
                <div>
                  <h2 className="font-extrabold text-base sm:text-lg md:text-xl leading-tight" style={{ color: 'rgb(77, 44, 94)' }}>
                    {session.title.split(':').slice(1).join(':').trim()}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-700 mt-1">Session {index + 1}</p>
                </div>
                <motion.button
                  aria-label={`Toggle Session ${index + 1}`}
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255, 116, 38, 0.1)', color: 'rgb(255, 116, 38)' }} /* Orange accent */
                  animate={{ rotate: expandedSession === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <i className={`fas ${expandedSession === index ? 'fa-chevron-up' : 'fa-chevron-down'} text-sm`}></i>
                </motion.button>
              </header>
              <hr className="border-gray-300 mb-4" />
              <AnimatePresence>
                {expandedSession === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ height: { duration: 0.4 }, opacity: { duration: 0.4 } }}
                    className="accordion-content text-gray-800 text-sm sm:text-base leading-relaxed max-w-3xl"
                    id={`content-${index + 1}`}
                    aria-labelledby={`header-${index + 1}`}
                    aria-expanded={expandedSession === index ? "true" : "false"}
                  >
                    <div className="mb-4">
                      <h3 className="font-semibold text-sm sm:text-base mb-2" style={{ color: 'rgb(77, 44, 94)' }}>
                        Topics Covered
                      </h3>
                      <ul className="space-y-2 text-gray-900 text-sm sm:text-base">
                        {session.topics.map((topic, tIndex) => (
                          <motion.li
                            key={tIndex}
                            className="flex items-center gap-3 rounded-md py-1.5 px-2 hover:bg-[rgba(255,116,38,0.05)] transition-all duration-200"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: tIndex * 0.1, type: "spring", stiffness: 150 }}
                            whileHover={{ x: 5, color: 'rgb(255, 116, 38)' }}
                          >
                            <motion.span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: 'rgb(255, 116, 38)' }}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: tIndex * 0.2 }}
                            />
                            <span className="font-medium" style={{ color: 'rgb(77, 44, 94)' }}>{topic}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-8"
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (batchCode === "0") {
                setIsModalOpen(true);
              } else {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const batchStartDate = new Date(startDate || 0);
                if (batchStartDate >= today) {
                  setIsModalOpen(true);
                } else {
                  setIsModalOpen(true);
                }
              }
            }}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-4 py-2 border-2 rounded-lg transition-all duration-200 text-sm sm:text-base ${
              isDownloading
                ? 'bg-gray-200 border-gray-300 text-gray-500 cursor-wait'
                : 'bg-white border-[rgb(77,44,94)] text-[rgb(77,44,94)] hover:bg-[rgba(255,116,38,0.1)] shadow-sm hover:shadow-md cursor-pointer'
            }`}
            style={{ borderColor: 'rgb(77, 44, 94)', color: 'rgb(77, 44, 94)' }}
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" style={{ color: 'rgb(77, 44, 94)' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Downloading...
              </>
            ) : (
              <>
                <i className="fas fa-download text-sm" style={{ color: 'rgb(77, 44, 94)' }}></i>
                Download Brochure
              </>
            )}
          </motion.button>
        </motion.div>
      </main>

      {selectedCourse && (
        <PurchaseModal
          course={selectedCourse}
          batchCode={batchCode}
          isOpen={isEnrollModalOpen}
          onClose={() => {
            setIsEnrollModalOpen(false);
            setSelectedCourse(null);
          }}
          onEnroll={handleEnrollSubmit}
          topic="Continue the form to download the brochure"
        />
      )}
      <AdmissionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        topic="Continue the form to download the brochure"
        brochure={brochure}
        currentCourseName={courseId}
      />
    </div>
  );
};

// export default TeachingPlan;


// export default TeachingPlan;

const CareerDevelopmentTrack = ({ course }) => {
    const careerData = course.careerData || [
        {
            icon: <FiBriefcase className="text-4xl" />,
            title: "Upskillab Career Assist",
            items: [
                "Mentoring from industry experts",
                "Career-specific resume tailoring",
                "1:1 career guidance sessions",
            ],
            gradient: "from-blue-500 to-indigo-600",
            color: "text-blue-100"
        },
        {
            icon: <FiAward className="text-4xl" />,
            title: "Personal Branding",
            items: [
                "Build and showcase your skills in public",
                "Strategic LinkedIn profiling",
                "GitHub portfolio development",
            ],
            gradient: "from-purple-500 to-pink-600",
            color: "text-purple-100"
        },
        {
            icon: <FiUsers className="text-4xl" />,
            title: "Community Sessions",
            items: [
                "Strengthen communication skills",
                "Improve presentation techniques",
                "Group discussion practice",
            ],
            gradient: "from-green-500 to-teal-600",
            color: "text-green-100"
        },
        {
            icon: <FiBarChart2 className="text-4xl" />,
            title: "Interview Preparation",
            items: [
                "Mock interview sessions",
                "Group discussion simulations",
                "Art of salary negotiation",
            ],
            gradient: "from-yellow-500 to-orange-600",
            color: "text-yellow-100"
        },
        {
            icon: <FiBook className="text-4xl" />,
            title: "Domain Workshops",
            items: [
                "Masterclasses from industry professionals",
                "HR interview preparation sessions",
                "Technical deep-dive workshops",
            ],
            gradient: "from-red-500 to-pink-600",
            color: "text-red-100"
        },
        {
            icon: <FiFlag className="text-4xl" />,
            title: "Career Kick-start",
            items: [
                "Internship application assistance",
                "Freelance opportunity guidance",
                "Final year placement support",
            ],
            gradient: "from-indigo-500 to-blue-600",
            color: "text-indigo-100"
        },
    ];

    return (
        <section className="w-full py-16 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400 rounded-full opacity-10 blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex justify-center">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-[#4D2C5E] mb-12 relative inline-block text-center"
                    >
                        <span className="text-[rgb(255,116,38)]">Career</span> Development Track
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={useInView ? { scaleX: 1 } : {}}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="absolute -bottom-2 left-0 w-full h-1.5 bg-[rgb(255,116,38)] rounded-full"
                        />
                    </motion.h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {careerData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300`}></div>

                            <div className="relative bg-white rounded-xl p-6 h-full overflow-hidden">
                                {/* Icon with gradient background */}
                                <div className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${item.gradient} shadow-lg`}>
                                    <div className={item.color}>{item.icon}</div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>

                                <ul className="space-y-3">
                                    {item.items.map((point, i) => (
                                        <motion.li
                                            key={i}
                                            whileHover={{ x: 5 }}
                                            className="flex items-start text-gray-700"
                                        >
                                            <span className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 bg-gradient-to-br ${item.gradient}`}></span>
                                            <span>{point}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Hover effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition duration-300 pointer-events-none`}></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
const CertificateSection = ({ course }) => {
    const [certificateImage, setCertificateImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                setIsLoading(true);
                setCertificateImage(course.certificateImage || "/images/SAMPLE_CERTIFICATE.jpg");
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
            className="w-full py-20 relative overflow-hidden bg-gradient-to-br from-[#F9F9FF] to-white"
        >
            {/* Floating abstract shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[rgb(255,116,38,0.05)] rounded-full blur-3xl -z-0"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#4D2C5E]/5 rounded-full blur-3xl -z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header with animated underline */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-[#4D2C5E] mb-4 relative inline-block"
                    >
                        <span className="text-[rgb(255,116,38)]">Your</span> Achievement
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="absolute -bottom-2 left-0 w-full h-1.5 bg-[rgb(255,116,38)] rounded-full"
                        />
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 }}
                        className="text-xl text-[#4D2C5E] max-w-3xl mx-auto"
                    >
                        Earn a verifiable digital credential that showcases your expertise
                    </motion.p>
                </motion.div>

                {/* Certificate Content */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col lg:flex-row gap-12 items-center"
                >
                    {/* Certificate Image with modern frame */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="lg:w-1/2 relative group"
                    >
                        <div className="absolute -inset-2 bg-[rgb(255,116,38,0.1)] rounded-2xl blur-md group-hover:opacity-30 transition duration-300"></div>
                        <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border-8 border-white">
                            {isLoading ? (
                                <div className="w-full aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(255,116,38)]"></div>
                                </div>
                            ) : (
                                <img
                                    src={certificateImage}
                                    alt="Course Certificate"
                                    className="w-full h-auto object-cover"
                                />
                            )}
                        </div>
                    </motion.div>

                    {/* Certificate Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 }}
                        className="lg:w-1/2 space-y-8"
                    >
                        <motion.h3
                            className="text-3xl font-bold text-[#4D2C5E]"
                        >
                            Why This Certificate Matters
                        </motion.h3>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ staggerChildren: 0.1, delayChildren: 0.7 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {[
                                {
                                    icon: <FiAward className="text-2xl" />,
                                    title: "Industry Recognition",
                                    content: "Validated by leading practitioners and organizations"
                                },
                                {
                                    icon: <FiGlobe className="text-2xl" />,
                                    title: "Global Standard",
                                    content: "Meets international certification benchmarks"
                                },
                                {
                                    icon: <FiUsers className="text-2xl" />,
                                    title: "Career Advancement",
                                    content: "Demonstrates practical skills employers want"
                                },
                                {
                                    icon: <FiBook className="text-2xl" />,
                                    title: "Comprehensive Assessment",
                                    content: "Proves mastery through hands-on projects"
                                },
                                {
                                    icon: <FiCode className="text-2xl" />,
                                    title: "Technical Validation",
                                    content: "Verifies real-world implementation ability"
                                },
                                {
                                    icon: <FiCheck className="text-2xl" />,
                                    title: "Skill Verification",
                                    content: "Confirms cutting-edge technical competency"
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#4D2C5E]/20 transition-colors"
                                >
                                    <div className={`p-3 rounded-lg ${index % 2 ? 'bg-[rgb(255,116,38,0.1)] text-[rgb(255,116,38)]' : 'bg-[#4D2C5E]/10 text-[#4D2C5E]'}`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#4D2C5E]">{item.title}</h4>
                                        <p className="text-[#4D2C5E]/80 text-sm mt-1">{item.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};


const PricingSection = ({ course }) => {
    const batchCode = course.batchId;
    const startDate = course.startDate;
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

    const handleEnrollClick = (course) => {
        setSelectedCourse(course);
        setIsEnrollModalOpen(true);
    };

    const handleEnrollSubmit = () => {
        setIsEnrollModalOpen(false);
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Side - Pricing Info */}
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#4D2C5E] mb-4">
                                Program Investment
                            </h2>
                            <div className="w-20 h-1 bg-orange-500 rounded-full" />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-4">
                            <div className="flex items-baseline gap-2">
                                {/* Original price with strikethrough */}
                                {course.originalPrice && course.discountedPrice && (
                                    <span className="text-gray-500 line-through text-lg">
                                        ₹{course.originalPrice.toLocaleString('en-IN')}
                                    </span>
                                )}

                                {/* Discounted price */}
                                <motion.span
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-4xl md:text-5xl font-bold text-[#4D2C5E]"
                                >
                                    ₹{course.discountedPrice?.toLocaleString('en-IN') || '20,060'}
                                </motion.span>
                            </div>

                            <span className="text-gray-500 text-sm">Including tax</span>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                        >
                            <FiAlertCircle className="text-xl text-orange-500 flex-shrink-0" />
                            <p className="text-gray-600 text-sm">
                                Non-refundable after 7 days of enrollment
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="hidden lg:block"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                                alt="Happy students"
                                className="rounded-lg shadow-md w-full h-64 object-cover"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Payment Features */}
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-purple-50 opacity-50" />

                            <div className="relative space-y-6">
                                <h3 className="text-2xl font-semibold text-[#4D2C5E]">
                                    Affordable & Flexible
                                </h3>

                                <div className="space-y-4">
                                    <p className="text-gray-600 text-sm">
                                        Your investment in future skills includes:
                                    </p>

                                    <ul className="space-y-3">
                                        {[
                                            { text: "Certification upon completion", icon: FiAward },
                                            { text: "Dedicated mentor support", icon: FiBriefcase },
                                            { text: "Capstone project reviews", icon: FiAward },
                                            { text: "24/7 access to learning coaches", icon: FiBriefcase },
                                        ].map((item, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ x: 10, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 + index * 0.1 }}
                                                className="flex items-center gap-3 text-gray-700 text-sm"
                                            >
                                                <item.icon className="text-orange-500 text-lg flex-shrink-0" />
                                                {item.text}
                                            </motion.li>
                                        ))}
                                    </ul>

                                    <div className="pt-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">
                                            Special Offers:
                                        </p>
                                        <ul className="space-y-3">
                                            {[
                                                { text: "Employee upskilling programs", icon: FiUsers },
                                                { text: "Career transition bundles", icon: FiCompass },
                                                { text: "Flexible EMI options", icon: FiDollarSign },
                                            ].map((item, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ x: 10, opacity: 0 }}
                                                    whileInView={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: 0.4 + index * 0.1 }}
                                                    className="flex items-center gap-3 text-gray-700 text-sm"
                                                >
                                                    <item.icon className="text-orange-500 text-lg flex-shrink-0" />
                                                    {item.text}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <img
                                            src="/images/Cashfree Payments.png"
                                            alt="Cashfree"
                                            className="h-10 opacity-80"
                                        />
                                        <motion.button
                                            onClick={() => {
                                                if (batchCode === "0") {
                                                    toast.error("No available batches for this course");
                                                } else {
                                                    // Get today's date (normalized to start of day)
                                                    const today = new Date();
                                                    today.setHours(0, 0, 0, 0);

                                                    // Get batch start date (ensure it's a valid Date object)
                                                    const batchStartDate = new Date(startDate || 0);

                                                    if (batchStartDate >= today) {
                                                        handleEnrollClick(course);
                                                    } else {
                                                        toast.error("This batch has already started");
                                                    }
                                                }
                                            }}
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 1.2 }}
                                            whileHover={
                                                batchCode !== "0" && new Date(startDate || 0) >= new Date(new Date().setHours(0, 0, 0, 0))
                                                    ? {
                                                        scale: 1.05,
                                                        boxShadow: "0 10px 25px rgba(255, 116, 38, 0.4)"
                                                    }
                                                    : {}
                                            }
                                            whileTap={
                                                batchCode !== "0" && new Date(startDate || 0) >= new Date(new Date().setHours(0, 0, 0, 0))
                                                    ? { scale: 0.98 }
                                                    : {}
                                            }
                                            className={`w-full text-white font-bold py-4 px-6 rounded-lg shadow-lg relative overflow-hidden group ${batchCode === "0" || (startDate && new Date(startDate) < new Date(new Date().setHours(0, 0, 0, 0)))
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-gradient-to-r from-[#FF7426] to-[#FF9E5E]"
                                                }`}
                                            disabled={
                                                batchCode === "0" ||
                                                (startDate && new Date(startDate) < new Date(new Date().setHours(0, 0, 0, 0)))
                                            }
                                        >
                                            <span className="relative z-10">
                                                {batchCode === "0"
                                                    ? "NO BATCHES AVAILABLE"
                                                    : (startDate && new Date(startDate) < new Date(new Date().setHours(0, 0, 0, 0)))
                                                        ? "BATCH STARTED"
                                                        : "ENROLL NOW"
                                                }
                                            </span>
                                            {batchCode !== "0" && new Date(startDate || 0) >= new Date(new Date().setHours(0, 0, 0, 0)) && (
                                                <motion.span
                                                    initial={{ x: '-100%' }}
                                                    whileHover={{ x: '0%' }}
                                                    transition={{ duration: 0.4 }}
                                                    className="absolute inset-0 bg-[#E65100] z-0"
                                                />
                                            )}
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </motion.div>
                </div>
            </div>

            {selectedCourse && (
                <PurchaseModal
                    course={selectedCourse}
                    batchCode={batchCode}
                    isOpen={isEnrollModalOpen}
                    onClose={() => {
                        setIsEnrollModalOpen(false);
                        setSelectedCourse(null);
                    }}
                    onEnroll={handleEnrollSubmit}
                />
            )}
        </motion.section>
    );
};


const FAQSection = ({ course }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    // Use course FAQs if available, otherwise default questions
    const faqs = course?.faqs?.length > 0 ? course.faqs : [
        {
            question: "What are the program prerequisites?",
            answer: "Basic programming knowledge is recommended but we welcome beginners as we start with fundamentals.",
            category: "Admission"
        },
        {
            question: "How are the live sessions conducted?",
            answer: "Interactive sessions via Zoom with recordings available within 24 hours.",
            category: "Technical"
        },
        {
            question: "What's the typical class size?",
            answer: "We maintain a 10:1 student-mentor ratio for personalized attention.",
            category: "General"
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    // Icon mapping based on category
    const getIcon = (category) => {
        switch (category) {
            case 'Admission': return <FiBook className="text-[#4D2C5E]" />;
            case 'Technical': return <FiMonitor className="text-[#4D2C5E]" />;
            case 'Payment': return <FiDollarSign className="text-[#4D2C5E]" />;
            default: return <FiHelpCircle className="text-[#4D2C5E]" />;
        }
    };

    return (
        <div
            ref={containerRef}
            className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-blue-50 overflow-hidden"
            id="faq-section"
        >
            {/* from-indigo-50 to-blue-50 */}

            {/* Background elements */}
            <motion.div
                initial={{ x: -100, y: -100, opacity: 0 }}
                animate={isInView ? { x: 0, y: 0, opacity: 0.1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-0 left-0 w-64 h-64 bg-[#4D2C5E] rounded-full blur-3xl -z-0"
            />

            <div className="max-w-5xl mx-auto relative">
                {/* Header */}
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center justify-center bg-[#4D2C5E]/10 px-4 py-2 rounded-full mb-5"
                    >
                        <FiHelpCircle className="text-[#4D2C5E] mr-2" />
                        <span className="text-sm font-medium text-[#4D2C5E]">SUPPORT</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#4D2C5E] mb-4">
                        {course?.faqTitle || "Frequently Asked Questions"}
                    </h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="w-24 h-1 bg-[rgb(255,116,38)] mx-auto mb-6"
                    />

                    <p className="text-lg text-[#4D2C5E]/80 max-w-2xl mx-auto">
                        {course?.faqSubtitle || "Everything you need to know about the program."}
                    </p>
                </motion.div>

                {/* FAQ Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group"
                        >
                            <motion.div
                                className={`p-6 h-full rounded-xl transition-all duration-300 ${activeIndex === index
                                    ? 'bg-white shadow-lg border border-[#4D2C5E]/10'
                                    : 'bg-white/80 hover:bg-white shadow-md border border-transparent hover:border-[#4D2C5E]/10'
                                    }`}
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                    className="w-full flex items-start gap-4 text-left"
                                >
                                    <motion.div
                                        className={`p-3 rounded-lg ${activeIndex === index
                                            ? 'bg-[rgb(255,116,38,0.1)]'
                                            : 'bg-[#4D2C5E]/5 group-hover:bg-[rgb(255,116,38,0.1)]'
                                            } transition-colors`}
                                        whileHover={{ rotate: 10 }}
                                    >
                                        {getIcon(faq.category)}
                                    </motion.div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-[#4D2C5E] mb-1">
                                            {faq.question}
                                        </h3>
                                        <AnimatePresence>
                                            {activeIndex === index && (
                                                <motion.p
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
                                                            height: { duration: 0.2 },
                                                            opacity: { duration: 0.1 }
                                                        }
                                                    }}
                                                    className="text-[#4D2C5E]/80 overflow-hidden text-sm"
                                                >
                                                    {faq.answer}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <motion.div
                                        animate={{
                                            rotate: activeIndex === index ? 180 : 0,
                                            color: activeIndex === index ? 'rgb(255, 116, 38)' : '#4D2C5E'
                                        }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="text-xl mt-1"
                                    >
                                        <FiChevronDown />
                                    </motion.div>
                                </button>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Dynamic CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 }}
                    className="mt-16 text-center"
                >
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-2xl shadow-xl border border-[#4D2C5E]/10 max-w-2xl mx-auto"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            className="bg-[#4D2C5E]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <FiMessageSquare className="text-2xl text-[#4D2C5E]" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-[#4D2C5E] mb-3">
                            {course?.faqCtaTitle || "Still have questions?"}
                        </h3>
                        <p className="text-[#4D2C5E]/80 mb-6 max-w-md mx-auto">
                            {course?.faqCtaText || "Our team is available 24/7 to help you with any inquiries about the program."}
                        </p>
                        <NavLink to={course?.faqCtaLink || "/contact"}>
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 10px 25px rgba(255, 116, 38, 0.4)",
                                    transition: { type: "spring", stiffness: 400 }
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[rgb(255,116,38)] to-[#FF9E5E] text-white font-bold rounded-xl text-lg relative overflow-hidden"
                            >
                                <motion.span
                                    initial={{ x: -100, opacity: 0 }}
                                    whileHover={{ x: 0, opacity: 0.2 }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute inset-0 bg-white/20"
                                />
                                <FiMessageSquare className="mr-3" />
                                {course?.faqCtaButton || "Contact Our Support Team"}
                            </motion.button>
                        </NavLink>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

const CourseDetails = () => {
    const [course, setCourse] = useState(null);
    const [directCourse, setDirectCourse] = useState(null)
    const [directBatch, setDirectBatch] = useState(null)
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

        const response = await getDataHandler(endpointUrl, null, null, true); // pass endpointUrl directly
        console.log(response)
        let custemDataSet = {
            id: response._id,
            batchId: response.batch?._id || "0",
            title: response.courseName,
            imageUrl: response.courseImage,
            certificateImage: response.certificate,
            batchCode: response.batch?.batchCode || "0",
            shortDescription: response.shortDescription,
            tags: response.tags,
            youtubeUrl: response.youtubeUrl,
            duration: response.courseDuration,
            startDate: response.batch?.startDate || "",
            programDetails: response.programDetails,
            targetAudience: response.targetAudience,
            weeks: response.weeks,
            brochure: response.brochure,
            courseMode: response.courseMode,
            discountedPrice: response.discountedPrice,
            originalPrice: response.originalPrice,
            faqs: response.faqs,
            language: response.language.languageName
        }
        setCourse(custemDataSet);
    };
    const fetchBtachCourse = async (id) => {
        // Get the endpoint URL by calling the ApiConfig function
        const endpointUrl = ApiConfig.courseByBatchId(id);
        const res = await getDataHandler(endpointUrl, null, null, true); // pass endpointUrl directly
        const response = res.batch
        const endpointUrl2 = ApiConfig.getCourseByCode(response.course.courseCode);
        const res2 = await getDataHandler(endpointUrl2, null, null, true);
        console.log(res2)
        console.log(response)
        let custemDataSet = {
            id: res2._id,
            batchId: response._id,
            title: res2.courseName,
            batchCode: response.batchCode,
            shortDescription: res2.shortDescription,
            tags: res2.tags,
            imageUrl: res2.courseImage,
            certificateImage: res2.certificate,
            youtubeUrl: res2.youtubeUrl,
            duration: res2.courseDuration,
            startDate: response.startDate,
            programDetails: res2.programDetails,
            targetAudience: res2.targetAudience,
            weeks: res2.weeks,
            courseMode: res2.courseMode,
            brochure: res2.brochure,
            discountedPrice: res2.discountedPrice,
            originalPrice: res2.originalPrice,
            faqs: res2.faqs,
            language: res2.language.languageName
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