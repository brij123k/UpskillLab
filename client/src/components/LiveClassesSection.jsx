import { FiCalendar, FiClock, FiUsers, FiVideo, FiCheckCircle, FiAlertCircle, FiPlay, FiLock } from 'react-icons/fi';
import { format, isBefore, isAfter } from 'date-fns';

const LiveClassesSection = ({ classes }) => {
  const now = new Date();
  
  // Filter classes for today
  const todayClasses = classes.filter(session => {
    const sessionDate = new Date(session.scheduledDate);
    return (
      sessionDate.getDate() === now.getDate() &&
      sessionDate.getMonth() === now.getMonth() &&
      sessionDate.getFullYear() === now.getFullYear()
    );
  });

  // Separate live and upcoming classes
  const liveClasses = todayClasses.filter(session => {
    const start = new Date(session.scheduledDate);
    const startTimeParts = session.scheduledStartTime.split(':');
    start.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]));
    
    const end = new Date(session.scheduledDate);
    const endTimeParts = session.scheduledEndTime.split(':');
    end.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]));
    
    return isBefore(start, now) && isAfter(end, now);
  });

  const upcomingClasses = todayClasses.filter(session => {
    const start = new Date(session.scheduledDate);
    const startTimeParts = session.scheduledStartTime.split(':');
    start.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]));
    return isAfter(start, now);
  }).sort((a, b) => {
    const aStart = new Date(`${a.scheduledDate}T${a.scheduledStartTime}`);
    const bStart = new Date(`${b.scheduledDate}T${b.scheduledStartTime}`);
    return aStart - bStart;
  });

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, 'h:mm a');
  };

  return (
    <div className="space-y-8">
      {/* Live Classes Section */}
      {liveClasses.length > 0 && (
        <div>
          <div className="flex items-center mb-4">
            <div className="w-2 h-6 bg-red-500 rounded-full mr-2"></div>
            <h2 className="text-xl font-bold text-gray-800">Live Classes</h2>
            <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full flex items-center">
              <FiPlay className="mr-1 h-3 w-3" />
              LIVE NOW
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveClasses.map(session => (
              <LiveClassCard key={session._id} session={session} isLive={true} now={now} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Classes Section */}
      {upcomingClasses.length > 0 && (
        <div>
          <div className="flex items-center mb-4">
            <div className="w-2 h-6 bg-[#4D2C5E] rounded-full mr-2"></div>
            <h2 className="text-xl font-bold text-gray-800">Upcoming Classes Today</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingClasses.map(session => (
              <LiveClassCard key={session._id} session={session} isLive={false} now={now} />
            ))}
          </div>
        </div>
      )}

      {/* No Classes Message */}
      {liveClasses.length === 0 && upcomingClasses.length === 0 && (
        <div className="text-center py-12">
          <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No classes scheduled for today</h3>
          <p className="mt-1 text-gray-500">Check back later or view upcoming classes</p>
        </div>
      )}
    </div>
  );
};

const LiveClassCard = ({ session, isLive, now }) => {
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, 'h:mm a');
  };

  // Calculate time remaining for live classes
  const getTimeRemaining = () => {
    if (!isLive) return null;
    
    const end = new Date(session.scheduledDate);
    const endTimeParts = session.scheduledEndTime.split(':');
    end.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]));
    
    const diffMs = end - now;
    const diffMins = Math.round(diffMs / 60000);
    
    return diffMins > 0 ? `${diffMins} min remaining` : 'Ending soon';
  };

  const timeRemaining = getTimeRemaining();

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 border ${isLive ? 'border-red-200' : 'border-gray-100'} relative overflow-hidden`}>
      {isLive && (
        <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-br rounded-tl">
          LIVE
        </div>
      )}
      
      <div className={`absolute top-0 right-0 h-full w-2 bg-gradient-to-b ${isLive ? 'from-red-500 to-red-600' : 'from-[#FF7426] to-[#4D2C5E]'}`}></div>
      
      <div className="flex justify-between items-start mb-4 pr-4">
        <h3 className="text-lg font-semibold text-[#4D2C5E]">{session.title}</h3>
        {session.isApproved ? (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 flex items-center">
            <FiCheckCircle className="mr-1 h-3 w-3" />
            Approved
          </span>
        ) : (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 flex items-center">
            <FiAlertCircle className="mr-1 h-3 w-3" />
            Pending
          </span>
        )}
      </div>
      
      <div className="space-y-2 pr-4">
        <div className="flex items-center text-gray-600 text-sm">
          <FiCalendar className="mr-2 h-4 w-4 text-[#4D2C5E]" />
          {format(new Date(session.scheduledDate), 'MMM d, yyyy')}
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <FiClock className="mr-2 h-4 w-4 text-[#4D2C5E]" />
          {formatTime(session.scheduledStartTime)} - {formatTime(session.scheduledEndTime)}
          {isLive && timeRemaining && (
            <span className="ml-2 text-xs text-red-500">{timeRemaining}</span>
          )}
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
            session.isApproved && isLive
              ? 'bg-red-500 hover:bg-red-600'
              : session.isApproved
                ? 'bg-[#4D2C5E] hover:bg-[#3A2152]'
                : 'bg-gray-400 cursor-not-allowed'
          }`}
          style={!session.isApproved ? {pointerEvents: 'none'} : {}}
        >
          {isLive ? 'Join Live Class' : session.isApproved ? 'Join Class' : 'Pending Approval'}
        </a>
        
        {isLive ? (
          <div className="flex items-center">
            <span className="flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs text-red-500">Live Now</span>
          </div>
        ) : (
          <FiLock className="text-gray-400 h-6 w-6" />
        )}
      </div>
    </div>
  );
};

export default LiveClassesSection;