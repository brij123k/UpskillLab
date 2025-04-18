import React, { useState } from 'react';
import { FiSearch, FiFile, FiFolder, FiDownload } from 'react-icons/fi';

const StudyMaterials = () => {
  const [activeCourse, setActiveCourse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const courses = [
    { id: 1, name: "Python Fundamentals" },
    { id: 2, name: "Web Development" },
    { id: 3, name: "Data Science" }
  ];

  const materials = [
    { id: 1, name: "Python Basics.pdf", course: "Python Fundamentals", date: "2023-06-10", size: "2.4 MB" },
    { id: 2, name: "HTML-CSS Cheat Sheet.pdf", course: "Web Development", date: "2023-06-05", size: "1.8 MB" },
    { id: 3, name: "Pandas Tutorial.docx", course: "Data Science", date: "2023-06-01", size: "3.2 MB" },
    { id: 4, name: "OOP Concepts.zip", course: "Python Fundamentals", date: "2023-05-28", size: "5.7 MB" }
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesCourse = activeCourse === 'all' || material.course === activeCourse;
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         material.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#4D2C5E] mb-6">Study Materials</h1>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
            <div key={material.id} className="grid grid-cols-12 p-4 items-center border-b hover:bg-gray-50">
              <div className="col-span-6 flex items-center">
                <FiFile className="text-[#4D2C5E] mr-2" />
                <span>{material.name}</span>
                <span className="text-xs text-gray-500 ml-2">{material.size}</span>
              </div>
              <div className="col-span-3">{material.course}</div>
              <div className="col-span-2 text-sm text-gray-500">{material.date}</div>
              <div className="col-span-1 flex justify-end">
                <button className="text-[#4D2C5E] hover:text-[#FF7426] p-1">
                  <FiDownload />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            No materials found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterials;