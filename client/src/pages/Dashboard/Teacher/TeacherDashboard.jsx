import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiBook, FiUsers, FiCalendar, FiUpload, 
  FiMessageSquare, FiBarChart2, FiBriefcase, FiTrendingUp 
} from 'react-icons/fi';

const TeacherDashboard = () => {
  // Mock data - replace with your actual API calls
  const stats = [
    { title: "Active Courses", value: 5, icon: <FiBook className="text-2xl" />, color: "bg-[#FF7426]" },
    { title: "Total Students", value: 87, icon: <FiUsers className="text-2xl" />, color: "bg-[#4D2C5E]" },
    { title: "Upcoming Classes", value: 3, icon: <FiCalendar className="text-2xl" />, color: "bg-[#FF7426]" },
    { title: "Pending Doubts", value: 12, icon: <FiMessageSquare className="text-2xl" />, color: "bg-[#4D2C5E]" }
  ];

  const recentActivities = [
    { course: "Python Fundamentals", action: "Uploaded Lecture 5", time: "2 hours ago" },
    { course: "Web Development", action: "Scheduled live class", time: "Yesterday" },
    { course: "Data Science", action: "Replied to 3 doubts", time: "2 days ago" }
  ];

  const upcomingClasses = [
    { course: "Advanced Django", time: "Today, 3:00 PM", students: 24 },
    { course: "Python OOP", time: "Tomorrow, 10:00 AM", students: 18 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">Teacher Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your teaching overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((item, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg shadow-sm border ${item.color.includes("FF7426") ? "border-[#FF7426]/20" : "border-[#4D2C5E]/20"} bg-white`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <p className="text-2xl font-bold mt-1 text-[#4D2C5E]">{item.value}</p>
              </div>
              <div className={`p-3 rounded-full ${item.color.includes("FF7426") ? "bg-[#FF7426]/10 text-[#FF7426]" : "bg-[#4D2C5E]/10 text-[#4D2C5E]"}`}>
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-[#4D2C5E] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <NavLink 
                to="/teacher/upload" 
                className="flex flex-col items-center p-3 rounded-lg bg-[#FF7426]/10 text-[#FF7426] hover:bg-[#FF7426]/20 transition-colors"
              >
                <FiUpload className="text-xl mb-2" />
                <span className="text-sm text-center">Upload Material</span>
              </NavLink>
              <NavLink 
                to="/teacher/schedule" 
                className="flex flex-col items-center p-3 rounded-lg bg-[#4D2C5E]/10 text-[#4D2C5E] hover:bg-[#4D2C5E]/20 transition-colors"
              >
                <FiCalendar className="text-xl mb-2" />
                <span className="text-sm text-center">Schedule Class</span>
              </NavLink>
              <NavLink 
                to="/teacher/doubts" 
                className="flex flex-col items-center p-3 rounded-lg bg-[#FF7426]/10 text-[#FF7426] hover:bg-[#FF7426]/20 transition-colors"
              >
                <FiMessageSquare className="text-xl mb-2" />
                <span className="text-sm text-center">Answer Doubts</span>
              </NavLink>
              <NavLink 
                to="/teacher/analytics" 
                className="flex flex-col items-center p-3 rounded-lg bg-[#4D2C5E]/10 text-[#4D2C5E] hover:bg-[#4D2C5E]/20 transition-colors"
              >
                <FiBarChart2 className="text-xl mb-2" />
                <span className="text-sm text-center">View Analytics</span>
              </NavLink>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#4D2C5E]">Recent Activities</h2>
              <NavLink to="/teacher/activities" className="text-sm text-[#FF7426] hover:underline">View All</NavLink>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start pb-3 border-b border-gray-100 last:border-0">
                  <div className={`p-2 rounded-full mr-3 ${index % 2 === 0 ? "bg-[#FF7426]/10 text-[#FF7426]" : "bg-[#4D2C5E]/10 text-[#4D2C5E]"}`}>
                    {index % 2 === 0 ? <FiUpload /> : <FiMessageSquare />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.course}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Classes */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#4D2C5E]">Upcoming Classes</h2>
              <NavLink to="/teacher/schedule" className="text-sm text-[#FF7426] hover:underline">View Calendar</NavLink>
            </div>
            <div className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="p-3 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-[#4D2C5E]">{classItem.course}</p>
                      <p className="text-sm text-gray-600">{classItem.time}</p>
                    </div>
                    <span className="px-2 py-1 bg-[#FF7426]/10 text-[#FF7426] text-xs rounded-full">
                      {classItem.students} students
                    </span>
                  </div>
                  <button className="w-full mt-3 py-1.5 bg-[#4D2C5E] text-white text-sm rounded-md hover:bg-[#3A2150] transition-colors">
                    Prepare Materials
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Overview */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-[#4D2C5E] mb-4">Performance Overview</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Course Completion Rate</span>
                  <span className="font-medium">82%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#4D2C5E] h-2 rounded-full" 
                    style={{ width: '82%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Student Satisfaction</span>
                  <span className="font-medium">4.7/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#FF7426] h-2 rounded-full" 
                    style={{ width: '94%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Doubt Resolution Time</span>
                  <span className="font-medium">2.1 hrs</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#4D2C5E] h-2 rounded-full" 
                    style={{ width: '65%' }}
                  ></div>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-[#FF7426] text-white text-sm rounded-md hover:bg-[#E65100] transition-colors flex items-center justify-center">
              <FiTrendingUp className="mr-2" />
              View Detailed Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;