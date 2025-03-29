import React from "react";
import { motion, useAnimation } from 'framer-motion';
const TrainingBanner = () =>{
    return (
        <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="w-full bg-white py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
>
  {/* Floating orange decorative elements */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 0.08, scale: 1 }}
    transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
    className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#FF7426] blur-xl"
  />
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 0.05, scale: 1 }}
    transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", delay: 3 }}
    className="absolute -left-10 bottom-10 w-48 h-48 rounded-full bg-[#FF9142] blur-xl"
  />

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="block lg:flex flex-col lg:flex-row items-center justify-between gap-8">
      {/* Text Content */}
      <div className="lg:w-1/2 space-y-4">
        <motion.h1
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-900"
        >
          Fast Forward your career in Tech Fields with <span className="text-[#FF7426]">Meritshot's</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg text-gray-600"
        >
          Best-in-class Training Programs.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-2"
        >
          <p className="text-gray-600 mb-4 text-sm">
            Here are some steps you can take to accelerate your career in the technology industry
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="px-5 py-2.5 bg-[#FF7426] text-white font-medium rounded-lg hover:bg-[#E65100] transition-all shadow-sm hover:shadow-md text-sm">
              Explore Program
            </button>
            <button className="px-5 py-2.5 border-2 border-[#FF7426] text-[#FF7426] font-medium rounded-lg hover:bg-[#FFF5EF] transition-all text-sm">
              Enrol Now
            </button>
          </div>
        </motion.div>
      </div>

      {/* Image/Illustration */}
      <motion.div
        initial={{ x: 30 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.3 }}
        className="lg:w-1/2 mt-6 lg:mt-0"
      >
        <div className="relative">
          <div className="absolute -inset-2 bg-[#FFE0B2]/40 rounded-lg blur-md"></div>
          <img 
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Tech professionals learning" 
            className="relative rounded-lg w-full h-auto object-cover shadow-xl border-2 border-white max-h-[250px]"
          />
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="absolute -bottom-2 -right-2 bg-[#FF7426] text-white px-3 py-1 rounded-md shadow-md font-bold text-xs"
          >
            90% Placement Rate
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
</motion.div>
    
)}

export default TrainingBanner;