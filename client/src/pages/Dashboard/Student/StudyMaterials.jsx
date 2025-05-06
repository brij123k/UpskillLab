import React, { useEffect, useState } from 'react';
import { FiUpload, FiSearch, FiFile, FiDownload, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { getDataHandlerWithToken } from '../../../config/services';
import ApiConfig from '../../../config/apiConfig';

const StudyMaterials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
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
      
      if (courseIds.length === 0) {
        setStudyMaterials([]);
        return;
      }

      // Fetch materials for each course
      const materialsPromises = courseIds.map(courseId => {
        const endpoint = ApiConfig.studyMaterialByCourse(courseId);
        return getDataHandlerWithToken(endpoint, null, null, true);
      });

      const materialsResponses = await Promise.all(materialsPromises);
      const allMaterials = materialsResponses.flatMap(res => res.studyMaterials || []);

      setStudyMaterials(allMaterials);
      setEnrolledCourses(batches);
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
    const extension = fileLink.split('.').pop().toLowerCase();
    return <FiFile className={`mr-2 ${
      extension === 'pdf' ? 'text-red-500' : 
      extension === 'ppt' || extension === 'pptx' ? 'text-orange-500' :
      extension === 'doc' || extension === 'docx' ? 'text-blue-500' :
      extension === 'zip' || extension === 'rar' ? 'text-yellow-500' : 'text-gray-500'
    }`} />;
  };

  const filteredMaterials = studyMaterials.filter(material => {
    console.log(material)
    return material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           material.course?.courseName.toLowerCase().includes(searchQuery.toLowerCase());
  });

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

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search materials..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
              <div className="col-span-3">{material.course?.courseName || 'N/A'}</div>
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
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            {enrolledCourses.length > 0 
              ? "No study materials available for your enrolled courses"
              : "You are not enrolled in any courses yet"}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterials;