import React, { useEffect, useState } from 'react';
import { FiSearch, FiX, FiVideo, FiClock, FiBook, FiArrowDown,FiArrowUp , FiUser, FiChevronDown } from 'react-icons/fi';
import { getDataHandlerWithToken } from '../../../config/services';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import ApiConfig from '../../../config/apiConfig';
const StudentRecordedVideos = () => {
  const [activeCourse, setActiveCourse] = useState('all');
  const [activeTeacher, setActiveTeacher] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  // const [sortOrder, setSortOrder] = useState('old-to-new');
  const navigate = useNavigate();

const getCourses = async () => {
  const profileResponse = await getDataHandlerWithToken('studentProfile');
  const enrolledCourseIds = profileResponse.batch?.map(batch => batch.course) || [];
  
  if (enrolledCourseIds.length > 0) {
    const coursePromises = enrolledCourseIds.map(courseId => {
      const endpoint = ApiConfig.courseDisplaybyId(courseId)
      return getDataHandlerWithToken(endpoint, null, null, true)
    });
    const courseResponses = await Promise.all(coursePromises);
    const validCourses = courseResponses
      .map(response => ({
        _id: response._id,
        name: response.courseName || `Course ${response.course._id}`
      }));
    
    // Add "All Courses" option at the beginning
    setCourses([{ _id: 'all', name: 'All Courses' }, ...validCourses]);
  } else {
    // Even if no courses, still show "All Courses" option
    setCourses([{ _id: 'all', name: 'All Courses' }]);
  }
}
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await getDataHandlerWithToken('recordedVideos');
      
      if (response && response.videos) {
        setVideos(response.videos);       
        // Extract unique teachers from videos
        const uniqueTeachers = response.videos.reduce((acc, video) => {
          const videoTeachers = video.teacherIds || [];
          
          videoTeachers.forEach(teacher => {
            if (!acc.some(t => t._id === teacher._id)) {
              acc.push({
                _id: teacher._id,
                name: teacher.name
              });
            }
          });
          return acc;
        }, []);
        setTeachers([{ _id: 'all', name: 'All Teachers' }, ...uniqueTeachers]);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
    getCourses();
  }, []);

  const filteredVideos = videos.filter(video => {
    const videoCourses = video.courseIds || (video.courseId ? [video.courseId] : []);
    const matchesCourse = activeCourse === 'all' || 
      videoCourses.some(course => course._id === activeCourse);
    
    // Filter by teacher
    const videoTeachers = video.teacherIds || [];
    const matchesTeacher = activeTeacher === 'all' || 
      videoTeachers.some(teacher => teacher._id === activeTeacher);
    
    // Filter by search query
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCourse && matchesTeacher && matchesSearch;
  });

  const formatDuration = (duration) => {
    if (!duration) return '00:00';
    
    if (!duration.includes(':')) {
      const totalSeconds = parseInt(duration);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    }
    
    const parts = duration.split(':');
    if (parts.length === 3) {
      const hours = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    }
    
    return duration;
  };
// const sortedVideos = [...filteredVideos].sort((a, b) => {
//   const dateA = new Date(a.createdAt);
//   const dateB = new Date(b.createdAt);
  
