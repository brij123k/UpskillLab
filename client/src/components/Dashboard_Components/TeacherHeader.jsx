import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  FiHome, FiUpload, FiCalendar, FiMessageSquare, 
  FiTrendingUp, FiVideo, FiBell, FiUser, 
  FiLogOut, FiSend, FiMenu, FiX, FiChevronRight
} from "react-icons/fi";
import { useAuth } from '../../context/AuthContext';
function TeacherHeader() {
  const {logout} = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [newSuggestion, setNewSuggestion] = useState("");
  const navigate = useNavigate();

  // Notification dropdown ref for click outside detection
  const notificationRef = useRef(null);

  // Mock data
  const notifications = [
    { id: 1, text: "New doubt in Python course", time: "10 min ago", read: false },
    { id: 2, text: "Class reminder: Web Dev at 3 PM", time: "1 hour ago", read: true },
    { id: 3, text: "Student completed assignment", time: "2 hours ago", read: false },
    { id: 4, text: "New enrollment in Data Science", time: "5 hours ago", read: true }
  ];

  const unreadNotifications = notifications.filter(notification => !notification.read);

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

  // Toggle notification dropdown
  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    // Close other dropdowns if open
    setIsProfileDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-8xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/Teacher/Dashboard">
          <div className="flex-shrink-0">
            <img
              src="/images/Logo.png"
              alt="Upskillab Teacher Logo"
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
            Live Classes
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
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                <div className="p-3 border-b border-gray-200 bg-[#4D2C5E] text-white">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                
                <div className="py-1 max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`px-3 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <p className="text-gray-800">{notification.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-4 text-center text-gray-500">
                      No notifications available
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-200">
                  <NavLink
                    to="/Teacher/Notifications"
                    onClick={() => setIsNotificationDropdownOpen(false)}
                    className="flex items-center justify-between px-3 py-2 text-sm text-[#4D2C5E] hover:bg-gray-50"
                  >
                    <span>See All Notifications</span>
                    <FiChevronRight className="text-gray-400" />
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

              {/* <NavLink
                to="/Teacher/Classes"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiVideo className="inline mr-3" />
                Live Classes
              </NavLink> */}

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