import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BatchCard from '../../components/Cards/BatchCard';
import TrainingBanner from '../../components//banners/TrainingBanner';
import FeedbaackBanner from '../../components/banners/FeedbackBanner';
const UpcomingBatches = () => {
    // Using a free educational image from Pexels
    const bannerImageUrl = "https://images.pexels.com/photos/4144225/pexels-photo-4144225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    const batches = [
        {
            id: 1,
            startDate: "01 Mar. 2025",
            price: "1,90,000",
            title: "PGP in Data Science and Machine Learning",
            batchId: "11130001",
            batchTime: "9:00 PM",
            duration: "11 Months",
            mode: "Online"
        },
        {
            id: 2,
            startDate: "15 Apr. 2025",
            price: "1,75,000",
            title: "PGP in Artificial Intelligence",
            batchId: "11130002",
            batchTime: "8:00 PM",
            duration: "10 Months",
            mode: "Online"
        },
        {
            id: 3,
            startDate: "01 May 2025",
            price: "2,10,000",
            title: "PGP in Full Stack Development",
            batchId: "11130003",
            batchTime: "7:30 PM",
            duration: "12 Months",
            mode: "Hybrid"
        },
        {
            id: 4,
            startDate: "15 Jun. 2025",
            price: "1,60,000",
            title: "PGP in Cloud Computing",
            batchId: "11130004",
            batchTime: "8:00 PM",
            duration: "9 Months",
            mode: "Online"
        }
        ,
        {
            id: 5,
            startDate: "15 Jun. 2025",
            price: "1,60,000",
            title: "PGP in Cloud Computing",
            batchId: "11130004",
            batchTime: "8:00 PM",
            duration: "9 Months",
            mode: "Online"
        }
        ,
        {
            id: 6,
            startDate: "15 Jun. 2025",
            price: "1,60,000",
            title: "PGP in Cloud Computing",
            batchId: "11130004",
            batchTime: "8:00 PM",
            duration: "9 Months",
            mode: "Online"
        }
        ,
        {
            id: 7,
            startDate: "15 Jun. 2025",
            price: "1,60,000",
            title: "PGP in Cloud Computing",
            batchId: "11130004",
            batchTime: "8:00 PM",
            duration: "9 Months",
            mode: "Online"
        }
        ,
        {
            id: 8,
            startDate: "15 Jun. 2025",
            price: "1,60,000",
            title: "PGP in Cloud Computing",
            batchId: "11130004",
            batchTime: "8:00 PM",
            duration: "9 Months",
            mode: "Online"
        }
    ];
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
                className="relative bg-gradient-to-r from-[#ff7426] via-[#ff5e3a] to-[#ff2d6e] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
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

                <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Image on left */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        variants={itemVariants}
                    >
                        <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-video lg:aspect-auto lg:h-full">
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
                        className="w-full lg:w-1/2 text-center lg:text-left"
                        variants={containerVariants}
                    >
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                        >
                            Upcoming <span className="text-[#000000]">Batches</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8"
                            variants={itemVariants}
                        >
                            Join our next cohort of aspiring professionals and transform your career
                        </motion.p>

                        {/* Animated decorative elements */}
                        <motion.div
                            className="flex justify-center lg:justify-start space-x-4 sm:space-x-6"
                            variants={itemVariants}
                        >
                            {['📅', '👩‍💻', '🎓'].map((icon, index) => (
                                <motion.div
                                    key={index}
                                    className="text-3xl sm:text-4xl"
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
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] text-center mb-12">
                    Our <spna className='text-[#ff7426]'>Upcoming Batches</spna>
                </h2>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {batches.map((batch, index) => (
                        <BatchCard
                            key={batch.id}
                            startDate={batch.startDate}
                            price={batch.price}
                            title={batch.title}
                            batchId={batch.batchId}
                            batchTime={batch.batchTime}
                            duration={batch.duration}
                            mode={batch.mode}
                        />
                    ))}
                </div>
            </motion.div>


            <TrainingBanner />
            <FeedbaackBanner />

            <Footer />
        </div>
    );
};

export default UpcomingBatches;