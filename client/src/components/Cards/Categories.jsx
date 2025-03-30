import { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { motion, useInView } from 'framer-motion';

// Custom Dot Component
const CustomDot = ({ onClick, active }) => {
  return (
    <button
      className={`w-3 h-3 rounded-full mx-1.5 transition-all duration-300 ${
        active ? 'bg-[#4d2c5e] scale-125' : 'bg-gray-300'
      }`}
      onClick={() => onClick()}
      aria-label={`Go to slide ${active ? 'current' : ''}`}
    />
  );
};

// CategoryCard Component with responsive sizing
const CategoryCard = ({ imageSrc, categoryName }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex-shrink-0 w-full bg-[#f3f4f8] rounded-xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 2xl:p-16 mx-1 sm:mx-2"
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
        loading="lazy"
      />
    </motion.div>
    <div className="text-center mt-3 sm:mt-4 md:mt-5">
      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800 truncate">
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

  // Enhanced responsive breakpoints with XXL support
  const responsive = {
    xxl: {
      breakpoint: { max: 4000, min: 1920 },
      items: 5,
      partialVisibilityGutter: 60
    },
    xl: {
      breakpoint: { max: 1920, min: 1536 },
      items: 4,
      partialVisibilityGutter: 50
    },
    lg: {
      breakpoint: { max: 1536, min: 1280 },
      items: 4,
      partialVisibilityGutter: 40
    },
    md: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
      partialVisibilityGutter: 30
    },
    sm: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      partialVisibilityGutter: 20
    },
    xs: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
      partialVisibilityGutter: 15
    },
    xxs: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      partialVisibilityGutter: 10
    }
  };

  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className='bg-white relative' ref={ref}>
      {/* Background elements */}
      <div className='hidden lg:block w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] 2xl:w-[600px] 2xl:h-[600px] absolute top-20 left-[-150px] xl:left-[-100px] 2xl:left-[-50px] blur-lg rounded-full bg-[#FF74261A] z-0'></div>
      <img
        src="/images/PlanetIconImage.png"
        alt="Planet Icon"
        className="hidden sm:block absolute top-4 right-4 h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 2xl:h-24 z-10"
      />

      <div className="relative bg-gradient-to-b from-[#f2f0ff] to-white py-12 sm:py-16 lg:py-20 xl:py-24 2xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 z-20">
        <div className="container mx-auto max-w-8xl">
          <motion.h2
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5 }}
            className="text-2xl lg:text-4xl 2xl:text-5xl font-semibold text-center mb-10 sm:mb-12 lg:mb-16 xl:mb-20"
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
              customDot={<CustomDot />}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="transform 500ms ease-in-out"
              transitionDuration={500}
              containerClass="carousel-container pb-10"
              removeArrowOnDeviceType={["xxs", "xs", "sm", "md", "lg", "xl", "xxl"]}
              dotListClass="custom-dot-list-style mt-6 sm:mt-8 lg:mt-10 absolute bottom-0 left-0 right-0 flex justify-center mt-4"
              itemClass="px-3 sm:px-4 lg:px-5"
              sliderClass="gap-x-6 sm:gap-x-8 lg:gap-x-10"
              centerMode={false}
              additionalTransfrom={0}
            >
              {categories.map((category, index) => (
                <div key={index} className="h-full">
                  <CategoryCard
                    imageSrc={category.imageSrc}
                    categoryName={category.categoryName}
                  />
                </div>
              ))}
            </Carousel>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScrollableCategories;