import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCheckCircle, FiArrowLeft, FiArrowRight, FiSave, FiAlertCircle, FiCamera } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDataHandler, putDataHandler } from '../../config/services';
import ApiConfig from '../../config/apiConfig';

const PCATExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  const [examData, setExamData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [globalTimeLeft, setGlobalTimeLeft] = useState(0);
  const [userData, setUserData] = useState(null);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  
  const globalTimerRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const isAutoSubmittingRef = useRef(false);
  const examEndTimeRef = useRef(null);

  // Check authentication on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('pcatExamData');
    if (!storedData) {
      toast.error('Please authenticate first');
      navigate('/PCATExamPortal');
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      
      if (parsedData.examId !== examId) {
        toast.error('Invalid exam access');
        navigate('/PCATExamPortal');
        return;
      }
      
      // Load saved answers if any
      const savedAnswers = localStorage.getItem(`pcatAnswers_${examId}`);
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
      const savedIndex = localStorage.getItem(`pcatCurrentIndex_${examId}`);
      if (savedIndex) {
        setCurrentQuestionIndex(parseInt(savedIndex));
      }
    } catch (error) {
      console.error('Error parsing stored data:', error);
      toast.error('Authentication error');
      navigate('/PCATExamPortal');
    }
  }, [examId, navigate]);

  // Fetch exam data and questions after userData is set
  useEffect(() => {
    if (userData && !examData) {
      fetchExamData();
    }
  }, [userData]);

  // Request camera and microphone access
  const requestMediaAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      mediaStreamRef.current = stream;
      setIsMonitoring(true);
      toast.success('Camera and microphone access granted');
      
      stream.getTracks().forEach(track => track.stop());
      
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast.warning('Camera/microphone access is required for exam monitoring');
    }
  };

  // Monitor tab switches
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const newCount = tabSwitchCount + 1;
        setTabSwitchCount(newCount);
        
        if (newCount === 1) {
          toast.warning('Please do not switch tabs during the exam. This is your first warning.');
        } else if (newCount === 2) {
          toast.error('Second warning! Continued tab switching may result in exam termination.');
        } else if (newCount === 3) {
          toast.error('Third warning! Continued tab switching may result in exam termination.');
        } else if (newCount === 4) {
          toast.error('Last warning! Continued tab switching may result in exam termination.');
        } else if (newCount >= 5) {
          toast.error('Multiple tab switches detected. Submitting exam automatically.');
          handleAutoSubmit();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [tabSwitchCount]);

  // Fetch exam data and questions
  const fetchExamData = async () => {
    try {
      setIsLoading(true);
      
      await requestMediaAccess();
      
      // Get exam details
      const endpoint = ApiConfig.getExamById(examId);
      const examResponse = await getDataHandler(endpoint, null, null, true);
      setExamData(examResponse);
      
      // Get questions
      const endpoint1 = ApiConfig.getQuestionByExamId(examId);
      const questionsResponse = await getDataHandler(endpoint1, null, null, true);
      setQuestions(questionsResponse);
      
      // Calculate end time
      let endTime;
      if (userData && userData.startedAt) {
        const startedAt = new Date(userData.startedAt);
        endTime = new Date(startedAt.getTime() + (examResponse.durationMinutes * 60 * 1000));
      } else {
        endTime = new Date(new Date().getTime() + (examResponse.durationMinutes * 60 * 1000));
      }
      
      examEndTimeRef.current = endTime;
      
      // Calculate initial time left
      const now = new Date();
      const timeLeft = Math.max(0, endTime - now);
      setGlobalTimeLeft(timeLeft);
      
      // Start timer if time is not already up
      if (timeLeft > 0) {
        startGlobalTimer();
      } else {
        // Time is already up, auto-submit immediately
        setIsTimeUp(true);
        handleAutoSubmit();
      }
      
    } catch (error) {
      console.error('Error fetching exam data:', error);
      toast.error('Failed to load exam');
    } finally {
      setIsLoading(false);
    }
  };

  // Start global timer
  const startGlobalTimer = () => {
    if (globalTimerRef.current) {
      clearInterval(globalTimerRef.current);
    }
    
    const updateTimer = () => {
      const now = new Date();
      const timeLeft = Math.max(0, examEndTimeRef.current - now);
      setGlobalTimeLeft(timeLeft);
      
      if (timeLeft <= 0) {
        clearInterval(globalTimerRef.current);
        setIsTimeUp(true);
        
        if (!isAutoSubmittingRef.current) {
          isAutoSubmittingRef.current = true;
          console.log('Time is up! Triggering auto-submit...');
          handleAutoSubmit();
        }
      }
    };
    
    // Update immediately
    updateTimer();
    
    // Update every second
    globalTimerRef.current = setInterval(updateTimer, 1000);
  };

  // Format time for display
  const formatTime = (milliseconds) => {
    if (milliseconds <= 0) return '00:00';
    
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  // Handle answer selection
  const handleAnswerChange = (questionId, type, value, optionId = null) => {
    if (isTimeUp || isSubmitting) return;
    
    let newAnswer;
    
    if (type === 'OBJECTIVE') {
      const currentAnswer = answers[questionId];
      if (currentAnswer && currentAnswer.selectedOptionId === optionId) {
        newAnswer = null;
      } else {
        newAnswer = {
          type,
          selectedOptionId: optionId,
          maxMarks: questions.find(q => q._id === questionId)?.marks || 5
        };
      }
    } else {
      if (value.trim() === '') {
        newAnswer = null;
      } else {
        newAnswer = {
          type,
          answerText: value,
          maxMarks: questions.find(q => q._id === questionId)?.marks || 5
        };
      }
    }
    
    const newAnswers = newAnswer 
      ? { ...answers, [questionId]: newAnswer }
      : { ...answers };
    
    if (!newAnswer) {
      delete newAnswers[questionId];
    }
    
    setAnswers(newAnswers);
    localStorage.setItem(`pcatAnswers_${examId}`, JSON.stringify(newAnswers));
  };

  // Calculate attempted questions count
  const getAttemptedCount = () => {
    return Object.keys(answers).length;
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (questions.length === 0) return 0;
    return (getAttemptedCount() / questions.length) * 100;
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      localStorage.setItem(`pcatCurrentIndex_${examId}`, newIndex.toString());
    }
  };

  // Handle previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      localStorage.setItem(`pcatCurrentIndex_${examId}`, newIndex.toString());
    }
  };

  // Handle auto submit when time runs out
  const handleAutoSubmit = async () => {
    console.log('=== AUTO-SUBMIT INITIATED ===');
    
    if (isAutoSubmittingRef.current && isSubmitting) {
      console.log('Already auto-submitting, skipping...');
      return;
    }
    
    isAutoSubmittingRef.current = true;
    
    console.log('Questions count:', questions.length);
    console.log('Answers count:', Object.keys(answers).length);
    
    if (questions.length === 0) {
      console.error('No questions loaded!');
      toast.error('Exam questions not loaded properly.');
      isAutoSubmittingRef.current = false;
      return;
    }
    
    const unansweredCount = questions.length - Object.keys(answers).length;
    
    if (unansweredCount > 0) {
      toast.info(`Time is up! ${unansweredCount} questions were not attempted. Submitting your exam automatically.`);
    } else {
      toast.info('Time is up! Submitting your exam automatically.');
    }
    
    await submitExam();
  };

  // Prepare answers for submission
  const prepareSubmissionAnswers = () => {
    console.log('Preparing submission answers...');
    
    const submissionAnswers = questions.map(question => {
      const userAnswer = answers[question._id];
      
      return {
        questionId: question._id,
        type: question.type.toLowerCase(),
        maxMarks: question.marks,
        ...(question.type === 'OBJECTIVE' 
          ? { selectedOptionId: userAnswer?.selectedOptionId || null }
          : { answerText: userAnswer?.answerText || '' })
      };
    });
    
    console.log('Submission answers prepared:', submissionAnswers);
    return submissionAnswers;
  };

  // Submit exam
  const submitExam = async () => {
    console.log('=== SUBMIT EXAM STARTED ===');
    
    try {
      setIsSubmitting(true);
      
      // Clear timer
      if (globalTimerRef.current) {
        clearInterval(globalTimerRef.current);
      }
      
      // Stop media monitoring
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // Prepare answers
      const submissionAnswers = prepareSubmissionAnswers();
      
      if (!userData?.submissionId) {
        toast.error('Submission ID not found.');
        return;
      }
      
      console.log('Submitting to API with submissionId:', userData.submissionId);
      
      const endpoint = ApiConfig.updateAnser(userData.submissionId);
      const submissionData = {
        answers: submissionAnswers,
        status: 'submitted',
        tabSwitchCount: tabSwitchCount,
        monitoringEnabled: isMonitoring,
        submittedAt: new Date().toISOString(),
        autoSubmitted: isTimeUp
      };
      
      console.log('Submission data:', submissionData);
      
      // Submit to API with timeout
      const submitPromise = putDataHandler(endpoint, submissionData, true);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Submission timeout after 30 seconds')), 30000)
      );
      
      const response = await Promise.race([submitPromise, timeoutPromise]);
      console.log('API Response:', response);
      
      // Clear localStorage
      localStorage.removeItem(`pcatAnswers_${examId}`);
      localStorage.removeItem(`pcatCurrentIndex_${examId}`);
      
      // Show success modal
      setShowSuccessModal(true);
      
      toast.success('Exam submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting exam:', error);
      
      // Save answers locally for recovery
      try {
        const recoveryData = {
          examId,
          answers: prepareSubmissionAnswers(),
          timestamp: new Date().toISOString(),
          error: error.message
        };
        localStorage.setItem(`exam_recovery_${examId}`, JSON.stringify(recoveryData));
        console.log('Answers saved locally for recovery');
        
        toast.error(`Failed to submit: ${error.message}. Answers saved locally.`);
      } catch (recoveryError) {
        console.error('Recovery save failed:', recoveryError);
        toast.error('Failed to submit exam and save locally.');
      }
    } finally {
      setIsSubmitting(false);
      isAutoSubmittingRef.current = false;
    }
  };

  // Handle manual submit
  const handleSubmitExam = async () => {
    if (isTimeUp) {
      toast.info('Time is up! Exam is being submitted automatically.');
      return;
    }
    
    const unansweredCount = questions.length - Object.keys(answers).length;
    
    if (unansweredCount > 0) {
      const confirmMessage = `You have ${unansweredCount} unanswered question(s). Are you sure you want to submit?`;
      if (!window.confirm(confirmMessage)) return;
    } else {
      if (!window.confirm('Are you sure you want to submit your exam?')) return;
    }
    
    await submitExam();
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (globalTimerRef.current) {
        clearInterval(globalTimerRef.current);
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Check if time is already up on component load
  useEffect(() => {
    if (globalTimeLeft <= 0 && questions.length > 0 && !isAutoSubmittingRef.current) {
      console.log('Time is already 0, auto-submitting...');
      setIsTimeUp(true);
      isAutoSubmittingRef.current = true;
      handleAutoSubmit();
    }
  }, [globalTimeLeft, questions.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#fdf8ee]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const attemptedCount = getAttemptedCount();
  const totalQuestions = questions.length;
  const progressPercentage = getProgressPercentage();

  return (
    <div className="min-h-screen bg-[#fdf8ee]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-lg sm:text-xl font-bold text-[#4D2C5E] truncate">{examData?.title}</h1>
              <p className="text-gray-600 text-xs sm:text-sm truncate">{examData?.description}</p>
            </div>
            
            {/* Status Indicators Grid */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 justify-center">
              {/* Monitoring Status */}
              <div className={`py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg flex items-center justify-center ${
                isMonitoring ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isMonitoring ? (
                  <>
                    <FiCamera className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm font-semibold sm:font-bold">Active</span>
                  </>
                ) : (
                  <>
                    <FiAlertCircle className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm font-semibold sm:font-bold">Inactive</span>
                  </>
                )}
              </div>
              
              {/* Tab Switch Counter */}
              <div className="bg-yellow-100 text-yellow-800 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg flex items-center justify-center">
                <FiAlertCircle className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm font-semibold sm:font-bold">Tabs: </span>
                <span className="ml-0.5 sm:ml-1">{tabSwitchCount}/5</span>
              </div>
              
              {/* Answered counter */}
              <div className="bg-blue-100 text-blue-800 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg flex items-center justify-center">
                <FiCheckCircle className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm font-semibold sm:font-bold">Done: </span>
                <span className="ml-0.5 sm:ml-1">{attemptedCount}/{totalQuestions}</span>
              </div>
              
              {/* Global Timer */}
              <div className={`py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg flex items-center justify-center col-span-2 sm:col-auto ${
                isTimeUp || globalTimeLeft <= 0 
                  ? 'bg-red-600 text-white animate-pulse' 
                  : 'bg-red-100 text-red-800'
              }`}>
                <FiClock className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm font-semibold sm:font-bold">
                  {isTimeUp || globalTimeLeft <= 0 ? 'TIME UP!' : 'Time:'}
                </span>
                <span className="ml-0.5 sm:ml-1 font-mono">
                  {isTimeUp || globalTimeLeft <= 0 ? 'Submitting...' : formatTime(globalTimeLeft)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-gray-600 mt-1.5 sm:mt-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progressPercentage)}% Complete ({attemptedCount} attempted)</span>
        </div>
      </div>
      
      {/* Main Content - Disabled when time is up */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {currentQuestion && (
          <motion.div
            key={currentQuestion._id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border ${
              isTimeUp ? 'border-red-300 opacity-90' : 'border-gray-100'
            }`}
          >
            {/* Question Header */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                <span className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium ${
                  currentQuestion.type === 'OBJECTIVE' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {currentQuestion.type === 'OBJECTIVE' ? 'Multiple Choice' : 'Descriptive'}
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                  {currentQuestion.marks} Marks
                </span>
                {isTimeUp && (
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium animate-pulse">
                    Time Up - Submitting...
                  </span>
                )}
              </div>
              
              <h2 className="text-lg sm:text-xl font-semibold text-[#4D2C5E]">
                <span className="text-base sm:text-lg font-bold text-gray-700 mr-1">{currentQuestionIndex + 1}.</span>
                {currentQuestion.question}
              </h2>
            </div>
            
            {/* Objective Question Options */}
            {currentQuestion.type === 'OBJECTIVE' && (
              <div className="space-y-2 sm:space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div 
                    key={option._id} 
                    className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-all ${
                      isTimeUp || isSubmitting
                        ? 'cursor-not-allowed opacity-70'
                        : answers[currentQuestion._id]?.selectedOptionId === option._id
                        ? 'border-[#4D2C5E] bg-[#4D2C5E]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => !isTimeUp && !isSubmitting && handleAnswerChange(
                      currentQuestion._id, 
                      'OBJECTIVE', 
                      null, 
                      option._id
                    )}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded border flex items-center justify-center mr-2 sm:mr-3 ${
                        answers[currentQuestion._id]?.selectedOptionId === option._id
                          ? 'border-[#4D2C5E] bg-[#4D2C5E]'
                          : 'border-gray-300 bg-white'
                      }`}>
                        {answers[currentQuestion._id]?.selectedOptionId === option._id && (
                          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm sm:text-base text-gray-800">{option.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Subjective Question Answer Area */}
            {currentQuestion.type === 'SUBJECTIVE' && (
              <div>
                <textarea
                  value={answers[currentQuestion._id]?.answerText || ''}
                  onChange={(e) => !isTimeUp && !isSubmitting && handleAnswerChange(
                    currentQuestion._id, 
                    'SUBJECTIVE', 
                    e.target.value
                  )}
                  rows={5}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200 ${
                    isTimeUp || isSubmitting
                      ? 'cursor-not-allowed opacity-70 bg-gray-50'
                      : 'border-gray-300'
                  }`}
                  placeholder={isTimeUp ? "Time is up - Exam is being submitted..." : "Type your answer here..."}
                  disabled={isTimeUp || isSubmitting}
                />
                <div className="text-xs sm:text-sm text-gray-500 mt-2">
                  This question is worth {currentQuestion.marks} marks.
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 gap-3 sm:gap-0">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0 || isTimeUp || isSubmitting}
                className={`flex items-center justify-center px-4 py-2.5 sm:py-2 rounded-lg text-sm sm:text-base ${
                  currentQuestionIndex === 0 || isTimeUp || isSubmitting
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#4D2C5E] hover:bg-gray-100'
                }`}
              >
                <FiArrowLeft className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Previous
              </button>
              
              <div className="flex gap-2">
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    disabled={isTimeUp || isSubmitting}
                    className={`flex-1 sm:flex-none flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-2 rounded-lg hover:opacity-90 transition-all text-sm sm:text-base ${
                      isTimeUp || isSubmitting
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                        : 'bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white'
                    }`}
                  >
                    <span className="sm:hidden">Save & Next</span>
                    <span className="hidden sm:inline">Next Question</span>
                    <FiArrowRight className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitExam}
                    disabled={isSubmitting || isTimeUp}
                    className={`flex-1 flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-2 rounded-lg hover:opacity-90 transition-all text-sm sm:text-base ${
                      isSubmitting || isTimeUp
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                        : 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="hidden sm:inline">Submitting...</span>
                        <span className="sm:hidden">Processing...</span>
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="hidden sm:inline">Submit Exam</span>
                        <span className="sm:hidden">Submit</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
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
              className="bg-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-md p-4 sm:p-6 border border-gray-100 text-center"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FiCheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-[#4D2C5E] mb-2">Exam Submitted Successfully!</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                Thank you for completing the PCAT exam. Your answers have been submitted successfully.
              </p>
              
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 text-left">
                <h4 className="font-medium text-blue-800 mb-1.5 sm:mb-2 text-sm sm:text-base">What happens next?</h4>
                <ul className="text-blue-700 text-xs sm:text-sm list-disc list-inside space-y-1">
                  <li>Our team will evaluate your exam.</li>
                  <li>Results sent to email within 24-48 hours.</li>
                  <li>You'll receive an Enrollment ID.</li>
                  <li>Qualified candidates get PCAT Scholarships.</li>
                </ul>
              </div>
              
              <button
                onClick={() => navigate('/courselist')}
                className="bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white py-2.5 px-6 rounded-lg hover:opacity-90 transition-all font-medium w-full sm:w-auto"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PCATExamPage;