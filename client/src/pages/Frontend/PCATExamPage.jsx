import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCheckCircle, FiArrowLeft, FiArrowRight, FiSave, FiLogOut, FiAlertCircle } from 'react-icons/fi';
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
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  
  const globalTimerRef = useRef(null);

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
      console.log("Parsed user data:", parsedData);
      setUserData(parsedData);
      
      // Verify the exam ID matches
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
      
      // Load saved question index if any
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
    if (userData) {
      fetchExamData();
    }
  }, [userData]);

  // Fetch exam data and questions
  const fetchExamData = async () => {
    try {
      setIsLoading(true);
      
      // Get exam details
      const endpoint = ApiConfig.getExamById(examId);
      const examResponse = await getDataHandler(endpoint, null, null, true);
      setExamData(examResponse);
      
      // Calculate global time left using userData.startedAt
      if (userData && userData.startedAt) {
        const startedAt = new Date(userData.startedAt);
        const endTime = new Date(startedAt.getTime() + (examResponse.durationMinutes * 60 * 1000));
        const timeLeft = Math.max(0, endTime - new Date());
        setGlobalTimeLeft(timeLeft);
        
        // Start global timer
        startGlobalTimer(timeLeft);
      } else {
        // Fallback if startedAt is not available
        const endTime = new Date(new Date().getTime() + (examResponse.durationMinutes * 60 * 1000));
        const timeLeft = Math.max(0, endTime - new Date());
        setGlobalTimeLeft(timeLeft);
        startGlobalTimer(timeLeft);
        
        console.warn("startedAt not found in userData, using current time as fallback");
      }
      
      // Get questions
      const endpoint1 = ApiConfig.getQuestionByExamId(examId);
      const questionsResponse = await getDataHandler(endpoint1, null, null, true);
      setQuestions(questionsResponse);
      
    } catch (error) {
      console.error('Error fetching exam data:', error);
      toast.error('Failed to load exam');
    } finally {
      setIsLoading(false);
    }
  };

  // Start global timer
  const startGlobalTimer = (initialTime) => {
    if (globalTimerRef.current) {
      clearInterval(globalTimerRef.current);
    }
    
    setGlobalTimeLeft(initialTime);
    
    globalTimerRef.current = setInterval(() => {
      setGlobalTimeLeft(prev => {
        if (prev <= 1000) {
          clearInterval(globalTimerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
  };

  // Format time for display with hours when needed
  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    
    if (hours > 0) {
      return `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  // Handle answer selection
  const handleAnswerChange = (questionId, type, value, optionId = null) => {
    const newAnswers = {
      ...answers,
      [questionId]: {
        type,
        ...(type === 'OBJECTIVE' ? { selectedOptionId: optionId } : { answerText: value }),
        maxMarks: questions.find(q => q._id === questionId)?.marks || 5
      }
    };
    
    setAnswers(newAnswers);
    
    // Save to localStorage
    localStorage.setItem(`pcatAnswers_${examId}`, JSON.stringify(newAnswers));
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      
      // Save current index to localStorage
      localStorage.setItem(`pcatCurrentIndex_${examId}`, newIndex.toString());
    }
  };

  // Handle previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      
      // Save current index to localStorage
      localStorage.setItem(`pcatCurrentIndex_${examId}`, newIndex.toString());
    }
  };

  // Handle auto submit when time runs out
  const handleAutoSubmit = async () => {
    const unansweredCount = questions.length - Object.keys(answers).length;
    console.log(unansweredCount,"1")
    if (unansweredCount > 0) {
      toast.info(`Time is up! ${unansweredCount} questions were not attempted. Submitting your exam automatically.`);
    } else {
      toast.info('Time is up! Submitting your exam automatically.');
    }
    
    await submitExam();
  };

  // Prepare answers for submission - includes ALL questions
  const prepareSubmissionAnswers = () => {
    return questions.map(question => {
      const userAnswer = answers[question._id];
      
      if (userAnswer) {
        // Return user's answer for attempted questions
        return {
          questionId: question._id,
          type: question.type.toLowerCase(),
          maxMarks: question.marks,
          ...(question.type === 'OBJECTIVE' 
            ? { selectedOptionId: userAnswer.selectedOptionId } 
            : { answerText: userAnswer.answerText || '' })
        };
      } else {
        // Return empty answer for unattempted questions
        return {
          questionId: question._id,
          type: question.type.toLowerCase(),
          maxMarks: question.marks,
          ...(question.type === 'OBJECTIVE' 
            ? { selectedOptionId: null }  // null for unattempted objective questions
            : { answerText: '' })         // empty string for unattempted subjective questions
        };
      }
    });
  };

  // Submit exam
  const submitExam = async () => {
    try {
      setIsSubmitting(true);
      
      // Clear timer
      if (globalTimerRef.current) {
        clearInterval(globalTimerRef.current);
      }
      
      // Prepare answers (includes all questions, answered and unanswered)
      const submissionAnswers = prepareSubmissionAnswers();
      console.log(submissionAnswers)
      const endpoint = ApiConfig.updateAnser(userData.submissionId);
      
      // Submit to API
      await putDataHandler(endpoint, {
        answers: submissionAnswers,
        status: 'submitted'
      }, true);
      
      // Clear localStorage
      localStorage.removeItem(`pcatAnswers_${examId}`);
      localStorage.removeItem(`pcatCurrentIndex_${examId}`);
      
      // Show success modal
      setShowSuccessModal(true);
      
      toast.success('Exam submitted successfully!');
    } catch (error) {
      console.error('Error submitting exam:', error);
      toast.error('Failed to submit exam. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle manual submit
  const handleSubmitExam = async () => {
    const unansweredCount = questions.length - Object.keys(answers).length;
    
    if (unansweredCount > 0) {
      const confirmMessage = `You have ${unansweredCount} unanswered question(s). Are you sure you want to submit?`;
      
      if (!window.confirm(confirmMessage)) {
        return; // User canceled submission
      }
    } else {
      // Confirm even if all questions are answered
      if (!window.confirm('Are you sure you want to submit your exam?')) {
        return; // User canceled submission
      }
    }
    
    await submitExam();
  };

  // Exit exam with confirmation
  const handleExitExam = () => {
    setShowExitConfirm(true);
  };

  // Confirm exit and save progress
  const confirmExit = () => {
    // Save current progress before exiting
    localStorage.setItem(`pcatAnswers_${examId}`, JSON.stringify(answers));
    localStorage.setItem(`pcatCurrentIndex_${examId}`, currentQuestionIndex.toString());
    
    setShowExitConfirm(false);
    navigate('/PCATExamPortal');
    toast.info('Your progress has been saved. You can resume later.');
  };

  // Cancel exit
  const cancelExit = () => {
    setShowExitConfirm(false);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (globalTimerRef.current) {
        clearInterval(globalTimerRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#fdf8ee]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;

  return (
    <div className="min-h-screen bg-[#fdf8ee]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-[#4D2C5E]">{examData?.title}</h1>
              <p className="text-gray-600 text-sm">{examData?.description}</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Answered counter */}
              <div className="bg-blue-100 text-blue-800 py-2 px-4 rounded-lg flex items-center">
                <FiCheckCircle className="mr-2 h-5 w-5" />
                <span className="font-bold">Answered: </span>
                <span className="ml-1">{answeredCount}/{totalQuestions}</span>
              </div>
              
              {/* Global Timer */}
              <div className="bg-red-100 text-red-800 py-2 px-4 rounded-lg flex items-center">
                <FiClock className="mr-2 h-5 w-5" />
                <span className="font-bold">Time Left: </span>
                <span className="ml-1">{formatTime(globalTimeLeft)}</span>
              </div>
              
              <button
                onClick={handleExitExam}
                className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center"
              >
                <FiLogOut className="mr-2 h-5 w-5" />
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] h-2.5 rounded-full" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {currentQuestion && (
          <motion.div
            key={currentQuestion._id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100"
          >
            {/* Question Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    currentQuestion.type === 'OBJECTIVE' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {currentQuestion.type === 'OBJECTIVE' ? 'Multiple Choice' : 'Descriptive'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                    {currentQuestion.marks} Marks
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold text-[#4D2C5E]">
                  {currentQuestionIndex + 1}. {currentQuestion.question}
                </h2>
              </div>
            </div>
            
            {/* Objective Question Options */}
            {currentQuestion.type === 'OBJECTIVE' && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div 
                    key={option._id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      answers[currentQuestion._id]?.selectedOptionId === option._id
                        ? 'border-[#4D2C5E] bg-[#4D2C5E]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAnswerChange(
                      currentQuestion._id, 
                      'OBJECTIVE', 
                      null, 
                      option._id
                    )}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                        answers[currentQuestion._id]?.selectedOptionId === option._id
                          ? 'border-[#4D2C5E] bg-[#4D2C5E]'
                          : 'border-gray-300'
                      }`}>
                        {answers[currentQuestion._id]?.selectedOptionId === option._id && (
                          <FiCheckCircle className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <span className="text-gray-800">{option.text}</span>
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
                  onChange={(e) => handleAnswerChange(
                    currentQuestion._id, 
                    'SUBJECTIVE', 
                    e.target.value
                  )}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200"
                  placeholder="Type your answer here..."
                />
                <div className="text-sm text-gray-500 mt-2">
                  This question is worth {currentQuestion.marks} marks.
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  currentQuestionIndex === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#4D2C5E] hover:bg-gray-100'
                }`}
              >
                <FiArrowLeft className="mr-2 h-5 w-5" />
                Previous
              </button>
              
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white px-5 py-2 rounded-lg hover:opacity-90 transition-all"
                >
                  Next Question
                  <FiArrowRight className="ml-2 h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitExam}
                  disabled={isSubmitting}
                  className="flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2 rounded-lg hover:opacity-90 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2 h-5 w-5" />
                      Submit Exam
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitConfirm && (
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
              className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-gray-100 text-center"
            >
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
              
              <h3 className="text-xl font-bold text-[#4D2C5E] mb-2">Exit Exam?</h3>
              <p className="text-gray-600 mb-6">
                Your progress will be saved. You can resume this exam later from where you left off.
              </p>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={cancelExit}
                  className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmExit}
                  className="bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white py-2 px-6 rounded-lg hover:opacity-90 transition-all font-medium"
                >
                  Exit Exam
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
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
              className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-gray-100 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="h-8 w-8 text-green-600" />
              </div>
              
              <h3 className="text-xl font-bold text-[#4D2C5E] mb-2">Exam Submitted Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for completing the PCAT exam. Your answers have been submitted successfully.
                Results will be sent to your registered email address.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
                <h4 className="font-medium text-blue-800 mb-2">What happens next?</h4>
                <ul className="text-blue-700 text-sm list-disc list-inside space-y-1">
                  <li>Your exam will be evaluated by our team</li>
                  <li>Results will be sent to your email within 7-10 days</li>
                  <li>You will receive a Result ID to check your results anytime</li>
                  <li>If you qualify, you'll be eligible for PCAT Scholarships</li>
                </ul>
              </div>
              
              <button
                onClick={() => navigate('/PCATExamPortal')}
                className="bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white py-2.5 px-6 rounded-lg hover:opacity-90 transition-all font-medium"
              >
                Return to Exam Portal
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PCATExamPage;