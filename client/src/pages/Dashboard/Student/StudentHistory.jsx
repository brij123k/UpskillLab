import React, { useEffect, useState } from 'react';
import { 
  FiSearch, 
  FiClock, 
  FiBook, 
  FiCheckCircle, 
  FiXCircle, 
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiAward,
  FiBarChart2
} from 'react-icons/fi';
import { getDataHandlerWithToken } from '../../../config/services';

const StudentHistory = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('courses');

  const fetchStudentHistory = async () => {
    try {
      setLoading(true);
      const response = await getDataHandlerWithToken('studentHistory');
      setStudentData(response.students[0]);
    } catch (error) {
      console.error('Error fetching student history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentHistory();
  }, []);

  // Calculate attendance percentage
  const calculateAttendance = () => {
    if (!studentData?.attendanceHistory?.length) return 0;
    const attended = studentData.attendanceHistory.filter(c => c.isAttended).length;
    return Math.round((attended / studentData.attendanceHistory.length) * 100);
  };

  // Categorize courses by status
  const categorizeCourses = () => {
    if (!studentData?.orderHistory) return { completed: [], inProgress: [], upcoming: [] };
    
    const now = new Date();
    return studentData.orderHistory.reduce((acc, order) => {
      try {
        const batch = order.batchId;
        const startDate = new Date(batch.startDate);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + batch.duration);
        
        let status;
        if (order.status === 'COMPLETED') {
          status = 'completed';
        } else if (now > endDate) {
          status = 'completed';
        } else if (now >= startDate && now <= endDate) {
          status = 'inProgress';
        } else {
          status = 'upcoming';
        }
        
        const course = {
          id: order.orderId,
          title: batch.course || order.courseTitle,
          batchCode: batch.batchCode,
          status,
          startDate: batch.startDate,
          endDate: endDate.toISOString(),
          duration: batch.duration,
          teacher: batch.teacher,
          amount: order.totalAmount,
          paid: order.amountPaid,
          imageUrl: batch.imageUrl
        };
        
        acc[status].push(course);
        return acc;
      } catch (e) {
        console.error('Error parsing course:', e);
        return acc;
      }
    }, { completed: [], inProgress: [], upcoming: [] });
  };

  // Process attendance history
  const getAttendanceHistory = () => {
    if (!studentData?.attendanceHistory) return [];
    
    return studentData.attendanceHistory.map(session => {
      const sessionDate = new Date(session.scheduledDate);
      const now = new Date();
      let status;
      
      if (session.isAttended) {
        status = 'attended';
      } else if (now > sessionDate) {
        status = 'missed';
      } else {
        status = 'upcoming';
      }
      
      return {
        id: session.classId,
        title: `Class Session`,
        status,
        date: session.scheduledDate,
        formattedDate: sessionDate.toLocaleDateString(),
        time: session.scheduledStartTime,
        link: session.meetingLink,
        isUpcoming: status === 'upcoming'
      };
    });
  };

  const { completed, inProgress, upcoming } = categorizeCourses();
  const attendanceHistory = getAttendanceHistory();

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Student Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <img 
            src={studentData.image} 
            alt={studentData.fullName} 
            className="w-24 h-24 rounded-full object-cover border-4 border-[#4D2C5E]/20"
          />
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#4D2C5E]">{studentData.fullName}</h1>
            <p className="text-gray-600 mb-2">{studentData.bio}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {studentData.skills?.map((skill, index) => (
                <span key={index} className="bg-[#FF7426]/10 text-[#FF7426] px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#F9F5FF] p-3 rounded-lg">
                <div className="flex items-center gap-2 text-[#4D2C5E]">
                  <FiBook />
                  <span className="font-medium">Courses</span>
                </div>
                <div className="text-2xl font-bold mt-1">{studentData.orderHistory?.length || 0}</div>
              </div>
              
              <div className="bg-[#FFF5F0] p-3 rounded-lg">
                <div className="flex items-center gap-2 text-[#FF7426]">
                  <FiAward />
                  <span className="font-medium">Completed</span>
                </div>
                <div className="text-2xl font-bold mt-1">{studentData.completedCourses || 0}</div>
              </div>
              
              <div className="bg-[#F0F9FF] p-3 rounded-lg">
                <div className="flex items-center gap-2 text-blue-500">
                  <FiBarChart2 />
                  <span className="font-medium">Attendance</span>
                </div>
                <div className="text-2xl font-bold mt-1">{calculateAttendance()}%</div>
              </div>
              
              <div className="bg-[#F0F0FF] p-3 rounded-lg">
                <div className="flex items-center gap-2 text-indigo-500">
                  <FiUser />
                  <span className="font-medium">Type</span>
                </div>
                <div className="text-2xl font-bold mt-1 capitalize">{studentData.studentType.toLowerCase()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto mb-6 bg-white rounded-lg shadow-sm p-1">
        <button
          onClick={() => setActiveSection('courses')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${activeSection === 'courses' ? 'bg-[#4D2C5E] text-white' : 'text-gray-700'}`}
        >
          My Courses
        </button>
        <button
          onClick={() => setActiveSection('attendance')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${activeSection === 'attendance' ? 'bg-[#4D2C5E] text-white' : 'text-gray-700'}`}
        >
          Attendance
        </button>
        <button
          onClick={() => setActiveSection('orders')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${activeSection === 'orders' ? 'bg-[#4D2C5E] text-white' : 'text-gray-700'}`}
        >
          Order History
        </button>
      </div>

      {/* Courses Section */}
      {activeSection === 'courses' && (
        <div className="space-y-6">
          {/* In Progress Courses */}
          {inProgress.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 flex items-center gap-2">
                <FiClock className="text-[#FF7426]" /> In Progress ({inProgress.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inProgress.map(course => (
                  <CourseCard key={course.id} course={course} type="progress" />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Courses */}
          {upcoming.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 flex items-center gap-2">
                <FiCalendar className="text-blue-500" /> Upcoming ({upcoming.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcoming.map(course => (
                  <CourseCard key={course.id} course={course} type="upcoming" />
                ))}
              </div>
            </div>
          )}

          {/* Completed Courses */}
          {completed.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 flex items-center gap-2">
                <FiCheckCircle className="text-green-500" /> Completed ({completed.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completed.map(course => (
                  <CourseCard key={course.id} course={course} type="completed" />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Attendance Section */}
      {activeSection === 'attendance' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#4D2C5E] mb-4">Attendance History</h2>
            
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Overall Attendance</span>
                <span className="text-sm font-medium">{calculateAttendance()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-[#4D2C5E] h-2.5 rounded-full" 
                  style={{ width: `${calculateAttendance()}%` }}
                ></div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {attendanceHistory.map(session => (
                    <tr key={session.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {session.formattedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {session.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {session.status === 'attended' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Attended
                          </span>
                        ) : session.status === 'missed' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Missed
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Upcoming
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {session.link ? (
                          <a 
                            href={session.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Join
                          </a>
                        ) : (
                          <span className="text-gray-400">Not available</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Order History Section */}
      {activeSection === 'orders' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#4D2C5E] mb-4">Order History</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Batch</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studentData.orderHistory?.map(order => (
                    <tr key={order.orderId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.orderId.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.courseTitle === 'Unknown' ? order.batchId.course : order.courseTitle}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.batchId.batchCode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <FiDollarSign className="text-gray-400" />
                          <span className="text-sm font-medium">
                            {order.amountPaid} / {order.totalAmount}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.status === 'COMPLETED' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Course Card Component
const CourseCard = ({ course, type }) => {
  const startDate = new Date(course.startDate);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + course.duration);
  
  const now = new Date();
  const progress = type === 'progress' 
    ? Math.min(100, Math.max(0, ((now - startDate) / (endDate - startDate)) * 100))
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      {course.imageUrl && (
        <div className="h-40 overflow-hidden">
          <img 
            src={course.imageUrl} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-[#4D2C5E]">{course.title}</h3>
          <span className="text-xs bg-[#4D2C5E]/10 text-[#4D2C5E] px-2 py-1 rounded">
            {course.batchCode}
          </span>
        </div>
        
        <div className="text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <FiCalendar className="text-gray-400" />
            <span>
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiUser className="text-gray-400" />
            <span>Instructor: {course.teacher?.slice(0, 8)}...</span>
          </div>
        </div>
        
        {type === 'progress' && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Course Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-[#FF7426] h-1.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4">
          <span className={`text-sm font-medium ${
            type === 'completed' ? 'text-green-500' :
            type === 'progress' ? 'text-[#FF7426]' :
            'text-blue-500'
          }`}>
            {type === 'completed' ? 'Completed' : 
             type === 'progress' ? 'In Progress' : 
             'Upcoming'}
          </span>
          
          <div className="text-xs text-gray-500">
            {course.duration} days
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHistory;