import React, { useState } from 'react';
import { FiVideo, FiCalendar, FiClock, FiUsers, FiPlus } from 'react-icons/fi';

const LiveClasses = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Mock data
  const upcomingClasses = [
    { 
      id: 1, 
      title: "Python OOP Concepts", 
      date: "2023-06-20", 
      time: "10:00 AM", 
      duration: "1.5 hours", 
      students: 24,
      meetingLink: "https://meet.upskillab.com/py-oop"
    },
    { 
      id: 2, 
      title: "React Hooks Deep Dive", 
      date: "2023-06-22", 
      time: "2:00 PM", 
      duration: "2 hours", 
      students: 18,
      meetingLink: "https://meet.upskillab.com/react-hooks"
    },
  ];

  const ongoingClasses = [
    { 
      id: 3, 
      title: "Data Analysis with Pandas", 
      startedAt: "9:30 AM", 
      students: 15,
      meetingLink: "https://meet.upskillab.com/pandas"
    }
  ];

  const pastClasses = [
    { 
      id: 4, 
      title: "Introduction to Python", 
      date: "2023-06-15", 
      attendance: "22/25",
      recordingLink: "https://recordings.upskillab.com/py-intro"
    },
    { 
      id: 5, 
      title: "Web Development Basics", 
      date: "2023-06-10", 
      attendance: "18/20",
      recordingLink: "https://recordings.upskillab.com/web-basics"
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#4D2C5E]">Live Classes</h1>
        <button className="flex items-center bg-[#FF7426] text-white px-4 py-2 rounded-lg hover:bg-[#E65100]">
          <FiPlus className="mr-2" />
          Schedule Class
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`py-2 px-4 font-medium ${activeTab === 'upcoming' ? 'text-[#4D2C5E] border-b-2 border-[#4D2C5E]' : 'text-gray-500 hover:text-[#4D2C5E]'}`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('ongoing')}
          className={`py-2 px-4 font-medium ${activeTab === 'ongoing' ? 'text-[#4D2C5E] border-b-2 border-[#4D2C5E]' : 'text-gray-500 hover:text-[#4D2C5E]'}`}
        >
          Ongoing
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
                        <FiUsers className="mr-1" />
                        <span>{cls.students} students</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={cls.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3A2150] text-center"
                  >
                    Start Class
                  </a>
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

      {/* Ongoing Classes */}
      {activeTab === 'ongoing' && (
        <div className="space-y-4">
          {ongoingClasses.length > 0 ? (
            ongoingClasses.map(cls => (
              <div key={cls.id} className="bg-white p-4 rounded-lg shadow-sm border-2 border-[#FF7426]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold text-[#4D2C5E]">{cls.title}</h3>
                    <div className="flex flex-wrap items-center text-gray-600 gap-x-4 gap-y-1 mt-1">
                      <div className="flex items-center">
                        <FiClock className="mr-1" />
                        <span>Started at {cls.startedAt}</span>
                      </div>
                      <div className="flex items-center">
                        <FiUsers className="mr-1" />
                        <span>{cls.students} students joined</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={cls.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#FF7426] text-white rounded-lg hover:bg-[#E65100] text-center"
                  >
                    Join Class
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-8 text-center text-gray-500 rounded-lg shadow-sm">
              No ongoing classes at this time
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
                    <div className="flex flex-wrap items-center text-gray-600 gap-x-4 gap-y-1 mt-1">
                      <div className="flex items-center">
                        <FiCalendar className="mr-1" />
                        <span>{cls.date}</span>
                      </div>
                      <div className="flex items-center">
                        <FiUsers className="mr-1" />
                        <span>Attendance: {cls.attendance}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={cls.recordingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3A2150] text-center"
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

export default LiveClasses;