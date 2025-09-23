import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getDataHandler, postDataHandler } from '../../config/services';

// Move SubscribeForm component outside to prevent re-renders
const SubscribeForm = React.memo(({ 
  showForm, 
  subscribeData, 
  subscribeLoading, 
  onInputChange, 
  onSubmit, 
  onClose 
}) => (
  <AnimatePresence>
    {showForm && (
      <motion.div
  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-3 md:p-4"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  onClick={onClose}
>
  <motion.div
    className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full mx-2 sm:mx-4 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg"
    initial={{ scale: 0.9, opacity: 0, y: 20 }}
    animate={{ scale: 1, opacity: 1, y: 0 }}
    exit={{ scale: 0.9, opacity: 0, y: 20 }}
    onClick={(e) => e.stopPropagation()}
  >
    {/* Header */}
    <div className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] p-4 sm:p-5 md:p-6 rounded-t-xl sm:rounded-t-2xl text-center">
      <div className="flex items-center justify-between mb-2">
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white p-1 transition-colors sm:hidden"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex-1 text-center mx-2 sm:mx-0">
          Stay Updated
        </h2>
        
        {/* Spacer for mobile layout balance */}
        <div className="w-5 h-5 sm:hidden"></div>
      </div>
      
      <p className="text-white/90 text-xs sm:text-sm md:text-base mt-2">
        Get the latest news and updates delivered to your inbox
      </p>
    </div>

    {/* Form */}
    <form onSubmit={onSubmit} className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={subscribeData.name}
          onChange={onInputChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent outline-none transition-all"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          value={subscribeData.email}
          onChange={onInputChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent outline-none transition-all"
          placeholder="your@email.com"
          required
        />
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          name="number"
          value={subscribeData.number}
          onChange={onInputChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent outline-none transition-all"
          placeholder="Your phone number"
        />
      </div>

      {/* Buttons - Stack on mobile, side-by-side on larger screens */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold text-xs sm:text-sm hover:bg-gray-50 transition-all order-2 sm:order-1"
          disabled={subscribeLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#FF7426] to-[#FF8C42] text-white rounded-lg font-semibold text-xs sm:text-sm hover:from-[#FF8C42] hover:to-[#FF7426] transition-all shadow-md disabled:opacity-50 order-1 sm:order-2"
          disabled={subscribeLoading}
        >
          {subscribeLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-white rounded-full animate-spin mr-2" />
              <span className="text-xs sm:text-sm">Subscribing...</span>
            </div>
          ) : (
            'Subscribe Now'
          )}
        </button>
      </div>

      {/* Privacy note */}
      <p className="text-xs text-gray-500 text-center pt-2">
        We respect your privacy. Your information is secure with us.
      </p>
    </form>
  </motion.div>
</motion.div>
    )}
  </AnimatePresence>
));

// Move NewsCard component outside as well
const NewsCard = React.memo(({ newsItem, onNewsClick }) => {
  // Truncate HTML content for preview
  const truncateHTML = (html, maxLength = 120) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer"
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={() => onNewsClick(newsItem)}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={newsItem.thumbnail}
          alt={newsItem.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {newsItem.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#4D2C5E] transition-colors">
          {newsItem.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {truncateHTML(newsItem.description || newsItem.content)}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>By {newsItem.authorName}</span>
          <span>
            {new Date(newsItem.createdAt).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

const NewsLetterPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeData, setSubscribeData] = useState({
    name: '',
    email: '',
    number: ''
  });

  const navigate = useNavigate();

  // Fetch news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await getDataHandler('getnews');
        if (response) {
          setNews(response);
        } else {
          throw new Error('Failed to fetch news');
        }
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Handle subscription form input change - use useCallback
  const handleSubscribeChange = useCallback((e) => {
    const { name, value } = e.target;
    setSubscribeData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Handle subscription form submission - use useCallback
  const handleSubscribe = useCallback(async (e) => {
    e.preventDefault();
    
    if (!subscribeData.email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(subscribeData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setSubscribeLoading(true);
      const response = await postDataHandler('subscriber', subscribeData);
      
      if (response) {
        if(response.message){
        toast.success(response.message);
        }else{
        toast.success('Successfully subscribed to our newsletter!');
        }
        setSubscribeData({ name: '', email: '', number: '' });
        setShowSubscribeForm(false);

      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setSubscribeLoading(false);
    }
  }, [subscribeData]);

  // Handle news click - use useCallback
  const handleNewsClick = useCallback((newsItem) => {
    navigate(`/newsletter/${newsItem.slug}`, { state: { news: newsItem } });
  }, [navigate]);

  // Handle modal close - use useCallback
  const handleCloseModal = useCallback(() => {
    setShowSubscribeForm(false);
    setSubscribeData({ name: '', email: '', number: '' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Helmet>
        <title>News & Updates | Upskillab - Stay Informed</title>
        <meta name="description" content="Stay updated with the latest news, articles, and updates from Upskillab. Subscribe to our newsletter for regular updates." />
        <meta name="keywords" content="news, updates, newsletter, education news, Upskillab news" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            News & <span className="text-[#FF7426]">Updates</span>
          </motion.h1>
          
          <motion.p
            className="text-lg text-white/90 max-w-3xl mx-auto mb-8"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stay informed with the latest news, insights, and updates from the world of education and technology
          </motion.p>

          <motion.button
            onClick={() => setShowSubscribeForm(true)}
            className="bg-white text-[#4D2C5E] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            📧 Subscribe to Newsletter
          </motion.button>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#4D2C5E] text-white px-6 py-3 rounded-lg hover:bg-[#5a3a6e] transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No news available at the moment.</div>
            <button 
              onClick={() => setShowSubscribeForm(true)}
              className="bg-[#FF7426] text-white px-6 py-3 rounded-lg hover:bg-[#FF8C42] transition-colors"
            >
              Subscribe for Updates
            </button>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {news.map((newsItem) => (
              <NewsCard 
                key={newsItem._id} 
                newsItem={newsItem} 
                onNewsClick={handleNewsClick}
              />
            ))}
          </motion.div>
        )}
      </main>

      {/* Subscription CTA Section */}
      <section className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
          <p className="text-gray-300 mb-6">
            Subscribe to our newsletter and be the first to know about new courses, events, and educational insights.
          </p>
          <button
            onClick={() => setShowSubscribeForm(true)}
            className="bg-[#FF7426] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#FF8C42] transition-all"
          >
            Subscribe Now
          </button>
        </div>
      </section>

      {/* Subscription Form Modal */}
      <SubscribeForm
        showForm={showSubscribeForm}
        subscribeData={subscribeData}
        subscribeLoading={subscribeLoading}
        onInputChange={handleSubscribeChange}
        onSubmit={handleSubscribe}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default NewsLetterPage;