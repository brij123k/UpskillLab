import React, { useState } from 'react';
import { FiSend, FiMessageSquare, FiUser, FiClock, FiTrash2 } from 'react-icons/fi';

const TeacherSuggestions = () => {
  const [newSuggestion, setNewSuggestion] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const suggestions = [
    { 
      id: 1, 
      text: "Complete the exercises in Chapter 3 before our next class", 
      date: "2023-06-10", 
      status: "sent",
      students: ["All Students"],
      type: "general"
    },
    { 
      id: 2, 
      text: "Watch the recorded lecture on OOP concepts before attempting the assignment", 
      date: "2023-06-05", 
      status: "read",
      students: ["Python Course Students"],
      type: "course"
    },
    { 
      id: 3, 
      text: "John, please review the feedback on your last submission", 
      date: "2023-06-01", 
      status: "unread",
      students: ["John Doe"],
      type: "individual"
    },
  ];

  const filteredSuggestions = suggestions.filter(suggestion => {
    const matchesSearch = suggestion.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || suggestion.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleSendSuggestion = () => {
    if (newSuggestion.trim()) {
      // In a real app, this would send to backend
      alert(`Suggestion sent: ${newSuggestion}`);
      setNewSuggestion('');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#4D2C5E] mb-6">Student Suggestions</h1>
      
      {/* New Suggestion Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-[#4D2C5E] mb-4 flex items-center">
          <FiSend className="mr-2" />
          Send New Suggestion
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Suggestion Text</label>
            <textarea
              value={newSuggestion}
              onChange={(e) => setNewSuggestion(e.target.value)}
              placeholder="Write your suggestion for students..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50"
              rows="4"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Send To</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50">
                <option>All Students</option>
                <option>Python Course Students</option>
                <option>Web Development Students</option>
                <option>Select Individual Students</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50">
                <option>Normal</option>
                <option>Important</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSendSuggestion}
              className="px-4 py-2 bg-[#FF7426] text-white rounded-lg hover:bg-[#E65100] flex items-center"
            >
              <FiSend className="mr-2" />
              Send Suggestion
            </button>
          </div>
        </div>
      </div>
      
      {/* Suggestions List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search suggestions..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg ${activeTab === 'all' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`px-3 py-1 rounded-lg ${activeTab === 'general' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('course')}
              className={`px-3 py-1 rounded-lg ${activeTab === 'course' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Course
            </button>
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-3 py-1 rounded-lg ${activeTab === 'individual' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Individual
            </button>
          </div>
        </div>
        
        {/* Suggestions */}
        {filteredSuggestions.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredSuggestions.map(suggestion => (
              <div key={suggestion.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <p className="text-gray-800">{suggestion.text}</p>
                    
                    <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
                      <div className="flex items-center">
                        <FiUser className="mr-1" />
                        <span>{suggestion.students.join(", ")}</span>
                      </div>
                      <div className="flex items-center">
                        <FiClock className="mr-1" />
                        <span>{suggestion.date}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        suggestion.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                        suggestion.status === 'read' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {suggestion.status.charAt(0).toUpperCase() + suggestion.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <button className="text-red-500 hover:text-red-700 ml-4">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No suggestions found
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherSuggestions;