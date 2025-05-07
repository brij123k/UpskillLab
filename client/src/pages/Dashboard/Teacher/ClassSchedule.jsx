import React, { useEffect, useState } from 'react';
import { FiCalendar,FiCheckCircle, FiLock, FiBookmark, FiClock, FiX, FiPlus, FiEdit2, FiUsers, FiVideo } from 'react-icons/fi';
import { getDataHandler, postDataHandlerWithToken, getDataHandlerWithToken } from '../../../config/services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LiveClassesSection from '../../../components/LiveClassesSection';
const ClassSchedule = () => {
  const [showModal, setShowModal] = useState(false);
  const [classSessions, setClassSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [batches, setBatches] = useState(null);
  const [classTitle, setClassTitle] = useState('');
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [platform, setPlatform] = useState('zoom');
  const [meetingLink, setMeetingLink] = useState('');
  const [meetingPassword, setMeetingPassword] = useState('');
  const [description, setDescription] = useState('');
  const [teacherId, setTeacherId] = useState('');

  const fetchClassSessions = async () => {
    try {
      setIsLoading(true);
      const response = await getDataHandlerWithToken('ClassSchedule');
      console.log(response)
      const responseId = await getDataHandlerWithToken('teacherProfile');
      setTeacherId(responseId._id);
      setClassSessions(response.classSessions || []);
    } catch (error) {
      toast.error('Failed to load class sessions');
      console.error('Error fetching class sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBatches = async () => {
    try {
      setIsLoading(true);
      const response = await getDataHandler('upcomingBatches');
      setBatches(response || []);
    } catch (error) {
      toast.error('Failed to load batches');
      console.error('Error fetching batches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClassSessions();
    fetchBatches();
  }, []);

  // Filter upcoming and past classes
  const now = new Date();
  const upcomingClasses = classSessions.filter(session => new Date(session.scheduledDate) >= now);
  const pastClasses = classSessions.filter(session => new Date(session.scheduledDate) < now);

  // Format date and time
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  // Calendar helpers
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const hasClass = classSessions.some(session => new Date(session.scheduledDate).toDateString() === currentDate.toDateString());
      const isToday = i === todayDate && month === todayMonth && year === todayYear;
      const isPast = currentDate < today && !isToday;
      const isFutureOrToday = currentDate >= today;

      days.push(
        <div
          key={`day-${i}`}
          className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer text-sm font-medium
            ${isToday && hasClass ? 'border-2 border-red-500 bg-[#FF7426] text-white' : ''}
            ${isToday && !hasClass ? 'border-2 border-red-500 bg-white text-gray-700' : ''}
            ${isPast && hasClass ? 'bg-gray-200 text-gray-500' : ''}
            ${isPast && !hasClass ? 'bg-gray-200 text-gray-500' : ''}
            ${!isToday && isFutureOrToday && hasClass ? 'bg-[#4D2C5E] text-white' : ''}
            ${!isToday && isFutureOrToday && !hasClass ? 'text-gray-700 hover:bg-gray-100' : ''}
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
      scheduledDate: date,
      scheduledStartTime: startTime,
      scheduledEndTime: endDate,
      meetingPlatform: platform,
      meetingLink: meetingLink,
      meetingPassword: meetingPassword,
      description: description,
      teacherId: teacherId,
    };

    try {
      await postDataHandlerWithToken('ClassSchedule', payload);
      toast.success('Class scheduled wait for approvel!');
      setShowModal(false);
      fetchClassSessions();
      // Reset form
      setClassTitle('');
      setSelectedBatchId('');
      setDate('');
      setStartTime('');
      setEndDate('');
      setPlatform('zoom');
      setMeetingLink('');
      setMeetingPassword('');
      setDescription('');
    } catch (error) {
      toast.error('Failed to schedule class');
      console.error('Schedule Error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gray-50 p-6">
      <LiveClassesSection classes={classSessions}/>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#4D2C5E] tracking-tight">Class Schedule</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center bg-[#FF7426] text-white px-5 py-2.5 rounded-lg hover:bg-[#E65100] transition-colors duration-200 shadow-md"
          >
            <FiPlus className="mr-2 h-5 w-5" />
            Schedule Class
          </button>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#4D2C5E]">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <div className="flex space-x-3">
              <button
                onClick={() => setCurrentMonth(new Date())}
                className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3A2152] transition-colors duration-200"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="px-4 py-2 border border-[#4D2C5E] text-[#4D2C5E] rounded-lg hover:bg-[#4D2C5E]/10 transition-colors duration-200"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="px-4 py-2 border border-[#4D2C5E] text-[#4D2C5E] rounded-lg hover:bg-[#4D2C5E]/10 transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-[#4D2C5E] text-sm">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
        </div>

        {/* Upcoming Classes */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#4D2C5E] mb-6 flex items-center">
            <FiCalendar className="mr-2 h-5 w-5" />
            Upcoming Classes
          </h2>
          {upcomingClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingClasses.map(session => (
              <div
                key={session._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 border border-gray-100 relative overflow-hidden"
              >
                {/* Decorative elements on the right */}
                <div className="absolute top-0 right-0 h-full w-2 bg-gradient-to-b from-[#FF7426] to-[#4D2C5E]"></div>
                <div className="absolute top-4 right-2 w-8 h-8 rounded-full bg-[#FF7426] opacity-10"></div>
                <div className="absolute bottom-8 right-4 w-6 h-6 rounded-full bg-[#4D2C5E] opacity-10"></div>
                
                <div className="flex justify-between items-start mb-4 pr-4">
                  <h3 className="text-lg font-semibold text-[#4D2C5E]">{session.title}</h3>
                  {/* Status badge */}
                  {session.isApproved ? (
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 flex items-center">
                      <FiCheckCircle className="mr-1 h-3 w-3" />
                      Approved
                    </span>
                  ) : (
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 flex items-center">
                      <FiClock className="mr-1 h-3 w-3" />
                      Pending
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 pr-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiCalendar className="mr-2 h-4 w-4 text-[#4D2C5E]" />
                    {formatDate(session.scheduledDate)}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiClock className="mr-2 h-4 w-4 text-[#4D2C5E]" />
                    {formatTime(session.scheduledStartTime)} - {formatTime(session.scheduledEndTime)}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiUsers className="mr-2 h-4 w-4 text-[#4D2C5E]" />
                    {session.batchId?.remainingSeats || 0} seats
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiVideo className="mr-2 h-4 w-4 text-[#4D2C5E]" />
                    {session.meetingPlatform || 'Zoom'}
                  </div>
                </div>
                
                {session.description && (
                  <p className="mt-4 text-gray-600 text-sm line-clamp-2 pr-4">{session.description}</p>
                )}
                
                <div className="mt-6 flex justify-between items-center pr-4">
                  <a
                    href={session.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium ${
                      session.isApproved 
                        ? 'bg-[#4D2C5E] hover:bg-[#3A2152]' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    style={!session.isApproved ? {pointerEvents: 'none'} : {}}
                  >
                    {session.isApproved ? 'Join Class' : 'Pending Approval'}
                  </a>
                  {/* Optional decorative icon */}
                  {session.isApproved ? (
                    <FiBookmark className="text-[#4D2C5E] opacity-30 h-6 w-6" />
                  ) : (
                    <FiLock className="text-gray-400 h-6 w-6" />
                  )}
                </div>
              </div>
            ))}
          </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-500">
              No upcoming classes scheduled
            </div>
          )}
        </div>

        {/* Past Classes */}
        <div>
          <h2 className="text-xl font-bold text-[#4D2C5E] mb-6 flex items-center">
            <FiCalendar className="mr-2 h-5 w-5" />
            Past Classes
          </h2>
          {pastClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastClasses.map(session => (
                <div
                  key={session._id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-[#4D2C5E] mb-4">{session.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiCalendar className="mr-2 h-4 w-4" />
                      {formatDate(session.scheduledDate)}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiClock className="mr-2 h-4 w-4" />
                      {formatTime(session.scheduledStartTime)}
                    </div>
                  </div>
                  {session.description && (
                    <p className="mt-4 text-gray-600 text-sm line-clamp-2">{session.description}</p>
                  )}
                  <div className="mt-4">
                    <button className="text-[#4D2C5E] hover:text-[#FF7426] text-sm font-medium">
                      View Attendance
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-500">
              No past classes recorded
            </div>
          )}
        </div>

        {/* Schedule Class Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-[#00000080] backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#4D2C5E]">Schedule New Class</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                <form className="space-y-5" onSubmit={handleScheduleClass}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Class Title</label>
                    <input
                      type="text"
                      value={classTitle}
                      onChange={e => setClassTitle(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                      placeholder="Enter class title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Batch</label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                      value={selectedBatchId}
                      onChange={e => setSelectedBatchId(e.target.value)}
                      required
                    >
                      <option value="">-- Select a Batch --</option>
                      {batches?.map(batch => (
                        <option key={batch.batchId} value={batch.batchId}>
                          {batch.course.courseName} ({batch.batchCode})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Time</label>
                      <input
                        type="time"
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">End Time</label>
                      <input
                        type="time"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Meeting Platform</label>
                      <select
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                        value={platform}
                        onChange={e => setPlatform(e.target.value)}
                        required
                      >
                        <option value="zoom">Zoom</option>
                        <option value="google_meet">Google Meet</option>
                        <option value="ms_teams">Microsoft Teams</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Meeting Link</label>
                    <input
                      type="url"
                      value={meetingLink}
                      onChange={e => setMeetingLink(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                      placeholder="https://"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Meeting Password (optional)</label>
                    <input
                      type="text"
                      value={meetingPassword}
                      onChange={e => setMeetingPassword(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                      placeholder="Enter password if required"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                    <textarea
                      rows="4"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                      placeholder="Class description..."
                    ></textarea>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3A2152] transition-colors duration-200"
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
    </div>
  );
};

export default ClassSchedule;