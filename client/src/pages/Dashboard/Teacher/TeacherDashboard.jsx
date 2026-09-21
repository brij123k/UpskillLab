import React, { useEffect, useState } from 'react';
import { 
  FiInfo,
  FiCalendar, 
  FiBook, 
  FiMessageSquare, 
  FiUsers, 
  FiBarChart2,
  FiAlertCircle,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
  FiVideo,
  FiFile,
  FiUser,
  FiDollarSign,
  FiBookmark
} from 'react-icons/fi';
import { getDataHandlerWithToken } from '../../../config/services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ApiConfig from '../../../config/apiConfig';
import useNotificationService from '../../../config/notificationService';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    upcomingClasses: [],
    pendingDoubts: [],
    studyMaterials: [],
    recentNotifications: [],
    marketTrends: [],
    teachingStats: {},
    quickActions: []
  });
   const [todayClasses, setTodayClasses] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {notificationsResponse, setNotifications} = useNotificationService('teacher',['teacher','teacherStudent','adminTeacher']);
const [loading, setLoading] = useState(true);
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const profile = await getDataHandlerWithToken('teacherProfile')
      const endpoint = ApiConfig.studyMaterialByTeacher(profile._id)
      // Fetch all necessary data in parallel'
      const roles = ['teacher', 'teacherStudent', 'adminTeacher'];
