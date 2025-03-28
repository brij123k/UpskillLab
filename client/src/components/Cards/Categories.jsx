import { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { motion, useInView } from 'framer-motion';

// CategoryCard Component with Framer Motion
const CustomDot = ({ onClick, active }) => {
  return (
    <button
      className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${active ? 'bg-[#4d2c5e] scale-125' : 'bg-gray-300'
        }`}
      onClick={() => onClick()}
    />
  );
};
const CategoryCard = ({ imageSrc, categoryName }) => (



  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex-shrink-0 w-full bg-[#f3f4f8] rounded-xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer p-10 mx-2"
  >
    <motion.div
      className="relative aspect-square"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={imageSrc}
        alt={categoryName}
        className="absolute w-full h-full object-cover"
      />
    </motion.div>
    <div className="text-center mt-3">
      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
        {categoryName}
      </h3>
    </div>
  </motion.div>
);

const ScrollableCategories = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const categories = [
    { imageSrc: "/images/Design.png", categoryName: "Design" },
    { imageSrc: "/images/Development.png", categoryName: "Development" },
    { imageSrc: "/images/Marketing.png", categoryName: "Marketing" },
    { imageSrc: "/images/business.png", categoryName: "Business" },
    { imageSrc: "/images/business.png", categoryName: "Business" },
  ];

  // Responsive breakpoints for react-multi-carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1280, min: 768 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  // Animation variants for the heading
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className='bg-white relative' ref={ref}>
      {/* Background elements */}
      <div className='w-100 h-[80%] absolute top-20 left-[-250px] blur-lg rounded-full bg-[#FF74261A] z-0'></div>
      <img
        src="/images/PlanetIconImage.png"
        alt="Planet Icon"
        className="absolute top-4 right-4 h-8 lg:h-12 z-10"
      />

      <div className="relative bg-gradient-to-b from-[#f2f0ff] to-white py-16 lg:py-12 px-8 z-20">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5 }}
            className="text-2xl lg:text-4xl font-semibold text-center mb-10"
          >
            Explore Our World's Best Courses
          </motion.h2>

          {/* Carousel Implementation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={true}
              infinite={true}
              autoPlay={true}
              renderDotsOutside={<CustomDot />}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="transform 500ms ease-in-out"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px px-4"
            >
              {categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  imageSrc={category.imageSrc}
                  categoryName={category.categoryName}
                />
              ))}
            </Carousel>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScrollableCategories;