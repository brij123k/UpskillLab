import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const RefundPolicy = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6
      }
    }
  };

  const section = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const pulse = {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.05, 1],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header with refund icon */}
        <motion.header 
          className="text-center mb-16"
          variants={item}
        >
          <motion.div
            className="flex justify-center mb-4"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-16 h-16 bg-[#4D2C5E] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold text-[#4D2C5E] mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Refund Policy
          </motion.h1>
          <motion.div 
            className="flex justify-center"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-1 w-24 bg-[#FF7426]"></div>
          </motion.div>
        </motion.header>

        {/* Last Updated */}
        <motion.div 
          className="bg-white p-4 mb-12 rounded-lg shadow-sm border-l-4 border-[#FF7426] flex items-start"
          variants={item}
        >
          <svg className="w-5 h-5 text-[#4D2C5E] mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[#4D2C5E] font-medium">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.section 
          className="mb-12 bg-white p-6 rounded-lg shadow-sm"
          variants={section}
        >
          <motion.h2 
            className="text-2xl font-semibold text-[#4D2C5E] mb-4 flex items-center"
            whileHover={{ x: 5 }}
          >
            <span className="w-3 h-3 bg-[#FF7426] rounded-full mr-3"></span>
            Our Commitment to Fairness
          </motion.h2>
          <motion.p 
            className="text-gray-700 mb-4 leading-relaxed"
            variants={item}
          >
            At Upskillab, we are dedicated to delivering high-quality learning experiences. However, if you are unsatisfied with your course for any reason, we have outlined the following refund policy for your reference.
          </motion.p>
        </motion.section>

        {/* Main Content */}
        {[
          {
            title: "1. Refund Eligibility",
            icon: "✅",
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-semibold">Course Cancellation by Upskillab:</span> In the event that the course is cancelled by Upskillab for any reason, you are entitled to a full refund.</li>
                <li><span className="font-semibold">Request Period:</span> Refund requests must be submitted within 7 days of the payment date or before the start of the course, whichever is earlier.</li>
                <li><span className="font-semibold">Exceptional Circumstances:</span> In special situations, such as medical emergencies or personal hardships, refunds or course deferral options may be considered on a case-by-case basis.</li>
              </ul>
            )
          },
          {
            title: "2. Refund Process",
            icon: "🔄",
            content: (
              <div>
                <p className="mb-3">To request a refund:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Email our support team at <span className="font-semibold text-[#FF7426]">ops@upskillab.com</span>, providing your enrollment details along with the reason for your refund request.</li>
                  <li>Once your request is reviewed and approved (in line with the outlined conditions), the refund will be processed within <span className="font-semibold">7–10 business days</span>.</li>
                </ol>
              </div>
            )
          },
          {
            title: "3. Non-Refundable Charges and Exceptions",
            icon: "🚫",
            content: "Registration fees are non-refundable under any circumstances."
          }
        ].map((section, index) => (
          <motion.section 
            key={index}
            className="mb-8 bg-white p-6 rounded-lg shadow-sm"
            variants={section}
            custom={index}
          >
            <motion.h3 
              className="text-xl font-semibold text-[#4D2C5E] mb-3 flex items-center"
              whileHover={{ color: '#FF7426' }}
            >
              <span className="text-lg mr-3">{section.icon}</span>
              {section.title}
            </motion.h3>
            <motion.div 
              className="text-gray-700 leading-relaxed"
              variants={item}
            >
              {section.content}
            </motion.div>
          </motion.section>
        ))}

        {/* Contact Information */}
        <motion.div 
          className="mt-12 bg-[#FFF5EF] border border-[#FFD9C5] rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.h3 
            className="text-2xl font-bold text-[#4D2C5E] mb-4"
            whileHover={{ x: 3 }}
          >
            Need Help?
          </motion.h3>
          <motion.p 
            className="text-gray-700 mb-6"
            variants={item}
          >
            If you have questions about our Refund Policy or need assistance with a refund request, please contact our support team at:
          </motion.p>
          <motion.div
            className="bg-white p-4 rounded-lg"
            whileHover={{ scale: 1.01 }}
          >
            <p className="text-[#FF7426] font-medium">ops@upskillab.com</p>
          </motion.div>
        </motion.div>

        {/* Acceptance section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              to="/" 
              className="inline-block px-8 py-3 bg-[#4D2C5E] text-white rounded-md hover:bg-[#3A2250] transition-colors text-lg font-medium shadow-md"
            >
              Back to Homepage
            </Link>
          </motion.div>
          <motion.p 
            className="text-gray-600 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            We appreciate your trust in Upskillab and are committed to providing fair and transparent policies.
          </motion.p>
        </motion.div>

        {/* Decorative elements */}
        <motion.div 
          className="fixed top-20 right-20 w-2 h-2 rounded-full bg-[#FF7426]"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
            transition: { repeat: Infinity, duration: 3 }
          }}
        />
        <motion.div 
          className="fixed bottom-20 left-20 w-3 h-3 rounded-full bg-[#4D2C5E]"
          animate={{
            y: [0, -15, 0],
            transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="fixed top-1/3 left-1/4 w-4 h-4 rounded-full bg-[#FF7426] opacity-70"
          variants={pulse}
          animate="visible"
        />
      </div>
      <Helmet>
  <title>Refund Policy | Upskillab - Learn About Our Refunds</title>
  <meta name="description" content="Understand Upskillab’s refund policy for course enrollments, cancellations, and money-back guarantees." />
  <meta name="keywords" content="upskilllab refund, refund policy, course cancellation, education refund, money-back upskillab" />
</Helmet>
    </motion.div>
  );
};

export default RefundPolicy;