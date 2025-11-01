import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaCheckCircle, FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get subject name from location state or use default
  const subjectName = location.state?.subjectName;
  const userName = location.state?.userName;

  // WhatsApp group link - update this with your actual link
  const whatsappGroupLink = "https://chat.whatsapp.com/FCOV9ZvsXbF4oe5nZE9bi1?mode=wwt";

  useEffect(() => {
      if(!subjectName || !userName){
      console.log(subjectName,userName)
    navigate('/landing')
  }
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleJoinWhatsApp = () => {
    // Open WhatsApp group in new tab
    window.open(whatsappGroupLink, '_blank', 'noopener,noreferrer');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Thank You for Registering! | Upskillab</title>
        <meta name="description" content={`Thank you for registering for ${subjectName}. Join our WhatsApp group for updates and important information.`} />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full mb-6 mx-auto"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <FaCheckCircle className="text-4xl sm:text-5xl text-green-500" />
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Thank You, <span className="bg-gradient-to-r from-[#FF7426] to-[#e4824a] bg-clip-text text-transparent">{userName}!</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            You've successfully registered for our FREE bootcamp
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welcome to <span className="text-[#4D2C5E]">{subjectName}</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              We're excited to have you join this transformative journey!
            </p>
          </div>

          <div className="grid mb-8">

            {/* WhatsApp Group Section */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto">
                  <FaWhatsapp />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Join exclusive Bootcamp group
                </h3>
                <p className="text-gray-600">
                  Get real-time updates and connect with fellow participants
                </p>
              </div>

              <motion.button
                onClick={handleJoinWhatsApp}
                className="w-full bg-green-600 cursor-pointer text-white p-4 rounded-xl font-bold text-xs sm:text-lg shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-0.5 sm:gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaWhatsapp className="text-xl" />
                Join WhatsApp Group
              </motion.button>

              <p className="text-green-700 text-xs text-center mt-3">
                🔒 Your privacy is protected. We never share your number.
              </p>
            </motion.div>
          </div>

          {/* Important Dates */}
          <motion.div
            className="bg-blue-50 rounded-2xl p-6 border border-blue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <FaCalendarAlt className="text-blue-500 mr-3" />
              Important Dates
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Bootcamp Starts</p>
                <p className="font-bold text-gray-900">8th October, 2025</p>
                <p className="text-sm text-gray-600">7:00 PM IST</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Bootcamp Ends</p>
                <p className="font-bold text-gray-900">9th October, 2025</p>
                <p className="text-sm text-gray-600">9:00 PM IST</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <button
            onClick={handleBackToHome}
            className="flex cursor-pointer items-center gap-3 bg-[#4D2C5E] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#5a3a6e] transition-colors"
          >
            <FaArrowLeft />
            Back to Homepage
          </button>
          
          <button
            onClick={handleJoinWhatsApp}
            className="flex items-center cursor-pointer gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            <FaWhatsapp />
            Join WhatsApp Group
          </button>
        </motion.div>

        {/* Support Section */}
        <motion.div
          className="text-center mt-12 pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <p className="text-gray-600 mb-4">
            Need help? Contact our support team
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>📧 info@upskillab.com</span>
            <span>📞 +91-9319426464</span>
            <span>🕒 24/7 Support Available</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYouPage;