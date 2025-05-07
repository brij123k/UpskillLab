import React, { useEffect, useState } from 'react';
import { FiCalendar, FiClock,FiX, FiPlus, FiEdit2, FiTrash2, FiUsers, FiVideo } from 'react-icons/fi';
import { getDataHandler,postDataHandlerWithToken, getDataHandlerWithToken } from '../../../config/services';
import { toast } from 'react-toastify';
const ClassSchedule = () => {
  const [showModal, setShowModal] = useState(false);
  const [classSessions, setClassSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [batches,setBatches]=useState(null)
const [classTitle, setClassTitle] = useState('');
const [selectedBatchId, setSelectedBatchId] = useState('');
const [date, setDate] = useState('');
const [startTime, setStartTime] = useState('');
const [endDate, setEndDate] = useState(60);
const [platform, setPlatform] = useState('zoom');
const [meetingLink, setMeetingLink] = useState('');
const [meetingPassword, setMeetingPassword] = useState('');
const [description, setDescription] = useState('');
const [teacherId, setTeacherId] = useState('')
  const fetchClassSessions = async () => {
    try {
      setIsLoading(true);
      const response = await getDataHandlerWithToken('ClassSchedule');
      const responseid = await getDataHandlerWithToken('teacherProfile');      
      setTeacherId(responseid._id);
      setClassSessions(response.classSessions || []);
    } catch (error) {
      toast.error("Failed to load class sessions");
      console.error('Error fetching class sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchBatchs = async () => {
    try {
      setIsLoading(true);
      const response = await getDataHandler('upcomingBatches');
      console.log(response)
      setBatches(response || []);
    } catch (error) {
      toast.error("Failed to load class sessions");
      console.error('Error fetching class sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchClassSessions();
    fetchBatchs()
  }, []);

  // Filter upcoming and past classes
  const now = new Date();
  const upcomingClasses = classSessions.filter(session => 
    new Date(session.scheduledDate) >= now
  );
  const pastClasses = classSessions.filter(session => 
    new Date(session.scheduledDate) < now
  );

  // Format date and time
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  // Calendar helpers
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    // Create array of days with class indicators
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const hasClass = classSessions.some(session => 
        new Date(session.scheduledDate).toDateString() === currentDate.toDateString()
      );

      days.push(
        <div 
          key={`day-${i}`}
          className={`h-12 border rounded-lg flex items-center justify-center cursor-pointer
            ${hasClass ? 'bg-[#4D2C5E]/10 border-[#4D2C5E]' : 'border-gray-200'}
          `}
        >
          {i}
        </div>
      );
    }

    return days;
  };


  const handleScheduleClass = async (e) => {
    e.preventDefault();
  
    const payload = {
      title: classTitle,
      batchId: selectedBatchId,
      scheduledDate:date,
      scheduledStartTime:startTime,
      scheduledEndTime:endDate,
      meetingPlatform:platform,
      meetingLink:meetingLink,
      meetingPassword:meetingPassword,
      description:description,
      teacherId:teacherId
    };
  
    try {
      const response = await postDataHandlerWithToken('ClassSchedule', payload); // Update endpoint as needed
      toast.success('Class scheduled successfully!');
      setShowModal(false);
      // Optionally reset form state here
    } catch (error) {
      toast.error('Failed to schedule class');
      console.error('Schedule Error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#4D2C5E]">Class Schedule</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center bg-[#FF7426] text-white px-4 py-2 rounded-lg hover:bg-[#E65100] transition-colors"
        >
          <FiPlus className="mr-2" />
          Schedule Class
        </button>
      </div>

      {/* Calendar View */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#4D2C5E]">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentMonth(new Date())}
              className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Today
            </button>
            <button 
              onClick={() => setCurrentMonth(new Date(
                currentMonth.getFullYear(), currentMonth.getMonth() - 1
              ))}
              className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Previous
            </button>
            <button 
              onClick={() => setCurrentMonth(new Date(
                currentMonth.getFullYear(), currentMonth.getMonth() + 1
              ))}
              className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Next
            </button>
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
          {renderCalendar()}
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
            {upcomingClasses.map(session => (
              <div key={session._id} className="p-4 border border-[#4D2C5E]/20 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[#4D2C5E]">{session.title}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <FiCalendar className="mr-1" />
                      <span className="mr-4">{formatDate(session.scheduledDate)}</span>
                      <FiClock className="mr-1" />
                      <span>
                        {formatTime(session.scheduledStartTime)} - {formatTime(session.scheduledEndTime)}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center bg-[#FF7426]/10 text-[#FF7426] text-xs px-2 py-1 rounded-full">
                        <FiUsers className="mr-1" />
                        {session.batchId?.remainingSeats || 0} seats available
                      </span>
                      <span className="inline-flex items-center bg-[#4D2C5E]/10 text-[#4D2C5E] text-xs px-2 py-1 rounded-full">
                        <FiVideo className="mr-1" />
                        {session.meetingPlatform || 'Zoom'}
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
                {session.description && (
                  <p className="mt-2 text-gray-600">{session.description}</p>
                )}
                <div className="mt-3">
                  <a 
                    href={session.meetingLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-[#4D2C5E] text-white px-3 py-1 rounded text-sm hover:bg-[#3A2152]"
                  >
                    Join Class
                  </a>
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
            {pastClasses.map(session => (
              <div key={session._id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-[#4D2C5E]">{session.title}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <FiCalendar className="mr-1" />
                      <span className="mr-4">{formatDate(session.scheduledDate)}</span>
                      <FiClock className="mr-1" />
                      <span>{formatTime(session.scheduledStartTime)}</span>
                    </div>
                  </div>
                  <button className="text-[#4D2C5E] hover:text-[#FF7426] text-sm">
                    View Attendance
                  </button>
                </div>
                {session.description && (
                  <p className="mt-2 text-gray-600 text-sm">{session.description}</p>
                )}
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
        <div className="fixed inset-0 bg-[#0000005d] bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#4D2C5E]">Schedule New Class</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <form className="space-y-4" onSubmit={handleScheduleClass}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class Title</label>
                  <input 
                    type="text" 
                    value={classTitle}
                    onChange={(e) => setClassTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-transparent" 
                    placeholder="Enter class title"
                    required
                  />
                </div>
                <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Select Batch</label>
  <select
    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-transparent"
    value={selectedBatchId} // you can define this in state
    onChange={(e) => setSelectedBatchId(e.target.value)} // make sure to use useState
    required
  >
    <option value="">-- Select a Batch --</option>
    {batches.map((batch) => (
      <option key={batch.batchId} value={batch.batchId}>
        {batch.course.courseName} ({batch.batchCode})
      </option>
    ))}
  </select>
</div>

                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-transparent" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input 
                      type="time" 
                      value={startTime}
                      onChange={(e)=> setStartTime(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-transparent" 
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <input 
                      type="time" 
                      value={endDate}
                      onChange={(e)=> setEndDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-transparent" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Platform</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-transparent"
                      value={platform}
  onChange={(e) => setPlatform(e.target.value)}
                      required
                    >
                      <option value="zoom">Zoom</option>
                      <option value="google-meet">Google Meet</option>
                      <option value="microsoft-teams">Microsoft Teams</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
                  <input 
                    type="url" 
                    value={meetingLink}
                    onChange={(e)=> setMeetingLink(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-transparent" 
                    placeholder="https://"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Password (optional)</label>
                  <input 
                    type="text" 
                    value={meetingPassword}
                    onChange={(e)=> setMeetingPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-transparent" 
                    placeholder="Enter password if required"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    rows="3" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-transparent" 
                    placeholder="Class description..."
                  ></textarea>
                </div>
              
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3A2152]"
                >
                  Schedule Class
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSchedule;