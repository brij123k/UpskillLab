import React, { useState, useEffect } from 'react';
import { 
  FiBook, FiCalendar, FiVideo, FiMessageSquare, 
  FiBell, FiBriefcase, FiDownload, FiClock,
  FiChevronRight, FiUsers, FiCheckCircle, FiAward,
  FiBarChart2, FiBookOpen, FiLayers
} from 'react-icons/fi';
import { getDataHandlerWithToken } from '../../../config/services';
import { format, isBefore, isAfter } from 'date-fns';
import ApiConfig from '../../../config/apiConfig';
import useNotificationService from '../../../config/notificationService';
import { useNavigate } from 'react-router-dom';
const StudentDashboard = () => {
  const [stats, setStats] = useState({
    courses: 0,
    materials: 0,
    attendance: 0,
    assignments: 0,
    doubts: 0,
    notifications: 0
  });
  const [todayClasses, setTodayClasses] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const {notifications, setNotifications} = useNotificationService('student',['student','adminStudent','teacherStudent']);
  const [loading, setLoading] = useState(true);

const navigate = useNavigate();
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const endpoint = ApiConfig.Notifications('student');
        
        // Fetch all data in parallel
        const [
          profileRes, 
          classesRes, 
          // materialsRes, 
          notificationsRes,
          attendanceRes
        ] = await Promise.all([
          getDataHandlerWithToken('studentProfile'),
          getDataHandlerWithToken('StudentClassSchedule'),
          // getDataHandlerWithToken('studyMaterials'),
          getDataHandlerWithToken(endpoint, null, null, true),
          getDataHandlerWithToken('studentAttendance')
        ]);
        // console.log(classesRes)
        // Process data
      const courseIds = profileRes.batch.map(batch => batch.course);
      if (courseIds.length === 0) {
        setStudyMaterials([]);
        return;
      }
      const materialsPromises = courseIds.map(courseId => {
      
          const endpoint2 = ApiConfig.studyMaterialByCourse(courseId);
        
        return getDataHandlerWithToken(endpoint2, null, null, true);
      });

      const materialsResponses = await Promise.all(materialsPromises);
      const allMaterials = materialsResponses.flatMap(res => res.studyMaterials || []);
      setStudyMaterials(allMaterials);

        const now = new Date();
        const allClasses = classesRes.classSessions || [];
        console.log(allClasses)
        // Today's classes
        const today = allClasses.filter(session => {
          const sessionDate = new Date(session.scheduledDate);
          return (
            sessionDate.getDate() === now.getDate() &&
            sessionDate.getMonth() === now.getMonth() &&
            sessionDate.getFullYear() === now.getFullYear()
          );
        });

        // Live classes
        const live = today.filter(session => {
          const start = new Date(session.scheduledDate);
          const startTimeParts = session.scheduledStartTime.split(':');
          start.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]));
          
          const end = new Date(session.scheduledDate);
          const endTimeParts = session.scheduledEndTime.split(':');
          end.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]));
          
          return isBefore(start, now) && isAfter(end, now);
        });

        // Calculate attendance percentage
        let attendancePercentage = 0;
        if (attendanceRes && attendanceRes.attendance && attendanceRes.attendance.length > 0) {
          const totalClasses = attendanceRes.attendance.length;
          const attendedClasses = attendanceRes.attendance.filter(cls => cls.status === 'present').length;
          attendancePercentage = Math.round((attendedClasses / totalClasses) * 100);
        }

        setTodayClasses(today);
        setLiveClasses(live);
        // setStudyMaterials(materialsRes.studyMaterials || []);
        setNotifications(notificationsRes || []);

        // Set stats
        setStats({
          courses: profileRes.batch?.length || 0,
          materials: allMaterials?.length || 0,
          attendance: attendancePercentage,
          assignments: 0, // You'll need to fetch this separately
          doubts: 0, // You'll need to fetch this separately
          notifications: notificationsRes.length || 0
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, 'h:mm a');
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your academic overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={<FiBookOpen className="text-2xl" />}
          title="Enrolled Courses"
          value={stats.courses}
          color="from-[#4D2C5E] to-[#6D3B8E]"
          unit=" Courses"
        />
        <StatCard 
          icon={<FiLayers className="text-2xl" />}
          title="Study Materials"
          value={stats.materials}
          color="from-[#FF7426] to-[#FF9655]"
          unit=" Files"
        />
        <StatCard 
          icon={<FiBarChart2 className="text-2xl" />}
          title="Attendance"
          value={stats.attendance}
          color="from-[#10B981] to-[#34D399]"
          unit=" %"
        />
        {/* <StatCard 
          icon={<FiAward className="text-2xl" />}
          title="Assignments"
          value={stats.assignments}
          color="from-[#3B82F6] to-[#60A5FA]"
          unit="Pending"
        /> */}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
  {/* Live Classes Section */}
  {liveClasses.length > 0 && (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="w-3 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-3"></div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Live Classes</h2>
          <p className="text-sm text-gray-500">Classes happening right now</p>
        </div>
        <span className="ml-auto px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full flex items-center animate-pulse">
          <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
          LIVE NOW
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {liveClasses.map(session => (
          <div 
            key={session._id} 
            className="relative bg-gradient-to-br from-red-50 to-white rounded-xl shadow-md border border-red-100 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
            <div className="p-5">
              <div className="flex items-start mb-3">
                <div className="bg-red-100 p-2 rounded-lg mr-4">
                  <FiVideo className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{session.title}</h3>
                  <p className="text-sm text-gray-600">{session.course?.courseName || 'General Class'}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="flex items-center text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                  <FiClock className="mr-1 text-red-500" />
                  {formatTime(session.scheduledStartTime)} - {formatTime(session.scheduledEndTime)}
                </span>
                <span className="flex items-center text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                  <FiUsers className="mr-1 text-red-500" />
                  {session.teacherId?.name || 'Instructor'}
                </span>
                <span className="flex items-center text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                  <FiVideo className="mr-1 text-red-500" />
                  {session.meetingPlatform || 'Zoom'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {formatDate(session.scheduledDate)}
                </span>
                <a
                  href={session.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all ${
                    !session.isApproved ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  style={!session.isApproved ? {pointerEvents: 'none'} : {}}
                >
                  Join Live Class
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* All Classes Section */}
 <div className="lg:col-span-2 space-y-6">
  {/* All Classes Section */}
  <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
    <div className="flex items-center mb-6">
      <div className="w-3 h-8 bg-gradient-to-r from-[#4D2C5E] to-[#6D3B8E] rounded-full mr-3"></div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Your Classes</h2>
        <p className="text-sm text-gray-500">Upcoming and past class sessions</p>
      </div>
    </div>
    
    {todayClasses.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {todayClasses.map(session => {
          const now = new Date();
          // Create proper Date objects from the session data
          const startDateTime = new Date(session.scheduledDate);
          const [startHours, startMinutes] = session.scheduledStartTime.split(':');
          startDateTime.setHours(parseInt(startHours), parseInt(startMinutes));
          
          const endDateTime = new Date(session.scheduledDate);
          const [endHours, endMinutes] = session.scheduledEndTime.split(':');
          endDateTime.setHours(parseInt(endHours), parseInt(endMinutes));
          
          const isUpcoming = now < startDateTime;
          const isCompleted = now > endDateTime;
          const isLiveNow = now >= startDateTime && now <= endDateTime;
          
          return (
            <div 
              key={session._id} 
              className={`relative rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 ${
                isCompleted ? 'border border-gray-200' : 'border border-[#4D2C5E]/30'
              }`}
            >
              {isLiveNow && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
              )}
              {isUpcoming && !isLiveNow && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4D2C5E] to-[#6D3B8E]"></div>
              )}
              {isCompleted && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-300"></div>
              )}
              
              <div className="p-5">
                <div className="flex items-start mb-3">
                  <div className={`p-2 rounded-lg mr-4 ${
                    isLiveNow ? 'bg-red-100 text-red-600' :
                    isUpcoming ? 'bg-[#4D2C5E]/10 text-[#4D2C5E]' :
                    isCompleted ? 'bg-gray-100 text-gray-500' :
                    'bg-[#FF7426]/10 text-[#FF7426]'
                  }`}>
                    <FiVideo className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{session.title}</h3>
                    <p className="text-sm text-gray-600">{session.batchId?.batchCode || 'General Class'}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`flex items-center text-xs px-2 py-1 rounded-full ${
                    isLiveNow ? 'bg-red-100 text-red-600' :
                    isUpcoming ? 'bg-[#4D2C5E]/10 text-[#4D2C5E]' :
                    isCompleted ? 'bg-gray-100 text-gray-600' :
                    'bg-[#FF7426]/10 text-[#FF7426]'
                  }`}>
                    <FiClock className="mr-1" />
                    {formatTime(session.scheduledStartTime)} - {formatTime(session.scheduledEndTime)}
                  </span>
                  <span className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                    <FiUsers className="mr-1" />
                    {session.teacherId?.name || 'Instructor'}
                  </span>
                  <span className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                    <FiVideo className="mr-1" />
                    {session.meetingPlatform || 'Zoom'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {formatDate(session.scheduledDate)}
                  </span>
                  {isCompleted ? (
                    <button className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-200 text-gray-600 cursor-not-allowed">
                      Completed
                    </button>
                  ) : (
                    <a
                      href={session.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        isLiveNow ? 'bg-red-500 text-white hover:bg-red-600' :
                        session.isApproved ? 
                          (isUpcoming ? 'bg-[#4D2C5E] text-white hover:bg-[#3a2152]' : 
                           'bg-[#FF7426] text-white hover:bg-[#E65100]') :
                        'bg-gray-400 text-gray-700 cursor-not-allowed'
                      }`}
                      style={!session.isApproved ? {pointerEvents: 'none'} : {}}
                    >
                      {isLiveNow ? 'Join Live' : 
                       session.isApproved ? (isUpcoming ? 'Join Soon' : 'Join Now') : 
                       'Pending Approval'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="text-center py-10">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FiCalendar className="text-3xl text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-1">No classes scheduled</h3>
        <p className="text-gray-500">Your upcoming classes will appear here</p>
      </div>
    )}
  </div>
</div>
</div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Stats */}
          {/* <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#4D2C5E] mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Course Progress</span>
                <div className="w-24 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#4D2C5E] h-2.5 rounded-full" style={{width: '65%'}}></div>
                </div>
                <span className="text-[#4D2C5E] font-medium">65%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Assignment Completion</span>
                <div className="w-24 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#FF7426] h-2.5 rounded-full" style={{width: '42%'}}></div>
                </div>
                <span className="text-[#FF7426] font-medium">42%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Upcoming Deadlines</span>
                <span className="text-[#4D2C5E] font-medium">3</span>
              </div>
            </div>
          </div> */}

          {/* Recent Materials */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 flex items-center">
              <FiDownload className="mr-2 h-5 w-5" />
              Recent Materials
            </h2>
            
            <div className="space-y-3">
              {studyMaterials.slice(0, 3).map(material => (
                <div key={material._id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                  <div className={`p-2 rounded-lg mr-3 ${
                    material.fileLink?.endsWith('.pdf') ? 'bg-red-100 text-red-600' :
                    material.fileLink?.endsWith('.docx') ? 'bg-blue-100 text-blue-600' :
                    'bg-[#4D2C5E]/10 text-[#4D2C5E]'
                  }`}>
                    <FiBook className="text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{material.title}</h3>
                    <p className="text-xs text-gray-600 truncate">{material.course?.courseName}</p>
                  </div>
                  <a 
                    href={material.fileLink} 
                    className="text-[#4D2C5E] hover:text-[#FF7426] p-2 transition-colors"
                    download
                    title="Download"
                  >
                    <FiDownload />
                  </a>
                </div>
              ))}
            </div>
            
            {studyMaterials.length > 3 && (
              <div className="mt-4 text-center">
                <button className="text-[#4D2C5E] hover:text-[#FF7426] font-medium transition-colors">
                  View All <FiChevronRight className="inline ml-1" />
                </button>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 flex items-center">
              <FiBell className="mr-2 h-5 w-5" />
              Notifications
            </h2>
            
            <div className="space-y-3">
              {notifications.slice(0, 3).map(notification => (
                <div key={notification._id} className={`p-3 rounded-lg transition-all ${!notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'}`}>
                  <div className="flex justify-between">
                    <h3 className="font-medium text-[#4D2C5E]">{notification.type}</h3>
                    <span className="text-xs text-gray-500">
                      {formatDate(notification.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                </div>
              ))}
            </div>
            
            {notifications.length > 3 && (
              <div className="mt-4 text-center">
                <button 
                onClick={()=>navigate(`/Student/Notifications`)}
                className="text-[#4D2C5E] hover:text-[#FF7426] font-medium transition-colors">
                  View All <FiChevronRight className="inline ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Stat Card Component
const StatCard = ({ icon, title, value, color, unit }) => {
  return (
    <div className={`bg-gradient-to-r ${color} rounded-xl shadow-md p-5 text-white`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}{unit}</h3>
        </div>
        <div className="bg-white/20 p-3 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="mt-4 pt-2 border-t border-white/10">
        <p className="text-xs opacity-80">
          {value > 0 ? 'Good progress' : 'No data available'}
        </p>
      </div>
    </div>
  );
};

// Class Card Component
const ClassCard = ({ session, isLive }) => {
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, 'h:mm a');
  };

  return (
    <div className={`border rounded-xl p-4 transition-all ${isLive ? 'border-red-200 bg-red-50 shadow-md' : 'border-[#4D2C5E]/20 hover:shadow-md'}`}>
      {isLive && (
        <div className="flex items-center mb-2">
          <span className="flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-xs text-red-500 font-medium">LIVE NOW</span>
        </div>
      )}
      
      <h3 className="font-bold text-[#4D2C5E]">{session.title}</h3>
      <div className="flex items-center text-sm text-gray-600 mt-2">
        <FiClock className="mr-1" />
        <span>{formatTime(session.scheduledStartTime)} - {formatTime(session.scheduledEndTime)}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 mt-1">
        <FiUsers className="mr-1" />
        <span>{session.teacherId?.name || 'Teacher'}</span>
      </div>
      
      <button className={`mt-4 w-full py-2 rounded-lg text-sm font-medium transition-all ${
        isLive 
          ? 'bg-red-500 text-white hover:bg-red-600 shadow-md' 
          : 'bg-[#4D2C5E] text-white hover:bg-[#3a2152]'
      }`}>
        {isLive ? 'Join Now' : 'View Details'}
      </button>
    </div>
  );
};

export default StudentDashboard;