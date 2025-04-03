import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {FaPlus, FaMinus, FaLocationArrow } from 'react-icons/fa';
// const ContactCard = ({ icon, title, info, description }) => {
//   return (
//     <motion.div
//       className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all h-full flex flex-col border border-gray-200"
//       whileHover={{ y: -5 }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//     >
//       <div className="text-4xl text-[#ff7426] mb-4">{icon}</div>
//       <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
//       <p className="text-gray-600 mb-1 font-medium">{info}</p>
//       <p className="text-gray-500 mt-2 flex-grow">{description}</p>
//     </motion.div>
//   );
// };

const ContactCard = ({ icon, title, info, description }) => {

  return (
    <motion.div
      className="relative h-full rounded-[28px] overflow-hidden border-8 border-[#FF7426] cursor-pointer"
      initial={{ opacity: 0, rotateY: 15 }}
      animate={{ opacity: 1, rotateY: 0 }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 30px 60px -15px rgba(77, 44, 94, 0.4)"
      }}
      transition={{ duration: 0.7, type: "spring" }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Dynamic gradient background */}
      <motion.div
        className="absolute inset-0 bg-[#4D2C5E]"
        
      />
      
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${i % 2 ? 'bg-[#FF7426]' : 'bg-[#4D2C5E]'}`}
          style={{
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.6
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 40],
            x: [0, (Math.random() - 0.5) * 30],
            transition: {
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
      ))}

      {/* Content container */}
      <div className="relative z-10 p-8 h-full flex flex-col backdrop-blur-sm bg-white/5">
        {/* Animated icon with color-switching halo */}
        <motion.div
          className="self-center mb-6 relative"
          whileHover={{
            scale: 1.1,
            transition: { type: "spring", stiffness: 300 }
          }}
        >
          <div className="relative z-10">
            <motion.div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl bg-white/20 border-2 border-white/30"
              whileHover={{ rotate: 360 }}
            >
              <motion.span
                animate={{
                  color: ["#FF7426", "#4D2C5E"],
                  transition: { duration: 4, repeat: Infinity }
                }}
              >
                {icon}
              </motion.span>
            </motion.div>
          </div>
          <motion.div
            className="absolute -inset-4 rounded-full opacity-0"
            style={{
              background: "radial-gradient(circle, currentColor 0%, transparent 70%)"
            }}
            whileHover={{
              opacity: 0.4,
              color: ["#FF7426", "#4D2C5E"],
              transition: { duration: 0.6 }
            }}
          />
        </motion.div>

        {/* Title with color-switching shadow */}
        <motion.h3 
          className="text-3xl font-bold mb-6 text-center text-white"
          animate={{
            textShadow: [
              "0 2px 8px rgba(255, 116, 38, 0.8)",
              "0 2px 8px rgba(77, 44, 94, 0.8)",
              "0 2px 8px rgba(255, 116, 38, 0.8)"
            ],
            transition: { duration: 5, repeat: Infinity }
          }}
        >
          {title}
        </motion.h3>

        {/* Info with floating animation */}
        <motion.p 
          className="text-lg font-medium text-white/90 mb-5 text-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm mx-auto max-w-md"
          whileHover={{
            y: -3,
            backgroundColor: "rgba(255,255,255,0.2)",
            transition: { type: "spring", stiffness: 300 }
          }}
        >
          {info}
        </motion.p>

        {/* Description with expanding underline */}
        <motion.div className="mt-auto">
          <motion.p 
            className="text-white/85 text-center pb-2 relative text-lg"
            whileHover={{ scale: 1.02 }}
          >
            {description}
            <motion.span 
              className="absolute bottom-0 left-1/2 h-0.5 bg-white"
              style={{ 
                width: 0,
                x: "-50%",
                background: "linear-gradient(90deg, #FF7426, #4D2C5E)"
              }}
              whileHover={{ 
                width: "80%",
                transition: { type: "spring", stiffness: 200 }
              }}
            />
          </motion.p>
        </motion.div>

        {/* Animated corner accents */}
        <motion.div 
          className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#FF7426] rounded-tl-2xl"
          whileHover={{
            width: "calc(50% - 1rem)",
            height: "calc(50% - 1rem)",
            transition: { duration: 0.6 }
          }}
        />
        <motion.div 
          className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#4D2C5E] rounded-br-2xl"
          whileHover={{
            width: "calc(50% - 1rem)",
            height: "calc(50% - 1rem)",
            transition: { duration: 0.6 }
          }}
        />
      </div>
    </motion.div>
  );
};

import { FiSend, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";

const ContactForm = () => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-[#FF7426]/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        boxShadow: "0 20px 40px -10px rgba(77, 44, 94, 0.2)"
      }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* Form header with accent */}
      <div className="bg-[#4D2C5E] p-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <FiSend className="text-xl" />
          Send us a message
        </h3>
      </div>

      <form className="p-6 sm:p-8 space-y-6">
        {/* Grid layout for name and email */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-[#4D2C5E] mb-1 ml-1">
                Your Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FF7426]" />
                <input
                  type="text"
                  id="name"
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#4D2C5E]/20 rounded-xl focus:outline-none focus:border-[#FF7426] focus:ring-2 focus:ring-[#FF7426]/30 transition-all"
                  placeholder="Enter your name"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-[#4D2C5E] mb-1 ml-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FF7426]" />
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#4D2C5E]/20 rounded-xl focus:outline-none focus:border-[#FF7426] focus:ring-2 focus:ring-[#FF7426]/30 transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Subject field */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="subject" className="block text-sm font-medium text-[#4D2C5E] mb-1 ml-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="w-full px-4 py-3 border-2 border-[#4D2C5E]/20 rounded-xl focus:outline-none focus:border-[#FF7426] focus:ring-2 focus:ring-[#FF7426]/30 transition-all"
            placeholder="What's this about?"
          />
        </motion.div>

        {/* Message field */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="message" className="block text-sm font-medium text-[#4D2C5E] mb-1 ml-1">
            Your Message
          </label>
          <div className="relative">
            <FiMessageSquare className="absolute left-3 top-4 text-[#FF7426]" />
            <textarea
              id="message"
              rows="4"
              className="w-full pl-10 pr-4 py-3 border-2 border-[#4D2C5E]/20 rounded-xl focus:outline-none focus:border-[#FF7426] focus:ring-2 focus:ring-[#FF7426]/30 transition-all"
              placeholder="Type your message here..."
            ></textarea>
          </div>
        </motion.div>

        {/* Submit button */}
        <motion.button
          type="submit"
          className="w-full bg-[#4D2C5E] text-white py-4 px-6 rounded-xl font-medium relative overflow-hidden group"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 5px 15px rgba(255, 116, 38, 0.4)"
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <FiSend className="text-lg" />
            Send Message
          </span>
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-[#4D2C5E] to-[#3a1f48] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.4 }}
          />
        </motion.button>
      </form>

      {/* Decorative elements */}
      <motion.div
        className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-[#FF7426]/10"
        animate={{
          scale: [1, 1.1, 1],
          transition: { repeat: Infinity, duration: 6 }
        }}
      />
      <motion.div
        className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-[#4D2C5E]/10"
        animate={{
          scale: [1, 1.2, 1],
          transition: { repeat: Infinity, duration: 8, delay: 1 }
        }}
      />
    </motion.div>
  );
};

const ContactPage = () => {
  const contactMethods = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Our Location",
      info: "UpSkillLab Headquarters",
      description: "123 Tech Park, Innovation Road, Bengaluru, Karnataka 560001, India"
    },
    {
      icon: <FaPhone />,
      title: "Phone Number",
      info: "+91 98765 43210",
      description: "Monday to Friday, 9am to 6pm IST"
    },
    {
      icon: <FaEnvelope />,
      title: "Email Address",
      info: "contact@upskilllab.com",
      description: "We'll respond within 24 hours"
    }
  ];

  return (
    <div className='bg-[#F7F7F7] min-h-screen'>
      
      {/* Animated Banner */}
      <motion.section 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="relative bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  {/* Decorative elements */}
  <motion.div
    className="absolute top-0 left-0 w-full h-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.1 }}
    transition={{ duration: 1.5 }}
  >
    <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-[#FF7426]"></div>
    <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-[#FF7426]"></div>
  </motion.div>

  <div className="relative max-w-7xl mx-auto text-center">
    <motion.h1 
      className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
      initial={{ y: -30 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      Contact <span className="text-[#FF7426]">UpSkillLab</span>
    </motion.h1>
    
    <motion.p
      className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto"
      initial={{ y: 30 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
    >
      We'd love to hear from you! Reach out for inquiries, support, or partnerships.
    </motion.p>
  </div>
</motion.section>

      {/* Contact Cards */}
      <motion.section 
        className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 sm:mb-16">
          {contactMethods.map((method, index) => (
            <ContactCard
              key={index}
              icon={method.icon}
              title={method.title}
              info={method.info}
              description={method.description}
            />
          ))}
        </div>

        {/* Form and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContactForm />
          
          {/* Map */}
          <motion.div
  className="relative bg-white rounded-2xl shadow-xl overflow-hidden h-full min-h-[400px] border-4 border-[#FF7426]/20"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{
    boxShadow: "0 20px 40px -10px rgba(77, 44, 94, 0.2)"
  }}
  transition={{ duration: 0.6, type: "spring" }}
>
  {/* Map header with accent */}
  <div className="absolute top-0 left-0 right-0 z-10 bg-[#4D2C5E] p-3">
    <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
      <FaMapMarkerAlt className="text-[#FF7426]" />
      Our Location
    </h3>
  </div>

  {/* Map container with overlay effects */}
  <div className="relative h-full w-full">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.003168749709!2d77.59441431482193!3d12.9719629908566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf15e5e5e9a9f8c1!2sBangalore%20International%20Tech%20Park!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0, filter: "grayscale(20%) contrast(110%)" }}
      allowFullScreen=""
      loading="lazy"
      title="UpSkillLab Location"
      className="absolute inset-0"
    />
    
    {/* Custom map controls overlay */}
    <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
      <motion.button 
        className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#4D2C5E] hover:text-[#FF7426]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaPlus />
      </motion.button>
      <motion.button 
        className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#4D2C5E] hover:text-[#FF7426]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaMinus />
      </motion.button>
      <motion.button 
        className="w-10 h-10 rounded-full bg-[#FF7426] text-white shadow-md flex items-center justify-center"
        whileHover={{ scale: 1.1, backgroundColor: "#4D2C5E" }}
        whileTap={{ scale: 0.9 }}
      >
        <FaLocationArrow />
      </motion.button>
    </div>

    {/* Location pin animation */}
    <motion.div
      className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
      animate={{
        y: [0, -10, 0],
        transition: { repeat: Infinity, duration: 2 }
      }}
    >
      <div className="relative">
        <FaMapMarkerAlt className="text-4xl text-[#FF7426] drop-shadow-lg" />
        <motion.div
          className="absolute inset-0 rounded-full bg-[#FF7426] opacity-20"
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.2, 0.1, 0],
            transition: { repeat: Infinity, duration: 2 }
          }}
        />
      </div>
    </motion.div>
  </div>

  {/* Address overlay */}
  <motion.div
    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
  >
    <div className="max-w-md mx-auto text-center">
      <p className="font-medium">UpSkillLab Headquarters</p>
      <p className="text-sm">123 Tech Park, Innovation Road, Bengaluru, Karnataka 560001</p>
    </div>
  </motion.div>

  {/* Decorative elements */}
  <motion.div
    className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#FF7426] rounded-tr-2xl"
    whileHover={{
      width: "calc(50% - 1rem)",
      height: "calc(50% - 1rem)",
      transition: { duration: 0.6 }
    }}
  />
</motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;