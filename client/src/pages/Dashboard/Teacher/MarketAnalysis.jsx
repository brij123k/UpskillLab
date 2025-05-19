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
  FiTrash2
} from 'react-icons/fi';
import { deleteDataHandler, postDataHandlerWithTokenFormData, getDataHandler, getDataHandlerWithToken, postDataHandlerWithToken, putDataHandlerWithToken } from '../../../config/services';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import ApiConfig from '../../../config/apiConfig';

const MarketAnalysis = () => {
  const [resources, setResources] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false); // New state for form submission loading
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pdf: null,
    image: null,
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
      console.log(resource)
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
    e.preventDefault(); // Prevent form submission when adding tags
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

  // Set form data for editing
  const handleEdit = (resource) => {
    setEditingResource(resource._id);
    setFormData({
      title: resource.title,
      description: resource.description,
      pdf: null,
      image: null,
      link: resource.link || '',
      isApproved: resource.isApproved,
      tags: resource.tags || [],
      courseId: resource.courseId || '',
      newTag: ''
    });
    setShowForm(true);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingResource(null);
    setShowForm(false);
    setFormData({
      title: '',
      description: '',
      pdf: null,
      image: null,
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
    setFormSubmitting(true); // Start loading
    
    try {
      const formDataToSend = new FormData();
      
      // Append all text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('link', formData.link);
      formDataToSend.append('isApproved', false);
      formDataToSend.append('courseId', formData.courseId);
      
      // Append tags
      formData.tags.forEach(tag => formDataToSend.append('tags', tag));
      
      // Append files only if they exist
      if (formData.pdf) {
        formDataToSend.append('pdf', formData.pdf, formData.pdf.name);
      }
      if (formData.image) {
        formDataToSend.append('image', formData.image, formData.image.name);
      }

      if (editingResource) {
        const endpoint = ApiConfig.resoursebyId(editingResource);
        await putDataHandlerWithToken(endpoint, formDataToSend, null, true);
        toast.success('Resource updated successfully!');
      } else {
        await postDataHandlerWithTokenFormData('resourse', formDataToSend);
        toast.success('Resource added successfully!');
      }
      
      cancelEdit();
      fetchResources();
    } catch (error) {
      console.error('Error saving resource:', error);
      toast.error(`Failed to ${editingResource ? 'update' : 'add'} resource`);
    } finally {
      setFormSubmitting(false); // End loading
    }
  };

  // Delete resource
  const handleDelete = async (resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        const endpoint = ApiConfig.resoursebyId(resourceId);
        await deleteDataHandler(endpoint, true);
        toast.success('Resource deleted successfully!');
        fetchResources();
      } catch (error) {
        console.error('Error deleting resource:', error);
        toast.error('Failed to delete resource');
      }
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
          onClick={() => {
            setEditingResource(null);
            setShowForm(!showForm);
            if (showForm) {
              cancelEdit();
            }
          }}
          className="flex items-center px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#5F3A73] transition-colors shadow-md"
        >
          <FiPlus className="mr-2" />
          {showForm ? 'Cancel' : 'Add Resource'}
        </button>
      </div>

      {/* Add/Edit Resource Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200 animate-fade-in">
          <h2 className="text-xl font-bold text-[#4D2C5E] mb-4">
            {editingResource ? 'Edit Resource' : 'Add New Resource'}
          </h2>
          <form onSubmit={handleSubmit}>
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
                        e.preventDefault(); // Prevent form submission
                        addTag(e); // Call addTag with the event
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
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelEdit}
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
                    Course: {courses.find(c => c._id === resource.courseId)?.title || 'Not assigned'}
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
                    
                    {/* <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(resource)}
                        className="p-1 text-[#4D2C5E] hover:text-[#5F3A73] transition-colors hover:bg-[#4D2C5E]/10 rounded"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(resource._id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors hover:bg-red-500/10 rounded"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div> */}
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
              onClick={() => setShowForm(true)}
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