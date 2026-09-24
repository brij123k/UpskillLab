import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCheckCircle, FaExclamationTriangle, FaBriefcase, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { toast } from "react-toastify";

const PramotianalModal = ({
  isOpen,
  onClose,
  subjectName = "",
  where = "postPramotional"
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    city: '',
    source: 'bootcamp'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState({ type: '', text: '' });

  // Handle input changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.profession.trim()) {
      newErrors.profession = 'Profession is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setApiMessage({ type: '', text: '' });

    try {
      const response = await fetch('https://crm.upskillab.in/bootcamp/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          profession: formData.profession,
          city: formData.city,
          source: 'bootcamp',
        }),
      });

      const data = await response.json();

      if (data.success && data.data?.paymentLink) {
        setApiMessage({
          type: 'success',
          text: 'Registration successful! Redirecting to payment...'
        });
        toast.success('Registration successful! Redirecting to payment...');

        // Reset form fields
        setFormData({
          name: '',
          email: '',
          phone: '',
          profession: '',
          city: '',
          source: 'bootcamp'
        });

        // Redirect to payment link
        setTimeout(() => {
          window.location.href = data.data.paymentLink;
        }, 800);
      } else {
        const errMsg = data.message || 'Registration failed. Please try again.';
        setApiMessage({ type: 'error', text: errMsg });
        toast.error(errMsg);
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errMsg = 'Registration failed. Please try again.';
      setApiMessage({ type: 'error', text: errMsg });
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form when modal closes
  const handleClose = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      profession: '',
      city: '',
      source: 'bootcamp'
    });
    setErrors({});
    setApiMessage({ type: '', text: '' });
    onClose();
  }, [onClose]);

  // How It Works steps
  const steps = [
    {
      num: '01',
      title: 'Explore',
      desc: 'Discover the webinar, speaker, key topics and event details.'
    },
    {
      num: '02',
      title: 'Register',
      desc: 'Click Register Now, fill in your details and complete the registration payment securely.'
    },
    {
      num: '03',
      title: 'Get Access',
      desc: 'Receive your webinar joining link and important updates on your registered email and WhatsApp.'
    },
    {
      num: '04',
      title: 'Join Live',
      desc: 'Join us on 10 October at 8:00 PM IST and be part of the live conversation, polls and Q&A.'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
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

          {/* Modal Container */}
          <motion.div
            className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-5xl mx-auto overflow-hidden"
            style={{
              maxHeight: '92vh',
              display: 'flex',
              flexDirection: 'column'
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
              duration: 0.3
            }}
          >
            {/* Close Button (floating) */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105"
              aria-label="Close modal"
            >
              <FaTimes className="text-gray-700 text-sm sm:text-base" />
            </button>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid lg:grid-cols-2 min-h-full">

                {/* LEFT — How It Works */}
                <div className="relative bg-gradient-to-br from-[#4D2C5E] via-[#5A3670] to-[#6B3FA0] p-6 sm:p-8 lg:p-10 text-white overflow-hidden">
                  {/* Decorative layers */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.06] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#FF7426]/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
                    <div
                      className="absolute inset-0 opacity-[0.05]"
                      style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: '28px 28px',
                      }}
                    />
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-6 sm:mb-8">
                      <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="inline-block text-[10px] sm:text-xs font-semibold text-[#FF8C42] uppercase tracking-[0.2em] mb-2"
                      >
                        Process
                      </motion.span>
                      <motion.h2
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="text-2xl sm:text-3xl font-bold mb-2 leading-tight"
                      >
                        How It Works
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-white/70 text-sm sm:text-base leading-relaxed"
                      >
                        Join the conversation in just 4 simple steps.
                      </motion.p>
                    </div>

                    {/* Steps */}
                    <div className="space-y-4 sm:space-y-5 flex-1">
                      {steps.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                          className="relative flex gap-4 group"
                        >
                          {/* Connector line */}
                          {i < steps.length - 1 && (
                            <div className="absolute left-[22px] top-12 w-px h-full bg-gradient-to-b from-white/25 to-transparent" />
                          )}

                          {/* Number badge */}
                          <div className="relative flex-shrink-0 w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center group-hover:bg-white/15 group-hover:border-white/25 transition-all duration-300">
                            <span className="text-xs font-bold text-white/90">
                              {step.num}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 pt-1">
                            <h3 className="text-sm sm:text-base font-bold mb-1 leading-tight">
                              {step.title}
                            </h3>
                            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA hint */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="mt-6 sm:mt-8 pt-6 border-t border-white/15"
                    >
                      <div className="flex items-center gap-2 text-[#FF8C42]">
                        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">
                          Register Now
                        </span>
                        <FaArrowRight className="text-xs" />
                      </div>
                      <p className="text-white/50 text-xs mt-1.5 leading-relaxed">
                        Fill the form to secure your spot in the live session.
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* RIGHT — Registration Form */}
                <div className="bg-white p-6 sm:p-8 lg:p-10">
                  <div className="max-w-md mx-auto">
                    {/* Form Header */}
                    <div className="mb-6">
                      
                      <motion.h2
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 leading-tight"
                      >
                        Understand the generation. Change the conversation.
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.25 }}
                        className="text-gray-500 text-xs sm:text-sm leading-relaxed"
                      >
                      {subjectName}
                      </motion.p>
                    </div>

                    {/* API Message */}
                    <AnimatePresence>
                      {apiMessage.text && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`mb-4 p-3 rounded-lg border ${
                            apiMessage.type === 'success'
                              ? 'bg-green-50 border-green-200'
                              : 'bg-red-50 border-red-200'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div className={`flex-shrink-0 mt-0.5 ${
                              apiMessage.type === 'success' ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {apiMessage.type === 'success' ? (
                                <FaCheckCircle className="text-base" />
                              ) : (
                                <FaExclamationTriangle className="text-base" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-semibold ${
                                apiMessage.type === 'success' ? 'text-green-800' : 'text-red-800'
                              }`}>
                                {apiMessage.type === 'success' ? 'Success!' : 'Oops!'}
                              </p>
                              <p className={`text-xs mt-0.5 ${
                                apiMessage.type === 'success' ? 'text-green-700' : 'text-red-700'
                              }`}>
                                {apiMessage.text}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name */}
                      <FormField
                        label="Full Name"
                        icon={<FaUser />}
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={errors.name}
                        placeholder="Enter your full name"
                      />

                      {/* Email */}
                      <FormField
                        label="Email Address"
                        icon={<FaEnvelope />}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        placeholder="your@email.com"
                      />

                      {/* Phone */}
                      <FormField
                        label="Phone Number"
                        icon={<FaPhone />}
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                        placeholder="10-digit phone number"
                      />

                      {/* Profession */}
                      <FormField
                        label="Profession"
                        icon={<FaBriefcase />}
                        name="profession"
                        type="text"
                        value={formData.profession}
                        onChange={handleInputChange}
                        error={errors.profession}
                        placeholder="e.g. Nutritionist, Doctor, Student"
                      />

                      {/* City */}
                      <FormField
                        label="City"
                        icon={<FaMapMarkerAlt />}
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleInputChange}
                        error={errors.city}
                        placeholder="Enter your city"
                      />

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="w-full cursor-pointer bg-gradient-to-r from-[#FF7426] to-[#FF8C42] text-white py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        whileHover={!isLoading ? { scale: 1.02, y: -1 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <motion.div
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <FaGraduationCap className="text-base" />
                            <span>Register & Pay Securely</span>
                          </div>
                        )}
                      </motion.button>

                      {/* Privacy */}
                      <p className="text-gray-400 text-[11px] text-center leading-tight pt-1">
                        🔒 We respect your privacy. Your information is secure with us.
                      </p>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* Reusable Form Field Component */
const FormField = ({ label, icon, name, type, value, onChange, error, placeholder }) => (
  <div>
    <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
      <span className="text-[#4D2C5E] mr-2 text-xs">{icon}</span>
      {label} *
    </label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2.5 sm:py-3 pl-10 border text-sm rounded-xl focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent outline-none transition-all duration-200 ${
          error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-200 hover:border-gray-300 focus:bg-white bg-gray-50/50'
        }`}
        placeholder={placeholder}
      />
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
        {icon}
      </span>
    </div>
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-xs mt-1 flex items-center gap-1"
      >
        ⚠️ {error}
      </motion.p>
    )}
  </div>
);

export default PramotianalModal;