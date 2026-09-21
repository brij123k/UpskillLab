import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Modal, Tag, Button, Image } from 'antd';
import { LeftOutlined, RightOutlined, EyeOutlined, LinkOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import BlogContentRenderer from '../../components/BlogContentRenderer';
import { getDataHandler } from '../../config/services';

const NewsEventsCarousel = () => {
  const [newsEvents, setNewsEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(320);
  const [currentOffset, setCurrentOffset] = useState(0);

  // Fetch news events
  useEffect(() => {
    const fetchNewsEvents = async () => {
      try {
        setLoading(true);
        const response = await getDataHandler('getAllNewsEvent');
        setNewsEvents(response.data);
      } catch (error) {
        console.error('Error fetching news events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsEvents();
  }, []);

  // Calculate card width based on screen size
  useEffect(() => {
    const updateCardWidth = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardWidth(280);
      } else if (width < 1024) {
        setCardWidth(300);
      } else {
        setCardWidth(320);
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  // Handle infinite scroll animation
  useEffect(() => {
    if (newsEvents.length === 0 || loading) return;

    const totalWidth = newsEvents.length * (cardWidth + 24);

    const animate = () => {
      if (!isPaused && carouselRef.current) {
        setCurrentOffset((prevOffset) => {
          const newOffset = prevOffset - 0.5;
          // Reset when reaching the end
          if (Math.abs(newOffset) >= totalWidth) {
            return 0;
          }
          return newOffset;
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [newsEvents, isPaused, cardWidth, loading]);

  // Handle view more click
  const handleViewMore = (item) => {
    setSelectedItem(item);
    if (item.readMoreType === 'content') {
      setViewModalOpen(true);
    } else if (item.readMoreType === 'link' && item.readMoreLink) {
      window.open(item.readMoreLink, '_blank');
    }
  };

  // Duplicate items for seamless infinite scroll
  const duplicatedItems = newsEvents.length > 0 ? [...newsEvents, ...newsEvents, ...newsEvents] : [];

  // Skeleton loading cards
  const SkeletonCard = () => (
    <div className="flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="h-10 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (newsEvents.length === 0) {
    return (
      <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 py-8 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

          <div className="flex gap-2 justify-between items-center mb-6">
            <Button 
              icon={<LeftOutlined />}
              onClick={() => {
                const totalWidth = newsEvents.length * (cardWidth + 24);
                setCurrentOffset(prev => Math.min(prev + cardWidth + 24, 0));
              }}
              className="border-[#4D2C5E] text-[#4D2C5E] hover:bg-[#4D2C5E] hover:text-white"
            />
            <Button 
              icon={<RightOutlined />}
              onClick={() => {
                const totalWidth = newsEvents.length * (cardWidth + 24);
                setCurrentOffset(prev => Math.max(prev - cardWidth - 24, -totalWidth));
              }}
              className="border-[#4D2C5E] text-[#4D2C5E] hover:bg-[#4D2C5E] hover:text-white"
            />
          </div>


        {/* Carousel */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            ref={carouselRef}
            className="flex gap-6"
            style={{
              transform: `translateX(${currentOffset}px)`,
              transition: 'transform 0.05s linear',
              width: 'max-content'
            }}
          >
            {duplicatedItems.map((item, index) => (
              <motion.div
                key={`${item._id}-${index}`}
                className="flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.topic}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#4D2C5E] to-[#7B4B9E] flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#4D2C5E] transition-colors">
                    {item.topic}
                  </h3>
                  
                  <div className="flex justify-between items-center mt-3">
                    
                    <motion.button
                      onClick={() => handleViewMore(item)}
                      className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-[#5a3a6e] hover:to-[#8c5cb3] transition-all shadow-md flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <EyeOutlined className="text-xs" />
                      View More
                    </motion.button>
                    {/* Date Badge */}
                  <div className=" bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                    {item.date ? dayjs(item.date).format('DD MMM YYYY') : '-'}
                  </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View Content Modal */}
        <Modal
          title={selectedItem?.topic || 'Content Details'}
          open={viewModalOpen}
          onCancel={() => setViewModalOpen(false)}
          footer={null}
          width={900}
          className="news-event-modal"
        >
          {selectedItem && (
            <div className="space-y-6">
              {selectedItem.image && (
                <div className="flex justify-center mb-4">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.topic}
                    className="rounded-lg max-h-80 object-contain"
                  />
                </div>
              )}

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
            
                </div>
                <div className="text-gray-500">
                  {selectedItem.date ? dayjs(selectedItem.date).format('DD MMM YYYY') : '-'}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Topic</h3>
                <p className="text-gray-700 text-lg">{selectedItem.topic}</p>
              </div>

              {selectedItem.readMoreType === 'content' && selectedItem.readMoreContent && (
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-2">Content</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <BlogContentRenderer content={selectedItem.readMoreContent} />
                  </div>
                </div>
              )}

              {selectedItem.readMoreType === 'link' && selectedItem.readMoreLink && (
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-2">Read More Link</h3>
                  <Button 
                    type="primary"
                    icon={<LinkOutlined />}
                    onClick={() => window.open(selectedItem.readMoreLink, '_blank')}
                    className="bg-[#4D2C5E] hover:bg-[#3a1f47]"
                  >
                    Visit Link
                  </Button>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default NewsEventsCarousel;