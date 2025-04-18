import React, { useState } from 'react';
import { FiCalendar, FiClock, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const ClassSchedule = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data
  const classes = [
    { id: 1, title: "Python OOP Concepts", date: "2023-06-15", time: "10:00 AM", duration: "1.5 hours", students: 24 },
    { id: 2, title: "Web Development - React", date: "2023-06-16", time: "2:00 PM", duration: "2 hours", students: 18 },
    { id: 3, title: "Data Analysis Basics", date: "2023-06-17", time: "11:00 AM", duration: "1 hour", students: 15 },
  ];

  const upcomingClasses = classes.filter(cls => new Date(cls.date) >= new Date());
  const pastClasses = classes.filter(cls => new Date(cls.date) < new Date());

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#4D2C5E]">Class Schedule</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center bg-[#FF7426] text-white px-4 py-2 rounded-lg hover:bg-[#E65100]"
        >
          <FiPlus className="mr-2" />
          Schedule Class
        </button>
      </div>

      {/* Calendar View */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#4D2C5E]">June 2023</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg">Today</button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg">Week</button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg">Month</button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-[#4D2C5E] py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 30 }).map((_, i) => {
            const date = i + 1;
            const hasClass = classes.some(cls => new Date(cls.date).getDate() === date);
            return (
              <div 
                key={date}
                onClick={() => setSelectedDate(new Date(2023, 5, date))}
                className={`h-12 border rounded-lg flex items-center justify-center cursor-pointer
                  ${hasClass ? 'bg-[#4D2C5E]/10 border-[#4D2C5E]' : 'border-gray-200'}
                  ${date === selectedDate.getDate() ? 'ring-2 ring-[#FF7426]' : ''}
                `}
              >
                {date}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 flex items-center">
          <FiCalendar className="mr-2" />
          Upcoming Classes
        </h2>
        
        {upcomingClasses.length > 0 ? (
          <div className="space-y-4">
            {upcomingClasses.map(cls => (
              <div key={cls.id} className="p-4 border border-[#4D2C5E]/20 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-[#4D2C5E]">{cls.title}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <FiCalendar className="mr-1" />
                      <span className="mr-4">{cls.date}</span>
                      <FiClock className="mr-1" />
                      <span>{cls.time} ({cls.duration})</span>
                    </div>
                    <div className="mt-2">
                      <span className="inline-block bg-[#FF7426]/10 text-[#FF7426] text-xs px-2 py-1 rounded-full">
                        {cls.students} students enrolled
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-[#4D2C5E] hover:text-[#FF7426]">
                      <FiEdit2 />
                    </button>
                    <button className="p-2 text-red-500 hover:text-red-700">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No upcoming classes scheduled
          </div>
        )}
      </div>

      {/* Past Classes */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 flex items-center">
          <FiCalendar className="mr-2" />
          Past Classes
        </h2>
        
        {pastClasses.length > 0 ? (
          <div className="space-y-4">
            {pastClasses.map(cls => (
              <div key={cls.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{cls.title}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <FiCalendar className="mr-1" />
                      <span className="mr-4">{cls.date}</span>
                      <FiClock className="mr-1" />
                      <span>{cls.time}</span>
                    </div>
                  </div>
                  <button className="text-[#4D2C5E] hover:text-[#FF7426]">
                    View Attendance
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No past classes recorded
          </div>
        )}
      </div>

      {/* Schedule Class Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#4D2C5E] mb-4">Schedule New Class</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class Title</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50" 
                    placeholder="Enter class title"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                      type="date" 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input 
                      type="time" 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>1.5 hours</option>
                    <option>2 hours</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    rows="3" 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50" 
                    placeholder="Class description..."
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3A2150]">
                  Schedule Class
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSchedule;