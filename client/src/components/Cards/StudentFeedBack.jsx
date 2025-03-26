import React from 'react';
import Card from './Cards';
import Student from '../../assets/Students.jpg';
import Course from '../../assets/Course.jpg';
import Expert from '../../assets/Experts.jpg';

const StudentFeedBack = () => {
  return (

    <div className="w-full flex flex-col lg:flex-row gap-3 px-8 py-8 bg-[#4D2C5E] rounded-lg">
      {/* Card 1 */}
      <Card
        imageSrc={Student}
        title={18000}
        subtitle="Happy Students"
      />

      {/* Card 2 */}
      <Card
        imageSrc={Course}
        title={18000}
        subtitle="Popular Courses"
      />

      {/* Card 3 */}
      <Card
        imageSrc={Student}
        title={18000}
        subtitle={"Expert Instructors"}
      />
    </div>

  );
};

export default StudentFeedBack;
