import React, { useEffect, useState } from 'react';
import { FiPlus, FiX, FiClock, FiCheckCircle, FiAlertCircle, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { postDataHandlerWithToken, getDataHandlerWithToken, putDataHandlerWithToken } from '../../../config/services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherSuggestions = () => {
  const [showModal, setShowModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [batches, setBatches] = useState([]);
  const [teacherProfile, setTeacherProfile] = useState(null);
  
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
        setTeacherProfile(profileResponse);
        
        // Fetch batches taught by this teacher
        const batchesResponse = await getDataHandlerWithToken('upcomingBatches');
        setBatches(batchesResponse || []);
        
        // Fetch teacher's suggestions
        const suggestionsResponse = await getDataHandlerWithToken('teacherSugegstionsget');
        setSuggestions(suggestionsResponse.suggestions || []);
        
      } catch (error) {
        toast.error('Failed to load data');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

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
  const handleEdit = (suggestion) => {
    setTitle(suggestion.title);
    setDescription(suggestion.description);
    setType(suggestion.type);
    setContent(suggestion.content);
    setSelectedBatchId(suggestion.batchId);
    setEditingId(suggestion._id);
    setShowModal(true);
  };

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

        {/* Suggestions List */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8 border border-gray-100">
          {suggestions.length > 0 ? (
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <motion.div 
                  key={suggestion._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gray-200 rounded-lg p-4 md:p-5 hover:shadow-md transition-shadow duration-200 group"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-[#4D2C5E] group-hover:text-[#3A2152] transition-colors">
                        {suggestion.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-xs md:text-sm text-gray-500">
                          {formatDate(suggestion.createdAt)}
                        </span>
                        <span className="hidden md:block text-gray-300">•</span>
                        <span className="text-xs md:text-sm text-gray-500 capitalize">
                          {suggestion.type}
                        </span>
                        {suggestion.batchId && (
                          <>
                            <span className="hidden md:block text-gray-300">•</span>
                            <span className="text-xs md:text-sm text-gray-500">
                              {batches.find(b => b._id === suggestion.batchId)?.batchCode || 'N/A'}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      {suggestion.isApproved ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs md:text-sm font-medium bg-green-100 text-green-800">
                          <FiCheckCircle className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs md:text-sm font-medium bg-yellow-100 text-yellow-800">
                          <FiClock className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-700">{suggestion.description}</p>
                    {suggestion.content && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md">
                        <h4 className="text-xs md:text-sm font-medium text-gray-500 mb-1">Detailed Content:</h4>
                        <p className="text-gray-700 whitespace-pre-line text-sm md:text-base">
                          {suggestion.content}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      {suggestion.batchId && (
                        <span className="inline-block bg-[#4D2C5E]/10 text-[#4D2C5E] text-xs px-2 py-1 rounded md:hidden">
                          Batch: {batches.find(b => b._id === suggestion.batchId)?.batchCode || 'N/A'}
                        </span>
                      )}
                    </div>
                    {/* <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(suggestion)}
                        className="text-[#4D2C5E] hover:text-[#FF7426] p-1.5 md:p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        title="Edit"
                      >
                        <FiEdit2 className="h-4 w-4 md:h-5 md:w-5" />
                      </button>
                    </div> */}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <div className="mx-auto w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiAlertCircle className="h-8 w-8 md:h-12 md:w-12 text-gray-400" />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-1">No suggestions yet</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-4">
                You haven't submitted any suggestions yet. Share your ideas to help us improve!
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="text-[#4D2C5E] hover:text-[#3A2152] font-medium flex items-center justify-center mx-auto"
              >
                <FiPlus className="mr-2" />
                Create Your First Suggestion
              </button>
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-[#4D2C5E]">
                      {editingId ? 'Edit Suggestion' : 'New Suggestion'}
                    </h2>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      disabled={isSubmitting}
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Title*</label>
                      <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                        placeholder="Suggestion title"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Description*</label>
                      <textarea
                        rows="3"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                        placeholder="Brief description of your suggestion"
                        required
                        disabled={isSubmitting}
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Type*</label>
                        <select
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                          value={type}
                          onChange={e => setType(e.target.value)}
                          required
                          disabled={isSubmitting}
                        >
                          <option value="curriculum">Curriculum</option>
                          <option value="POST">Post</option>
                          <option value="platform">Platform Improvement</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Batch (optional)</label>
                        <select
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Detailed Content</label>
                      <textarea
                        rows="5"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                        placeholder="Provide detailed information about your suggestion..."
                        disabled={isSubmitting}
                      ></textarea>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          resetForm();
                        }}
                        className="px-4 md:px-5 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 md:px-5 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3A2152] transition-colors duration-200 flex items-center justify-center min-w-32"
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