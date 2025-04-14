import React, { useEffect, useState } from 'react';
import Card from './Cards';
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

  return (
    <div className="hidden lg:block w-full px-3 md:px-4 py-6 md:py-8 bg-[#4D2C5E] rounded-2xl overflow-hidden relative">
      {stats.length === 0 ? (
        <div className="text-center text-white">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
          {stats.map((stat, index) => (
            <Card
              key={stat.id || index}
              imageSrc={stat.imageUrl}
              title={stat.count}
              subtitle={stat.label}
              animate={true} // Keep Card animations
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentFeedBack;