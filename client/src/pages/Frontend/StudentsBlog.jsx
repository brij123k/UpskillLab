import React, { useState, useEffect,useMemo  } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StudentFeedBack from '../../components/Cards/StudentFeedBack';
import TrainingBanner from '../../components/banners/TrainingBanner';
import FeedbaackBanner from '../../components/banners/FeedbackBanner';
import AdmissionForm from '../../components/Forms/AdmissionForm';
import { getBlogs } from '../../config/services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// Blog Card Component

const TruncatedHTML = ({ html, maxLength = 150 }) => {
  const truncated = useMemo(() => {
    if (html.length <= maxLength) return html;
    
    // Create temporary element to parse HTML
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    // Get text content and truncate
    const text = temp.textContent || temp.innerText || '';
    return `${text.substring(0, maxLength)}...`;
  }, [html, maxLength]);

  return (
    <p 
      className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3"
      dangerouslySetInnerHTML={{ __html: truncated }}
    />
  );
};

const BlogCard = ({
  id,
  title,
  content,
  category,
  image,
  createdAt
}) => {
  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
 const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/BlogDetail/${id}`,{ state: { id } });
  }
  // Estimate read time (assuming 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (

    <motion.div 
      onClick={handleClick}
      key={id}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all h-full flex flex-col cursor-pointer"
      whileHover={{ y: -3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Blog Image */}
      <div className="h-40 sm:h-48 overflow-hidden">
        <img
          src={image || '/images/blog-placeholder.jpg'}
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
            {category || 'General'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>

        {/* Excerpt */}
        <TruncatedHTML html={content} maxLength={150} />

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
          <span>Upskillab</span>
          <div className="flex items-center space-x-2">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>
    </motion.div>

  );
};

// Main Blog Page Component
const StudentsBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await getBlogs({
          limit: 100 // Adjust based on how many blogs you want to show
        });
        if (response.blogs) {
          setBlogs(response.blogs);
        } else {
          throw new Error(response.message || 'Failed to fetch blogs');
        }
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load blogs. Please try again later.');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
            Upskillab <span className="text-[#FF7426]">Blog</span>
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

      {/* Main Blog Content */}
      <motion.main
        className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            {error}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No blogs available at the moment.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                id={blog._id}
                title={blog.title}
                content={blog.description}
                category={blog.tag}
                image={blog.image}
                createdAt={blog.createdAt}
              />
            ))}
          </div>
        )}
      </motion.main>

      <StudentFeedBack />
      <div className='py-4'>
        <AdmissionForm />
      </div>
      <TrainingBanner />
      <FeedbaackBanner />

      <Helmet>
  <title>Upskillab Student Blog | Insights and Tips for Online Learners</title>
  <meta name="description" content="Explore articles, tips, and insights from Upskillab students to enhance your online learning experience." />
  <meta name="keywords" content="Upskillab blog, student insights, online learning tips, education articles" />
  <meta property="og:title" content="Upskillab Student Blog | Insights and Tips for Online Learners" />
  <meta property="og:description" content="Read blog posts from Upskillab students sharing their experiences and advice on online learning." />
  <meta property="og:url" content="https://upskillab.com/student-blog" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Upskillab Student Blog | Insights and Tips for Online Learners" />
  <meta name="twitter:description" content="Gain valuable insights and tips from Upskillab's student community through our blog." />
</Helmet>



    </div>
  );
};

export default StudentsBlog;
