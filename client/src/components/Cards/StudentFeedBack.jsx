import React from 'react';
import Card from './Cards';
import Student from '../../assets/Students.jpg';
import Course from '../../assets/Course.jpg';
import Expert from '../../assets/Experts.jpg';

const StudentFeedBack = () => {
  return (

    <div className="
    w-full
  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3
  gap-2
  px-4 md:px-8
  py-8
  bg-[#4D2C5E] rounded-lg
  hidden md:grid
  ">
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
      subtitle="Expert Instructors"
    />
  </div>

  );
};

export default StudentFeedBack;
