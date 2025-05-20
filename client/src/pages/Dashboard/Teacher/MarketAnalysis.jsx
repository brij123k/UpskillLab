import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  FiTrendingUp, 
  FiBarChart2, 
  FiDollarSign, 
  FiBook, 
  FiPlus,
  FiLink,
  FiDownload,
  FiCheckCircle,
  FiXCircle,
  FiEdit2,
  FiTrash2,
  FiX
} from 'react-icons/fi';
import { deleteDataHandler, postDataHandlerWithTokenFormData, getDataHandler, getDataHandlerWithToken, postDataHandlerWithToken, putDataHandlerWithTokenFormData } from '../../../config/services';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import ApiConfig from '../../../config/apiConfig';

const MarketAnalysis = () => {
  const [resources, setResources] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [editingResource, setEditingResource] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pdf: null,
    image: null,
    existingPdf: null,
    existingImage: null,
    link: '',
    isApproved: false,
    tags: [],
    courseId: '',
    newTag: ''
  });

  // Fetch resources
  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await getDataHandlerWithToken('resourse');
      const courseResponse = await getDataHandler('courseDisplay');
      setCourses(courseResponse.data || []);
      setResources(response.resources || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'pdf' || name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle description change for rich text editor
  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  // Add new tag
  const addTag = (e) => {
    e.preventDefault();
    if (formData.newTag && !formData.tags.includes(formData.newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.newTag],
        newTag: ''
      });
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Open modal for adding new resource
  const openAddModal = () => {
    setEditingResource(null);
    setFormData({
      title: '',
      description: '',
      pdf: null,
      image: null,
      existingPdf: null,
      existingImage: null,
      link: '',
      isApproved: false,
      tags: [],
      courseId: '',
      newTag: ''
    });
    setShowModal(true);
  };

  // Open modal for editing resource
  const openEditModal = (resource) => {
    setEditingResource(resource._id);
    setFormData({
      title: resource.title,
      description: resource.description,
      pdf: null,
      image: null,
      existingPdf: resource.pdf || null,
      existingImage: resource.image || null,
      link: resource.link || '',
      isApproved: resource.isApproved,
      tags: resource.tags || [],
      courseId: resource.courseId?._id || resource.courseId || '',
      newTag: ''
    });
    setShowModal(true);
  };

  // Close modal and reset form
  const closeModal = () => {
    setShowModal(false);
    setEditingResource(null);
    setFormData({
      title: '',
      description: '',
      pdf: null,
      image: null,
      existingPdf: null,
      existingImage: null,
      link: '',
      isApproved: false,
      tags: [],
      courseId: '',
      newTag: ''
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('link', formData.link);
      formDataToSend.append('isApproved', formData.isApproved);
      formDataToSend.append('courseId', formData.courseId);
      
      formData.tags.forEach(tag => formDataToSend.append('tags', tag));
      
      // Only append new files if they exist, otherwise keep existing ones
      if (formData.pdf) {
        formDataToSend.append('pdf', formData.pdf, formData.pdf.name);
      } else if (formData.existingPdf && !formData.pdf) {
        // If no new PDF uploaded but existing PDF exists, keep the existing one
        formDataToSend.append('existingPdf', formData.existingPdf);
      }
      
      if (formData.image) {
        formDataToSend.append('image', formData.image, formData.image.name);
      } else if (formData.existingImage && !formData.image) {
        // If no new image uploaded but existing image exists, keep the existing one
        formDataToSend.append('existingImage', formData.existingImage);
      }

      if (editingResource) {
        const endpoint = ApiConfig.resoursebyId(editingResource);
        await putDataHandlerWithTokenFormData(endpoint, formDataToSend, null, true);
        toast.success('Resource updated successfully!');
      } else {
        await postDataHandlerWithTokenFormData('resourse', formDataToSend);
        toast.success('Resource added successfully!');
      }
      
      closeModal();
      fetchResources();
    } catch (error) {
      console.error('Error saving resource:', error);
      toast.error(`Failed to ${editingResource ? 'update' : 'add'} resource`);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (resourceId) => {
    setResourceToDelete(resourceId);
    setShowDeleteModal(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setResourceToDelete(null);
  };

  // Delete resource
  const confirmDelete = async () => {
    try {
      const endpoint = ApiConfig.resoursebyId(resourceToDelete);
      await deleteDataHandler(endpoint, true);
      toast.success('Resource deleted successfully!');
      fetchResources();
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error('Failed to delete resource');
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E] mb-6">Market Analysis & Resources</h1>
      
      {/* Add Resource Button */}
      <div className="mb-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {resources.length} resources available
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#5F3A73] transition-colors shadow-md"
        >
          <FiPlus className="mr-2" />
          Add Resource
        </button>
      </div>

      {/* Add/Edit Resource Modal */}
      {showModal && (
        <div className="fixed  inset-0 bg-[#0000008c] bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white beautiful-scrollbar rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-[#4D2C5E]">
                {editingResource ? 'Edit Resource' : 'Add New Resource'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
                  <select
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]"
                    required
                  >
                    <option value="">Select a course</option>
                    {courses.map(course => (
                      <option key={course._id} value={course._id}>
                        {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <ReactQuill
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    theme="snow"
                    className="border h-[200px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E] mb-4"
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link', 'image'],
                        ['clean']
                      ]
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">External Link</label>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]"
                    placeholder="https://example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
                  <div className="relative">
                    <input
                      type="file"
                      name="pdf"
                      onChange={handleInputChange}
                      accept=".pdf"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E] file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#4D2C5E]/10 file:text-[#4D2C5E] hover:file:bg-[#4D2C5E]/20"
                    />
                  </div>
                  {editingResource && formData.existingPdf && !formData.pdf && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Current PDF:</p>
                      <a 
                        href={formData.existingPdf} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm flex items-center"
                      >
                        <FiDownload className="mr-1" /> View current PDF
                      </a>
                    </div>
                  )}
                  {editingResource && (
                    <p className="text-xs text-gray-500 mt-1">Leave empty to keep existing file</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <div className="relative">
                    <input
                      type="file"
                      name="image"
                      onChange={handleInputChange}
                      accept="image/*"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E] file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#4D2C5E]/10 file:text-[#4D2C5E] hover:file:bg-[#4D2C5E]/20"
                    />
                  </div>
                  {editingResource && formData.existingImage && !formData.image && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Current Image:</p>
                      <img 
                        src={formData.existingImage} 
                        alt="Current resource" 
                        className="h-20 object-contain mt-1"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                        }}
                      />
                    </div>
                  )}
                  {editingResource && (
                    <p className="text-xs text-gray-500 mt-1">Leave empty to keep existing image</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags *</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={formData.newTag}
                      onChange={(e) => setFormData({...formData, newTag: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]"
                      placeholder="Add new tag"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag(e);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-[#4D2C5E] text-white rounded-md hover:bg-[#5F3A73] transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                        <span className="text-sm">{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-gray-500 hover:text-red-500"
                        >
                          <FiXCircle size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                  disabled={formSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4D2C5E] text-white rounded-md hover:bg-[#5F3A73] transition-colors shadow-md flex items-center justify-center min-w-[150px]"
                  disabled={formSubmitting}
                >
                  {formSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {editingResource ? 'Updating...' : 'Submitting...'}
                    </>
                  ) : (
                    editingResource ? 'Update Resource' : 'Submit Resource'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-bold text-[#4D2C5E]">
                Confirm Deletion
              </h2>
              <button
                onClick={closeDeleteModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-6">Are you sure you want to delete this resource? This action cannot be undone.</p>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-md"
                >
                  Delete Resource
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resources List */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 flex items-center">
          <FiBook className="mr-2" />
          Available Resources
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
          </div>
        ) : resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map(resource => (
              <div key={resource._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                {resource.image ? (
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={resource.image} 
                      alt={resource.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-r from-[#4D2C5E]/10 to-[#FF7426]/10 flex items-center justify-center">
                    <FiBook className="text-4xl text-gray-400" />
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-[#4D2C5E] line-clamp-1">{resource.title}</h3>
                    <span className={`flex items-center text-xs ${
                      resource.isApproved ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {resource.isApproved ? (
                        <FiCheckCircle className="mr-1" />
                      ) : (
                        <FiXCircle className="mr-1" />
                      )}
                      {resource.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-1 line-clamp-1">
                    Course: {courses.find(c => c._id === resource.courseId)?.courseName || 'Not assigned'}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource.tags?.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full line-clamp-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: resource.description }} />
                  
                  <div className="flex flex-wrap gap-2 justify-between">
                    <div className="flex gap-2">
                      {resource.link && (
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-1 bg-[#4D2C5E]/10 text-[#4D2C5E] rounded-md text-sm hover:bg-[#4D2C5E]/20 transition-colors"
                        >
                          <FiLink className="mr-1" /> Visit
                        </a>
                      )}
                      {resource.pdf && (
                        <a
                          href={resource.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-1 bg-[#FF7426]/10 text-[#FF7426] rounded-md text-sm hover:bg-[#FF7426]/20 transition-colors"
                        >
                          <FiDownload className="mr-1" /> PDF
                        </a>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(resource)}
                        className="p-1 text-[#4D2C5E] hover:text-[#5F3A73] transition-colors hover:bg-[#4D2C5E]/10 rounded"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => openDeleteModal(resource._id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors hover:bg-red-500/10 rounded"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <FiBook className="mx-auto text-4xl mb-3" />
            <p>No resources available yet</p>
            <button
              onClick={openAddModal}
              className="mt-4 px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#5F3A73] transition-colors"
            >
              Add Your First Resource
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketAnalysis;