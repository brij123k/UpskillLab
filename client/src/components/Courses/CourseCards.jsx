import React from 'react';
import CourseList from './CourseList';
import { FiClock, FiUsers, FiArrowRight } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
function CourseCards() {

 const navigation= useNavigate()
    
  return (
    <div className='bg-white relative overflow-hidden' id='Courses'>
        <Helmet>
        <title>Explore Online Courses | Upskillab</title>
        <meta 
          name="description" 
          content="Browse certified online courses in Psychology, Cybersecurity and more. Job-ready bootcamps for Indian professionals." 
        />
        <meta property="og:title" content="Explore Online Courses | Upskillab" />
        <meta property="og:description" content="Browse certified online courses in Psychology, Cybersecurity and more." />
      </Helmet>
      {/* Background decorative elements */}
      <div className='w-[80%] h-[80%] absolute top-20 left-[-250px] blur-lg rounded-full bg-[#FF74261A] z-0'></div>
      <img 
        src="/images/PlanetIconImage.png" 
        alt="Planet Icon" 
        className="absolute top-4 right-4 h-8 lg:h-12 z-10" 
      />

      {/* Main content container */}
      <div className="relative bg-gradient-to-b from-[#f2f0ff] to-white py-16 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="relative text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">
              Explore Our World's Best <span className='text-[#FF7426]'>Courses </span>
            </h2>



          </div>

          {/* Course cards list */}
          <CourseList />

          {/* Explore All button - properly aligned */}
          <div className="flex justify-center lg:justify-end mt-12 w-full">
            <NavLink to="/CourseList">
            <button
            
            className="bg-[#4d2c5e] hover:bg-[#3a2148] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center shadow-md hover:shadow-lg cursor-pointer">
              Explore All
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCards;
