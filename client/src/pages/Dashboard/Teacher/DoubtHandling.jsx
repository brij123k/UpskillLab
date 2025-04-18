import React, { useState } from 'react';
import { FiMessageSquare, FiCheck, FiX, FiSend, FiSearch } from 'react-icons/fi';

const DoubtHandling = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const doubts = [
    { 
      id: 1, 
      student: "Rahul Sharma", 
      course: "Python Fundamentals", 
      question: "I'm having trouble understanding how decorators work in Python. Can you explain with a simple example?", 
      date: "2023-06-15", 
      status: "pending",
      replies: []
    },
    { 
      id: 2, 
      student: "Priya Patel", 
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
        }
      ]
    },
    { 
      id: 3, 
      student: "Amit Singh", 
      course: "Web Development", 
      question: "What's the difference between React state and props?", 
      date: "2023-06-13", 
      status: "pending",
      replies: []
    },
  ];

  const filteredDoubts = doubts.filter(doubt => {
    const matchesSearch = doubt.student.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doubt.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doubt.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || doubt.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleReply = (doubtId) => {
    if (replyText.trim()) {
      // In a real app, this would send to backend
      alert(`Reply sent for doubt ${doubtId}: ${replyText}`);
      setReplyText('');
    }
  };

  const markAsResolved = (doubtId) => {
    // In a real app, this would update the backend
    alert(`Marked doubt ${doubtId} as resolved`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#4D2C5E] mb-6">Doubt Handling</h1>
      
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
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'all' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              All Doubts
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'pending' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab('resolved')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'resolved' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Resolved
            </button>
          </div>
        </div>
      </div>

      {/* Doubts List */}
      <div className="space-y-4">
        {filteredDoubts.length > 0 ? (
          filteredDoubts.map(doubt => (
            <div key={doubt.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[#4D2C5E]">{doubt.student}</h3>
                    <p className="text-sm text-gray-500">{doubt.course} • {doubt.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    doubt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {doubt.status.charAt(0).toUpperCase() + doubt.status.slice(1)}
                  </span>
                </div>
                
                <div className="mt-3">
                  <p className="text-gray-800">{doubt.question}</p>
                </div>
              </div>
              
              {/* Replies */}
              {doubt.replies.length > 0 && (
                <div className="bg-gray-50 p-4 border-b">
                  {doubt.replies.map(reply => (
                    <div key={reply.id} className="mb-3 last:mb-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-[#4D2C5E]">You</span>
                        <span className="text-xs text-gray-500">{reply.date}</span>
                      </div>
                      <p className="text-gray-700 bg-white p-2 rounded">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Reply Form */}
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <FiMessageSquare className="text-[#4D2C5E] mr-2" />
                  <span className="font-medium">Reply to this doubt</span>
                </div>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 mb-2"
                  rows="3"
                ></textarea>
                <div className="flex justify-between">
                  {doubt.status === 'pending' && (
                    <button
                      onClick={() => markAsResolved(doubt.id)}
                      className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
                    >
                      <FiCheck className="mr-1" />
                      Mark as Resolved
                    </button>
                  )}
                  <button
                    onClick={() => handleReply(doubt.id)}
                    className="ml-auto flex items-center px-4 py-2 bg-[#FF7426] text-white rounded-lg hover:bg-[#E65100]"
                  >
                    <FiSend className="mr-1" />
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 text-center text-gray-500 rounded-lg shadow-sm">
            No doubts found
          </div>
        )}
      </div>
    </div>
  );
};

export default DoubtHandling;