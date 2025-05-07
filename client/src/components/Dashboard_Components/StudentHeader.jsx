import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FiHome, FiBook, FiCalendar, FiVideo, 
  FiMessageSquare, FiTrendingUp, FiBriefcase, 
  FiBell, FiUser, FiLogOut,FiClock, FiMenu, FiX
} from 'react-icons/fi';

const StudentHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const {logout} = useAuth()
  // Mock notifications
  const notifications = [
    { id: 1, text: "New study material uploaded for Python course", time: "2 hours ago" },
    { id: 2, text: "Live class reminder: Web Development at 3 PM", time: "1 day ago" }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-8xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/student/dashboard">
          <div className="flex-shrink-0">
            <img
              src="/images/student-logo.png"
              alt="UpskillLab Student Logo"
              className="h-10"
            />
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavLink
            to="/student/dashboard"
            className={({ isActive }) => 
              `flex items-center ${isActive ? 'text-[#4D2C5E] font-semibold' : 'text-gray-700 hover:text-[#4D2C5E]'}`
            }
          >
            <FiHome className="mr-1" />
            Dashboard
          </NavLink>

          <NavLink
            to="/Student/StudyMaterials"
            className={({ isActive }) => 
              `flex items-center ${isActive ? 'text-[#4D2C5E] font-semibold' : 'text-gray-700 hover:text-[#4D2C5E]'}`
            }
          >
            <FiBook className="mr-1" />
            Study Materials
          </NavLink>

          <NavLink
            to="/Student/Schedule"
            className={({ isActive }) => 
              `flex items-center ${isActive ? 'text-[#4D2C5E] font-semibold' : 'text-gray-700 hover:text-[#4D2C5E]'}`
            }
          >
            <FiCalendar className="mr-1" />
            Schedule
          </NavLink>

          <NavLink
            to="/Student/Doubts"
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
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-1 text-gray-700 hover:text-[#4D2C5E]"
            >
              <FiBell className="text-xl" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF7426] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                <div className="p-3 border-b border-gray-200 bg-[#4D2C5E] text-white">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="py-1 max-h-60 overflow-y-auto">
                  {notifications.map(notification => (
                    <div key={notification.id} className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                      <p className="text-gray-800">{notification.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <NavLink
                  to="/Student/Notifications"
                  className="block px-3 py-2 text-sm text-center text-[#4D2C5E] font-medium border-t border-gray-100 hover:bg-gray-50"
                >
                  View All Notifications
                </NavLink>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
      <button
        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
        className="flex items-center space-x-1 focus:outline-none"
      >
        <img
          src="/images/default-student-avatar.png"
          alt="Student"
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
              to="/Student/Profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => setIsProfileDropdownOpen(false)}
            >
              <FiUser className="mr-2" />
              My Profile
            </NavLink>
            
            <NavLink
              to="/Student/Jobs"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => setIsProfileDropdownOpen(false)}
            >
              <FiBriefcase className="mr-2" />
              Jobs
            </NavLink>
            
            <NavLink
              to="/student/recorded-videos"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => setIsProfileDropdownOpen(false)}
            >
              <FiVideo className="mr-2" />
              Recorded Videos
            </NavLink>
            
            <NavLink
              to="/Student/Trends"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => setIsProfileDropdownOpen(false)}
            >
              <FiTrendingUp className="mr-2" />
              Trends
            </NavLink>
            
            <NavLink
              to="/Student/History"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => setIsProfileDropdownOpen(false)}
            >
              <FiClock className="mr-2" />
              History
            </NavLink>
            
            <div className="border-t border-gray-100"></div>
            
            <button
              onClick={() => {
                logout();
                setIsProfileDropdownOpen(false);
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
        <div className="lg:hidden fixed inset-0 z-40 bg-transparent bg-opacity-50">
          <div className="bg-white w-4/5 h-full overflow-y-auto float-right">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <img src="/images/student-logo.png" alt="Logo" className="h-8" />
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-700">
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4 space-y-1">
              <NavLink
                to="/student/dashboard"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiHome className="inline mr-3" />
                Dashboard
              </NavLink>

              <NavLink
                to="/Student/StudyMaterials"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiBook className="inline mr-3" />
                Study Materials
              </NavLink>

              <NavLink
                to="/Student/Schedule"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiCalendar className="inline mr-3" />
                Schedule
              </NavLink>

              <NavLink
                to="/Student/Doubts"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiMessageSquare className="inline mr-3" />
                Doubts
              </NavLink>

              <NavLink
                to="/Student/Notifications"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiBell className="inline mr-3" />
                Notifications
              </NavLink>

              <NavLink
                to="/Student/Profile"
                className="block py-3 px-2 rounded-md text-gray-700 hover:bg-[#4D2C5E]/10 hover:text-[#4D2C5E]"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiUser className="inline mr-3" />
                Profile
              </NavLink>
              <NavLink
              to="/Student/Jobs"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => setIsProfileDropdownOpen(false)}
            >
              <FiBriefcase className="mr-2" />
              Jobs
            </NavLink>
            
            <NavLink
              to="/student/recorded-videos"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => setIsProfileDropdownOpen(false)}
            >
              <FiVideo className="mr-2" />
              Recorded Videos
            </NavLink>
            
            <NavLink
              to="/Student/Trends"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => setIsProfileDropdownOpen(false)}
            >
              <FiTrendingUp className="mr-2" />
              Trends
            </NavLink>
            
            <NavLink
              to="/Student/History"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => setIsProfileDropdownOpen(false)}
            >
              <FiClock className="mr-2" />
              History
            </NavLink>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <button 
                  onClick={() => logout()}
                  className="w-full py-2 text-red-600 text-left flex items-center"
                >
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
};

export default StudentHeader;