import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StudentFeedBack from '../../components/Cards/StudentFeedBack';
import TrainingBanner from '../../components/banners/TrainingBanner';
import FeedbaackBanner from '../../components/banners/FeedbackBanner';
import AdmissionForm from '../../components/Forms/AdmissionForm';

// Blog Card Component
const BlogCard = ({
  title,
  excerpt,
  author,
  date,
  readTime,
  category,
  imageUrl
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all h-full flex flex-col"
      whileHover={{ y: -3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Blog Image */}
      <div className="h-40 sm:h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Blog Content */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Category Tag */}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-[#ff7426] bg-[#ff7426]/10 rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">{excerpt}</p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
          <span>{author}</span>
          <div className="flex items-center space-x-2">
            <span>{date}</span>
            <span>•</span>
            <span>{readTime} read</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Blog Page Component
const StudentsBlog = () => {
  // Sample blog data
  

  return (
    <div className='bg-[#F7F7F7] min-h-screen'>
      {/* Blog Banner */}
      <motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="relative bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  {/* Decorative elements */}
  <div className="absolute inset-0 overflow-hidden opacity-10">
    <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#FF7426]"></div>
    <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#FF7426]"></div>
  </div>

  <div className="relative max-w-7xl mx-auto text-center">
    <motion.h1
      className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      UpSkillLab <span className="text-[#FF7426]">Student Blog</span>
    </motion.h1>

    <motion.p
      className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto"
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      Insights, stories and tips from our students and alumni
    </motion.p>
  </div>
</motion.section>

      {/* Main Blog Content - Only Blog Cards */}
      <motion.main
        className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              author={blog.author}
              date={blog.date}
              readTime={blog.readTime}
              category={blog.category}
              imageUrl={blog.imageUrl}
            />
          ))}
        </div>
      </motion.main>

      <StudentFeedBack />
      <div className='py-4'>
        <AdmissionForm />
      </div>
      <TrainingBanner />
      <FeedbaackBanner />
    </div>
  );
};

export default StudentsBlog;