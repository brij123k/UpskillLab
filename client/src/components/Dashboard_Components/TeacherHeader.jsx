import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  FiHome, FiUpload, FiCalendar, FiMessageSquare, 
  FiTrendingUp, FiVideo, FiBell, FiUser, 
  FiLogOut, FiSend, FiMenu, FiX, FiChevronRight,FiFileText 
} from "react-icons/fi";
import { FaChalkboardTeacher} from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';
import ApiConfig from "../../config/apiConfig";
import useNotificationService from "../../config/notificationService";
import { getDataHandlerWithToken, patchTokenDataHandler } from "../../config/services";
import { toast } from "react-toastify";
function TeacherHeader() {
  const {logout} = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [profileId,setProfileId]= useState('')
  const notificationRef = useRef(null);

  
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Get notification title by type
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
    if (!type || typeof type !== 'string') return 'General';
  return typeMap[type] || type.replace(/_/g, ' ');
  };

  // Fetch initial notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const profile= await getDataHandlerWithToken('teacherProfile')
      setProfileId(profile._id)
      const endpoint = ApiConfig.Notifications('teacher');
      const endpoint2 = ApiConfig.Notifications('adminTeacher');
      const endpoint3 = ApiConfig.Notifications('teacherStudent');
       
      const [response, response2, response3,response4] = await Promise.all([
        getDataHandlerWithToken(endpoint, null, null, true),
        getDataHandlerWithToken(endpoint2, null, null, true),
        getDataHandlerWithToken(endpoint3, null, null, true),
        // getDataHandlerWithToken(endpoint4, null, null, true),
        getDataHandlerWithToken('NotificationsbyId')
      ]);
      
      const allNotifications = [
        ...(response || []),
        ...(response2 || []),
        ...(response3 || []),
        ...(response4 || [])
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      // Get top 5 latest notifications
      const latestNotifications = allNotifications.slice(0, 5);
      setNotifications(latestNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchNotifications()
  },[])
 
