import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getDataHandler, postDataHandler } from '../../config/services';

// Move RegistrationModal component outside to prevent re-renders
const RegistrationModal = React.memo(({ 
  showRegistrationModal, 
  selectedExam, 
  registrationData, 
  registrationLoading, 
  onInputChange, 
  onSubmit, 
  onClose 
}) => (
  <AnimatePresence>
    {showRegistrationModal && selectedExam && (
     <motion.div
  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  onClick={onClose}
>
  <motion.div
    className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full mx-2 my-4 sm:mx-4 max-h-[90vh] overflow-y-auto hide-scrollbar"
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    onClick={(e) => e.stopPropagation()}
  >
    {/* Header */}
    <div className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl text-center">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
        Exam Registration
      </h2>
      <p className="text-white/90 text-xs sm:text-sm">
        {selectedExam.title}
      </p>
    </div>

    {/* Form */}
    <form onSubmit={onSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="userName"
          value={registrationData.userName}
          onChange={onInputChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent outline-none transition-all"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
          Email Address *
        </label>
        <input
          type="email"
          name="userEmail"
          value={registrationData.userEmail}
          onChange={onInputChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent outline-none transition-all"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          name="userPhone"
          value={registrationData.userPhone}
          onChange={onInputChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent outline-none transition-all"
          placeholder="Enter your phone number"
          required
        />
      </div>

      <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
        <p className="text-blue-800 text-xs sm:text-sm">
          📝 By registering, you agree to attempt this medical exam honestly and provide accurate information.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
          disabled={registrationLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#FF7426] to-[#FF8C42] text-white rounded-lg font-semibold hover:from-[#FF8C42] hover:to-[#FF7426] transition-all shadow-md disabled:opacity-50"
          disabled={registrationLoading}
        >
          {registrationLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-white rounded-full animate-spin mr-2" />
              Registering...
            </div>
          ) : (
            'Start Exam'
          )}
        </button>
      </div>
    </form>
  </motion.div>
</motion.div>
    )}
  </AnimatePresence>
));

// Move ExamCard component outside as well
const ExamCard = React.memo(({ exam, onAttemptExam }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {/* Exam Image */}
    <div className="relative h-48 overflow-hidden">
      <img
        src={exam.image}
        alt={exam.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Exam Badge */}
      <div className="absolute top-4 right-4">
        <span className="bg-[#FF7426] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          Medical Exam
        </span>
      </div>
    </div>

    {/* Exam Content */}
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#4D2C5E] transition-colors">
        {exam.title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {exam.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {new Date(exam.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
          })}
        </span>
        
        <motion.button
          onClick={() => onAttemptExam(exam)}
          className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-[#5a3a6e] hover:to-[#8c5cb3] transition-all shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Attempt Exam
        </motion.button>
      </div>
    </div>
  </motion.div>
));

const MedicalExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    userName: '',
    userEmail: '',
    userPhone: ''
  });

  const navigate = useNavigate();

  // Fetch medical exams
  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const response = await getDataHandler('medicalExam');
        if (response) {
          setExams(response);
        } else {
          throw new Error('Failed to fetch exams');
        }
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load medical exams');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Handle exam attempt click - use useCallback
  const handleAttemptExam = useCallback((exam) => {
    setSelectedExam(exam);
    setShowRegistrationModal(true);
  }, []);

  // Handle registration form input change - use useCallback
  const handleRegistrationChange = useCallback((e) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Handle registration form submission - use useCallback
  const handleRegistrationSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!registrationData.userName || !registrationData.userEmail || !registrationData.userPhone) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(registrationData.userEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setRegistrationLoading(true);
      const requestData = {
        examId: selectedExam._id,
        ...registrationData
      };

      const response = await postDataHandler('attemptExam', requestData);
      
      if (response) {
        const attemptData = response;
        
        // Store attempt data in localStorage
        localStorage.setItem('currentAttempt', JSON.stringify(attemptData));
        
        toast.success('Registration successful! Redirecting to exam...');
        
        // Create slug from exam title
        const examSlug = selectedExam.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        
        // Redirect to exam page after short delay
        setTimeout(() => {
          navigate(`/medical-exams/${examSlug}`, { 
            state: { 
              exam: selectedExam,
              attempt: attemptData
            } 
          });
        }, 1500);
        
      } else {
        throw new Error('Failed to register for exam');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to register. Please try again.');
    } finally {
      setRegistrationLoading(false);
    }
  }, [registrationData, selectedExam, navigate]);

  // Handle modal close - use useCallback
  const handleCloseModal = useCallback(() => {
    setShowRegistrationModal(false);
    setRegistrationData({
      userName: '',
      userEmail: '',
      userPhone: ''
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Helmet>
        <title>Medical Exams | Upskillab - Professional Assessment Tests</title>
        <meta name="description" content="Take professional medical exams and assessments to evaluate your knowledge and skills in healthcare fields." />
        <meta name="keywords" content="medical exams, healthcare assessments, medical tests, professional exams" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#FF7426]"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#FF7426]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#FF7426]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Medical <span className="text-[#FF7426]">Exams</span>
          </motion.h1>
          
          <motion.p
            className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Test your medical knowledge with our comprehensive assessment exams. 
            Designed for healthcare professionals and students to evaluate their expertise.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Professional Assessments</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Timed Exams</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm">Detailed Analytics</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Exams Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Available <span className="text-[#FF7426]">Exams</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated medical exams to test your knowledge and skills in various healthcare domains.
            </p>
          </motion.div>

          {/* Exams Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-300 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
              <button 
                onClick={() => window.location.reload()}
                className="bg-[#4D2C5E] text-white px-6 py-3 rounded-lg hover:bg-[#5a3a6e] transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : exams.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">No exams available at the moment.</div>
              <p className="text-gray-600">Please check back later for new exam releases.</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {exams.map((exam) => (
                <ExamCard 
                  key={exam._id} 
                  exam={exam} 
                  onAttemptExam={handleAttemptExam}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Test Your Knowledge?</h2>
          <p className="text-gray-300 text-lg mb-6">
            Join thousands of healthcare professionals who have enhanced their skills through our medical exams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contactus')}
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <RegistrationModal
        showRegistrationModal={showRegistrationModal}
        selectedExam={selectedExam}
        registrationData={registrationData}
        registrationLoading={registrationLoading}
        onInputChange={handleRegistrationChange}
        onSubmit={handleRegistrationSubmit}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MedicalExamsPage;