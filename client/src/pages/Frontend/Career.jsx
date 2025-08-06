import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaUsers, FaHandshake, FaChartLine, FaHeart, FaLightbulb, FaTimes } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { getDataHandler, postDataHandler } from '../../config/services';
import { Helmet } from 'react-helmet-async';
const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    qualification: {
      collegeName: '',
      passingYear: '',
      branch: ''
    },
    resume: null
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getDataHandler('getPublicJobs');
      if (response && response.jobs) {
        setJobs(response.jobs);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQualificationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      qualification: {
        ...formData.qualification,
        [name]: value
      }
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const validateForm = () => {
    const errors = {};
    
    // Validate full name
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      errors.fullName = 'Name must be at least 3 characters';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Validate phone number
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9]{10,15}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number (10-15 digits)';
    }
    
    // Validate qualification
    if (!formData.qualification.collegeName.trim()) {
      errors.collegeName = 'College name is required';
    }
    
    if (!formData.qualification.passingYear) {
      errors.passingYear = 'Passing year is required';
    } else if (isNaN(formData.qualification.passingYear)) {
      errors.passingYear = 'Passing year must be a number';
    } else if (parseInt(formData.qualification.passingYear) < 1900 || parseInt(formData.qualification.passingYear) > new Date().getFullYear() + 5) {
      errors.passingYear = 'Please enter a valid year';
    }
    
    if (!formData.qualification.branch.trim()) {
      errors.branch = 'Branch is required';
    }
    
    // Validate resume
    if (!formData.resume) {
      errors.resume = 'Resume is required';
    } else if (formData.resume.size > 5 * 1024 * 1024) { // 5MB limit
      errors.resume = 'File size must be less than 5MB';
    } else if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(formData.resume.type)) {
      errors.resume = 'Only PDF, DOC, and DOCX files are allowed';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('jobId', selectedJob._id);
    formDataToSend.append('qualification[collegeName]', formData.qualification.collegeName);
    formDataToSend.append('qualification[passingYear]', formData.qualification.passingYear);
    formDataToSend.append('qualification[branch]', formData.qualification.branch);
    formDataToSend.append('resume', formData.resume);
    formDataToSend.append('source', 'external');

    try {
      await postDataHandler('postpublicApplication', formDataToSend);
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitSuccess(false);
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          qualification: {
            collegeName: '',
            passingYear: '',
            branch: ''
          },
          resume: null
        });
      }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
    setSubmitSuccess(false);
    setFormErrors({});
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
    setFormErrors({});
  };

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

  const benefits = [
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
            {benefits.map((item, index) => (
              <motion.div 
                key={index}
                className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
                variants={item}
                whileHover={{ y: -10 }}
                initial="hidden"
                animate="visible"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4D2C5E] to-[#FF7426] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                
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
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF7426]"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job, index) => (
                <motion.div 
                  key={job._id}
                  className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
                  variants={item}
                  whileHover={{ y: -5 }}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#FF7426] to-[#FF9A56]"></div>
                  
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
                      <p className="text-gray-600 mb-3">{job.subtitle}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <motion.span 
                          className="text-sm bg-[#FFF5EF] text-[#FF7426] px-3 py-1 rounded-full flex items-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {job.source === 'external' ? 'Full-time' : 'Internal'}
                        </motion.span>
                        
                        <motion.span 
                          className="text-gray-600 text-sm flex items-center bg-gray-50 px-3 py-1 rounded-full"
                          whileHover={{ scale: 1.05 }}
                        >
                          <svg className="w-4 h-4 mr-1 text-[#4D2C5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.company}
                        </motion.span>
                      </div>
                    </div>
                    
                    <motion.button 
                      className="px-6 py-3 bg-gradient-to-r from-[#4D2C5E] to-[#6D3B7E] text-white rounded-lg hover:from-[#3A2250] hover:to-[#5D3270] transition-all shadow-md flex items-center justify-center mt-4 md:mt-0"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openModal(job)}
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
                  
                  {job.skills && job.skills.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Skills Required:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF7426] rounded-2xl pointer-events-none transition-all duration-300"></div>
                </motion.div>
              ))}
            </div>
          )}
          
          {!loading && jobs.length === 0 && (
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
                className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-filter backdrop-blur-sm"
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
              onClick={() => navigate('/ContactUs')}
              className="px-8 py-3 bg-[#FF7426] text-white rounded-md hover:bg-[#E56722] transition-colors text-lg font-medium shadow-md"
            >
              Contact Us
            </button>
          </motion.div>
        </motion.section>

        {/* Application Modal */}
        {showModal && selectedJob && (
          <div className="fixed inset-0 bg-[#00000096] bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div 
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[#4D2C5E]">Apply for {selectedJob.title}</h3>
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>
                
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Application Submitted!</h4>
                    <p className="text-gray-600">Thank you for applying. We'll review your application and get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#4D2C5E] focus:border-[#4D2C5E]'}`}
                          placeholder="John Doe"
                        />
                        {formErrors.fullName && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.fullName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#4D2C5E] focus:border-[#4D2C5E]'}`}
                          placeholder="john@example.com"
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="phoneNumber">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.phoneNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#4D2C5E] focus:border-[#4D2C5E]'}`}
                          placeholder="+1 (555) 123-4567"
                        />
                        {formErrors.phoneNumber && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.phoneNumber}</p>
                        )}
                      </div>
                      
                      {/* Qualification Fields */}
                      <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Qualification Details *</h3>
                        
                        <div className="mb-3">
                          <label className="block text-gray-700 font-medium mb-2" htmlFor="collegeName">
                            College Name *
                          </label>
                          <input
                            type="text"
                            id="collegeName"
                            name="collegeName"
                            value={formData.qualification.collegeName}
                            onChange={handleQualificationChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.collegeName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#4D2C5E] focus:border-[#4D2C5E]'}`}
                            placeholder="Your college/university name"
                          />
                          {formErrors.collegeName && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.collegeName}</p>
                          )}
                        </div>
                        
                        <div className="mb-3">
                          <label className="block text-gray-700 font-medium mb-2" htmlFor="passingYear">
                            Passing Year *
                          </label>
                          <input
                            type="number"
                            id="passingYear"
                            name="passingYear"
                            value={formData.qualification.passingYear}
                            onChange={handleQualificationChange}
                            min="1900"
                            max="2099"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.passingYear ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#4D2C5E] focus:border-[#4D2C5E]'}`}
                            placeholder="Year of graduation"
                          />
                          {formErrors.passingYear && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.passingYear}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-medium mb-2" htmlFor="branch">
                            Branch/Field of Study *
                          </label>
                          <input
                            type="text"
                            id="branch"
                            name="branch"
                            value={formData.qualification.branch}
                            onChange={handleQualificationChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.branch ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#4D2C5E] focus:border-[#4D2C5E]'}`}
                            placeholder="Your major/field of study"
                          />
                          {formErrors.branch && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.branch}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="resume">
                          Resume/CV *
                        </label>
                        <input
                          type="file"
                          id="resume"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                        />
                        <div className={`border-2 border-dashed rounded-lg p-4 ${formErrors.resume ? 'border-red-500' : 'border-gray-300'}`}>
                          <button
                            type="button"
                            onClick={triggerFileInput}
                            className="w-full flex flex-col items-center justify-center"
                          >
                            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-sm text-gray-600">
                              {formData.resume ? (
                                <span className="font-medium text-[#4D2C5E]">{formData.resume.name}</span>
                              ) : (
                                <>
                                  <span className="font-medium text-[#4D2C5E]">Click to upload</span> or drag and drop
                                </>
                              )}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max. 5MB)</p>
                          </button>
                        </div>
                        {formErrors.resume && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.resume}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-[#4D2C5E] to-[#6D3B7E] text-white rounded-lg hover:from-[#3A2250] hover:to-[#5D3270] transition-all shadow-md flex items-center disabled:opacity-70"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </>
                        ) : 'Submit Application'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}

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
      <Helmet>
  <link rel="canonical" href="https://upskillab.com/career" />
</Helmet>
    </motion.div>
    
  );
};

export default Careers;