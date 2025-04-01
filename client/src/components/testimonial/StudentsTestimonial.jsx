import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { motion } from 'framer-motion';

const TestimonialCard = ({ 
  imageUrl, 
  name, 
  message, 
  companyLogoUrl,
  isActive
}) => {
  return (
    <motion.div 
      className={`max-w-[300px] cursor-pointer mx-auto rounded-xl overflow-hidden h-full flex flex-col relative ${isActive ? 'scale-105' : 'scale-95'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        background: isActive ? 'linear-gradient(145deg, #4D2C5E, #3a2252)' : 'linear-gradient(145deg, #4D2C5E, #2e1a3e)'
      }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        transition: { 
          duration: 0.3,
          ease: "easeOut"
        }
      }}
    >
      {/* Glow effect for active card */}
      {isActive && (
        <motion.div 
          className="absolute inset-0 rounded-xl shadow-lg"
          style={{
            boxShadow: '0 0 20px rgba(255, 116, 38, 0.7)',
            zIndex: -1
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      
      {/* Hover overlay effect */}
      <motion.div
        className="absolute inset-0 bg-[#FF7426] opacity-0 rounded-xl"
        whileHover={{
          opacity: 0.1,
          transition: { duration: 0.3 }
        }}
      />
      
      <div className="p-6 pb-2 flex-grow flex flex-col">
        <div className="p-1 rounded-lg h-full flex flex-col">
          {/* Profile Image with animated border */}
          <motion.div 
            className="flex justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <motion.div 
                className={`absolute inset-0 rounded-full border-4 ${isActive ? 'border-[#FF7426]' : 'border-[#4D2C5E]'}`}
                style={{ animationDuration: '3s' }}
                whileHover={{
                  borderColor: "#FF7426",
                  transition: { duration: 0.2 }
                }}
              />
              <motion.img 
                className="relative w-32 h-32 rounded-full object-cover z-10"
                src={imageUrl}
                alt={name}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h3 
              className="text-xl font-bold text-white"
              whileHover={{ 
                color: "#FF7426",
                transition: { duration: 0.2 }
              }}
            >
              {name}
            </motion.h3>
            <motion.p 
              className="text-lg text-[#FF7426] font-medium mt-1"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              Congratulations!
            </motion.p>
          </motion.div>

          {/* Message */}
          <motion.div 
            className="mt-4 flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.p 
              className="text-sm text-gray-200 text-center px-2"
              whileHover={{ 
                color: "#ffffff",
                transition: { duration: 0.2 }
              }}
            >
              "{message}"
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Company Logo - Animated */}
      <motion.div 
        className="p-4 border-t border-[#4D2C5E]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex justify-center">
          <motion.img 
            src={companyLogoUrl} 
            alt="Company logo" 
            className="h-10 object-contain"
            whileHover={{ 
              scale: 1.2,
              transition: { 
                type: "spring",
                stiffness: 500
              }
            }}
          />
        </div>
      </motion.div>
    </motion.div>

  );
};

const StudentTestimonials = () => {
  const [activeItem, setActiveItem] = useState(0);
  
  const responsive = {
    xxl: { breakpoint: { max: 4000, min: 1920 }, items: 4 },
    xl: { breakpoint: { max: 1920, min: 1536 }, items: 3 },
    lg: { breakpoint: { max: 1536, min: 1280 }, items: 3 },
    md: { breakpoint: { max: 1280, min: 1024 }, items: 2 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    sm: { breakpoint: { max: 768, min: 640 }, items: 1 },
    xs: { breakpoint: { max: 640, min: 0 }, items: 1 }
  };

  const testimonials = [
    {
      id: 1,
      imageUrl: "./images/Rectangle 33.png",
      name: "John Doe",
      message: "I'm incredibly grateful for the opportunity to work with such an amazing team. The support and guidance I received were instrumental in my success.",
      companyLogoUrl: "./images/company4.svg"
    },
    {
      id: 2,
      imageUrl: "./images/Rectangle 33.png",
      name: "Jane Smith",
      message: "This program transformed my career. The practical knowledge I gained helped me secure my dream job in just 3 months!",
      companyLogoUrl: "./images/company5.svg"
    },
    {
      id: 3,
      imageUrl: "./images/Rectangle 33.png",
      name: "Robert Johnson",
      message: "The mentorship and hands-on projects gave me the confidence to excel in my field. Highly recommend to anyone looking to upskill.",
      companyLogoUrl: "./images/company6.svg"
    },
    {
      id: 4,
      imageUrl: "./images/Rectangle 33.png",
      name: "Sarah Williams",
      message: "The curriculum was perfectly structured with real-world applications. I went from beginner to job-ready in record time.",
      companyLogoUrl: "./images/company7.svg"
    },
    {
      id: 5,
      imageUrl: "./images/Rectangle 33.png",
      name: "Michael Brown",
      message: "Exceptional learning experience with industry-relevant projects that helped me build a strong portfolio.",
      companyLogoUrl: "./images/company8.svg"
    },
    {
      id: 6,
      imageUrl: "./images/Rectangle 33.png",
      name: "Emily Davis",
      message: "The career support team was phenomenal. They helped me negotiate a 30% higher salary than I expected!",
      companyLogoUrl: "./images/company9.svg"
    }
  ];

  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="absolute top-1/2 w-full flex justify-between px-4 transform -translate-y-1/2 z-10">
        <motion.button
          onClick={() => previous()}
          className="bg-[#4D2C5E] p-2 rounded-full shadow-lg"
          whileHover={{ scale: 1.1, backgroundColor: "#FF7426" }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        <motion.button
          onClick={() => next()}
          className="bg-[#4D2C5E] p-2 rounded-full shadow-lg"
          whileHover={{ scale: 1.1, backgroundColor: "#FF7426" }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    );
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #F9F5FF 0%, #F0E6FF 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl lg:text-5xl font-bold text-center mb-16 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="relative z-10">
            Our <span className="text-[#FF7426]">Top</span> Success <span className="text-[#4D2C5E]">Stories</span>
          </span>
          <motion.div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-[#FF7426]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.h2>
        
        <div className="relative">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="carousel-container pb-12"
            removeArrowOnDeviceType={["xs"]}
            itemClass="px-2"
            sliderClass="gap-x-2"
            beforeChange={(nextSlide) => setActiveItem(nextSlide)}
            customButtonGroup={<ButtonGroup />}
            arrows={false}
            renderButtonGroupOutside={true}
          >
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="h-full py-4">
                <TestimonialCard
                  imageUrl={testimonial.imageUrl}
                  name={testimonial.name}
                  message={testimonial.message}
                  companyLogoUrl={testimonial.companyLogoUrl}
                  isActive={activeItem === index}
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