import { useRef } from 'react';

const CategoryCard = ({ imageSrc, categoryName }) => (
  <div className="flex-shrink-0 w-[180px] sm:w-[220px] md:w-[240px] lg:w-[280px] bg-[#f3f4f8] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer p-10 mx-2">
    <div className="relative aspect-square">
      <img
        src={imageSrc}
        alt={categoryName}
        className="absolute w-full h-full transition-transform duration-500 hover:scale-110"
      />
    </div>
    <div className="text-center mt-3">
      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
        {categoryName}
      </h3>
    </div>
  </div>
);

const ScrollableCategories = () => {
  const scrollContainerRef = useRef(null);
  const categories = [
    { imageSrc: "/images/Design.png", categoryName: "Design" },
    { imageSrc: "/images/Development.png", categoryName: "Development" },
    { imageSrc: "/images/Marketing.png", categoryName: "Marketing" },
    { imageSrc: "/images/business.png", categoryName: "Business" },
    { imageSrc: "/images/business.png", categoryName: "Business" },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='bg-white relative'>
      {/* Background elements with lower z-index */}
      <div className='w-100 h-[80%] absolute top-20 left-[-250px] blur-lg rounded-full bg-[#FF74261A] z-0'></div>
      <img 
        src="/images/PlanetIconImage.png" 
        alt="Planet Icon" 
        className="absolute top-4 right-4 h-8 lg:h-12 z-10" 
      />

      <div className="relative bg-gradient-to-b from-[#f2f0ff] to-white py-16 lg:py-12 px-8 z-20">
        <div className="container mx-auto max-w-7xl">
          <div className="relative">
            <h2 className="text-2xl lg:text-4xl font-semibold text-center mb-10">
              Explore Our World's Best Courses
            </h2>
          </div>

          {/* Scrollable Section with proper z-index */}
          <div className="relative px-2 sm:px-8 py-6 z-30">
            {/* Left Scroll Button - now clickable */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-[#4d2c5e] text-white cursor-pointer p-2 rounded-full shadow-md hover:bg-[#3b2646] transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Scrollable Cards Container */}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide space-x-4 py-2 px-2 gap-6"
            >
              {categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  imageSrc={category.imageSrc}
                  categoryName={category.categoryName}
                />
              ))}
            </div>

            {/* Right Scroll Button */}
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-[#4d2c5e] text-white p-2 rounded-full shadow-md hover:bg-[#3b2646] transition-all cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollableCategories;