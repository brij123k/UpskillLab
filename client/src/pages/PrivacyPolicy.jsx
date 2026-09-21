import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const PrivacyPolicy = () => {
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

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header with privacy icon */}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold text-[#4D2C5E] mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Privacy Policy
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

        {/* Last Updated with shield icon */}
        <motion.div
          className="bg-white p-4 mb-12 rounded-lg shadow-sm border-l-4 border-[#FF7426] flex items-start"
          variants={item}
        >
          <svg className="w-5 h-5 text-[#4D2C5E] mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
            Our Commitment to Privacy
          </motion.h2>
          <motion.p className="text-gray-700 mb-4 leading-relaxed">
            At Trivision Partners Private Limited ("TVP ERP OR Upskillab), we are committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
            TVP ERP platform.
          </motion.p>

        </motion.section>

        {/* Main Content - Privacy Specific Sections */}
        {[
          {
            title: "1. Information We Collect",
            icon: "📝",
            content: "We collect personal information you provide (name, email, payment details) and automatically collected data (IP address, device information, usage patterns)."
          },
          {
            title: "2. How We Use Your Data",
            icon: "🔍",
            content: "Your information is used to provide services, personalize experience, process payments, communicate with you, and improve our platform."
          },
          {
            title: "3. Data Sharing & Disclosure",
            icon: "🤝",
            content: "We may share data with trusted third-party service providers, for legal compliance, or to protect our rights. We never sell your personal information."
          },
          {
            title: "4. Data Security",
            icon: "🔒",
            content: "We implement industry-standard security measures including encryption, secure servers, and access controls to protect your information."
          },
          {
            title: "5. Cookies & Tracking",
            icon: "🍪",
            content: "We use cookies and similar technologies to enhance user experience and analyze platform usage. You can control cookies through your browser settings."
          },
          {
            title: "6. Your Privacy Rights",
            icon: "🛡️",
            content: "You may access, correct, or delete your personal information. You can opt-out of marketing communications and certain data processing activities."
          },
          {
            title: "7. Children's Privacy",
            icon: "🧒",
            content: "Our services are not directed to children under 13. We do not knowingly collect personal information from children without parental consent."
          },
          {
            title: "8. International Data Transfers",
            icon: "🌍",
            content: "Your information may be transferred to and processed in countries other than your own, with appropriate safeguards in place."
          },
          {
            title: "9. Policy Updates",
            icon: "🔄",
            content: "We may update this policy periodically. We'll notify you of significant changes and indicate the effective date at the top of this page."
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
            <motion.p
              className="text-gray-700 leading-relaxed"
              variants={item}
            >
              {section.content}
            </motion.p>
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
            Contact Us
          </motion.h3>
          <motion.p
            className="text-gray-700 mb-6"
            variants={item}
          >
            If you have questions about this Privacy Policy or our data practices, please contact our Data Protection Officer at:
          </motion.p>
          <motion.div
            className="bg-white p-4 rounded-lg"
            whileHover={{ scale: 1.01 }}
          >
            <p className="text-[#FF7426] font-medium">privacy@upskilllab.com</p>
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
            By using our services, you acknowledge you have read and understood this Privacy Policy.
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

      <Helmet>
        <title>Privacy Policy | Upskillab - Your Data, Your Control</title>
        <meta name="description" content="Learn how Upskillab collects, uses, and protects your personal information while using our learning platform." />
        <meta name="keywords" content="upskilllab privacy policy, data protection, education privacy, online education privacy, upskillab user data" />
        <link rel="canonical" href="https://upskillab.com/privacypolicy" />
      </Helmet>


    </motion.div>
  );
};

export default PrivacyPolicy;