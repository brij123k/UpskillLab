import React, { useEffect, useState } from 'react';
import { FiUpload, FiSearch, FiFile, FiFolder, FiDownload, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { postDataHandlerWithToken,uploadFileHandler, putDataHandlerWithToken, getDataHandlerWithToken, deleteDataHandler } from '../../../config/services';
import ApiConfig from '../../../config/apiConfig';

const StudyMaterials = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [teacherId, setTeacherId] = useState(null);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [studyMaterialsByTeacher, setStudyMaterialsByTeacher] = useState([]);
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]); // For dropdown
  const [chapters, setChapters] = useState([]); // For dropdown
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    course: '',
    chapter: '',
    fileLink: ''
  });

  // Fetch initial data
  const getStudyMaterial = async () => {
    try {
      setIsLoading(true);
      const response = await getDataHandlerWithToken('studyMaterial');
      const responseid = await getDataHandlerWithToken('teacherProfile');
      
      setTeacherId(responseid._id);
      const endpoint = ApiConfig.studyMaterialByTeacher(responseid._id);
      const responsewithteacher = await getDataHandlerWithToken(endpoint, null, null, true);
      // Extract unique courses for filter tabs
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

  // Fetch all courses for dropdown
  const fetchAllCourses = async () => {
    try {
      const response = await getDataHandlerWithToken('courseDisplay');
      console.log(response)
      setAllCourses(response.data || []);
    } catch (error) {
      toast.error("Failed to load courses");
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch chapters for selected course
  const fetchChaptersForCourse = async (courseId) => {
    try {
      if (!courseId) {
        setChapters([]);
        return;
      }
      const endpoint = ApiConfig.courseByCode(courseId);
      const response = await getDataHandlerWithToken(endpoint, null, null, true);
      console.log(response)
      setChapters(response.chapters || []);
    } catch (error) {
      toast.error("Failed to load chapters");
      console.error('Error fetching chapters:', error);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // For demo, we'll just use a placeholder URL
      // In a real app, you would upload the file to your server here
      setUploadForm(prev => ({
        ...prev,
        fileLink: `https://example.com/uploads/${file.name}`
      }));
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadForm(prev => ({
      ...prev,
      [name]: value
    }));

    // If course changes, fetch its chapters
    if (name === 'course') {
    const selectedCourse = allCourses.find(course => course._id === value);
    const courseCode = selectedCourse?.courseCode;
    // await fetchCourseDetails(courseCode);
      fetchChaptersForCourse(courseCode);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!uploadForm.title || !uploadForm.course || !uploadForm.chapter || !selectedFile) {
        toast.error("Please fill all fields and select a file");
        return;
      }

      // First upload the file
      const fileUploadResponse = await uploadFileHandler('uploadFiles', selectedFile, {
        // Add any additional metadata if needed
        category: 'study-material',
        userId: teacherId
      });
      console.log(fileUploadResponse.files[0].fileUrl)

      if (!fileUploadResponse.files[0]?.fileUrl) {
        throw new Error("File upload failed - no URL returned");
      }

      // Then create the study material record
      const payload = {
        title: uploadForm.title,
        fileLink: fileUploadResponse.files[0].fileUrl, // Use the URL from file upload
        course: uploadForm.course,
        chapter: uploadForm.chapter,
        teacher: teacherId
      };

      const response = await postDataHandlerWithToken('studyMaterial', payload);
      console.log(response)
      toast.success("Material uploaded successfully");
      setIsUploadModalOpen(false);
      getStudyMaterial(); // Refresh the list
      resetForm();
    } catch (error) {
      console.error('Error in upload process:', error);
      toast.error(error.response?.data?.message || "Failed to upload material");
    }
  };

  // Reset form
  const resetForm = () => {
    setUploadForm({
      title: '',
      course: '',
      chapter: '',
      fileLink: ''
    });
    setSelectedFile(null);
  };

  const handleDeleteMaterial = async (materialId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this material?");
      if (!confirmDelete) return;
      const endpoint = ApiConfig.studyMaterialById(materialId);
      await deleteDataHandler(endpoint, true);
      toast.success("Material deleted successfully");
      getStudyMaterial(); // Refresh the list
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
    <div className="p-6">
      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-[#00000050] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-bold text-[#4D2C5E]">Upload Study Material</h2>
              <button 
                onClick={() => {
                  setIsUploadModalOpen(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={uploadForm.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <select
                  name="course"
                  value={uploadForm.course}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]"
                  required
                >
                  <option value="">Select a course</option>
                  {allCourses.map(course => (
                    <option key={course._id} value={course._id}>
                      {course.courseName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Chapter</label>
                <select
                  name="chapter"
                  value={uploadForm.chapter}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]"
                  required
                  disabled={!uploadForm.course}
                >
                  <option value="">Select a chapter</option>
                  {chapters.map(chapter => (
                    <option key={chapter._id} value={chapter._id}>
                      {chapter.name} (Week {chapter.week}, Session {chapter.session})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                <div className="flex items-center">
                  <label className="flex flex-col items-center px-4 py-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                    <FiUpload className="mr-2" />
                    <span>{selectedFile ? selectedFile.name : 'Choose file'}</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3A2152]"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#4D2C5E]">Study Materials</h1>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center bg-[#FF7426] text-white px-4 py-2 rounded-lg hover:bg-[#E65100]"
        >
          <FiUpload className="mr-2" />
          Upload New Material
        </button>
      </div>

      {/* Rest of your existing code... */}
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'all' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              All Materials
            </button>
            {courses.map(course => (
              <button
                key={course.id}
                onClick={() => setActiveTab(course.name)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === course.name ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {course.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Materials List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 font-semibold text-[#4D2C5E] border-b">
          <div className="col-span-6">Name</div>
          <div className="col-span-3">Course</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1">Actions</div>
        </div>
        
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map(material => (
            <div key={material._id} className="grid grid-cols-12 p-4 items-center border-b hover:bg-gray-50">
              <div className="col-span-6 flex items-center">
                {getFileIcon(material.fileLink)}
                <div>
                  <div className="font-medium">{material.title}</div>
                  <div className="text-xs text-gray-500">
                    {material.chapter?.name || 'No chapter specified'}
                  </div>
                </div>
              </div>
              <div className="col-span-3">{material.course.courseName}</div>
              <div className="col-span-2 text-sm text-gray-500">
                {formatDate(material.createdAt)}
              </div>
              <div className="col-span-1 flex justify-end space-x-2">
                <a 
                  href={material.fileLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#4D2C5E] hover:text-[#FF7426]"
                >
                  <FiDownload />
                </a>
                <button 
                  onClick={() => handleDeleteMaterial(material._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            No materials found. Upload your first study material!
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterials;