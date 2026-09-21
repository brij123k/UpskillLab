import React, { useEffect, useState } from 'react';
import { 
  FiSearch, 
  FiTrendingUp, 
  FiBookmark, 
  FiExternalLink, 
  FiDownload,
  FiMessageSquare,
  FiUser,
  FiClock,
  FiCheckCircle,
  FiX
} from 'react-icons/fi';
import { getDataHandlerWithToken } from '../../../config/services';
import BlogContentRenderer from '../../../components/BlogContentRenderer';

const StudentTrends = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [trends, setTrends] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const handleTrends = async () => {
    try {
      setLoading(true);
      const [trendsRes, suggestionsRes] = await Promise.all([
        getDataHandlerWithToken('trends'),
        getDataHandlerWithToken('teacherSugegstions')
      ]);
      setTrends(trendsRes.resources || []);
      setSuggestions(suggestionsRes.suggestions || []);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const filteredSuggestions = suggestions.filter(suggestion => {
    return suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           suggestion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           suggestion.content.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const toggleSaveTrend = (trendId) => {
    // In real app, this would update backend
    alert(`Trend ${trendId} save status toggled`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openResourceModal = (resource) => {
    setSelectedResource(resource);
  };

  const openSuggestionModal = (suggestion) => {
    setSelectedSuggestion(suggestion);
  };

  const closeModal = () => {
    setSelectedResource(null);
    setSelectedSuggestion(null);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Resource View Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-[#0006] bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#4D2C5E]">{selectedResource.title}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {selectedResource.image && (
                <img 
                  src={selectedResource.image} 
                  alt={selectedResource.title} 
                  className="w-full h-64 object-cover rounded-lg mb-6"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                  }}
                />
              )}
              
              <div className="flex flex-wrap gap-4 mb-6">
                {selectedResource.courseId?.courseName && (
                  <span className="px-3 py-1 bg-[#4D2C5E]/10 text-[#4D2C5E] text-sm font-medium rounded-full">
                    {selectedResource.courseId.courseName}
                  </span>
                )}
                {selectedResource.tags && selectedResource.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="prose max-w-none">
                {selectedResource.description ? (
                  <BlogContentRenderer content={selectedResource.description} />
                ) : (
                  <p className="text-gray-600">{selectedResource.description}</p>
                )}
              </div>
              
              <div className="mt-8 pt-6 border-t flex flex-wrap gap-4">
                {selectedResource.link && (
                  <a 
                    href={selectedResource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-[#4D2C5E] text-white rounded-lg font-medium hover:bg-[#4D2C5E]/90 transition-colors"
                  >
                    <FiExternalLink className="mr-2" /> Visit Resource
                  </a>
                )}
                {selectedResource.pdf && (
                  <a 
                    href={selectedResource.pdf} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-[#FF7426] text-white rounded-lg font-medium hover:bg-[#FF7426]/90 transition-colors"
                  >
                    <FiDownload className="mr-2" /> Download PDF
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Suggestion View Modal */}
      {selectedSuggestion && (
        <div className="fixed inset-0 bg-[#0006] bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#4D2C5E]">{selectedSuggestion.title}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#4D2C5E]/10 flex items-center justify-center text-[#4D2C5E]">
                  <FiUser className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">{selectedSuggestion.teacherName}</p>
                  <p className="text-sm text-gray-500">{formatDate(selectedSuggestion.createdAt)}</p>
                </div>
                {selectedSuggestion.isApproved && (
                  <span className="ml-auto flex items-center text-green-600 text-sm">
                    <FiCheckCircle className="mr-1" /> Approved
                  </span>
                )}
              </div>
              
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {selectedSuggestion.type}
                </span>
              </div>
              
              <div className="prose max-w-none">
                {selectedSuggestion.content ? (
                  <BlogContentRenderer content={selectedSuggestion.content} />
                ) : (
                  <p className="text-gray-600">{selectedSuggestion.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#4D2C5E]">
            {activeTab === 'suggestions' ? 'Teacher Suggestions' : 'Market Trends'}
          </h1>
          <p className="text-gray-600 mt-1">
            {activeTab === 'suggestions' 
              ? 'Personalized recommendations from your teachers' 
              : 'Discover trending materials to boost your skills'}
          </p>
        </div>
        
        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder={
              activeTab === 'suggestions' 
                ? 'Search suggestions...' 
                : 'Search resources...'
            }
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'all' ? 'bg-[#4D2C5E] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Resources
          </button>
          <button
            onClick={() => setActiveTab('career')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'career' ? 'bg-[#4D2C5E] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            General Resources
          </button>
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'suggestions' ? 'bg-[#4D2C5E] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Teacher Suggestions
          </button>
        </div>
      </div>

      {/* Content */}
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
      ) : activeTab === 'suggestions' ? (
        filteredSuggestions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuggestions.map(suggestion => (
              <div key={suggestion._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-2">
                        {suggestion.type}
                      </span>
                      <h3 className="font-bold text-lg text-[#4D2C5E] line-clamp-2">{suggestion.title}</h3>
                    </div>
                    {suggestion.isApproved && (
                      <span className="flex items-center text-green-600 text-sm">
                        <FiCheckCircle className="mr-1" /> Approved
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{suggestion.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <FiUser className="text-[#4D2C5E]" />
                    <span>{suggestion.teacherName}</span>
                    <FiClock className="ml-2 text-[#4D2C5E]" />
                    <span>{formatDate(suggestion.createdAt)}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => openSuggestionModal(suggestion)}
                      className="flex items-center px-3 py-2 bg-[#4D2C5E] text-white rounded-lg text-sm font-medium hover:bg-[#4D2C5E]/90 transition-colors"
                    >
                      <FiMessageSquare className="mr-1" /> View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={<FiMessageSquare />}
            title="No suggestions found"
            message={
              searchQuery 
                ? "No suggestions match your search criteria"
                : "Your teachers haven't made any suggestions yet"
            }
          />
        )
      ) : filteredTrends.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrends.map(trend => (
            <TrendCard 
              key={trend._id} 
              trend={trend} 
              formatDate={formatDate}
              toggleSaveTrend={toggleSaveTrend}
              openResourceModal={openResourceModal}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={<FiTrendingUp />}
          title="No resources found"
          message={
            searchQuery 
              ? "No resources match your search criteria"
              : "There are currently no resources available in this category"
          }
        />
      )}
    </div>
  );
};

// Trend Card Component
const TrendCard = ({ trend, formatDate, toggleSaveTrend, openResourceModal }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
    {trend.image && (
      <div className="h-48 overflow-hidden cursor-pointer" onClick={() => openResourceModal(trend)}>
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
          <h3 
            className="font-bold text-lg text-[#4D2C5E] line-clamp-2 cursor-pointer hover:underline"
            onClick={() => openResourceModal(trend)}
          >
            {trend.title}
          </h3>
        </div>
        <button 
          onClick={() => toggleSaveTrend(trend._id)}
          className={`p-2 rounded-full hover:bg-gray-100 ${trend.saved ? 'text-[#FF7426]' : 'text-gray-400 hover:text-[#4D2C5E]'}`}
        >
          <FiBookmark className={trend.saved ? 'fill-current' : ''} />
        </button>
      </div>
      
      <p 
        className="text-gray-600 text-sm line-clamp-3 mb-4 cursor-pointer hover:text-gray-800"
        onClick={() => openResourceModal(trend)}
      >
      {(() => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = trend.description;
    return tempDiv.textContent || tempDiv.innerText || '';
  })()}
      </p>
      
      {trend.tags && trend.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {trend.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full cursor-pointer hover:bg-gray-200"
              onClick={() => openResourceModal(trend)}
            >
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
        <button
          onClick={() => openResourceModal(trend)}
          className="flex items-center px-3 py-2 bg-[#4D2C5E] text-white rounded-lg text-sm font-medium hover:bg-[#4D2C5E]/90 transition-colors"
        >
          <FiMessageSquare className="mr-1" /> View Content
        </button>
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
);

// Empty State Component
const EmptyState = ({ icon: Icon, title, message }) => (
  <div className="bg-white p-12 text-center rounded-xl shadow-sm">
    <div className="max-w-md mx-auto">
      <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
        {typeof Icon === 'function' ? <Icon className="w-8 h-8" /> : Icon}
      </div>
      <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{message}</p>
    </div>
  </div>
);

export default StudentTrends;