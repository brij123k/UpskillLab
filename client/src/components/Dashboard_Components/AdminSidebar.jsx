import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FiHome, FiBook, FiUsers,FiUser, FiBarChart2, FiSettings, 
  FiVideo, FiFileText, FiCalendar, FiShoppingBag, 
  FiMessageSquare, FiDollarSign, FiLock, FiChevronDown, 
  FiChevronRight, FiBell, FiGrid, FiBookOpen, FiBriefcase,FiRepeat
} from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";
const Sidebar = ({ mode, setMode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const upskillMenus = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { 
      name: "Course Management", 
      icon: <FiBook />, 
      submenus: [
        { name: "All Courses", path: "/Admin/Courses" },
        { name: "Study Materials", path: "/study-materials" },
      ]
    },
    { name: "Batch Management", icon: <FiGrid />, path: "/batch-management" },
    { name: "Teacher Management", icon: <FiUsers />, path: "/teacher-management" },
    { name: "Student Management", icon: <FiUser />, path: "/teacher-management" },
    { name: "Demo Sessions", icon: <FiVideo />, path: "/demo-sessions" },
    { name: "Banners", icon: <FiFileText />, path: "/banners" },
    { name: "Stats", icon: <FiBarChart2 />, path: "/stats" },
    { name: "Stories", icon: <FiMessageSquare />, path: "/stories" },
    { name: "Hiring Partner", icon: <FiBriefcase />, path: "/hiring-partner" },
    { name: "Blog", icon: <FiFileText />, path: "/blog" },
    { name: "Business Trend Analysis", icon: <FiDollarSign />, path: "/business-trends" },
  ];

  const counselHubMenus = [
    { name: "Dashboard", icon: <FiHome />, path: "/counselhub/dashboard" },
    { name: "Demo Sessions", icon: <FiVideo />, path: "/counselhub/demo-sessions" },
    { 
      name: "Course Management", 
      icon: <FiBook />, 
      path: "/counselhub/course-management" 
    },
    { 
      name: "Program Management", 
      icon: <FiBookOpen />, 
      path: "/counselhub/program-management" 
    },
    { 
      name: "University Management", 
      icon: <FaUniversity />, 
      path: "/counselhub/university-management" 
    },
  ];

  const menus = mode === "upskill" ? upskillMenus : counselHubMenus;

  const toggleMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`bg-[#4D2C5E] text-white h-full ${isOpen ? "w-64" : "w-20"} transition-all duration-300 flex flex-col`}>
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-[#3a1f4a]">
        {isOpen && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#F36F21] flex items-center justify-center mr-2 overflow-hidden">
              <img 
                src="/images/Logo1.png" 
                alt="Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <span className="font-bold text-lg">
              {mode === "upskill" ? "UpSkillab" : "CounselHub"}
            </span>
          </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-[#F36F21] focus:outline-none"
        >
          {isOpen ? "◀" : "▶"}
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {menus.map((menu, index) => (
          <div key={index} className="mb-1 px-2">
            {menu.submenus ? (
              <div>
                <div 
                  onClick={() => toggleMenu(index)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${activeMenu === index ? 'bg-[#3a1f4a] text-[#F36F21]' : 'hover:bg-[#3a1f4a] hover:text-[#F36F21]'}`}
                >
                  <span className={`text-lg ${activeMenu === index ? 'text-[#F36F21]' : 'text-white'}`}>{menu.icon}</span>
                  {isOpen && (
                    <>
                      <span className="ml-3 flex-1">{menu.name}</span>
                      {activeMenu === index ? <FiChevronDown /> : <FiChevronRight />}
                    </>
                  )}
                </div>
                {activeMenu === index && isOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {menu.submenus.map((sub, subIndex) => (
                      <Link 
                        key={subIndex} 
                        to={sub.path}
                        className={`block py-2 px-3 rounded-lg text-sm transition-colors ${isActive(sub.path) ? 'bg-[#F36F21] text-white' : 'hover:bg-[#3a1f4a] hover:text-[#F36F21]'}`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={menu.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${isActive(menu.path) ? 'bg-[#F36F21] text-white' : 'hover:bg-[#3a1f4a] hover:text-[#F36F21]'}`}
              >
                <span className={`text-lg ${isActive(menu.path) ? 'text-white' : 'text-white'}`}>{menu.icon}</span>
                {isOpen && <span className="ml-3">{menu.name}</span>}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[#3a1f4a] space-y-2">
        <button
          onClick={() => setMode(mode === "upskill" ? "counselhub" : "upskill")}
          className={`w-full flex items-center p-3 rounded-lg transition-colors hover:bg-[#3a1f4a] hover:text-[#F36F21]`}
        >
          <span className="text-lg"><FiRepeat /></span>
          {isOpen && (
            <span className="ml-3">
              Switch to {mode === "upskill" ? "CounselHub" : "UpSkillab"}
            </span>
          )}
        </button>
        <Link
          to="/settings"
          className={`flex items-center p-3 rounded-lg transition-colors ${isActive("/settings") ? 'bg-[#F36F21] text-white' : 'hover:bg-[#3a1f4a] hover:text-[#F36F21]'}`}
        >
          <span className="text-lg"><FiSettings /></span>
          {isOpen && <span className="ml-3">Settings</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;