import React, { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX, FiSend, FiUser, FiPhone, FiMail, FiBook } from 'react-icons/fi';
import { getDataHandler, postDataHandler } from '../config/services';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
    courseName: ''
  });
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');
  const messagesEndRef = useRef(null);

  // Response variations for different steps
  const responseVariations = {
    welcome: [
      "Hello! Welcome to our platform. I'm here to help you get started.",
      "Hi there! Welcome! I'm your course assistant, ready to help you explore our offerings.",
      "Greetings! Thanks for stopping by. I'm here to help you find the perfect course."
    ],
    loadingCourses: [
      "Let me fetch our available courses for you...",
      "Just a moment while I load our course catalog...",
      "Getting our course options ready for you..."
    ],
    coursesReady: [
      "Here are our available courses. Please select one or type the course name you're interested in:",
      "Great! Here are our courses. You can choose one or tell me what you're looking for:",
      "Perfect! Check out these options or let me know if you have something specific in mind:"
    ],
    courseSelected: [
      "Excellent choice! You've selected {course}. What's your name?",
      "Great selection! {course} is a popular option. May I know your name?",
      "Wonderful! {course} is an excellent program. Could you tell me your name?"
    ],
    getName: [
      "Nice to meet you, {name}! What's your phone number?",
      "Pleased to meet you, {name}! Could you share your phone number?",
      "Hello {name}! What's the best phone number to reach you?"
    ],
    getPhone: [
      "Thank you! What's your email address?",
      "Great! Now could you provide your email address?",
      "Thanks! What email should we use to contact you?"
    ],
    invalidEmail: [
      "That email doesn't look quite right. Could you please enter a valid email address?",
      "Hmm, that email format seems invalid. Please check and enter a valid email.",
      "I need a valid email address to continue. Could you please provide one?"
    ],
    success: [
      "Perfect! Our team will reach out to you shortly. Thank you for your interest!",
      "Excellent! We've received your information and will contact you soon.",
      "Great! Our advisors will get in touch with you shortly. Thanks for connecting with us!"
    ],
    error: [
      "Thank you for your information! There was a temporary issue, but our team will still reach out to you shortly.",
      "We've noted your details though we encountered a small technical issue. Our team will contact you soon.",
      "Your information has been received. There was a minor glitch but we'll definitely follow up with you."
    ]
  };

  // Helper function to get a random response variation
  const getRandomResponse = (key, data = {}) => {
    const variations = responseVariations[key];
    const randomIndex = Math.floor(Math.random() * variations.length);
    let response = variations[randomIndex];
    
    // Replace placeholders with actual data
    Object.keys(data).forEach(key => {
      response = response.replace(`{${key}}`, data[key]);
    });
    
    return response;
  };

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation function
  const isValidPhone = (phone) => {
    // Basic phone validation - allows numbers, spaces, parentheses, hyphens, and plus sign
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, validationError, isSubmitting]);

  // Fetch courses from API
  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const res = await getDataHandler('courseDisplay');
      if (res && res.data) {
        const featuredCourses = res.data
          .filter((course) => course.active)
          .slice(0, 8) // Limit to 8 courses for better mobile display
          .map((course) => ({
            id: course._id,
            title: course.courseName,
            courseCode: course.courseCode,
            category: course.category?.categoryName || 'General'
          }));
        setCourses(featuredCourses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "Sorry, I couldn't load the courses at the moment. Please type the course name you're interested in.",
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Send data to backend API
  const sendDataToBackend = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await postDataHandler('postQuery', data);
      if (response) {
        console.log('Data sent successfully:', response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error sending data to backend:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: getRandomResponse('welcome'),
          sender: 'bot',
          timestamp: new Date()
        },
        {
          id: 2,
          text: getRandomResponse('loadingCourses'),
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
      setCurrentStep('loadingCourses');
      fetchCourses();
    }
  }, [isOpen, messages.length]);

  // Show courses when they are loaded
  useEffect(() => {
    if (isOpen && currentStep === 'loadingCourses' && !isLoading) {
      if (courses.length > 0) {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: getRandomResponse('coursesReady'),
          sender: 'bot',
          timestamp: new Date()
        }]);
      }
      setCurrentStep('selectCourse');
    }
  }, [courses, isLoading, isOpen, currentStep]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Clear any previous validation errors
    setValidationError('');

    // Add user message to chat
    const newUserMessage = {
      id: messages.length + 1,
      text: userInput,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');

    // Process the message based on current step
    setTimeout(async () => {
      let botResponse = {};
      
      switch(currentStep) {
        case 'selectCourse':
          // Check if the input matches any course name
          const matchedCourse = courses.find(course => 
            course.title.toLowerCase().includes(userInput.toLowerCase()) ||
            userInput.toLowerCase().includes(course.title.toLowerCase())
          );

          if (matchedCourse) {
            setUserData(prev => ({ ...prev, courseName: matchedCourse.title }));
            botResponse = {
              id: messages.length + 2,
              text: getRandomResponse('courseSelected', { course: matchedCourse.title }),
              sender: 'bot',
              timestamp: new Date()
            };
            setCurrentStep('getName');
          } else {
            // If no exact match, still accept what user typed and send to backend
            setUserData(prev => ({ ...prev, courseName: userInput }));
            botResponse = {
              id: messages.length + 2,
              text: `Thank you! I've noted your interest in ${userInput}. What's your name?`,
              sender: 'bot',
              timestamp: new Date()
            };
            setCurrentStep('getName');
          }
          break;
        
        case 'getName':
          setUserData(prev => ({ ...prev, name: userInput }));
          botResponse = {
            id: messages.length + 2,
            text: getRandomResponse('getName', { name: userInput }),
            sender: 'bot',
            timestamp: new Date()
          };
          setCurrentStep('getPhone');
          break;
        
        case 'getPhone':
          // Validate phone number
          if (!isValidPhone(userInput)) {
            botResponse = {
              id: messages.length + 2,
              text: "That doesn't look like a valid phone number. Please enter a valid phone number (e.g., 123-456-7890).",
              sender: 'bot',
              timestamp: new Date()
            };
            setValidationError('phone');
            break;
          }
          
          setUserData(prev => ({ ...prev, phone: userInput }));
          botResponse = {
            id: messages.length + 2,
            text: getRandomResponse('getPhone'),
            sender: 'bot',
            timestamp: new Date()
          };
          setCurrentStep('getEmail');
          break;
        
        case 'getEmail':
          // Validate email
          if (!isValidEmail(userInput)) {
            botResponse = {
              id: messages.length + 2,
              text: getRandomResponse('invalidEmail'),
              sender: 'bot',
              timestamp: new Date()
            };
            setValidationError('email');
            break;
          }
          
          const finalUserData = {
            ...userData,
            email: userInput
          };
          
          setUserData(finalUserData);
          
          // Send data to backend
          const success = await sendDataToBackend(finalUserData);
          
          if (success) {
            botResponse = {
              id: messages.length + 2,
              text: getRandomResponse('success'),
              sender: 'bot',
              timestamp: new Date()
            };
          } else {
            botResponse = {
              id: messages.length + 2,
              text: getRandomResponse('error'),
              sender: 'bot',
              timestamp: new Date()
            };
          }
          setCurrentStep('completed');
          break;
        
        default:
          botResponse = {
            id: messages.length + 2,
            text: "Thank you for your message. Our team will get back to you soon.",
            sender: 'bot',
            timestamp: new Date()
          };
      }

      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleCourseSelect = (courseTitle) => {
    const userMessage = {
      id: messages.length + 1,
      text: courseTitle,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getRandomResponse('courseSelected', { course: courseTitle }),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setUserData(prev => ({ ...prev, courseName: courseTitle }));
      setCurrentStep('getName');
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setUserInput('');
    setCurrentStep('welcome');
    setUserData({
      name: '',
      phone: '',
      email: '',
      courseName: ''
    });
    setValidationError('');
  };

  return (
    <div className="fixed bottom-14 right-4 sm:bottom-14 sm:right-6 z-50">
      {/* Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#FF7426] text-white p-3 sm:p-4 rounded-full cursor-pointer shadow-lg hover:bg-[#ff7626de] transition-all duration-300 flex items-center justify-center"
          aria-label="Open chat"
        >
          <FiMessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-xl w-[calc(100vw-2rem)] sm:w-80 md:w-96 h-96 flex flex-col border border-gray-200 fixed bottom-4 right-4 sm:relative sm:bottom-auto sm:right-auto">
          {/* Chat Header */}
          <div className="bg-[#FF7426] text-white p-3 sm:p-4 rounded-t-lg sm:rounded-t-xl flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white/20 p-1 rounded-full mr-2">
                <FiMessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base">Course Assistant</h3>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                resetChat();
              }}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <FiX className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-2 sm:space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-2 sm:p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-[#4D2C5E] text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-xs sm:text-sm break-words">
                      {message.text}
                    </p>
                    <p className={`text-[10px] xs:text-xs mt-1 ${message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-bl-none p-2 sm:p-3 rounded-lg max-w-[70%]">
                    <p className="text-xs sm:text-sm text-gray-600">Loading courses...</p>
                  </div>
                </div>
              )}

              {/* Course Selection Buttons */}
              {currentStep === 'selectCourse' && courses.length > 0 && (
                <div className="flex flex-col space-y-2">
                  <p className="text-xs text-gray-500 mb-1 sm:mb-2">Available courses:</p>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                    {courses.map((course) => (
                      <button
                        key={course.id}
                        onClick={() => handleCourseSelect(course.title)}
                        className="bg-white border border-[#4D2C5E]/20 text-[#4D2C5E] text-xs p-2 rounded-lg hover:bg-[#4D2C5E]/5 transition-colors text-left break-words"
                      >
                        <strong className="text-xs">{course.title}</strong>
                        <span className="block text-[10px] text-gray-500 mt-1">{course.category}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Or type the course name you're interested in...
                  </p>
                </div>
              )}

              {/* Validation error message */}
              {validationError && (
                <div className="flex justify-start">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-bl-none p-2 sm:p-3 rounded-lg max-w-[85%]">
                    <p className="text-xs sm:text-sm text-yellow-800">
                      {validationError === 'email' 
                        ? "Please enter a valid email address (e.g., name@example.com)"
                        : "Please enter a valid phone number (e.g., 123-456-7890)"}
                    </p>
                  </div>
                </div>
              )}

              {/* Submission loading */}
              {isSubmitting && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-bl-none p-2 sm:p-3 rounded-lg max-w-[70%]">
                    <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting your information...
                    </p>
                  </div>
                </div>
              )}
              
              {/* Invisible element for auto-scrolling */}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          {(currentStep === 'selectCourse' || currentStep === 'getName' || currentStep === 'getPhone' || currentStep === 'getEmail') && (
            <div className="p-2 sm:p-3 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <input
                  type={currentStep === 'getEmail' ? 'email' : currentStep === 'getPhone' ? 'tel' : 'text'}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    currentStep === 'selectCourse' ? 'Type course name...' :
                    currentStep === 'getName' ? 'Enter your name...' :
                    currentStep === 'getPhone' ? 'Enter your phone number...' :
                    currentStep === 'getEmail' ? 'Enter your email address...' :
                    'Type your message...'
                  }
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7426]"
                  disabled={isSubmitting}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!userInput.trim() || isSubmitting}
                  className="bg-[#FF7426] text-white p-2 rounded-lg hover:bg-[#ff7626de] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <FiSend className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;