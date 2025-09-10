import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock,FiTarget,FiUsers , FiUser,FiCalendar,FiActivity , FiMail, FiPhone, FiLock, FiBookOpen, FiAward, FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
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
      <div className="max-w-7xl mx-auto">



<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8"
>
  {/* Main Header */}
  <div className="text-center mb-8">
    <h1 className="text-3xl md:text-4xl font-bold text-[#4D2C5E] mb-4">
      Psychology Career Admission Test (PCAT)
    </h1>
    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
      Your Journey in Psychology Begins Here. Take the First Step with PCAT.
    </p>
  </div>

  {/* Statistics Banner */}
<div className="relative rounded-xl overflow-hidden mb-8 h-full py-4">
  {/* Full-width Banner Image */}
  <div className="absolute inset-0">
    <img 
      src="https://images.unsplash.com/photo-1522881193457-37ae97c905bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
      alt="Students taking exam" 
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#4D2C5E]/30 to-[#8B5FBF]/10"></div>
  </div>
  
  {examData.status === 'ongoing' && examStats && (
    <div className="relative z-10 h-full flex items-center">
      <div className="container mx-auto px-6">
        <div className="flex justify-end">
          <div className="lg:w-96">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white shadow-2xl border border-white/20 relative overflow-hidden">
              {/* Glass texture effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-5 flex items-center">
                  <div className="relative mr-3">
                    <div className="absolute -inset-1 bg-white/20 rounded-full animate-ping"></div>
                    <FiActivity className="h-5 w-5 relative" />
                  </div>
                  Live Exam Statistics
                </h3>
                
                <div className="space-y-4 mb-6">
                  {/* Registered Users */}
                  <div className="flex items-center justify-between p-4 bg-purple-800/20 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-purple-400/20 to-pink-400/20 p-3 rounded-xl mr-4 border border-white/10">
                        <FiUsers className="h-5 w-5 text-purple-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/80">Registered Users</p>
                        <p className="text-2xl font-bold text-white">{examStats.registeredUsers}</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400/20 to-teal-400/20 flex items-center justify-center border border-white/10">
                      <span className="text-lg font-bold text-white">{examStats.registeredUsers}</span>
                    </div>
                  </div>
                  
                  {/* Attempted Users */}
                  <div className="flex items-center justify-between p-4 bg-purple-800/20 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-blue-400/20 to-cyan-400/20 p-3 rounded-xl mr-4 border border-white/10">
                        <FiCheckCircle className="h-5 w-5 text-blue-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/80">Attempted</p>
                        <p className="text-2xl font-bold text-white">{examStats.attemptedUsers}</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 flex items-center justify-center border border-white/10">
                      <span className="text-lg font-bold text-white">{examStats.attemptedUsers}</span>
                    </div>
                  </div>
                  
                  {/* In Progress Users */}
                  <div className="flex items-center justify-between p-4 bg-purple-800/20 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-amber-400/20 to-orange-400/20 p-3 rounded-xl mr-4 border border-white/10">
                        <FiClock className="h-5 w-5 text-amber-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/80">In Progress</p>
                        <p className="text-2xl font-bold text-white">{examStats.inProgressUsers}</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-400/20 flex items-center justify-center border border-white/10">
                      <span className="text-lg font-bold text-white">{examStats.inProgressUsers}</span>
                    </div>
                  </div>
                </div>
                
                {/* Progress bar showing attempted vs registered */}
                <div className="mt-6 pt-5 border-t border-white/20">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-medium text-white/90">Participation Rate</span>
                    <span className="font-bold text-white">{Math.round((examStats.attemptedUsers / examStats.registeredUsers) * 100)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2.5 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-purple-400 h-2.5 rounded-full shadow-md transition-all duration-1000 ease-out" 
                      style={{ width: `${Math.round((examStats.attemptedUsers / examStats.registeredUsers) * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-white/60 mt-2">
                    {examStats.attemptedUsers} out of {examStats.registeredUsers} users have attempted the exam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

  {/* Problem Statement */}
  <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg mb-8">
    <div className="flex items-start">
      <div className="mr-4 text-2xl text-blue-500">💡</div>
      <div>
        <h3 className="text-lg font-semibold text-blue-800 mb-2">What is PCAT</h3>
        <p className="text-gray-700">
          Every year in India, over 20 crore people struggle with psychological stress—from anxiety and depression to career confusion and emotional struggles. Yet, our country faces a critical shortage of trained, empathetic professionals. According to WHO, India has only 0.75 psychologists per 100,000 people, compared to the global average of 3.
        </p>
      </div>
    </div>
  </div>

  {/* Callout Section */}
  <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-8">
    <div className="flex items-start">
      <div className="mr-4 text-2xl text-purple-600">👉</div>
      <div>
        <p className="text-gray-700 mb-2">
          This gap cannot be filled by just more graduates or degrees. What India truly needs are empathetic, skilled, and responsible professionals who can listen, guide, and heal.
        </p>
        <p className="text-gray-700 mb-2">
          At Upskillab, we believe psychology is not just a subject—it's a responsibility. And that responsibility must be entrusted only to those who are serious, committed, and emotionally aware.
        
        </p>
        <p className='text-gray-700'>
          That’s why, before you join our professional psychology programs, we invite you to take the Psychology Career Admission Test (PCAT)—a carefully designed tool to identify learners who have the passion and sincerity to create real impact.
        </p>
      </div>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    {/* Why PCAT Matters */}
    <div className="bg-purple-50 p-5 rounded-xl">
      <div className="flex items-center mb-4">
        <div className="bg-[#4D2C5E] p-2 rounded-full mr-3">
          <FiTarget className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-[#4D2C5E]">Why PCAT Matters</h3>
      </div>
      <ul className="space-y-3">
        <li className="flex items-start">
          <div className="bg-white p-1 rounded-full mr-3 mt-1">
            <div className="w-2 h-2 bg-[#4D2C5E] rounded-full"></div>
          </div>
          <span>90% of students in India never receive timely counseling for their careers or mental health.</span>
        </li>
        <li className="flex items-start">
          <div className="bg-white p-1 rounded-full mr-3 mt-1">
            <div className="w-2 h-2 bg-[#4D2C5E] rounded-full"></div>
          </div>
          <span>The demand for psychology professionals is expected to grow by 40% in the next 5 years.</span>
        </li>
        <li className="flex items-start">
          <div className="bg-white p-1 rounded-full mr-3 mt-1">
            <div className="w-2 h-2 bg-[#4D2C5E] rounded-full"></div>
          </div>
          <span>Without empathy and real skill, degrees are just paper. Lives can only be changed by professionals who care.</span>
        </li>
        <li className="flex items-start">
          <div className="bg-white p-1 rounded-full mr-3 mt-1">
            <div className="w-2 h-2 bg-[#4D2C5E] rounded-full"></div>
          </div>
          <span>At Upskillab, we don't believe in creating lakhs of psychology graduates. We believe in creating thousands of empathetic, skilled professionals who can truly transform lives.</span>
        </li>
      </ul>
    </div>

    {/* Exam Details */}
    <div className="bg-green-50 p-5 rounded-xl">
      <div className="flex items-center mb-4">
        <div className="bg-green-600 p-2 rounded-full mr-3">
          <FiClock className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-green-800">Exam Details</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-green-200 pb-2">
          <span className="text-gray-600">Duration:</span>
          <span className="font-semibold">20–30 minutes</span>
        </div>
        <div className="flex justify-between items-center border-b border-green-200 pb-2">
          <span className="text-gray-600">Mode:</span>
          <span className="font-semibold">Online | Objective + Short Answers</span>
        </div>
        <div className="flex justify-between items-center border-b border-green-200 pb-2">
          <span className="text-gray-600">Result:</span>
          <span className="font-semibold">Shared within 24 to 72 hours</span>
        </div>
        <div className="pt-2">
          <p className="text-gray-700 text-sm">
            PCAT is not about judging you—it's about preparing you. It ensures that only those who are ready to walk this path with empathy and responsibility move forward.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Why PCAT Section */}
  <div className="bg-gradient-to-r from-[#4D2C5E] to-[#6D3B8F] text-white rounded-xl p-6 mb-8">
    <h3 className="text-xl font-semibold mb-4 text-center">Why Take PCAT?</h3>
    <p className="text-center mb-4">
      That's why, before you join our professional psychology programs, we invite you to take the Psychology Career Admission Test (PCAT)—a carefully designed tool to identify learners who have the passion and sincerity to create real impact.
    </p>
  </div>

  {/* Testimonials Section */}
  <div className="mb-8">
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-[#4D2C5E]">Real Voices from Our Learners</h2>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Testimonial 1 */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-purple-600 font-bold">A</span>
          </div>
          <div>
            <h4 className="font-semibold">Aditi Sharma</h4>
            <p className="text-sm text-gray-500">PCAT Candidate</p>
          </div>
        </div>
        <div className="text-yellow-400 mb-2">★★★★★</div>
        <p className="text-gray-700 italic">"Before PCAT, I thought psychology was just theory. The test made me realise the responsibility that comes with helping someone through their struggles."</p>
      </div>
      
      {/* Testimonial 2 */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-600 font-bold">R</span>
          </div>
          <div>
            <h4 className="font-semibold">Rohan Mehta</h4>
            <p className="text-sm text-gray-500">Psychology Student at Upskillab</p>
          </div>
        </div>
        <div className="text-yellow-400 mb-2">★★★★★</div>
        <p className="text-gray-700 italic">"The questions weren't just about knowledge—they made me reflect on my mindset and empathy. That's when I knew I was ready to pursue psychology seriously."</p>
      </div>
      
      {/* Testimonial 3 */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-pink-600 font-bold">P</span>
          </div>
          <div>
            <h4 className="font-semibold">Priya Nair</h4>
            <p className="text-sm text-gray-500">Upskillab Learner</p>
          </div>
        </div>
        <div className="text-yellow-400 mb-2">★★★★★</div>
        <p className="text-gray-700 italic">"PCAT felt like a mirror—it showed me both my strengths and areas I needed to work on. I felt confident when I got my admission letter."</p>
      </div>
    </div>
  </div>

  {/* Why Upskillab Section */}
  <div className="bg-gray-50 p-6 rounded-xl mb-8">
    <div className="flex items-center mb-4">
      <div className="bg-[#4D2C5E] p-2 rounded-full mr-3">
        <FiAward className="h-5 w-5 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-[#4D2C5E]">Why Upskillab?</h3>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ul className="space-y-3">
        <li className="flex items-start">
          <div className="bg-white p-1 rounded-full mr-3 mt-1">
            <div className="w-2 h-2 bg-[#4D2C5E] rounded-full"></div>
          </div>
          <span>Industry-recognised certifications</span>
        </li>
        <li className="flex items-start">
          <div className="bg-white p-1 rounded-full mr-3 mt-1">
            <div className="w-2 h-2 bg-[#4D2C5E] rounded-full"></div>
          </div>
          <span>Hands-on practice with case studies</span>
        </li>
      </ul>
      <ul className="space-y-3">
        <li className="flex items-start">
          <div className="bg-white p-1 rounded-full mr-3 mt-1">
            <div className="w-2 h-2 bg-[#4D2C5E] rounded-full"></div>
          </div>
          <span>1:1 Mentorship & career pathways</span>
        </li>
        <li className="flex items-start">
          <div className="bg-white p-1 rounded-full mr-3 mt-1">
            <div className="w-2 h-2 bg-[#4D2C5E] rounded-full"></div>
          </div>
          <span>Focus on empathy + skill, not just theory</span>
        </li>
      </ul>
    </div>
    
    <div className="mt-4 p-4 bg-white rounded-lg">
      <p className="text-gray-700 font-medium">
        We don't just teach. We mentor, train, and transform—so you become the professional you're meant to be.
      </p>
    </div>
  </div>

  {/* Final Message */}
  <div className="bg-gradient-to-r from-[#f9f0ff] to-[#e6d4f7] p-6 rounded-xl mb-8">
    <div className="text-center">
      <div className="text-3xl mb-4">✨</div>
      <p className="text-gray-800 font-medium">
        India doesn't need more data, more degrees, or more numbers. It needs empathetic and skilled professionals who can heal minds and guide lives. If you believe you can be one of them—your journey begins with PCAT.
      </p>
    </div>
  </div>

  {/* Call to Action */}
  <div className="text-center bg-gradient-to-r from-[#f8f5ff] to-[#f0ebff] p-8 rounded-xl">
    <h2 className="text-2xl font-bold text-[#4D2C5E] mb-4">Take the First Step</h2>
    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
      This is your moment to commit to a career of meaning and responsibility.
    </p>
    {examData.status === 'ongoing' ? (
    <button
    onClick={() => setShowRegisterModal(true)}
    className="bg-[#4D2C5E] cursor-pointer hover:bg-[#3a1f47] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 mb-6">
      Register for Exam
    </button>
    ):(
      <button
    className="bg-[#4D2C5E] hover:bg-[#3a1f47] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 mb-6">
      Registeration will start soon
    </button>
    )}
    
    <div className="mt-6 text-sm text-gray-600">
      <p className="font-medium mb-2">Need Help?</p>
      <p>📧 admissions@upskillab.com | 📞 +91-9319426464</p>
    </div>
  </div>
</motion.div>


        {/* Exam Info Card */}
{examData && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100/50 overflow-hidden relative"
  >
    {/* Decorative elements */}
    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#FF7426]/5 to-[#FF9142]/10 rounded-full -translate-y-20 translate-x-20"></div>
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-[#4D2C5E]/5 to-[#3A2152]/10 rounded-full -translate-x-16 translate-y-16"></div>
    
    {/* Header with status and marks */}
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative z-10">
      <div className="flex items-center gap-3">
        <div className={`px-5 py-2 rounded-full text-sm font-semibold flex items-center backdrop-blur-sm border ${
          examData.status === 'ongoing' 
            ? 'bg-green-50/80 text-green-700 border-green-200/60 shadow-sm' 
            : examData.status === 'upcoming'
            ? 'bg-blue-50/80 text-blue-700 border-blue-200/60 shadow-sm'
            : 'bg-purple-50/80 text-purple-700 border-purple-200/60 shadow-sm'
        }`}>
          {examData.status === 'ongoing' ? (
            <>
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2.5 animate-pulse"></div>
              Live - Ongoing
            </>
          ) : (
            <>
              <FiClock className="h-4 w-4 mr-2" />
              Upcoming
            </>
          )}
        </div>
        
        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold flex items-center shadow-lg">
          <FiAward className="h-4 w-4 mr-2" />
          {examData.totalMarks} Marks
        </div>
      </div>
      
      {/* Timer for upcoming exams */}
      {examData.status === 'upcoming' && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center border border-amber-200/60 shadow-sm">
          <FiClock className="h-4 w-4 mr-2" />
          Starts in {getTimeUntilStart(examData.startDate, examData.startTime)}
        </div>
      )}
    </div>
    
    <div className="flex flex-col lg:flex-row gap-10 relative z-10">
      {/* Exam Details */}
      <div className="flex-1">
        <div className="mb-2">
          <span className="inline-block bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white text-xs font-semibold px-3 py-1 rounded-full">
            PCAT EXAMINATION
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-[#4D2C5E] mb-4 leading-tight">
          {examData.title}
        </h2>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed font-light">
          {examData.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex items-center p-5 bg-white/80 rounded-2xl border border-gray-100/60 shadow-sm hover:shadow-md transition-all backdrop-blur-sm">
            <div className="bg-gradient-to-br from-[#4D2C5E] to-[#3A2152] p-3 rounded-xl shadow-lg mr-4 text-white flex-shrink-0">
              <FiClock className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-gray-500 text-xs uppercase tracking-wider mb-1">Duration</p>
              <p className="text-xl font-bold text-[#4D2C5E]">{examData.durationMinutes} minutes</p>
            </div>
          </div>
          
          <div className="flex items-center p-5 bg-white/80 rounded-2xl border border-gray-100/60 shadow-sm hover:shadow-md transition-all backdrop-blur-sm">
            <div className="bg-gradient-to-br from-[#4D2C5E] to-[#3A2152] p-3 rounded-xl shadow-lg mr-4 text-white flex-shrink-0">
              <FiCalendar className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-gray-500 text-xs uppercase tracking-wider mb-1">Start Time</p>
              <p className="text-xl font-bold text-[#4D2C5E]">
                {formatDate(examData.startDate)} at {examData.startTime}
              </p>
            </div>
          </div>
          
          <div className="flex items-center p-5 bg-white/80 rounded-2xl border border-gray-100/60 shadow-sm hover:shadow-md transition-all backdrop-blur-sm">
            <div className="bg-gradient-to-br from-[#4D2C5E] to-[#3A2152] p-3 rounded-xl shadow-lg mr-4 text-white flex-shrink-0">
              <FiCalendar className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-gray-500 text-xs uppercase tracking-wider mb-1">End Time</p>
              <p className="text-xl font-bold text-[#4D2C5E]">
                {formatDate(examData.endDate)} at {examData.endTime}
              </p>
            </div>
          </div>
          
          <div className="flex items-center p-5 bg-white/80 rounded-2xl border border-gray-100/60 shadow-sm hover:shadow-md transition-all backdrop-blur-sm">
            <div className="bg-gradient-to-br from-[#4D2C5E] to-[#3A2152] p-3 rounded-xl shadow-lg mr-4 text-white flex-shrink-0">
              <FiBookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-gray-500 text-xs uppercase tracking-wider mb-1">Exam Type</p>
              <p className="text-xl font-bold text-[#4D2C5E]">Assessment</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual element - decorative exam illustration */}
      <div className="hidden lg:flex items-center justify-center w-1/3">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-indigo-100/40 rounded-full blur-2xl"></div>
          <div className="relative bg-white/80 p-8 rounded-3xl border border-gray-100/60 shadow-xl backdrop-blur-sm">
            <div className="w-32 h-32 bg-gradient-to-br from-[#4D2C5E] to-[#3A2152] rounded-3xl flex items-center justify-center text-white shadow-2xl">
              <FiBookOpen className="h-14 w-14" />
            </div>
            {/* <div className="mt-6 text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-[#FF7426] to-[#FF9142] text-white px-4 py-2 rounded-full text-sm font-semibold">
                <FiAward className="h-4 w-4 mr-1.5" />
                Scholarship Exam
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
    
    {/* Action Buttons */}
    <div className="mt-10 pt-8 border-t border-gray-200/50 relative z-10">
      {examData.status === 'ongoing' ? (
        <div className="flex justify-center">
          <motion.button
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px -10px rgba(255, 116, 38, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowLoginModal(true)}
            className="relative bg-gradient-to-r from-[#FF7426] to-[#FF9142] text-white py-5 px-12 rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold text-lg shadow-xl group overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            
            <span className="relative flex items-center justify-center">
              <FiLock className="mr-3 h-6 w-6" />
              Attempt Exam Now
            </span>
          </motion.button>
        </div>
      ) : (
        <div className="text-center">
          <div className="inline-flex items-center bg-white/90 px-8 py-4 rounded-2xl border border-gray-200/60 shadow-lg backdrop-blur-sm">
            <div className="bg-blue-100 p-2.5 rounded-full mr-4">
              <FiClock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-blue-800">Registration opens soon</p>
              <p className="text-sm text-blue-600">
                {formatDate(examData.startDate)} at {examData.startTime}
              </p>
            </div>
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
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 border border-gray-100"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-[#4D2C5E]">Register for PCAT Exam</h3>
          <button
            onClick={() => {
              setShowRegisterModal(false);
              setRegistrationSuccess(null);
            }}
            className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200 p-1"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {!registrationSuccess ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Registration Instructions */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-[#4D2C5E] mb-3 flex items-center">
                <FiInfo className="mr-2" />
                Registration Process
              </h4>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="bg-[#4D2C5E] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">1</span>
                  Fill out this registration form with your details
                </li>
                <li className="flex items-start">
                  <span className="bg-[#4D2C5E] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">2</span>
                  Our team will verify your information
                </li>
                <li className="flex items-start">
                  <span className="bg-[#4D2C5E] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">3</span>
                  You will receive an email with login details and OTP
                </li>
                <li className="flex items-start">
                  <span className="bg-[#4D2C5E] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">4</span>
                  Use the email and OTP to access the exam portal
                </li>
              </ol>
              
              <div className="mt-4 p-3 bg-white rounded border">
                <p className="text-xs text-gray-600">
                  <strong>Note:</strong> After registration, please check your email (including spam folder) for verification and login instructions.
                </p>
              </div>
            </div>
            
            {/* Registration Form */}
            <div>
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
                  className="w-full cursor-pointer bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white py-2.5 rounded-lg hover:opacity-90 transition-all font-medium flex items-center justify-center mt-2"
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
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Registration Successful!</h4>
            <p className="text-gray-600 mb-4">
              {registrationSuccess.message || 'Check your email for OTP and further instructions.'}
            </p>
            
            {/* Additional instructions after registration */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-left max-w-md mx-auto mb-4">
              <h5 className="font-medium text-[#4D2C5E] mb-2">What happens next?</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Check your email for verification</li>
                <li>✓ Look for OTP in your inbox (check spam folder)</li>
                <li>✓ Use the provided credentials to login</li>
                <li>✓ Exam access will be granted after verification</li>
              </ul>
            </div>
            
            <button
              onClick={() => setShowRegisterModal(false)}
              className="bg-[#4D2C5E] cursor-pointer text-white py-2 px-6 rounded-lg hover:opacity-90 transition-colors font-medium"
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
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 border border-gray-100 my-8"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-[#4D2C5E]">Login to PCAT Exam</h3>
          <button
            onClick={() => {
              setShowLoginModal(false);
              setLoginSuccess(null);
            }}
            className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200 p-1"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Login Form */}
          <div className="h-full flex flex-col">
  {!loginSuccess ? (
    <div className="flex-1">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#4D2C5E] mb-2">Exam Login</h3>
        <p className="text-gray-600 text-sm">Enter your credentials to access the PCAT examination</p>
      </div>
      
      <form onSubmit={handleLoginSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1 text-[#4D2C5E]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
            </svg>
            Email Address *
          </label>
          <input
            type="email"
            value={loginForm.email}
            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200"
            placeholder="Enter your registered email"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1 text-[#4D2C5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            OTP (One-Time Password) *
          </label>
          <input
            type="text"
            value={loginForm.otp}
            onChange={(e) => setLoginForm({...loginForm, otp: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200"
            placeholder="Enter 6-digit OTP received in email"
            required
            maxLength={6}
          />
          <p className="text-xs text-gray-500 mt-1 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            Check your email inbox for the OTP code
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-gradient-to-r from-[#FF7426] to-[#FF9142] text-white py-3 rounded-lg hover:opacity-90 transition-all font-medium flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login to Exam
            </>
          )}
        </button>
      </form>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          First time taking the exam?
        </h4>
        <p className="text-xs text-blue-600">
          Make sure to read all the instructions carefully before starting your exam. 
          Contact support if you need assistance.
        </p>
      </div>
    </div>
  ) : (
    <div className="text-center py-4 flex flex-col justify-center h-full">
      {loginSuccess.message && loginSuccess.message.includes("already attempted") ? (
        <>
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">Exam Already Attempted</h4>
          <p className="text-gray-600 mb-4">
            {loginSuccess.message || 'You have already attempted this exam. Please wait for results.'}
          </p>
        </>
      ) : (
        <>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">Login Successful!</h4>
          <p className="text-gray-600 mb-4">
            {loginSuccess.message || 'You are being redirected to the exam page.'}
          </p>
          <div className="mt-4">
            <div className="inline-block h-1 w-16 bg-green-200 rounded-full">
              <div className="h-1 w-1/2 bg-green-600 rounded-full animate-progress"></div>
            </div>
          </div>
        </>
      )}
      <button
        onClick={() => setShowLoginModal(false)}
        className="mt-6 bg-[#4D2C5E] cursor-pointer text-white py-2 px-6 rounded-lg hover:opacity-90 transition-colors font-medium"
      >
        Close
      </button>
    </div>
  )}
</div>
          
          {/* Instructions Section */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-[460px] overflow-y-auto">
            <h4 className="text-lg font-semibold text-[#4D2C5E] mb-4">Exam Instructions</h4>
            
            <div className="space-y-4">
              {/* Time Instructions */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-[#4D2C5E] p-1 rounded mr-2">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h5 className="font-medium text-gray-800">During the Exam</h5>
                </div>
                <ul className="text-sm text-gray-600 pl-8 list-disc space-y-1">
                  <li>The exam will have a fixed time limit. The timer will start as soon as you begin the exam.</li>
                  <li>If you do not submit before time ends, your exam will be auto-submitted.</li>
                  <li>If you leave in the middle of the exam (close browser, power cut, internet issue, etc.):
                    <ul className="pl-4 list-circle space-y-1 mt-1">
                      <li>You can rejoin and continue the same exam.</li>
                      <li>But the remaining time will continue (no extra time will be given).</li>
                    </ul>
                  </li>
                  <li>Once you submit your exam, you cannot attempt it again.</li>
                </ul>
              </div>
              
              {/* Technical Guidelines */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-[#4D2C5E] p-1 rounded mr-2">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h5 className="font-medium text-gray-800">Technical Guidelines</h5>
                </div>
                <ul className="text-sm text-gray-600 pl-8 list-disc space-y-1">
                  <li>Ensure you have a stable internet connection before starting.</li>
                  <li>Use a laptop/desktop or mobile device with good battery backup or keep it plugged into power.</li>
                  <li>Do not refresh or close the browser during the exam.</li>
                  <li>Avoid switching between tabs, windows, or apps — it may end your session.</li>
                </ul>
              </div>
              
              {/* Results & Eligibility */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-[#4D2C5E] p-1 rounded mr-2">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h5 className="font-medium text-gray-800">Results & Eligibility</h5>
                </div>
                <ul className="text-sm text-gray-600 pl-8 list-disc space-y-1">
                  <li>After submission, your exam will be evaluated.</li>
                  <li>Results will be sent to your registered email address.</li>
                  <li>Along with your result, you will receive a Enroll ID to check your result anytime on the portal.</li>
                  <li>If you qualify, you will be eligible for the PCAT Scholarships.</li>
                </ul>
              </div>
              
              {/* Rules & Conduct */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-[#4D2C5E] p-1 rounded mr-2">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h5 className="font-medium text-gray-800">Rules & Conduct</h5>
                </div>
                <ul className="text-sm text-gray-600 pl-8 list-disc space-y-1">
                  <li>Do not use books, notes, calculators, or external help.</li>
                  <li>Do not attempt to cheat or share your login details.</li>
                  <li>Any malpractice may lead to disqualification.</li>
                </ul>
              </div>
              
              {/* Support */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-[#4D2C5E] p-1 rounded mr-2">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h5 className="font-medium text-gray-800">Support</h5>
                </div>
                <p className="text-sm text-gray-600 pl-8">If you face any issue:</p>
                <ul className="text-sm text-gray-600 pl-8 list-disc space-y-1">
                  <li>Email: admissions@upskillab.com</li>
                  <li>Phone: +91-9319426464</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      </div>
    </div>
  );
};

export default PCATExamPortal;