import React, { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX, FiSend, FiUser, FiPhone, FiMail } from 'react-icons/fi';
import { getDataHandler, postDataHandler } from '../config/services';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentStep, setCurrentStep] = useState('welcome');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseName: '',
    question: ''
  });
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState('name');
  const messagesEndRef = useRef(null);

  // FAQ responses
  const faqResponses = {
    fees: "Our course fees vary by program and duration. Most start at affordable rates with easy instalments.",
    placement: "All our programs include career guidance, interview prep and job assistance with partner companies.",
    certification: "Every Upskillab program comes with industry-recognised certification (aligned with Skill India/NSQF).",
    learning: "Our programs are fully online with live classes, recorded sessions, assignments & doubt-clearing support.",
    other: "Thanks for your question! I'll connect you to a counsellor who can assist."
  };

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isSubmitting]);

  // Fetch courses from API
  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const res = await getDataHandler('courseDisplay');
      if (res && res.data) {
        const activeCourses = res.data
          .filter((course) => course.active)
          .map((course) => ({
            id: course._id,
            title: course.courseName,
            category: course.category?.categoryName || 'General'
          }));
        setCourses(activeCourses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Send data to backend
  const sendQueryToBackend = async (data) => {
    setIsSubmitting(true);
    try {
      const queryData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        courseName: data.courseName || data.question || 'General Inquiry',
        message: data.question ? `Question: ${data.question}` : `Interested in: ${data.courseName}`
      };
      
      const response = await postDataHandler('postQuery', queryData);
      return response ? true : false;
    } catch (error) {
      console.error('Error sending query:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Initialize chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "Hi 👋 Welcome to Upskillab! We offer accredited skill programs in Psychology, Sales, Cybersecurity, AI/ML and more. How can I help you today?",
          sender: 'bot',
          timestamp: new Date(),
          buttons: ['Explore Courses', 'Talk to a Counsellor', 'Ask a Question']
        }
      ]);
    }
  }, [isOpen]);

  // Add bot message
  const addBotMessage = (text, buttons = []) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: 'bot',
      timestamp: new Date(),
      buttons
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Add user message
  const addUserMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Handle welcome step choices
  const handleWelcomeChoice = (choice) => {
    addUserMessage(choice);
    
    setTimeout(() => {
      switch(choice) {
        case 'Explore Courses':
          fetchCourses();
          addBotMessage("Please pick an area you're interested in:", []);
          setCurrentStep('loadingCourses');
          break;
        
        case 'Talk to a Counsellor':
          addBotMessage("I'd be happy to connect you with a counsellor! Please share your details:", []);
          setCurrentStep('leadCapture');
          setFormData(prev => ({ ...prev, courseName: 'Counsellor Consultation' }));
          break;
        
        case 'Ask a Question':
          addBotMessage("Sure, type your question below or choose a topic:", 
            ['Fees', 'Placement Support', 'Certification', 'Mode of Learning', 'Other Question']);
          setCurrentStep('faq');
          break;
        
        default:
          handleFreeTextInput(choice);
      }
    }, 500);
  };

  // Handle course selection
  const handleCourseSelection = (courseTitle) => {
    addUserMessage(courseTitle);
    setFormData(prev => ({ ...prev, courseName: courseTitle }));
    
    setTimeout(() => {
      addBotMessage(`Great choice! 🎉 Drop your Name, Email and Phone below and we'll send you the brochure + connect you to a counsellor instantly.`, []);
      setCurrentStep('leadCapture');
    }, 500);
  };

  // Handle FAQ selection
  const handleFAQSelection = (faqType, userText = '') => {
    const question = userText || faqType;
    addUserMessage(question);
    
    setTimeout(() => {
      let response = faqResponses.other;
      
      if (faqType.includes('Fee') || faqType.includes('Price')) response = faqResponses.fees;
      else if (faqType.includes('Placement') || faqType.includes('Job')) response = faqResponses.placement;
      else if (faqType.includes('Certif')) response = faqResponses.certification;
      else if (faqType.includes('Learn') || faqType.includes('Mode')) response = faqResponses.learning;
      
      addBotMessage(`${response} Would you like me to send full details? Please share your name, email and phone.`, []);
      setCurrentStep('leadCapture');
      setFormData(prev => ({ ...prev, question }));
    }, 500);
  };

  // Handle free text input
  const handleFreeTextInput = (text) => {
    addUserMessage(text);
    
    setTimeout(() => {
      // Check if it's a course-related query
      const matchedCourse = courses.find(course => 
        text.toLowerCase().includes(course.title.toLowerCase()) ||
        course.title.toLowerCase().includes(text.toLowerCase())
      );

      if (matchedCourse) {
        handleCourseSelection(matchedCourse.title);
      } else {
        // Treat as FAQ
        handleFAQSelection('other', text);
      }
    }, 500);
  };

  // Handle form field submission
  const handleFormFieldSubmit = () => {
    if (!userInput.trim()) return;

    addUserMessage(userInput);

    // Update form data based on active field
    setFormData(prev => ({
      ...prev,
      [activeField]: userInput
    }));

    setUserInput('');

    setTimeout(() => {
      // Move to next field or submit
      if (activeField === 'name') {
        setActiveField('email');
        addBotMessage("Great! Now please share your email address:", []);
      } else if (activeField === 'email') {
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userInput)) {
          addBotMessage("Please enter a valid email address (e.g., name@example.com):", []);
          return;
        }
        setActiveField('phone');
        addBotMessage("Thank you! Now please share your phone number:", []);
      } else if (activeField === 'phone') {
        // Validate phone
        const phoneRegex = /^[\+]?[0-9]{10,15}$/;
        if (!phoneRegex.test(userInput.replace(/\s/g, ''))) {
          addBotMessage("Please enter a valid phone number (10-15 digits):", []);
          return;
        }

        // All fields filled, submit the form
        handleFormSubmit();
      }
    }, 500);
  };

  // Handle final form submission
  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    
    const success = await sendQueryToBackend(formData);
    
    setTimeout(() => {
      if (success) {
        addBotMessage(`✅ Thanks ${formData.name}! Brochure sent. Want to:`, 
          ['Book a Free Demo', 'Talk to a Counsellor Now']);
        setCurrentStep('confirmation');
      } else {
        addBotMessage("Thank you for your information! There was a temporary issue, but our team will still reach out to you shortly.", []);
        setCurrentStep('completed');
      }
      setIsSubmitting(false);
    }, 1000);
  };

  // Handle confirmation step choices
  const handleConfirmationChoice = (choice) => {
    addUserMessage(choice);
    
    setTimeout(() => {
      addBotMessage("Perfect! Our team will contact you shortly to arrange this. Thank you for choosing Upskillab! 🎉", []);
      setCurrentStep('completed');
    }, 500);
  };

  // Main message handler
  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    switch(currentStep) {
      case 'welcome':
        handleWelcomeChoice(userInput);
        break;
      
      case 'faq':
        handleFAQSelection(userInput);
        break;
      
      case 'leadCapture':
        handleFormFieldSubmit();
        break;
      
      case 'confirmation':
        handleConfirmationChoice(userInput);
        break;
      
      default:
        handleFreeTextInput(userInput);
    }

    setUserInput('');
  };

  // Handle button clicks
  const handleButtonClick = (buttonText) => {
    setUserInput(buttonText);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Reset chat
  const resetChat = () => {
    setMessages([]);
    setUserInput('');
    setCurrentStep('welcome');
    setFormData({
      name: '',
      email: '',
      phone: '',
      courseName: '',
      question: ''
    });
    setActiveField('name');
  };

  // Show courses when loaded
  useEffect(() => {
    if (currentStep === 'loadingCourses' && !isLoading && courses.length > 0) {
      const courseButtons = courses.slice(0, 8).map(course => course.title);
      addBotMessage("Here are our available courses. Please select one:", courseButtons);
      setCurrentStep('selectCourse');
    }
  }, [courses, isLoading, currentStep]);

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
              <h3 className="font-semibold text-sm sm:text-base">Upskillab Assistant</h3>
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
                <div key={message.id}>
                  {/* Message Bubble */}
                  <div
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

                  {/* Buttons */}
                  {message.sender === 'bot' && message.buttons && message.buttons.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.buttons.map((button, index) => (
                        <button
                          key={index}
                          onClick={() => handleButtonClick(button)}
                          className="bg-[#4D2C5E] text-white text-xs px-3 py-2 rounded-lg hover:bg-[#3a2150] transition-colors whitespace-nowrap"
                        >
                          {button}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-bl-none p-2 sm:p-3 rounded-lg max-w-[70%]">
                    <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading courses...
                    </p>
                  </div>
                </div>
              )}

              {/* Submission Loading */}
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
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          {(currentStep === 'welcome' || currentStep === 'faq' || currentStep === 'selectCourse' || 
            currentStep === 'leadCapture' || currentStep === 'confirmation') && (
            <div className="p-2 sm:p-3 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    currentStep === 'leadCapture' 
                      ? activeField === 'name' ? 'Your name...' 
                        : activeField === 'email' ? 'Your email...' 
                        : 'Your phone number...'
                      : 'Type your message...'
                  }
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7426]"
                  disabled={isSubmitting || isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!userInput.trim() || isSubmitting || isLoading}
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