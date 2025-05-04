import React, { useState } from 'react';
import { FiSearch, FiVideo, FiDownload, FiClock } from 'react-icons/fi';

const StudentRecordedVideos = () => {
  const [activeCourse, setActiveCourse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const courses = [
    { id: 1, name: "Python Fundamentals" },
    { id: 2, name: "Web Development" },
    { id: 3, name: "Data Science" }
  ];

  const videos = [
    { 
      id: 1, 
      title: "Python OOP Concepts", 
      course: "Python Fundamentals", 
      duration: "1h 25m", 
      date: "2023-06-10",
      watched: true
    },
    { 
      id: 2, 
      title: "React Hooks Deep Dive", 
      course: "Web Development", 
      duration: "1h 45m", 
      date: "2023-06-05",
      watched: false
    },
    { 
      id: 3, 
      title: "Pandas Data Analysis", 
      course: "Data Science", 
      duration: "2h 15m", 
      date: "2023-06-01",
      watched: true
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesCourse = activeCourse === 'all' || video.course === activeCourse;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesSearch;
  });

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
                key={course.id}
                onClick={() => setActiveCourse(course.name)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeCourse === course.name ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {course.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Videos List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.length > 0 ? (
          filteredVideos.map(video => (
            <div key={video.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <FiVideo className="text-4xl text-gray-400" />
                </div>
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-[#4D2C5E]">{video.title}</h3>
                  {video.watched && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Watched
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{video.course}</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <FiClock className="mr-1" />
                  <span>{video.date}</span>
                </div>
                <div className="mt-4 flex justify-between">
                  <button className="text-[#4D2C5E] hover:text-[#FF7426] flex items-center">
                    <FiDownload className="mr-1" />
                    Download
                  </button>
                  <button className="px-3 py-1 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152] text-sm">
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
    </div>
  );
};

export default StudentRecordedVideos;