import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiAlertCircle, FiCheckCircle, FiCamera, FiMic, FiMonitor } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDataHandlerWithToken, postDataHandlerWithToken, putDataHandlerWithToken } from '../../../config/services';
import { useNavigate, useParams } from 'react-router-dom';
import ApiConfig from '../../../config/apiConfig';
import { FiInfo, FiPlay, FiActivity, FiPause, FiWifi, FiFileText, 
         FiAlertTriangle } from 'react-icons/fi';
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
  const [checkboxes, setCheckboxes] = useState([false, false, false, false]);
const [allChecked, setAllChecked] = useState(false);
  
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
      console.log(response,"1")
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
      const startedAt = new Date(response.submission.startedAt);
    const durationMs = examData.durationMinutes * 60 * 1000;

    const attemptEndTime = new Date(startedAt.getTime() + durationMs);
    const now = new Date();

    const remainingTime = Math.max(0, attemptEndTime.getTime() - now.getTime());
    console.log(remainingTime)
    if(remainingTime<=0){
      toast.error('Your Time is Over! Contact Support Team');
      navigate("/Student/Exam");
    }
    setTimeLeft(remainingTime);
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

  const handleCheckboxChange = (index, checked) => {
  const newCheckboxes = [...checkboxes];
  newCheckboxes[index] = checked;
  setCheckboxes(newCheckboxes);
  setAllChecked(newCheckboxes.every(Boolean));
};

