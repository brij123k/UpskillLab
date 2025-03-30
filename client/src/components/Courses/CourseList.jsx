import React from 'react';
import CourseCard from './CourseCard'; 
import Course1 from '../../assets/course1.png';
import Course2 from '../../assets/course2.png';
import Course3 from '../../assets/course3.png';

function CourseList() {
  const courses = [
    {
      imageUrl: './images/Image.png',
      title: 'AWS Certified Solutions Architect',
      duration: '3 Months',
      studentsEnrolled: 1250,
      originalPrice: 199,
      discountedPrice: 149
    },
    {
      imageUrl: Course2,
      title: 'Advanced React Development',
      duration: '4 Months',
      studentsEnrolled: 980,
      originalPrice: 179,
      discountedPrice: 129
    },
    {
      imageUrl: Course3,
      title: 'Data Science Fundamentals',
      duration: '6 Months',
      studentsEnrolled: 2100,
      originalPrice: 249,
      discountedPrice: 199
    },
    {
      imageUrl: Course1,
      title: 'UX/UI Design Masterclass',
      duration: '3 Months',
      studentsEnrolled: 750,
      originalPrice: 159,
      discountedPrice: 119
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-5 gap-6 place-items-center">
      {courses.map((course, index) => (
        <CourseCard key={index} {...course} />
      ))}
    </div>
  );
}

export default CourseList;