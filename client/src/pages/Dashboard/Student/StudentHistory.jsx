import React, { useState, useEffect } from 'react';
import { 
  FiBook, FiCalendar, FiVideo, FiMessageSquare, 
  FiBell, FiBriefcase, FiDownload, FiClock,
  FiChevronRight, FiUsers, FiCheckCircle, FiAward,
  FiBarChart2, FiBookOpen, FiLayers, FiTrendingUp
} from 'react-icons/fi';
import { getDataHandlerWithToken } from '../../../config/services';
import { format, isBefore, isAfter, differenceInDays, parseISO } from 'date-fns';
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
  const [courseProgress, setCourseProgress] = useState([]);
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
          notificationsRes,
          attendanceRes,
          batchesRes
        ] = await Promise.all([
          getDataHandlerWithToken('studentProfile'),
          getDataHandlerWithToken('StudentClassSchedule'),
          getDataHandlerWithToken(endpoint, null, null, true),
          getDataHandlerWithToken('studentAttendance'),
          getDataHandlerWithToken('studentBatches')
        ]);

        // Process study materials
        const courseIds = profileRes.batch.map(batch => batch.course);
        if (courseIds.length === 0) {
          setStudyMaterials([]);
        } else {
          const materialsPromises = courseIds.map(courseId => {
            const endpoint2 = ApiConfig.studyMaterialByCourse(courseId);
            return getDataHandlerWithToken(endpoint2, null, null, true);
          });
          const materialsResponses = await Promise.all(materialsPromises);
          const allMaterials = materialsResponses.flatMap(res => res.studyMaterials || []);
          setStudyMaterials(allMaterials);
        }

        // Process classes
        const now = new Date();
        const allClasses = classesRes.classSessions || [];
        
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

        // Calculate course progress
        const progressData = batchesRes.batches.map(batch => {
          const startDate = new Date(batch.startDate);
          const endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + batch.duration);
          
          const totalDays = differenceInDays(endDate, startDate);
          const daysPassed = differenceInDays(now, startDate);
          const progress = Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));
          
          return {
            id: batch._id,
            name: batch.batchCode,
            progress: Math.round(progress),
            startDate: batch.startDate,
            endDate: endDate.toISOString(),
            status: now > endDate ? 'completed' : 
                   now >= startDate ? 'in-progress' : 'upcoming'
          };
        });

        // Calculate overall course progress (average)
        const overallProgress = progressData.length > 0 
          ? Math.round(progressData.reduce((sum, course) => sum + course.progress, 0) / progressData.length)
          : 0;

        setTodayClasses(today);
        setLiveClasses(live);
        setCourseProgress(progressData);
        setNotifications(notificationsRes || []);

        // Set stats
        setStats({
          courses: profileRes.batch?.length || 0,
          materials: studyMaterials?.length || 0,
          attendance: attendancePercentage,
          assignments: 0, // You'll need to fetch this separately
          doubts: 0, // You'll need to fetch this separately
          notifications: notificationsRes.length || 0,
          overallProgress
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <StatCard 
          icon={<FiTrendingUp className="text-2xl" />}
          title="Overall Progress"
          value={stats.overallProgress}
          color="from-[#3B82F6] to-[#60A5FA]"
          unit=" %"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Classes Section */}
          {liveClasses.length > 0 && (
            <LiveClassesSection liveClasses={liveClasses} formatTime={formatTime} formatDate={formatDate} />
          )}

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
                {todayClasses.map(session => (
                  <ClassSessionCard 
                    key={session._id} 
                    session={session} 
                    formatTime={formatTime} 
                    formatDate={formatDate} 
                  />
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={<FiCalendar className="text-3xl text-gray-400" />}
                title="No classes scheduled"
                message="Your upcoming classes will appear here"
              />
            )}
          </div>

          {/* Course Progress Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-3 h-8 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full mr-3"></div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Course Progress</h2>
                <p className="text-sm text-gray-500">Track your learning journey</p>
              </div>
            </div>
            
            {courseProgress.length > 0 ? (
              <div className="space-y-4">
                {courseProgress.map(course => (
                  <div key={course.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-800">{course.name}</h3>
                      <span className={`text-sm font-medium ${
                        course.status === 'completed' ? 'text-green-600' :
                        course.status === 'in-progress' ? 'text-blue-600' :
                        'text-gray-500'
                      }`}>
                        {course.status === 'completed' ? 'Completed' :
                         course.status === 'in-progress' ? 'In Progress' :
                         'Upcoming'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            course.status === 'completed' ? 'bg-green-500' :
                            course.status === 'in-progress' ? 'bg-blue-500' :
                            'bg-gray-400'
                          }`} 
                          style={{width: `${course.progress}%`}}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{course.progress}%</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{format(new Date(course.startDate), 'MMM d, yyyy')}</span>
                      <span>{format(new Date(course.endDate), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={<FiBook className="text-3xl text-gray-400" />}
                title="No courses enrolled"
                message="Your course progress will appear here"
              />
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Attendance Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 flex items-center">
              <FiCheckCircle className="mr-2 h-5 w-5" />
              Attendance Summary
            </h2>
            
            <div className="flex flex-col items-center py-4">
              <CircularProgressBar 
                percentage={stats.attendance} 
                color={stats.attendance >= 75 ? '#10B981' : stats.attendance >= 50 ? '#F59E0B' : '#EF4444'}
                size={120}
                strokeWidth={10}
              />
              <div className="mt-4 text-center">
                <p className="text-lg font-medium text-gray-700">
                  {stats.attendance}% Overall Attendance
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.attendance >= 75 ? 'Excellent attendance!' : 
                   stats.attendance >= 50 ? 'Good, keep it up!' : 
                   'Try to attend more classes'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Present</p>
                <p className="text-xl font-bold text-green-600">
                  {Math.round(stats.attendance * (stats.courses || 1) / 100)}
                </p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Absent</p>
                <p className="text-xl font-bold text-red-600">
                  {Math.round((100 - stats.attendance) * (stats.courses || 1) / 100)}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Materials */}
          <RecentMaterialsSection 
            studyMaterials={studyMaterials} 
            navigate={navigate} 
          />

          {/* Notifications */}
          <NotificationsSection 
            notifications={notifications} 
            navigate={navigate} 
          />
        </div>
      </div>
    </div>
  );
};

