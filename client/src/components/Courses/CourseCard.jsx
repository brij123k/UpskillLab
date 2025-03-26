import React from 'react';
import StarRating from '../StarRating';
import { FaRegArrowAltCircleRight } from "react-icons/fa";

function CourseCard({ image, category, duration, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 z-1000 border border-gray-100">
      <img src={image} alt={title} className="rounded-xl mb-4" />
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <div className='flex gap-2'><img src='/images/ExploreCardIcon1.png' className='h-4' /> <span>{category}</span></div>
        <div className='flex gap-2'><img src='/images/ExploreCardIcon2.png' className='h-4' /> <span>{duration}</span></div>
        {/* <span>{duration}</span> */}
      </div>
      <h3 className="text-lg md:text-2xl font-semibold my-4">{title}</h3>
      <StarRating rating={3.5} />
      <p className="text-gray-600 text-sm md:text-lg my-4">{description}</p>
      <div className="flex justify-end">
        {/* <button className="bg-gray-100 rounded-full "> */}
        <FaRegArrowAltCircleRight className='text-3xl' />
        {/* </button> */}
      </div>
    </div>
  );
}

export default CourseCard;