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
const FeaturedNewsCard = ({ newsItem, onNewsClick }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onClick={() => onNewsClick(newsItem)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={newsItem.image || "/images/news-placeholder.jpg"} 
          alt={newsItem.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-[#FF7426] text-white px-3 py-1 rounded-full text-sm font-semibold">
          Featured
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <span>{new Date(newsItem.createdAt).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{newsItem.category || "General"}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {newsItem.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {newsItem.summary || newsItem.content?.substring(0, 150)}...
        </p>
        
        <button className="text-[#4D2C5E] font-semibold hover:text-[#FF7426] transition-colors flex items-center">
          Read Full Newsletter
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};
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
    <title>Upskillab Learning Newsletter - Technology, Psychology, Management & Professional Growth</title>
    <meta name="description" content="Subscribe to Upskillab's free newsletter for insights in technology, psychology, management, and professional development. Learn, grow, and stay ahead." />
    <meta name="keywords" content="newsletter, technology, psychology, management, professional growth, Upskillab, learning insights" />
  </Helmet>

  {/* Hero Section */}
 <section className="relative bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] py-12 sm:py-16 lg:py-20 xl:py-24 px-4 xs:px-6 sm:px-8 lg:px-12">
  <div className="max-w-4xl sm:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto text-center">
    {/* Main Heading - Fully Responsive */}
    <motion.h1
      className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-7xl font-bold text-white mb-4 sm:mb-5 lg:mb-6 xl:mb-7 leading-tight sm:leading-snug lg:leading-normal"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Upskillab Learning{" "}
      <span className="text-[#FF7426] block sm:inline-block mt-1 sm:mt-0">
        Newsletter
      </span>
    </motion.h1>
    
    {/* Tagline - Responsive */}
    <motion.p
      className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl text-white/90 max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto mb-4 sm:mb-5 lg:mb-6 xl:mb-7 leading-relaxed sm:leading-loose"
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      Technology, Psychology, Management & Professional Growth
    </motion.p>

    {/* Description - Responsive */}
    <motion.p
      className="text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl text-white/80 max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-7 lg:mb-8 xl:mb-9 leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      Subscribe to Upskillab's free newsletter for insights in technology, psychology, management, and professional development. Learn, grow, and stay ahead.
    </motion.p>

    {/* CTA Button - Fully Responsive */}
    <motion.button
      onClick={() => setShowSubscribeForm(true)}
      className="bg-[#FF7426] text-white px-6 py-3 xs:px-8 xs:py-3 sm:px-9 sm:py-3 md:px-10 md:py-4 lg:px-12 lg:py-4 xl:px-14 xl:py-5 rounded-full font-semibold hover:bg-[#FF8C42] transition-all shadow-2xl hover:shadow-3xl text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl whitespace-nowrap"
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0 25px 50px rgba(255, 116, 38, 0.4)" 
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <span className="flex items-center justify-center">
        <span className="mr-2 text-base sm:text-lg md:text-xl">📧</span>
        Subscribe to Newsletter
      </span>
    </motion.button>

    {/* Optional: Additional responsive elements */}
    {/* <motion.div 
      className="mt-6 sm:mt-8 lg:mt-10 flex justify-center space-x-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="flex items-center text-white/70 text-xs sm:text-sm">
        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
        Join 10,000+ subscribers
      </div>
      <div className="flex items-center text-white/70 text-xs sm:text-sm">
        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
        Free forever
      </div>
    </motion.div> */}
  </div>

  {/* Background Decoration - Responsive */}
  <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 lg:h-16 bg-gradient-to-t from-gray-50/10 to-transparent"></div>
</section>

  {/* Highlighted Insights Section */}
  <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    {/* <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Highlighted Insights
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Discover Upskillab's latest featured Newsletter - an in-depth resource packed with expert insights, practical strategies, and real-world examples.
      </p>
    </div> */}

    {loading ? (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-xl p-8 animate-pulse">
            <div className="h-64 bg-gray-300 rounded-xl mb-6"></div>
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    ) : news.length > 0 ? (
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
    ) : (
      <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
        <div className="text-6xl mb-4">📰</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Featured Insights Coming Soon</h3>
        <p className="text-gray-600 mb-6">Stay tuned for our latest featured newsletters packed with expert insights.</p>
        <button 
          onClick={() => setShowSubscribeForm(true)}
          className="bg-[#4D2C5E] text-white px-8 py-3 rounded-lg hover:bg-[#5a3a6e] transition-colors"
        >
          Get Notified
        </button>
      </div>
    )}
  </section>

  {/* Why Subscribe Section */}
  <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Why Subscribe to the Upskillab Newsletter?
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Join thousands of learners who trust Upskillab to fuel their growth. Subscribe now and get the tools, insights, and knowledge to build your future — one email at a time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: "💡",
            title: "Expert Insights",
            description: "Stay updated with the latest trends in Technology, Management, Psychology, and Professional Growth."
          },
          {
            icon: "🚀",
            title: "Actionable Tips",
            description: "Practical strategies you can apply immediately to level up your skills."
          },
          {
            icon: "📚",
            title: "Exclusive Resources",
            description: "Free guides, templates, checklists, and learning materials."
          },
          {
            icon: "⏰",
            title: "Early Access & Updates",
            description: "Be the first to know about new courses, workshops, and events."
          }
        ].map((benefit, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg border border-gray-100"
            whileHover={{ y: -5, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-4xl mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
            <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>

  {/* Testimonials Section */}
  {/* <section className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        See What Our Subscribers Are Saying
      </h2>
      <p className="text-lg text-white/80 mb-12">
        Real stories from our learners — hear how Upskillab's newsletter has helped them grow, stay informed, and level up their skills.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            name: "Priya Sharma",
            role: "Software Developer",
            testimonial: "The insights on technology trends have been invaluable for my career growth. Every newsletter is packed with actionable advice!",
            avatar: "👩‍💻"
          },
          {
            name: "Rahul Verma",
            role: "Project Manager",
            testimonial: "The management psychology sections have transformed how I lead my team. Highly recommended for professionals!",
            avatar: "👨‍💼"
          },
          {
            name: "Anita Patel",
            role: "HR Professional",
            testimonial: "The professional growth tips helped me advance in my career. The newsletter is like having a personal mentor.",
            avatar: "👩‍🎓"
          }
        ].map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="text-4xl mb-4">{testimonial.avatar}</div>
            <p className="text-white/90 italic mb-4">"{testimonial.testimonial}"</p>
            <div>
              <div className="text-white font-semibold">{testimonial.name}</div>
              <div className="text-white/70 text-sm">{testimonial.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section> */}
  {/* Final CTA Section */}
  <section className="bg-gradient-to-r from-[#FF7426] to-[#FF8C42] py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Ready to Level Up Your Skills?
      </h2>
      <p className="text-white/90 text-lg mb-8">
        Join thousands of professionals who are already growing with Upskillab's newsletter
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setShowSubscribeForm(true)}
          className="bg-white text-[#FF7426] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-2xl text-lg"
        >
          Subscribe Now
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all"
        >
          Browse All Newsletters
        </button>
      </div>
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