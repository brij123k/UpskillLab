import React, { useEffect, useState } from 'react';
import { 
  FiPlus, 
  FiX, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiFilter,
  FiEye,
  FiUpload,
  FiDownload,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiSearch,
  FiChevronDown,
  FiFile,
  FiCheck,
  FiArrowUp,
  FiLoader
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  postDataHandlerWithToken, 
  getDataHandlerWithToken, 
  putDataHandlerWithToken, 
  uploadFileHandler
} from '../../../config/services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogContentRenderer from '../../../components/BlogContentRenderer';
import ApiConfig from '../../../config/apiConfig';

const StudentAssignments = () => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [batches, setBatches] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [submissions, setSubmissions] = useState();
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showBatchFilter, setShowBatchFilter] = useState(false);
  const [showTeacherFilter, setShowTeacherFilter] = useState(false);

  // Filter states
  const [filterByBatch, setFilterByBatch] = useState('all');
  const [filterByTeacher, setFilterByTeacher] = useState('all');
  const [filterByStatus, setFilterByStatus] = useState('all'); // 'all', 'submitted', 'not-submitted'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatchName, setSelectedBatchName] = useState('All Batches');
  const [selectedTeacherName, setSelectedTeacherName] = useState('All Teachers');

  // Submit modal state
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch assignments
        await fetchAssignments();
        
        // Fetch submissions to determine submission status
        await fetchAllSubmissions();
        
      } catch (error) {
        toast.error('Failed to load data');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

// Fetch assignments
const fetchAssignments = async () => {
  try {
    const response = await getDataHandlerWithToken('teacherAssignment');
    const assignmentsData = response || [];
    
    // Add submitted status to each assignment
    const assignmentsWithStatus = assignmentsData.map(assignment => ({
      ...assignment,
      isSubmitted: assignment.isSubmitted || false // Ensure it has the isSubmitted property
    }));
    
    setAssignments(assignmentsWithStatus);
    
    // Extract unique batches and teachers
    const uniqueBatches = {};
    const uniqueTeachers = {};
    
    assignmentsData.forEach(assignment => {
      if (assignment.batchId && assignment.batchId._id) {
        uniqueBatches[assignment.batchId._id] = assignment.batchId;
      }
      if (assignment.teacherId && assignment.teacherId._id) {
        uniqueTeachers[assignment.teacherId._id] = assignment.teacherId;
      }
    });
    
    setBatches(Object.values(uniqueBatches));
    setTeachers(Object.values(uniqueTeachers));
    
  } catch (error) {
    toast.error('Failed to load assignments');
    console.error('Error fetching assignments:', error);
  }
};

  // Fetch all submissions to determine submission status
  const fetchAllSubmissions = async () => {
    try {
      // This would need to be a bulk endpoint or multiple calls
      // For now, we'll handle it per assignment when needed
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  // Fetch submissions for a specific assignment
  const fetchAssignmentSubmissions = async (assignmentId) => {
    try {
      const endpoint = ApiConfig.assignmentSubmissions(assignmentId)
      const response = await getDataHandlerWithToken(endpoint, null, null, true);
      return response;
    } catch (error) {
      console.error('Error fetching assignment submissions:', error);
      return [];
    }
  };

  // Check if assignment is submitted
  const checkAssignmentSubmission = async (assignmentId) => {
    try {
      const submissions = await fetchAssignmentSubmissions(assignmentId);

      // Check if current student has submitted
      // This requires student ID from profile
      return submissions.length > 0; // Simplified for now
    } catch (error) {
      return false;
    }
  };

  // Apply all filters
  const applyFilters = async () => {
    let filtered = [...assignments];

    // Apply batch filter
    if (filterByBatch !== 'all') {
      filtered = filtered.filter(a => 
        a.batchId && a.batchId._id === filterByBatch
      );
    }

    // Apply teacher filter
    if (filterByTeacher !== 'all') {
      filtered = filtered.filter(a => 
        a.teacherId && a.teacherId._id === filterByTeacher
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(a =>
        a.title?.toLowerCase().includes(query) ||
        a.description?.toLowerCase().includes(query) ||
        (a.content && a.content.toLowerCase().includes(query))
      );
    }

     // Apply status filter using the isSubmitted field from API
  if (filterByStatus !== 'all') {
    if (filterByStatus === 'submitted') {
      filtered = filtered.filter(a => a.isSubmitted === true);
    } else if (filterByStatus === 'not-submitted') {
      filtered = filtered.filter(a => a.isSubmitted === false);
    }
  }

    setFilteredAssignments(filtered);
  };

  // Update filters when dependencies change
  useEffect(() => {
    applyFilters();
  }, [filterByBatch, filterByTeacher, filterByStatus, searchQuery, assignments]);

  // Handle file selection
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file type
      if (selectedFile.type !== 'application/pdf') {
        toast.error('Please select a PDF file');
        return;
      }
      
      // Check file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  // Upload file
  const uploadFile = async (file) => {
    console.log(file)
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
      
      // Upload file
      const response = await uploadFileHandler('uploadFiles', file, {
            category: 'Assignment-attachment'
          });
      console.log(response.files[0]?.fileUrl)
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      return response.files[0]?.fileUrl;
      
    } catch (error) {
      toast.error('Failed to upload file');
      console.error('Upload Error:', error);
      throw error;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Submit assignment
// Submit assignment
const handleSubmitAssignment = async (e) => {
  e.preventDefault();
  
  if (!file) {
    toast.error('Please select a file to upload');
    return;
  }
  
  if (!selectedAssignment) {
    toast.error('No assignment selected');
    return;
  }
  
  setIsSubmitting(true);
  
  try {
    // Upload file
    const fileUrl = await uploadFile(file);
    
    // Submit assignment
    const payload = {
      assignmentId: selectedAssignment._id,
      content: fileUrl
    };
    
    await postDataHandlerWithToken('submitAssignments', payload);
    toast.success('Assignment submitted successfully!');
    
    // Refresh assignments to get updated isSubmitted status
    await fetchAssignments();
    
    // Reset and close modal
    setShowSubmitModal(false);
    resetSubmitForm();
    
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to submit assignment');
    console.error('Submission Error:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  // View assignment details
// View assignment details
const handleViewAssignment = async (assignment) => {
  setSelectedAssignment(assignment);
  
  // Fetch submissions for this assignment
  const assignmentSubmissions = await fetchAssignmentSubmissions(assignment._id);
  setSubmissions(assignmentSubmissions);
  
  // Set selected submission if exists
  if (assignmentSubmissions ) {
    setSelectedSubmission(assignmentSubmissions);
  } else {
    setSelectedSubmission(null);
  }
  
  setShowViewModal(true);
};

  // Open submit modal
  const handleOpenSubmit = (assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmitModal(true);
  };

  // Reset submit form
  const resetSubmitForm = () => {
    setFile(null);
    setFileName('');
    setIsUploading(false);
    setIsSubmitting(false);
    setUploadProgress(0);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterByBatch('all');
    setFilterByTeacher('all');
    setFilterByStatus('all');
    setSearchQuery('');
    setSelectedBatchName('All Batches');
    setSelectedTeacherName('All Teachers');
  };

  // Handle batch filter selection
  const handleBatchFilterSelect = (batchId, batchCode) => {
    setFilterByBatch(batchId);
    setSelectedBatchName(batchCode || 'All Batches');
    setShowBatchFilter(false);
  };

  // Handle teacher filter selection
  const handleTeacherFilterSelect = (teacherId, teacherName) => {
    setFilterByTeacher(teacherId);
    setSelectedTeacherName(teacherName || 'All Teachers');
    setShowTeacherFilter(false);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get submission status for an assignment
  const getSubmissionStatus = async (assignmentId) => {
    const submissions = await fetchAssignmentSubmissions(assignmentId);
    return {
      submitted: submissions.length > 0,
      submission: submissions[0] || null
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#fdf8ee]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf8ee] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E] tracking-tight">My Assignments</h1>
            <p className="text-gray-500">View and submit your assignments</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              Total: {assignments.length}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
              Submitted: {assignments.filter(a => a.submitted).length}
            </span>
          </div>
        </div>

        {/* Enhanced Filter Controls */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-gray-100">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                placeholder="Search assignments by title or description..."
              />
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Batch Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowBatchFilter(!showBatchFilter)}
                  className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <FiUsers className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-700 truncate">{selectedBatchName}</span>
                  </div>
                  <FiChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showBatchFilter ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showBatchFilter && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => handleBatchFilterSelect('all', 'All Batches')}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${filterByBatch === 'all' ? 'bg-[#4D2C5E] text-white hover:bg-[#3A2152]' : ''}`}
                        >
                          All Batches
                        </button>
                        {batches.map((batch) => (
                          <button
                            key={batch._id}
                            onClick={() => handleBatchFilterSelect(batch._id, batch.batchCode)}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${filterByBatch === batch._id ? 'bg-[#4D2C5E] text-white hover:bg-[#3A2152]' : ''}`}
                          >
                            <div className="font-medium">{batch.batchCode}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Teacher Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowTeacherFilter(!showTeacherFilter)}
                  className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <FiUsers className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-700 truncate">{selectedTeacherName}</span>
                  </div>
                  <FiChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showTeacherFilter ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showTeacherFilter && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => handleTeacherFilterSelect('all', 'All Teachers')}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${filterByTeacher === 'all' ? 'bg-[#4D2C5E] text-white hover:bg-[#3A2152]' : ''}`}
                        >
                          All Teachers
                        </button>
                        {teachers.map((teacher) => (
                          <button
                            key={teacher._id}
                            onClick={() => handleTeacherFilterSelect(teacher._id, teacher.name)}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${filterByTeacher === teacher._id ? 'bg-[#4D2C5E] text-white hover:bg-[#3A2152]' : ''}`}
                          >
                            <div className="font-medium">{teacher.name}</div>
                            <div className="text-xs text-gray-500">{teacher.qualification}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterByStatus('all')}
                  className={`flex-1 px-4 py-2.5 rounded-lg border transition-colors duration-200 flex items-center justify-center ${filterByStatus === 'all' 
                    ? 'bg-[#4D2C5E] text-white border-[#4D2C5E]' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterByStatus('submitted')}
                  className={`flex-1 px-4 py-2.5 rounded-lg border transition-colors duration-200 flex items-center justify-center ${filterByStatus === 'submitted' 
                    ? 'bg-green-100 text-green-800 border-green-200' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  <FiCheck className="mr-2 h-4 w-4" />
                  Submitted
                </button>
                <button
                  onClick={() => setFilterByStatus('not-submitted')}
                  className={`flex-1 px-4 py-2.5 rounded-lg border transition-colors duration-200 flex items-center justify-center ${filterByStatus === 'not-submitted' 
                    ? 'bg-yellow-100 text-yellow-800 border-yellow-200' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  <FiAlertCircle className="mr-2 h-4 w-4" />
                  Pending
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            <div className="flex flex-wrap gap-2">
              {filterByBatch !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Batch: {selectedBatchName}
                  <button 
                    onClick={() => setFilterByBatch('all')}
                    className="ml-1.5 text-blue-600 hover:text-blue-800"
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filterByTeacher !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Teacher: {selectedTeacherName}
                  <button 
                    onClick={() => setFilterByTeacher('all')}
                    className="ml-1.5 text-purple-600 hover:text-purple-800"
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filterByStatus !== 'all' && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${filterByStatus === 'submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  Status: {filterByStatus === 'submitted' ? 'Submitted' : 'Pending'}
                  <button 
                    onClick={() => setFilterByStatus('all')}
                    className={`ml-1.5 ${filterByStatus === 'submitted' ? 'text-green-600 hover:text-green-800' : 'text-yellow-600 hover:text-yellow-800'}`}
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Search: "{searchQuery}"
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-1.5 text-gray-600 hover:text-gray-800"
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </span>
              )}
              {(filterByBatch !== 'all' || filterByTeacher !== 'all' || filterByStatus !== 'all' || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
                >
                  <FiX className="mr-1 h-3 w-3" />
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Assignments</p>
                <p className="text-2xl font-bold text-[#4D2C5E]">{assignments.length}</p>
              </div>
              <div className="p-3 rounded-full bg-[#4D2C5E]/10 text-[#4D2C5E]">
                <FiFileText className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Submitted</p>
                <p className="text-2xl font-bold text-green-600">
  {assignments.filter(a => a.isSubmitted === true).length}
</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FiCheckCircle className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
  {assignments.filter(a => a.isSubmitted === false).length}
</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <FiClock className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Filtered</p>
                <p className="text-2xl font-bold text-purple-600">
                  {filteredAssignments.length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FiFilter className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Assignments List */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Assignments ({filteredAssignments.length})
            </h2>
            <span className="text-sm text-gray-500">
              Showing {filteredAssignments.length} of {assignments.length}
            </span>
          </div>

          {filteredAssignments.length > 0 ? (
            <div className="space-y-4">
              {filteredAssignments.map((assignment) => (
  <motion.div
    key={assignment._id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 group"
  >
    <div className="flex flex-col md:flex-row md:items-start gap-4">
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#4D2C5E] group-hover:text-[#3A2152] transition-colors">
              {assignment.title}
            </h3>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
              <span className="flex items-center">
                <FiCalendar className="mr-1 h-4 w-4" />
                {formatDate(assignment.createdAt)}
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center">
                <FiUsers className="mr-1 h-4 w-4" />
                {assignment.teacherId?.name || 'Unknown Teacher'}
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center">
                <FiUsers className="mr-1 h-4 w-4" />
                {assignment.batchId?.batchCode || 'Unknown Batch'}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Submission Status */}
            <span className={`px-2 py-1 rounded text-xs font-medium ${assignment.isSubmitted
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
              }`}>
              {assignment.isSubmitted ? 'Submitted' : 'Not Submitted'}
            </span>
          </div>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2">
          {assignment.description}
        </p>

        {/* Document Attachment Badge - ADD THIS SECTION */}
        {assignment.docs && (
          <div className="mb-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              <FiFile className="mr-1.5 h-3.5 w-3.5" />
              <span className="truncate max-w-[200px]">
                {assignment.docs.split('/').pop().split('?')[0] || 'Document'}
              </span>
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => handleViewAssignment(assignment)}
            className="text-sm text-[#4D2C5E] hover:text-[#FF7426] flex items-center px-3 py-1.5 border border-gray-200 rounded-md hover:border-[#FF7426]/30 hover:bg-[#FF7426]/5 transition-colors"
          >
            <FiEye className="mr-1 h-4 w-4" />
            View Details
          </button>
          
          {assignment.isSubmitted ? (
            <div
              className="text-sm text-green-600 flex items-center px-3 py-1.5 rounded-md hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <FiCheck className="mr-1 h-4 w-4" />
              Submitted
            </div>
          ) : (
            <button
              onClick={() => handleOpenSubmit(assignment)}
              className="text-sm text-[#4D2C5E] hover:text-green-600 flex items-center px-3 py-1.5 border border-gray-200 rounded-md hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <FiUpload className="mr-1 h-4 w-4" />
              Submit Assignment
            </button>
          )}
          
          {assignment.submitted && assignment.submissionFile && (
            <button
              onClick={() => window.open(assignment.submissionFile, '_blank')}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center px-3 py-1.5 border border-blue-200 rounded-md hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <FiDownload className="mr-1 h-4 w-4" />
              Download Submission
            </button>
          )}
        </div>
      </div>
    </div>
  </motion.div>
))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <div className="mx-auto w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiAlertCircle className="h-8 w-8 md:h-12 md:w-12 text-gray-400" />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-1">
                No assignments found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-4">
                {searchQuery || filterByBatch !== 'all' || filterByTeacher !== 'all' || filterByStatus !== 'all'
                  ? 'No assignments match your current filters. Try adjusting your search criteria.'
                  : 'No assignments available at the moment.'}
              </p>
              {(searchQuery || filterByBatch !== 'all' || filterByTeacher !== 'all' || filterByStatus !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="text-[#4D2C5E] hover:text-[#3A2152] font-medium flex items-center justify-center mx-auto"
                >
                  <FiX className="mr-2" />
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Submit Assignment Modal */}
        <AnimatePresence>
          {showSubmitModal && selectedAssignment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[95vh] overflow-y-auto border border-gray-100"
              >
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">
                        Submit Assignment
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedAssignment.title}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShowSubmitModal(false);
                        resetSubmitForm();
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 -mt-2 -mr-2"
                      disabled={isUploading || isSubmitting}
                      aria-label="Close modal"
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmitAssignment}>
                    <div className="space-y-6">
                      {/* Assignment Info */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Assignment Details</h4>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Teacher:</span> {selectedAssignment.teacherId?.name}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Batch:</span> {selectedAssignment.batchId?.batchCode}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Due:</span> {formatDate(selectedAssignment.createdAt)}
                        </p>
                      </div>

                      {/* File Upload */}
                     <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Upload Your Solution (PDF only, max 5MB)
  </label>
  
  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#4D2C5E] transition-colors duration-200 cursor-pointer">
    {/* Wrap the entire card content in a label */}
    <label className="cursor-pointer w-full text-center">
      <div className="space-y-2 w-full">
        {file ? (
          <div className="flex flex-col items-center">
            <FiFile className="h-12 w-12 text-green-500" />
            <p className="text-sm text-gray-900 font-medium mt-2">{fileName}</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the file input
                setFile(null);
                setFileName('');
              }}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
              disabled={isUploading || isSubmitting}
            >
              Remove File
            </button>
          </div>
        ) : (
          <>
            <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600 justify-center">
              <span className="relative rounded-md font-medium text-[#4D2C5E] hover:text-[#3A2152]">
                Upload a file
              </span>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PDF up to 5MB</p>
          </>
        )}
      </div>
      
      {/* Hidden file input that's accessible via the label */}
      <input
        type="file"
        className="sr-only"
        accept=".pdf,application/pdf"
        onChange={handleFileSelect}
        disabled={isUploading || isSubmitting || !!file}
        id="file-upload-input"
      />
    </label>
  </div>

  {/* Upload Progress */}
  {isUploading && (
    <div className="mt-4">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>Uploading...</span>
        <span>{uploadProgress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${uploadProgress}%` }}
        ></div>
      </div>
    </div>
  )}
</div>

                      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowSubmitModal(false);
                            resetSubmitForm();
                          }}
                          className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                          disabled={isUploading || isSubmitting}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium shadow-sm flex items-center justify-center min-w-36 disabled:opacity-50"
                          disabled={!file || isUploading || isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <FiLoader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <FiArrowUp className="mr-2 h-4 w-4" />
                              Submit Assignment
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Assignment Modal */}
       {/* View Assignment Modal */}
<AnimatePresence>
  {showViewModal && selectedAssignment && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto border border-gray-100"
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">
                {selectedAssignment.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                <span>Teacher: {selectedAssignment.teacherId?.name}</span>
                <span className="text-gray-300">•</span>
                <span>Batch: {selectedAssignment.batchId?.batchCode}</span>
                <span className="text-gray-300">•</span>
                <span>Created: {formatDate(selectedAssignment.createdAt)}</span>
              </div>
            </div>
            <button
              onClick={() => setShowViewModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 -mt-2 -mr-2"
              aria-label="Close modal"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Assignment Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{selectedAssignment.description}</p>
              </div>
            </div>

            {/* Assignment Content */}
            {selectedAssignment.content && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Detailed Instructions</h3>
                <BlogContentRenderer content={selectedAssignment.content} />
              </div>
            )}

            {/* Document Attachment - ADD THIS SECTION */}
            {selectedAssignment.docs && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Attached Document</h3>
                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <FiFile className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        {selectedAssignment.docs.split('/').pop().split('?')[0] || 'Document'}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        (Click download to view)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(selectedAssignment.docs, '_blank')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
                  >
                    <FiDownload className="mr-2 h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            )}

            {/* Submission Status */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Submission</h3>
              
              {selectedSubmission ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <FiCheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-medium text-green-800">Submitted</span>
                    </div>
                    <span className="text-sm text-green-600">
                      Submitted on: {formatDate(selectedSubmission.createdAt)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700 mb-1">File: {selectedSubmission.content}</p>
                      <p className="text-xs text-green-600">Status: Submitted successfully</p>
                    </div>
                    <button
                      onClick={() => window.open(selectedSubmission.content, '_blank')}
                      className="text-green-600 hover:text-green-800 flex items-center text-sm"
                    >
                      <FiDownload className="mr-1 h-4 w-4" />
                      Download
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FiAlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                      <span className="font-medium text-yellow-800">Not Submitted Yet</span>
                    </div>
                    <button
                      onClick={() => {
                        setShowViewModal(false);
                        handleOpenSubmit(selectedAssignment);
                      }}
                      className="text-sm bg-[#4D2C5E] text-white px-4 py-2 rounded-lg hover:bg-[#3A2152] transition-colors"
                    >
                      Submit Now
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200">
              {!selectedSubmission && (
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleOpenSubmit(selectedAssignment);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
                >
                  Submit Assignment
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      </div>
    </div>
  );
};

export default StudentAssignments;