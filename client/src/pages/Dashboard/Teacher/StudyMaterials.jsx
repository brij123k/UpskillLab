import React, { useState } from 'react';
import { FiUpload, FiSearch, FiFile, FiFolder, FiDownload, FiTrash2 } from 'react-icons/fi';

const StudyMaterials = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const materials = [
    { id: 1, name: "Python Basics.pdf", type: "pdf", course: "Python Fundamentals", date: "2023-05-15", size: "2.4 MB" },
    { id: 2, name: "Web Dev Lecture 1.pptx", type: "ppt", course: "Web Development", date: "2023-05-10", size: "5.1 MB" },
    { id: 3, name: "Data Science Notes.docx", type: "doc", course: "Data Science", date: "2023-05-05", size: "1.8 MB" },
    { id: 4, name: "OOP Concepts.zip", type: "zip", course: "Advanced Python", date: "2023-04-28", size: "12.4 MB" },
  ];

  const courses = [
    { id: 1, name: "Python Fundamentals" },
    { id: 2, name: "Web Development" },
    { id: 3, name: "Data Science" },
    { id: 4, name: "Advanced Python" },
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         material.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || material.course === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#4D2C5E]">Study Materials</h1>
        <button className="flex items-center bg-[#FF7426] text-white px-4 py-2 rounded-lg hover:bg-[#E65100]">
          <FiUpload className="mr-2" />
          Upload New Material
        </button>
      </div>

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
            <div key={material.id} className="grid grid-cols-12 p-4 items-center border-b hover:bg-gray-50">
              <div className="col-span-6 flex items-center">
                {material.type === 'pdf' && <FiFile className="text-red-500 mr-2" />}
                {material.type === 'ppt' && <FiFile className="text-orange-500 mr-2" />}
                {material.type === 'doc' && <FiFile className="text-blue-500 mr-2" />}
                {material.type === 'zip' && <FiFolder className="text-yellow-500 mr-2" />}
                <span>{material.name}</span>
                <span className="text-xs text-gray-500 ml-2">{material.size}</span>
              </div>
              <div className="col-span-3">{material.course}</div>
              <div className="col-span-2 text-sm text-gray-500">{material.date}</div>
              <div className="col-span-1 flex justify-end space-x-2">
                <button className="text-[#4D2C5E] hover:text-[#FF7426]">
                  <FiDownload />
                </button>
                <button className="text-red-500 hover:text-red-700">
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