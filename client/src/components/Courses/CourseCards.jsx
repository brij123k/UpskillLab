import React from 'react';
import CourseList from './CourseList';
import PageHeader from './PageHeader';

function CourseCards() {
  return (
    <div className="relative bg-gradient-to-b from-[#f2f0ff] to-white py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <PageHeader /> 
        <CourseList />
      </div>
    </div>
  );
}

export default CourseCards;