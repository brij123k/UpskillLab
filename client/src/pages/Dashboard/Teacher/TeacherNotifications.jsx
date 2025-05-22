import React, { useEffect, useState } from 'react';
import { FiBell, FiChevronRight, FiFilter, FiSearch, FiCheck, FiTrash2 } from 'react-icons/fi';
import ApiConfig from '../../../config/apiConfig';
import { deleteDataHandler, getDataHandlerWithToken, patchTokenDataHandler } from '../../../config/services';
import { toast } from 'react-toastify';
import useNotificationService from '../../../config/notificationService';
const TeacherNotifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [profileId,setProfileId]= useState('')
  const [loading, setLoading] = useState(true);
  const [notificationTypes, setNotificationTypes] = useState([]);

  // Function to format time difference
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to get notification title based on type
  const getTitleByType = (type) => {
    const typeMap = {
      'ALERT': 'System Alert',
      'DOUBT': 'New Doubt',
      'COURSE_UPDATE': 'Course Update',
      'SUBMISSION': 'Assignment Submitted',
      'ENROLLMENT': 'New Enrollment',
      'REMINDER': 'Reminder',
      'ANNOUNCEMENT': 'Announcement',
      'FEEDBACK': 'Feedback'
    };
    return typeMap[type] || type.replace('_', ' '); // Fallback to the type name if not in map
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const profile= await getDataHandlerWithToken('teacherProfile')
      setProfileId(profile._id)
      const endpoint = ApiConfig.Notifications('teacher');
      const endpoint2 = ApiConfig.Notifications('adminTeacher');
      const endpoint3 = ApiConfig.Notifications('teacherStudent');
      const endpoint4= ApiConfig.NotificationsbyId(profile._id)

      const [response, response2, response3, response4] = await Promise.all([
        getDataHandlerWithToken(endpoint, null, null, true),
        getDataHandlerWithToken(endpoint2, null, null, true),
        getDataHandlerWithToken(endpoint3, null, null, true),
        getDataHandlerWithToken(endpoint4, null, null, true)
      ]);
      
      const allNotifications = [
        ...(response || []),
        ...(response2 || []),
        ...(response3 || []),
        ...(response4 || [])
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log(allNotifications)
      // Extract unique notification types
      const types = [...new Set(allNotifications.map(n => n.type))];
      setNotificationTypes(types);
      
      setNotifications(allNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const {notifications, setNotifications} = useNotificationService(profileId,['teacher','teacherStudent','adminTeacher']);

  // Filter notifications based on active filter and search query
  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'unread' && !notification.read) ||
                         (notification.type === activeFilter);
    
    const matchesSearch = getTitleByType(notification.type).toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      const endpoint = ApiConfig.MarkAsReadNotifications(id);
      const response = await patchTokenDataHandler(endpoint, [], true);
      if (response) {
        setNotifications(notifications.map(notification => 
          notification._id === id ? { ...notification, read: true } : notification
        ));
        toast.success("Marked As Readed")
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Delete notification
  const deleteNotification = async (id) => {
    try {
      const endpoint = ApiConfig.deleteNotifications(id);
      const response = await deleteDataHandler(endpoint, true);
      if (response) {
        setNotifications(notifications.filter(notification => notification._id !== id));
        toast.success("Notification Deleted")
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      // First mark all as read in the UI for better user experience
      setNotifications(notifications.map(notification => ({
        ...notification,
        read: true
      })));
      
      // Then send API requests for all unread notifications
      const unreadNotifications = notifications.filter(n => !n.read);
      await Promise.all(
        unreadNotifications.map(async notification => {
          const endpoint = ApiConfig.MarkAsReadNotifications(notification._id);
          // toast.success("Marked all Read")
          return patchTokenDataHandler(endpoint, [], true);
        })
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      // Revert UI changes if API fails
      fetchNotifications();
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <p>Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#4D2C5E] flex items-center">
          <FiBell className="mr-2" />
          Notifications
        </h1>
        <button 
          onClick={markAllAsRead}
          className="text-sm text-[#4D2C5E] hover:text-[#FF7426] flex items-center"
          disabled={notifications.every(n => n.read)}
        >
          <FiCheck className="mr-1" />
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
          <div className="flex flex-wrap gap-2 overflow-x-auto py-1">
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
            
            {notificationTypes.map(type => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeFilter === type ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {getTitleByType(type)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredNotifications.map(notification => (
              <li 
                key={notification._id} 
                className={`hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <div className="flex items-center flex-wrap gap-2">
                        <h3 className={`font-medium ${!notification.read ? 'text-[#4D2C5E]' : 'text-gray-700'}`}>
                          {getTitleByType(notification.type)}
                        </h3>
                        <span className="px-2 py-0.5 bg-[#FF7426]/10 text-[#FF7426] text-xs rounded-full">
                          {notification.type.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center text-xs text-gray-400 mt-2">
                        <span>{formatTimeAgo(notification.createdAt)}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(notification.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="p-1 text-green-600 hover:text-green-800 transition-colors"
                          title="Mark as read"
                        >
                          <FiCheck />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification._id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  {notification.type === 'DOUBT' && (
                    <button className="mt-3 text-sm text-[#4D2C5E] hover:text-[#FF7426] flex items-center transition-colors">
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

      {/* Pagination */}
      {filteredNotifications.length > 0 && (
        <div className="flex justify-between items-center mt-6 px-4">
          <button 
            className="px-4 py-2 text-sm text-gray-700 hover:text-[#4D2C5E] disabled:opacity-50"
            disabled={true}
          >
            Previous
          </button>
          <div className="flex space-x-1">
            <button
              className="w-8 h-8 rounded-full text-sm bg-[#4D2C5E] text-white"
            >
              1
            </button>
          </div>
          <button 
            className="px-4 py-2 text-sm text-gray-700 hover:text-[#4D2C5E] disabled:opacity-50"
            disabled={true}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TeacherNotifications;