import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const EducationBanner = () => {
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // Allows re-triggering on scroll
    threshold: 0.3, // Triggers when 30% of the banner is visible
  });

  // Animate when in/out of view
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
        staggerChildren: 0.3, // Staggers child animations
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

  return (
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
            Training & <span className="text-[#FF7426]">Internship</span>
            <br />
            Programs
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
              className="bg-[#4d2c5e] w-fit text-white border-2 border-[#71567E] px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Learn More
            </motion.button>

            <motion.button
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF7426] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all cursor-pointer w-fit"
            >
              Book an Appointment
            </motion.button>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          variants={imageVariants}
          className="w-full md:w-1/2 lg:w-2/5"
        >
          <img
            src="/images/Educationimage.png"
            alt="Education Banner"
            className="w-full h-auto rounded-xl object-cover max-h-[400px]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EducationBanner;