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

      {/* Mobile View - Beautiful Bordered Stats (shown only on mobile) */}
      <div className="lg:hidden flex justify-evenly flex-row">
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
      </div>
    </div>
  );
};

export default StudentFeedBack;