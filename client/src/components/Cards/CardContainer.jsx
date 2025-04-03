import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiUser, FiAward, FiBriefcase, FiArrowRight } from "react-icons/fi"
import MentorshipCard from './Mentorship';
const OrangeCard = ({ title, description, image }) => {
const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
      initial={false}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={{
        hover: { y: -8 }
      }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Floating Orange Tag */}
      <motion.div 
        className="absolute top-4 right-4 z-10"
        variants={{
          hover: { rotate: 5, scale: 1.1 }
        }}
      >
        <div className="px-3 py-1 bg-[#FF7426] text-white text-xs font-bold rounded-full shadow-md">
          FEATURED
        </div>
      </motion.div>

      {/* Image Container with Shine Effect */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          variants={{
            hover: { scale: 1.1 }
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div 
          className="absolute inset-0 bg-[#FF7426] opacity-0 mix-blend-overlay"
          animate={{ opacity: isHovered ? 0.2 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content Area */}
      <div className="p-6">
        <motion.div
          className="w-12 h-1.5 bg-[#FF7426] mb-3 rounded-full"
          variants={{
            hover: { width: 24 }
          }}
          transition={{ duration: 0.3 }}
        />
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        {/* Animated Button */}
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.button 
            className="w-full py-3 px-6 bg-[#FF7426] hover:bg-[#e6691d] text-white font-medium rounded-lg flex items-center justify-center gap-2"
            whileTap={{ scale: 0.95 }}
          >
            Learn More
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              animate={{
                x: isHovered ? [0, 4, 0] : 0
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 1.5,
                ease: 'easeInOut'
              }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Hover Border Effect */}
      <motion.div 
        className="absolute inset-0 border-2 border-[#FF7426] rounded-2xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1 : 0.95
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const CardsContainer = () => {
  const features = [
            {
              title: "Dedicated Mentorship",
              description: "Get dedicated mentorship on every step of learning...",
              icon: <FiUser />,
              image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
              modalData: {
                details: "Includes weekly 1:1 sessions, progress tracking, and Q&A support.",
                pricing: "$99/month",
                // Add more fields
              }
            },
            {
              title: "Personalized Evaluation",
              description: "Get personalized evaluation on every assignment...",
              icon: <FiAward />,
              image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
              modalData: {
                details: "Expert feedback on projects, code reviews, and career guidance.",
                pricing: "Included in program",
              }
            },
            {
              title: "360° Career Support",
              description:
                "Our Data Science PG Program offers 100 percent Placement Assurance.",
              icon: <FiBriefcase />,
              image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            },
            {
              title: "360° Career Support",
              description:
                "Our Data Science PG Program offers 100 percent Placement Assurance.",
              icon: <FiBriefcase />,
              image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {features.map((feature, index) => (
                <MentorshipCard key={index} {...feature} />
              ))}
            </motion.div>
          </div>
  );
};

export default CardsContainer;