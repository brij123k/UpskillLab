import React, { useEffect, useState } from 'react';
import { Card, CompactRating } from './Cards';
import { getDataHandler } from '../../config/services';

const StudentFeedBack = () => {
  const [stats, setStats] = useState([]);

  const handleFeedback = async () => {
    try {
      const res = await getDataHandler('stats');
      if (res && res.stats) {
        setStats(res.stats.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    handleFeedback();
  }, []);

  // Default stats in case API doesn't respond
  const defaultStats = {
    rating: "4.8",
    trained: "50K+",
    partners: "500+"
  };

  const currentStats = stats.length > 0 ? {
    rating: stats[0]?.count || defaultStats.rating,
    trained: stats[1]?.count || defaultStats.trained,
    partners: stats[2]?.count || defaultStats.partners
  } : defaultStats;

  return (
    <div className="mb-2 block w-full px-3 md:px-4 py-6 md:py-8 border-2 shadow-2xl lg:shadow-0 border-[#4d2c5e11] lg:bg-[#4D2C5E] rounded-2xl overflow-hidden relative">
      {/* Desktop View - Card Grid (hidden on mobile) */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
        {stats.length > 0 ? (
          stats.map((stat, index) => (
            <Card
              key={stat.id || index}
              imageSrc={stat.imageUrl}
              title={stat.count}
              subtitle={stat.label}
              animate={true}
            />
          ))
        ) : (
          <>
            <Card title={defaultStats.rating} subtitle="Happy Students" animate={true} />
            <Card title={defaultStats.trained} subtitle="Popular Courses" animate={true} />
            <Card title={defaultStats.partners} subtitle="Expert Instructors" animate={true} />
          </>
        )}
      </div>

      {/* Mobile View - Beautiful Bordered Stats (shown only on mobile)
      <div className="lg:hidden flex flex-col items-center gap-4 px-4 py-6">
        <div className=" rounded-xl  p-2 text-center backdrop-blur-sm bg-white/10">
          <h3 className="text-xl md:text-3xl font-bold text-[#FF7426]">{currentStats.rating}+</h3>
          <p className="text-xs md:text-md text-[#4D2C5E] mt-2">Happy Students</p>
        </div>
        <div className='bg-[#4d2c5ea4] w-0.5'></div>

        <div className=" rounded-xl p-2 text-center backdrop-blur-sm bg-white/10">
          <h3 className="text-xl md:text-3xl font-bold text-[#FF7426]">{currentStats.trained}+</h3>
          <p className="text-xs md:text-md text-[#4D2C5E] mt-2">Popular Courses</p>
        </div>
        <div className='bg-[#4d2c5ea4] w-0.5'></div>
        <div className="rounded-xl p-2 text-center backdrop-blur-sm bg-white/10">
          <h3 className="text-xl md:text-3xl font-bold text-[#FF7426]">{currentStats.partners}+</h3>
          <p className=" text-xs md:text-md text-[#4D2C5E] mt-2">Expert Instructors</p>
        </div>
      </div> */}
    {/* Mobile View - Stylish Image-Themed Cards */}
<div className="lg:hidden flex flex-col items-center gap-4 px-2 sm:px-4 py-4 sm:py-6 w-full">
  {/* Stats Row */}
  <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 w-full">
    {/* Card 1 */}
    <div className="flex items-start bg-white shadow-md rounded-xl px-2 sm:px-3 py-1 sm:py-2 gap-1 sm:gap-2 border border-purple-300 min-w-0 flex-1">
      <div className="bg-purple-100 p-1 sm:p-2 rounded-lg shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-purple-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.7 0 5.5 1.3 6 4v2H6v-2c0-2.7 3.3-4 6-4zm0-2c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
        </svg>
      </div>
      <div className="flex flex-col justify-end min-w-0 h-full">
        <h3 className="text-base sm:text-lg font-bold text-[#C3325F]">{currentStats.rating}</h3>
        <p className="text-xs sm:text-xs font-medium text-gray-800 whitespace-normal">Google Rating</p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="flex items-start bg-white shadow-md rounded-xl px-2 sm:px-3 py-1 sm:py-2 gap-1 sm:gap-2 border border-purple-300 min-w-0 flex-1">
      <div className="bg-purple-100 p-1 sm:p-2 rounded-lg shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-purple-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 6H4V4h16v2zm0 2v10H4V8h16zm-2 2H6v6h12v-6z"/>
        </svg>
      </div>
      <div className="flex flex-col justify-end min-w-0 h-full">
        <h3 className="text-base sm:text-lg font-bold text-[#C3325F]">{currentStats.trained}</h3>
        <p className="text-xs sm:text-xs font-medium text-gray-800 whitespace-normal">Mentees Trained</p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="flex items-start bg-white shadow-md rounded-xl px-2 sm:px-3 py-1 sm:py-2 gap-1 sm:gap-2 border border-purple-300 min-w-0 flex-1">
      <div className="bg-purple-100 p-1 sm:p-2 rounded-lg shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-purple-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a7 7 0 100 14 7 7 0 000-14zm0 16c-4.67 0-8 2.34-8 5v1h16v-1c0-2.66-3.33-5-8-5z"/>
        </svg>
      </div>
      <div className="flex flex-col justify-end min-w-0 h-full">
        <h3 className="text-base sm:text-lg font-bold text-[#C3325F]">{currentStats.partners}</h3>
        <p className="text-xs sm:text-xs font-medium text-gray-800 whitespace-normal">Hiring Partner</p>
      </div>
    </div>
  </div>



</div>

      

    </div>
  );
};

export default StudentFeedBack;