// Component for Circular Progress Bar
const CircularProgressBar = ({ percentage, color, size, strokeWidth }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold" style={{ color }}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};

// Component for Live Classes Section
const LiveClassesSection = ({ liveClasses, formatTime, formatDate }) => (
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
);

// Component for Class Session Card
const ClassSessionCard = ({ session, formatTime, formatDate }) => {
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
    <div className={`relative rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 ${
      isCompleted ? 'border border-gray-200' : 'border border-[#4D2C5E]/30'
    }`}>
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
};

// Component for Recent Materials Section
const RecentMaterialsSection = ({ studyMaterials, navigate }) => (
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
        <button 
          onClick={() => navigate('/Student/StudyMaterials')}
          className="text-[#4D2C5E] hover:text-[#FF7426] font-medium transition-colors"
        >
          View All <FiChevronRight className="inline ml-1" />
        </button>
      </div>
    )}
  </div>
);

// Component for Notifications Section
const NotificationsSection = ({ notifications, navigate }) => (
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
              {format(new Date(notification.createdAt), 'MMM d, yyyy')}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
        </div>
      ))}
    </div>
    
    {notifications.length > 3 && (
      <div className="mt-4 text-center">
        <button 
          onClick={() => navigate('/Student/Notifications')}
          className="text-[#4D2C5E] hover:text-[#FF7426] font-medium transition-colors"
        >
          View All <FiChevronRight className="inline ml-1" />
        </button>
      </div>
    )}
  </div>
);

// Component for Empty State
const EmptyState = ({ icon, title, message }) => (
  <div className="text-center py-10">
    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-medium text-gray-700 mb-1">{title}</h3>
    <p className="text-gray-500">{message}</p>
  </div>
);

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

export default StudentDashboard;