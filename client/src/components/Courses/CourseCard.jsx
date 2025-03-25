import React from 'react';

function CourseCard({ image, category, duration, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <img src={image} alt={title} className="rounded-xl mb-4" />
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>{category}</span>
        <span>{duration}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="flex justify-end">
        <button className="bg-gray-100 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CourseCard;