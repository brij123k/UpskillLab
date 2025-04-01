import React from 'react';
import CourseCard from './CourseCard'; 
import Course1 from '../../assets/course1.png';
import Course2 from '../../assets/course2.png';
import Course3 from '../../assets/course3.png';
import { motion } from 'framer-motion';
function CourseList() {
  const courses = [
    {
      imageUrl: './images/Image.png',
      title: 'AWS Certified Solutions Architect',
      duration: '3 Months',
      studentsEnrolled: 1250,
      originalPrice: 199,
      discountedPrice: 149,
      remainingSheets: 3, // Very limited availability
      badgeColor: 'bg-red-500' // Red for urgent low availability
    },
    {
      imageUrl: Course2,
      title: 'Advanced React Development',
      duration: '4 Months',
      studentsEnrolled: 980,
      originalPrice: 179,
      discountedPrice: 129,
      remainingSheets: 8, // Low availability
      badgeColor: 'bg-orange-500' // Orange for low availability
    },
    {
      imageUrl: Course3,
      title: 'Data Science Fundamentals',
      duration: '6 Months',
      studentsEnrolled: 2100,
      originalPrice: 249,
      discountedPrice: 199,
      remainingSheets: 15, // Moderate availability
      badgeColor: 'bg-blue-500' // Blue for moderate availability
    },
    {
      imageUrl: Course1,
      title: 'UX/UI Design Masterclass',
      duration: '3 Months',
      studentsEnrolled: 750,
      originalPrice: 159,
      discountedPrice: 119,
      remainingSheets: 25, // Good availability
      badgeColor: 'bg-green-500' // Green for good availability
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
    <div className="mx-auto">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 2xl:gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </motion.div>
    </div>
  </div>

  );
}

export default CourseList;