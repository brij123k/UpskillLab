import React from 'react';
import Card from './Cards';
import Student from '../../assets/Students.jpg';
import Course from '../../assets/Course.jpg';
import Expert from '../../assets/Experts.jpg';

const StudentFeedBack = () => {
  return (
    
      <div className="w-full max-w-[1599px] h-auto flex flex-col md:flex-row justify-around bg-[#4D2C5E] p-6 md:p-10 rounded-[14px] mx-4 md:mx-[126px] space-y-6 md:space-y-0 md:space-x-6">
        {/* Card 1 */}
        <Card
          imageSrc={Student}
          title="18,000+"
          subtitle="Happy Students"
        />

        {/* Card 2 */}
        <Card
          imageSrc={Course}
          title="100+"
          subtitle="Popular Courses"
        />

        {/* Card 3 */}
        <Card
          imageSrc={Expert}
          title="60+"
          subtitle={
            <span>
              Expert
              <span className="block">Instructors</span>
            </span>
          }
        />
      </div>
    
  );
};

export default StudentFeedBack;
