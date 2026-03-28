import React, { useEffect, useState } from 'react';
import { FiUpload, FiSearch, FiFile, FiDownload, FiTrash2, FiX, FiChevronDown } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { getDataHandlerWithToken } from '../../../config/services';
import ApiConfig from '../../../config/apiConfig';

const StudyMaterials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch student profile and enrolled courses
  const fetchStudentProfile = async () => {
    try {
      setIsLoading(true);
      const response = await getDataHandlerWithToken('studentProfile');
      return response.batch || [];
    } catch (error) {
      toast.error("Failed to load student profile");
      console.error('Error fetching student profile:', error);
      return [];
    }
  };

  // Fetch study materials for all enrolled courses
  const fetchStudyMaterials = async () => {
    try {
      const batches = await fetchStudentProfile();
      const courseIds = batches.map(batch => batch.course);
      
      // Set enrolled courses for course options
      if (courseIds.length > 0) {
        const coursePromises = courseIds.map(courseId => {
          const endpoint = ApiConfig.courseDisplaybyId(courseId);
          return getDataHandlerWithToken(endpoint, null, null, true);
        });

        const courseResponses = await Promise.all(coursePromises);
        const courses = courseResponses.map(response => ({
          _id: response._id,
          name: response.courseName || `Course ${response.course?._id || response._id}`
        }));
        
        // Add "All Courses" option
        setCourseOptions([{ _id: 'all', name: 'All Courses' }, ...courses]);
        setEnrolledCourses(batches);
      } else {
        setCourseOptions([{ _id: 'all', name: 'All Courses' }]);
        setEnrolledCourses([]);
      }

      // Fetch materials for each course
      if (courseIds.length === 0) {
        setStudyMaterials([]);
        return;
      }

      const materialsPromises = courseIds.map(courseId => {
        const endpoint = ApiConfig.studyMaterialByCourse(courseId);
        return getDataHandlerWithToken(endpoint, null, null, true);
      });

      const materialsResponses = await Promise.all(materialsPromises);
      const allMaterials = materialsResponses.flatMap(res => res.studyMaterials || []);

      setStudyMaterials(allMaterials);
    } catch (error) {
      toast.error("Failed to load study materials");
      console.error('Error fetching study materials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMaterial = async (materialId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this material?");
      if (!confirmDelete) return;
      
      const endpoint = ApiConfig.studyMaterialById(materialId);
      await deleteDataHandler(endpoint, true);
      toast.success("Material deleted successfully");
      fetchStudyMaterials(); // Refresh the list
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
    const extension = fileLink?.split('.').pop().toLowerCase() || '';
    return <FiFile className={`mr-2 ${
      extension === 'pdf' ? 'text-red-500' : 
      extension === 'ppt' || extension === 'pptx' ? 'text-orange-500' :
      extension === 'doc' || extension === 'docx' ? 'text-blue-500' :
      extension === 'zip' || extension === 'rar' ? 'text-yellow-500' : 'text-gray-500'
    }`} />;
  };

  const filteredMaterials = studyMaterials.filter(material => {
    // Filter by course
    const matchesCourse = selectedCourse === 'all' || 
      material.course?._id === selectedCourse;
    
    // Filter by search query
    const matchesSearch = material.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      material.course?.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.chapter?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCourse && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedCourse('all');
    setSearchQuery('');
  };

  useEffect(() => {
    fetchStudyMaterials();
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
      {/* Main Content */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#4D2C5E]">Study Materials</h1>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials by title, course, or chapter..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Course Dropdown */}
          <div className="relative">
            <div className="relative">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full lg:w-64 px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 pr-10"
              >
                {courseOptions.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedCourse !== 'all' || searchQuery) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {selectedCourse !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-[#4D2C5E]/10 text-[#4D2C5E] px-3 py-1 rounded-full text-sm">
                    Course: {courseOptions.find(c => c._id === selectedCourse)?.name}
                    <button onClick={() => setSelectedCourse('all')} className="ml-1 hover:text-red-600">
                      <FiX size={14} />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-[#4D2C5E]/10 text-[#4D2C5E] px-3 py-1 rounded-full text-sm">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-red-600">
                      <FiX size={14} />
                    </button>
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Materials Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredMaterials.length} of {studyMaterials.length} materials
      </div>

      {/* Materials List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 font-semibold text-[#4D2C5E] border-b">
          <div className="col-span-5">Name</div>
          <div className="col-span-3">Course</div>
          <div className="col-span-2">Chapter</div>
          <div className="col-span-1">Actions</div>
        </div>
        
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map(material => (
            <div key={material._id} className="grid grid-cols-12 p-4 items-center border-b hover:bg-gray-50">
              <div className="col-span-5 flex items-center">
                {getFileIcon(material.fileLink)}
                <div>
                  <div className="font-medium truncate max-w-[300px]">{material.title}</div>
                  <div className="text-xs text-gray-500">
                    {material.fileLink?.split('/').pop() || 'No file name'}
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                  {material.course?.courseName || 'N/A'}
                </span>
              </div>
              <div className="col-span-2 text-sm text-gray-600">
                {material.chapter?.name || 'No chapter'}
              </div>
              <div className="col-span-1 flex justify-end">
                <a 
                  href={material.fileLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-[#4D2C5E] hover:text-[#FF7426] hover:bg-gray-100 rounded-lg transition-colors"
                  title="Download"
                >
                  <FiDownload />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            <FiSearch className="text-4xl mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium text-gray-600 mb-2">No materials found</p>
            <p className="text-sm text-gray-400 mb-4">
              {searchQuery ? `No materials matching "${searchQuery}"` : 
               selectedCourse !== 'all' ? 'No materials for selected course' : 
               enrolledCourses.length > 0 
                ? "No study materials available for your enrolled courses"
                : "You are not enrolled in any courses yet"}
            </p>
            {(selectedCourse !== 'all' || searchQuery) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152] transition-colors duration-200"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterials;