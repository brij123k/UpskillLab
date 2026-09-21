import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiCheck, FiSend, FiSearch, FiUser, FiClock, FiPaperclip, FiX, FiImage, FiFile } from 'react-icons/fi';
import { getDataHandlerWithToken, postDataHandlerWithToken, uploadFileHandler } from '../../../config/services';
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
  const [fileUploadProgress, setFileUploadProgress] = useState({});
  const [uploadingFiles, setUploadingFiles] = useState(false);

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

  // handleclick()
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + attachments.length > 5) {
      toast.error("You can upload up to 5 files");
      return;
    }
    
    const newAttachments = files.map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'document'
    }));
    
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    if (newAttachments[index].preview) {
      URL.revokeObjectURL(newAttachments[index].preview);
    }
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const uploadFiles = async () => {
    if (attachments.length === 0) return [];
    
    setUploadingFiles(true);
    const uploadedFiles = [];
    
    try {
      for (let i = 0; i < attachments.length; i++) {
        const attachment = attachments[i];
        setFileUploadProgress(prev => ({ ...prev, [i]: 0 }));
        
        const response = await uploadFileHandler('uploadFiles',attachment.file,  {
            category: 'doubt-response',
            doubtId: currentDoubtId
          },
          (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setFileUploadProgress(prev => ({ ...prev, [i]: progress }));
          }
        );
        
        if (response.files && response.files[0]) {
          uploadedFiles.push({
            url: response.files[0].fileUrl,
            name: attachment.name,
            type: attachment.type
          });
        }
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    } finally {
      setUploadingFiles(false);
      setFileUploadProgress({});
    }
    
    return uploadedFiles;
  };

  const handleReplySubmit = async (doubtId) => {
    if (!replyText.trim()) {
      toast.warning("Please enter a reply");
      return;
    }

    try {
      let uploadedAttachments = [];
      if (attachments.length > 0) {
              const uploadPromises = attachments.map(file => 
                uploadFileHandler('uploadFiles', file.file, {
                  category: 'doubt-attachment',
                  doubtId: Date.now().toString()
                })
              );

            uploadedAttachments = await Promise.all(uploadPromises);
      }
      const data = {
        message: replyText,
        attachments: uploadedAttachments.map(res => res.files[0]?.fileUrl).filter(Boolean)
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
                          {doubt.student?.fullName || 'Unknown Student'}
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

                  {/* Student Attachments */}
                  {doubt.attachments?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-500 mb-2">STUDENT ATTACHMENTS</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {doubt.attachments.map((file, index) => (
                          <a 
                            key={index} 
                            href={file} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative block border rounded-lg overflow-hidden hover:shadow-md transition"
                          >
                            {file.type === 'image' ? (
                              <div className="aspect-square bg-gray-100">
                                <img 
                                  src={file} 
                                  alt={`Attachment ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="p-4 bg-gray-50 flex flex-col items-center justify-center h-full">
                                <FiFile className="h-8 w-8 text-gray-400 mb-2" />
                                <span className="text-xs text-gray-700 text-center truncate w-full px-2">
                                  {file.name || `Document ${index + 1}`}
                                </span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                              <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                                {file.type === 'image' ? 'View Image' : 'Download'}
                              </span>
                            </div>
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
                      {/* Teacher Attachments */}
                      {latestMessage.attachments?.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-xs font-medium text-gray-500 mb-2">YOUR ATTACHMENTS</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {latestMessage.attachments.map((file, index) => (
                              <a 
                                key={index} 
                                href={file} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group relative block border rounded-lg overflow-hidden hover:shadow-md transition"
                              >
                                {file.type === 'image' ? (
                                  <div className="aspect-square bg-gray-100">
                                    <img 
                                      src={file} 
                                      alt={`Attachment ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="p-4 bg-gray-50 flex flex-col items-center justify-center h-full">
                                    <FiFile className="h-8 w-8 text-gray-400 mb-2" />
                                    <span className="text-xs text-gray-700 text-center truncate w-full px-2">
                                      {file.name || `Document ${index + 1}`}
                                    </span>
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                  <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                                    {file.type === 'image' ? 'View Image' : 'Download'}
                                  </span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
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
                        <span>Add Attachments (Max 5)</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          multiple
                          onChange={handleFileChange}
                          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                        />
                      </label>
                      
                      {/* Attachment Previews */}
                      {attachments.length > 0 && (
                        <div className="mt-4 space-y-3">
                          <h4 className="text-sm font-medium text-gray-700">Attachments ({attachments.length}/5)</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {attachments.map((attachment, index) => (
                              <div key={index} className="border rounded-lg p-2 flex items-start">
                                <div className="flex-shrink-0 mr-3">
                                  {attachment.preview ? (
                                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                                      <img 
                                        src={attachment.preview} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                                      {attachment.type === 'image' ? (
                                        <FiImage className="text-gray-400 text-xl" />
                                      ) : (
                                        <FiFile className="text-gray-400 text-xl" />
                                      )}
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-800 truncate">{attachment.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {attachment.type === 'image' ? 'Image' : 'Document'} • 
                                    {(attachment.file.size / 1024).toFixed(1)} KB
                                  </p>
                                  {fileUploadProgress[index] !== undefined && (
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                      <div 
                                        className="bg-[#4D2C5E] h-1.5 rounded-full" 
                                        style={{ width: `${fileUploadProgress[index]}%` }}
                                      ></div>
                                    </div>
                                  )}
                                </div>
                                <button
                                  onClick={() => removeAttachment(index)}
                                  className="text-gray-400 hover:text-gray-600 p-1"
                                >
                                  <FiX />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleReplySubmit(doubt._id)}
                        disabled={uploadingFiles}
                        className="flex items-center px-4 py-2 bg-[#FF7426] text-white rounded-lg hover:bg-[#E65100] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {uploadingFiles ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <FiSend className="mr-1" />
                            Submit Response
                          </>
                        )}
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
