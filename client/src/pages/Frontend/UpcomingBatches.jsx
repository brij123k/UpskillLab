import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BatchCard from '../../components/Cards/BatchCard';
import TrainingBanner from '../../components/banners/TrainingBanner';
import FeedbaackBanner from '../../components/banners/FeedbackBanner';
import { Btches } from '../../data';
import Modal from '../../components/Modal/CommonModal';
import BatchEnrollmentModal from '../../components/Modal/BatchEnrollmentModal';

const BatchDetailsModal = ({ batch, onClose }) => {
    return (
      <Modal isOpen={true} onClose={onClose} title={`Batch Details: ${batch.title}`}>
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-[#4D2C5E] text-white p-4 rounded-lg">
            <div className="flex justify-between mt-2">
              <span>Batch ID: {batch.batchId}</span>
              <span className="font-bold">₹{batch.price}</span>
            </div>
          </div>
  
          {/* Key Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#FFF5EF] p-3 rounded-lg">
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{batch.startDate}</p>
            </div>
            <div className="bg-[#FFF5EF] p-3 rounded-lg">
              <p className="text-sm text-gray-500">Schedule</p>
              <p className="font-medium">{batch.batchTime}</p>
            </div>
            <div className="bg-[#FFF5EF] p-3 rounded-lg">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{batch.duration}</p>
            </div>
            <div className="bg-[#FFF5EF] p-3 rounded-lg">
              <p className="text-sm text-gray-500">Mode</p>
              <p className="font-medium">{batch.mode}</p>
            </div>
          </div>
  
          {/* Curriculum Section */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-[#4D2C5E]">Curriculum Plan</h4>
            <div className="space-y-3">
              {batch.curriculum?.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-[#FF7426] rounded-full flex items-center justify-center text-white mr-3 mt-1">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{item.module}</p>
                    <p className="text-sm text-gray-600">{item.duration} • {item.topics.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Additional Information */}
          {batch.additionalInfo && (
            <div>
              <h4 className="text-lg font-semibold mb-2 text-[#4D2C5E]">Additional Information</h4>
              <p className="text-gray-700">{batch.additionalInfo}</p>
            </div>
          )}
        </div>
      </Modal>
    );
  };


const UpcomingBatches = () => {
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [enrollCourse, setEnrollCourse] = useState(null);
    const bannerImageUrl = "https://images.pexels.com/photos/4144225/pexels-photo-4144225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    const batches = Btches;
    const controls = useAnimation();
    const ref = useRef();
    const [visible, setVisible] = useState(false);

    // Intersection Observer setup
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    controls.start("visible");
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.1
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [controls]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className='bg-[#F7F7F7] min-h-screen'>
            {/* Banner Section (unchanged) */}
            <motion.section
    initial="hidden"
    animate="visible"
    variants={containerVariants}
    className="relative bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] py-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
    {/* Abstract background shapes */}
    <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
    >
        <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-[#FF7426]/10"></div>
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-[#FF7426]/10"></div>
    </motion.div>

    <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-8 h-full">
        {/* Image on left */}
        <motion.div
            className="w-full lg:w-1/2 h-full"
            variants={itemVariants}
        >
            <div className="relative rounded-xl overflow-hidden shadow-2xl h-[300px] sm:h-[350px] lg:h-full">
                <img
                    src={bannerImageUrl}
                    alt="Students learning together at UpSkillLab"
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                />
                <motion.div
                    className="absolute inset-0 bg-[#FF7426]/20 mix-blend-multiply"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            </div>
        </motion.div>

        {/* Content on right */}
        <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left py-4 lg:py-0"
            variants={containerVariants}
        >
            <motion.h1
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
            >
                Upcoming <span className="text-[#FF7426]">Batches</span>
            </motion.h1>

            <motion.p
                className="text-lg text-white/90 mb-6"
                variants={itemVariants}
            >
                Join our next cohort of aspiring professionals and transform your career
            </motion.p>

            {/* Animated decorative elements */}
            <motion.div
                className="flex justify-center lg:justify-start space-x-4"
                variants={itemVariants}
            >
                {['📅', '👩‍💻', '🎓'].map((icon, index) => (
                    <motion.div
                        key={index}
                        className="text-3xl"
                        animate={{
                            rotate: [0, 10, -10, 0],
                            y: [0, -8, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: index * 0.5
                        }}
                        whileHover={{ scale: 1.2 }}
                    >
                        {icon}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    </div>
</motion.section>

            {/* Batch Listings Section with Scroll Trigger */}
            <motion.div
                ref={ref}
                className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto"
                initial="hidden"
                animate={controls}
                variants={containerVariants}
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-[#4d2c5e] text-center mb-12">
                    Our <span className='text-[#ff7426]'>Upcoming Batches</span>
                </h2>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {batches.map((batch, index) => (
                        <motion.div
                            key={batch.id}
                            variants={itemVariants}
                            whileHover={{
                                y: -5,
                                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                                transition: { duration: 0.2 }
                            }}
                            custom={index}
                        >
                            <BatchCard
                                startDate={batch.startDate}
                                price={batch.price}
                                title={batch.title}
                                batchId={batch.batchId}
                                batchTime={batch.batchTime}
                                duration={batch.duration}
                                mode={batch.mode}
                                onViewDetails={() => setSelectedBatch(batch)}
                                onEnroll={() => setEnrollCourse(batch)}
                            />
                        </motion.div>
                    ))}
                </div>
                {selectedBatch && (
        <BatchDetailsModal 
          batch={selectedBatch} 
          onClose={() => setSelectedBatch(null)} 
        />
      )}
                {enrollCourse && (
                    <BatchEnrollmentModal 
                        batch={enrollCourse} 
                        onClose={() => setEnrollCourse(null)} 
                    />
                )}
            </motion.div>

            <TrainingBanner />
            <FeedbaackBanner />
        </div>
    );
};

export default UpcomingBatches;