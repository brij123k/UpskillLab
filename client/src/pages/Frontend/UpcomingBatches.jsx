import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BatchCard from "../../components/Cards/BatchCard";
import TrainingBanner from "../../components/banners/TrainingBanner";
import FeedbaackBanner from "../../components/banners/FeedbackBanner";
import Modal from "../../components/Modal/CommonModal";
import BatchEnrollmentModal from "../../components/Modal/BatchEnrollmentModal";
import { useQuery } from "@tanstack/react-query";
import { getDataHandler } from "../../config/services"; // Updated import

const UpcomingBatches = () => {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [enrollCourse, setEnrollCourse] = useState(null);
  const bannerImageUrl =
    "https://images.pexels.com/photos/4144225/pexels-photo-4144225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const {
    data: batches = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["upcomingBatches"],
    queryFn: () => getDataHandler("upcomingBatches", { limit: 20 }),
    select: (data) =>
      data.map((batch) => ({
        id: batch.batchId,
        batchId: batch.batchId,
        courseId: batch.courseId,
        courseCode: batch.course.courseCode,
        startDate: new Date(batch.startDate),
        title: batch.courseName,
        price: batch.fees,
        originalPrice: batch.course.originalPrice,
        duration:
          batch.durationInDays > 30
            ? `${Math.floor(batch.durationInDays / 30)} month${
                Math.floor(batch.durationInDays / 30) > 1 ? "s" : ""
              }`
            : batch.durationInDays >= 1
            ? `${batch.durationInDays} day${
                batch.durationInDays > 1 ? "s" : ""
              }`
            : `${batch.durationInDays * 24} hour${
                batch.durationInDays * 24 > 1 ? "s" : ""
              }`,
        startTime: batch.startTime
          ? (() => {
              return new Date(
                `2000-01-01T${batch.startTime}:00.000`
              ).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              });
            })()
          : "",
        batchCode: batch.batchCode,
        mode: batch.classMode,
        remainingSeats: batch.remainingSeats,
        totalSeats: batch.totalSeats,
      })),
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      {/* Banner Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] py-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
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
              Join our next cohort of aspiring professionals and transform your
              career
            </motion.p>

            <motion.div
              className="flex justify-center lg:justify-start space-x-4"
              variants={itemVariants}
            >
              {["📅", "👩‍💻", "🎓"].map((icon, index) => (
                <motion.div
                  key={index}
                  className="text-3xl"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.5,
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
        initial="visible"
        animate="visible"
        className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#4d2c5e] text-center mb-12">
          Our <span className="text-[#ff7426]">Upcoming Batches</span>
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4D2C5E]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Failed to load batches. Please try again later.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {batches.map((batch, index) => (
              <motion.div
                key={batch.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transition: { duration: 0.2 },
                }}
              >
                <BatchCard
                  startDate={batch.startDate}
                  price={batch.originalPrice}
                  originalPrice={batch.price}
                  title={batch.title}
                  batchCode={batch.batchCode}
                  courseId={batch.courseId}
                  remainingSeats={batch.remainingSeats}
                  courseCode={batch.courseCode}
                  batchId={batch.batchId}
                  batchTime={batch.startTime}
                  duration={batch.duration}
                  mode={batch.mode === "LIVE_ONLINE" ? "Online" : "Offline"}
                  onEnroll={() => setEnrollCourse(batch)}
                />
              </motion.div>
            ))}
          </div>
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
