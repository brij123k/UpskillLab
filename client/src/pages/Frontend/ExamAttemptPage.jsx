import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getDataHandler, postDataHandler } from '../../config/services';
import ApiConfig from '../../config/apiConfig';

const ExamAttemptPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [examStarted, setExamStarted] = useState(false);

  // Load exam data and attempt from localStorage
  useEffect(() => {
    const loadExamData = () => {
      try {
        // Get attempt data from localStorage or location state
        const storedAttempt = localStorage.getItem('currentAttempt');
        const attemptData = storedAttempt ? JSON.parse(storedAttempt) : location.state?.attempt;
        
        if (!attemptData) {
          toast.error('No exam attempt found. Please register first.');
          navigate('/medical-exams');
          return;
        }
        setAttempt(attemptData);
        setExam(attemptData.examId);
        
        // Start the exam
        setExamStarted(true);
        fetchQuestions(attemptData.examId);
        
      } catch (error) {
        console.error('Error loading exam data:', error);
        toast.error('Failed to load exam data');
        navigate('/medical-exams');
      }
    };

    loadExamData();
  }, [location.state, navigate]);

  // Fetch questions for the exam
  const fetchQuestions = async (examId) => {
    try {
      setLoading(true);
      const endpoint = ApiConfig.getMedicalQuestions(examId)
      const response = await getDataHandler(endpoint,null,null,true);
      console.log(response)
      if (response && response.length > 0) {
        setQuestions(response);
      } else {
        throw new Error('No questions found for this exam');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Failed to load exam questions');
    } finally {
      setLoading(false);
    }
  };

  // Timer effect
  useEffect(() => {
    if (!examStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, timeLeft]);

  // Handle answer selection
  const handleAnswerSelect = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        questionId: questionId,
        optionText: option.text,
        score: option.score
      }
    }));
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // Jump to specific question
  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  // Auto-submit when time runs out
  const handleAutoSubmit = () => {
    toast.info('Time is up! Submitting your exam...');
    handleSubmit();
  };

  // Submit exam
  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      const confirmSubmit = window.confirm(
        `You have answered ${Object.keys(answers).length} out of ${questions.length} questions. Are you sure you want to submit?`
      );
      if (!confirmSubmit) return;
    }

    try {
      setSubmitting(true);
      
      const submissionData = {
        examAttemptId: attempt._id,
        answers: Object.values(answers)
      };

      const response = await postDataHandler('submitMedicalExam', submissionData);
      
      if (response) {
        setResult(response);
        
        // Clear localStorage
        localStorage.removeItem('currentAttempt');
        
        toast.success('Exam submitted successfully!');
      } else {
        throw new Error('Failed to submit exam');
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
      toast.error('Failed to submit exam. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress
  const progress = (Object.keys(answers).length / questions.length) * 100;

  if (!exam || !attempt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exam...</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
  <div className="max-w-5xl mx-auto">
    {/* Header with Celebration */}
    <motion.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <div className="relative inline-block mb-6">
        <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-20"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/20 shadow-xl">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="text-4xl">🎉</div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Exam Completed!
            </h1>
            <div className="text-4xl">🎓</div>
          </div>
          <p className="text-gray-600 text-lg">You've successfully completed the assessment</p>
        </div>
      </div>
    </motion.div>

    {/* Main Result Card */}
    <motion.div 
      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <div className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] p-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{exam.title}</h2>
        <p className="text-white/90">Your detailed results and analysis</p>
      </div>

      <div className="p-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Exam Summary</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{result.summary}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Insights</h3>
                <div className="space-y-3">
                  {result.interpretations.map((interpretation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100"
                    >
                      <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 font-medium">{interpretation}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#4D2C5E]">{questions.length}</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{Object.keys(answers).length}</div>
              <div className="text-sm text-gray-600">Questions Answered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((Object.keys(answers).length / questions.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {Math.max(3600 - timeLeft, 0)}s
              </div>
              <div className="text-sm text-gray-600">Time Taken</div>
            </div>
          </div>
        </div> */}
        <div className="border-t border-gray-100 pt-6 mt-6">
          <div className="flex items-center justify-center text-gray-500">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">
              Submitted on {new Date(result.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Action Buttons */}
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <motion.button
        onClick={() => navigate('/medical-exams')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative overflow-hidden bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <span className="relative z-10 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Exams
        </span>
      </motion.button>

      <motion.button
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative overflow-hidden border-2 border-[#4D2C5E] text-[#4D2C5E] px-8 py-4 rounded-2xl font-semibold hover:bg-[#4D2C5E] hover:text-white transition-all duration-300"
      >
        <span className="relative z-10 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go to Home
        </span>
      </motion.button>

      {/* <motion.button
        onClick={() => window.print()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <span className="relative z-10 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Results
        </span>
      </motion.button> */}
    </motion.div>

    {/* Celebration Confetti Effect (Visual only) */}
    {/* <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          initial={{ 
            opacity: 0,
            y: -100,
            x: Math.random() * window.innerWidth
          }}
          animate={{ 
            opacity: [0, 1, 0],
            y: [0, Math.random() * window.innerHeight + 100],
            rotate: Math.random() * 360
          }}
          transition={{ 
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 1,
            repeat: 0
          }}
        >
          {['🎉', '🎊', '⭐', '🏆', '🎓', '✅'][Math.floor(Math.random() * 6)]}
        </motion.div>
      ))}
    </div> */}
  </div>
</div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exam questions...</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const selectedAnswer = answers[currentQ?._id];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Helmet>
        <title>{exam.title} - Exam | Upskillab</title>
      </Helmet> */}

      {/* Exam Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{exam.title}</h1>
              <p className="text-gray-600 text-sm">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Timer */}
              {/* <div className={`px-4 py-2 rounded-lg font-mono font-bold ${
                timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                ⏱️ {formatTime(timeLeft)}
              </div> */}
              
              {/* Progress */}
              <div className="hidden sm:block">
                <div className="text-sm text-gray-600">
                  {Object.keys(answers).length}/{questions.length} answered
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Questions Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <h3 className="font-semibold text-gray-700 mb-3">Questions</h3>
              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-3 gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                      index === currentQuestion
                        ? 'bg-[#4D2C5E] text-white'
                        : answers[questions[index]._id]
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {submitting ? 'Submitting...' : 'Submit Exam'}
              </button>
            </div>
          </div>

          {/* Question Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {currentQ.questionText}
              </h2>

              <div className="space-y-3">
                {currentQ.options.map((option, optionIndex) => (
                  <label
                    key={option._id}
                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedAnswer?.optionText === option.text
                        ? 'border-[#4D2C5E] bg-[#4D2C5E]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQ._id}`}
                      value={option.text}
                      checked={selectedAnswer?.optionText === option.text}
                      onChange={() => handleAnswerSelect(currentQ._id, option)}
                      className="hidden"
                    />
                    <span className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 ${
                      selectedAnswer?.optionText === option.text
                        ? 'border-[#4D2C5E] bg-[#4D2C5E]'
                        : 'border-gray-300'
                    }`}></span>
                    <span className="text-gray-700">{option.text}</span>
                  </label>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-4 border-t">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                
                <button
                  onClick={nextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                  className="px-6 py-2 bg-[#4D2C5E] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5a3a6e] transition-colors"
                >
                  Next Question
                </button>
              </div>
            </motion.div>

            {/* Exam Instructions */}
            {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-blue-800 mb-2">Exam Instructions</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Answer all questions to get accurate results</li>
                <li>• You can navigate between questions using the number grid</li>
                <li>• Time remaining: {formatTime(timeLeft)}</li>
                <li>• Submit when you're ready, or time will auto-submit</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamAttemptPage;