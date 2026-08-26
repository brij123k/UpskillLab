import React, { useState } from 'react';
import { FiSearch, FiCalendar, FiClock, FiVideo, FiBookmark } from 'react-icons/fi';

const LiveClasses = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const categories = [
    { id: 1, name: "All Categories" },
    { id: 2, name: "Programming" },
    { id: 3, name: "Data Science" },
    { id: 4, name: "Design" }
  ];

  const liveClasses = [
    { 
      id: 1, 
      title: "Python OOP Concepts", 
      instructor: "Dr. Sarah Johnson", 
      category: "Programming", 
      date: "2023-06-15", 
      time: "14:00 - 15:30",
      status: "upcoming",
      enrolled: true
    },
    { 
      id: 2, 
      title: "React Advanced Patterns", 
      instructor: "Mark Williams", 
      category: "Programming", 
      date: "2023-06-14", 
      time: "10:00 - 11:30",
      status: "live-now",
      enrolled: true
    },
    { 
      id: 3, 
      title: "Data Visualization", 
      instructor: "Lisa Chen", 
      category: "Data Science", 
      date: "2023-06-16", 
      time: "16:00 - 17:30",
      status: "upcoming",
      enrolled: false
    },
    { 
      id: 4, 
      title: "UI/UX Principles", 
      instructor: "Alex Rodriguez", 
      category: "Design", 
      date: "2023-06-12", 
      time: "09:00 - 10:30",
      status: "completed",
      enrolled: true
    }
  ];

  const filteredClasses = liveClasses.filter(cls => {
    const matchesFilter = activeFilter === 'all' || cls.category === activeFilter || (activeFilter === 'my-classes' && cls.enrolled);
    const matchesSearch = cls.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         cls.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const styles = {
      "upcoming": "bg-blue-100 text-blue-800",
      "live-now": "bg-green-100 text-green-800",
      "completed": "bg-gray-100 text-gray-800"
    };
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${styles[status]}`}>
        {status.replace('-', ' ')}
      </span>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#4D2C5E] mb-6">Live Classes</h1>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search classes or instructors..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.name === "All Categories" ? 'all' : category.name)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeFilter === (category.name === "All Categories" ? 'all' : category.name) ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {category.name}
              </button>
            ))}
            <button
              onClick={() => setActiveFilter('my-classes')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeFilter === 'my-classes' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              My Classes
            </button>
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 font-semibold text-[#4D2C5E] border-b">
          <div className="col-span-5">Class Title</div>
          <div className="col-span-2">Instructor</div>
          <div className="col-span-2">Date & Time</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Actions</div>
        </div>
        
        {filteredClasses.length > 0 ? (
          filteredClasses.map(cls => (
            <div key={cls.id} className="grid grid-cols-12 p-4 items-center border-b hover:bg-gray-50">
              <div className="col-span-5 flex items-center">
                <FiVideo className="text-[#4D2C5E] mr-3" />
                <div>
                  <div className="font-medium">{cls.title}</div>
                  <div className="text-xs text-gray-500">{cls.category}</div>
                </div>
              </div>
              <div className="col-span-2">{cls.instructor}</div>
              <div className="col-span-2">
                <div className="flex items-center text-sm">
                  <FiCalendar className="mr-1 text-gray-400" />
                  {cls.date}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <FiClock className="mr-1 text-gray-400" />
                  {cls.time}
                </div>
              </div>
              <div className="col-span-2">
                {getStatusBadge(cls.status)}
                {cls.enrolled && cls.status !== 'completed' && (
                  <div className="text-xs text-[#4D2C5E] mt-1">Enrolled</div>
                )}
              </div>
              <div className="col-span-1 flex justify-end space-x-2">
                {cls.status === 'upcoming' && !cls.enrolled && (
                  <button className="text-white bg-[#4D2C5E] hover:bg-[#3a2152] px-3 py-1 rounded-lg text-sm">
                    Join
                  </button>
                )}
                {cls.status === 'live-now' && (
                  <button className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-sm">
                    Enter
                  </button>
                )}
                {cls.status === 'completed' && (
                  <button className="text-[#4D2C5E] hover:text-[#FF7426] p-1">
                    <FiBookmark />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            No classes found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveClasses;