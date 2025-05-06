import React, { useEffect, useState } from 'react';
import { FiMessageSquare, FiSend, FiSearch, FiPlus, FiChevronDown, FiPaperclip } from 'react-icons/fi';
import { getDataHandlerWithToken, postDataHandlerWithToken } from '../../../config/services';

const StudentDoubts = () => {
  const [activeTab, setActiveTab] = useState('my-doubts');
  const [newDoubtText, setNewDoubtText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [replyTexts, setReplyTexts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDoubt, setExpandedDoubt] = useState(null);
  const [doubts, setDoubts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [attachments, setAttachments] = useState([]);

  // Fetch doubts and enrolled courses
  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch doubts
      const doubtsResponse = await getDataHandlerWithToken('doubts');
      setDoubts(doubtsResponse.doubts || []);
      
      // Fetch enrolled courses from student profile
      const profileResponse = await getDataHandlerWithToken('studentProfile');
      const enrolledCourses = profileResponse.batch || [];
      setCourses(enrolledCourses.map(batch => ({
        id: batch.course,
        name: batch.courseName || `Course ${batch.course}`
      })));
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Failed to load doubts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };

  const submitNewDoubt = async () => {
    if (!newDoubtText.trim() || !selectedCourse) {
      alert('Please select a course and enter your doubt');
      return;
    }

    try {
      const payload = {
        courseId: selectedCourse,
        question: newDoubtText,
        attachments: [] // You'll need to upload files first and get URLs
      };

      // If there are attachments, upload them first
      if (attachments.length > 0) {
        const uploadPromises = attachments.map(file => {
          return uploadFileHandler('uploadFiles', file, {
            category: 'doubt-attachment',
            doubtId: Date.now().toString() // Temporary ID until doubt is created
          });
        });

        const uploadResponses = await Promise.all(uploadPromises);
        payload.attachments = uploadResponses.map(res => res.files[0]?.fileUrl).filter(Boolean);
      }

      const response = await postDataHandlerWithToken('doubts', payload);
      console.log('Doubt submitted:', response);
      
      // Reset form and refresh doubts
      setNewDoubtText('');
      setSelectedCourse('');
      setAttachments([]);
      fetchData();
      
      toast.success('Doubt submitted successfully!');
    } catch (error) {
      console.error('Error submitting doubt:', error);
      toast.error('Failed to submit doubt');
    }
  };

  const handleReply = async (doubtId) => {
    const replyText = replyTexts[doubtId] || '';
    if (!replyText.trim()) return;

    try {
      // Assuming your API has an endpoint for replies
      const response = await postDataHandlerWithToken(`doubts/${doubtId}/replies`, {
        message: replyText
      });
      
      console.log('Reply sent:', response);
      setReplyTexts({...replyTexts, [doubtId]: ''});
      fetchData(); // Refresh to show new reply
      
      toast.success('Reply sent successfully!');
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply');
    }
  };

  const toggleExpandDoubt = (doubtId) => {
    setExpandedDoubt(expandedDoubt === doubtId ? null : doubtId);
  };

  const filteredDoubts = doubts.filter(doubt => {
    const matchesSearch = doubt.course?.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doubt.question.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isMyDoubt = doubt.student === '67f91cedbbf1221f681698a9'; // Replace with actual student ID check
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'my-doubts' && isMyDoubt) ||
                      (activeTab === 'course' && !isMyDoubt);
    
    return matchesSearch && matchesTab;
  });

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#4D2C5E] mb-6">My Doubts</h1>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search doubts..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveTab('my-doubts')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'my-doubts' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              My Doubts
            </button>
            <button
              onClick={() => setActiveTab('course')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'course' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Course Doubts
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'all' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              All Doubts
            </button>
          </div>
        </div>
      </div>

      {/* New Doubt Form */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mb-6">
        <div className="p-4 border-b">
          <div className="flex items-center mb-2">
            <FiPlus className="text-[#4D2C5E] mr-2" />
            <span className="font-medium">Ask a New Doubt</span>
          </div>
          
          <select 
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
          >
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
          
          <textarea
            value={newDoubtText}
            onChange={(e) => setNewDoubtText(e.target.value)}
            placeholder="Describe your doubt in detail..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 mb-2"
            rows="3"
          ></textarea>
          
          <div className="mb-3">
            <label className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
              <FiPaperclip className="mr-1" />
              <span>Add Attachments</span>
              <input 
                type="file" 
                className="hidden" 
                multiple
                onChange={handleFileChange}
              />
            </label>
            {attachments.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {attachments.map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={submitNewDoubt}
            className="ml-auto flex items-center px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152]"
          >
            <FiSend className="mr-1" />
            Submit Doubt
          </button>
        </div>
      </div>

      {/* Doubts List */}
      <div className="space-y-4">
        {filteredDoubts.length > 0 ? (
          filteredDoubts.map(doubt => {
            const isMyDoubt = doubt.student === '67f91cedbbf1221f681698a9'; // Replace with actual check
            const status = doubt.messages?.length > 0 ? 'resolved' : 'pending';
            
            return (
              <div key={doubt._id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div 
                  className="p-4 border-b cursor-pointer hover:bg-gray-50" 
                  onClick={() => toggleExpandDoubt(doubt._id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-[#4D2C5E]">{doubt.course?.courseName || 'No course'}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(doubt.createdAt || Date.now()).toLocaleDateString()} • 
                        {isMyDoubt ? ' Your question' : ' Classmate question'}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                      <FiChevronDown className={`ml-2 transition-transform ${
                        expandedDoubt === doubt._id ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-gray-800">{doubt.question}</p>
                  </div>
                </div>
                
                {/* Expanded Content */}
                {expandedDoubt === doubt._id && (
                  <>
                    {/* Replies/Messages */}
                    {(doubt.messages?.length > 0) && (
                      <div className="bg-gray-50 p-4 border-b">
                        {doubt.messages.map((message, index) => (
                          <div key={index} className="mb-3 last:mb-0">
                            <div className="flex justify-between items-start mb-1">
                              <span className={`font-medium ${
                                message.user?._id !== doubt.student ? 'text-[#4D2C5E]' : 'text-[#FF7426]'
                              }`}>
                                {message.user?._id !== doubt.student ? 
                                  (message.user?.name || 'Teacher') : 
                                  (message.user?.fullName || 'You')}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(message.createdAt || Date.now()).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 bg-white p-2 rounded">{message.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Reply Form */}
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <FiMessageSquare className="text-[#4D2C5E] mr-2" />
                        <span className="font-medium">Add a reply</span>
                      </div>
                      <textarea
                        value={replyTexts[doubt._id] || ''}
                        onChange={(e) => setReplyTexts({...replyTexts, [doubt._id]: e.target.value})}
                        placeholder="Type your reply..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 mb-2"
                        rows="2"
                      ></textarea>
                      <button
                        onClick={() => handleReply(doubt._id)}
                        className="ml-auto flex items-center px-4 py-2 bg-[#FF7426] text-white rounded-lg hover:bg-[#E65100]"
                      >
                        <FiSend className="mr-1" />
                        Send Reply
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white p-8 text-center text-gray-500 rounded-lg shadow-sm">
            No doubts found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDoubts;