import React, { useEffect, useState } from 'react';
import { FiSearch,FiX, FiVideo, FiDownload, FiClock, FiBook } from 'react-icons/fi';
import { getDataHandlerWithToken } from '../../../config/services';
import ReactPlayer from 'react-player'; // For video playback
import { useNavigate } from 'react-router-dom';

const StudentRecordedVideos = () => {
  const [activeCourse, setActiveCourse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await getDataHandlerWithToken('recordedVideos');
      const Profile = await getDataHandlerWithToken('studentProfile');
      console.log(Profile)
      if (response && response.videos) {
        setVideos(response.videos);
        
        // Extract unique courses from videos
        const uniqueCourses = response.videos.reduce((acc, video) => {
          if (!acc.some(course => course._id === video.courseId._id)) {
            acc.push({
              _id: video.courseId._id,
              name: video.courseId.courseName
            });
          }
          return acc;
        }, []);
        setCourses(uniqueCourses);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const filteredVideos = videos.filter(video => {
    const matchesCourse = activeCourse === 'all' || 
                         (video.courseId && video.courseId._id === activeCourse);
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  const formatDuration = (duration) => {
    if (!duration) return '00:00';
    // Convert "01:30:00" to "1h 30m"
    const parts = duration.split(':');
    if (parts.length === 3) {
      const hours = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      return `${hours}h ${minutes}m`;
    }
    return duration;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#4D2C5E] mb-6">Recorded Videos</h1>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveCourse('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeCourse === 'all' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              All Courses
            </button>
            {courses.map(course => (
              <button
                key={course._id}
                onClick={() => setActiveCourse(course._id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeCourse === course._id ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {course.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-[#00000049] bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full ">
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
              <div className="h-full w-full">
                <ReactPlayer
                  url={selectedVideo.videoUrl}
                 
                  className="h-[100vh] w-full"
                  controls={true}
                />
              </div>
              <div className="mt-4">
                <p className="text-gray-700">
                  <span className="font-medium">Course:</span> {selectedVideo.courseId?.courseName}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Chapter:</span> {selectedVideo.chapterId?.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Duration:</span> {formatDuration(selectedVideo.duration)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVideos.length > 0 ? (
            filteredVideos.map(video => (
              <div key={video._id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <div className="relative">
                  <div 
                    className="bg-gray-200 h-40 flex items-center justify-center cursor-pointer"
                    onClick={() => navigate(`/Student/videos/${video._id}`)}
                  >
                    {video.videoUrl ? (
                      <ReactPlayer
                        url={video.videoUrl}
                        width="100%"
                        height="100%"
                        light={true}
                        playIcon={<FiVideo className="text-4xl text-[#4D2C5E]" />}
                      />
                    ) : (
                      <FiVideo className="text-4xl text-gray-400" />
                    )}
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {formatDuration(video.duration)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-[#4D2C5E]">{video.title}</h3>
                    {video.status === 'APPROVED' && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Approved
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 flex items-center">
  <FiBook className="mr-1" />
  {video.description
    ?.split(" ")
    .slice(0, 10)
    .join(" ") + (video.description?.split(" ").length > 10 ? "..." : "")}
</p>

                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <FiClock className="mr-1" />
                    <span>{formatDate(video.createdAt)}</span>
                  </div>
                  <div className="mt-4 flex justify-between">
                    {/* <button className="text-[#4D2C5E] hover:text-[#FF7426] flex items-center">
                      <FiDownload className="mr-1" />
                      Download
                    </button> */}
                    <button 
                      className="px-3 py-1 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152] text-sm"
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
              No videos found matching your criteria
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentRecordedVideos;