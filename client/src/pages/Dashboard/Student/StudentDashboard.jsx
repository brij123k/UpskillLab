import React from 'react';
import { FiBook, FiCalendar, FiVideo, FiMessageSquare, FiTrendingUp, FiBriefcase } from 'react-icons/fi';

const StudentDashboard = () => {
  // Mock data
  const stats = [
    { title: "Active Courses", value: 3, icon: <FiBook className="text-2xl" />, color: "bg-[#4D2C5E]" },
    { title: "Upcoming Classes", value: 2, icon: <FiCalendar className="text-2xl" />, color: "bg-[#FF7426]" },
    { title: "Pending Doubts", value: 1, icon: <FiMessageSquare className="text-2xl" />, color: "bg-[#4D2C5E]" },
    { title: "Job Opportunities", value: 5, icon: <FiBriefcase className="text-2xl" />, color: "bg-[#FF7426]" }
  ];

  const recentActivities = [
    { course: "Python Fundamentals", action: "Completed Lesson 5", time: "2 hours ago" },
    { course: "Web Development", action: "Submitted Assignment 3", time: "1 day ago" },
    { course: "Data Science", action: "Watched recorded lecture", time: "2 days ago" }
  ];

  const suggestedCourses = [
    { name: "Advanced Python", reason: "Based on your progress in Python Fundamentals" },
    { name: "React JS", reason: "Popular among Web Development students" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#4D2C5E] mb-6">Student Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-sm text-white ${stat.color}`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-[#4D2C5E] mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start pb-3 border-b border-gray-100 last:border-0">
              <div className={`p-2 rounded-full mr-3 ${index % 2 === 0 ? "bg-[#FF7426]/10 text-[#FF7426]" : "bg-[#4D2C5E]/10 text-[#4D2C5E]"}`}>
                <FiBook />
              </div>
              <div>
                <p className="font-medium">{activity.course}</p>
                <p className="text-sm text-gray-600">{activity.action}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Suggested Courses */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-[#4D2C5E] mb-4 flex items-center">
            <FiTrendingUp className="mr-2" />
            Suggested Courses
          </h2>
          <div className="space-y-4">
            {suggestedCourses.map((course, index) => (
              <div key={index} className="p-3 border border-[#4D2C5E]/20 rounded-lg">
                <h3 className="font-medium text-[#4D2C5E]">{course.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{course.reason}</p>
                <button className="mt-2 text-sm text-[#FF7426] hover:underline">
                  View Course Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-[#4D2C5E] mb-4 flex items-center">
            <FiCalendar className="mr-2" />
            Upcoming Classes
          </h2>
          <div className="space-y-4">
            <div className="p-3 border border-[#FF7426]/20 rounded-lg">
              <h3 className="font-medium">Python OOP Concepts</h3>
              <p className="text-sm text-gray-600 mt-1">Tomorrow, 10:00 AM - 11:30 AM</p>
              <button className="mt-2 text-sm text-[#4D2C5E] hover:underline">
                View Materials
              </button>
            </div>
            <div className="p-3 border border-[#FF7426]/20 rounded-lg">
              <h3 className="font-medium">Web Development - React</h3>
              <p className="text-sm text-gray-600 mt-1">Friday, 2:00 PM - 4:00 PM</p>
              <button className="mt-2 text-sm text-[#4D2C5E] hover:underline">
                View Materials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;