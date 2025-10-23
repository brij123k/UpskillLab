import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaHourglassHalf,FaGraduationCap,FaGift,FaScroll,FaUserMd,FaTools,FaChartLine,FaMoneyBillWave,FaCalendarAlt  } from "react-icons/fa";
const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-50 to-gray-100">
      <Helmet>
        <title>FREE 2-Day Live Bootcamp: Master Habits & Nutrition Psychology | Upskillab</title>
        <meta name="description" content="Join our FREE 2-day live bootcamp to master the science of habits and nutrition psychology. Earn a certificate and transform your life!" />
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
          🚀 FREE 2-Day Live Bootcamp
        </span>
      </motion.div>

      {/* Main Headline with Typing Effect */}
      <div className="mb-8">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Master the Science of{' '}
          <motion.span
            className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] bg-clip-text text-transparent"
            animate={{ backgroundPosition: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            style={{ backgroundSize: '200% auto' }}
          >
            Habits
          </motion.span>{' '}
          and{' '}
          <motion.span
            className="bg-gradient-to-r from-[#FF7426] to-[#FF8C42] bg-clip-text text-transparent"
            animate={{ backgroundPosition: ['100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            style={{ backgroundSize: '200% auto' }}
          >
            Nutrition Psychology
          </motion.span>
        </motion.h1>
      </div>

      {/* Sub-Headline */}
      <motion.p
        className="text-xl sm:text-2xl md:text-3xl text-gray-600 max-w-5xl mx-auto mb-12 leading-relaxed font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Stop the cycle of quitting! Learn to build{' '}
        <motion.span
          className="font-semibold text-[#4D2C5E]"
          animate={{ color: ['#4D2C5E', '#7B4B9E', '#4D2C5E'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          lasting habits
        </motion.span>{' '}
        and transform your{' '}
        <motion.span
          className="font-semibold text-[#FF7426]"
          animate={{ color: ['#FF7426', '#FF8C42', '#FF7426'] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          complex relationship with food
        </motion.span>{' '}
        in just two powerful days.
      </motion.p>

      {/* Floating Feature Cards */}
      <motion.div
        className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {[
          {
            text: "100% Free for a limited time",
            emoji: <FaGift className='text-[#FF7426]'/>,
            delay: 0
          },
          {
            text: "Led by Counselling Psychologists (10+ Years Combined Experience)",
            emoji: <FaUserMd className='text-[#FF7426]'/>,
            delay: 0.1
          },
          {
            text: "Earn an Industry-Recognized Certificate",
            emoji: <FaScroll className='text-[#FF7426]'/>,
            delay: 0.2
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center border-2 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: feature.delay }}
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              backgroundColor: "rgba(255, 255, 255, 0.9)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="text-2xl mb-3"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
            >
              {feature.emoji}
            </motion.span>
            <span className="text-sm font-medium text-gray-700 text-center leading-tight">
              {feature.text}
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
          className="group relative bg-gradient-to-r from-[#FF7426] to-[#FF8C42] text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden"
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
           <FaGraduationCap className='text-[#4D2C5E]'/> REGISTER FREE NOW & Get Your E-Certificate!
          </span>
        </motion.button>


        <motion.p
          className="text-gray-500 text-sm mt-6 flex justify-center items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <FaHourglassHalf/> Limited spots available • Don't miss out!
        </motion.p>
      </motion.div>
    </motion.div>
  </div>
</section>

      {/* Problem Section */}
      <section className="py-10 sm:py-12 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Are You Tired Of...?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Problem Points */}
              <div className="space-y-6">
                {[
                  "Starting a new routine only to lose motivation after a week?",
                  "Struggling with emotional eating, stress-induced cravings, or constant snacking?",
                  "Knowing what you should do, but being unable to make the change stick?",
                  "Feeling lost on how to leverage your skills for real career growth in psychology or wellness?"
                ].map((problem, index) => (
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
                <h3 className="text-2xl font-bold mb-4">Your Path to Change Starts Here</h3>
                <p className="text-lg mb-6 opacity-90">
                  If you answered yes, this is your chance to learn the psychological foundation required to break free.
                </p>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="font-semibold">Transform your mindset and build habits that last a lifetime.</p>
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
              The Bootcamp Curriculum
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Two days of intensive, practical learning that will transform your approach to habits and nutrition.
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Day 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Day 1: The Science of Habits</h3>
                    <p className="text-gray-600">Rewiring the Mind for Change</p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    "Learn the proven frameworks and cognitive tricks to engineer your daily routines for success",
                    "The 4-Step Habit Loop: Identify and break self-sabotaging patterns",
                    "Identity-Based Habits: How to build a new identity that naturally aligns with your goals",
                    "Practical techniques for boosting willpower and eliminating procrastination"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Day 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Day 2: Power of Nutrition Psychology</h3>
                    <p className="text-gray-600">Transforming Your Food-Mind Connection</p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    "Understand the deep psychological factors that drive your food choices, cravings, and eating behaviors",
                    "The Psychology of Emotional Eating: Strategies to manage stress and comfort eating",
                    "Mindful Eating Techniques: Retrain your brain to listen to hunger and fullness cues",
                    "Building a positive relationship with food that is free from guilt and restriction"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
              Learn Directly from Industry-Leading Experts
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Learn from counselling psychologists with combined 10+ years of experience
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Expert 1 */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[#4D2C5E] to-[#7B4B9E] rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
                  SY
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Simran Yadav</h3>
                <p className="text-[#4D2C5E] font-semibold mb-4">Counselling Psychologist</p>
                <p className="text-gray-600">Specialized in habit formation and behavioral psychology with 6+ years of clinical experience.</p>
              </div>

              {/* Expert 2 */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[#FF7426] to-[#FF8C42] rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
                  N
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nishi</h3>
                <p className="text-[#FF7426] font-semibold mb-4">Counselling Psychologist</p>
                <p className="text-gray-600">Expert in nutrition psychology and emotional eating with 4+ years of therapeutic practice.</p>
              </div>
            </div>
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
              More Than Just a Training – It's Your Next Career Step!
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                {
                  icon: <FaScroll/>,
                  title: "Industry-Recognized Certificate",
                  description: "Get certified to validate your knowledge and boost your professional profile."
                },
                {
                  icon: <FaTools/>,
                  title: "Real-World Practical Exposure",
                  description: "Walk away with actionable tools you can use immediately with clients or in your own life."
                },
                {
                  icon: <FaChartLine/>,
                  title: "Career Growth Opportunities",
                  description: "Expand your skillset in high-demand areas like behavior change and wellness coaching."
                },
                {
                  icon: <FaGift/>,
                  title: "Free Expert Training",
                  description: "Free access to 2 full days of live expert training worth $500+"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-4 flex justify-center text-[#FF7426]">{feature.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
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
              <p className="text-white/90 text-lg font-semibold">25th & 26th October, 2025</p>
              <p className="text-white/80">7:00 PM Onwards (IST)</p>
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
              <p className="text-2xl font-bold text-white">ABSOLUTELY FREE</p>
              <p className="text-white/80 text-sm">(Limited Slots Available)</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r flex justify-center items-center gap-2 mx-auto cursor-pointer from-[#FF7426] to-[#FF8C42] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <FaGraduationCap/> YES! I Want the FREE Certificate and Access
            </motion.button>

            <p className="text-white/80 mt-4 text-sm">Secure your spot before it's gone!</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;