const notificationPromises = roles.map(role => getDataHandlerWithToken(ApiConfig.Notifications(role), null, null, true));
const responses = await Promise.all(notificationPromises);
const allNotifications = responses.flat().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setNotifications(allNotifications);
      const [
        classResponse, 
        doubtsResponse, 
        materialsResponse,
        marketResponse,
        statsResponse
      ] = await Promise.all([
        getDataHandlerWithToken('ClassSchedule'),
        getDataHandlerWithToken('doubts'),
        getDataHandlerWithToken(endpoint,null, null, true),
        getDataHandlerWithToken('marketAnalysis'),
        getDataHandlerWithToken('teacherStats')
      ]);

      const now = new Date();

      const upcomingClasses = (classResponse.classSessions || [])
        const future = upcomingClasses.filter(classItem => {
          // Combine date and time for accurate comparison
          const classDate = new Date(classItem.scheduledDate);
          const [hours, minutes] = classItem.scheduledStartTime.split(':');
          classDate.setHours(parseInt(hours), parseInt(minutes));
          
          return classDate > now;
        });
      const today = upcomingClasses.filter(session => {
          const sessionDate = new Date(session.scheduledDate);
          return (
            sessionDate.getDate() === now.getDate() &&
            sessionDate.getMonth() === now.getMonth() &&
            sessionDate.getFullYear() === now.getFullYear()
          );
        });
        const live = today.filter(session => {
          const start = new Date(session.scheduledDate);
          const startTimeParts = session.scheduledStartTime.split(':');
          start.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]));
          
          const end = new Date(session.scheduledDate);
          const endTimeParts = session.scheduledEndTime.split(':');
          end.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]));
          
          return now >= start && now <= end;
        });

        setTodayClasses(today);
        setLiveClasses(live);
      
      const pendingDoubts = (doubtsResponse.doubts || [])
        .filter(doubt => doubt.messages?.length === 0)
        .slice(0, 3);
      
      const studyMaterials = (materialsResponse.studyMaterials || [])
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        
      
      setDashboardData({
        upcomingClasses,
        pendingDoubts,
        studyMaterials,
        futureClasses:future,
       recentNotifications: allNotifications.slice(0, 5) || [],
        marketTrends: marketResponse.trends?.slice(0, 3) || [],
        teachingStats: statsResponse || {
          totalStudents: 0,
          engagementRate: 0,
          completionRate: 0
        },
        

        quickActions: [
          { icon: <FiCalendar />, label: 'Schedule Class', action: () => navigate('/Teacher/Schedule') },
          { icon: <FiBook />, label: 'Upload Material', action: () => navigate('/Teacher/StudyMaterials') },
          { icon: <FiMessageSquare />, label: 'Respond to Doubts', action: () => navigate('/Teacher/Doubt') }
        ]
      });
      
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error('Dashboard Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  if (isLoading) {
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
        <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">Teacher Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

{/* Stats Overview */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  {/* Upcoming Classes Card */}
  <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#4D2C5E] hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/Teacher/Schedule')}>
    <div className="flex justify-between">
      <div>
        <h3 className="text-gray-500 text-sm font-medium">Upcoming Classes</h3>
        <p className="text-3xl font-bold text-[#4D2C5E] mt-2">
          {dashboardData.futureClasses.length}
        </p>
      </div>
      <div className="p-3 bg-[#4D2C5E]/10 rounded-full">
        <FiCalendar className="text-[#4D2C5E] text-xl" />
      </div>
    </div>
    <div className="mt-4">
      {dashboardData.futureClasses.length > 0 ? (
        <div className="flex items-center text-sm text-gray-600">
          <FiClock className="mr-1" />
          <span>Next: {formatDate(dashboardData.futureClasses[0].scheduledDate)}</span>
        </div>
      ) : (
        <div className="text-sm text-gray-500">No classes scheduled</div>
      )}
    </div>
  </div>

  {/* Pending Doubts Card */}
  <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#FF7426] hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/Teacher/Doubt')}>
    <div className="flex justify-between">
      <div>
        <h3 className="text-gray-500 text-sm font-medium">Pending Doubts</h3>
        <p className="text-3xl font-bold text-[#FF7426] mt-2">
          {dashboardData.pendingDoubts.length}
        </p>
      </div>
      <div className="p-3 bg-[#FF7426]/10 rounded-full">
        <FiMessageSquare className="text-[#FF7426] text-xl" />
      </div>
    </div>
    <div className="mt-4">
      {dashboardData.pendingDoubts.length > 0 ? (
        <div className="flex items-center text-sm text-gray-600">
          <FiAlertCircle className="mr-1" />
          <span>{dashboardData.pendingDoubts.length} waiting for response</span>
        </div>
      ) : (
        <div className="text-sm text-gray-500">All doubts resolved</div>
      )}
    </div>
  </div>

  {/* Study Materials Card */}
  <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#6C63FF] hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/Teacher/StudyMaterials')}>
    <div className="flex justify-between">
      <div>
        <h3 className="text-gray-500 text-sm font-medium">Study Materials</h3>
        <p className="text-3xl font-bold text-[#6C63FF] mt-2">
          {dashboardData.studyMaterials.length}
        </p>
      </div>
      <div className="p-3 bg-[#6C63FF]/10 rounded-full">
        <FiBook className="text-[#6C63FF] text-xl" />
      </div>
    </div>
    <div className="mt-4">
      {dashboardData.studyMaterials.length > 0 ? (
        <div className="flex items-center text-sm text-gray-600">
          <FiFile className="mr-1" />
          <span>Last added: {formatDate(dashboardData.studyMaterials[0].createdAt)}</span>
        </div>
      ) : (
        <div className="text-sm text-gray-500">No materials uploaded</div>
      )}
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Classes */}
         <div className="space-y-6">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  <p className="text-sm text-gray-600">{session.batchId?.batchCode || 'General Class'}</p>
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
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {formatDate(session.scheduledDate)}
                </span>
                <button 
                  onClick={() => navigate(`/Teacher/Class/${session._id}`)}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all"
                >
                  Start Teaching
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Today's Classes Section */}
  <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
    <div className="flex items-center mb-6">
      <div className="w-3 h-8 bg-gradient-to-r from-[#4D2C5E] to-[#6D3B8E] rounded-full mr-3"></div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Today's Schedule</h2>
        <p className="text-sm text-gray-500">All classes scheduled for today</p>
      </div>
    </div>
    
    {todayClasses.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {todayClasses.map(session => {
          const now = new Date();
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
                isCompleted ? 'border border-gray-200' : 'border border-[#4D2C5E]/20'
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
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-[#4D2C5E]">{session.title}</h3>
                    <p className="text-sm text-gray-600">{session.batchId?.batchCode || 'General Class'}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    session.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {session.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`flex items-center text-xs px-2 py-1 rounded-full ${
                    isLiveNow ? 'bg-red-100 text-red-600' :
                    isUpcoming ? 'bg-[#4D2C5E]/10 text-[#4D2C5E]' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <FiClock className="mr-1" />
                    {formatTime(session.scheduledStartTime)} - {formatTime(session.scheduledEndTime)}
                  </span>
                  <span className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                    <FiUsers className="mr-1" />
                    {session.batchId?.remainingSeats || 0} seats left
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {session.meetingPlatform || 'Zoom'}
                  </span>
                  <button 
                    onClick={() => isLiveNow ? navigate(`/Teacher/Class/${session._id}`) : navigate('/Teacher/Schedule')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      isLiveNow ? 'bg-red-500 text-white hover:bg-red-600' :
                      isUpcoming ? 'bg-[#4D2C5E] text-white hover:bg-[#3a2152]' :
                      'bg-gray-400 text-gray-700 cursor-not-allowed'
                    }`}
                  >
                    {isLiveNow ? 'Start Class' : 
                     isUpcoming ? 'View Details' : 
                     'Completed'}
                  </button>
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
        <h3 className="text-lg font-medium text-gray-700 mb-1">No classes today</h3>
        <p className="text-gray-500">Schedule new classes to see them here</p>
        <button 
          onClick={() => navigate('/Teacher/Schedule')}
          className="mt-4 px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152] transition"
        >
          Schedule Class
        </button>
      </div>
    )}
  </div>
</div>

          {/* Pending Doubts */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#4D2C5E] flex items-center">
                  <FiMessageSquare className="mr-2" /> Pending Doubts
                </h2>
                <button 
                  onClick={() => navigate('/Teacher/Doubt')}
                  className="text-sm text-[#FF7426] hover:underline"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {dashboardData.pendingDoubts.length > 0 ? (
                dashboardData.pendingDoubts.map((doubt, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate('/Teacher/Doubt')}>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-[#4D2C5E]">{doubt.student?.name || 'Student'}</h3>
                        <p className="text-sm text-gray-500 mt-1">{doubt.course?.courseName || 'Course'}</p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(doubt.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600 line-clamp-2">{doubt.question}</p>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No pending doubts to resolve
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#4D2C5E] mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {dashboardData.quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="p-2 bg-[#4D2C5E]/10 rounded-full mr-3 text-[#4D2C5E]">
                    {action.icon}
                  </span>
                  <span className="font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Materials */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#4D2C5E] flex items-center">
                  <FiBook className="mr-2" /> Recent Materials
                </h2>
                <button 
                  onClick={() => navigate('/Teacher/StudyMaterials')}
                  className="text-sm text-[#FF7426] hover:underline"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {dashboardData.studyMaterials.length > 0 ? (
                dashboardData.studyMaterials.slice(0,3).map((material, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate('/Teacher/StudyMaterials')}>
                    <div className="flex items-center">
                      <FiFile className="text-[#4D2C5E] mr-3" />
                      <div>
                        <h3 className="font-medium text-[#4D2C5E] line-clamp-1">{material.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{material.course?.courseName || 'Course'}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-gray-400">
                      <span>{formatDate(material.createdAt)}</span>
                      <span>{material.chapter?.name || 'No chapter'}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No recent materials uploaded
                </div>
              )}
            </div>
          </div>

          {/* Market Trends */}
          {/* <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 flex items-center">
              <FiTrendingUp className="mr-2" /> Market Trends
            </h2>
            <div className="space-y-4">
              {dashboardData.marketTrends.map((trend, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#4D2C5E]/10 flex items-center justify-center mr-3">
                    {trend.change > 0 ? (
                      <FiTrendingUp className="text-green-500" />
                    ) : (
                      <FiTrendingDown className="text-red-500" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{trend.skill}</span>
                      <span className={`${trend.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {trend.change > 0 ? '+' : ''}{trend.change}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${trend.change > 0 ? 'bg-green-500' : 'bg-red-500'}`} 
                        style={{ width: `${Math.min(100, Math.abs(trend.change))}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => navigate('/Teacher/Analysis')}
              className="mt-4 w-full text-center text-sm text-[#FF7426] hover:underline"
            >
              View detailed analysis
            </button>
          </div> */}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#4D2C5E] flex items-center">
              <FiAlertCircle className="mr-2" /> Recent Notifications
            </h2>
            <button 
              onClick={() => navigate('/Teacher/Notifications')}
              className="text-sm text-[#FF7426] hover:underline"
            >
              View All
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
         {dashboardData.recentNotifications.length > 0 ?(
  dashboardData.recentNotifications.map((notification, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate('/Teacher/Notifications')}>
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 ${
                    notification.type === 'alert' ? 'bg-red-100 text-red-500' :
                    notification.type === 'info' ? 'bg-blue-100 text-blue-500' :
                    'bg-green-100 text-green-500'
                  }`}>
                    {notification.type === 'alert' ? (
                      <FiAlertCircle />
                    ) : notification.type === 'info' ? (
                      <FiInfo />
                    ) : (
                      <FiCheckCircle />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-[#4D2C5E]">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No recent notifications
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;