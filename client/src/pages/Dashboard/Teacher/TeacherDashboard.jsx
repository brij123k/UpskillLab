import React, { useEffect, useState } from 'react';
import { 
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
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch all necessary data in parallel
      const [
        classResponse, 
        doubtsResponse, 
        materialsResponse,
        notificationsResponse,
        marketResponse,
        statsResponse
      ] = await Promise.all([
        getDataHandlerWithToken('ClassSchedule'),
        getDataHandlerWithToken('doubts'),
        getDataHandlerWithToken('studyMaterial'),
        getDataHandlerWithToken('teacherNotifications'),
        getDataHandlerWithToken('marketAnalysis'),
        getDataHandlerWithToken('teacherStats')
      ]);

      const now = new Date();
      const upcomingClasses = (classResponse.classSessions || [])
        .filter(session => new Date(session.scheduledDate) >= now)
        .slice(0, 3);
      
      const pendingDoubts = (doubtsResponse.doubts || [])
        .filter(doubt => doubt.messages?.length === 0)
        .slice(0, 3);
      
      const studyMaterials = (materialsResponse.studyMaterials || [])
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      
      setDashboardData({
        upcomingClasses,
        pendingDoubts,
        studyMaterials,
        recentNotifications: notificationsResponse.notifications?.slice(0, 5) || [],
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
          {dashboardData.upcomingClasses.length}
        </p>
      </div>
      <div className="p-3 bg-[#4D2C5E]/10 rounded-full">
        <FiCalendar className="text-[#4D2C5E] text-xl" />
      </div>
    </div>
    <div className="mt-4">
      {dashboardData.upcomingClasses.length > 0 ? (
        <div className="flex items-center text-sm text-gray-600">
          <FiClock className="mr-1" />
          <span>Next: {formatDate(dashboardData.upcomingClasses[0].scheduledDate)}</span>
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
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#4D2C5E] flex items-center">
                  <FiCalendar className="mr-2" /> Upcoming Classes
                </h2>
                <button 
                  onClick={() => navigate('/Teacher/Schedule')}
                  className="text-sm text-[#FF7426] hover:underline"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {dashboardData.upcomingClasses.length > 0 ? (
                dashboardData.upcomingClasses.map((classItem, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate('/Teacher/Schedule')}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-[#4D2C5E]">{classItem.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDate(classItem.scheduledDate)} • {formatTime(classItem.scheduledStartTime)} - {formatTime(classItem.scheduledEndTime)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          classItem.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {classItem.isApproved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <FiVideo className="mr-2" />
                      <span>{classItem.meetingPlatform || 'Zoom'}</span>
                      <span className="mx-2">•</span>
                      <FiUsers className="mr-2" />
                      <span>{classItem.batchId?.remainingSeats || 0} seats available</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No upcoming classes scheduled
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
                dashboardData.studyMaterials.map((material, index) => (
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
          <div className="bg-white rounded-xl shadow-md p-6">
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
          </div>
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
          {dashboardData.recentNotifications.length > 0 ? (
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
                      {new Date(notification.date).toLocaleString()}
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