//   if (sortOrder === 'new-to-old') {
//     return dateB - dateA; // Newest first
//   } else {
//     return dateA - dateB; // Oldest first
//   }
// });
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCourseNames = (video) => {
    const videoCourses = video.courseIds || (video.courseId ? [video.courseId] : []);
    return videoCourses.map(course => course.courseName).join(', ');
  };

  const getTeacherNames = (video) => {
    const videoTeachers = video.teacherIds || [];
    return videoTeachers.map(teacher => teacher.name).join(', ');
  };

  const clearFilters = () => {
    setActiveCourse('all');
    setActiveTeacher('all');
    setSearchQuery('');
    // setSortOrder('old-to-new');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#4D2C5E] mb-6">Recorded Videos</h1>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos by title..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Time Sort Dropdown - ADD THIS */}
            {/* <div className="relative">
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 pr-10"
                >
                  <option value="old-to-new">
                    <span className="flex items-center gap-2">
                      <FiArrowUp size={14} />
                      Old to New
                    </span>
                  </option>
                  <option value="new-to-old">
                    <span className="flex items-center gap-2">
                      <FiArrowDown size={14} />
                      New to Old
                    </span>
                  </option>
                  
                </select>
                <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div> */}

          {/* Dropdown Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Course Dropdown */}
            <div className="relative">
              <div className="relative">
                <select
                  value={activeCourse}
                  onChange={(e) => setActiveCourse(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 pr-10"
                >
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Teacher Dropdown */}
            <div className="relative">
              <div className="relative">
                <select
                  value={activeTeacher}
                  onChange={(e) => setActiveTeacher(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 pr-10"
                >
                  {teachers.map(teacher => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(activeCourse !== 'all' || activeTeacher !== 'all' || searchQuery) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {activeCourse !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-[#4D2C5E]/10 text-[#4D2C5E] px-3 py-1 rounded-full text-sm">
                    Course: {courses.find(c => c._id === activeCourse)?.name}
                    <button onClick={() => setActiveCourse('all')} className="ml-1 hover:text-red-600">
                      <FiX size={14} />
                    </button>
                  </span>
                )}
                {activeTeacher !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-[#4D2C5E]/10 text-[#4D2C5E] px-3 py-1 rounded-full text-sm">
                    Teacher: {teachers.find(t => t._id === activeTeacher)?.name}
                    <button onClick={() => setActiveTeacher('all')} className="ml-1 hover:text-red-600">
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
                {/* {sortOrder !== 'new-to-old' && (
                  <span className="inline-flex items-center gap-1 bg-[#4D2C5E]/10 text-[#4D2C5E] px-3 py-1 rounded-full text-sm">
                    Sort: {sortOrder === 'old-to-new' ? 'Old to New' : 'New to Old'}
                    <button onClick={() => setSortOrder('new-to-old')} className="ml-1 hover:text-red-600">
                      <FiX size={14} />
                    </button>
                  </span>
                )} */}
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

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-[#00000049] bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-lg font-bold">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-4">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <ReactPlayer
                  url={selectedVideo.videoUrl}
                  width="100%"
                  height="100%"
                  controls={true}
                />
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Courses:</span> {getCourseNames(selectedVideo)}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Teachers:</span> {getTeacherNames(selectedVideo)}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Duration:</span> {formatDuration(selectedVideo.duration)}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Uploaded:</span> {formatDate(selectedVideo.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Videos List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.length > 0 ? (
            filteredVideos.map(video => (
              <div key={video._id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300">
                {/* Video Thumbnail with 16:9 aspect ratio */}
                <div className="relative">
                  {video.thumbnailUrl ? (
                    <div 
                      className="relative pt-[56.25%] bg-gray-100 cursor-pointer overflow-hidden"
                      onClick={() => navigate(`/Student/videos/${video._id}`)}
                    >
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 p-3 rounded-full transform -translate-y-2">
                          <FiVideo className="text-2xl text-[#4D2C5E]" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="relative pt-[56.25%] bg-gray-200 cursor-pointer"
                      onClick={() => navigate(`/Student/videos/${video._id}`)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FiVideo className="text-4xl text-gray-400" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
                  )}
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
                    {formatDuration(video.duration)}
                  </div>
                </div>
                
                {/* Video Info */}
                <div className="p-4">
                  {/* Title and Status */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-[#4D2C5E] line-clamp-2 text-sm leading-tight">
                      {video.title}
                    </h3>
                    {video.status === 'APPROVED' && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full whitespace-nowrap ml-2 flex-shrink-0">
                        Approved
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2 h-15">
  {video.description 
    ? (video.description.length > 150 
        ? `${video.description.substring(0, 150)}...` 
        : video.description)
    : 'No description available'
  }
</p>

                  {/* Course Information */}
                  <div className="mb-2">
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <FiBook size={12} />
                      <span className="font-medium">Course:</span>
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-1">
                      {getCourseNames(video)}
                    </p>
                  </div>

                  {/* Teacher Information */}
                  <div className="mb-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <FiUser size={12} />
                      <span className="font-medium">Teacher:</span>
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-1">
                      {getTeacherNames(video)}
                    </p>
                  </div>

                  {/* Date and Action Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    {/* <div className="flex items-center text-xs text-gray-500">
                      <FiClock className="mr-1" size={12} />
                      <span>{formatDate(video.createdAt)}</span>
                    </div> */}
                    <button
                      className="px-3 py-1.5 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152] text-xs transition-colors duration-200"
                      onClick={() => navigate(`/Student/videos/${video._id}`)}
                    >
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white p-8 text-center text-gray-500 rounded-lg shadow-sm">
              <FiSearch className="text-4xl mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium text-gray-600 mb-2">No videos found</p>
              <p className="text-sm text-gray-400 mb-4">
                {searchQuery ? `No videos matching "${searchQuery}"` : 'Try adjusting your filters'}
              </p>
              {(activeCourse !== 'all' || activeTeacher !== 'all' || searchQuery) && (
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
      )}
    </div>
  );
};

export default StudentRecordedVideos;