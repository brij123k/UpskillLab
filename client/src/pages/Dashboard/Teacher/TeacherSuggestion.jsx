import React, { useEffect, useState } from 'react';
import { FiPlus, FiX, FiClock, FiCheckCircle, FiAlertCircle, FiEdit2, FiTrash2, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { postDataHandlerWithToken, getDataHandlerWithToken, putDataHandlerWithToken } from '../../../config/services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Theme styling

const TeacherSuggestions = () => {
  const [showModal, setShowModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [batches, setBatches] = useState([]);
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('curriculum');
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
        console.log(profileResponse)
        setTeacherProfile(profileResponse);

        // Fetch batches taught by this teacher
        const batchesResponse = await getDataHandlerWithToken('upcomingBatches');
        setBatches(batchesResponse || []);

        // Fetch teacher's suggestions
        const suggestionsResponse = await getDataHandlerWithToken('teacherSugegstionsget');
        setSuggestions(suggestionsResponse.suggestions || []);
        setFilteredSuggestions(suggestionsResponse.suggestions || []);

      } catch (error) {
        toast.error('Failed to load data');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter suggestions based on active tab and search query
  useEffect(() => {
    let filtered = [...suggestions];

    // Apply status filter
    if (activeTab === 'approved') {
      filtered = filtered.filter(s => s.isApproved);
    } else if (activeTab === 'pending') {
      filtered = filtered.filter(s => !s.isApproved);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        (s.content && s.content.toLowerCase().includes(query))
      );
    }

    setFilteredSuggestions(filtered);
  }, [activeTab, searchQuery, suggestions]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title,
      description,
      type,
      content,
      batchId: selectedBatchId,
      teacherId: teacherProfile?._id,
      teacherName: teacherProfile?.name
    };

    try {
      if (editingId) {
        // Update existing suggestion
        await putDataHandlerWithToken(`teacherSugegstions/${editingId}`, payload);
        toast.success('Suggestion updated successfully!');
      } else {
        // Create new suggestion
        await postDataHandlerWithToken('teacherSugegstions', payload);
        toast.success('Suggestion submitted successfully!');
      }

      // Refresh suggestions list
      const response = await getDataHandlerWithToken('teacherSugegstionsget');
      setSuggestions(response.suggestions || []);

      // Reset form
      setShowModal(false);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit suggestion');
      console.error('Submission Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setType('curriculum');
    setContent('');
    setSelectedBatchId('');
    setEditingId(null);
  };

  // Edit suggestion
  // const handleEdit = (suggestion) => {
  //   setTitle(suggestion.title);
  //   setDescription(suggestion.description);
  //   setType(suggestion.type);
  //   setContent(suggestion.content);
  //   setSelectedBatchId(suggestion.batchId);
  //   setEditingId(suggestion._id);
  //   setShowModal(true);
  // };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E] tracking-tight">My Suggestions</h1>
            <p className="text-gray-500">Share your ideas to improve our platform</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowModal(true)}
            className="flex items-center bg-gradient-to-r from-[#FF7426] to-[#FF9142] text-white px-5 py-3 rounded-lg hover:shadow-md transition-all shadow-sm"
          >
            <FiPlus className="mr-2 h-5 w-5" />
            New Suggestion
          </motion.button>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Status Tabs */}
            <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
              {['all', 'approved', 'pending'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${activeTab === tab
                      ? 'bg-white text-[#4D2C5E] shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                  {tab === 'all' && 'All Suggestions'}
                  {tab === 'approved' && (
                    <span className="flex items-center">
                      <FiCheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Approved
                    </span>
                  )}
                  {tab === 'pending' && (
                    <span className="flex items-center">
                      <FiClock className="mr-2 h-4 w-4 text-yellow-500" />
                      Pending
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                placeholder="Filter suggestions..."
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Suggestions</p>
                <p className="text-2xl font-bold text-[#4D2C5E]">{suggestions.length}</p>
              </div>
              <div className="p-3 rounded-full bg-[#4D2C5E]/10 text-[#4D2C5E]">
                <FiPlus className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {suggestions.filter(s => s.isApproved).length}
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
                <p className="text-sm font-medium text-gray-500">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {suggestions.filter(s => !s.isApproved).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <FiClock className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions List */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8 border border-gray-100">
          {filteredSuggestions.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredSuggestions.map((suggestion) => (
                <motion.div
                  key={suggestion._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 group relative"
                >
                  {/* Status Ribbon */}
                  <div className={`absolute -top-2 -right-2 px-2 py-1 rounded text-xs font-medium ${suggestion.isApproved
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {suggestion.isApproved ? 'Approved' : 'Pending'}
                  </div>

                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#4D2C5E] group-hover:text-[#3A2152] transition-colors mb-2">
                        {suggestion.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-gray-500">
                          {formatDate(suggestion.createdAt)}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500 capitalize">
                          {suggestion.type}
                        </span>
                        {suggestion.batchId && (
                          <>
                            <span className="text-gray-300">•</span>
                            <span className="text-xs text-gray-500">
                              {batches.find(b => b._id === suggestion.batchId)?.batchCode || 'N/A'}
                            </span>
                          </>
                        )}
                      </div>

                      <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                        {suggestion.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        {/* <button
                          onClick={() => handleEdit(suggestion)}
                          className="text-sm text-[#4D2C5E] hover:text-[#FF7426] flex items-center"
                        >
                          <FiEdit2 className="mr-1 h-4 w-4" />
                          Edit
                        </button> */}

                        {suggestion.isApproved ? (
                          <span className="flex items-center text-xs text-green-600">
                            <FiCheckCircle className="mr-1 h-3 w-3" />
                            Approved
                          </span>
                        ) : (
                          <span className="flex items-center text-xs text-yellow-600">
                            <FiClock className="mr-1 h-3 w-3" />
                            Under Review
                          </span>
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
                {activeTab === 'all' ? 'No suggestions yet' : `No ${activeTab} suggestions`}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-4">
                {activeTab === 'all'
                  ? 'You haven\'t submitted any suggestions yet. Share your ideas to help us improve!'
                  : `You don't have any ${activeTab} suggestions at the moment.`}
              </p>
              {activeTab !== 'all' ? (
                <button
                  onClick={() => setActiveTab('all')}
                  className="text-[#4D2C5E] hover:text-[#3A2152] font-medium flex items-center justify-center mx-auto"
                >
                  View All Suggestions
                </button>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="text-[#4D2C5E] hover:text-[#3A2152] font-medium flex items-center justify-center mx-auto"
                >
                  <FiPlus className="mr-2" />
                  Create Your First Suggestion
                </button>
              )}
            </div>
          )}
        </div>

        {/* New Suggestion Modal */}
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
                        {editingId ? 'Edit Suggestion' : 'New Suggestion'}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {editingId ? 'Update your suggestion details' : 'Share your valuable feedback with us'}
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
                          placeholder="Suggestion title"
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
                          placeholder="Brief description of your suggestion"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Type*</label>
                          <select
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjQ1Njc1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem] bg-[length:1.5rem]"
                            value={type}
                            onChange={e => setType(e.target.value)}
                            required
                            disabled={isSubmitting}
                          >
                            <option value="">Select suggestion type</option>
                            <option value="Curriculum">📚 Curriculum Improvement</option>
                            <option value="Teaching">👩‍🏫 Teaching Methodology</option>
                            <option value="Assessment">📝 Assessment & Grading</option>
                            <option value="Resources">💻 Learning Resources</option>
                            <option value="Projects & Assignments">🛠️ Projects & Assignments</option>
                            <option value="Platform">🖥️ Platform Features</option>
                            <option value="Career">💼 Career Guidance</option>
                            <option value="Community">🤝 Student Community</option>
                            <option value="Events">🎓 Events & Workshops</option>
                            <option value="Other">✨ Other Suggestions</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Batch (optional)</label>
                          <select
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-[#4D2C5E] transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjQ1Njc1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem] bg-[length:1.5rem]"
                            value={selectedBatchId}
                            onChange={e => setSelectedBatchId(e.target.value)}
                            disabled={isSubmitting}
                          >
                            <option value="">-- Not batch specific --</option>
                            {batches.map(batch => (
                              <option key={batch._id} value={batch._id}>
                                {batch.course?.courseName} ({batch.batchCode})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Detailed Content
                        </label>
                        <ReactQuill
                          theme="snow"
                          value={content}
                          onChange={setContent}
                          className="bg-white border border-gray-200 rounded-lg"
                          readOnly={isSubmitting}
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
                            {editingId ? 'Updating...' : 'Submitting...'}
                          </>
                        ) : (
                          editingId ? 'Update Suggestion' : 'Submit Suggestion'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TeacherSuggestions;
