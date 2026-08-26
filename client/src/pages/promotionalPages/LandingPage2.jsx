import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaHourglassHalf, FaGraduationCap, FaGift, FaScroll, FaUserMd, FaTools, FaChartLine, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import PramotianalModal from '../../components/Modal/pramotianalModal';
import { getDataHandler } from '../../config/services';

// Helper function to render HTML content safely
const renderHTMLContent = (htmlString) => {
  if (!htmlString) return null;
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

// Component to render text with HTML highlighting
const HighlightedText = ({ text, className = "" }) => {
  if (!text) return null;
  
  // Check if text contains HTML tags
  const containsHTML = /<[^>]*>/.test(text);
  
  if (containsHTML) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: text }} />;
  }
  
  return <span className={className}>{text}</span>;
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroSection, setHerSection] = useState({})
  const [eligibility, seteligibility] = useState({})
  const [curriculum, setCurriculum] = useState({})
  const [speaker, setSpeaker] = useState({})
  const [train, setTrain] = useState({})
  const [datetime, setDatetime] = useState({})

  useEffect(() => {
    const bootcampDataHandler = async () => {
      const getBootcamp = await getDataHandler('getBootCamp')
      if (getBootcamp && getBootcamp.hero[0]) {
        setHerSection(getBootcamp.hero[0])
      }
      if (getBootcamp && getBootcamp.eligibility[0]) {
        seteligibility(getBootcamp.eligibility[0])
      }
      if (getBootcamp && getBootcamp.curriculum[0]) {
        setCurriculum(getBootcamp.curriculum[0])
      }
      if (getBootcamp && getBootcamp.speaker[0]) {
        setSpeaker(getBootcamp.speaker[0])
      }
      if (getBootcamp && getBootcamp.train[0]) {
        setTrain(getBootcamp.train[0])
      }
      if (getBootcamp && getBootcamp.datetime[0]) {
        setDatetime(getBootcamp.datetime[0])
      }
    }
    bootcampDataHandler()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Helmet>
        <title>{heroSection.title}</title>
        <meta name="description" content={heroSection.des} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-gradient-to-r from-[#4D2C5E]/10 to-[#7B4B9E]/10 blur-xl"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-[#FF7426]/10 to-[#FF8C42]/10 blur-xl"
            animate={{
              y: [0, 15, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-[#4D2C5E]/5 to-[#7B4B9E]/5 blur-lg"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(#4D2C5E 1px, transparent 1px), linear-gradient(90deg, #4D2C5E 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }} />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Animated Badge */}
            <motion.div
              className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-green-200/50 shadow-lg mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.15)" }}
            >
              <motion.span
                className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {heroSection.sec}
              </span>
            </motion.div>

            {/* Main Headline with HTML support */}
            <motion.div
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <HighlightedText text={heroSection?.title} />
            </motion.div>

            {/* Sub-Headline with HTML support */}
            <motion.div
              className="text-xl sm:text-2xl md:text-3xl text-gray-600 max-w-5xl mx-auto mb-12 leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <HighlightedText text={heroSection?.des} />
            </motion.div>

            {/* Floating Feature Cards */}
            <motion.div
              className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {heroSection?.tags?.map((tag, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center justify-center border-2 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    backgroundColor: "rgba(255, 255, 255, 0.9)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm font-medium text-gray-700 text-center leading-tight">
                    {tag}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Animated CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="group relative bg-gradient-to-r from-[#FF7426] to-[#FF8C42] text-white p-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  background: "linear-gradient(45deg, #FF7426, #FF8C42, #FF7426)",
                  backgroundSize: "200% 200%"
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%']
                }}
                transition={{
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />

                <span className="relative cursor-pointer z-10 flex items-center justify-center gap-1">
                  <FaGraduationCap className='text-[#4D2C5E] hidden sm:flex' /> {heroSection.button}
                </span>
              </motion.button>

              <motion.p
                className="text-gray-500 text-sm mt-6 flex justify-center items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <FaHourglassHalf /> {heroSection?.para}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-10 sm:py-12 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              {eligibility.sec}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Problem Points */}
              <div className="space-y-6">
                {eligibility?.que?.map((problem, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-red-500 text-sm font-bold">!</span>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">{problem}</p>
                  </div>
                ))}
              </div>

              {/* Solution Card */}
              <div className="bg-gradient-to-br from-[#4D2C5E] to-[#7B4B9E] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  <HighlightedText text={eligibility?.title} />
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  <HighlightedText text={eligibility?.description} />
                </p>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="font-semibold">{eligibility?.thought}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Section */}
     <section id="curriculum" className="py-10 sm:py-12 bg-gray-50 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        <HighlightedText text={curriculum.title} />
      </h2>
      <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        <HighlightedText text={curriculum.description} />
      </p>

      {/* Dynamic grid based on number of curriculum items */}
      <div className={`
        grid gap-8
        ${curriculum?.curriculums?.length === 1 
          ? 'grid-cols-1 max-w-2xl mx-auto' 
          : curriculum?.curriculums?.length === 2 
            ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
        }
      `}>
        {curriculum?.curriculums?.map((day, index) => {
          // Define colors based on day number
          const colors = {
            1: { bg: 'bg-blue-100', text: 'text-blue-600', dot: 'bg-blue-500' },
            2: { bg: 'bg-green-100', text: 'text-green-600', dot: 'bg-green-500' },
            3: { bg: 'bg-purple-100', text: 'text-purple-600', dot: 'bg-purple-500' },
            4: { bg: 'bg-orange-100', text: 'text-orange-600', dot: 'bg-orange-500' },
            5: { bg: 'bg-red-100', text: 'text-red-600', dot: 'bg-red-500' },
            6: { bg: 'bg-indigo-100', text: 'text-indigo-600', dot: 'bg-indigo-500' },
            7: { bg: 'bg-pink-100', text: 'text-pink-600', dot: 'bg-pink-500' }
          };

          const color = colors[day.day] || colors[1]; // Fallback to day 1 colors

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 ${color.bg} rounded-xl flex items-center justify-center mr-4`}>
                  <span className={`${color.text} font-bold text-xl`}>{day.day}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    <HighlightedText text={day.title} />
                  </h3>
                  <p className="text-gray-600">
                    <HighlightedText text={day.des} />
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                {day.info.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start group">
                    <span className={`w-2 h-2 ${color.dot} rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-200`}></span>
                    <span className="text-gray-700 leading-relaxed">
                      <HighlightedText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Optional: Add a decorative element for better visual balance */}
      {curriculum?.curriculums?.length === 1 && (
        <div className="flex justify-center mt-8">
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        </div>
      )}
    </motion.div>
  </div>
</section>

      {/* Experts Section */}
    <section id="experts" className="py-16 sm:py-20 bg-white px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        <HighlightedText text={speaker.title} />
      </h2>
      <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        <HighlightedText text={speaker.description} />
      </p>

      {/* Dynamic grid based on number of speaker profiles */}
      <div className={`
        grid gap-8
        ${speaker?.profile?.length === 1 
          ? 'grid-cols-1 max-w-md mx-auto' 
          : speaker?.profile?.length === 2 
            ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' 
            : speaker?.profile?.length === 3 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto'
        }
      `}>
        {speaker?.profile?.map((expert, index) => {
          // Define colors based on index for alternating colors
          const colors = index % 2 === 0 ? {
            border: 'border-[#4D2C5E]',
            text: 'text-[#4D2C5E]',
            bg: 'bg-[#4D2C5E]/5'
          } : {
            border: 'border-[#FF7426]',
            text: 'text-[#FF7426]',
            bg: 'bg-[#FF7426]/5'
          };

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`text-center p-6 rounded-2xl transition-all duration-300 hover:shadow-xl ${colors.bg} hover:scale-105`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative inline-block"
              >
                <motion.img
                  className={`w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg border-4 ${colors.border} transition-all duration-300`}
                  src={expert.image}
                  alt={expert.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                />
                {/* Decorative ring animation for first speaker */}
                {index === 0 && speaker?.profile?.length === 1 && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#4D2C5E]"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
              
              <motion.h3 
                className="text-xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
              >
                {expert.name}
              </motion.h3>
              
              <motion.p 
                className={`${colors.text} font-semibold mb-4`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
              >
                {expert.profession}
              </motion.p>
              
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
              >
                {expert.experience}
              </motion.p>
            </motion.div>
          );
        })}
      </div>

      {/* Optional: Add a decorative element for better visual balance with single speaker */}
      {speaker?.profile?.length === 1 && (
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="w-24 h-1 bg-gradient-to-r from-[#4D2C5E] to-[#FF7426] rounded-full"></div>
        </motion.div>
      )}

      {/* Optional: Add a subtle gradient border for multiple speakers */}
      {speaker?.profile?.length > 1 && speaker?.profile?.length <= 3 && (
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
        </motion.div>
      )}
    </motion.div>
  </div>
</section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        <HighlightedText text={train?.title} />
      </h2>

      {/* Dynamic grid based on number of feature cards */}
      <div className={`
        grid gap-6 mt-12
        ${train?.cards?.length === 1 
          ? 'grid-cols-1 max-w-md mx-auto' 
          : train?.cards?.length === 2 
            ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' 
            : train?.cards?.length === 3 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto'
        }
      `}>
        {train?.cards?.map((feature, index) => {
          // Define color schemes based on index for visual variety
          const colorSchemes = [
            { bg: 'bg-gradient-to-br from-blue-50 to-indigo-50', border: 'border-blue-200', icon: 'text-blue-600', hover: 'hover:border-blue-300' },
            { bg: 'bg-gradient-to-br from-green-50 to-emerald-50', border: 'border-green-200', icon: 'text-green-600', hover: 'hover:border-green-300' },
            { bg: 'bg-gradient-to-br from-purple-50 to-pink-50', border: 'border-purple-200', icon: 'text-purple-600', hover: 'hover:border-purple-300' },
            { bg: 'bg-gradient-to-br from-orange-50 to-red-50', border: 'border-orange-200', icon: 'text-orange-600', hover: 'hover:border-orange-300' },
            { bg: 'bg-gradient-to-br from-teal-50 to-cyan-50', border: 'border-teal-200', icon: 'text-teal-600', hover: 'hover:border-teal-300' },
            { bg: 'bg-gradient-to-br from-amber-50 to-yellow-50', border: 'border-amber-200', icon: 'text-amber-600', hover: 'hover:border-amber-300' }
          ];
          
          const colorScheme = colorSchemes[index % colorSchemes.length];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`
                ${colorScheme.bg} 
                rounded-xl p-6 text-center 
                shadow-sm border ${colorScheme.border} ${colorScheme.hover}
                transition-all duration-300 
                hover:shadow-lg
                cursor-pointer
              `}
            >
              <motion.div 
                className={`text-4xl mb-4 flex justify-center ${colorScheme.icon}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {feature.icon}
              </motion.div>
              
              <motion.h3 
                className="font-bold text-gray-900 mb-3 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 text-sm leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
              >
                <HighlightedText text={feature.description} />
              </motion.p>

              {/* Decorative element for single card */}
              {train?.cards?.length === 1 && index === 0 && (
                <motion.div 
                  className="mt-4 h-1 w-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Optional: Add a subtle gradient background for single card */}
      {train?.cards?.length === 1 && (
        <motion.div 
          className="relative mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent h-px"></div>
        </motion.div>
      )}
    </motion.div>
  </div>
</section>

      {/* Final CTA Section */}
      <section className="py-10 sm:py-15 bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Don't Miss Out!
            </h2>

            <motion.div
              className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {/* Date & Time Card */}
              <motion.div
                className="group relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
                  <motion.div
                    className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center text-2xl text-white mb-4 mx-auto shadow-lg"
                  >
                    <FaCalendarAlt />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">Dates & Time</h3>
                  <div className="space-y-2">
                    <p className="text-white/90 text-lg font-semibold">{datetime.date}</p>
                    <p className="text-white/80">{datetime.time}</p>
                  </div>
                </div>
              </motion.div>

              {/* Price Card */}
              <motion.div
                className="group relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF7426]/20 to-[#FF8C42]/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-[#FF7426] to-[#FF8C42] rounded-2xl flex items-center justify-center text-2xl text-white mb-4 mx-auto shadow-lg"
                  >
                    <FaMoneyBillWave />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">Price</h3>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-white">{datetime.price}</p>
                    <p className="text-white/80 text-sm">{datetime.slot}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r flex justify-center items-center gap-2 mx-auto cursor-pointer from-[#FF7426] to-[#FF8C42] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <FaGraduationCap className='hidden sm:flex' /> {datetime.button}
            </motion.button>

            <p className="text-white/80 mt-4 text-sm">Secure your spot before it's gone!</p>
          </motion.div>
        </div>
      </section>
      <PramotianalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subjectName="Habits & Nutrition Psychology Bootcamp"
        where="postpramotionBootcamp"
      />
    </div>
  );
};

export default LandingPage;