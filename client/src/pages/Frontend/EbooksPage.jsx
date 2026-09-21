import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getDataHandler, postDataHandler } from '../../config/services';

// Move RegistrationForm component outside to prevent re-renders
const RegistrationForm = React.memo(({ 
  showForm, 
  selectedEbook, 
  formData, 
  formLoading, 
  onInputChange, 
  onSubmit, 
  onClose 
}) => (
  <AnimatePresence>
    {showForm && (
      <motion.div
  className="fixed inset-0  bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  onClick={onClose}
>
  <motion.div
    className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full mx-2 sm:mx-4 max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto hide-scrollbar"
    initial={{ scale: 0.9, opacity: 0, y: 20 }}
    animate={{ scale: 1, opacity: 1, y: 0 }}
    exit={{ scale: 0.9, opacity: 0, y: 20 }}
    onClick={(e) => e.stopPropagation()}
  >
    {/* Header */}
    <div className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl text-center sticky top-0">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white p-1 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-lg sm:text-xl font-bold text-white flex-1 text-center mx-2">
          Get Your eBook
        </h2>
        <div className="w-5 h-5"></div> {/* Spacer for balance */}
      </div>
      <p className="text-white/90 text-sm sm:text-base line-clamp-2">
        {selectedEbook?.title}
      </p>
    </div>

    {/* Form */}
    <form onSubmit={onSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent outline-none transition-all"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent outline-none transition-all"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          name="number"
          value={formData.number}
          onChange={onInputChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent outline-none transition-all"
          placeholder="Enter your phone number"
          required
        />
      </div>

      {/* Buttons - Stack on mobile, side-by-side on larger screens */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-50 transition-all order-2 sm:order-1"
          disabled={formLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#FF7426] to-[#FF8C42] text-white rounded-lg font-semibold text-sm sm:text-base hover:from-[#FF8C42] hover:to-[#FF7426] transition-all shadow-md disabled:opacity-50 order-1 sm:order-2"
          disabled={formLoading}
        >
          {formLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-white rounded-full animate-spin mr-2" />
              <span className="text-xs sm:text-sm">Processing...</span>
            </div>
          ) : (
            'Get eBook Now'
          )}
        </button>
      </div>

      {/* Privacy Note */}
      <p className="text-xs text-gray-500 text-center pt-2">
        We respect your privacy. Your information is secure with us.
      </p>
    </form>
  </motion.div>
</motion.div>
    )}
  </AnimatePresence>
));

// Move EbookCard component outside as well
const EbookCard = React.memo(({ ebook, onEbookClick }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onEbookClick(ebook)}
  >
    {/* Thumbnail */}
    <div className="relative h-1/2 overflow-hidden">
      <img
        src={ebook.thumbnail}
        alt={ebook.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#4D2C5E] transition-colors">
        {ebook.title}
      </h3>
      
      <div className="w-full ">
        {/* <span className="text-sm text-gray-500">
          {new Date(ebook.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
          })}
        </span> */}
        
        <motion.span
          className="w-full text-center bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] text-white px-6 py-2 rounded-sm text-sm font-semibold hover:from-[#5a3a6e] hover:to-[#8c5cb3] transition-all shadow-md inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Read Now
        </motion.span>
      </div>
    </div>
  </motion.div>
));

const EbooksPage = () => {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEbook, setSelectedEbook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: ''
  });

  const navigate = useNavigate();

  // Fetch eBooks
  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        setLoading(true);
        const response = await getDataHandler('ebooks');
        setEbooks(response);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load eBooks');
      } finally {
        setLoading(false);
      }
    };

    fetchEbooks();
  }, []);

  // Handle eBook click
  const handleEbookClick = useCallback((ebook) => {
    setSelectedEbook(ebook);
    setShowForm(true);
  }, []);

  // Handle form input change
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.number) {
      toast.error('Please fill all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setFormLoading(true);
      const response = await postDataHandler(`ebooksUser`, {
        ...formData,
        source: 'ebook'
      });
      
      if (response) {
        toast.success('Thank you! Redirecting to your eBook...');
        setTimeout(() => {
          navigate(`/ebooks/${selectedEbook.slug}`);
        }, 1500);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setFormLoading(false);
    }
  }, [formData, selectedEbook, navigate]);

  // Handle modal close
  const handleCloseModal = useCallback(() => {
    setShowForm(false);
    setFormData({
      name: '',
      email: '',
      number: ''
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <Helmet>
        <title>Free eBooks | Upskillab - Download Educational Resources</title>
        <meta name="description" content="Download free educational eBooks from Upskillab. Enhance your skills with our collection of expert-curated resources." />
        <meta name="keywords" content="free ebooks, educational resources, online learning, Upskillab eBooks" />
      <link rel="canonical" href="https://upskillab.com/ebooks" />
      </Helmet>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            EBo<span className="text-[#FF7426]">oks</span>
          </h1>
        </motion.div>
      </div>

      {/* eBooks Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-64 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-10 bg-gray-300 rounded w-1/3"></div>
                </div>
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
        ) : ebooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No eBooks available at the moment.</div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {ebooks.map((ebook) => (
              <EbookCard 
                key={ebook._id} 
                ebook={ebook} 
                onEbookClick={handleEbookClick}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Registration Form Modal */}
      <RegistrationForm
        showForm={showForm}
        selectedEbook={selectedEbook}
        formData={formData}
        formLoading={formLoading}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default EbooksPage;