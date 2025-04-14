import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { getDataHandler } from "../../config/services";
import React from 'react';

const EducationBanner = () => {
  const [banner, setBanner] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const handleBanners = async () => {
    const res = await getDataHandler('banner4s');
    setBanner(res.banner4s[0]);
  };

  useEffect(() => {
    handleBanners();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="w-full bg-[#FDF8EE] py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Text Content */}
          <motion.div
            variants={textVariants}
            className="w-full md:w-1/2 lg:w-3/5 space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              {banner?.title ? (
                <>
                  {banner.title.split(' ').map((word, index) => (
                    <React.Fragment key={index}>
                      {index === 1 ? (
                        <span className="text-[#FF7426]">{word}</span>
                      ) : (
                        word
                      )}
                      {' '}
                      {index === 0 && <br />}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>
                  Training & <span className="text-[#FF7426]">Internship</span>
                  <br />
                  Programs
                </>
              )}
            </h2>
            <p className="text-lg text-gray-600">
              Learn the latest skills quickly with a personalised curriculum
              created to meet your needs.
            </p>
            <div className="flex flex-col gap-4">
              <motion.button
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-[#4d2c5e] w-fit text-white border-2 border-[#71567E] px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Learn More
              </motion.button>
              <a href="#AdmissionForm">
                <motion.button
                  variants={buttonVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FF7426] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all cursor-pointer w-fit"
                >
                  Book an Appointment
                </motion.button>
              </a>
            </div>
          </motion.div>
          {/* Image Section */}
          <motion.div
            variants={imageVariants}
            className="w-full md:w-1/2 lg:w-2/5"
          >
            <img
              src={banner?.imageUrl}
              alt={banner?.title}
              className="w-full h-auto rounded-xl object-cover max-h-[400px]"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
       <motion.div
       className="fixed inset-0 z-50 flex items-center justify-center bg-[#fdf8ee77]" // Solid background
       variants={backdropVariants}
       initial="hidden"
       animate="visible"
       exit="exit"
       onClick={() => setIsModalOpen(false)}
     >
       <motion.div
         className="
           bg-[#FDF8EE] 
           rounded-2xl 
           w-full 
           max-w-[90%] 
           sm:max-w-2xl 
           md:max-w-3xl 
           mx-4 
           relative 
           shadow-2xl 
           max-h-[90vh] 
           flex 
           flex-col
         " // Responsive width and max height
         variants={modalVariants}
         initial="hidden"
         animate="visible"
         exit="exit"
         onClick={(e) => e.stopPropagation()}
       >
         {/* Close Button */}
         <button
           className="
             absolute 
             top-4 
             right-4 
             sm:top-6 
             sm:right-6 
             text-gray-600 
             hover:text-gray-900 
             transition-colors
           "
           onClick={() => setIsModalOpen(false)}
         >
           <svg
             className="w-6 h-6 sm:w-8 sm:h-8" // Responsive icon size
             fill="none"
             stroke="currentColor"
             viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="2"
               d="M6 18L18 6M6 6l12 12"
             />
           </svg>
         </button>
     
         {/* Scrollable Content */}
         <div
           className="
             p-6 
             sm:p-8 
             md:p-12 
             overflow-y-auto 
             max-h-[80vh] 
             flex-1
           " // Responsive padding and scrollable
         >
           <h3
             className="
               text-2xl 
               sm:text-3xl 
               font-bold 
               text-gray-900 
               mb-4 
               sm:mb-6
             " // Responsive font and margin
           >
             Discover Our Training Programs
           </h3>
           <p
             className="
               text-base 
               sm:text-md
               lg:text-lg 
               text-gray-600 
               mb-6 
               sm:mb-8
             " // Responsive font and margin
           >
             Jumpstart your career with UpskillLab’s Training & Internship Program – a
             hands-on, project-based learning initiative.
           </p>
           <div className="space-y-6">
             <div>
               <h4
                 className="
                   font-semibold 
                   text-lg 
                   sm:text-xl 
                   text-[#4D2C5E] 
                   mb-3 
                   sm:mb-4
                 " // Responsive font and margin
               >
                 You’ll gain:
               </h4>
               <ul
                 className="
                   list-disc 
                   list-inside 
                   text-base 
                   sm:text-md
                   lg:text-lg 
                   text-gray-600 
                   space-y-2
                 " // Responsive font
               >
                 <li>Practical exposure to AI, Data Science, Cloud Computing, and more</li>
                 <li>Real-world projects designed to reflect actual industry challenges</li>
                 <li>Verified skills and credentials recognized by employers</li>
               </ul>
             </div>
     
             <div>
               <h4
                 className="
                   font-semibold 
                   text-lg 
                   sm:text-xl 
                   text-[#4D2C5E] 
                   mb-3 
                   sm:mb-4
                 " // Responsive font and margin
               >
                 This program is ideal for:
               </h4>
               <ul
                 className="
                   list-disc 
                   list-inside 
                   text-base 
                   sm:text-md
                   lg:text-lg 
                   text-gray-600 
                   space-y-2
                 " // Responsive font
               >
                 <li>Students preparing for job roles</li>
                 <li>Professionals looking to reskill or switch careers</li>
               </ul>
             </div>
     
             <div>
               <p
                 className="
                   font-semibold 
                   text-sm 
                   sm:text-md 
                   text-[#4D2C5E] 
                   mb-3 
                   sm:mb-4
                 " // Responsive font and margin
               >
                 We bridge the gap between academic knowledge and workforce readiness
                 through our skill-reskill-upskill model.
               </p>
             </div>
           </div>
         </div>
     
         {/* Decorative Element */}
         <div
           className="
             absolute 
             -top-3 
             -left-3 
             w-12 
             h-12 
             sm:-top-4 
             sm:-left-4 
             sm:w-16 
             sm:h-16 
             rounded-full 
             bg-[#FF7426] 
             opacity-20 
             blur-md
           " // Responsive size and position
         />
       </motion.div>
     </motion.div>
      )}
    </>
  );
};

export default EducationBanner;