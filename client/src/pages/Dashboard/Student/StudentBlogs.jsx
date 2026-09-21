import React, { useState, useEffect } from 'react';
import { 
  FiEdit2, 
  FiTrash2, 
  FiPlus, 
  FiX, 
  FiCheck, 
  FiUser, 
  FiLink2, 
  FiSearch, 
  FiFilter,
  FiEye
} from 'react-icons/fi';
import { 
  getDataHandlerWithToken, 
  postDataHandlerWithTokenFormData, 
  putDataHandlerWithTokenFormData, 
  deleteDataHandler 
} from '../../../config/services';
import ApiConfig from '../../../config/apiConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import BlogContentRenderer from '../../../components/BlogContentRenderer';

const ResourceModal = ({
  editingBlog,
  closeModal,
  handleSubmit,
  formData,
  handleInputChange,
  handleImageChange,
  handleEditorChange,
  formSubmitting,
  previewImage
}) => {
  const [editorContent, setEditorContent] = useState(formData.description || '');

  const handleDescriptionChange = (content) => {
    setEditorContent(content);
    handleEditorChange(content);
  };

  const modules = {
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
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align', 'code-block'
  ];

  return (
    <div className="fixed inset-0 bg-[#000000cc] z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-[#4D2C5E]">
            {editingBlog ? 'Edit Blog' : 'Create New Blog'}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-[#FF7426] transition-colors p-1"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Modal Body - Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Title */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-[#FF7426]">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent"
                  required
                  placeholder="Enter blog title"
                />
              </div>

              {/* Tag */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tag <span className="text-[#FF7426]">*</span>
                </label>
                <input
                  type="text"
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent"
                  required
                  placeholder="Enter a tag (e.g., Technology, Education)"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full opacity-0 absolute h-full cursor-pointer"
                    id="image-upload"
                  />
                  <label 
                    htmlFor="image-upload"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <FiPlus className="text-[#4D2C5E] mr-2" />
                      <span className="text-gray-700">
                        {formData.image?.name || 'Choose image file'}
                      </span>
                    </div>
                  </label>
                </div>
                {(previewImage || (editingBlog && formData.image && typeof formData.image === 'string')) && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Preview Image:</p>
                    <img 
                      src={previewImage || formData.image} 
                      alt="Preview" 
                      className="h-24 object-contain rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/200x150?text=No+Image';
                      }}
                    />
                  </div>
                )}
                {editingBlog && (
                  <p className="text-xs text-gray-500 mt-2">Leave empty to keep existing image</p>
                )}
              </div>
            </div>

            {/* Rich Text Editor */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-[#FF7426]">*</span>
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <ReactQuill
                  value={editorContent}
                  onChange={handleDescriptionChange}
                  modules={modules}
                  formats={formats}
                  className="h-[300px] sm:h-[400px]"
                  placeholder="Write your blog content here..."
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Tip: Use headers, lists, and media to make your blog more engaging
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 border-t border-gray-200 pt-6 pb-4 sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                disabled={formSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#5F3A73] transition-colors shadow-md flex items-center justify-center min-w-[180px]"
                disabled={formSubmitting}
              >
                {formSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {editingBlog ? 'Updating...' : 'Publishing...'}
                  </>
                ) : (
                  editingBlog ? 'Update Blog' : 'Publish Blog'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const StudentBlogs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    tag: ''
  });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '',
    image: null,
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
      setFormData({
        title: '',
        description: '',
        tag: '',
        image: null,
        approvedByAdmin: false
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error(error.response?.data?.message || 'Failed to save blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteDataHandler(ApiConfig.studentBlogById(deleteId), true);
      toast.success('Blog deleted successfully!');
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
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
      image: blog.image || null,
      approvedByAdmin: blog.approvedByAdmin
    });
    setPreviewImage(null);
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setShowViewModal(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setShowForm(false);
    setCurrentBlogId(null);
    setPreviewImage(null);
    setFormData({
      title: '',
      description: '',
      tag: '',
      image: null,
      approvedByAdmin: false
    });
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedBlog(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                         blog.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || 
                         (filters.status === 'approved' && blog.approvedByAdmin) || 
                         (filters.status === 'pending' && !blog.approvedByAdmin);
    const matchesTag = !filters.tag || blog.tag === filters.tag;
    return matchesSearch && matchesStatus && matchesTag;
  });

  const allTags = [...new Set(blogs.map(blog => blog.tag))].filter(tag => tag);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#4D2C5E] mb-4 sm:mb-0">My Blogs</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#5F3A73] transition-colors w-full sm:w-auto"
            >
              <FiPlus className="mr-2" />
              Add New Blog
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Blog Form Modal */}
        {showForm && (
          <ResourceModal
            editingBlog={editMode ? currentBlogId : null}
            closeModal={handleCancel}
            handleSubmit={handleSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            handleEditorChange={handleEditorChange}
            formSubmitting={isSubmitting}
            previewImage={previewImage}
          />
        )}

        {/* Blog List */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map(blog => (
              <div 
                key={blog._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {blog.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                      }}
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-[#4D2C5E] line-clamp-1">{blog.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${blog.approvedByAdmin ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {blog.approvedByAdmin ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  {blog.tag && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                      #{blog.tag}
                    </span>
                  )}
                  <div 
                    className="text-sm text-gray-600 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  />
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(blog)}
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
                        title="View"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-1.5 text-[#4D2C5E] hover:text-[#FF7426] hover:bg-[#FF7426]/10 rounded-full transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => {
                          setShowDeleteModal(true);
                          setDeleteId(blog._id);
                        }}
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
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#5F3A73] transition-colors mx-auto"
            >
              <FiPlus className="mr-2" />
              Add Your First Blog
            </button>
          </div>
        )}

        {/* View Blog Modal */}
        {showViewModal && selectedBlog && (
          <div className="fixed inset-0 bg-[#000000cc] z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div 
              className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-bold text-[#4D2C5E]">
                  {selectedBlog.title}
                </h2>
                <button
                  onClick={closeViewModal}
                  className="text-gray-500 hover:text-[#FF7426] transition-colors p-1"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Modal Body - Scrollable Content */}
              <div className="overflow-y-auto flex-1 px-6 py-4">
                {selectedBlog.image && (
                  <img 
                    src={selectedBlog.image} 
                    alt={selectedBlog.title}
                    className="w-full max-h-64 object-contain rounded-lg mb-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                    }}
                  />
                )}
                
                {selectedBlog.tag && (
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-[#4D2C5E]/10 text-[#4D2C5E] text-sm rounded-full">
                      #{selectedBlog.tag}
                    </span>
                  </div>
                )}

                {/* <div 
                  className="text-gray-800"
                  dangerouslySetInnerHTML={{ __html: selectedBlog.description }}
                /> */}
                <BlogContentRenderer content={selectedBlog.description} />

                <div className="mt-4 text-sm text-gray-500">
                  Published: {new Date(selectedBlog.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end p-6 border-t border-gray-200 sticky bottom-0 bg-white">
                <button
                  onClick={closeViewModal}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-[#00000075] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
              <h2 className="text-xl font-semibold text-[#4D2C5E] mb-4">Confirm Deletion</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this blog? This action cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteId(null);
                  }}
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