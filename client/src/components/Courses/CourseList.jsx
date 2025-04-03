import React from 'react';
import CourseCard from './CourseCard'; 
import Course1 from '../../assets/course1.png';
import Course2 from '../../assets/course2.png';
import Course3 from '../../assets/course3.png';
import { motion } from 'framer-motion';
import {AllCourses} from "../../data";
function CourseList() {
  const courses = AllCourses.slice(0, 4);

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