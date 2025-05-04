import React, { useState } from 'react';
import { FiSearch, FiClock, FiBook, FiVideo, FiFile } from 'react-icons/fi';

const StudentHistory = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const historyItems = [
    { 
      id: 1, 
      title: "Python OOP Concepts", 
      type: "video", 
      course: "Python Fundamentals", 
      date: "2023-06-15 14:30",
      duration: "1h 25m"
    },
    { 
      id: 2, 
      title: "React Hooks Assignment", 
      type: "assignment", 
      course: "Web Development", 
      date: "2023-06-14 10:15",
      status: "Submitted"
    },
    { 
      id: 3, 
      title: "Data Analysis Lecture Notes", 
      type: "material", 
      course: "Data Science", 
      date: "2023-06-12 16:45",
      action: "Downloaded"
    }
  ];

  const filteredHistory = historyItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch(type) {
      case 'video': return <FiVideo className="text-[#4D2C5E] mr-2" />;
      case 'assignment': return <FiFile className="text-[#4D2C5E] mr-2" />;
      case 'material': return <FiBook className="text-[#4D2C5E] mr-2" />;
      default: return <FiClock className="text-[#4D2C5E] mr-2" />;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#4D2C5E] mb-6">My Learning History</h1>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search history..."
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
              All Activity
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'video' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Videos
            </button>
            <button
              onClick={() => setActiveTab('assignment')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'assignment' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Assignments
            </button>
            <button
              onClick={() => setActiveTab('material')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'material' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Materials
            </button>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 font-semibold text-[#4D2C5E] border-b">
          <div className="col-span-5">Activity</div>
          <div className="col-span-3">Course</div>
          <div className="col-span-3">Date & Time</div>
          <div className="col-span-1">Actions</div>
        </div>
        
        {filteredHistory.length > 0 ? (
          filteredHistory.map(item => (
            <div key={item.id} className="grid grid-cols-12 p-4 items-center border-b hover:bg-gray-50">
              <div className="col-span-5 flex items-center">
                {getTypeIcon(item.type)}
                <div>
                  <div className="font-medium">{item.title}</div>
                  {item.duration && (
                    <div className="text-xs text-gray-500">{item.duration}</div>
                  )}
                  {item.status && (
                    <div className="text-xs text-green-600">{item.status}</div>
                  )}
                  {item.action && (
                    <div className="text-xs text-blue-600">{item.action}</div>
                  )}
                </div>
              </div>
              <div className="col-span-3">{item.course}</div>
              <div className="col-span-3">
                <div className="flex items-center text-sm">
                  <FiClock className="mr-1 text-gray-400" />
                  {item.date}
                </div>
              </div>
              <div className="col-span-1 flex justify-end">
                <button className="text-[#4D2C5E] hover:text-[#FF7426] p-1">
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            No history items found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentHistory;