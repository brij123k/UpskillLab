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
  const blogs = [
    {
      id: 1,
      title: "How I Transitioned from Mechanical Engineering to Data Science",
      excerpt: "My journey from traditional engineering to cutting-edge data science with UpSkillLab's PGP program and how it transformed my career path completely.",
      author: "Rahul Sharma",
      date: "May 15, 2023",
      readTime: "5 min",
      category: "Student Stories",
      imageUrl: "https://images.pexels.com/photos/4144225/pexels-photo-4144225.jpeg"
    },
    {
      id: 2,
      title: "10 Python Libraries Every Data Science Beginner Should Know",
      excerpt: "Essential Python libraries that helped me during my UpSkillLab journey and how to get started with each of them effectively.",
      author: "Priya Patel",
      date: "Jun 2, 2023",
      readTime: "7 min",
      category: "Learning Tips",
      imageUrl: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg"
    },
    {
      id: 3,
      title: "Balancing Full-Time Work with UpSkillLab's Evening Batches",
      excerpt: "Practical strategies I used to manage my job while completing the PGP in Data Science through UpSkillLab's flexible learning model.",
      author: "Arjun Mehta",
      date: "Apr 28, 2023",
      readTime: "4 min",
      category: "Student Stories",
      imageUrl: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
    },
    {
      id: 4,
      title: "My Capstone Project Experience at UpSkillLab",
      excerpt: "A deep dive into how my capstone project helped me land my first data science role at a Fortune 500 company.",
      author: "Neha Gupta",
      date: "Jul 10, 2023",
      readTime: "6 min",
      category: "Projects",
      imageUrl: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg"
    },
    {
      id: 5,
      title: "The Complete Guide to UpSkillLab's Placement Support",
      excerpt: "How I utilized UpSkillLab's career services to prepare for interviews and secure multiple job offers in the AI field.",
      author: "Vikram Singh",
      date: "Mar 22, 2023",
      readTime: "8 min",
      category: "Career Guidance",
      imageUrl: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg"
    },
    {
      id: 6,
      title: "From Basics to Advanced: My Machine Learning Journey",
      excerpt: "How UpSkillLab's structured curriculum helped me build machine learning expertise from scratch in just 6 months.",
      author: "Ananya Reddy",
      date: "Aug 5, 2023",
      readTime: "9 min",
      category: "Learning Tips",
      imageUrl: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
    }
  ];

  return (
    <div className='bg-[#F7F7F7] min-h-screen'>
      <Header />

      {/* Blog Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-[#ff7426] to-[#ff8e3a] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            UpSkillLab <span className="text-[#4D2C5E]">Student Blog</span>
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

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded-md bg-[#ff7426] text-white font-medium">1</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-200">2</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-200">3</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-200">Next →</button>
          </nav>
        </div>
      </motion.main>

      <StudentFeedBack />
      <div className='py-4'>
        <AdmissionForm />
      </div>
      <TrainingBanner />
      <FeedbaackBanner />
      <Footer />
    </div>
  );
};

export default StudentsBlog;