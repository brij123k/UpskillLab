import React from 'react';
import CourseCard from './CourseCard'; 
import Course1 from '../../assets/course1.png';
import Course2 from '../../assets/course2.png';
import Course3 from '../../assets/course3.png';

function CourseList() {
  const courses = [
    {
      image: Course1,
      category: 'Design',
      duration: '3 Month',
      title: 'AWS Certified solutions Architect',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    },
    {
      image: Course2,
      category: 'Design',
      duration: '3 Month',
      title: 'AWS Certified solutions Architect',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    },
    {
      image: Course3,
      category: 'Design',
      duration: '3 Month',
      title: 'AWS Certified solutions Architect',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    },
    {
      image: Course3,
      category: 'Design',
      duration: '3 Month',
      title: 'AWS Certified solutions Architect',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course, index) => (
        <CourseCard key={index} {...course} />
      ))}
    </div>
  );
}

export default CourseList;