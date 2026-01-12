import React, { useEffect, useState } from 'react';
import { 
  FiPlus, 
  FiX, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiEdit2, 
  FiTrash2, 
  FiFilter,
  FiEye,
  FiDownload,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiSearch,
  FiToggleLeft,
  FiToggleRight,
  FiChevronDown
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  postDataHandlerWithToken, 
  getDataHandlerWithToken, 
  putDataHandlerWithToken,
  patchTokenDataHandler
} from '../../../config/services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ApiConfig from '../../../config/apiConfig';
import BlogContentRenderer from '../../../components/BlogContentRenderer';
const TeacherAssignments = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [batches, setBatches] = useState([]);
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showBatchFilter, setShowBatchFilter] = useState(false);

  // Filter states
  const [filterByBatch, setFilterByBatch] = useState('all');
  const [filterByStatus, setFilterByStatus] = useState('all'); // 'all', 'approved', 'pending'
  const [selectedBatchName, setSelectedBatchName] = useState('All Batches');

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch teacher profile and batches
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch teacher profile
        const profileResponse = await getDataHandlerWithToken('teacherProfile');
        setTeacherProfile(profileResponse);

        // Fetch batches taught by this teacher
        const batchesResponse = await getDataHandlerWithToken('upcomingBatches');
        setBatches(batchesResponse || []);

        // Fetch teacher's assignments
        await fetchAssignments();

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
      setAssignments(response || []);
      applyFilters(response || []);
    } catch (error) {
      toast.error('Failed to load assignments');
      console.error('Error fetching assignments:', error);
    }
  };

  // Apply all filters
  const applyFilters = (assignmentsList = assignments) => {
    let filtered = [...assignmentsList];

    // Apply batch filter
    if (filterByBatch !== 'all') {
      filtered = filtered.filter(a => {
        // Check if batchId is an object or string
        const batchId = typeof a.batchId === 'object' ? a.batchId._id : a.batchId;
        return batchId === filterByBatch;
      });
    }

    // Apply status filter
    if (filterByStatus !== 'all') {
      if (filterByStatus === 'approved') {
        filtered = filtered.filter(a => a.isApproved === true);
      } else if (filterByStatus === 'pending') {
        filtered = filtered.filter(a => a.isApproved === false || !a.isApproved);
      }
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

    setFilteredAssignments(filtered);
  };

  // Update filters when dependencies change
  useEffect(() => {
    applyFilters();
  }, [filterByBatch, filterByStatus, searchQuery, assignments]);

  // Fetch submissions for an assignment
  const fetchSubmissions = async (assignmentId) => {
    try {
        const endpoint = ApiConfig.assignmentSubmissions(assignmentId)
      const response = await getDataHandlerWithToken(endpoint,null,null,true);
      setSubmissions(response || []);
    } catch (error) {
      toast.error('Failed to load submissions');
      console.error('Error fetching submissions:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title,
      description,
      content,
      batchId: selectedBatchId,
      teacherId: teacherProfile?._id
    };

    try {
      if (editingId) {
        console.log("hi")
        // Update existing assignment
        const endpoint = ApiConfig.updateTeacherAssignment(editingId)
        await patchTokenDataHandler(endpoint, payload,true);
        toast.success('Assignment updated successfully!');
      } else {
        // Create new assignment
        await postDataHandlerWithToken('teacherAssignment', payload);
        toast.success('Assignment created successfully!');
      }

      // Refresh assignments list
      await fetchAssignments();

      // Reset form
      setShowModal(false);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit assignment');
      console.error('Submission Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit assignment
  const handleEdit = (assignment) => {
    setTitle(assignment.title);
    setDescription(assignment.description);
    setContent(assignment.content || '');
    setSelectedBatchId(typeof assignment.batchId === 'object' ? assignment.batchId._id : assignment.batchId);
    setEditingId(assignment._id);
    setShowModal(true);
  };

  // View assignment details
  const handleView = (assignment) => {
    setSelectedAssignment(assignment);
    setShowViewModal(true);
  };

  // View submissions
  const handleViewSubmissions = async (assignment) => {
    setSelectedAssignment(assignment);
    await fetchSubmissions(assignment._id);
    setShowSubmissionsModal(true);
  };

  // Reset form fields
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setContent('');
    setSelectedBatchId('');
    setEditingId(null);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get batch name by ID
  const getBatchName = (batchData) => {
    if (!batchData) return 'N/A';
    
    if (typeof batchData === 'object') {
      return `${batchData.batchCode}`;
    } else {
      const batch = batches.find(b => b._id === batchData);
      return batch ? `${batch.batchCode}` : 'N/A';
    }
  };

  // Get course name by batch ID
  const getCourseName = (batchData) => {
    if (!batchData) return 'N/A';
    
    if (typeof batchData === 'object' && batchData.course) {
      return batchData.course.courseName || 'N/A';
    } else {
      const batch = batches.find(b => b._id === batchData);
      return batch?.course?.courseName || 'N/A';
    }
  };

  // Count submissions for an assignment (placeholder - you'll need to implement this)
  const countSubmissions = (assignmentId) => {
    // This should be fetched from your API
    return 0;
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterByBatch('all');
    setFilterByStatus('all');
    setSearchQuery('');
    setSelectedBatchName('All Batches');
  };

  // Handle batch filter selection
  const handleBatchFilterSelect = (batchId, batchCode) => {
    setFilterByBatch(batchId);
    setSelectedBatchName(batchCode || 'All Batches');
    setShowBatchFilter(false);
  };

  // Get batch object from assignment
  const getBatchFromAssignment = (assignment) => {
    if (typeof assignment.batchId === 'object') {
      return assignment.batchId;
    }
    return batches.find(b => b._id === assignment.batchId);
  };

  // Get unique batches from assignments
  const getUniqueBatchesFromAssignments = () => {
    const batchMap = new Map();
    
    assignments.forEach(assignment => {
      const batch = getBatchFromAssignment(assignment);
      if (batch) {
        batchMap.set(batch._id, batch);
      }
    });
    
    return Array.from(batchMap.values());
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
            <p className="text-gray-500">Create and manage assignments for your students</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowModal(true)}
            className="flex items-center bg-gradient-to-r from-[#FF7426] to-[#FF9142] text-white px-5 py-3 rounded-lg hover:shadow-md transition-all shadow-sm"
          >
            <FiPlus className="mr-2 h-5 w-5" />
            New Assignment
          </motion.button>
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
                placeholder="Search by title or description..."
              />
            </div>

            {/* Filter Row */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Batch Filter Dropdown */}
              <div className="relative flex-1">
                <button
                  onClick={() => setShowBatchFilter(!showBatchFilter)}
                  className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <FiUsers className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">{selectedBatchName}</span>
                  </div>
                  <FiChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showBatchFilter ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Batch Dropdown */}
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
                        {getUniqueBatchesFromAssignments().map((batch) => (
                          <button
                            key={batch._id}
                            onClick={() => handleBatchFilterSelect(batch._id, batch.batchCode)}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${filterByBatch === batch._id ? 'bg-[#4D2C5E] text-white hover:bg-[#3A2152]' : ''}`}
                          >
                            <div className="font-medium">{batch.batchCode}</div>
                            <div className="text-xs text-gray-500">{batch.course?.courseName}</div>
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
                  className={`px-4 py-2.5 rounded-lg border transition-colors duration-200 flex items-center ${filterByStatus === 'all' 
                    ? 'bg-[#4D2C5E] text-white border-[#4D2C5E]' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterByStatus('approved')}
                  className={`px-4 py-2.5 rounded-lg border transition-colors duration-200 flex items-center ${filterByStatus === 'approved' 
                    ? 'bg-green-100 text-green-800 border-green-200' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  <FiCheckCircle className="mr-2 h-4 w-4" />
                  Approved
                </button>
                <button
                  onClick={() => setFilterByStatus('pending')}
                  className={`px-4 py-2.5 rounded-lg border transition-colors duration-200 flex items-center ${filterByStatus === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800 border-yellow-200' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  <FiClock className="mr-2 h-4 w-4" />
                  Pending
                </button>
              </div>

              {/* Clear Filters Button */}
              {(filterByBatch !== 'all' || filterByStatus !== 'all' || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2.5 text-gray-600 hover:text-gray-800 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <FiX className="mr-2 h-4 w-4" />
                  Clear Filters
                </button>
              )}
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
              {filterByStatus !== 'all' && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${filterByStatus === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  Status: {filterByStatus === 'approved' ? 'Approved' : 'Pending'}
                  <button 
                    onClick={() => setFilterByStatus('all')}
                    className={`ml-1.5 ${filterByStatus === 'approved' ? 'text-green-600 hover:text-green-800' : 'text-yellow-600 hover:text-yellow-800'}`}
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Search: "{searchQuery}"
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-1.5 text-purple-600 hover:text-purple-800"
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </span>
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
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {assignments.filter(a => a.isApproved).length}
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
                  {assignments.filter(a => !a.isApproved).length}
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Assignments ({filteredAssignments.length})
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
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-[#4D2C5E] group-hover:text-[#3A2152] transition-colors">
                            {assignment.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">
                              Course: {getCourseName(assignment.batchId)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${assignment.isApproved
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {assignment.isApproved ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <FiCalendar className="mr-1 h-4 w-4" />
                          {formatDate(assignment.createdAt)}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center">
                          <FiUsers className="mr-1 h-4 w-4" />
                          {getBatchName(assignment.batchId)}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {assignment.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <button
                          onClick={() => handleView(assignment)}
                          className="text-sm text-[#4D2C5E] hover:text-[#FF7426] flex items-center px-3 py-1.5 border border-gray-200 rounded-md hover:border-[#FF7426]/30 hover:bg-[#FF7426]/5 transition-colors"
                        >
                          <FiEye className="mr-1 h-4 w-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(assignment)}
                          className="text-sm text-[#4D2C5E] hover:text-blue-600 flex items-center px-3 py-1.5 border border-gray-200 rounded-md hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                          <FiEdit2 className="mr-1 h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleViewSubmissions(assignment)}
                          className="text-sm text-[#4D2C5E] hover:text-green-600 flex items-center px-3 py-1.5 border border-gray-200 rounded-md hover:border-green-300 hover:bg-green-50 transition-colors"
                        >
                          <FiUsers className="mr-1 h-4 w-4" />
                          Submissions
                        </button>
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
                {searchQuery || filterByBatch !== 'all' || filterByStatus !== 'all'
                  ? 'No assignments match your current filters. Try adjusting your search criteria.'
                  : 'You haven\'t created any assignments yet. Start by creating your first assignment!'}
              </p>
              {(searchQuery || filterByBatch !== 'all' || filterByStatus !== 'all') ? (
                <button
                  onClick={clearFilters}
                  className="text-[#4D2C5E] hover:text-[#3A2152] font-medium flex items-center justify-center mx-auto"
                >
                  <FiX className="mr-2" />
                  Clear Filters
                </button>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="text-[#4D2C5E] hover:text-[#3A2152] font-medium flex items-center justify-center mx-auto"
                >
                  <FiPlus className="mr-2" />
                  Create Your First Assignment
                </button>
              )}
            </div>
          )}
        </div>

        {/* New/Edit Assignment Modal - Keep the same as before */}
        <AnimatePresence>
          {showModal && (
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
                className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-gray-100"
              >
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">
                        {editingId ? 'Edit Assignment' : 'New Assignment'}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {editingId ? 'Update your assignment details' : 'Create a new assignment for your students'}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 -mt-2 -mr-2"
                      disabled={isSubmitting}
                      aria-label="Close modal"
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title*</label>
                        <input
                          type="text"
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200 placeholder-gray-400"
                          placeholder="Assignment title"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
                        <textarea
                          rows={3}
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200 placeholder-gray-400"
                          placeholder="Brief description of the assignment"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Batch*</label>
                        <select
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjQ1Njc1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem] bg-[length:1.5rem]"
                          value={selectedBatchId}
                          onChange={e => setSelectedBatchId(e.target.value)}
                          required
                          disabled={isSubmitting}
                        >
                          <option value="">Select a batch</option>
                          {batches.map(batch => (
                            <option key={batch._id} value={batch._id}>
                              {batch.course?.courseName} ({batch.batchCode})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Detailed Instructions
                        </label>
                        <ReactQuill
                          theme="snow"
                          value={content}
                          onChange={setContent}
                          className="bg-white border border-gray-200 rounded-lg"
                          readOnly={isSubmitting}
                          placeholder="Provide detailed instructions for the assignment..."
                        />
                      </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          resetForm();
                        }}
                        className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium shadow-sm flex items-center justify-center min-w-36"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {editingId ? 'Updating...' : 'Creating...'}
                          </>
                        ) : (
                          editingId ? 'Update Assignment' : 'Create Assignment'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">
                        {selectedAssignment.title}
                      </h2>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <span>Created: {formatDate(selectedAssignment.createdAt)}</span>
                        <span className="text-gray-300">•</span>
                        <span>Batch: {getBatchName(selectedAssignment.batchId)}</span>
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
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                        {selectedAssignment.description}
                      </p>
                    </div>

                    {selectedAssignment.content && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Instructions</h3>
                        <BlogContentRenderer content={selectedAssignment.content} />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedAssignment.isApproved
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {selectedAssignment.isApproved ? 'Approved' : 'Pending Approval'}
                        </span>
                        <span className="text-sm text-gray-500">
                          Submissions: {countSubmissions(selectedAssignment._id)}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setShowViewModal(false);
                          handleEdit(selectedAssignment);
                        }}
                        className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3A2152] transition-colors duration-200 font-medium"
                      >
                        <FiEdit2 className="inline mr-2 h-4 w-4" />
                        Edit Assignment
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submissions Modal */}
        <AnimatePresence>
          {showSubmissionsModal && selectedAssignment && (
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
                className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[95vh] overflow-y-auto border border-gray-100"
              >
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">
                        Submissions for "{selectedAssignment.title}"
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Batch: {getBatchName(selectedAssignment.batchId)} • Total: {submissions.length} submissions
                      </p>
                    </div>
                    <button
                      onClick={() => setShowSubmissionsModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 -mt-2 -mr-2"
                      aria-label="Close modal"
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>

                  {submissions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Student
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Submission Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              File
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {submissions.map((submission) => (
                            <tr key={submission._id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                      className="h-10 w-10 rounded-full object-cover"
                                      src={submission.studentId?.image || 'https://via.placeholder.com/40'}
                                      alt={submission.studentId?.fullName}
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {submission.studentId?.fullName}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {submission.studentId?.studentType}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(submission.createdAt)}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {submission.content}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => {
                                      // Handle download submission
                                      window.open(submission.content, '_blank');
                                    }}
                                    className="text-[#4D2C5E] hover:text-[#FF7426] flex items-center"
                                  >
                                    <FiDownload className="mr-1 h-4 w-4" />
                                    Download
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FiAlertCircle className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No submissions yet
                      </h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-4">
                        Students haven't submitted any work for this assignment yet.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
                    <button
                      onClick={() => setShowSubmissionsModal(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                    >
                      Close
                    </button>
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

export default TeacherAssignments;