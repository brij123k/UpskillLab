import React, { useEffect, useState } from 'react';
import { FiUpload, FiSearch, FiFile, FiFolder, FiDownload, FiTrash2, FiX, FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { postDataHandlerWithToken, uploadFileHandler, putDataHandlerWithToken, getDataHandlerWithToken, deleteDataHandler } from '../../../config/services';
import ApiConfig from '../../../config/apiConfig';

const StudyMaterials = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [teacherId, setTeacherId] = useState(null);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [studyMaterialsByTeacher, setStudyMaterialsByTeacher] = useState([]);
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    course: '',
    chapter: '',
    fileLink: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentMaterialId, setCurrentMaterialId] = useState(null);

  // Fetch initial data
  const getStudyMaterial = async () => {
    try {
      setIsLoading(true);
      const response = await getDataHandlerWithToken('studyMaterial');
      const responseid = await getDataHandlerWithToken('teacherProfile');
      
      setTeacherId(responseid._id);
      const endpoint = ApiConfig.studyMaterialByTeacher(responseid._id);
      const responsewithteacher = await getDataHandlerWithToken(endpoint, null, null, true);
      
      const uniqueCourses = Array.from(new Set(
        responsewithteacher.studyMaterials.map(mat => mat.course.courseName)
      )).map((courseName, index) => ({
        id: index + 1,
        name: courseName
      }));

      setStudyMaterials(response.studyMaterials || []);
      setStudyMaterialsByTeacher(responsewithteacher.studyMaterials || []);
      setCourses(uniqueCourses);
    } catch (error) {
      toast.error("Failed to load study materials");
      console.error('Error fetching study materials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const response = await getDataHandlerWithToken('courseDisplay');
      setAllCourses(response.data || []);
    } catch (error) {
      toast.error("Failed to load courses");
      console.error('Error fetching courses:', error);
    }
  };

  const fetchChaptersForCourse = async (courseId) => {
    try {
      if (!courseId) {
        setChapters([]);
        return;
      }
      const endpoint = ApiConfig.courseByCode(courseId);
      const response = await getDataHandlerWithToken(endpoint, null, null, true);
      setChapters(response.chapters || []);
    } catch (error) {
      toast.error("Failed to load chapters");
      console.error('Error fetching chapters:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadForm(prev => ({
        ...prev,
        fileLink: `https://example.com/uploads/${file.name}`
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'course') {
      const selectedCourse = allCourses.find(course => course._id === value);
      const courseCode = selectedCourse?.courseCode;
      fetchChaptersForCourse(courseCode);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      if (!uploadForm.title || !uploadForm.course || !uploadForm.chapter || (!selectedFile && !isEditing)) {
        toast.error("Please fill all required fields");
        return;
      }

      let fileUrl = uploadForm.fileLink;
      
      if (!isEditing && selectedFile) {
        const fileUploadResponse = await uploadFileHandler('uploadFiles', selectedFile, {
          category: 'study-material',
          userId: teacherId
        });
        fileUrl = fileUploadResponse.files[0].fileUrl;
      }

      const payload = {
        title: uploadForm.title,
        fileLink: fileUrl,
        course: uploadForm.course,
        chapter: uploadForm.chapter,
        teacher: teacherId
      };

      if (isEditing) {
        const endpoint = ApiConfig.studyMaterialById(currentMaterialId);
        await putDataHandlerWithToken(endpoint, payload, true);
        toast.success("Material updated successfully");
      } else {
        await postDataHandlerWithToken('studyMaterial', payload);
        toast.success("Material uploaded successfully");
      }
      
      setIsUploadModalOpen(false);
      getStudyMaterial();
      resetForm();
    } catch (error) {
      console.error('Error in upload process:', error);
      toast.error(error.response?.data?.message || "Failed to process material");
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setUploadForm({
      title: '',
      course: '',
      chapter: '',
      fileLink: ''
    });
    setSelectedFile(null);
    setIsEditing(false);
    setCurrentMaterialId(null);
  };

  const handleEditMaterial = (material) => {
    setUploadForm({
      title: material.title,
      course: material.course._id,
      chapter: material.chapter?._id || '',
      fileLink: material.fileLink
    });
    setCurrentMaterialId(material._id);
    setIsEditing(true);
    setIsUploadModalOpen(true);
    
    // Fetch chapters for the selected course
    fetchChaptersForCourse(material.course.courseCode);
  };

  const handleDeleteMaterial = async (materialId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this material?");
      if (!confirmDelete) return;
      const endpoint = ApiConfig.studyMaterialById(materialId);
      await deleteDataHandler(endpoint, true);
      toast.success("Material deleted successfully");
      getStudyMaterial();
    } catch (error) {
      toast.error("Failed to delete material");
      console.error('Error deleting material:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getFileIcon = (fileLink) => {
    const extension = fileLink.split('.').pop().toLowerCase();
    switch(extension) {
      case 'pdf': return <FiFile className="text-red-500 mr-2" />;
      case 'ppt': case 'pptx': return <FiFile className="text-orange-500 mr-2" />;
      case 'doc': case 'docx': return <FiFile className="text-blue-500 mr-2" />;
      case 'zip': case 'rar': return <FiFolder className="text-yellow-500 mr-2" />;
      default: return <FiFile className="text-gray-500 mr-2" />;
    }
  };

  const filteredMaterials = studyMaterialsByTeacher.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         material.course.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || material.course.courseName === activeTab;
    return matchesSearch && matchesTab;
  });

  useEffect(() => {
    getStudyMaterial();
    fetchAllCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Upload/Edit Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#00000065] bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold text-[#4D2C5E]">
                  {isEditing ? 'Edit Study Material' : 'Upload Study Material'}
                </h2>
                <button 
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={isUploading}
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={uploadForm.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-transparent transition-all"
                      required
                      disabled={isUploading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                    <select
                      name="course"
                      value={uploadForm.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-transparent transition-all"
                      required
                      disabled={isUploading}
                    >
                      <option value="">Select a course</option>
                      {allCourses.map(course => (
                        <option key={course._id} value={course._id}>
                          {course.courseName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chapter</label>
                    <select
                      name="chapter"
                      value={uploadForm.chapter}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-transparent transition-all"
                      required
                      disabled={!uploadForm.course || isUploading}
                    >
                      <option value="">Select a chapter</option>
                      {chapters.map(chapter => (
                        <option key={chapter._id} value={chapter._id}>
                          {chapter.name} (Week {chapter.week}, Session {chapter.session})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
                    <div className="flex items-center">
                      <label className={`flex flex-col items-center px-4 py-3 bg-white rounded-lg border border-gray-200 w-full ${isUploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50'} transition-colors`}>
                        <div className="flex items-center">
                          <FiUpload className="mr-2 text-[#4D2C5E]" />
                          <span className="truncate max-w-xs">
                            {selectedFile ? selectedFile.name : (isEditing ? 'Current file will be used' : 'Choose file')}
                          </span>
                        </div>
                        {!isEditing && (
                          <span className="text-xs text-gray-500 mt-1">Click to select a file</span>
                        )}
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileChange}
                          required={!isEditing}
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                    {isEditing && uploadForm.fileLink && (
                      <div className="mt-2 text-xs text-gray-500">
                        Current file: <a href={uploadForm.fileLink} target="_blank" rel="noopener noreferrer" className="text-[#4D2C5E] hover:underline">View file</a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsUploadModalOpen(false);
                      resetForm();
                    }}
                    className="px-5 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3A2152] transition-colors flex items-center justify-center min-w-24"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {isEditing ? 'Updating...' : 'Uploading...'}
                      </>
                    ) : (
                      isEditing ? 'Update' : 'Upload'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">Study Materials</h1>
            <p className="text-gray-500">Manage and organize your teaching resources</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center bg-gradient-to-r from-[#FF7426] to-[#FF9142] text-white px-5 py-3 rounded-lg hover:shadow-md transition-all shadow-sm"
          >
            <FiUpload className="mr-2" />
            Upload New Material
          </motion.button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-5 rounded-xl shadow-sm mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search materials by title or course..."
                className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeTab === 'all' ? 'bg-[#4D2C5E] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                All Materials
              </motion.button>
              {courses.map(course => (
                <motion.button
                  key={course.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab(course.name)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeTab === course.name ? 'bg-[#4D2C5E] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {course.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Materials Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 bg-[#F9F5FF] p-4 font-semibold text-[#4D2C5E] border-b">
            <div className="col-span-5 md:col-span-6">Material</div>
            <div className="col-span-3">Course</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>
          
          {/* Table Body */}
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((material, index) => (
              <motion.div 
                key={material._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-12 p-4 items-center border-b hover:bg-gray-50/50 group"
              >
                {/* Material Name - Responsive */}
                <div className="col-span-8 md:col-span-6 flex items-center">
                  {getFileIcon(material.fileLink)}
                  <div>
                    <div className="font-medium text-[#4D2C5E] group-hover:text-[#3A2152] transition-colors">
                      {material.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {material.chapter?.name || 'No chapter specified'}
                      {material.chapter?.week && ` • Week ${material.chapter.week}`}
                    </div>
                  </div>
                </div>
                
                {/* Course - Hidden on mobile */}
                <div className="hidden md:block col-span-3 text-sm text-gray-700">
                  {material.course.courseName}
                </div>
                
                {/* Date - Responsive */}
                <div className="col-span-4 md:col-span-2 text-xs md:text-sm text-gray-500">
                  {formatDate(material.createdAt)}
                </div>
                
                {/* Actions - Responsive */}
                <div className="col-span-12 md:col-span-1 flex justify-end space-x-3 mt-3 md:mt-0">
                  <a 
                    href={material.fileLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#4D2C5E] hover:text-[#FF7426] transition-colors p-2 rounded-full hover:bg-[#4D2C5E]/10"
                    title="Download"
                  >
                    <FiDownload />
                  </a>
                  {/* <button 
                    onClick={() => handleEditMaterial(material)}
                    className="text-[#4D2C5E] hover:text-[#4D2C5E]/80 transition-colors p-2 rounded-full hover:bg-[#4D2C5E]/10"
                    title="Edit"
                  >
                    <FiEdit />
                  </button> */}
                  <button 
                    onClick={() => handleDeleteMaterial(material._id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-500/10"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <FiFile className="mx-auto text-4xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">No materials found</h3>
              <p className="text-gray-400 mb-4">
                {searchQuery ? 'Try a different search term' : 'Upload your first study material to get started'}
              </p>
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="text-[#4D2C5E] hover:text-[#3A2152] font-medium flex items-center justify-center mx-auto"
              >
                <FiUpload className="mr-2" />
                Upload Material
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;