const {notifications, setNotifications} = useNotificationService(profileId,['teacher','teacherStudent','adminTeacher'])
  // Click outside handler for notification dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

      const markAsRead = async (id) => {
    try {
      const endpoint = ApiConfig.MarkAsReadNotifications(id);
      const response = await patchTokenDataHandler(endpoint, [], true);
      if (response) {
        setNotifications(notifications.map(notification => 
          notification._id === id ? { ...notification, read: true } : notification
        ));
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Toggle notification dropdown
  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    setIsProfileDropdownOpen(false);
  };

  const unreadNotifications = notifications.filter(notification => !notification.read);
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-8xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/Teacher/Dashboard">
          <div className="flex-shrink-0">
            <img
              src="/images/Logo.png"
              alt="Upskillab Logo"
              className="h-10"
            />
          </div>
        </NavLink>

        {/* Desktop Navigation - Key Options */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavLink
            to="/Teacher/Dashboard"
            className={({ isActive }) => 
              `flex items-center ${isActive ? 'text-[#4D2C5E] font-semibold' : 'text-gray-700 hover:text-[#4D2C5E]'}`
            }
          >
            <FiHome className="mr-1" />
            Dashboard
          </NavLink>

          <NavLink
            to="/Teacher/StudyMaterials"
            className={({ isActive }) => 
              `flex items-center ${isActive ? 'text-[#4D2C5E] font-semibold' : 'text-gray-700 hover:text-[#4D2C5E]'}`
            }
          >
            <FiUpload className="mr-1" />
            Materials
          </NavLink>

          <NavLink
            to="/Teacher/Schedule"
            className={({ isActive }) => 
              `flex items-center ${isActive ? 'text-[#4D2C5E] font-semibold' : 'text-gray-700 hover:text-[#4D2C5E]'}`
            }
          >
            <FiCalendar className="mr-1" />
            Schedule
          </NavLink>

          {/* <NavLink
            to="/Teacher/Classes"
            className={({ isActive }) => 
              `flex items-center ${isActive ? 'text-[#4D2C5E] font-semibold' : 'text-gray-700 hover:text-[#4D2C5E]'}`
            }
          >
            <FiVideo className="mr-1" />
            Teacher Suggestions
          </NavLink> */}

          <NavLink
            to="/Teacher/Doubt"
            className={({ isActive }) => 
              `flex items-center ${isActive ? 'text-[#4D2C5E] font-semibold' : 'text-gray-700 hover:text-[#4D2C5E]'}`
            }
          >
            <FiMessageSquare className="mr-1" />
            Doubts
          </NavLink>
        </div>

        {/* Right Side Icons */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={toggleNotificationDropdown}
              className="relative p-1 text-gray-700 hover:text-[#4D2C5E] focus:outline-none"
            >
              <FiBell className="text-xl" />
              {unreadNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF7426] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadNotifications.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown Content */}
         {isNotificationDropdownOpen && (
  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200 transform transition-all duration-200 ease-in-out">
    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#4D2C5E] to-[#6A3D7E] text-white rounded-t-lg">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm">Notifications</h3>
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
          {notifications.filter(n => !n.read).length} unread
        </span>
      </div>
    </div>
    
    <div className="py-1 max-h-96 overflow-y-auto">
      {loading ? (
        <div className="px-4 py-6 flex flex-col items-center justify-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#4D2C5E] mb-2"></div>
          <p className="text-sm">Loading notifications...</p>
        </div>
      ) : notifications.length > 0 ? (
        notifications.map(notification => (
          <div 
            key={notification._id}
            onClick={() => markAsRead(notification._id)}
            className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors duration-150 ease-in-out ${
              !notification.read ? 'bg-blue-50/50 hover:bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <span className="w-2 h-2 bg-[#FF7426] rounded-full flex-shrink-0"></span>
                  )}
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {getTitleByType(notification.type)}
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-400">
                    {formatTimeAgo(notification.createdAt)}
                  </p>
                  <span className="px-2 py-0.5 bg-[#FF7426]/10 text-[#FF7426] text-xs rounded-full whitespace-nowrap ml-2">
                    {notification.type?.replace(/_/g, ' ') || 'General'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="px-4 py-6 flex flex-col items-center justify-center text-gray-500">
          <FiBell className="text-2xl text-gray-300 mb-2" />
          <p className="text-sm">No notifications available</p>
        </div>
      )}
    </div>
    
    <div className="border-t border-gray-200 bg-gray-50 rounded-b-lg">
      <NavLink
        to="/Teacher/Notifications"
        onClick={() => setIsNotificationDropdownOpen(false)}
        className="flex items-center justify-between px-4 py-3 text-sm text-[#4D2C5E] hover:bg-gray-100 transition-colors duration-150 rounded-b-lg"
      >
        <span className="font-medium">View all notifications</span>
        <FiChevronRight className="text-gray-500" />
      </NavLink>
    </div>
  </div>
)}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileDropdownOpen(!isProfileDropdownOpen);
                setIsNotificationDropdownOpen(false);
              }}
              className="flex items-center space-x-1 focus:outline-none"
            >
              <img
                src="/images/default-teacher-avatar.png"
                alt="Teacher"
                className="h-8 w-8 rounded-full border border-[#4D2C5E]"
              />
              <svg
                className={`h-4 w-4 text-gray-600 ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isProfileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-200"
                onMouseLeave={() => setIsProfileDropdownOpen(false)}
              >
                <div className="py-1">
                  <NavLink
                    to="/Teacher/Profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FiUser className="mr-2" />
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/Teacher/Analysis"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FiTrendingUp className="mr-2" />
                    Market Analysis
                  </NavLink>
                  <NavLink
                    to="/Teacher/Suggestions"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FaChalkboardTeacher className="mr-2" />
                    Teacher Suggestions
                  </NavLink>
                  <NavLink
                    to="/Teacher/Assignments"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FiFileText  className="mr-2" />
                    Teacher Assignments
                  </NavLink>
                  <NavLink
                    to="/Teacher/Notifications"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FiBell className="mr-2" />
                    Notifications
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                    
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <FiLogOut className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-gray-700 focus:outline-none"
        >
          {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#00000060] bg-opacity-50">
          <div className="bg-white w-4/5 float-right h-full overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <img src="/images/Logo.png" alt="Logo" className="h-8" />
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-700">
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4 space-y-1">
              <NavLink
                to="/Teacher/Dashboard"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiHome className="inline mr-3" />
                Dashboard
              </NavLink>

              <NavLink
                to="/Teacher/Profile"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiUser className="inline mr-3" />
                Profile
              </NavLink>

              <NavLink
                to="/Teacher/StudyMaterials"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiUpload className="inline mr-3" />
                Study Materials
              </NavLink>

              <NavLink
                to="/Teacher/Schedule"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiCalendar className="inline mr-3" />
                Class Schedule
              </NavLink>

              <NavLink
                to="/Teacher/Analysis"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiTrendingUp className="inline mr-3" />
                Market Analysis
              </NavLink>

              <NavLink
                to="/Teacher/Suggestions"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
              
                <FaChalkboardTeacher className="inline mr-2" />
                    Teacher Suggestions
              </NavLink>

              <NavLink
                to="/Teacher/Assignments"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
              
                <FiFileText className="inline mr-2" />
                    Teacher Assignments
              </NavLink>

              <NavLink
                to="/Teacher/Doubt"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiMessageSquare className="inline mr-3" />
                Doubt Handling
              </NavLink>

              <NavLink
                to="/Teacher/Notifications"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiBell className="inline mr-3" />
                Notifications
              </NavLink>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <button
                onClick={() => {
                  logout();
                
                }}
                
                className="w-full py-2 text-red-600 text-left flex items-center">
                  <FiLogOut className="mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default TeacherHeader;