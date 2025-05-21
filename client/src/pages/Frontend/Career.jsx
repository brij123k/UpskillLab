import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaUsers, FaHandshake, FaChartLine, FaHeart, FaLightbulb } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { getDataHandler,postDataHandler } from '../../config/services';
const Careers = () => {
 const jobHandler= async ()=>{
  const response = await getDataHandler('getPublicJobs')
  console.log(response)
 }
 useEffect(()=>{
  jobHandler()
 })
    const navigate = useNavigate()
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6
      }
    }
  };

  const section = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const jobOpenings = [
    {
      title: "Career Mentor",
      type: "Full-time",
      location: "Remote",
      description: "Guide learners through their career journeys with personalized coaching and industry insights."
    },
    {
      title: "Learning Experience Designer",
      type: "Full-time",
      location: "Hybrid (Bangalore)",
      description: "Create engaging, industry-relevant curriculum that combines technical skills with mental wellbeing."
    },
    {
      title: "Mental Wellness Counselor",
      type: "Part-time",
      location: "Remote",
      description: "Provide psychological support and conduct wellbeing sessions for our learning community."
    },
    {
      title: "Placement Coordinator",
      type: "Contract",
      location: "Remote",
      description: "Connect our graduates with top employers and manage the job guarantee program."
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-16"
          variants={item}
        >
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-20 h-20 bg-[#4D2C5E] rounded-full flex items-center justify-center">
              <FaBriefcase className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-[#4D2C5E] mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Build Careers While Building Your Own
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            variants={item}
          >
            Join our mission to transform education by combining career growth with mental wellbeing.
          </motion.p>
          
          <motion.div 
            className="flex justify-center"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-1 w-24 bg-[#FF7426]"></div>
          </motion.div>
        </motion.section>

        {/* Why Work With Us */}
      <motion.section 
  className="mb-20"
  variants={section}
>
  <motion.h2 
    className="text-3xl font-bold text-[#4D2C5E] mb-12 text-center"
    whileHover={{ x: 5 }}
  >
    Why Join Upskillab?
  </motion.h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      {
        icon: <FaUsers className="w-10 h-10" />,
        title: "Impact Lives",
        description: "Directly contribute to transforming careers and mental wellbeing of thousands."
      },
      {
        icon: <FaHandshake className="w-10 h-10" />,
        title: "Flexible Work",
        description: "Remote and hybrid options with focus on results, not hours clocked."
      },
      {
        icon: <FaChartLine className="w-10 h-10" />,
        title: "Growth Focused",
        description: "Continuous learning opportunities and career advancement paths."
      },
      {
        icon: <FaHeart className="w-10 h-10" />,
        title: "Wellbeing First",
        description: "Mental health benefits and work-life balance are priorities."
      },
      {
        icon: <FaLightbulb className="w-10 h-10" />,
        title: "Innovate Daily",
        description: "Solve real challenges in education and employment space."
      },
      {
        icon: <FaBriefcase className="w-10 h-10" />,
        title: "Competitive Pay",
        description: "Attractive compensation with performance bonuses."
      }
    ].map((item, index) => (
      <motion.div 
        key={index}
        className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
        variants={item}
        whileHover={{ y: -10 }}
        initial="hidden"
        animate="visible"
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4D2C5E] to-[#FF7426] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
        
        {/* Icon container with gradient background */}
        <motion.div 
          className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-[#FF7426] to-[#FF9A56] flex items-center justify-center text-white shadow-md"
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {item.icon}
        </motion.div>
        
        <h3 className="text-2xl font-bold text-[#4D2C5E] mb-3 relative">
          {item.title}
          <motion.span 
            className="absolute bottom-0 left-0 h-0.5 bg-[#FF7426]"
            initial={{ width: 0 }}
            whileInView={{ width: '40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          ></motion.span>
        </h3>
        
        <p className="text-gray-600 text-lg leading-relaxed">
          {item.description}
        </p>
        
        {/* Hover effect element */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#4D2C5E] to-[#FF7426] opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </motion.div>
    ))}
  </div>
</motion.section>

        {/* Current Openings */}
<motion.section 
  className="mb-20"
  variants={section}
>
  <motion.div className="mb-12">
    <motion.h2 
      className="text-3xl font-bold text-[#4D2C5E] mb-4 text-center"
      whileHover={{ scale: 1.02 }}
    >
      Current Openings
    </motion.h2>
    <motion.p 
      className="text-gray-600 text-center max-w-2xl mx-auto text-lg"
      variants={item}
    >
      Explore opportunities to join our mission-driven team transforming education and careers.
    </motion.p>
    <motion.div 
      className="flex justify-center mt-6"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="h-1 w-16 bg-gradient-to-r from-[#4D2C5E] to-[#FF7426] rounded-full"></div>
    </motion.div>
  </motion.div>
  
  <div className="space-y-6">
    {jobOpenings.map((job, index) => (
      <motion.div 
        key={index}
        className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
        variants={item}
        whileHover={{ y: -5 }}
        initial="hidden"
        animate="visible"
      >
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#FF7426] to-[#FF9A56]"></div>
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
             style={{
               boxShadow: '0 0 40px rgba(255, 116, 38, 0.15)'
             }}>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <motion.h3 
              className="text-2xl font-bold text-[#4D2C5E] mb-2"
              whileHover={{ x: 3 }}
            >
              {job.title}
            </motion.h3>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <motion.span 
                className="text-sm bg-[#FFF5EF] text-[#FF7426] px-3 py-1 rounded-full flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {job.type}
              </motion.span>
              
              <motion.span 
                className="text-gray-600 text-sm flex items-center bg-gray-50 px-3 py-1 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <svg className="w-4 h-4 mr-1 text-[#4D2C5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </motion.span>
            </div>
          </div>
          
          <motion.button 
            className="px-6 py-3 bg-gradient-to-r from-[#4D2C5E] to-[#6D3B7E] text-white rounded-lg hover:from-[#3A2250] hover:to-[#5D3270] transition-all shadow-md flex items-center justify-center mt-4 md:mt-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
        
        <motion.p 
          className="text-gray-700 mt-6 pl-2 border-l-2 border-[#FFD9C5]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {job.description}
        </motion.p>
        
        {/* Hover effect border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF7426] rounded-2xl pointer-events-none transition-all duration-300"></div>
      </motion.div>
    ))}
  </div>
  
  {/* Empty state illustration */}
  {jobOpenings.length === 0 && (
    <motion.div 
      className="text-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="w-24 h-24 mx-auto mb-6 text-[#FF7426]">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-medium text-[#4D2C5E] mb-2">No current openings</h3>
      <p className="text-gray-600 max-w-md mx-auto">
        We're not hiring at the moment, but check back later or submit your resume for future opportunities.
      </p>
    </motion.div>
  )}
</motion.section>

        {/* Culture Section */}
        <motion.section 
          className="mb-20 bg-[#4D2C5E] rounded-2xl p-8 md:p-12 text-white"
          variants={section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold mb-8 text-center"
              whileHover={{ x: 5 }}
            >
              Our Culture
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-filter backdrop-blur-sm"
                variants={item}
              >
                <h3 className="text-xl text-[#FF7426] font-semibold mb-4 flex items-center">
                  <span className="w-3 h-3 bg-[#FF7426] rounded-full mr-3"></span>
                  Learner First 
                </h3>
                <p className="opacity-90 text-[#4D2C5E]">
                  Every decision we make starts with "What's best for our learners?" This focus drives our innovation and commitment.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-filter backdrop-blur-sm"
                variants={item}
              >
                <h3 className="text-xl text-[#FF7426] font-semibold mb-4 flex items-center">
                  <span className="w-3 h-3 bg-[#FF7426] rounded-full mr-3"></span>
                  Holistic Growth
                </h3>
                <p className="opacity-90 text-[#4D2C5E]">
                  We value your professional development AND personal wellbeing. Our benefits and culture reflect this balance.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-filter backdrop-blur-sm"
                variants={item}
              >
                <h3 className="text-xl text-[#FF7426] font-semibold mb-4 flex items-center">
                  <span className="w-3 h-3 bg-[#FF7426] rounded-full mr-3"></span>
                  Collaborative Innovation
                </h3>
                <p className="opacity-90 text-[#4D2C5E]">
                  Great ideas come from everywhere. We encourage experimentation and cross-team collaboration.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white  bg-opacity-10 p-6 rounded-xl backdrop-filter backdrop-blur-sm"
                variants={item}
              >
                <h3 className="text-xl text-[#FF7426] font-semibold mb-4 flex items-center">
                  <span className="w-3 h-3 bg-[#FF7426] rounded-full mr-3"></span>
                  Transparent Communication
                </h3>
                <p className="opacity-90 text-[#4D2C5E]">
                  We maintain open channels for feedback and believe in radical candor with kindness.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="text-center"
          variants={section}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-[#4D2C5E] mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Don't See Your Perfect Role?
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg"
            variants={item}
          >
            We're always looking for passionate individuals who align with our mission. Send us your resume on <NavLink to="mailto:info@upskillab.com" className="text-[#4D2C5E] font-bold"> info@upskillab.com  </NavLink> or Contact Us.
          </motion.p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
            onClick={()=>navigate(`/ContactUs`)}
            className="px-8 py-3 bg-[#FF7426] text-white rounded-md hover:bg-[#E56722] transition-colors text-lg font-medium shadow-md">
              Contact Us
            </button>
          </motion.div>
        </motion.section>

        {/* Decorative elements */}
        <motion.div 
          className="fixed top-20 right-20 w-2 h-2 rounded-full bg-[#FF7426] hidden lg:block"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
            transition: { repeat: Infinity, duration: 3 }
          }}
        />
        <motion.div 
          className="fixed bottom-20 left-20 w-3 h-3 rounded-full bg-[#4D2C5E] hidden lg:block"
          animate={{
            y: [0, -15, 0],
            transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
          }}
        />
      </div>
    </motion.div>
  );
};

export default Careers;