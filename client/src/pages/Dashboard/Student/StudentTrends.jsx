import React, { useEffect, useState } from 'react';
import { FiSearch, FiTrendingUp, FiBookmark, FiExternalLink, FiDownload } from 'react-icons/fi';
import { getDataHandlerWithToken } from '../../../config/services';

const StudentTrends = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handleTrends = async () => {
    try {
      setLoading(true);
      const response = await getDataHandlerWithToken('trends');
      setTrends(response.resources || []);
    } catch (error) {
      console.error('Error fetching trends:', error);
    } finally {
      setLoading(false);
    }
  }; 

  useEffect(() => {
    handleTrends();
  }, []);

  const filteredTrends = trends.filter(trend => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'technologies' && trend.courseId?.courseName) || 
                      (activeTab === 'career' && !trend.courseId?.courseName);
    const matchesSearch = trend.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         trend.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (trend.tags && trend.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesTab && matchesSearch;
  });

  const toggleSaveTrend = (trendId) => {
    // In real app, this would update backend
    alert(`Trend ${trendId} save status toggled`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#4D2C5E]">Market Trends</h1>
          <p className="text-gray-600 mt-1">Discover trending materials to boost your skills</p>
        </div>
        
        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'all' ? 'bg-[#4D2C5E] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            All Resources
          </button>
          {/* <button
            onClick={() => setActiveTab('technologies')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'technologies' ? 'bg-[#4D2C5E] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Course Materials
          </button> */}
          <button
            onClick={() => setActiveTab('career')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'career' ? 'bg-[#4D2C5E] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            General Resources
          </button>
        </div>
      </div>

      {/* Trends List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredTrends.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrends.map(trend => (
            <div key={trend._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              {trend.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={trend.image} 
                    alt={trend.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                    }}
                  />
                </div>
              )}
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    {trend.courseId?.courseName && (
                      <span className="inline-block px-2 py-1 bg-[#4D2C5E]/10 text-[#4D2C5E] text-xs font-medium rounded-full mb-2">
                        {trend.courseId.courseName}
                      </span>
                    )}
                    <h3 className="font-bold text-lg text-[#4D2C5E] line-clamp-2">{trend.title}</h3>
                  </div>
                  <button 
                    onClick={() => toggleSaveTrend(trend._id)}
                    className={`p-2 rounded-full hover:bg-gray-100 ${trend.saved ? 'text-[#FF7426]' : 'text-gray-400 hover:text-[#4D2C5E]'}`}
                  >
                    <FiBookmark className={trend.saved ? 'fill-current' : ''} />
                  </button>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{trend.description}</p>
                
                {trend.tags && trend.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trend.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Added {formatDate(trend.createdAt)}</span>
                  {trend.isApproved && (
                    <span className="flex items-center text-green-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                      Approved
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {trend.link && (
                    <a 
                      href={trend.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-2 bg-[#4D2C5E]/10 text-[#4D2C5E] rounded-lg text-sm font-medium hover:bg-[#4D2C5E]/20 transition-colors"
                    >
                      <FiExternalLink className="mr-1" /> Visit Link
                    </a>
                  )}
                  {trend.pdf && (
                    <a 
                      href={trend.pdf} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-2 bg-[#FF7426]/10 text-[#FF7426] rounded-lg text-sm font-medium hover:bg-[#FF7426]/20 transition-colors"
                    >
                      <FiDownload className="mr-1" /> Download PDF
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-xl shadow-sm">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No resources found</h3>
            <p className="mt-2 text-gray-600">
              {searchQuery 
                ? "No resources match your search criteria. Try different keywords."
                : "There are currently no resources available in this category."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTrends;