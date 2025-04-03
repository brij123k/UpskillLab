import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
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
      transition: { duration: 0.5 }
    }
  };

  const section = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 }
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
        {/* Header */}
        <motion.header 
          className="text-center mb-16"
          variants={item}
        >
          <motion.h1 
            className="text-4xl font-bold text-[#4D2C5E] mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Terms of Service
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
          className="bg-white p-4 mb-12 rounded-lg shadow-sm border-l-4 border-[#4D2C5E]"
          variants={item}
        >
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
            Introduction
          </motion.h2>
          <motion.p 
            className="text-gray-700 mb-4 leading-relaxed"
            variants={item}
          >
            Welcome to UpSkillLab. These Terms of Service ("Terms") govern your access to and use of our 
            website, services, and applications. By using our services, you agree to these Terms.
          </motion.p>
        </motion.section>

        {/* Main Content */}
        {[
          {
            title: "1. Account Registration",
            content: "You must provide accurate information when creating an account and are responsible for maintaining the confidentiality of your credentials."
          },
          {
            title: "2. Content Ownership",
            content: "All course materials, text, graphics, logos, and other content are the property of UpSkillLab or its licensors and are protected by intellectual property laws."
          },
          {
            title: "3. Acceptable Use",
            content: "You agree not to misuse the services, including by harassing others, distributing malware, or violating applicable laws."
          },
          {
            title: "4. Payments",
            content: "All fees are non-refundable except as required by law. We may change our pricing by giving you at least 30 days' notice."
          },
          {
            title: "5. Termination",
            content: "We may suspend or terminate your access to the services at our discretion if you violate these Terms."
          },
          {
            title: "6. Disclaimers",
            content: "Our services are provided 'as is' without warranties of any kind. We don't guarantee specific results from our courses."
          },
          {
            title: "7. Limitation of Liability",
            content: "UpSkillLab will not be liable for any indirect, incidental, or consequential damages arising from your use of our services."
          },
          {
            title: "8. Changes to Terms",
            content: "We may modify these Terms at any time. Your continued use after changes constitutes acceptance of the new Terms."
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
              <span className="w-2 h-2 bg-[#4D2C5E] rounded-full mr-3"></span>
              {section.title}
            </motion.h3>
            <motion.p 
              className="text-gray-700 leading-relaxed"
              variants={item}
            >
              {section.content}
            </motion.p>
          </motion.section>
        ))}

        {/* Acceptance Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="inline-block mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <Link 
              to="/" 
              className="px-8 py-3 bg-[#4D2C5E] text-white rounded-md hover:bg-[#3A2250] transition-colors text-lg font-medium shadow-md"
            >
              Back to Home
            </Link>
          </motion.div>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            By using our services, you agree to these Terms of Service.
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
      </div>
    </motion.div>
  );
};

export default TermsOfService;