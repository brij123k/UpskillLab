import React, { useState } from 'react';
import { FiBell, FiChevronRight, FiFilter, FiSearch, FiCheck, FiTrash2 } from 'react-icons/fi';

const TeacherNotifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock notification data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'doubt',
      title: 'New doubt in Python course',
      message: 'Student Rahul asked: "How do decorators work in Python?"',
      time: '10 minutes ago',
      read: false,
      course: 'Python Fundamentals',
      date: '2023-06-15'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Class starting soon',
      message: 'Your "Web Development" class starts in 30 minutes',
      time: '1 hour ago',
      read: true,
      course: 'Web Development',
      date: '2023-06-15'
    },
    {
      id: 3,
      type: 'submission',
      title: 'Assignment submitted',
      message: 'Priya has submitted the Data Science assignment',
      time: '3 hours ago',
      read: false,
      course: 'Data Science',
      date: '2023-06-14'
    },
    {
      id: 4,
      type: 'enrollment',
      title: 'New student enrolled',
      message: 'Amit has enrolled in your Advanced Python course',
      time: '1 day ago',
      read: true,
      course: 'Advanced Python',
      date: '2023-06-13'
    },
    {
      id: 5,
      type: 'system',
      title: 'System maintenance',
      message: 'Scheduled maintenance this weekend. Platform will be unavailable for 2 hours.',
      time: '2 days ago',
      read: true,
      course: '',
      date: '2023-06-12'
    }
  ]);

  // Filter notifications based on active filter and search query
  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'unread' && !notification.read) ||
                         (activeFilter === 'course' && notification.course) ||
                         (notification.type === activeFilter);
    
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.course.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#4D2C5E] flex items-center">
          <FiBell className="mr-2" />
          Notifications
        </h1>
        <button 
          onClick={markAllAsRead}
          className="text-sm text-[#4D2C5E] hover:text-[#FF7426]"
        >
          Mark all as read
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-grow max-w-md">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-full text-sm flex items-center ${activeFilter === 'all' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              <FiFilter className="mr-1" />
              All
            </button>
            <button
              onClick={() => setActiveFilter('unread')}
              className={`px-3 py-1 rounded-full text-sm flex items-center ${activeFilter === 'unread' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Unread
            </button>
            <button
              onClick={() => setActiveFilter('doubt')}
              className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'doubt' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Doubts
            </button>
            <button
              onClick={() => setActiveFilter('course')}
              className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'course' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Course Updates
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredNotifications.map(notification => (
              <li 
                key={notification.id} 
                className={`hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <h3 className={`font-medium ${!notification.read ? 'text-[#4D2C5E]' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        {notification.course && (
                          <span className="ml-2 px-2 py-0.5 bg-[#FF7426]/10 text-[#FF7426] text-xs rounded-full">
                            {notification.course}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center text-xs text-gray-400 mt-2">
                        <span>{notification.time}</span>
                        <span className="mx-2">•</span>
                        <span>{notification.date}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-green-600 hover:text-green-800"
                          title="Mark as read"
                        >
                          <FiCheck />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  {notification.type === 'doubt' && (
                    <button className="mt-3 text-sm text-[#4D2C5E] hover:text-[#FF7426] flex items-center">
                      Respond to doubt <FiChevronRight className="ml-1" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center text-gray-500">
            {searchQuery ? (
              <p>No notifications match your search criteria</p>
            ) : (
              <div>
                <p className="text-lg mb-2">No notifications available</p>
                <p className="text-sm">You're all caught up!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination (would be dynamic in real app) */}
      {filteredNotifications.length > 0 && (
        <div className="flex justify-between items-center mt-6 px-4">
          <button className="px-4 py-2 text-sm text-gray-700 hover:text-[#4D2C5E]">
            Previous
          </button>
          <div className="flex space-x-1">
            {[1, 2, 3].map(page => (
              <button
                key={page}
                className={`w-8 h-8 rounded-full text-sm ${page === 1 ? 'bg-[#4D2C5E] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 text-sm text-gray-700 hover:text-[#4D2C5E]">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TeacherNotifications;