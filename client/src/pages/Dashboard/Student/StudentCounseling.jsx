import React, { useEffect, useState } from 'react';
import { 
  FiPlus, 
  FiX, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiFilter,
  FiEye,
  FiCalendar,
  FiUsers,
  FiUser,
  FiSearch,
  FiChevronDown,
  FiLoader,
  FiCalendar as FiCal,
  FiInfo,
  FiCheck,
  FiXCircle,
  FiTrash2,
  FiVideo
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  postDataHandlerWithToken, 
  getDataHandlerWithToken
} from '../../../config/services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentCounseling = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [counselings, setCounselings] = useState([]);
  const [filteredCounselings, setFilteredCounselings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCounseling, setSelectedCounseling] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);

  // Filter states
  const [filterByStatus, setFilterByStatus] = useState('all'); // 'all', 'requested', 'scheduled', 'completed', 'cancelled'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusName, setSelectedStatusName] = useState('All Status');

  // Current month/year for booking validation
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // 1-12
  const currentYear = currentDate.getFullYear();

  // Fetch counseling data
  useEffect(() => {
    fetchCounselings();
  }, []);

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilters();
  }, [filterByStatus, searchQuery, counselings]);

  const fetchCounselings = async () => {
    try {
      setIsLoading(true);
      const response = await getDataHandlerWithToken('myCounseling');
      console.log(response)
      setCounselings(response || []);
      setFilteredCounselings(response || []);
    } catch (error) {
      toast.error('Failed to load counseling sessions');
      console.error('Error fetching counselings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...counselings];

    // Apply status filter
    if (filterByStatus !== 'all') {
      filtered = filtered.filter(c => c.status === filterByStatus);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(c => {
        // Search by counselor name
        if (c.counsellorId && c.counsellorId.name.toLowerCase().includes(query)) {
          return true;
        }
        // Search by month/year
        if (`month ${c.month} ${c.year}`.includes(query)) {
          return true;
        }
        // Search by status
        if (c.status.toLowerCase().includes(query)) {
          return true;
        }
        return false;
      });
    }

    setFilteredCounselings(filtered);
  };

  // Check if student can book counseling this month
  const canBookThisMonth = () => {
    // Check if student already has a non-cancelled booking for current month
    const existingBooking = counselings.find(c => 
      c.month === currentMonth && 
      c.year === currentYear && 
      c.status !== 'cancelled'
    );
    
    return !existingBooking;
  };

  // Handle booking counseling
  const handleBookCounseling = async () => {
    if (!canBookThisMonth()) {
      toast.error('You have already booked counseling for this month');
      return;
    }

    setIsBooking(true);
    try {
      const response = await postDataHandlerWithToken('bookCounseling');
      
      if (response) {
        toast.success('Counseling request submitted successfully!');
        await fetchCounselings(); // Refresh list
        setShowBookingModal(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book counseling');
      console.error('Booking Error:', error);
    } finally {
      setIsBooking(false);
    }
  };


  // View counseling details
  const handleViewDetails = (counseling) => {
    setSelectedCounseling(counseling);
    setShowDetailsModal(true);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterByStatus('all');
    setSearchQuery('');
    setSelectedStatusName('All Status');
  };

  // Handle status filter selection
  const handleStatusFilterSelect = (status, statusName) => {
    setFilterByStatus(status);
    setSelectedStatusName(statusName || 'All Status');
    setShowStatusFilter(false);
  };

  // Format date
  const formatDate = (dateString) => {
  if (!dateString) return 'Not scheduled yet';

  const date = new Date(dateString.replace('Z', ''));

  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

  // Format month-year
  const formatMonthYear = (month, year) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[month - 1]} ${year}`;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'requested':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'requested':
        return <FiClock className="h-4 w-4" />;
      case 'scheduled':
        return <FiCalendar className="h-4 w-4" />;
      case 'confirmed':
        return <FiCheck className="h-4 w-4" />;
      case 'completed':
        return <FiCheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <FiXCircle className="h-4 w-4" />;
      default:
        return <FiAlertCircle className="h-4 w-4" />;
    }
  };

  // Get status text
  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#fdf8ee]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf8ee] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E] tracking-tight">Book Counseling Sessions</h1>
            <p className="text-gray-500">Book and manage one-on-one counseling sessions</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowBookingModal(true)}
            disabled={!canBookThisMonth()}
            className={`flex items-center px-5 py-3 rounded-lg hover:shadow-md transition-all shadow-sm ${canBookThisMonth()
              ? 'bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white hover:opacity-90'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FiPlus className="mr-2 h-5 w-5" />
            Book Counseling
          </motion.button>
        </div>

        {/* Info Banner */}
        {!canBookThisMonth() && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start">
              <FiInfo className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Monthly Booking Limit</h3>
                <p className="text-sm text-blue-700 mt-1">
                  You can book only one counseling session per month. You already have an active booking for {formatMonthYear(currentMonth, currentYear)}. 
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-gray-100">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/30 focus:border-[#4D2C5E] transition-colors duration-200"
                placeholder="Search by counselor name, status, or month..."
              />
            </div>

            {/* Filter Row */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Status Filter Dropdown */}
              <div className="relative flex-1">
                <button
                  onClick={() => setShowStatusFilter(!showStatusFilter)}
                  className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <FiFilter className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-700 truncate">{selectedStatusName}</span>
                  </div>
                  <FiChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showStatusFilter ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showStatusFilter && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => handleStatusFilterSelect('all', 'All Status')}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${filterByStatus === 'all' ? 'bg-[#4D2C5E] text-white hover:bg-[#3A2152]' : ''}`}
                        >
                          All Status
                        </button>
                        {['requested', 'scheduled', 'confirmed', 'completed', 'cancelled'].map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusFilterSelect(status, getStatusText(status))}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${filterByStatus === status ? 'bg-[#4D2C5E] text-white hover:bg-[#3A2152]' : ''}`}
                          >
                            <div className="flex items-center">
                              <span className={`h-3 w-3 rounded-full mr-2 ${getStatusColor(status).split(' ')[0]}`} />
                              {getStatusText(status)}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Clear Filters Button */}
              {(filterByStatus !== 'all' || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2.5 text-gray-600 hover:text-gray-800 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <FiX className="mr-2 h-4 w-4" />
                  Clear Filters
                </button>
              )}
            </div>

            {/* Active Filters Display */}
            <div className="flex flex-wrap gap-2">
              {filterByStatus !== 'all' && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(filterByStatus)}`}>
                  Status: {getStatusText(filterByStatus)}
                  <button 
                    onClick={() => setFilterByStatus('all')}
                    className={`ml-1.5 ${getStatusColor(filterByStatus).includes('blue') ? 'text-blue-600 hover:text-blue-800' : 
                      getStatusColor(filterByStatus).includes('green') ? 'text-green-600 hover:text-green-800' :
                      getStatusColor(filterByStatus).includes('red') ? 'text-red-600 hover:text-red-800' :
                      'text-gray-600 hover:text-gray-800'}`}
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Search: "{searchQuery}"
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-1.5 text-gray-600 hover:text-gray-800"
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sessions</p>
                <p className="text-2xl font-bold text-[#4D2C5E]">{counselings.length}</p>
              </div>
              <div className="p-3 rounded-full bg-[#4D2C5E]/10 text-[#4D2C5E]">
                <FiUsers className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming</p>
                <p className="text-2xl font-bold text-purple-600">
                  {counselings.filter(c => ['requested', 'scheduled', 'confirmed'].includes(c.status)).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FiCalendar className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {counselings.filter(c => c.status === 'completed').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
                <FiCheckCircle className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="text-2xl font-bold text-blue-600">
                  {counselings.filter(c => c.month === currentMonth && c.year === currentYear).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FiCal className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Counseling List */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Counseling Sessions ({filteredCounselings.length})
            </h2>
            <span className="text-sm text-gray-500">
              Showing {filteredCounselings.length} of {counselings.length}
            </span>
          </div>

          {filteredCounselings.length > 0 ? (
            <div className="space-y-4">
              {filteredCounselings.map((counseling) => (
                <motion.div
                  key={counseling._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 group"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Counselor Info */}
                    <div className="flex items-start space-x-3 md:w-1/4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] flex items-center justify-center">
                          {counseling.counsellorId ? (
                            <img
                              src={counseling.counsellorId.image || 'https://via.placeholder.com/48'}
                              alt={counseling.counsellorId.name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          ) : (
                            <FiUser className="h-6 w-6 text-white" />
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {counseling.counsellorId?.name || 'Not Assigned Yet'}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {counseling.counsellorId?.qualification || 'Counselor to be assigned'}
                        </p>
                      </div>
                    </div>

                    {/* Session Details */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-[#4D2C5E] group-hover:text-[#3A2152] transition-colors">
                            {formatMonthYear(counseling.month, counseling.year)}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span className="flex items-center">
                              <FiCalendar className="mr-1 h-4 w-4" />
                              {formatDate(counseling.scheduledAt)}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="flex items-center">
                              <FiClock className="mr-1 h-4 w-4" />
                              {new Date(counseling.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2 md:mt-0">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(counseling.status)}`}>
                            <span className="mr-1">{getStatusIcon(counseling.status)}</span>
                            {getStatusText(counseling.status)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        <button
                          onClick={() => handleViewDetails(counseling)}
                          className="text-sm text-[#4D2C5E] hover:text-[#FF7426] flex items-center px-3 py-1.5 border border-gray-200 rounded-md hover:border-[#FF7426]/30 hover:bg-[#FF7426]/5 transition-colors"
                        >
                          <FiEye className="mr-1 h-4 w-4" />
                          View Details
                        </button>

                        {/* Join Session Button (for scheduled/confirmed sessions) */}
                        {/* {['scheduled', 'confirmed'].includes(counseling.status) && counseling.scheduledAt && (
                          <button
                            onClick={() => {
                              // This would open the video call interface
                              toast.info('Joining counseling session...');
                            }}
                            className="text-sm text-green-600 hover:text-green-800 flex items-center px-3 py-1.5 border border-green-200 rounded-md hover:border-green-300 hover:bg-green-50 transition-colors"
                          >
                            <FiVideo className="mr-1 h-4 w-4" />
                            Join Session
                          </button>
                        )} */}

                        
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <div className="mx-auto w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiAlertCircle className="h-8 w-8 md:h-12 md:w-12 text-gray-400" />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-1">
                No counseling sessions found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-4">
                {searchQuery || filterByStatus !== 'all'
                  ? 'No sessions match your current filters. Try adjusting your search criteria.'
                  : 'You haven\'t booked any counseling sessions yet.'}
              </p>
              {(searchQuery || filterByStatus !== 'all') ? (
                <button
                  onClick={clearFilters}
                  className="text-[#4D2C5E] hover:text-[#3A2152] font-medium flex items-center justify-center mx-auto"
                >
                  <FiX className="mr-2" />
                  Clear Filters
                </button>
              ) : (
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="text-[#4D2C5E] hover:text-[#3A2152] font-medium flex items-center justify-center mx-auto"
                >
                  <FiPlus className="mr-2" />
                  Book Your First Session
                </button>
              )}
            </div>
          )}
        </div>

        {/* Booking Confirmation Modal */}
        <AnimatePresence>
          {showBookingModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                className="bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-100"
              >
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">
                        Book Counseling Session
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatMonthYear(currentMonth, currentYear)}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 -mt-2 -mr-2"
                      disabled={isBooking}
                      aria-label="Close modal"
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Booking Rules */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">Important Information</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li className="flex items-start">
                          <FiCheck className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                          <span>You can book only one session per month</span>
                        </li>
                        <li className="flex items-start">
                          <FiCheck className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                          <span>If you cancel a session, you can book again in the same month</span>
                        </li>
                        <li className="flex items-start">
                          <FiCheck className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                          <span>A counselor will be assigned within 24-48 hours</span>
                        </li>
                        <li className="flex items-start">
                          <FiCheck className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                          <span>Session timing will be scheduled by the assigned counselor</span>
                        </li>
                      </ul>
                    </div>

                    {/* Current Month Status */}
                    <div className={`p-4 rounded-lg ${canBookThisMonth() ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                      <div className="flex items-center">
                        {canBookThisMonth() ? (
                          <>
                            <FiCheckCircle className="h-5 w-5 text-green-600 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-green-800">
                                You can book a counseling session for {formatMonthYear(currentMonth, currentYear)}
                              </p>
                              <p className="text-sm text-green-700 mt-1">
                                No active bookings found for this month.
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <FiAlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-yellow-800">
                                Booking not available for {formatMonthYear(currentMonth, currentYear)}
                              </p>
                              <p className="text-sm text-yellow-700 mt-1">
                                You already have an active booking for this month.
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowBookingModal(false)}
                        className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                        disabled={isBooking}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleBookCounseling}
                        className="px-5 py-2.5 bg-gradient-to-r from-[#4D2C5E] to-[#3A2152] text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium shadow-sm flex items-center justify-center min-w-36 disabled:opacity-50"
                        disabled={!canBookThisMonth() || isBooking}
                      >
                        {isBooking ? (
                          <>
                            <FiLoader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                            Booking...
                          </>
                        ) : (
                          'Book Session'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Counseling Details Modal */}
        <AnimatePresence>
          {showDetailsModal && selectedCounseling && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-gray-100"
              >
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">
                        Counseling Session Details
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatMonthYear(selectedCounseling.month, selectedCounseling.year)}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowDetailsModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 -mt-2 -mr-2"
                      aria-label="Close modal"
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedCounseling.status)}`}>
                        <span className="mr-2">{getStatusIcon(selectedCounseling.status)}</span>
                        {getStatusText(selectedCounseling.status)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Requested: {new Date(selectedCounseling.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Counselor Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Counselor Information</h3>
                      {selectedCounseling.counsellorId ? (
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              src={selectedCounseling.counsellorId.image || 'https://via.placeholder.com/64'}
                              alt={selectedCounseling.counsellorId.name}
                              className="h-16 w-16 rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{selectedCounseling.counsellorId.name}</h4>
                            <p className="text-sm text-gray-600">{selectedCounseling.counsellorId.qualification}</p>
                            <p className="text-sm text-gray-500 mt-1">{selectedCounseling.counsellorId.bio}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                {selectedCounseling.counsellorId.expertise}
                              </span>
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                                {selectedCounseling.counsellorId.experience} experience
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <FiUser className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Counselor not assigned yet</p>
                          <p className="text-sm text-gray-500 mt-1">
                            A counselor will be assigned to you within 24-48 hours
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Session Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Session Timing</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Scheduled Date:</span>
                            <span className="text-sm font-medium text-gray-900">
                              {formatDate(selectedCounseling.scheduledAt)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Month/Year:</span>
                            <span className="text-sm font-medium text-gray-900">
                              {formatMonthYear(selectedCounseling.month, selectedCounseling.year)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Session Status</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Current Status:</span>
                            <span className={`text-sm font-medium ${getStatusColor(selectedCounseling.status)}`}>
                              {getStatusText(selectedCounseling.status)}
                            </span>
                          </div>
                          {selectedCounseling.reason && selectedCounseling.status=='cancelled'?(
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Cancel Reason:</span>
                            <span className={`text-sm font-medium `}>
                              {selectedCounseling.reason}
                            </span>
                          </div>
                          ):(<div className="flex justify-between">
                          </div>)}
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Last Updated:</span>
                            <span className="text-sm font-medium text-gray-900">
                              {new Date(selectedCounseling.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    {/* <div className="border-t border-gray-200 pt-6">
                      <div className="flex justify-between">
                        {['scheduled', 'confirmed'].includes(selectedCounseling.status) && selectedCounseling.scheduledAt && (
                          <button
                            onClick={() => {
                              toast.info('Joining counseling session...');
                              setShowDetailsModal(false);
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
                          >
                            <FiVideo className="inline mr-2 h-4 w-4" />
                            Join Session
                          </button>
                        )}
                      </div>
                    </div> */}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudentCounseling;