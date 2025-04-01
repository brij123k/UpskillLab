import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BatchCard from '../../components/Cards/BatchCard';
import TrainingBanner from '../../components//banners/TrainingBanner';
import FeedbaackBanner from '../../components/banners/FeedbackBanner';
import {Btches} from '../../data'; // Assuming you have a data file with batch information
const UpcomingBatches = () => {
    // Using a free educational image from Pexels
    const bannerImageUrl = "https://images.pexels.com/photos/4144225/pexels-photo-4144225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    const batches = Btches
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.6
            }
        }
    };

    return (
        <div className='bg-[#F7F7F7] min-h-screen'>
            <Header />

            {/* Modern Split Banner */}
            <motion.section
    initial="hidden"
    animate="visible"
    variants={containerVariants}
    className="relative bg-gradient-to-r from-[#FF9142] to-[#FF7426] py-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
    {/* Abstract background shapes */}
    <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
    >
        <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-white/5"></div>
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-white/5"></div>
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
                    className="absolute inset-0 bg-[#4D2C5E]/20 mix-blend-multiply"
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
                Upcoming <span className="text-[#4d2c5e]">Batches</span>
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

            {/* Batch Listings Section */}
<motion.div
    className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
>
    <h2 className="text-3xl sm:text-4xl font-bold text-[#4d2c5e] text-center mb-12">
        Our <span className='text-[#ff7426]'>Upcoming Batches</span>
    </h2>

    <motion.div 
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3
                }
            }
        }}
    >
        {batches.map((batch) => (
            <motion.div
                key={batch.id}
                variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.95 },
                    visible: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: {
                            duration: 0.5,
                            ease: "easeOut"
                        }
                    }
                }}
                whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 }
                }}
                className="relative"
            >
                <BatchCard
                    startDate={batch.startDate}
                    price={batch.price}
                    title={batch.title}
                    batchId={batch.batchId}
                    batchTime={batch.batchTime}
                    duration={batch.duration}
                    mode={batch.mode}
                />
            </motion.div>
        ))}
    </motion.div>
</motion.div>


            <TrainingBanner />
            <FeedbaackBanner />

            <Footer />
        </div>
    );
};

export default UpcomingBatches;