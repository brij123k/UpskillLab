import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaPlus, FaMinus, FaLocationArrow } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { postDataHandler } from '../../config/services';
import { Helmet } from 'react-helmet-async';
import {FiSend, FiUser, FiMail, FiMessageSquare} from "react-icons/fi";
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
  <>
      <Helmet>
        <title>Contact Upskillab | Get in Touch with Our Team</title>
        <meta name="description" content="Have questions or need assistance? Contact Upskillab's support team for help with our online courses." />
        <meta name="keywords" content="Upskillab contact, support, online courses help, customer service" />
        <meta property="og:title" content="Contact Upskillab | Get in Touch with Our Team" />
        <meta property="og:description" content="Reach out to Upskillab for any inquiries or support regarding our online learning programs." />
        <meta property="og:url" content="https://upskillab.com/contact" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Upskillab | Get in Touch with Our Team" />
        <meta name="twitter:description" content="Need assistance? Contact Upskillab's support team for help with our online courses." />
        <link rel="canonical" href="https://upskillab.com/contactus" />
      </Helmet>

      <motion.div
        className="relative h-full bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{
          y: -5,
          boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Floating abstract shapes background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-[#FF7426]/10"
            animate={{
              x: [0, 10, 0],
              y: [0, 10, 0],
              transition: {
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
          <motion.div
            className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-[#4D2C5E]/10"
            animate={{
              x: [0, -10, 0],
              y: [0, -10, 0],
              transition: {
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }
            }}
          />
        </div>

        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col p-8">
          {/* Icon with floating animation */}
          <motion.div
            className="w-16 h-16 rounded-2xl bg-[#4D2C5E] flex items-center justify-center text-white text-2xl mb-6 self-start"
            whileHover={{
              rotate: [0, 10, -10, 0],
              transition: { duration: 0.6 }
            }}
          >
            {icon}
          </motion.div>

          {/* Title with underline animation */}
          <motion.div className="mb-4 overflow-hidden">
            <motion.h3
              className="text-2xl font-bold text-gray-800 relative inline-block"
              whileHover="hover"
              initial="rest"
            >
              {title}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF7426]"
                variants={{
                  rest: { scaleX: 0, originX: 0 },
                  hover: { scaleX: 1, originX: 0 }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.h3>
          </motion.div>

          {/* Info with pop-up effect */}
          <motion.div
            className="mb-4"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <p className="text-lg font-semibold text-[#4D2C5E]">{info}</p>
          </motion.div>

          {/* Description with fade-in effect */}
          <motion.div
            className="mt-auto pt-4 border-t border-gray-100"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            <p className="text-gray-600">{description}</p>
          </motion.div>

          {/* Animated "contact now" button */}
          <motion.div
            className="mt-6"
            whileHover={{
              x: 5,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
          </motion.div>
        </div>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-16 h-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-[#FF7426]"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L100,0 L100,100 Z" fill="currentColor" />
          </svg>
        </motion.div>
      </motion.div>
  </>    );
};

      

const ContactForm = () => {
  const [formData, setFormData] = useState({
        name: '',
      email: '',
      subject: '',
      message: ''
  });
      const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData(prev => ({
        ...prev,
        [id]: value
    }));
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
      setIsSubmitting(true);

      try {
      // Transform data to match API requirements if needed
      const apiData = {
        name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
        // Add any other required fields from your Swagger
      };

      const response = await postDataHandler("contactUs", apiData);

      // Handle success
      toast.success('Message sent successfully!');
      setFormData({
        name: '',
      email: '',
      subject: '',
      message: ''
      });
  
    } catch (error) {
        console.error('Submission error:', error);
      toast.error(error.message || 'Failed to send message');
    } finally {
        setIsSubmitting(false);
    }
  };


      return (
      <motion.div
        className="bg-white rounded-3xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Form header with gradient */}
        <motion.div
          className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white"
              whileHover={{ rotate: 15 }}
            >
              <FiSend className="text-xl" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white">Send us a message</h3>
          </div>
        </motion.div>

        <form className="p-6 sm:p-8 space-y-6" onSubmit={handleSubmit}>
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
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7426]/50 focus:border-[#FF7426] transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7426]/50 focus:border-[#FF7426] transition-all"
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
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7426]/50 focus:border-[#FF7426] transition-all"
              placeholder="What's this about?"
            />
          </motion.div>

          {/* Message field */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <div className="relative">
              <div className="absolute top-4 left-3">
                <FiMessageSquare className="text-gray-400" />
              </div>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7426]/50 focus:border-[#FF7426] transition-all"
                placeholder="Type your message here..."
              ></textarea>
            </div>
          </motion.div>

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF7426] to-[#FF915E] text-white py-4 px-6 rounded-xl font-medium relative overflow-hidden group"
              whileHover={{
                scale: isSubmitting ? 1 : 1.02,
                boxShadow: isSubmitting ? "none" : "0 5px 15px rgba(255, 116, 38, 0.4)"
              }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    {/* <FiLoader className="animate-spin" /> */}
                    Sending...
                  </span>
                ) : (
                  <>
                    <FiSend className="text-lg" />
                    Send Message
                  </>
                )}
              </span>
            </motion.button>
          </motion.div>
        </form>

        {/* Decorative elements */}
        <motion.div
          className="absolute -bottom-8 right-8 w-32 h-32 rounded-full bg-[#FF7426]/10"
          animate={{
            scale: [1, 1.1, 1],
            transition: { repeat: Infinity, duration: 6 }
          }}
        />
        <motion.div
          className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#4D2C5E]/10"
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
      info: "Upskillab",
      description: "H-187, Lohia Rd, H Block, Sector 63, Noida, Uttar Pradesh 201301"
    },
      {
        icon: <FaPhone />,
      title: "Phone Number",
      info: "+91-9319426464",
      info: "+91-9319427070",
      description: "Monday to Saturday, 10am to 7pm IST"
    },
      {
        icon: <FaEnvelope />,
      title: "Email Address",
      info: "info@upskillab.com",
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
            className="absolute top-0 left-0 w-full h-full overflow-hidden"
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
              Contact <span className="text-[#FF7426]">Upskillab</span>
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
              className="relative bg-white rounded-3xl shadow-lg overflow-hidden h-full min-h-[400px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)"
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Floating abstract shapes background */}
              <div className="absolute inset-0 overflow-hidden z-0">
                <motion.div
                  className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-[#FF7426]/10"
                  animate={{
                    x: [0, 10, 0],
                    y: [0, 10, 0],
                    transition: {
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                />
                <motion.div
                  className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-[#4D2C5E]/10"
                  animate={{
                    x: [0, -10, 0],
                    y: [0, -10, 0],
                    transition: {
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 2
                    }
                  }}
                />
              </div>

              {/* Map header with gradient */}
              <motion.div
                className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white"
                    whileHover={{ rotate: 15 }}
                  >
                    <FaMapMarkerAlt className="text-lg" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-white">Our Location</h3>
                </div>
              </motion.div>

              {/* Map container */}
              <div className="relative h-full w-full z-10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.018894796157!2d77.3804614!3d28.629195799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceff845df14d9%3A0xa0a97bdb85d0a42f!2sWorkWings!5e0!3m2!1sen!2sin!4v1746748077678!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(10%) contrast(105%) saturate(90%)" }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Upskillab Location"
                  className="absolute inset-0"
                />

                {/* Modern map controls */}
                <div className="absolute bottom-6 right-6 z-10 flex gap-3">
                  <motion.button
                    className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-[#4D2C5E] hover:text-[#FF7426]"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPlus />
                  </motion.button>
                  <motion.button
                    className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-[#4D2C5E] hover:text-[#FF7426]"
                    whileHover={{ scale: 1.05, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaMinus />
                  </motion.button>
                  <motion.button
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7426] to-[#FF915E] text-white shadow-md flex items-center justify-center"
                    whileHover={{ scale: 1.05, backgroundColor: "#4D2C5E" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaLocationArrow />
                  </motion.button>
                </div>

                {/* Enhanced location pin */}
                <motion.div
                  className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    y: [0, -8, 0],
                    transition: { repeat: Infinity, duration: 1.5 }
                  }}
                >
                  <div className="relative">
                    <div className="absolute -inset-3 bg-[#FF7426] rounded-full opacity-0 animate-ping" />
                    <FaMapMarkerAlt className="text-4xl text-[#FF7426] drop-shadow-lg" />
                  </div>
                </motion.div>
              </div>

              {/* Address card */}
              <motion.div
                className="absolute bottom-6 left-6 z-10 bg-white rounded-xl shadow-lg p-4 max-w-xs"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-[#FF7426]/10 p-2 rounded-lg">
                    <FaMapMarkerAlt className="text-[#FF7426]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">UpSkillab</h4>
                    <p className="text-sm text-gray-600 mt-1">H-187, Lohia Rd, H Block, Sector 63, Noida, Uttar Pradesh 201301</p>
                  </div>
                </div>
              </motion.div>

              {/* Corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-16 h-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-[#FF7426]"
                  preserveAspectRatio="none"
                >
                  <path d="M0,0 L100,0 L100,100 Z" fill="currentColor" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>





      </div>
      );
};

      export default ContactPage;
