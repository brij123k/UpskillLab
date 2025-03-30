import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const TestimonialCard = ({ 
  imageUrl, 
  name, 
  message, 
  companyLogoUrl 
}) => {
  return (
    <div className="max-w-[280px] sm:max-w-[320px] xl:max-w-[350px] 2xl:max-w-[380px] mx-auto bg-[#FDF8EE] rounded-xl shadow-md overflow-hidden h-full flex flex-col">
      <div className="p-6 pb-2 flex-grow flex flex-col">
        <div className="p-1 rounded-lg h-full flex flex-col">
          {/* Profile Image Circle */}
          <div className="flex justify-center">
            <div className="relative">
              <img 
                className="relative w-32 h-32 sm:w-36 sm:h-36 xl:w-40 xl:h-40 rounded-full object-cover"
                src={imageUrl}
                alt={name}
              />
            </div>
          </div>

          {/* Name */}
          <div className="mt-6 text-center">
            <h3 className="text-lg sm:text-xl xl:text-2xl font-bold text-gray-800">{name}</h3>
            <p className="text-base sm:text-lg xl:text-xl text-black font-medium mt-1">Congratulations!</p>
          </div>

          {/* Message */}
          <div className="mt-1 flex-grow">
            <p className="text-sm sm:text-base xl:text-lg text-gray-600 text-center px-2">
              "{message}"
            </p>
          </div>
        </div>
      </div>

      {/* Company Logo - Fixed to Bottom */}
      <div className="p-4 border-t border-[#FFEED9]">
        <div className="flex justify-center">
          <img 
            src={companyLogoUrl} 
            alt="Company logo" 
            className="h-8 sm:h-10 xl:h-12 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

const StudentTestimonials = () => {
  const responsive = {
    xxl: {
      breakpoint: { max: 4000, min: 1920 }, // 1920px and above
      items: 5,
      partialVisibilityGutter: 20
    },
    xl: {
      breakpoint: { max: 1920, min: 1536 }, // 1536px to 1920px
      items: 4,
    },
    lg: {
      breakpoint: { max: 1536, min: 1280 },
      items: 4,
    },
    md: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    sm: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
    },
    xs: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    }
  };

  const testimonials = [
    {
      id: 1,
      imageUrl: "./images/Rectangle 33.png",
      name: "John Doe",
      message: "I'm incredibly grateful for the opportunity to work with such an amazing team. The support and guidance I received were instrumental in my success.",
      companyLogoUrl: "./images/cognizant 2.png"
    },
    {
      id: 2,
      imageUrl: "./images/Rectangle 33.png",
      name: "Jane Smith",
      message: "This program transformed my career. The practical knowledge I gained helped me secure my dream job in just 3 months!",
      companyLogoUrl: "./images/cognizant 2.png"
    },
    {
      id: 3,
      imageUrl: "./images/Rectangle 33.png",
      name: "Robert Johnson",
      message: "The mentorship and hands-on projects gave me the confidence to excel in my field. Highly recommend to anyone looking to upskill.",
      companyLogoUrl: "./images/cognizant 2.png"
    },
    {
      id: 4,
      imageUrl: "./images/Rectangle 33.png",
      name: "Sarah Williams",
      message: "The curriculum was perfectly structured with real-world applications. I went from beginner to job-ready in record time.",
      companyLogoUrl: "./images/cognizant 2.png"
    },
    {
      id: 5,
      imageUrl: "./images/Rectangle 33.png",
      name: "Michael Brown",
      message: "Exceptional learning experience with industry-relevant projects that helped me build a strong portfolio.",
      companyLogoUrl: "./images/cognizant 2.png"
    },
    {
      id: 6,
      imageUrl: "./images/Rectangle 33.png",
      name: "Emily Davis",
      message: "The career support team was phenomenal. They helped me negotiate a 30% higher salary than I expected!",
      companyLogoUrl: "./images/cognizant 2.png"
    }
  ];

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 2xl:px-12">
      <div className="relative max-w-[1800px] 2xl:max-w-[2400px] mx-auto">
        <img src="./images/PlanetIconImage.png" alt="Planet Icon" className="hidden sm:block absolute top-2 right-10 h-8 lg:h-12 xl:h-14 2xl:h-16 z-10" />
        <img src="./images/Group (2).png" alt="Planet Icon" className="hidden sm:block absolute top-2 left-10 h-8 lg:h-12 lg:w-20 xl:h-14 xl:w-24 2xl:h-16 2xl:w-28 z-10" />
        
        <h2 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center text-gray-900 mb-12">
          Our Top Success Stories
        </h2>
        
        <div className="relative">
          <Carousel
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all .5s"
            transitionDuration={500}
            containerClass="carousel-container pb-12"
            removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
            showDots={true}
            dotListClass="absolute bottom-0 left-0 right-0 flex justify-center mt-8"
            itemClass="px-2 xl:px-3"
            sliderClass="gap-x-4 xl:gap-x-6"
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="h-full flex justify-center items-center">
                <TestimonialCard
                  imageUrl={testimonial.imageUrl}
                  name={testimonial.name}
                  message={testimonial.message}
                  companyLogoUrl={testimonial.companyLogoUrl}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default StudentTestimonials;


