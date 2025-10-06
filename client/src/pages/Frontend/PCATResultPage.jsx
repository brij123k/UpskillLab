import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiUser, FiMail, FiPhone, FiClock, FiPercent, FiBarChart2, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDataHandler } from '../../config/services';
import ApiConfig from '../../config/apiConfig';

const PCATResultPage = () => {
  const [resultId, setResultId] = useState('');
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle result submission
  const handleCheckResult = async (e) => {
    e.preventDefault();
    
    if (!resultId.trim()) {
      toast.error('Please enter a valid Enroll Number');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const endpoint = ApiConfig.getResultById(resultId.toLowerCase());
      const response = await getDataHandler(endpoint, null, null, true);
      
      setResultData(response);
      toast.success('Result retrieved successfully!');
      
    } catch (error) {
      console.error('Error fetching result:', error);
      setError(error.response?.data?.message || 'Failed to fetch result. Please check your Enroll Number.');
      setResultData(null);
      toast.error('Failed to fetch result. Please check your Enroll Number.');
    } finally {
      setIsLoading(false);
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

  // Get performance rating based on percentage
  const getPerformanceRating = (percentage) => {
    if (percentage >= 90) return { text: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 75) return { text: 'Very Good', color: 'text-green-500', bg: 'bg-green-50' };
    if (percentage >= 60) return { text: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 40) return { text: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4D2C5E] to-[#7B4B9E] py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm mb-4"
          >
            <FiAward className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">PCAT Results Portal</h1>
          <p className="text-white/80">Check your exam results using your Enroll Number</p>
        </div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8"
        >
          <form onSubmit={handleCheckResult} className="space-y-4">
            <div>
              <label htmlFor="resultId" className="block text-sm font-medium text-[#4D2C5E] mb-2">
                Enter Your Enroll Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="resultId"
                  value={resultId}
                  onChange={(e) => setResultId(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200"
                  placeholder="e.g., 68c01789518c4a641dab32d0"
                  disabled={isLoading}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Your Enroll Number was sent to your email after exam submission
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white py-3 px-6 rounded-lg hover:opacity-90 transition-all font-medium flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking Result...
                </>
              ) : (
                <>
                  <FiAward className="mr-2 h-5 w-5" />
                  Check Result
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Result Display */}
        {resultData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8"
          >
            {/* Result Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#4D2C5E] mb-2">Exam Results</h2>
              <p className="text-gray-600">Here's your PCAT exam performance</p>
            </div>

            {/* Exam Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#4D2C5E] mb-3 flex items-center">
                  <FiAward className="mr-2 h-5 w-5" />
                  Exam Information
                </h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Exam:</span> {resultData.examId.title}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Description:</span> {resultData.examId.description}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Duration:</span> {resultData.examId.durationMinutes} minutes
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Total Marks:</span> {resultData.examId.totalMarks}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#4D2C5E] mb-3 flex items-center">
                  <FiUser className="mr-2 h-5 w-5" />
                  Student Information
                </h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Name:</span> {resultData.userId.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {resultData.userId.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span> {resultData.userId.number}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Result Date:</span> {formatDate(resultData.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] rounded-xl p-6 text-white mb-8">
              <h3 className="text-lg font-semibold mb-4 text-center">Performance Summary</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                    <FiPercent className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{resultData.percentage}%</p>
                    <p className="text-xs opacity-80">Percentage</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                    <FiBarChart2 className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{resultData.obtainedMarks}/{resultData.totalMarks}</p>
                    <p className="text-xs opacity-80">Marks Obtained</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                    <FiAward className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-xl font-bold">{resultData.scholarship}</p>
                    <p className="text-xs opacity-80">scholarship</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                    <FiClock className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{resultData.durationSeconds}s</p>
                    <p className="text-xs opacity-80">Time Taken</p>
                  </div>
                </div>
              </div>

              {/* Performance Rating */}
              <div className="mt-6 text-center">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  getPerformanceRating(resultData.percentage).bg
                } ${getPerformanceRating(resultData.percentage).color}`}>
                  Performance: {getPerformanceRating(resultData.percentage).text}
                </span>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <FiInfo className="mr-2 h-5 w-5" />
                Important Information
              </h4>
              <ul className="text-blue-700 text-sm list-disc list-inside space-y-1">
                <li>This document contains your official PCAT exam results</li>
                <li>Please keep your enrollment number secure for future reference.</li>
                <li>Details regarding scholarship eligibility will be sent to you separately via email.</li>
                <li>If you have any questions about your results, don't hesitate to contact our support team.</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 text-center">Need Help?</h2>
          <p className="text-gray-600 text-center mb-6">
            If you're facing any issues or have questions about your results, our support team is here to help.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiMail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-[#4D2C5E] mb-1">Email Support</h3>
              <p className="text-gray-600">info@upskillab.com</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiPhone className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-[#4D2C5E] mb-1">Phone Support</h3>
              <p className="text-gray-600">9319427070</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Our support team is available Monday to Saturday, 10:00 AM to 6:00 PM IST
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Add FiInfo icon component
const FiInfo = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

export default PCATResultPage;