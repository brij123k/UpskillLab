import React, { useState } from 'react';
import { FiMessageSquare, FiSend, FiSearch, FiPlus, FiChevronDown } from 'react-icons/fi';

const StudentDoubts = () => {
  const [activeTab, setActiveTab] = useState('my-doubts');
  const [newDoubtText, setNewDoubtText] = useState('');
  const [replyTexts, setReplyTexts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDoubt, setExpandedDoubt] = useState(null);

  // Mock data
  const courses = [
    { id: 1, name: "Python Fundamentals" },
    { id: 2, name: "Web Development" },
    { id: 3, name: "Data Science" }
  ];

  const doubts = [
    { 
      id: 1, 
      course: "Python Fundamentals", 
      question: "I'm having trouble understanding how decorators work in Python. Can you explain with a simple example?", 
      date: "2023-06-15", 
      status: "pending",
      replies: [],
      isMine: true
    },
    { 
      id: 2, 
      course: "Data Science", 
      question: "How do I handle missing values in a pandas DataFrame?", 
      date: "2023-06-14", 
      status: "resolved",
      replies: [
        {
          id: 1,
          text: "You can use df.fillna() or df.dropna() methods. I'll share some examples in our next class.",
          date: "2023-06-14",
          from: "teacher"
        },
        {
          id: 2,
          text: "Thank you, that would be helpful!",
          date: "2023-06-14",
          from: "student"
        }
      ],
      isMine: false
    },
    { 
      id: 3, 
      course: "Web Development", 
      question: "What's the difference between React state and props?", 
      date: "2023-06-13", 
      status: "pending",
      replies: [],
      isMine: false
    },
  ];

  const filteredDoubts = doubts.filter(doubt => {
    const matchesSearch = doubt.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doubt.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'my-doubts' && doubt.isMine) ||
                      (activeTab === 'course' && !doubt.isMine);
    return matchesSearch && matchesTab;
  });

  const handleReply = (doubtId) => {
    const replyText = replyTexts[doubtId] || '';
    if (replyText.trim()) {
      // In a real app, this would send to backend
      alert(`Reply sent for doubt ${doubtId}: ${replyText}`);
      setReplyTexts({...replyTexts, [doubtId]: ''});
    }
  };

  const submitNewDoubt = () => {
    if (newDoubtText.trim()) {
      // In a real app, this would send to backend
      alert(`New doubt submitted: ${newDoubtText}`);
      setNewDoubtText('');
    }
  };

  const toggleExpandDoubt = (doubtId) => {
    setExpandedDoubt(expandedDoubt === doubtId ? null : doubtId);
  };

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
          <select className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50">
            {courses.map(course => (
              <option key={course.id} value={course.name}>{course.name}</option>
            ))}
          </select>
          <textarea
            value={newDoubtText}
            onChange={(e) => setNewDoubtText(e.target.value)}
            placeholder="Describe your doubt in detail..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 mb-2"
            rows="3"
          ></textarea>
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
          filteredDoubts.map(doubt => (
            <div key={doubt.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <div 
                className="p-4 border-b cursor-pointer hover:bg-gray-50" 
                onClick={() => toggleExpandDoubt(doubt.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[#4D2C5E]">{doubt.course}</h3>
                    <p className="text-sm text-gray-500">{doubt.date} • {doubt.isMine ? 'Your question' : 'Classmate question'}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      doubt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {doubt.status.charAt(0).toUpperCase() + doubt.status.slice(1)}
                    </span>
                    <FiChevronDown className={`ml-2 transition-transform ${
                      expandedDoubt === doubt.id ? 'rotate-180' : ''
                    }`} />
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-gray-800">{doubt.question}</p>
                </div>
              </div>
              
              {/* Expanded Content */}
              {expandedDoubt === doubt.id && (
                <>
                  {/* Replies */}
                  {doubt.replies.length > 0 && (
                    <div className="bg-gray-50 p-4 border-b">
                      {doubt.replies.map(reply => (
                        <div key={reply.id} className="mb-3 last:mb-0">
                          <div className="flex justify-between items-start mb-1">
                            <span className={`font-medium ${
                              reply.from === 'teacher' ? 'text-[#4D2C5E]' : 'text-[#FF7426]'
                            }`}>
                              {reply.from === 'teacher' ? 'Teacher' : 'You'}
                            </span>
                            <span className="text-xs text-gray-500">{reply.date}</span>
                          </div>
                          <p className="text-gray-700 bg-white p-2 rounded">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Reply Form (only for my doubts or resolved doubts) */}
                  {(doubt.isMine || doubt.status === 'resolved') && (
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <FiMessageSquare className="text-[#4D2C5E] mr-2" />
                        <span className="font-medium">Add a reply</span>
                      </div>
                      <textarea
                        value={replyTexts[doubt.id] || ''}
                        onChange={(e) => setReplyTexts({...replyTexts, [doubt.id]: e.target.value})}
                        placeholder="Type your reply..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 mb-2"
                        rows="2"
                      ></textarea>
                      <button
                        onClick={() => handleReply(doubt.id)}
                        className="ml-auto flex items-center px-4 py-2 bg-[#FF7426] text-white rounded-lg hover:bg-[#E65100]"
                      >
                        <FiSend className="mr-1" />
                        Send Reply
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
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