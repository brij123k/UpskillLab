import { motion } from 'framer-motion';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useState } from 'react';

const CategoryCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const colors = ['#FF7426', '#4d2c5e']; // Our two brand colors

  const categories = [
    {
      title: 'Business',
      image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Design',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Development',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Marketing',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Photography',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Media',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2500 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 2500, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    }
  };

  const CustomDot = ({ onClick, active }) => {
    return (
      <button
        onClick={onClick}
        className={`mx-1 h-2 w-6 rounded-full transition-all duration-300 ${
          active ? 'bg-[#FF7426]' : 'bg-gray-300'
        }`}
      />
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 ">
      <h2 className="text-3xl 2xl:text-5xl font-bold text-center mb-12 text-gray-800">
        Explore <span className="text-[#FF7426]">Categories</span>
      </h2>

      <div className="relative pb-10">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="transform 300ms ease-in-out"
          containerClass="carousel-container"
          itemClass="px-2"
          showDots={true}
          customDot={<CustomDot />}
          arrows={false}
          renderDotsOutside={true}
          dotListClass="flex justify-center mt-6"
          additionalTransfrom={0}
        >
          {categories.map((category, index) => {
            // Alternate between the two colors
            const color = colors[index % colors.length];
            const secondaryColor = colors[(index + 1) % colors.length];
            
            return (
              <motion.div
                key={index}
                className="h-64 relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: index * 0.1,
                    duration: 0.5 
                  }
                }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 15px 30px ${color}40`
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 20
                }}
              >
                {/* Background Image with Gradient */}
                <div className="absolute inset-0">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t"
                    style={{
                      background: `linear-gradient(to top, ${color} 0%, ${secondaryColor}80 30%, transparent 70%)`
                    }}
                  />
                </div>

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 border-4 pointer-events-none"
                  style={{ borderColor: color }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Category Name */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4 text-center"
                  style={{ backgroundColor: color }}
                  initial={{ y: 0 }}
                  animate={{ 
                    y: hoveredIndex === index ? -10 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3 
                    className="text-xl 2xl:text-2xl font-bold text-white"
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: hoveredIndex === index ? 1.1 : 1
                    }}
                  >
                    {category.title}
                  </motion.h3>
                </motion.div>

                {/* Floating Tag */}
                <motion.div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: secondaryColor }}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ 
                    y: hoveredIndex === index ? 0 : -20,
                    opacity: hoveredIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  New
                </motion.div>
              </motion.div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;