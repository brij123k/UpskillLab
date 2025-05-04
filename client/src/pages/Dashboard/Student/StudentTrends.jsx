import React, { useState } from 'react';
import { FiSearch, FiTrendingUp, FiBookmark } from 'react-icons/fi';

const StudentTrends = () => {
  const [activeTab, setActiveTab] = useState('technologies');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const trends = [
    { 
      id: 1, 
      title: "React 18 Features", 
      category: "technologies", 
      popularity: "High", 
      description: "New features in React 18 including concurrent rendering",
      saved: false
    },
    { 
      id: 2, 
      title: "Python Type Hints", 
      category: "technologies", 
      popularity: "Medium", 
      description: "How type hints are changing Python development",
      saved: true
    },
    { 
      id: 3, 
      title: "Remote Work Trends", 
      category: "career", 
      popularity: "High", 
      description: "Latest trends in remote work and hybrid models",
      saved: false
    }
  ];

  const filteredTrends = trends.filter(trend => {
    const matchesTab = activeTab === 'all' || trend.category === activeTab;
    const matchesSearch = trend.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         trend.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const toggleSaveTrend = (trendId) => {
    // In real app, this would update backend
    alert(`Trend ${trendId} save status toggled`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#4D2C5E] mb-6">Learning Trends</h1>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search trends..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveTab('technologies')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'technologies' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Technologies
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'career' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Career
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'all' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              All Trends
            </button>
          </div>
        </div>
      </div>

      {/* Trends List */}
      <div className="space-y-4">
        {filteredTrends.length > 0 ? (
          filteredTrends.map(trend => (
            <div key={trend.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <FiTrendingUp className="text-[#4D2C5E] mr-2" />
                      <h3 className="font-bold text-[#4D2C5E]">{trend.title}</h3>
                    </div>
                    <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${
                      trend.popularity === 'High' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {trend.popularity} Trend
                    </span>
                  </div>
                  <button 
                    onClick={() => toggleSaveTrend(trend.id)}
                    className={`p-2 rounded-full ${trend.saved ? 'text-[#FF7426]' : 'text-gray-400 hover:text-[#4D2C5E]'}`}
                  >
                    <FiBookmark className={trend.saved ? 'fill-current' : ''} />
                  </button>
                </div>
                
                <p className="mt-2 text-gray-700">{trend.description}</p>
                
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152]">
                    Explore More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 text-center text-gray-500 rounded-lg shadow-sm">
            No trends found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTrends;