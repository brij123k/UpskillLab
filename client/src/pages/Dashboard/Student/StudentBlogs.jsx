import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiCheck, FiUser, FiLink2, FiSearch, FiFilter } from 'react-icons/fi';
import { getDataHandlerWithToken, postDataHandlerWithTokenFormData, putDataHandlerWithTokenFormData, deleteDataHandler } from '../../../config/services';
import ApiConfig from '../../../config/apiConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const StudentBlogs = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
const [isDeleting, setIsDeleting] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletId,setDeleteId]=useState(null)
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    tag: ''
  });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '',
    image: null, // Changed from string to File object
    approvedByAdmin: false,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  // Fetch student's blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getDataHandlerWithToken("getStudentBlogs");
      setBlogs(response.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorChange = (value) => {
    setFormData(prev => ({ ...prev, description: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('tag', formData.tag);
      formDataToSend.append('approvedByAdmin', formData.approvedByAdmin);
      formDataToSend.append('approvedAt', new Date().toISOString());
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (editMode && currentBlogId) {
        await putDataHandlerWithTokenFormData(
          ApiConfig.studentBlogById(currentBlogId), 
          formDataToSend,
          null,
          true
        );
        toast.success('Blog updated successfully!');
      } else {
        await postDataHandlerWithTokenFormData(
          "studentBlogs", 
          formDataToSend
        );
        toast.success('Blog created successfully!');
      }
      
      setEditMode(false);
      setShowForm(false);
      setCurrentBlogId(null);
      setPreviewImage(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error(error.response?.data?.message || 'Failed to save blog');
    }finally{
        setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
      try {
        await deleteDataHandler(ApiConfig.studentBlogById(deletId), true);
        toast.success('Blog deleted successfully!');
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
        toast.error('Failed to delete blog');
      }finally {
      setShowDeleteModal(false);
      setIsDeleting(false);
    }
  };

  const handleEdit = (blog) => {
    setEditMode(true);
    setShowForm(true);
    setCurrentBlogId(blog._id);
    setFormData({
      title: blog.title,
      description: blog.description,
      tag: blog.tag,
      image: blog.image || ''
    });
  };

  const handleCancel = () => {
    setEditMode(false);
    setShowForm(false);
    setCurrentBlogId(null);
    setFormData({
      title: '',
      description: '',
      tag: '',
      image: ''
    });
  };

  const handleAddBlog = () => {
    setShowForm(true);
    setEditMode(false);
    setCurrentBlogId(null);
    setFormData({
      title: '',
      description: '',
      tag: '',
      image: ''
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredBlogs = blogs.filter(blog => {
    // Search filter
    const matchesSearch = blog.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                         blog.description.toLowerCase().includes(filters.search.toLowerCase());
    
    // Status filter
    const matchesStatus = filters.status === 'all' || 
                         (filters.status === 'approved' && blog.approvedByAdmin) || 
                         (filters.status === 'pending' && !blog.approvedByAdmin);
    
    // Tag filter
    const matchesTag = !filters.tag || blog.tag === filters.tag;
    
    return matchesSearch && matchesStatus && matchesTag;
  });

  // Get all unique tags for filter dropdown
  const allTags = [...new Set(blogs.map(blog => blog.tag))].filter(tag => tag);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-[#4D2C5E] mb-4 md:mb-0">My Blogs</h1>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <button
              onClick={handleAddBlog}
              className="flex items-center px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#5F3A73] transition-colors"
            >
              <FiPlus className="mr-2" />
              Add New Blog
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4D2C5E] focus:border-[#4D2C5E]"
                placeholder="Search blogs..."
              />
            </div>
            
            <div>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4D2C5E] focus:border-[#4D2C5E]"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            
            <div>
              <select
                name="tag"
                value={filters.tag}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4D2C5E] focus:border-[#4D2C5E]"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => setFilters({ search: '', status: 'all', tag: '' })}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <FiFilter className="mr-2" />
              Clear Filters
            </button>
          </div>
        </div>

        {showForm ? (
         <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4D2C5E] focus:border-[#4D2C5E]"
                  required
                  placeholder="Enter blog title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tag*</label>
                <input
                  type="text"
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4D2C5E] focus:border-[#4D2C5E]"
                  required
                  placeholder="Enter a tag (e.g., Technology, Education)"
                />
              </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
              <div className="mt-1 flex items-center">
                <label className="inline-block cursor-pointer">
                  <span className="sr-only">Choose image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-[#4D2C5E] file:text-white
                      hover:file:bg-[#5F3A73]"
                  />
                </label>
              </div>
              {previewImage && (
                <div className="mt-2">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="h-32 object-cover rounded-md"
                  />
                </div>
              )}
              {editMode && formData.image && !previewImage && typeof formData.image === 'string' && (
                <div className="mt-2">
                  <img 
                    src={formData.image} 
                    alt="Current" 
                    className="h-32 object-cover rounded-md"
                  />
                  <p className="text-xs text-gray-500 mt-1">Current image</p>
                </div>
              )}
            </div>

            {/* Rich text editor remains the same */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Content*</label>
              <div className="h-96">
                <ReactQuill
                  value={formData.description}
                  onChange={handleEditorChange}
                  modules={{
                    toolbar: [
                      [{ 'font': [] }],
                      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ 'color': [] }, { 'background': [] }],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
                      [{ 'align': [] }],
                      ['link', 'image', 'video'],
                      ['code-block'],
                      ['clean']
                    ],
                    clipboard: {
                      matchVisual: false,
                    }
                  }}
                  formats={[
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image', 'video',
                    'color', 'background',
                    'align', 'code-block'
                  ]}
                  className="bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-[#4D2C5E] focus:border-[#4D2C5E] h-80"
                  placeholder="Write your blog content here..."
                  style={{ height: '320px' }}
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Tip: Use headers, lists, and media to make your blog more engaging
              </p>
            </div>
          </div>

          {/* Form buttons remain the same */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
  type="submit"
  className="px-4 py-2 bg-[#4D2C5E] text-white rounded-md hover:bg-[#5F3A73] transition-colors flex items-center justify-center min-w-[120px]"
  disabled={isSubmitting}
>
  {isSubmitting ? (
    <>
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {editMode ? 'Updating...' : 'Publishing...'}
    </>
  ) : (
    editMode ? 'Update Blog' : 'Publish Blog'
  )}
</button>
          </div>
        </form>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map(blog => (
              <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                {blog.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#4D2C5E]">{blog.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${blog.approvedByAdmin ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {blog.approvedByAdmin ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  
                  {blog.tag && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                      {blog.tag}
                    </span>
                  )}
                  
                  <div className="prose max-w-none text-gray-600 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.description }} />
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-1.5 text-[#4D2C5E] hover:text-[#FF7426] hover:bg-[#FF7426]/10 rounded-full transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        // onClick={() => handleDelete(blog._id)}
                        onClick={() =>{
                            setShowDeleteModal(true),
                            setDeleteId(blog._id)}
                        }
                            
                        
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-500/10 rounded-full transition-colors"
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
          <div className="text-center py-12">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiUser className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-500 mb-6">You haven't written any blogs yet or no blogs match your filters</p>
            <button
              onClick={handleAddBlog}
              className="flex items-center px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#5F3A73] transition-colors mx-auto"
            >
              <FiPlus className="mr-2" />
              Add Your First Blog
            </button>
          </div>
        )}


        {showDeleteModal && (
          <div className="fixed inset-0 bg-[#00000075] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
              <h2 className="text-xl font-semibold text-[#4D2C5E] mb-4">Confirm Deletion</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete your Blog? This action cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-[#4D2C5E]/30 text-[#4D2C5E] rounded-lg hover:bg-[#4D2C5E]/10 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
  onClick={handleDelete}
  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center min-w-[80px]"
  disabled={isDeleting}
>
  {isDeleting ? (
    <>
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Deleting...
    </>
  ) : 'Delete'}
</button>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default StudentBlogs;