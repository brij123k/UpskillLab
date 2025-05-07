import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiCheck, FiSend, FiSearch, FiUser, FiClock, FiPaperclip } from 'react-icons/fi';
import { getDataHandlerWithToken, postDataHandlerWithToken } from '../../../config/services';
import { toast } from 'react-toastify';
import ApiConfig from '../../../config/apiConfig';

const TeacherDoubtHandling = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [doubts, setDoubts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [currentDoubtId, setCurrentDoubtId] = useState(null);
  const [attachments, setAttachments] = useState([]);

  const fetchDoubts = async () => {
    try {
      setIsLoading(true);
      const response = await getDataHandlerWithToken('doubts');
      // Sort doubts by creation date (newest first)
      const sortedDoubts = (response.doubts || []).sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setDoubts(sortedDoubts);
    } catch (error) {
      console.error('Error fetching doubts:', error);
      toast.error("Failed to load doubts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoubts();
  }, []);

  const handleFileChange = (e) => {
    setAttachments(Array.from(e.target.files));
  };

  const handleReplySubmit = async (doubtId) => {
    if (!replyText.trim()) {
      toast.warning("Please enter a reply");
      return;
    }

    try {
      const data = {
        message: replyText,
        attachments: attachments.map(file => file.name) // In real app, upload files first
      };

      const endpoint = ApiConfig.doubtsResponse(doubtId);
      await postDataHandlerWithToken(endpoint, data, true);
      
      toast.success("Reply submitted successfully");
      setReplyText('');
      setCurrentDoubtId(null);
      setAttachments([]);
      fetchDoubts();
    } catch (error) {
      console.error('Error submitting reply:', error);
      toast.error("Failed to submit reply");
    }
  };

  const filteredDoubts = doubts.filter(doubt => {
    const matchesSearch = doubt.student?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doubt.course?.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doubt.question.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Determine status based on messages array length
    const status = doubt.messages?.length > 0 ? 'resolved' : 'pending';
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'pending' && status === 'pending') ||
                      (activeTab === 'resolved' && status === 'resolved');
    
    return matchesSearch && matchesTab;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">Doubt Resolution</h1>
          <p className="text-gray-600">Help students with their questions</p>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-64">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search doubts..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {['all', 'pending', 'resolved'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
              activeTab === tab 
                ? 'bg-[#4D2C5E] text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab === 'pending' ? 'Pending' : 
             tab === 'resolved' ? 'Resolved' : 'All Doubts'}
          </button>
        ))}
      </div>

      {/* Doubts List */}
      <div className="space-y-4">
        {filteredDoubts.length > 0 ? (
          filteredDoubts.map(doubt => {
            // Determine status based on messages array length
            const status = doubt.messages?.length > 0 ? 'resolved' : 'pending';
            const isExpanded = currentDoubtId === doubt._id;
            const latestMessage = doubt.messages?.[0];

            return (
              <div key={doubt._id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all">
                {/* Doubt Header */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></span>
                        <h3 className="text-lg font-semibold text-[#4D2C5E]">
                          {doubt.student?.name || 'Unknown Student'}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {doubt.course?.courseName || 'No course'} 
                        {/* {new Date(doubt.createdAt).toLocaleDateString()} */}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-700">{doubt.question}</p>
                  </div>

                  {/* Attachments */}
                  {doubt.attachments?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-500 mb-2">STUDENT ATTACHMENTS</h4>
                      <div className="flex flex-wrap gap-2">
                        {doubt.attachments.map((file, index) => (
                          <a 
                            key={index} 
                            href={file} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center"
                          >
                            <FiPaperclip className="mr-1.5" />
                            <span>Attachment {index + 1}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Teacher Reply Section */}
                {status === 'resolved' ? (
                  <div className="border-t p-5 bg-gray-50">
                    <div className="flex items-center mb-3">
                      <div className="bg-[#4D2C5E] p-2 rounded-full text-white mr-3">
                        <FiUser className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#4D2C5E]">Your Response</h4>
                        {/* <p className="text-xs text-gray-500">
                          {new Date(latestMessage.createdAt).toLocaleString()}
                        </p> */}
                      </div>
                    </div>
                    <div className="pl-11">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <p className="text-gray-700">{latestMessage.message}</p>
                      </div>
                    </div>
                  </div>
                ) : isExpanded ? (
                  <div className="border-t p-5">
                    <h4 className="flex items-center text-sm font-medium text-gray-700 mb-3">
                      <FiMessageSquare className="mr-2 text-[#4D2C5E]" />
                      Your Response
                    </h4>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 mb-3"
                      rows="3"
                    ></textarea>
                    
                    <div className="mb-3">
                      <label className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                        <FiPaperclip className="mr-2" />
                        <span>Add Attachments</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                      {attachments.length > 0 && (
                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                          {attachments.map((file, index) => (
                            <div key={index} className="flex items-center">
                              <FiPaperclip className="mr-1 text-xs" />
                              <span className="truncate max-w-xs">{file.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleReplySubmit(doubt._id)}
                        className="flex items-center px-4 py-2 bg-[#FF7426] text-white rounded-lg hover:bg-[#E65100] transition shadow-md"
                      >
                        <FiSend className="mr-1" />
                        Submit Response
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t p-5 text-center">
                    <button
                      onClick={() => setCurrentDoubtId(doubt._id)}
                      className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152] transition shadow-md"
                    >
                      Respond to This Doubt
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white p-8 text-center rounded-xl shadow-md border border-gray-200">
            <FiMessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No doubts found</h3>
            <p className="text-gray-500">
              {searchQuery ? 'Try a different search term' : 'No doubts match your current filters'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDoubtHandling;