import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StudentFeedBack from '../../components/Cards/StudentFeedBack';
import TrainingBanner from '../../components/banners/TrainingBanner';
import FeedbaackBanner from '../../components/banners/FeedbackBanner';
import AdmissionForm from '../../components/Forms/AdmissionForm';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaClock, FaShareAlt } from 'react-icons/fa';
import ApiConfig from '../../config/apiConfig';
import { getDataHandler } from '../../config/services';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import BlogContentRenderer from '../../components/BlogContentRenderer';
import { Helmet } from 'react-helmet-async';
const BlogDetailPage = () => {
  const { slug } = useParams(); // Get the blog slug from URL params
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const endpointUrl = ApiConfig.blogbyBlogTitle(slug);
        const response = await getDataHandler(endpointUrl, null, null, true);
        if (response.blog) {
          setBlog(response.blog);
        } else {
          throw new Error(response.message || 'Failed to fetch blog');
        }
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load blog post');
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    } else {
      setError('No blog slug provsluged');
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#F7F7F7] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F7F7F7] min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-[#4D2C5E] mb-4">Error Loading Blog</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#4D2C5E] text-white px-4 py-2 rounded hover:bg-[#3a2152] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-[#F7F7F7] min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-[#4D2C5E] mb-4">Blog Not Found</h2>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/blog')}
            className="bg-[#4D2C5E] text-white px-4 py-2 rounded hover:bg-[#3a2152] transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  // Format date from createdAt if using API data
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate read time based on description length
  const wordCount = blog.description.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      {/* Blog Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex items-center mb-6"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-white/90 hover:text-white transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Blog
            </button>
          </motion.div>

          <div className="text-center">
            <motion.span
              className="inline-block px-3 py-1 text-sm font-semibold text-[#ff7426] bg-white rounded-full mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              {blog.category || 'Blog Post'}
            </motion.span>

            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {blog.title}
            </motion.h2>

            <motion.div
              className="flex flex-wrap items-center justify-center text-white/80 text-sm gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center">
                <FaUser className="mr-2 text-[#FF7426]" />
                Upskillab
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-[#FF7426]" />
                {formattedDate}
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2 text-[#FF7426]" />
                {readTime} min read
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Blog Content */}
      <motion.main
        className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Featured Image */}
        {blog.image && (
          <motion.div
            className="rounded-xl overflow-hidden mb-8 shadow-lg"
            whileHover={{ scale: 1.005 }}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto max-h-[500px] object-cover"
              loading="eager"
            />
          </motion.div>
        )}

        {/* Blog Content */}
        <article className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-12">
          {/* Tags - if your API returns tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium text-[#4D2C5E] bg-[#4D2C5E]/10 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Main Content */}
          <BlogContentRenderer content={blog.description} />

          {/* Share Options */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-[#4D2C5E] mb-4 flex items-center">
              <FaShareAlt className="mr-2 text-[#FF7426]" />
              Share this post
            </h3>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Facebook', 'WhatsApp'].map((social) => {
                const getShareUrl = () => {
                  const currentUrl = encodeURIComponent(window.location.href);
                  const title = encodeURIComponent(blog.title);

                  switch (social.toLowerCase()) {
                    case 'twitter':
                      return `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`;
                    case 'linkedin':
                      return `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
                    case 'facebook':
                      return `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
                    case 'whatsapp':
                      return `https://wa.me/?text=${title}%20${currentUrl}`;
                    default:
                      return '#';
                  }
                };

                const handleShare = () => {
                  const width = 600;
                  const height = 400;
                  const left = (window.innerWidth - width) / 2;
                  const top = (window.innerHeight - height) / 2;

                  window.open(
                    getShareUrl(),
                    'social-share',
                    `width=${width},height=${height},left=${left},top=${top}`
                  );
                };

                return (
                  <motion.button
                    key={social}
                    onClick={handleShare}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-gray-100 rounded-full text-[#4D2C5E] hover:bg-gray-200 transition-colors flex items-center gap-2 cursor-pointer"
                    aria-label={`Share on ${social}`}
                  >
                    {social === 'Twitter' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    )}
                    {social === 'LinkedIn' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    )}
                    {social === 'Facebook' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325- decrease font size1.325z" />
                      </svg>
                    )}
                    {social === 'WhatsApp' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297a11.815 11.815 0 00-8.415-3.48c-6.627 0-12.015 5.385-12.015 12.001 0 2.17.569 4.203 1.566 5.945l-1.05 3.851 3.947-1.035a11.98 11.98 0 005.553 1.363h.006c6.627 0 12.014-5.385 12.014-12 0-3.176-1.24-6.165-3.49-8.415" />
                      </svg>
                    )}
                    <span className="hidden sm:inline">{social}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </article>
      </motion.main>
      <div className="py-4">
        <AdmissionForm />
      </div>
      <TrainingBanner />
      <FeedbaackBanner />
          <Helmet>
              <title>{blog.title}</title>
  <meta name="description" content={blog.des} />
  <meta name="keywords" content="Upskillab blog, student insights, online learning tips, education articles" />
  <meta property="og:title" content="Upskillab Student Blog | Insights and Tips for Online Learners" />
  <meta property="og:description" content="Read blog posts from Upskillab students sharing their experiences and advice on online learning." />
  <meta property="og:url" content="https://upskillab.com/student-blog" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Upskillab Student Blog | Insights and Tips for Online Learners" />
  <meta name="twitter:description" content="Gain valuable insights and tips from Upskillab's student community through our blog." />
        <link rel="canonical" href={`https://upskillab.com/blog/${slug}`} />
      </Helmet>
    </div>
    
  );
};

export default BlogDetailPage;