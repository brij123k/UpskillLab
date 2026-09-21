import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion,AnimatePresence } from 'framer-motion';
import ApiConfig from '../../config/apiConfig';
import { getDataHandler } from '../../config/services';
import BlogContentRenderer from '../../components/BlogContentRenderer';

const NewsDetailPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        if (location.state?.news) {
          setNews(location.state.news);
          setLoading(false);
          return;
        }

        const endpoint = ApiConfig.newsbyslug(slug);
        const response = await getDataHandler(endpoint, null, null, true);
        
        if (response) {
          setNews(response);
        } else {
          throw new Error('News not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug, location.state]);

  // Image carousel navigation
  const nextImage = () => {
    if (news?.images?.length) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === news.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (news?.images?.length) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? news.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Share functionality
  const copyToClipboard = async () => {
    const newsUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(newsUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = newsUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const shareNews = async () => {
    const newsUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.description,
          url: newsUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading news article...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">News Not Found</h2>
          <p className="text-gray-600 mb-4">The news article you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/newsletter')}
            className="bg-[#4D2C5E] text-white px-6 py-3 rounded-lg hover:bg-[#5a3a6e] transition-colors"
          >
            Back to News
          </button>
        </div>
      </div>
    );
  }

  const newsUrl = window.location.href;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{news.title} | Upskillab News</title>
        <meta name="description" content={news.description} />
        <link rel="canonical" href={`https://upskillab.com/newsletter/${news.slug}`} />
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={news.description} />
        <meta property="og:image" content={news.thumbnail} />
        <meta property="og:url" content={newsUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-full mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/newsletter')}
              className="flex items-center text-white/80 hover:text-white transition-colors text-sm sm:text-base"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to News
            </button>

            {/* Share Button */}
            <div className="relative">
              <motion.button
                onClick={shareNews}
                className="flex items-center bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </motion.button>

              {/* Share Tooltip */}
              <AnimatePresence>
                {showShareTooltip && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 bg-gray-800 text-white p-3 rounded-lg shadow-xl z-10 min-w-[200px]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <p className="text-sm mb-2">Copy link to share:</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newsUrl}
                        readOnly
                        className="flex-1 bg-gray-700 text-white text-xs p-2 rounded border-none outline-none"
                        onClick={(e) => e.target.select()}
                      />
                      <motion.button
                        onClick={copyToClipboard}
                        className={`px-3 py-2 rounded text-xs font-medium ${
                          linkCopied ? 'bg-green-600' : 'bg-[#FF7426] hover:bg-[#FF8C42]'
                        } transition-colors`}
                        whileTap={{ scale: 0.95 }}
                      >
                        {linkCopied ? 'Copied!' : 'Copy'}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {news.title}
          </motion.h1>

          <motion.div
            className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="bg-white/20 px-3 py-1 rounded-full">By {news.authorName}</span>
            <span>•</span>
            <span>
              {new Date(news.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag, index) => (
                <span key={index} className="bg-white/20 px-2 py-1 rounded text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Thumbnail Image */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={news.thumbnail}
            alt={news.title}
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-lg"
            loading="eager"
          />
        </motion.div>

        {/* News Content */}
        <motion.div
          className="prose prose-lg max-w-none mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <BlogContentRenderer content={news.content} />
        </motion.div>

        {/* Image Carousel */}
        {news.images && news.images.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Gallery</h3>
            <div className="relative bg-gray-100 rounded-xl p-4">
              <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg">
                <img
                  src={news.images[currentImageIndex]}
                  alt={`${news.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
                
                {/* Navigation Arrows */}
                {news.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {news.images.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {news.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {news.images.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {news.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-[#4D2C5E]' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Share Section */}
        <motion.div
          className="border-t border-gray-200 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Found this interesting?</h3>
              <p className="text-gray-600">Share it with others who might benefit from this news.</p>
            </div>
            <div className="flex gap-3">
              <motion.button
                onClick={shareNews}
                className="flex items-center bg-[#4D2C5E] text-white px-6 py-3 rounded-lg hover:bg-[#5a3a6e] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Article
              </motion.button>
              
              <button
                onClick={() => navigate('/newsletter')}
                className="flex items-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                More News
              </button>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default NewsDetailPage;