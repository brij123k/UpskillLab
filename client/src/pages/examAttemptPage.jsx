import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ApiConfig from '../config/apiConfig';
import { getDataHandler, postDataHandler } from '../config/services';

const ExamAttempt = () => {
  const { examId } = useParams();
  
  const navigate = useNavigate();
  
  // State management
  const [examData, setExamData] = useState(null);
  const [attemptData, setAttemptData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [examStatus, setExamStatus] = useState('checking'); // checking, upcoming, ongoing, form, exam, completed, ended
  const [notRegistered, setNotRegistered] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [tabSwitchEvents, setTabSwitchEvents] = useState([]);
  
  const mediaStreamRef = useRef(null);
  const visibilityChangeTimeRef = useRef(null);

  // Check exam status on component mount
  useEffect(() => {
    const checkExam = async () => {
      try {
        setLoading(true);
        const endpoint = ApiConfig.examCheck(examId);
        const response = await getDataHandler(endpoint, null, null, true);
        setExamData(response);
        
        if (response.status === 'ended') {
          setExamStatus('ended');
          toast.info('This exam has already ended.');
        } else if (response.status === 'upcoming') {
          setExamStatus('upcoming');
          // Calculate initial time left until start
          const now = new Date();
          const startTime = new Date(response.startAt);
          setTimeLeft(Math.max(0, startTime - now));
        } else if (response.status === 'ongoing') {
          setExamStatus('form');
          // Calculate time left until end
          const now = new Date();
          const endTime = new Date(response.endAt);
          setTimeLeft(Math.max(0, endTime - now));
        } else if (response.status === 'completed') {
          setExamStatus('completed');
          toast.info('This exam has already been completed.');
        }
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load exam information.');
        console.error('Error checking exam:', err);
      } finally {
        setLoading(false);
      }
    };

    checkExam();
  }, [examId]);

  // Request camera and microphone permissions
  const requestMediaPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      // Immediately stop the stream after getting permission
      stream.getTracks().forEach(track => track.stop());
      setPermissionGranted(true);
      toast.success('Camera and microphone permissions granted');
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast.warning('Camera and microphone permissions are required for exam integrity');
      // Continue anyway but track this
      setPermissionGranted(false);
    }
  };

  // Track tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab switched away
        visibilityChangeTimeRef.current = new Date();
        setTabSwitchCount(prev => prev + 1);
        
        const event = {
          timestamp: new Date().toISOString(),
          type: 'tab_switch',
          duration: null // Will be set when tab becomes visible again
        };
        
        setTabSwitchEvents(prev => [...prev, event]);
      } else if (visibilityChangeTimeRef.current) {
        // Tab became visible again
        const duration = new Date() - visibilityChangeTimeRef.current;
        visibilityChangeTimeRef.current = null;
        
        // Update the last event with duration
        setTabSwitchEvents(prev => {
          const updatedEvents = [...prev];
          if (updatedEvents.length > 0) {
            updatedEvents[updatedEvents.length - 1].duration = duration;
          }
          return updatedEvents;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Timer for upcoming exams and exam countdown
  useEffect(() => {
    let timer;
    if ((examStatus === 'upcoming' || examStatus === 'exam') && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1000) {
            clearInterval(timer);
            if (examStatus === 'upcoming') {
              setExamStatus('form');
            } else if (examStatus === 'exam') {
              handleAutoSubmit();
            }
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStatus, timeLeft]);

  // Format time for display
  const formatTime = (milliseconds) => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  };

  // Handle user info form submission
  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Request media permissions before starting exam
      await requestMediaPermissions();
      
      const endpoint = ApiConfig.startExam(examId);
      const response = await postDataHandler(endpoint, userInfo, true);
      
      // Check if user is not registered
      if (response.message === "You are not registered for this exam") {
        setNotRegistered(true);
        return;
      }
      
      setAttemptData(response);
      
      // Get exam questions
      const endpoint2 = ApiConfig.getExamPaper(examId);
      const questionsResponse = await getDataHandler(endpoint2, null, null, true);
      setQuestions(questionsResponse);
      
      setExamStatus('exam');
      
      // Set exam timer based on endAt time
      const endTime = new Date(examData.endAt);
      const now = new Date();
      setTimeLeft(Math.max(0, endTime - now));
    } catch (err) {
      if (err.message.includes("not registered")) {
        setNotRegistered(true);
      } else {
        setError(err.message);
        toast.error('Failed to start the exam. Please try again.');
        console.error('Error starting exam:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  // Auto submit when time runs out
  const handleAutoSubmit = async () => {
    try {
      setLoading(true);
      toast.info('Time is up! Submitting your exam automatically.');
      
      // Prepare answers including unanswered questions
      const submissionAnswers = prepareSubmissionAnswers();
      
      const endpoint = ApiConfig.submitExam(attemptData._id);
      await postDataHandler(endpoint, { 
        answers: submissionAnswers,
        monitoringData: {
          tabSwitchEvents,
          tabSwitchCount,
          permissionGranted,
          startTime: new Date(attemptData.startedAt).toISOString(),
          endTime: new Date().toISOString()
        }
      }, true);
      
      setExamStatus('completed');
      toast.success('Exam submitted successfully!');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to submit exam automatically. Please contact support.');
      console.error('Error auto-submitting exam:', err);
    } finally {
      setLoading(false);
    }
  };

  // Prepare answers including unanswered questions
  const prepareSubmissionAnswers = () => {
    return questions.map(question => {
      const userAnswer = answers[question._id];
      
      if (userAnswer) {
        return {
          questionId: question._id,
          type: question.type,
          ...(question.type === 'objective' 
            ? { selectedOptionId: userAnswer.selectedOptionId } 
            : { answerText: userAnswer.answerText || '' })
        };
      } else {
        // Return empty answer for unanswered questions
        return {
          questionId: question._id,
          type: question.type,
          ...(question.type === 'objective' 
            ? { selectedOptionId: null } 
            : { answerText: '' })
        };
      }
    });
  };

  // Handle answer selection
  const handleAnswerChange = (questionId, type, value, optionId = null) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        type,
        ...(type === 'objective' ? { selectedOptionId: optionId } : { answerText: value })
      }
    }));
  };

  // Count words for subjective answers
  const countWords = (text) => {
    return text ? text.trim().split(/\s+/).length : 0;
  };

  // Submit exam with confirmation
  const handleSubmitExam = async () => {
    // Check if any questions are unanswered
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
    
    try {
      setLoading(true);
      
      // Prepare answers including unanswered questions
      const submissionAnswers = prepareSubmissionAnswers();
      const  monitoringData= {
        email:userInfo.email,
          tabSwitchCount,
          permissionGranted,
          startTime: new Date(attemptData.startedAt).toISOString(),
          endTime: new Date().toISOString()
        }
      const endpoint = ApiConfig.submitExam(attemptData._id);
      await postDataHandler(endpoint, { answers: submissionAnswers}, true);
      
      
        const endpoint2 = ApiConfig.monitoringLog(attemptData._id)
        await postDataHandler(endpoint2,monitoringData,true)
      setExamStatus('completed');
      toast.success('Exam submitted successfully!');
    } catch (err) {
      toast.error('You already attempted the exam or Please try again.');
      console.error('Error submitting exam:', err);
    } finally {
      setLoading(false);
    }
  };

  // Render different sections based on exam status
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="text-center py-12 text-red-500">
          {error}
        </div>
      );
    }
    
    if (notRegistered) {
      return renderNotRegistered();
    }
    
    switch (examStatus) {
      case 'upcoming':
        return renderUpcomingExam();
      case 'form':
        return renderUserForm();
      case 'exam':
        return renderExam();
      case 'completed':
        return renderCompleted();
      case 'ended':
        return renderEnded();
      default:
        return (
          <div className="text-center py-12 text-gray-500">
            Loading exam information...
          </div>
        );
    }
  };

  // Render not registered modal
  const renderNotRegistered = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-[#4D2C5E] mb-4 text-center">Not Registered</h2>
          <p className="text-gray-600 mb-6 text-center">
            You are not registered for this exam. Please contact your administrator.
          </p>
          
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="bg-[#4D2C5E] text-white py-2 px-6 rounded-md hover:bg-[#3a2150] transition-colors font-medium"
            >
              Return to Home
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Render upcoming exam card with countdown
  const renderUpcomingExam = () => {
    const { days, hours, minutes, seconds } = formatTime(timeLeft);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#4D2C5E] mb-4">{examData.title}</h2>
          <p className="text-gray-600 mb-6">{examData.description}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Exam Starts In:</h3>
            <div className="flex justify-center space-x-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#FF7426]">{days}</span>
                <span className="text-sm text-gray-500">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#FF7426]">{hours}</span>
                <span className="text-sm text-gray-500">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#FF7426]">{minutes}</span>
                <span className="text-sm text-gray-500">Minutes</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#FF7426]">{seconds}</span>
                <span className="text-sm text-gray-500">Seconds</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-sm text-gray-500">Start Time</p>
              <p className="font-medium">
                {new Date(examData.startAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">End Time</p>
              <p className="font-medium">
                {new Date(examData.endAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{examData.durationMinutes} minutes</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Marks</p>
              <p className="font-medium">{examData.totalMarks}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Render user information form
  const renderUserForm = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6"
      >
        <h2 className="text-2xl font-bold text-[#4D2C5E] mb-6 text-center">Enter Your Information</h2>
        
        <form onSubmit={handleUserInfoSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={userInfo.name}
              onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4D2C5E] focus:border-[#4D2C5E]"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              value={userInfo.email}
              onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4D2C5E] focus:border-[#4D2C5E]"
              placeholder="Enter your email address"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={userInfo.phone}
              onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4D2C5E] focus:border-[#4D2C5E]"
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-medium text-blue-800 mb-2">Exam Requirements</h3>
            <p className="text-sm text-blue-600">
              This exam requires camera and microphone access for proctoring purposes. 
              You'll be asked to grant permissions before starting the exam.
            </p>
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#4D2C5E] text-white py-2 px-4 rounded-md hover:bg-[#3a2150] transition-colors font-medium"
          >
            Start Exam
          </button>
        </form>
      </motion.div>
    );
  };

  // Render the actual exam
  const renderExam = () => {
    const { hours, minutes, seconds } = formatTime(timeLeft);
    const objectiveQuestions = questions.filter(q => q.type === 'objective');
    const subjectiveQuestions = questions.filter(q => q.type === 'subjective');
    const unansweredCount = questions.length - Object.keys(answers).length;
    
    return (
      <div className="max-w-4xl mx-auto">
        {/* Exam Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 sticky top-4 z-10">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#4D2C5E]">{examData.title}</h2>
              <p className="text-sm text-gray-600">Total Marks: {examData.totalMarks}</p>
              {unansweredCount > 0 && (
                <p className="text-sm text-red-600">
                  {unansweredCount} question(s) unanswered
                </p>
              )}
              {!permissionGranted && (
                <p className="text-sm text-orange-600">
                  Camera/microphone not enabled
                </p>
              )}
              {tabSwitchCount > 0 && (
                <p className="text-sm text-blue-600">
                  Tab switches: {tabSwitchCount}
                </p>
              )}
            </div>
            
            <div className="bg-red-100 text-red-800 py-2 px-4 rounded-lg flex items-center">
              <span className="font-bold mr-2">Time Left:</span>
              <span>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
            </div>
            
            <button
              onClick={handleSubmitExam}
              className="bg-[#4D2C5E] text-white py-2 px-4 rounded-md hover:bg-[#3a2150] transition-colors font-medium"
            >
              Submit Exam
            </button>
          </div>
        </div>
        
        {/* Objective Questions */}
        {objectiveQuestions.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#4D2C5E] mb-4 border-b pb-2">
              Multiple Choice Questions ({objectiveQuestions.length} questions)
            </h3>
            
            {objectiveQuestions.map((question, index) => (
              <div key={question._id} className="mb-6 pb-4 border-b last:border-b-0">
                <div className="flex items-start mb-3">
                  <span className="font-medium bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{question.text}</p>
                    <p className="text-sm text-gray-500">Marks: {question.marks}</p>
                  </div>
                </div>
                
                <div className="ml-11 space-y-2">
                  {question.options.map((option) => (
                    <div key={option._id} className="flex items-center">
                      <input
                        type="radio"
                        id={`option-${option._id}`}
                        name={`question-${question._id}`}
                        checked={answers[question._id]?.selectedOptionId === option._id}
                        onChange={() => handleAnswerChange(question._id, 'objective', null, option._id)}
                        className="h-4 w-4 text-[#4D2C5E] focus:ring-[#4D2C5E]"
                      />
                      <label htmlFor={`option-${option._id}`} className="ml-2 text-gray-700">
                        {option.text}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Subjective Questions */}
        {subjectiveQuestions.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#4D2C5E] mb-4 border-b pb-2">
              Descriptive Questions ({subjectiveQuestions.length} questions)
            </h3>
            
            {subjectiveQuestions.map((question, index) => {
              const wordCount = countWords(answers[question._id]?.answerText || '');
              const isWithinLimit = wordCount >= question.minWords && wordCount <= question.maxWords;
              
              return (
                <div key={question._id} className="mb-6 pb-4 border-b last:border-b-0">
                  <div className="flex items-start mb-3">
                    <span className="font-medium bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                      {objectiveQuestions.length + index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{question.text}</p>
                      <p className="text-sm text-gray-500">
                        Marks: {question.marks} | Word limit: {question.minWords} - {question.maxWords} words
                      </p>
                    </div>
                  </div>
                  
                  <div className="ml-11">
                    <textarea
                      value={answers[question._id]?.answerText || ''}
                      onChange={(e) => handleAnswerChange(question._id, 'subjective', e.target.value)}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4D2C5E] focus:border-[#4D2C5E]"
                      placeholder="Type your answer here..."
                    />
                    
                    <div className={`text-sm mt-1 ${isWithinLimit ? 'text-green-600' : 'text-red-600'}`}>
                      Words: {wordCount} {!isWithinLimit && 
                        `(Requires ${question.minWords}-${question.maxWords} words)`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Submit Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleSubmitExam}
            className="bg-[#4D2C5E] text-white py-3 px-8 rounded-md hover:bg-[#3a2150] transition-colors font-medium text-lg"
          >
            Submit Exam
          </button>
        </div>
      </div>
    );
  };

  // Render completed exam message
  const renderCompleted = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-[#4D2C5E] mb-4">Exam Submitted Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for completing the exam. Your answers have been submitted successfully.
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="bg-[#4D2C5E] text-white py-2 px-6 rounded-md hover:bg-[#3a2150] transition-colors font-medium"
        >
          Return to Home
        </button>
      </motion.div>
    );
  };

  // Render ended exam message
  const renderEnded = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 text-center"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-[#4D2C5E] mb-4">Exam Has Ended</h2>
        <p className="text-gray-600 mb-4">
          This exam ended on {new Date(examData.endAt).toLocaleString()}.
        </p>
        <p className="text-gray-600 mb-6">
          {examData.message || 'The submission period for this exam has closed.'}
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="bg-[#4D2C5E] text-white py-2 px-6 rounded-md hover:bg-[#3a2150] transition-colors font-medium"
        >
          Return to Home
        </button>
      </motion.div>
    );
  };

  return (
    <div className='bg-[#F7F7F7] min-h-screen'>
      
      {/* Exam Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#FF7426]"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#FF7426]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {examData?.title || 'Exam'}
          </motion.h1>

          <motion.p
            className="text-lg text-white/90 max-w-3xl mx-auto"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {examData?.description || 'Please wait while we load the exam details...'}
          </motion.p>
        </div>
      </motion.section>

      {/* Main Exam Content */}
      <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {renderContent()}
      </main>

      <Helmet>
        <title>{examData?.title ? `${examData.title} - Upskillab Exam` : 'Upskillab Exam'}</title>
        <meta name="description" content={examData?.description || "Take your exam on Upskillab platform"} />
      </Helmet>
    </div>
  );
};

export default ExamAttempt;