import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const AboutUpskillab = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  return (
    <>
        <Helmet>
        <title>About Upskillab: E-Learning in Psychology, Technology, Management & Self-Development</title>
        <meta name="description" content=" Upskillab offers online courses in psychology, technology, management, and self-development to help you gain the skills needed for success in today’s competitive job market.." />
      </Helmet>


      <div className="bg-gradient-to-b from-[#FDF8EE] to-white py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="max-w-7xl mx-auto text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            variants={fadeIn}
          >
            About <span className="text-[#FF7426]">Upskillab</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto"
            variants={fadeIn}
          >
            Where <span className="font-semibold text-[#4D2C5E]">Skills Development</span> Meets <span className="font-semibold text-[#FF7426]">Mental Wellbeing</span>
          </motion.p>
        </motion.div>

        {/* Unique Proposition Section */}
        <motion.div
          className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
         <div className="grid md:grid-cols-2 gap-8">
  <motion.div
    className="p-8 md:p-12 flex flex-col justify-center"
    variants={fadeIn}
  >
    <h2 className="text-3xl font-bold text-gray-900 mb-6">
      Our Unique Approach
    </h2>
    <p className="text-lg text-gray-700 mb-6">
      At Upskillab, we redefine online education by combining professional upskilling with mental wellbeing support—empowering learners to succeed both career-wise and personally.
    </p>
    <p className="text-lg text-gray-700">
      We are one of the first e-learning platforms in India to introduce a dual-benefit model, offering job-ready certification courses alongside mental health services. Our approach bridges the gap between skill acquisition and emotional resilience, which is essential in today’s fast-paced and high-pressure job market.
    </p>
  </motion.div>
  <motion.div
    className="bg-[#4D2C5E] p-8 md:p-12 flex flex-col justify-center"
    variants={fadeIn}
  >
    <div className="text-white space-y-12">
      {/* Integrated Model Sub-Section */}
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-[#FF7426] p-3 rounded-lg mr-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">Integrated Model</h3>
        </div>
        <p className="text-base mb-4">
         We go beyond academics—blending career skills with mental wellness. Our model boosts emotional intelligence, resilience, and real-world readiness for a thriving future.
        </p>
        {/* <div>
          <h4 className="text-sm font-semibold text-gray-200 mb-2">Key Benefits:</h4>
          <ul className="list-disc list-inside text-base space-y-2">
            <li>Combining career development and mental health support</li>
            <li>Prepares learners for real-world challenges</li>
            <li>Builds both hard and soft skills</li>
          </ul>
        </div> */}
      </div>

      {/* Dual Benefit Platform Sub-Section */}
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-[#FF7426] p-3 rounded-lg mr-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">Dual Benefit Platform</h3>
        </div>
        <p className="text-base mb-4">
          Upskillab uniquely combines job-ready courses with monthly wellbeing sessions and free psychological counselling, ensuring learners grow professionally and personally.
        </p>
        {/* <div>
          <h4 className="text-sm font-semibold text-gray-200 mb-2">Our unique model includes:</h4>
          <ul className="list-disc list-inside text-base space-y-2">
            <li>Industry-relevant courses in high-demand fields</li>
            <li>Monthly wellbeing sessions led by professionals</li>
            <li>Free access to certified psychological counselling</li>
          </ul>
        </div> */}
      </div>
    </div>
  </motion.div>
</div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="max-w-7xl mx-auto bg-[#FF7426] rounded-3xl p-8 md:p-12 mb-16 text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl mb-8">
              At Upskillab, we are committed to transforming lives through innovative upskilling programs combined with dedicated mental wellbeing support.
            </p>
            <p className="text-xl mb-8">
              Our mission is to nurture both professional growth and personal wellness, helping individuals thrive in today's fast-paced world.
            </p>
            <p className="text-2xl font-semibold">
              By bridging the gap between education and emotional health, we prepare you not just for a job — but for a fulfilling life.
            </p>
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          className="max-w-7xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4"
              variants={fadeIn}
            >
              Our Vision
            </motion.h2>
            <motion.p
              className="text-xl text-gray-700 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              At Upskillab, we envision a future where education and emotional wellbeing go hand in hand.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#4D2C5E]"
              variants={fadeIn}
            >
              <h3 className="text-2xl font-bold text-[#4D2C5E] mb-4">Short-Term Vision</h3>
              <p className="text-gray-700">
12:39
                To contribute to improving India's global ranking in the Happiness Index by prioritizing mental wellbeing alongside skill development.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#FF7426]"
              variants={fadeIn}
            >
              <h3 className="text-2xl font-bold text-[#FF7426] mb-4">Long-Term Vision</h3>
              <p className="text-gray-700">
                To establish a counseling center within every 5 km radius across India by 2050, starting from the historic land of Prayagraj — building a nation that is emotionally resilient, professionally strong, and truly empowered.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Holistic Growth",
                description: "We believe in nurturing both professional skills and personal wellbeing",
                icon: "🌱",
                color: "bg-[#4D2C5E]"
              },
              {
                title: "Innovation",
                description: "Constantly evolving our approach to education and mental health",
                icon: "💡",
                color: "bg-[#FF7426]"
              },
              {
                title: "Accessibility",
                description: "Making quality education and counseling available to all",
                icon: "🌍",
                color: "bg-[#4D2C5E]"
              },
              {
                title: "Empathy",
                description: "Understanding the real challenges our learners face",
                icon: "❤️",
                color: "bg-[#FF7426]"
              },
              {
                title: "Excellence",
                description: "Delivering top-tier courses and wellbeing services",
                icon: "🏆",
                color: "bg-[#4D2C5E]"
              },
              {
                title: "Community",
                description: "Building supportive networks for lifelong success",
                icon: "🤝",
                color: "bg-[#FF7426]"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className={`${value.color} w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutUpskillab;
