import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCheckCircle, FiAlertCircle, FiBookOpen, FiCalendar, FiAward, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDataHandlerWithToken } from '../../../config/services';

const StudentExamDashboard = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  // Fetch exams data
  useEffect(() => {
    const fetchExams = async () => {
      try {
        setIsLoading(true);
        const response = await getDataHandlerWithToken('getExams');
        console.log(response)
        setExams(response || []);
        setFilteredExams(response || []);
      } catch (error) {
        toast.error('Failed to load exams');
        console.error('Error fetching exams:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Filter exams based on active tab
  useEffect(() => {
    let filtered = [...exams];
    
    if (activeTab === 'upcoming') {
      filtered = filtered.filter(exam => exam.status === 'scheduled');
    } else if (activeTab === 'ongoing') {
      filtered = filtered.filter(exam => exam.status === 'ongoing');
    } else if (activeTab === 'completed') {
      filtered = filtered.filter(exam => exam.status === 'completed' || exam.status === 'result_published');
    }
    
    setFilteredExams(filtered);
  }, [activeTab, exams]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Calculate time until exam starts
  const getTimeUntilStart = (startAt) => {
    const now = new Date();
    const startTime = new Date(startAt);
    const diffMs = startTime - now;
    
    if (diffMs <= 0) return null;
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // Handle exam card click
  const handleExamClick = (examId, status) => {
    if (status === 'scheduled' || status === 'ongoing') {
      navigate(`/Student/exam/${examId}`);
    }
  };

  // Get status badge info
  const getStatusInfo = (status) => {
    switch (status) {
      case 'scheduled':
        return { text: 'Upcoming', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: <FiClock className="h-4 w-4" /> };
      case 'ongoing':
        return { text: 'Ongoing', color: 'text-blue-600', bg: 'bg-blue-100', icon: <FiAlertCircle className="h-4 w-4" /> };
      case 'completed':
        return { text: 'Completed', color: 'text-green-600', bg: 'bg-green-100', icon: <FiCheckCircle className="h-4 w-4" /> };
      case 'result_published':
        return { text: 'Results Published', color: 'text-purple-600', bg: 'bg-purple-100', icon: <FiAward className="h-4 w-4" /> };
      default:
        return { text: status, color: 'text-gray-600', bg: 'bg-gray-100', icon: <FiBookOpen className="h-4 w-4" /> };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#fdf8ee]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf8ee] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E] tracking-tight">My Exams</h1>
          <p className="text-gray-500">View and manage all your scheduled exams</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Exams</p>
                <p className="text-2xl font-bold text-[#4D2C5E]">{exams.length}</p>
              </div>
              <div className="p-3 rounded-full bg-[#4D2C5E]/10 text-[#4D2C5E]">
                <FiBookOpen className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {exams.filter(e => e.status === 'scheduled').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <FiClock className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Ongoing</p>
                <p className="text-2xl font-bold text-blue-600">
                  {exams.filter(e => e.status === 'ongoing').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FiAlertCircle className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {exams.filter(e => e.status === 'completed' || e.status === 'result_published').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FiCheckCircle className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-gray-100">
          <div className="flex flex-wrap gap-2">
            {['all', 'upcoming', 'ongoing', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${activeTab === tab
                    ? 'bg-[#4D2C5E] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {tab === 'all' && 'All Exams'}
                {tab === 'upcoming' && 'Upcoming'}
                {tab === 'ongoing' && 'Ongoing'}
                {tab === 'completed' && 'Completed'}
              </button>
            ))}
          </div>
        </div>

        {/* Exams Grid */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8 border border-gray-100">
          {filteredExams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam) => {
                const statusInfo = getStatusInfo(exam.status);
                const timeUntilStart = getTimeUntilStart(exam.startAt);
                
                return (
                  <motion.div
                    key={exam._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200 group ${(exam.status === 'scheduled' || exam.status === 'ongoing') ? 'cursor-pointer' : ''}`}
                    onClick={() => handleExamClick(exam._id, exam.status)}
                  >
                    <div className="flex flex-col h-full">
                      {/* Status Badge */}
                      <div className="flex justify-between items-start mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                          {statusInfo.icon}
                          <span className="ml-1.5">{statusInfo.text}</span>
                        </span>
                        
                        {(exam.status === 'scheduled' || exam.status === 'ongoing') && (
                          <FiChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#4D2C5E] transition-colors" />
                        )}
                      </div>
                      
                      {/* Exam Title */}
                      <h3 className="text-lg font-semibold text-[#4D2C5E] group-hover:text-[#3A2152] transition-colors mb-2 line-clamp-2">
                        {exam.title}
                      </h3>
                      
                      {/* Exam Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                        {exam.description}
                      </p>
                      
                      {/* Exam Details */}
                      <div className="space-y-3 mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-500">
                          <FiCalendar className="h-4 w-4 mr-2" />
                          <span>{formatDate(exam.startAt)}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <FiClock className="h-4 w-4 mr-2" />
                          <span>{exam.durationMinutes} minutes</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <FiAward className="h-4 w-4 mr-2" />
                          <span>{exam.totalMarks} marks</span>
                        </div>
                        
                        {/* Batch Info */}
                        {exam.batchIds && exam.batchIds.length > 0 && (
                          <div className="text-xs text-gray-400 mt-2">
                            {exam.batchIds.map(batch => batch.batchCode).join(', ')}
                          </div>
                        )}
                        
                        {/* Time until start for upcoming exams */}
                        {exam.status === 'scheduled' && timeUntilStart && (
                          <div className="mt-3 bg-yellow-50 text-yellow-700 text-xs font-medium py-1.5 px-3 rounded-lg">
                            Starts in {timeUntilStart}
                          </div>
                        )}
                        
                        {/* Action Button */}
                        <div className="mt-4">
                          {exam.status === 'scheduled' && (
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="w-full bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white py-2.5 rounded-lg hover:opacity-90 transition-all font-medium text-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/Student/exam/${exam._id}`);
                              }}
                            >
                              View Exam
                            </motion.button>
                          )}
                          
                          {exam.status === 'ongoing' && (
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 rounded-lg hover:opacity-90 transition-all font-medium text-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/Student/exam/${exam._id}`);
                              }}
                            >
                              Join Exam
                            </motion.button>
                          )}
                          
                          {(exam.status === 'completed' || exam.status === 'result_published') && (
                            <div className="text-center text-sm text-gray-500 py-2">
                              {exam.status === 'result_published' ? 'Results available' : 'Exam completed'}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <div className="mx-auto w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiBookOpen className="h-8 w-8 md:h-12 md:w-12 text-gray-400" />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-1">
                {activeTab === 'all' ? 'No exams scheduled' : `No ${activeTab} exams`}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {activeTab === 'all'
                  ? 'You don\'t have any exams scheduled at the moment.'
                  : `You don't have any ${activeTab} exams at the moment.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentExamDashboard;