import React from 'react';
import { FiTrendingUp, FiBarChart2, FiDollarSign, FiBook } from 'react-icons/fi';

const MarketAnalysis = () => {
  // Mock data
  const trendingSkills = [
    { skill: "Python Programming", demand: "High", avgSalary: "₹8-12 LPA", courses: 24 },
    { skill: "Data Science", demand: "Very High", avgSalary: "₹10-15 LPA", courses: 18 },
    { skill: "Web Development", demand: "High", avgSalary: "₹6-10 LPA", courses: 32 },
    { skill: "Cloud Computing", demand: "Growing", avgSalary: "₹9-14 LPA", courses: 12 },
  ];

  const studentInterests = [
    { course: "Python Fundamentals", students: 145, trend: "up" },
    { course: "Machine Learning", students: 98, trend: "up" },
    { course: "React JS", students: 76, trend: "steady" },
    { course: "DevOps", students: 52, trend: "up" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#4D2C5E] mb-6">Market Analysis</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-[#4D2C5E]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Trending Skills</p>
              <p className="text-2xl font-bold text-[#4D2C5E]">12</p>
            </div>
            <div className="p-3 rounded-full bg-[#FF7426]/10 text-[#FF7426]">
              <FiTrendingUp className="text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-[#4D2C5E]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Salary Increase</p>
              <p className="text-2xl font-bold text-[#4D2C5E]">25%</p>
            </div>
            <div className="p-3 rounded-full bg-[#4D2C5E]/10 text-[#4D2C5E]">
              <FiDollarSign className="text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-[#4D2C5E]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New Courses Added</p>
              <p className="text-2xl font-bold text-[#4D2C5E]">8</p>
            </div>
            <div className="p-3 rounded-full bg-[#FF7426]/10 text-[#FF7426]">
              <FiBook className="text-xl" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Trending Skills */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 flex items-center">
          <FiTrendingUp className="mr-2" />
          Trending Skills in Market
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Skill</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Demand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Avg. Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Courses Available</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trendingSkills.map((skill, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{skill.skill}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      skill.demand === "Very High" ? "bg-red-100 text-red-800" :
                      skill.demand === "High" ? "bg-orange-100 text-orange-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {skill.demand}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{skill.avgSalary}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{skill.courses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Student Interests */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 flex items-center">
          <FiBarChart2 className="mr-2" />
          Student Interests
        </h2>
        
        <div className="space-y-4">
          {studentInterests.map((course, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{course.course}</h3>
                <span className={`flex items-center text-sm ${
                  course.trend === "up" ? "text-green-600" : "text-gray-600"
                }`}>
                  {course.trend === "up" ? "↑ Growing" : "→ Steady"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-[#4D2C5E] h-2.5 rounded-full" 
                  style={{ width: `${(course.students / 200) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{course.students} students</span>
                <span>Last updated: 1 week ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;