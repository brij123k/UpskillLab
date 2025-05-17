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
    <div className="w-full px-3 sm:px-4 md:px-6 py-6 md:py-8 border-2 shadow-sm md:shadow-md lg:shadow-lg border-[#4d2c5e11] lg:bg-[#4D2C5E] rounded-xl md:rounded-2xl overflow-hidden relative">
      {/* Desktop View - Card Grid (hidden on mobile) */}
      <div className="hidden lg:grid grid-cols-3 gap-4 md:gap-6 w-full">
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

      {/* Tablet View - Compact Cards (hidden on mobile and desktop) */}
      <div className="hidden md:flex lg:hidden flex-row items-center justify-between gap-3 w-full">
        <div className="flex-1 bg-white shadow-sm rounded-lg px-4 py-3 flex items-center gap-3 border border-purple-100">
          <div className="bg-purple-50 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 5.5 1.3 6 4v2H6v-2c0-2.7 3.3-4 6-4zm0-2c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-700">{currentStats.rating}+</h3>
            <p className="text-sm font-medium text-gray-700">Happy Students</p>
          </div>
        </div>

        <div className="flex-1 bg-white shadow-sm rounded-lg px-4 py-3 flex items-center gap-3 border border-purple-100">
          <div className="bg-purple-50 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 6H4V4h16v2zm0 2v10H4V8h16zm-2 2H6v6h12v-6z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-700">{currentStats.trained}+</h3>
            <p className="text-sm font-medium text-gray-700">Courses Trained</p>
          </div>
        </div>

        <div className="flex-1 bg-white shadow-sm rounded-lg px-4 py-3 flex items-center gap-3 border border-purple-100">
          <div className="bg-purple-50 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a7 7 0 100 14 7 7 0 000-14zm0 16c-4.67 0-8 2.34-8 5v1h16v-1c0-2.66-3.33-5-8-5z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-700">{currentStats.partners}+</h3>
            <p className="text-sm font-medium text-gray-700">Hiring Partners</p>
          </div>
        </div>
      </div>

      {/* Mobile View - Compact Cards */}
     <div className="flex md:hidden flex-row items-center justify-between gap-1 sm:gap-2 w-full overflow-x-auto py-1">
  {/* Card 1 */}
  <div className="flex-shrink-0 bg-white shadow-xs rounded-lg px-2 py-1.5 flex items-center gap-1.5 border border-purple-100 min-w-[30%]">
    <div className="bg-purple-50 p-1 rounded">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-purple-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.7 0 5.5 1.3 6 4v2H6v-2c0-2.7 3.3-4 6-4zm0-2c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
      </svg>
    </div>
    <div className="min-w-0">
      <h3 className="text-sm font-bold text-purple-700 truncate">{currentStats.rating}+</h3>
      <p className="text-[10px] font-medium text-gray-700 truncate">Happy Students</p>
    </div>
  </div>

  {/* Card 2 */}
  <div className="flex-shrink-0 bg-white shadow-xs rounded-lg px-2 py-1.5 flex items-center gap-1.5 border border-purple-100 min-w-[30%]">
    <div className="bg-purple-50 p-1 rounded">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-purple-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 6H4V4h16v2zm0 2v10H4V8h16zm-2 2H6v6h12v-6z"/>
      </svg>
    </div>
    <div className="min-w-0">
      <h3 className="text-sm font-bold text-purple-700 truncate">{currentStats.trained}+</h3>
      <p className="text-[10px] font-medium text-gray-700 truncate">Courses</p>
    </div>
  </div>

  {/* Card 3 */}
  <div className="flex-shrink-0 bg-white shadow-xs rounded-lg px-2 py-1.5 flex items-center gap-1.5 border border-purple-100 min-w-[30%]">
    <div className="bg-purple-50 p-1 rounded">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-purple-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a7 7 0 100 14 7 7 0 000-14zm0 16c-4.67 0-8 2.34-8 5v1h16v-1c0-2.66-3.33-5-8-5z"/>
      </svg>
    </div>
    <div className="min-w-0">
      <h3 className="text-sm font-bold text-purple-700 truncate">{currentStats.partners}+</h3>
      <p className="text-[10px] font-medium text-gray-700 truncate">Partners</p>
    </div>
  </div>
</div>
    </div>
  );
};

export default StudentFeedBack;