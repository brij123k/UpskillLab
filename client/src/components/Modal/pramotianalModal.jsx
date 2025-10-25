import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from "react-toastify";
import { postDataHandler } from '../../config/services';
import { useNavigate } from 'react-router-dom';
const PramotianalModal = ({ isOpen, onClose, subjectName = "Habits & Nutrition Psychology Bootcamp" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    subject: subjectName
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState({ type: '', text: '' }); // 'success' or 'error'
const navigate = useNavigate(); 
  // Handle input changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Clear API message when user starts typing
    if (apiMessage.text) {
      setApiMessage({ type: '', text: '' });
    }
  }, [errors, apiMessage]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.number.trim()) {
      newErrors.number = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.number.replace(/\D/g, ''))) {
      newErrors.number = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiMessage({ type: '', text: '' }); // Clear previous messages
    
    try {
      const response = await postDataHandler('postPramotional', formData);
      
      if (response.success) {
        // Show inline success message
        setApiMessage({ 
          type: 'success', 
          text: response.message || 'Registration successful! We will contact you soon.' 
        });
          navigate('/thank-you', { 
    state: { 
      subjectName: "Habits & Nutrition Psychology Bootcamp",
      userName: formData.name // Optional: Personalize with user's name
    }
  });
        // Also show toast for good measure
        toast.success(response.message || 'Registration successful!');
        
        // Reset form after a delay
        setTimeout(() => {
          onClose();
          setFormData({
            name: '',
            email: '',
            number: '',
            subject: subjectName
          });
          setApiMessage({ type: '', text: '' });
        });
        
      } else {
        // Show inline error message
        setApiMessage({ 
          type: 'error', 
          text: response.message || 'Registration failed. Please try again.' 
        });
        toast.error(response.message || 'Registration failed.');
      }     
    } catch (error) {
      console.error('Registration error:', error);
      // Show inline error message
      setApiMessage({ 
        type: 'error', 
        text: 'Registration failed. Please try again.' 
      });
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form when modal closes
  const handleClose = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      number: '',
      subject: subjectName
    });
    setErrors({});
    setApiMessage({ type: '', text: '' });
    onClose();
  }, [onClose, subjectName]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal Container - Centered with proper constraints */}
          <motion.div
            className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto overflow-y-auto"
            style={{
              maxHeight: '90vh',
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.3
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] p-4 sm:p-6 text-white relative flex-shrink-0">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
                aria-label="Close modal"
              >
                <FaTimes className="text-white text-sm sm:text-lg" />
              </button>

              {/* Header Content */}
              <div className="text-center pr-8">
                <motion.div
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4 mx-auto"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <FaGraduationCap />
                </motion.div>
                
                <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                  Secure Your Spot
                </h2>
                <p className="text-white/80 text-xs sm:text-sm">
                  Join the FREE {subjectName}
                </p>
              </div>
            </div>

            {/* Form - Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                {/* API Response Message */}
                <AnimatePresence>
                  {apiMessage.text && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-4 p-3 sm:p-4 rounded-lg border ${
                        apiMessage.type === 'success' 
                          ? 'bg-green-50 border-green-200 text-green-800' 
                          : 'bg-red-50 border-red-200 text-red-800'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 mt-0.5 ${
                          apiMessage.type === 'success' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {apiMessage.type === 'success' ? (
                            <FaCheckCircle className="text-lg" />
                          ) : (
                            <FaExclamationTriangle className="text-lg" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            apiMessage.type === 'success' ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {apiMessage.type === 'success' ? 'Success!' : 'Oops!'}
                          </p>
                          <p className={`text-xs mt-1 ${
                            apiMessage.type === 'success' ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {apiMessage.text}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-3 sm:space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      <FaUser className="text-[#4D2C5E] mr-2 text-xs sm:text-sm" />
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 pl-8 sm:pl-10 border text-sm sm:text-base rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent outline-none transition-all duration-200 ${
                          errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder="Enter your full name"
                      />
                      <FaUser className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm" />
                    </div>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1 flex items-center"
                      >
                        ⚠️ {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      <FaEnvelope className="text-[#4D2C5E] mr-2 text-xs sm:text-sm" />
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 pl-8 sm:pl-10 border text-sm sm:text-base rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent outline-none transition-all duration-200 ${
                          errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder="your@email.com"
                      />
                      <FaEnvelope className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm" />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1 flex items-center"
                      >
                        ⚠️ {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      <FaPhone className="text-[#4D2C5E] mr-2 text-xs sm:text-sm" />
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="number"
                        value={formData.number}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 pl-8 sm:pl-10 border text-sm sm:text-base rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent outline-none transition-all duration-200 ${
                          errors.number ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder="10-digit phone number"
                      />
                      <FaPhone className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm" />
                    </div>
                    {errors.number && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1 flex items-center"
                      >
                        ⚠️ {errors.number}
                      </motion.p>
                    )}
                  </div>

                  {/* Hidden Subject Field */}
                  <input type="hidden" name="subject" value={formData.subject} />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer bg-gradient-to-r from-[#FF7426] to-[#FF8C42] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-4 sm:mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center text-sm sm:text-base">
                      <motion.div
                        className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
                      <FaGraduationCap className="hidden sm:flex text-base" />
                      REGISTER FREE & Get E-Certificate
                    </div>
                  )}
                </motion.button>

                {/* Privacy Note */}
                <p className="text-gray-500 text-xs text-center mt-3 sm:mt-4 leading-tight">
                  🔒 We respect your privacy. Your information is secure with us.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PramotianalModal;