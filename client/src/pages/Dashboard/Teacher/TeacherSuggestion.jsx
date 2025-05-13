import React, { useEffect, useState } from 'react';
import { FiPlus, FiX, FiClock, FiCheckCircle, FiAlertCircle, FiEdit2, FiTrash2 } from 'react-icons/fi';
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
        console.log(batchesResponse)
        setBatches(batchesResponse || []);
        
        // Fetch teacher's suggestions
        const suggestionsResponse = await getDataHandlerWithToken('teacherSugegstionsget');
        console.log(suggestionsResponse)
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
      toast.error('Failed to submit suggestion');
      console.error('Submission Error:', error);
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
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#4D2C5E] tracking-tight">My Suggestions</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center bg-[#FF7426] text-white px-5 py-2.5 rounded-lg hover:bg-[#E65100] transition-colors duration-200 shadow-md"
          >
            <FiPlus className="mr-2 h-5 w-5" />
            New Suggestion
          </button>
        </div>

        {/* Suggestions List */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {suggestions.length > 0 ? (
            <div className="space-y-6">
              {suggestions.map(suggestion => (
                <div 
                  key={suggestion._id} 
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-[#4D2C5E]">{suggestion.title}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(suggestion.createdAt)} • {suggestion.type}
                      </p>
                    </div>
                    <div>
                      {suggestion.isApproved ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <FiCheckCircle className="mr-1 h-4 w-4" />
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          <FiClock className="mr-1 h-4 w-4" />
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-700">{suggestion.description}</p>
                    {suggestion.content && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md">
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Detailed Content:</h4>
                        <p className="text-gray-700 whitespace-pre-line">{suggestion.content}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      {suggestion.batchId && (
                        <span className="inline-block bg-[#4D2C5E]/10 text-[#4D2C5E] text-xs px-2 py-1 rounded">
                          Batch: {batches.find(b => b._id === suggestion.batchId)?.batchCode || 'N/A'}
                        </span>
                      )}
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(suggestion)}
                        className="text-[#4D2C5E] hover:text-[#FF7426] p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        title="Edit"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiAlertCircle className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No suggestions yet</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                You haven't submitted any suggestions yet. Click the "New Suggestion" button to share your ideas.
              </p>
            </div>
          )}
        </div>

        {/* New Suggestion Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-[#00000080] backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#4D2C5E]">
                    {editingId ? 'Edit Suggestion' : 'New Suggestion'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Title*</label>
                    <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                      placeholder="Suggestion title"
                      required
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
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Type*</label>
                      <select
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                        value={type}
                        onChange={e => setType(e.target.value)}
                        required
                      >
                        <option value="curriculum">Curriculum</option>
                        {/* <option value="teaching">Teaching Method</option> */}
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
                      rows="6"
                      value={content}
                      onChange={e => setContent(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                      placeholder="Provide detailed information about your suggestion..."
                    ></textarea>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3A2152] transition-colors duration-200"
                    >
                      {editingId ? 'Update Suggestion' : 'Submit Suggestion'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherSuggestions;