import React,{useState,useEffect} from 'react';
import { motion } from 'framer-motion';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getDataHandler } from '../../config/services';
import { 
  FiBriefcase, 
  FiPenTool, 
  FiCode, 
  FiBarChart2, 
  FiCamera, 
  FiMic, 
  FiMusic, 
  FiFilm 
} from 'react-icons/fi';

const CategoryCarousel = () => {
const colorPalette = ['#FF7426', '#4D2C5E'];
const [categories, setCategories] = useState([]);
const handelCategories = async () => {
  const res=await getDataHandler('category');
  if(res){
    const newCategories = res.data.map((category,index) => ({
      id: index+1,
      title: category.categoryName,
      image: category.categoryImage,
      color: colorPalette[index % colorPalette.length],
  }))
  setCategories(newCategories);
}
}

useEffect(() => {
  handelCategories();
},[]);

// const categories = [
  //   {
  //     title: 'Business',
  //     icon: <FiBriefcase size={32} />,
  //     image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  //     color: '#4d2c5e'
  //   },
  //   {
  //     title: 'Design',
  //     icon: <FiPenTool size={32} />,
  //     image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  //     color: '#FF7426'
  //   },
  //   {
  //     title: 'Development',
  //     icon: <FiCode size={32} />,
  //     image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  //     color: '#4d2c5e'
  //   },
  //   {
  //     title: 'Marketing',
  //     icon: <FiBarChart2 size={32} />,
  //     image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  //     color: '#FF7426'
  //   },
  //   {
  //     title: 'Photography',
  //     icon: <FiCamera size={32} />,
  //     image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  //     color: '#4d2c5e'
  //   },
  //   {
  //     title: 'Media',
  //     icon: <FiMic size={32} />,
  //     image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  //     color: '#FF7426'
  //   },
  //   {
  //     title: 'Music',
  //     icon: <FiMusic size={32} />,
  //     image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  //     color: '#4d2c5e'
  //   },
  //   {
  //     title: 'Film',
  //     icon: <FiFilm size={32} />,
  //     image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  //     color: '#FF7426'
  //   }
  // ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 20
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 10
    }
  };

  const CustomDot = ({ onClick, active }) => (
    <button
      onClick={() => onClick()}
      className={`mx-1 w-3 h-3 rounded-full transition-all duration-200 ${
        active ? 'bg-[#FF7426] w-4' : 'bg-gray-300'
      }`}
      style={{ margin: '0 3px' }} // Tighter dot spacing
    />
  );

  return (
    <div className="relative max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Explore <span className="text-[#FF7426]">Categories</span>
      </h2>

      <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="transform 500ms ease-in-out"
          containerClass="carousel-container"
          itemClass="carousel-item-padding-10-px" // Custom class for tighter padding
          showDots={true}
          customDot={<CustomDot />}
          arrows={false}
          renderDotsOutside={true}
          additionalTransfrom={0} // Prevents extra transform
          ssr={true}
        >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="h-[300px] mx-2 relative rounded-2xl overflow-hidden shadow-xl"
            style={{ 
              borderBottom: `5px solid ${category.color}`,
              boxShadow: `0 10px 20px ${category.color}20`
            }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/images/fallback.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-end pb-8 px-6 text-center">
              <motion.div 
                className="mb-6 p-4 rounded-full"
                style={{ 
                  backgroundColor: `${category.color}40`,
                  backdropFilter: 'blur(5px)'
                }}
                whileHover={{
                  rotate: 10,
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="text-white">
                  {category.icon}
                </div>
              </motion.div>

              <h3 
                className="text-2xl font-bold text-white mb-4"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
              >
                {category.title}
              </h3>

              <motion.div 
                className="w-16 h-1 rounded-full"
                style={{ backgroundColor: category.color }}
                whileHover={{
                  scaleX: 1.5,
                  transition: { duration: 0.3 }
                }}
              />
            </div>
          </motion.div>
        ))}
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;