const handleStartClick = () => {
  if (allChecked) {
    setShowInstructions(true);
  }
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
      console.log(submissionAnswers)
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
  className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-100 w-[95vw] sm:w-full"
>
  <div className="text-center">
    {/* Responsive heading */}
    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#4D2C5E] mb-3 sm:mb-4 md:mb-6">
      {examData.title}
    </h2>
    
    {/* Responsive description */}
    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-0">
      {examData.description}
    </p>
    
    {/* Countdown timer - responsive spacing and sizing */}
    <div className="mb-6 sm:mb-8 md:mb-10">
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
        Exam Starts In:
      </h3>
      <div className="flex justify-center space-x-3 sm:space-x-4 md:space-x-6">
        {[
          { value: hours.toString().padStart(2, '0'), label: 'Hours' },
          { value: minutes.toString().padStart(2, '0'), label: 'Minutes' },
          { value: seconds.toString().padStart(2, '0'), label: 'Seconds' }
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#FF7426]">
              {item.value}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
    
    {/* Grid responsive for all screens */}
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 text-left">
      {/* Start Time */}
      <div className="p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Start Time</p>
        <p className="text-sm sm:text-base font-medium break-words">
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
      
      {/* End Time */}
      <div className="p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">End Time</p>
        <p className="text-sm sm:text-base font-medium break-words">
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
      
      {/* Duration */}
      <div className="p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Duration</p>
        <p className="text-sm sm:text-base font-medium">
          {examData.durationMinutes} minutes
        </p>
      </div>
      
      {/* Total Marks */}
      <div className="p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Total Marks</p>
        <p className="text-sm sm:text-base font-medium">
          {examData.totalMarks}
        </p>
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
  className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-100 w-[95vw] sm:w-full"
>
  {/* Header with logo and title */}
  <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
    <div className="flex items-center mb-4 sm:mb-0">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] rounded-lg flex items-center justify-center mr-3">
        <span className="text-white font-bold text-sm sm:text-base">U</span>
      </div>
      <h1 className="text-lg sm:text-xl font-bold text-gray-800">Upskillab</h1>
    </div>
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4D2C5E] text-center sm:text-right">
      Exam Instructions
    </h2>
  </div>
  
  {/* Instructions content */}
  <div className="space-y-6 sm:space-y-8">
    {/* General Instructions */}
    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 pb-2 border-b border-gray-200">
        Please read the following instructions carefully:
      </h3>
      
      <div className="bg-blue-50 p-4 sm:p-5 rounded-lg border border-blue-100 mb-6 sm:mb-8">
        <div className="flex items-start">
          <FiInfo className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-800 mb-1">Exam Duration: {examData.durationMinutes} minutes</p>
            <p className="text-blue-700 text-sm sm:text-base">
              The exam will auto-submit when time is complete. No extensions will be granted.
            </p>
          </div>
        </div>
      </div>
      
      {/* Instruction Points */}
      <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {[
          { icon: FiClock, text: "You may start the exam anytime within this window" },
          { icon: FiPlay, text: "Once 'Start Exam' is clicked, the timer begins immediately" },
          { icon: FiActivity, text: "The exam must be completed in one continuous session within the allotted duration" },
          { icon: FiPause, text: "No pause, restart, or reattempt is permitted" },
          { icon: FiClock, text: "The exam will be auto-submitted upon time completion" },
          { icon: FiWifi, text: "Ensure stable internet connectivity and a compatible device" },
          { icon: FiFileText, text: "The exam is governed by the Upskillab Examination & Academic Integrity Policy" },
          { icon: FiAlertTriangle, text: "Any policy violation may lead to disciplinary action" }
        ].map((item, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start bg-gray-50 p-3 sm:p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#4D2C5E] mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm sm:text-base text-gray-700">{item.text}</span>
          </motion.li>
        ))}
      </ul>
      
      {/* Important Warning */}
      <div className="bg-yellow-50 p-4 sm:p-5 rounded-lg border border-yellow-200">
        <div className="flex items-start">
          <FiAlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-yellow-800 mb-2 text-sm sm:text-base">Important:</p>
            <p className="text-yellow-700 text-sm sm:text-base">
              Any attempt to cheat or violate exam rules will result in immediate disqualification and may lead to further disciplinary action as per Upskillab policy.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    {/* Declaration & Consent */}
    <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
        Declaration & Consent (Mandatory)
      </h3>
      
      <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {[
          "I confirm that I have read and understood all the exam instructions.",
          "I understand that once the exam starts, it must be completed in one attempt within the given time.",
          "I agree to comply with the Upskillab Examination and Academic Integrity Policy.",
          "I acknowledge that any violation may result in disciplinary action."
        ].map((item, index) => (
          <li key={index} className="flex items-start">
            <input
              type="checkbox"
              id={`declaration-${index}`}
              className="h-5 w-5 sm:h-6 sm:w-6 text-[#4D2C5E] bg-white border-2 border-gray-300 rounded mt-0.5 mr-3 sm:mr-4 flex-shrink-0 cursor-pointer"
              onChange={(e) => handleCheckboxChange(index, e.target.checked)}
            />
            <label 
              htmlFor={`declaration-${index}`}
              className="text-sm sm:text-base text-gray-700 cursor-pointer select-none"
            >
              {item}
            </label>
          </li>
        ))}
      </ul>
      
      <div className="bg-white p-4 sm:p-5 rounded-lg border border-gray-300">
        <p className="text-sm sm:text-base text-gray-600 italic">
          By clicking "I Agree & Start Exam", I consent to the above terms and conditions.
        </p>
      </div>
    </div>
  </div>
  
  {/* Start Button */}
  <div className="mt-8 sm:mt-12 text-center">
    <button
      onClick={handleStartClick}
      disabled={!allChecked} // Disable if all checkboxes aren't checked
      className={`
        w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base md:text-lg
        transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
        ${allChecked 
          ? 'bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white hover:shadow-lg hover:shadow-purple-200' 
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }
      `}
    >
      I Agree & Start Exam
    </button>
    
    <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
      {allChecked 
        ? "You may now start the exam"
        : "Please check all declaration boxes to continue"
      }
    </p>
  </div>
  
  {/* Confirmation Modal */}
  <AnimatePresence>
    {showInstructions && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 sm:p-6 md:p-8 border border-gray-100 mx-4"
        >
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#4D2C5E] mb-3 sm:mb-4">
              Final Confirmation
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              Are you ready to start the exam? Once you begin, the timer will start and cannot be paused.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <FiClock className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-800 text-sm sm:text-base">
                    Exam Duration: {examData.durationMinutes} minutes
                  </p>
                  <p className="text-blue-700 text-xs sm:text-sm mt-1">
                    The exam will auto-submit when time is complete
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
            <button
              onClick={() => setShowInstructions(false)}
              className="px-5 py-2.5 sm:px-6 sm:py-3 border border-gray-300 text-gray-700 rounded-lg 
                       hover:bg-gray-50 transition-all duration-200 font-medium text-sm sm:text-base 
                       w-full sm:w-auto order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              onClick={handleStartExam}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] 
                       text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium 
                       text-sm sm:text-base w-full sm:w-auto order-1 sm:order-2"
            >
              Start Exam Now
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
          Your responses have been recorded successfully.
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