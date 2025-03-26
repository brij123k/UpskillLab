import React from 'react';
import CourseList from './CourseList';

function CourseCards() {
  return (
    <div className='bg-white relative'>
      <div className='w-100 h-[80%] absolute top-20 left-[-250px] blur-lg  rounded-full bg-[#FF74261A] z-100'></div>
      <img src="/images/PlanetIconImage.png" alt="Planet Icon" className="absolute top-4 right-4  h-8 lg:h-12 z-100" />

      <div className="relative bg-white from-[#f2f0ff] to-white py-16 lg:py-12 px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="relative">
            <h2 className="text-2xl lg:text-4xl  font-semibold text-center mb-10">
              Explore Our World's Best Courses
            </h2>

          </div>
          <CourseList />
        </div>
      </div>
    </div>
  );
}

export default CourseCards;