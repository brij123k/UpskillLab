import React, { useEffect, useState } from 'react';
import { 
  FiMessageSquare, FiSearch, FiPlus, FiPaperclip, FiUser, 
  FiCheckCircle, FiClock, FiChevronDown, FiX, FiImage, FiFile 
} from 'react-icons/fi';
import { getDataHandlerWithToken, postDataHandlerWithToken, uploadFileHandler } from '../../../config/services';
import ApiConfig from '../../../config/apiConfig';
import { toast } from 'react-toastify';

const StudentDoubts = () => {
  const [activeTab, setActiveTab] = useState('pending'); // Changed default to 'pending'
  const [newDoubtText, setNewDoubtText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDoubt, setExpandedDoubt] = useState(null);
  const [doubts, setDoubts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [fileUploadProgress, setFileUploadProgress] = useState({});
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [userId, setUserId]=useState()
  // Fetch data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const doubtsResponse = await getDataHandlerWithToken('doubts');
      const student = await getDataHandlerWithToken('profile')
      setUserId(student._id)
      // Sort doubts by creation date (newest first)
      const sortedDoubts = (doubtsResponse.doubts || []).sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setDoubts(sortedDoubts);
      
      const profileResponse = await getDataHandlerWithToken('studentProfile');
      const enrolledCourseIds = profileResponse.batch?.map(batch => batch.course) || [];
      if (enrolledCourseIds.length > 0) {
        const coursePromises = enrolledCourseIds.map(courseId => {
          const endpoint = ApiConfig.courseDisplaybyId(courseId)
          return getDataHandlerWithToken(endpoint, null, null, true)
        });
        const courseResponses = await Promise.all(coursePromises);
        const validCourses = courseResponses
          .map(response => ({
            id: response._id,
            name: response.courseName || `Course ${response.course._id}`
          }));
        
        setCourses(validCourses);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Failed to load doubts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

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

  const submitNewDoubt = async () => {
    if (!newDoubtText.trim() || !selectedCourse) {
      alert('Please select a course and enter your doubt');
      return;
    }

    try {
      const payload = {
        courseId: selectedCourse,
        question: newDoubtText,
        attachments: []
      };

      if (attachments.length > 0) {
        const uploadPromises = attachments.map(file => 
          uploadFileHandler('uploadFiles', file.file, {
            category: 'doubt-attachment',
            doubtId: Date.now().toString()
          })
        );
        const uploadResponses = await Promise.all(uploadPromises);
        payload.attachments = uploadResponses.map(res => res.files[0]?.fileUrl).filter(Boolean)
      }

      await postDataHandlerWithToken('doubts', payload);
      setNewDoubtText('');
      setSelectedCourse('');
      setAttachments([]);
      setIsFormExpanded(false);
      fetchData();
      toast.success('Doubt submitted successfully!');
    } catch (error) {
      console.error('Error submitting doubt:', error);
      toast.error('Failed to submit doubt');
    }
  };

  const filteredDoubts = doubts.filter(doubt => {
    const matchesSearch = doubt.course?.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doubt.question.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isMyDoubt = doubt.student._id === '67f91cedbbf1221f681698a9';
    console.log(isMyDoubt)
    const hasTeacherReply = doubt.messages?.some(msg => msg.user?._id !== doubt.student);
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'pending' && !hasTeacherReply) ||
                      (activeTab === 'resolved' && hasTeacherReply);
    
    return matchesSearch && matchesTab && isMyDoubt; // Only show current student's doubts
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">Student Doubts</h1>
          <p className="text-gray-600">Get answers from your instructors</p>
        </div>
        
        {/* Search and New Doubt Button */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-56">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search doubts..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button
            onClick={() => setIsFormExpanded(!isFormExpanded)}
            className="flex items-center justify-center px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152] transition shadow-md"
          >
            <FiPlus className="mr-1" />
            {isFormExpanded ? 'Cancel' : 'New Doubt'}
          </button>
        </div>
      </div>

      {/* Tabs - Changed to pending/resolved/all */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {['pending', 'resolved', 'all'].map((tab) => (
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

      {/* New Doubt Form */}
      {isFormExpanded && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#4D2C5E] mb-4">Ask New Doubt</h2>
          
          <select 
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
          
          <textarea
            value={newDoubtText}
            onChange={(e) => setNewDoubtText(e.target.value)}
            placeholder="Describe your doubt in detail..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 mb-4"
            rows="5"
          ></textarea>
          
          <div className="mb-4">
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
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setIsFormExpanded(false);
                setAttachments([]);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={submitNewDoubt}
              disabled={uploadingFiles}
              className="px-6 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadingFiles ? 'Uploading...' : 'Submit Doubt'}
            </button>
          </div>
        </div>
      )}

      {/* Doubts List */}
      <div className="space-y-4">
        {filteredDoubts.length > 0 ? (
          filteredDoubts.map(doubt => {
            const isMyDoubt = doubt.student._id === userId;
            {isMyDoubt,doubt.student,userId}
            const hasTeacherReply = doubt.messages?.some(msg => msg.user?._id !== doubt.student);
            const isExpanded = expandedDoubt === doubt._id;
            const teacherReply = doubt.messages?.find(msg => msg.user?._id !== doubt.student);
            
            return (
              <div key={doubt._id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all">
                {/* Doubt Header */}
                <div 
                  className="p-5 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => setExpandedDoubt(isExpanded ? null : doubt._id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-2">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          hasTeacherReply ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                        <span className="text-sm font-medium text-[#4D2C5E] bg-[#4D2C5E]/10 px-2 py-1 rounded">
                          {doubt.course?.courseName || 'No course'}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{doubt.question}</h3>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <FiClock className="mr-1" />
                        <span>{new Date(doubt.createdAt || Date.now()).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span className="text-[#4D2C5E]">
                          Your question
                        </span>
                      </div>
                    </div>
                    
                    <FiChevronDown className={`ml-4 text-gray-400 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`} />
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t">
                    {/* Teacher Reply */}
                    {teacherReply ? (
                      <div className="p-5 bg-gray-50">
                        <div className="flex items-center mb-3">
                          <div className="bg-[#4D2C5E] p-2 rounded-full text-white mr-3">
                            <FiUser className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-[#4D2C5E]">
                              {teacherReply.user?.name || 'Instructor'}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {new Date(teacherReply.createdAt || Date.now()).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="pl-11">
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <p className="text-gray-700">{teacherReply.message}</p>
                          </div>
                          
                          {/* Teacher Attachments */}
                          {teacherReply.attachments?.length > 0 && (
                            <div className="mt-4">
                              <h4 className="text-xs font-medium text-gray-500 mb-3">INSTRUCTOR ATTACHMENTS</h4>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {teacherReply.attachments.map((file, index) => (
                                  <a 
                                    key={index} 
                                    href={file.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="group relative block border rounded-lg overflow-hidden hover:shadow-md transition"
                                  >
                                    {file.type === 'image' ? (
                                      <div className="aspect-square bg-gray-100">
                                        <img 
                                          src={file.url} 
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
                          
                          {hasTeacherReply && (
                            <div className="flex items-center text-green-600 mt-3">
                              <FiCheckCircle className="mr-1" />
                              <span className="text-sm">Marked as resolved</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 bg-gray-50 text-center text-gray-500">
                        <FiMessageSquare className="mx-auto h-6 w-6 mb-2" />
                        <p>No response from instructor yet</p>
                      </div>
                    )}
                    
                    {/* Student Attachments */}
                    {doubt.attachments?.length > 0 && (
                      <div className="p-5 border-t">
                        <h4 className="text-xs font-medium text-gray-500 mb-3">YOUR ATTACHMENTS</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {doubt.attachments.map((file, index) => (
                            <a 
                              key={index} 
                              href={file.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="group relative block border rounded-lg overflow-hidden hover:shadow-md transition"
                            >
                              {file.type === 'image' ? (
                                <div className="aspect-square bg-gray-100">
                                  <img 
                                    src={file.url} 
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
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white p-8 text-center rounded-xl shadow-md border border-gray-200">
            <FiMessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No doubts found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? 'Try a different search' : 
               activeTab === 'pending' ? 'You have no pending doubts' : 
               'You have no resolved doubts'}
            </p>
            {activeTab !== 'pending' && (
              <button
                onClick={() => setIsFormExpanded(true)}
                className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152] transition shadow-md"
              >
                Ask a Question
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDoubts;