import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiUser,FiCalendar,FiActivity , FiMail, FiPhone, FiLock, FiBookOpen, FiAward, FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDataHandler, postDataHandler } from '../../config/services';
import ApiConfig from '../../config/apiConfig';

const PCATExamPortal = () => {
  const [examData, setExamData] = useState(null);
  const [examStats, setExamStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    number: ''
  });
  const [loginForm, setLoginForm] = useState({
    email: '',
    otp: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);

  // Fetch exam data
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setIsLoading(true);
        
        // First try to get ongoing exam
        const ongoingResponse = await getDataHandler('getExam');
        if (ongoingResponse && ongoingResponse._id) {
          setExamData(ongoingResponse);
          
          // Get exam stats if ongoing
          const endpoint = ApiConfig.getExamStatus(ongoingResponse._id)
          const statsResponse = await getDataHandler(endpoint, null, null, true);
          setExamStats(statsResponse);
        } else {
          // If no ongoing exam, try to get upcoming exam
          const upcomingResponse = await getDataHandler('getUpcommingExam');
          if (upcomingResponse && upcomingResponse._id) {
            setExamData(upcomingResponse);
          }
        }
      } catch (error) {
        console.error('Error fetching exam data:', error);
        toast.error('Failed to load exam information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExamData();
  }, []);

  // Handle registration form submission
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...registrationForm,
        examId: examData._id
      };

      const response = await postDataHandler('registeruser', payload);
      console.log(response)
      setRegistrationSuccess(response);
      toast.success(response.message || 'Registration successful! We will Notify you After Approve');
      
      // Reset form
      setRegistrationForm({ name: '', email: '', number: '' });
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...loginForm,
        examId: examData._id
      };
      
      const response = await postDataHandler('varifyOTP', payload);
      setLoginSuccess(response);
      console.log(response.message)
        toast.success(response.message+" Redirecting to exam..." || 'OTP verified successfully! Redirecting to exam...');
        
        // Store data in localStorage
        localStorage.setItem('pcatExamData', JSON.stringify({
          examId: examData._id,
          email: loginForm.email,
          otp: loginForm.otp,
          submissionId: response.submission?._id,
          startedAt:response.submission.startedAt
        }));
        
        // Redirect to exam page after a short delay
        setTimeout(() => {
          window.location.href = `/exam/${examData._id}`;
        }, 2000);
      
    } catch (error) {
      console.error('Login error:', error);
      console.log(error)
      toast.error(error?.message+ " wait for Result" || 'OTP verification failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Calculate time until exam starts/ends
  const getTimeRemaining = (targetDate, targetTime) => {
    const now = new Date();
    const [hours, minutes] = targetTime.split(':');
    const targetDateTime = new Date(targetDate);
    targetDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const diffMs = targetDateTime - now;
    
    if (diffMs <= 0) return null;
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours: hoursRemaining, minutes: minutesRemaining };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#4D2C5E] to-[#7B4B9E]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4D2C5E] to-[#7B4B9E] py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">PCAT Examination Portal</h1>
          <p className="text-white/80">Progressive Career Aptitude Test</p>
        </div>



        {/* Instructions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-[#4D2C5E] mb-6 flex items-center">
            <FiInfo className="mr-2 h-6 w-6" />
            📚 PCAT Exam Instructions
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              <strong>Dear Student,</strong> please read the following instructions carefully before starting your exam.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#4D2C5E] mb-2 flex items-center">
                  <FiUser className="mr-2 h-5 w-5" />
                  🔑 Registration & Login
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Register yourself for this exam using your correct details.</li>
                  <li>After registration, our team will verify your information.</li>
                  <li>Once verified, you will receive an email with your login details and a One-Time Password (OTP).</li>
                  <li>Use the email and OTP to log in and access the exam portal.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#4D2C5E] mb-2 flex items-center">
                  <FiClock className="mr-2 h-5 w-5" />
                  ⏰ During the Exam
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>The exam will have a fixed time limit. The timer will start as soon as you begin the exam.</li>
                  <li>If you do not submit before time ends, your exam will be auto-submitted.</li>
                  <li>If you leave in the middle of the exam (close browser, power cut, internet issue, etc.):
                    <ul className="list-circle list-inside ml-6">
                      <li>You can rejoin and continue the same exam.</li>
                      <li>But the remaining time will continue (no extra time will be given).</li>
                    </ul>
                  </li>
                  <li>Once you submit your exam, you cannot attempt it again.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#4D2C5E] mb-2 flex items-center">
                  <FiBookOpen className="mr-2 h-5 w-5" />
                  💻 Technical Guidelines
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Ensure you have a stable internet connection before starting.</li>
                  <li>Use a laptop/desktop or mobile device with good battery backup or keep it plugged into power.</li>
                  <li>Do not refresh or close the browser during the exam.</li>
                  <li>Avoid switching between tabs, windows, or apps — it may end your session.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#4D2C5E] mb-2 flex items-center">
                  <FiAward className="mr-2 h-5 w-5" />
                  📜 Results & Eligibility
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>After submission, your exam will be evaluated.</li>
                  <li>Results will be sent to your registered email address.</li>
                  <li>Along with your result, you will receive a Result ID to check your result anytime on the portal.</li>
                  <li>If you qualify, you will be eligible for the PCAT Scholarships.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#4D2C5E] mb-2 flex items-center">
                  <FiAlertCircle className="mr-2 h-5 w-5" />
                  ⚠️ Rules & Conduct
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Do not use books, notes, calculators, or external help.</li>
                  <li>Do not attempt to cheat or share your login details.</li>
                  <li>Any malpractice may lead to disqualification.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#4D2C5E] mb-2">📞 Support</h3>
                <p className="text-gray-700">If you face any issue:</p>
                <ul className="list-none text-gray-700 space-y-1">
                  <li>📧 Email: info@upskillab.com</li>
                  <li>📞 Phone: 9319427070</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>


        {/* Exam Info Card */}
       {examData && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100"
  >
    {/* Header with status and marks */}
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div className="flex items-center gap-2">
        <div className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center ${
          examData.status === 'ongoing' 
            ? 'bg-green-100 text-green-800' 
            : examData.status === 'upcoming'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-purple-100 text-purple-800'
        }`}>
          {examData.status === 'ongoing' ? (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live - Ongoing
            </>
          ) : (
            <>
              <FiClock className="h-4 w-4 mr-1.5" />
              Upcoming
            </>
          )}
        </div>
        
        <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-medium flex items-center">
          <FiAward className="h-4 w-4 mr-1.5" />
          {examData.totalMarks} Marks
        </div>
      </div>
      
      {/* Timer for upcoming exams */}
      {examData.status === 'upcoming' && (
        <div className="bg-orange-50 text-orange-800 px-4 py-1.5 rounded-full text-sm font-medium flex items-center">
          <FiClock className="h-4 w-4 mr-1.5" />
          Starts in {getTimeUntilStart(examData.startDate, examData.startTime)}
        </div>
      )}
    </div>
    
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Exam Details */}
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold text-[#4D2C5E] mb-3">{examData.title}</h2>
        <p className="text-gray-600 mb-6 text-lg">{examData.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
              <FiClock className="h-5 w-5 text-[#4D2C5E]" />
            </div>
            <div>
              <p className="font-medium text-gray-500">Duration</p>
              <p className="text-lg font-semibold text-[#4D2C5E]">{examData.durationMinutes} minutes</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
              <FiCalendar className="h-5 w-5 text-[#4D2C5E]" />
            </div>
            <div>
              <p className="font-medium text-gray-500">Start Time</p>
              <p className="text-lg font-semibold text-[#4D2C5E]">
                {formatDate(examData.startDate)} at {examData.startTime}
              </p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
              <FiCalendar className="h-5 w-5 text-[#4D2C5E]" />
            </div>
            <div>
              <p className="font-medium text-gray-500">End Time</p>
              <p className="text-lg font-semibold text-[#4D2C5E]">
                {formatDate(examData.endDate)} at {examData.endTime}
              </p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
              <FiBookOpen className="h-5 w-5 text-[#4D2C5E]" />
            </div>
            <div>
              <p className="font-medium text-gray-500">Exam Type</p>
              <p className="text-lg font-semibold text-[#4D2C5E]">PCAT Assessment</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats for ongoing exam - Enhanced Design */}
      {examData.status === 'ongoing' && examStats && (
        <div className="lg:w-96">
          <div className="bg-gradient-to-br from-[#4D2C5E] to-[#3A2152] rounded-2xl p-5 text-white shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FiActivity className="mr-2 h-5 w-5" />
              Live Exam Statistics
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-lg mr-3">
                    <FiUser className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Registered Users</p>
                    <p className="text-2xl font-bold">{examStats.registeredUsers}</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="text-lg font-bold">{examStats.registeredUsers}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-lg mr-3">
                    <FiCheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Attempted</p>
                    <p className="text-2xl font-bold">{examStats.attemptedUsers}</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-lg font-bold">{examStats.attemptedUsers}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-lg mr-3">
                    <FiClock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">In Progress</p>
                    <p className="text-2xl font-bold">{examStats.inProgressUsers}</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <span className="text-lg font-bold">{examStats.inProgressUsers}</span>
                </div>
              </div>
            </div>
            
            {/* Progress bar showing attempted vs registered */}
            <div className="mt-5">
              <div className="flex justify-between text-sm mb-1">
                <span>Participation Rate</span>
                <span>{Math.round((examStats.attemptedUsers / examStats.registeredUsers) * 100)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-400 h-2.5 rounded-full" 
                  style={{ width: `${Math.round((examStats.attemptedUsers / examStats.registeredUsers) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
    {/* Action Buttons */}
    <div className="mt-8 pt-6 border-t border-gray-100">
      {examData.status === 'ongoing' ? (
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowRegisterModal(true)}
            className="flex-1 bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center text-lg"
          >
            <FiUser className="mr-3 h-5 w-5" />
            Register for Exam
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowLoginModal(true)}
            className="flex-1 bg-gradient-to-r from-[#FF7426] to-[#FF9142] text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center text-lg"
          >
            <FiLock className="mr-3 h-5 w-5" />
            Attempt Exam Now
          </motion.button>
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="inline-flex items-center bg-blue-50 text-blue-700 px-6 py-3 rounded-full text-lg">
            <FiClock className="mr-3 h-5 w-5" />
            Registration opens {formatDate(examData.startDate)} at {examData.startTime}
          </div>
        </div>
      )}
    </div>
  </motion.div>
)}

        {/* Registration Modal */}
        <AnimatePresence>
          {showRegisterModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#4D2C5E]">Register for PCAT Exam</h3>
                  <button
                    onClick={() => {
                      setShowRegisterModal(false);
                      setRegistrationSuccess(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {!registrationSuccess ? (
                  <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={registrationForm.name}
                        onChange={(e) => setRegistrationForm({...registrationForm, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={registrationForm.email}
                        onChange={(e) => setRegistrationForm({...registrationForm, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={registrationForm.number}
                        onChange={(e) => setRegistrationForm({...registrationForm, number: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white py-2.5 rounded-lg hover:opacity-90 transition-all font-medium flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Registering...
                        </>
                      ) : (
                        'Register Now'
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Registration Successful!</h4>
                    <p className="text-gray-600 mb-4">
                      {registrationSuccess.message || 'Check your email for OTP and further instructions.'}
                    </p>
                    <button
                      onClick={() => setShowRegisterModal(false)}
                      className="bg-[#4D2C5E] text-white py-2 px-6 rounded-lg hover:opacity-90 transition-colors font-medium"
                    >
                      Close
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Modal */}
        <AnimatePresence>
          {showLoginModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#4D2C5E]">Login to PCAT Exam</h3>
                  <button
                    onClick={() => {
                      setShowLoginModal(false);
                      setLoginSuccess(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {!loginSuccess ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200"
                        placeholder="Enter your registered email"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">OTP *</label>
                      <input
                        type="text"
                        value={loginForm.otp}
                        onChange={(e) => setLoginForm({...loginForm, otp: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200"
                        placeholder="Enter OTP received in email"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#FF7426] to-[#FF9142] text-white py-2.5 rounded-lg hover:opacity-90 transition-all font-medium flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Verifying...
                        </>
                      ) : (
                        'Login to Exam'
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    {loginSuccess.message && loginSuccess.message.includes("already attempted") ? (
                      <>
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FiAlertCircle className="h-8 w-8 text-yellow-600" />
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Exam Already Attempted</h4>
                        <p className="text-gray-600 mb-4">
                          {loginSuccess.message || 'You have already attempted this exam. Please wait for results.'}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FiCheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Login Successful!</h4>
                        <p className="text-gray-600 mb-4">
                          {loginSuccess.message || 'You are being redirected to the exam page.'}
                        </p>
                      </>
                    )}
                    <button
                      onClick={() => setShowLoginModal(false)}
                      className="bg-[#4D2C5E] text-white py-2 px-6 rounded-lg hover:opacity-90 transition-colors font-medium"
                    >
                      Close
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PCATExamPortal;