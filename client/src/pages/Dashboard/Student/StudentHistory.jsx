import React, { useEffect, useState } from 'react';
import { FiSearch, FiClock, FiBook, FiVideo, FiFile, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { getDataHandlerWithToken } from '../../../config/services';

const StudentHistory = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStudentHistory = async () => {
    try {
      setLoading(true);
      const response = await getDataHandlerWithToken('studentHistory');
      console.log(response.students[0])
      setStudentData(response.students[0]); // Assuming we get first student
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

  // Process order history into courses
  const getCourses = () => {
    if (!studentData?.orderHistory) return [];
    
    return studentData.orderHistory.map(order => {
      try {
        const batchInfo = order.batchId;
        return {
          id: order.orderId,
          title: order.courseTitle === 'Unknown' ? batchInfo.course : order.courseTitle,
          type: 'course',
          batchCode: batchInfo.batchCode,
          status: order.status.toLowerCase(),
          date: new Date(batchInfo.startDate).toLocaleDateString(),
          amount: order.totalAmount,
          paid: order.amountPaid,
          teacher: batchInfo.teacher
        };
      } catch (e) {
        console.error('Error parsing batch info:', e);
        return null;
      }
    }).filter(Boolean);
  };

  // Process attendance history
  const getAttendanceItems = () => {
    if (!studentData?.attendanceHistory) return [];
    
    return studentData.attendanceHistory.map(session => ({
      id: session.classId,
      title: `Class Session`,
      type: 'attendance',
      status: session.isAttended ? 'attended' : 'missed',
      date: new Date(session.scheduledDate).toLocaleDateString(),
      time: session.scheduledStartTime,
      link: session.meetingLink
    }));
  };

  const allItems = [
    ...getCourses(),
    ...getAttendanceItems()
  ];

  const filteredItems = allItems.filter(item => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'completed' && item.status === 'completed') ||
                      (activeTab === 'pending' && item.status === 'pending') ||
                      (activeTab === 'attendance' && item.type === 'attendance');
    
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (item.batchCode && item.batchCode.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch(type) {
      case 'video': return <FiVideo className="text-[#4D2C5E] mr-2" />;
      case 'assignment': return <FiFile className="text-[#4D2C5E] mr-2" />;
      case 'attendance': return <FiClock className="text-[#4D2C5E] mr-2" />;
      default: return <FiBook className="text-[#4D2C5E] mr-2" />;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Completed</span>;
      case 'pending':
        return <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>;
      case 'attended':
        return <FiCheckCircle className="text-green-500" />;
      case 'missed':
        return <FiXCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#4D2C5E]">My Learning History</h1>
          {studentData?.attendanceHistory?.length > 0 && (
            <p className="text-gray-500">
              Attendance: {calculateAttendance()}% ({studentData.attendanceHistory.filter(c => c.isAttended).length}/{studentData.attendanceHistory.length} classes)
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-[#4D2C5E]/10 text-[#4D2C5E] px-3 py-1 rounded-full">
            <span className="font-medium">{studentData?.completedCourses || 0}</span> Completed
          </div>
          <div className="bg-[#FF7426]/10 text-[#FF7426] px-3 py-1 rounded-full">
            <span className="font-medium">{studentData?.pendingCourses || 0}</span> Pending
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search history..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'all' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'completed' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'pending' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'attendance' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Attendance
            </button>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 font-semibold text-[#4D2C5E] border-b">
          <div className="col-span-6 md:col-span-5">Activity</div>
          <div className="hidden md:block col-span-3">Details</div>
          <div className="col-span-3 md:col-span-2">Date</div>
          <div className="col-span-3 md:col-span-2">Status</div>
        </div>
        
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className="grid grid-cols-12 p-4 items-center border-b hover:bg-gray-50">
              <div className="col-span-6 md:col-span-5 flex items-center">
                {getTypeIcon(item.type)}
                <div>
                  <div className="font-medium">{item.title}</div>
                  {item.batchCode && (
                    <div className="text-xs text-gray-500">{item.batchCode}</div>
                  )}
                  {item.time && (
                    <div className="text-xs text-gray-500">{item.time}</div>
                  )}
                </div>
              </div>
              
              <div className="hidden md:block col-span-3">
                {item.type === 'course' ? (
                  <span className="text-sm">₹{item.amount} (Paid: ₹{item.paid})</span>
                ) : (
                  <a href={item.link} target="_blank" rel="noopener" className="text-sm text-blue-600 hover:underline">
                    Meeting Link
                  </a>
                )}
              </div>
              
              <div className="col-span-3 md:col-span-2 text-sm">
                {item.date}
              </div>
              
              <div className="col-span-3 md:col-span-2">
                {getStatusBadge(item.status)}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            No history items found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentHistory;