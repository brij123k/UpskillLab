import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiAlertCircle, FiCheckCircle, FiCamera, FiMic, FiMonitor } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDataHandlerWithToken, postDataHandlerWithToken, putDataHandlerWithToken } from '../../../config/services';
import { useNavigate, useParams } from 'react-router-dom';
import ApiConfig from '../../../config/apiConfig';
const StudentExam = () => {
     const navigate = useNavigate();
    const { examId } = useParams();
  const [examData, setExamData] = useState(null);
  const [attemptData, setAttemptData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [examStatus, setExamStatus] = useState('checking'); // checking, upcoming, ongoing, instructions, exam, completed
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showInstructions, setShowInstructions] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  
  const mediaStreamRef = useRef(null);
  const visibilityChangeTimeRef = useRef(null);

  // Fetch exam data
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setIsLoading(true);
        const endpoint = ApiConfig.examCheck(examId)
        const response = await getDataHandlerWithToken(endpoint, null, null, true);
        console.log(response)
        setExamData(response);
        
        if (response.status === 'upcoming') {
          setExamStatus('upcoming');
          // Calculate initial time left until start
          const now = new Date();
          const startTime = new Date(response.startAt);
          setTimeLeft(Math.max(0, startTime - now));
        } else if (response.status === 'ongoing') {
          setExamStatus('instructions');
        } else if (response.status === 'ended') {
          setExamStatus('completed');
          toast.info('This exam has already ended.');
        }
      } catch (error) {
        toast.error('Failed to load exam information');
        console.error('Error fetching exam data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExamData();
  }, [examId]);

  // Timer for upcoming exams and exam countdown
  useEffect(() => {
    let timer;
    if ((examStatus === 'upcoming' || examStatus === 'exam') && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1000) {
            clearInterval(timer);
            if (examStatus === 'upcoming') {
              setExamStatus('instructions');
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

  // Track tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab switched away
        visibilityChangeTimeRef.current = new Date();
        setTabSwitchCount(prev => prev + 1);
        toast.warning('Please do not switch tabs during the exam!');
      }
    };

    if (examStatus === 'exam') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [examStatus]);

  // Request camera and microphone permissions
  const requestMediaPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      // Store the stream reference
      mediaStreamRef.current = stream;
      setPermissionGranted(true);
    //   toast.success('Camera and microphone permissions granted');
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast.warning('Camera and microphone permissions are required for exam integrity');
      setPermissionGranted(false);
    }
  };

  // Start exam
  const handleStartExam = async () => {
    try {
      setIsLoading(true);
      await requestMediaPermissions();
      const endpoint = ApiConfig.startExam(examId)
      const response = await postDataHandlerWithToken(endpoint,{data:"attempt"},true);
      if(response.message=="You already attempted this exam"){
        toast.error(response.message)
        navigate("/Student/Exam");
      }else{
          toast.success(response.message);
          setAttemptData(response);
      }
      
      // Get exam questions
      const endpoint1 = ApiConfig.getExamPaper(examId)
      const questionsResponse = await getDataHandlerWithToken(endpoint1,null,null,true);
      console.log(questionsResponse)
      setQuestions(questionsResponse);
      
      setShowInstructions(false);
      setExamStatus('exam');
      
      // Set exam timer based on endAt time
      const endTime = new Date(examData.endAt);
      const now = new Date();
      setTimeLeft(Math.max(0, endTime - now));
    } catch (error) {
      toast.error('Failed to start the exam. Please try again.');
      console.error('Error starting exam:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format time for display
  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    
    return { hours, minutes, seconds };
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

  // Submit monitoring log
  const submitMonitoringLog = async () => {
    try {
        console.log(attemptData)
        console.log(attemptData.submission.email)
        console.log(tabSwitchCount)
        console.log(permissionGranted)
        console.log(new Date(attemptData.submission.startedAt).toISOString())
        console.log(new Date().toISOString())
      const monitoringData = {
        email: attemptData.submission.email,
        tabSwitchCount,
        permissionGranted,
        startTime: new Date(attemptData.submission.startedAt).toISOString(),
        endTime: new Date().toISOString()
      };
      console.log(monitoringData)
      const endpoint = ApiConfig.monitoringLog(attemptData.submission._id)
      await postDataHandlerWithToken(endpoint, monitoringData,true);
    } catch (error) {
      console.error('Error submitting monitoring log:', error);
    }
  };

  // Auto submit when time runs out
  const handleAutoSubmit = async () => {
    try {
      setIsLoading(true);
      toast.info('Time is up! Submitting your exam automatically.');
      
      // Prepare answers including unanswered questions
      const submissionAnswers = prepareSubmissionAnswers();
      const endpoint = ApiConfig.submitExam(attemptData.submission._id)
      await postDataHandlerWithToken(endpoint, {
        answers: submissionAnswers
      },true);
      
      // Submit monitoring log
      await submitMonitoringLog();
      
      setExamStatus('completed');
      toast.success('Exam submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit exam automatically. Please contact support.');
      console.error('Error auto-submitting exam:', error);
    } finally {
      setIsLoading(false);
    }
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
      setIsLoading(true);
      
      // Prepare answers including unanswered questions
      const submissionAnswers = prepareSubmissionAnswers();
      console.log(attemptData)
      const endpoint = ApiConfig.submitExam(attemptData.submission._id)
      await postDataHandlerWithToken(endpoint, {
        answers: submissionAnswers
      },true);
      
      // Submit monitoring log
      await submitMonitoringLog();
      
      setExamStatus('completed');
      toast.success('Exam submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit exam. Please try again.');
      console.error('Error submitting exam:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Render different sections based on exam status
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex justify-center items-center bg-[#fdf8ee]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
        </div>
      );
    }
    
    switch (examStatus) {
      case 'upcoming':
        return renderUpcomingExam();
      case 'instructions':
        return renderInstructions();
      case 'exam':
        return renderExam();
      case 'completed':
        return renderCompleted();
      default:
        return (
          <div className="text-center py-12 text-gray-500">
            Checking exam information...
          </div>
        );
    }
  };

  // Render upcoming exam card with countdown
  const renderUpcomingExam = () => {
    const { hours, minutes, seconds } = formatTime(timeLeft);
    const startTime = new Date(examData.startAt);
    const endTime = new Date(examData.endAt);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100"
      >
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#4D2C5E] mb-4">{examData.title}</h2>
          <p className="text-gray-600 mb-6">{examData.description}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Exam Starts In:</h3>
            <div className="flex justify-center space-x-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#FF7426]">{hours.toString().padStart(2, '0')}</span>
                <span className="text-sm text-gray-500">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#FF7426]">{minutes.toString().padStart(2, '0')}</span>
                <span className="text-sm text-gray-500">Minutes</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#FF7426]">{seconds.toString().padStart(2, '0')}</span>
                <span className="text-sm text-gray-500">Seconds</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-sm text-gray-500">Start Time</p>
              <p className="font-medium">
                {startTime.toLocaleString('en-IN', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Asia/Kolkata'
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">End Time</p>
              <p className="font-medium">
                {endTime.toLocaleString('en-IN', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Asia/Kolkata'
                })}
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

  // Render exam instructions
  const renderInstructions = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#4D2C5E] mb-6 text-center">Exam Instructions</h2>
        
        <div className="prose prose-sm max-w-none mb-6">
          <p className="font-semibold text-lg mb-4">Please read the following instructions carefully:</p>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <FiClock className="h-5 w-5 text-[#4D2C5E] mr-2 mt-0.5 flex-shrink-0" />
              <span>The exam duration is <strong>{examData.durationMinutes} minutes</strong>.</span>
            </li>
            <li className="flex items-start">
              <FiAlertCircle className="h-5 w-5 text-[#4D2C5E] mr-2 mt-0.5 flex-shrink-0" />
              <span>Once started, you cannot pause the exam.</span>
            </li>
            <li className="flex items-start">
              <FiCamera className="h-5 w-5 text-[#4D2C5E] mr-2 mt-0.5 flex-shrink-0" />
              <span>Camera access is required for proctoring purposes.</span>
            </li>
            <li className="flex items-start">
              <FiMic className="h-5 w-5 text-[#4D2C5E] mr-2 mt-0.5 flex-shrink-0" />
              <span>Microphone access is required for proctoring purposes.</span>
            </li>
            <li className="flex items-start">
              <FiMonitor className="h-5 w-5 text-[#4D2C5E] mr-2 mt-0.5 flex-shrink-0" />
              <span>Do not switch tabs or windows during the exam. This will be monitored.</span>
            </li>
            <li className="flex items-start">
              <FiCheckCircle className="h-5 w-5 text-[#4D2C5E] mr-2 mt-0.5 flex-shrink-0" />
              <span>Ensure you have a stable internet connection throughout the exam.</span>
            </li>
          </ul>
          
          <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
            <p className="font-medium text-yellow-800">Important:</p>
            <p className="text-yellow-700">Any attempt to cheat or violate exam rules will result in disqualification.</p>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <button
            onClick={() => setShowInstructions(true)}
            className="bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white py-3 px-8 rounded-lg hover:opacity-90 transition-all font-medium text-lg"
          >
            I Understand, Start Exam
          </button>
        </div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showInstructions && (
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
                <h3 className="text-xl font-bold text-[#4D2C5E] mb-4">Final Confirmation</h3>
                <p className="text-gray-600 mb-6">
                  Are you ready to start the exam? Once you begin, the timer will start and cannot be paused.
                </p>
                
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowInstructions(false)}
                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStartExam}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
                  >
                    Start Exam
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 sticky top-4 z-10 border border-gray-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
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
            
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="bg-red-100 text-red-800 py-2 px-4 rounded-lg flex items-center">
                <FiClock className="mr-2 h-5 w-5" />
                <span className="font-bold">Time Left: </span>
                <span className="ml-1">{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
              </div>
              
              <button
                onClick={handleSubmitExam}
                className="bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white py-2 px-4 rounded-lg hover:opacity-90 transition-colors font-medium"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
        
        {/* Objective Questions */}
        {objectiveQuestions.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-gray-100">
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
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-gray-100">
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200"
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
            className="bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white py-3 px-8 rounded-lg hover:opacity-90 transition-colors font-medium text-lg"
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
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 text-center border border-gray-100"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheckCircle className="h-8 w-8 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-[#4D2C5E] mb-4">Exam Submitted Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for completing the exam. Your answers have been submitted successfully.
        </p>
        
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white py-2 px-6 rounded-lg hover:opacity-90 transition-colors font-medium"
        >
          Return to Dashboard
        </button>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fdf8ee] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default StudentExam;