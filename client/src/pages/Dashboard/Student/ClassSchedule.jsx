import React, { useState } from 'react';
import { FiCalendar, FiClock, FiVideo } from 'react-icons/fi';

const ClassSchedule = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data
  const upcomingClasses = [
    { id: 1, title: "Python OOP Concepts", date: "2023-06-20", time: "10:00 AM", duration: "1.5 hours", instructor: "Dr. Sarah Johnson" },
    { id: 2, title: "React Hooks Deep Dive", date: "2023-06-22", time: "2:00 PM", duration: "2 hours", instructor: "Prof. Amit Sharma" }
  ];

  const pastClasses = [
    { id: 3, title: "Introduction to Python", date: "2023-06-15", recording: "https://example.com/recording1" },
    { id: 4, title: "HTML & CSS Basics", date: "2023-06-10", recording: "https://example.com/recording2" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#4D2C5E] mb-6">Class Schedule</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`py-2 px-4 font-medium ${activeTab === 'upcoming' ? 'text-[#4D2C5E] border-b-2 border-[#4D2C5E]' : 'text-gray-500 hover:text-[#4D2C5E]'}`}
        >
          Upcoming Classes
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`py-2 px-4 font-medium ${activeTab === 'past' ? 'text-[#4D2C5E] border-b-2 border-[#4D2C5E]' : 'text-gray-500 hover:text-[#4D2C5E]'}`}
        >
          Past Classes
        </button>
      </div>

      {/* Upcoming Classes */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {upcomingClasses.length > 0 ? (
            upcomingClasses.map(cls => (
              <div key={cls.id} className="bg-white p-4 rounded-lg shadow-sm border border-[#4D2C5E]/20 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold text-[#4D2C5E]">{cls.title}</h3>
                    <div className="flex flex-wrap items-center text-gray-600 gap-x-4 gap-y-1 mt-1">
                      <div className="flex items-center">
                        <FiCalendar className="mr-1" />
                        <span>{cls.date}</span>
                      </div>
                      <div className="flex items-center">
                        <FiClock className="mr-1" />
                        <span>{cls.time} ({cls.duration})</span>
                      </div>
                      <div className="flex items-center">
                        <FiVideo className="mr-1" />
                        <span>{cls.instructor}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3A2150]">
                    Add to Calendar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-8 text-center text-gray-500 rounded-lg shadow-sm">
              No upcoming classes scheduled
            </div>
          )}
        </div>
      )}

      {/* Past Classes */}
      {activeTab === 'past' && (
        <div className="space-y-4">
          {pastClasses.length > 0 ? (
            pastClasses.map(cls => (
              <div key={cls.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold text-[#4D2C5E]">{cls.title}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <FiCalendar className="mr-1" />
                      <span>{cls.date}</span>
                    </div>
                  </div>
                  <a
                    href={cls.recording}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#FF7426] text-white rounded-lg hover:bg-[#E65100] text-center"
                  >
                    View Recording
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-8 text-center text-gray-500 rounded-lg shadow-sm">
              No past classes recorded
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassSchedule;