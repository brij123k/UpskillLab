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
  FiBarChart2,
  FiChevronRight
} from 'react-icons/fi';
import { getDataHandlerWithToken } from '../../../config/services';
import { useNavigate } from 'react-router-dom';
import generateReceipt from '../../../components/Receipt';

const StudentHistory = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('courses');
  const [courses, setCourses] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [account, setAccount] = useState(null);
  const [results, setResults] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchStudentHistory = async () => {
    try {
      setLoading(true);
      const response = await getDataHandlerWithToken('studentHistory');
      const courses = await getDataHandlerWithToken('courseDisplay');
      const account = await getDataHandlerWithToken('account');
      
      setAccount(account);
      setCourses(courses.data);
      setStudentData(response.students[0]);
      
      // Fetch results if student data is available
      if (response.students[0] && response.students[0].email) {
        fetchResults(response.students[0].email);
      }
    } catch (error) {
      console.error('Error fetching student history:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async (email) => {
    try {
      setResultsLoading(true);
      const response = await getDataHandlerWithToken('getResult',{email});
      setResults(response);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setResultsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentHistory();
  }, []);

  const calculateAttendance = () => {
    if (!studentData?.attendanceHistory?.length) return 0;
    const attended = studentData.attendanceHistory.filter(c => c.isAttended).length;
    return Math.round((attended / studentData.attendanceHistory.length) * 100);
  };

  const categorizeCourses = () => {
    if (!studentData?.orderHistory) return { completed: [], inProgress: [], upcoming: [] };
    
    const now = new Date();
    return studentData.orderHistory
      .filter(order => order.status === 'COMPLETED')
      .reduce((acc, order) => {
        try {
          const batch = order.batchId;
          const courseId = batch.course;
          const courseDetail = courses?.find((detail) => detail._id == courseId);
          
          const startDate = new Date(batch.startDate);
          const endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + batch.duration);
          
          let displayStatus;
          if (now > endDate) {
            displayStatus = 'completed';
          } else if (now >= startDate && now <= endDate) {
            displayStatus = 'inProgress';
          } else {
            displayStatus = 'upcoming';
          }
          
          const course = {
            id: order.orderId,
            title: courseDetail?.courseName || order.courseTitle,
            batchCode: courseDetail?.category?.categoryName || 'General',
            status: displayStatus,
            originalStatus: order.status,
            startDate: batch.startDate,
            endDate: endDate.toISOString(),
            duration: batch.duration,
            amount: order.totalAmount,
            paid: order.amountPaid,
            imageUrl: courseDetail?.courseImage || 'https://via.placeholder.com/300x200?text=Course+Image'
          };
          
          acc[displayStatus].push(course);
          return acc;
        } catch (e) {
          console.error('Error parsing course:', e);
          return acc;
        }
      }, { completed: [], inProgress: [], upcoming: [] });
  };

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
        formattedDate: sessionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: session.scheduledStartTime,
        link: session.meetingLink,
        isUpcoming: status === 'upcoming'
      };
    });
  };

  const filterOrders = () => {
    if (!studentData?.orderHistory) return [];
    return studentData.orderHistory.filter(order => 
      order.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.batchId.batchCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const { completed, inProgress, upcoming } = categorizeCourses();
  const attendanceHistory = getAttendanceHistory();
  const filteredOrders = filterOrders();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C63FF]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Student Profile Header */}
        <div className="bg-gradient-to-r from-[#6C63FF] to-[#4A42E8] rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="relative">
              <img 
                src={studentData.image || 'https://via.placeholder.com/150?text=Student'} 
                alt={studentData.fullName} 
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white/30 shadow-md"
              />
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
                <div className="bg-green-500 rounded-full w-4 h-4"></div>
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">{studentData.fullName}</h1>
              <p className="text-white/90 mb-3">{studentData.bio || 'Active learner at our platform'}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {studentData.skills?.map((skill, index) => (
                  <span key={index} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {/* Attendance Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">Attendance</p>
                  <p className="text-2xl font-bold text-white">
                    {calculateAttendance()}%
                  </p>
                </div>
                <div className="p-3 rounded-full bg-white/10">
                  <FiCheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full" 
                    style={{ width: `${calculateAttendance()}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-white/80 mt-1">
                  <span>{studentData?.attendanceHistory?.filter(c => c.isAttended).length || 0} attended</span>
                  <span>{studentData?.attendanceHistory?.length || 0} total</span>
                </div>
              </div>
            </div>

            {/* Courses Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">Courses</p>
                  <p className="text-2xl font-bold text-white">
                    {completed.length + inProgress.length + upcoming.length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-white/10">
                  <FiBook className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-white/80 mt-3">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mr-1"></span>
                  {inProgress.length} in progress
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                  {completed.length} completed
                </span>
              </div>
            </div>

            {/* Orders Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">Orders</p>
                  <p className="text-2xl font-bold text-white">
                    {studentData?.orderHistory?.length || 0}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-white/10">
                  <FiDollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-white/80 mt-3">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                  {studentData?.orderHistory?.filter(o => o.status === 'COMPLETED').length || 0} completed
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 mr-1"></span>
                  {studentData?.orderHistory?.filter(o => o.status !== 'COMPLETED').length || 0} pending
                </span>
              </div>
            </div>

            {/* Results Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">Results</p>
                  <p className="text-2xl font-bold text-white">
                    {results.length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-white/10">
                  <FiAward className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-white/80 mt-3">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mr-1"></span>
                  {results.length} exams
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto mb-8 bg-white rounded-xl shadow-sm">
          <button
            onClick={() => setActiveSection('courses')}
            className={`px-6 py-3 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all ${activeSection === 'courses' ? 'bg-[#6C63FF] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <FiBook className="w-5 h-5" />
            My Courses
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {completed.length + inProgress.length + upcoming.length}
            </span>
          </button>
          <button
            onClick={() => setActiveSection('attendance')}
            className={`px-6 py-3 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all ${activeSection === 'attendance' ? 'bg-[#6C63FF] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <FiCheckCircle className="w-5 h-5" />
            Attendance
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {studentData?.attendanceHistory?.length || 0}
            </span>
          </button>
          <button
            onClick={() => setActiveSection('orders')}
            className={`px-6 py-3 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all ${activeSection === 'orders' ? 'bg-[#6C63FF] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <FiDollarSign className="w-5 h-5" />
            Order History
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {studentData?.orderHistory?.length || 0}
            </span>
          </button>
          <button
            onClick={() => setActiveSection('results')}
            className={`px-6 py-3 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all ${activeSection === 'results' ? 'bg-[#6C63FF] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <FiAward className="w-5 h-5" />
            Results
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {results.length}
            </span>
          </button>
        </div>

        {/* Courses Section */}
        {activeSection === 'courses' && (
          <div className="space-y-8">
            {/* In Progress Courses */}
            {inProgress.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <FiClock className="text-amber-600 w-5 h-5" />
                    </div>
                    In Progress Courses ({inProgress.length})
                  </h2>
                  {/* <button className="text-sm text-[#6C63FF] hover:underline flex items-center">
                    View all <FiChevronRight className="ml-1" />
                  </button> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inProgress.map(course => (
                    <CourseCard key={course.id} course={course} type="progress" />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Courses */}
            {upcoming.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FiCalendar className="text-blue-600 w-5 h-5" />
                    </div>
                    Upcoming Courses ({upcoming.length})
                  </h2>
                  <button className="text-sm text-[#6C63FF] hover:underline flex items-center">
                    View all <FiChevronRight className="ml-1" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcoming.map(course => (
                    <CourseCard key={course.id} course={course} type="upcoming" />
                  ))}
                </div>
              </div>
            )}

            {/* Completed Courses */}
            {completed.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <FiCheckCircle className="text-green-600 w-5 h-5" />
                    </div>
                    Completed Courses ({completed.length})
                  </h2>
                  {/* <button className="text-sm text-[#6C63FF] hover:underline flex items-center">
                    View all <FiChevronRight className="ml-1" />
                  </button> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Attendance Overview</h2>
                  <p className="text-gray-600">Your class participation history</p>
                </div>
                
                <div className="bg-[#6C63FF]/10 p-4 rounded-xl border border-[#6C63FF]/20">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#6C63FF]">{calculateAttendance()}%</p>
                      <p className="text-xs text-gray-600">Overall Attendance</p>
                    </div>
                    <div className="h-12 border-l border-gray-300"></div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Attended: {studentData?.attendanceHistory?.filter(c => c.isAttended).length || 0}
                      </p>
                      <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        Missed: {studentData?.attendanceHistory?.filter(c => !c.isAttended).length || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendanceHistory.map(session => (
                      <tr key={session.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{session.formattedDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{session.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {session.status === 'attended' ? (
                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Attended
                            </span>
                          ) : session.status === 'missed' ? (
                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Missed
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Upcoming
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

        {/* Order History Section */}
        {activeSection === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Order History</h2>
                  <p className="text-gray-600">All your course purchases and transactions</p>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-[#6C63FF] transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Total Amount Summary */}
              <div className="bg-[#6C63FF]/10 p-4 rounded-xl border border-[#6C63FF]/20 mb-6">
                <div className="flex flex-wrap justify-between gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">Total Orders</p>
                    <p className="text-xl font-bold text-[#6C63FF]">
                      {studentData?.orderHistory?.length || 0}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">Completed Orders</p>
                    <p className="text-xl font-bold text-[#6C63FF]">
                      {studentData?.orderHistory?.filter(o => o.status === 'COMPLETED').length || 0}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">Total Amount Paid</p>
                    <p className="text-xl font-bold text-[#6C63FF]">
                      ₹{studentData?.orderHistory
                        ?.filter(o => o.status === 'COMPLETED')
                        .reduce((sum, order) => sum + order.amountPaid, 0)
                        .toLocaleString('en-IN') || '0'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map(order => (
                      <tr key={order.orderId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-[#6C63FF]">#{order.orderId.slice(0, 8)}...</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {order.courseTitle}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{order.batchId.batchCode}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-sm font-medium">
                            ₹{order.amountPaid.toLocaleString('en-IN')}
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-500">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.status === 'COMPLETED' ? (
                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Completed
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.status === 'COMPLETED' && (
                            <button 
                              onClick={() => generateReceipt({
                                orderId: order.orderId,
                                courseTitle: order.courseTitle,
                                batchId: {
                                  batchCode: order.batchId.batchCode,
                                  course: order.courseTitle
                                },
                                totalAmount: order.totalAmount,
                                amountPaid: order.amountPaid,
                                createdAt: new Date().toISOString(),
                                status: order.status,
                                user: {
                                  fullName: studentData.fullName,
                                  email: studentData.email
                                }
                              })}
                              className="text-sm text-[#6C63FF] hover:text-[#5A52E0] font-medium flex items-center"
                            >
                              Download Bill
                            </button>
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

        {/* Results Section */}
        {activeSection === 'results' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Exam Results</h2>
                  <p className="text-gray-600">Your performance in all examinations</p>
                </div>
              </div>

              {resultsLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6C63FF]"></div>
                </div>
              ) : results.length === 0 ? (
                <div className="text-center py-12">
                  <FiAward className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No results available</h3>
                  <p className="mt-2 text-gray-500">You haven't taken any exams yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.map(result => (
                    <div key={result._id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{result.examId.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{result.examId.description}</p>
                        </div>
                        <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {result.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Marks</p>
                          <p className="text-lg font-bold text-gray-800">{result.totalMaxMarks}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Obtained Marks</p>
                          <p className="text-lg font-bold text-[#6C63FF]">{result.totalAwardedMarks}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Percentage</p>
                          <p className="text-lg font-bold text-gray-800">
                            {((result.totalAwardedMarks / result.totalMaxMarks) * 100).toFixed(2)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Exam Date</p>
                          <p className="text-sm font-medium text-gray-800">
                            {new Date(result.examId.startAt).toLocaleDateString('en-US', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Published: {new Date(result.updatedAt).toLocaleDateString('en-US')}
                        </span>
                        {/* <button className="text-sm text-[#6C63FF] hover:text-[#5A52E0] font-medium">
                          View Details
                        </button> */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CourseCard = ({ course, type }) => {
  const startDate = new Date(course.startDate);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + course.duration);
  
  const now = new Date();
  const progress = type === 'progress' 
    ? Math.min(100, Math.max(0, ((now - startDate) / (endDate - startDate)) * 100))
    : 0;

  const statusColors = {
    progress: {
      bg: 'bg-amber-100',
      text: 'text-amber-600',
      icon: <FiClock className="w-5 h-5 text-amber-600" />
    },
    upcoming: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      icon: <FiCalendar className="w-5 h-5 text-blue-600" />
    },
    completed: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      icon: <FiCheckCircle className="w-5 h-5 text-green-600" />
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className={`absolute top-4 right-4 ${statusColors[type].bg} p-2 rounded-full shadow-sm`}>
          {statusColors[type].icon}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-gray-800 text-lg line-clamp-2">{course.title}</h3>
          <span className="text-xs bg-[#6C63FF]/10 text-[#6C63FF] px-2 py-1 rounded whitespace-nowrap">
            {course.batchCode}
          </span>
        </div>
        
        <div className="text-sm text-gray-600 mb-4 space-y-2">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-gray-400 flex-shrink-0" />
            <span>
              {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="text-gray-400 flex-shrink-0" />
            <span>{course.duration} days course</span>
          </div>
        </div>
        
        {type === 'progress' && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Course Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#FF7426] h-2 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium ${statusColors[type].text}`}>
            {type === 'completed' ? 'Completed' : 
             type === 'progress' ? 'In Progress' : 
             'Upcoming'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentHistory;