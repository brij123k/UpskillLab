import React,{useState,useEffect} from 'react';
import CourseCard from './CourseCard'; 
import Course1 from '../../assets/course1.png';
import Course2 from '../../assets/course2.png';
import Course3 from '../../assets/course3.png';
import { motion } from 'framer-motion';
import {AllCourses} from "../../data";
import { getDataHandler } from '../../config/services';
import { Helmet } from 'react-helmet-async';

function CourseList() {
  const [courses, setCourses] = useState([]);





  
  const handelCourses = async () => {
    const res = await getDataHandler('courseDisplay');
    if (res && res.data) {
      const newCourses = res.data
        .filter((course) => course.featured === true && course.active)
        .slice(0, 4) // Take only first 4 courses
        .map((course, index) => ({
          id: index + 1,
          courseId: course._id,
          courseCode: course.courseCode,
          title: course.courseName,
          metaTitle: course.metaTitle,
          metaDescription: course.metaDescription,
          categoryId: course.category,
          image: course.courseImage,
          courseLevel: course.courseLevel.name,
          remainingSheets: course.seatsAvailable,
          originalPrice: course.originalPrice,
          discountedPrice: course.discountedPrice,
          duration: course.courseDuration,
          studentsEnrolled: course.studentsEnrolled,
          categoryName :course.category.categoryName
        }));
      setCourses(newCourses);
    }
  };
  
  useEffect(() => {
    handelCourses();
  },[]);


  
   const courseSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": courses.map((course, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Course",
        "name": course.metaTitle,
        "description": `Online course: ${course.metaDescription}`,
        "provider": {
          "@type": "Organization",
          "name": "Upskillab",
          "sameAs": "https://upskillab.com"
        },
        "url": `https://upskillab.com/${course.categoryName?.toLowerCase()}/course/${course.courseCode}`,
        "image": course.image,
        "offers": {
          "@type": "Offer",
          "price": course.discountedPrice,
          "priceCurrency": "INR",
          "availability": course.remainingSheets > 0 
            ? "https://schema.org/InStock" 
            : "https://schema.org/SoldOut"
        }
      }
    }))
  };

  
  // const { data: coursesData } = useQuery({
  //   queryKey: ["courses", queryParams],
  //   queryFn: () => getDataHandler("courseDisplay", null, queryParams),
  // });
  // // const courses = coursesData?.data || [];
  // const queryParams = {
  //   limit: 4,
  //   sortBy: "createdAt",
  //   order: "desc",
  // };
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            {/* Inject schema into page head */}
      {courses.length > 0 && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(courseSchema)}
          </script>
        </Helmet>
      )}

      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        {/* your existing JSX unchanged */}
      </div>
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
