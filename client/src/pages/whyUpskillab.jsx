import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AdmissionFormModal from '../components/Modal/BasicEnrollNowModal';
const WhyUpskillab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      className="min-h-screen bg-gray-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header 
          className="text-center mb-12 sm:mb-16"
          variants={item}
        >
          <motion.div
            className="flex justify-center mb-4"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#4D2C5E] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4D2C5E] mb-4 sm:mb-6 px-2"
            whileHover={{ scale: 1.02 }}
          >
            Why Choose Upskillab – Best Online Learning in India
          </motion.h1>
          <motion.div 
            className="flex justify-center"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-1 w-16 sm:w-24 bg-[#FF7426]"></div>
          </motion.div>
        </motion.header>

        {/* Our Mission Section */}
        <motion.section 
          className="mb-10 sm:mb-12 bg-white p-5 sm:p-6 rounded-lg shadow-sm"
          variants={section}
        >
          <motion.h2 
            className="text-xl sm:text-2xl font-semibold text-[#4D2C5E] mb-3 sm:mb-4 flex items-center"
            whileHover={{ x: 5 }}
          >
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FF7426] rounded-full mr-2 sm:mr-3"></span>
            Our Mission – Empowering India's Workforce
          </motion.h2>
          <motion.p 
            className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base"
            variants={item}
          >
            India is at a crossroads. On one hand, we have the largest youth population in the world. On the other, over 65% of graduates are considered unemployable by industry reports because they lack practical skills, workplace readiness, and emotional intelligence.
          </motion.p>
          <motion.p 
            className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base"
            variants={item}
          >
            Mental health issues are rising, burnout is common, and entire towns in Tier-2 and Tier-3 cities remain cut off from quality skilling opportunities.
          </motion.p>
          <motion.p 
            className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base"
            variants={item}
          >
            At Upskillab, we exist to change this reality. We believe that every individual deserves access to life-changing knowledge, affordable online education, and practical skills — from understanding psychology and mental health to mastering the latest technical and professional competencies.
          </motion.p>
          <motion.p 
            className="text-gray-700 mb-3 sm:mb-4 leading-relaxed font-medium text-sm sm:text-base"
            variants={item}
          >
            Our mission is simple but powerful: to make quality learning accessible, affordable, and impactful for students and professionals everywhere, especially in underserved communities.
          </motion.p>
          <motion.p 
            className="text-gray-700 leading-relaxed text-sm sm:text-base"
            variants={item}
          >
            We are not here to create crores of certificate or degree holders. Our focus is on nurturing a few lakh empathetic, skilled, and genuine counsellors, professionals, and changemakers who can truly transform workplaces, communities, and lives — and in doing so, change the face of India's workforce.
          </motion.p>
        </motion.section>

        {/* Success Stories */}
        <motion.section 
          className="mb-10 sm:mb-12"
          variants={section}
        >
          <motion.h2 
            className="text-xl sm:text-2xl font-semibold text-[#4D2C5E] mb-6 sm:mb-8 text-center px-2"
            whileHover={{ x: 5 }}
          >
            Real Learner Success Stories – Transforming Careers with Upskillab
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Ravi's Story */}
            <motion.div 
              className="bg-white p-5 sm:p-6 rounded-lg shadow-sm"
              variants={item}
            >
              <motion.h3 
                className="text-lg sm:text-xl font-semibold text-[#4D2C5E] mb-2 sm:mb-3 flex items-center"
                whileHover={{ color: '#FF7426' }}
              >
                <span className="text-base sm:text-lg mr-2 sm:mr-3">👨‍🎓</span>
                Ravi's Journey – Aspiring Counsellor
              </motion.h3>
              <motion.p 
                className="text-gray-700 leading-relaxed text-sm sm:text-base"
                variants={item}
              >
                Ravi grew up in a small town in Bihar, where his dream of becoming a counsellor seemed impossible. Limited internet access, high course fees, and a lack of mentors left him stuck after graduation.
              </motion.p>
              <motion.p 
                className="text-gray-700 leading-relaxed mt-2 sm:mt-3 text-sm sm:text-base"
                variants={item}
              >
                Through Upskillab's affordable, bilingual online psychology programs, he not only learned the foundations of psychology but also gained hands-on training and one-on-one mentorship. Within a year, Ravi was volunteering with an NGO, conducting mental-health workshops, and earning from private counselling sessions.
              </motion.p>
              <motion.p 
                className="text-gray-700 leading-relaxed mt-2 sm:mt-3 font-medium text-sm sm:text-base"
                variants={item}
              >
                Today, he's a certified professional changing lives in his community — proof that when quality psychology education reaches small towns, it sparks ripples of transformation far beyond one learner.
              </motion.p>
            </motion.div>

            {/* Sana's Story */}
            <motion.div 
              className="bg-white p-5 sm:p-6 rounded-lg shadow-sm"
              variants={item}
            >
              <motion.h3 
                className="text-lg sm:text-xl font-semibold text-[#4D2C5E] mb-2 sm:mb-3 flex items-center"
                whileHover={{ color: '#FF7426' }}
              >
                <span className="text-base sm:text-lg mr-2 sm:mr-3">👩‍🏫</span>
                Sana's Mission – School Mental Health Champion
              </motion.h3>
              <motion.p 
                className="text-gray-700 leading-relaxed text-sm sm:text-base"
                variants={item}
              >
                Sana was a government-school teacher in a small village near Lucknow. She saw children struggling with stress, exam fear, and family issues but lacked formal training to help them.
              </motion.p>
              <motion.p 
                className="text-gray-700 leading-relaxed mt-2 sm:mt-3 text-sm sm:text-base"
                variants={item}
              >
                Through Upskillab's psychology certification for educators, she learned counselling basics, empathy-based communication, and practical intervention tools.
              </motion.p>
              <motion.p 
                className="text-gray-700 leading-relaxed mt-2 sm:mt-3 font-medium text-sm sm:text-base"
                variants={item}
              >
                Now she runs weekly wellness circles in her school, reduced drop-outs, and became a resource person for other teachers. Upskillab turned her compassion into competence — transforming her school into a safer, healthier learning space.
              </motion.p>
            </motion.div>

            {/* Meera's Story */}
            <motion.div 
              className="bg-white p-5 sm:p-6 rounded-lg shadow-sm"
              variants={item}
            >
              <motion.h3 
                className="text-lg sm:text-xl font-semibold text-[#4D2C5E] mb-2 sm:mb-3 flex items-center"
                whileHover={{ color: '#FF7426' }}
              >
                <span className="text-base sm:text-lg mr-2 sm:mr-3">👩‍💻</span>
                Meera's Leap – Breaking into Tech
              </motion.h3>
              <motion.p 
                className="text-gray-700 leading-relaxed text-sm sm:text-base"
                variants={item}
              >
                Meera, a commerce graduate from a Tier-3 town in Madhya Pradesh, always dreamt of working in technology. But with no exposure beyond basic computer classes, she faced repeated job rejections.
              </motion.p>
              <motion.p 
                className="text-gray-700 leading-relaxed mt-2 sm:mt-3 text-sm sm:text-base"
                variants={item}
              >
                Through Upskillab's beginner-friendly technical courses in Hindi, she learned data analytics step by step, built real-world projects under industry mentors, and received personalized career guidance.
              </motion.p>
              <motion.p 
                className="text-gray-700 leading-relaxed mt-2 sm:mt-3 font-medium text-sm sm:text-base"
                variants={item}
              >
                Within eight months, Meera landed an entry-level analyst role at a reputed firm. Today, she mentors other young women from her hometown, proving that affordable technical education + career support can unlock hidden talent.
              </motion.p>
            </motion.div>

            {/* Arjun's Story */}
            <motion.div 
              className="bg-white p-5 sm:p-6 rounded-lg shadow-sm"
              variants={item}
            >
              <motion.h3 
                className="text-lg sm:text-xl font-semibold text-[#4D2C5E] mb-2 sm:mb-3 flex items-center"
                whileHover={{ color: '#FF7426' }}
              >
                <span className="text-base sm:text-lg mr-2 sm:mr-3">👨‍💼</span>
                Arjun's Pivot – From Exam Prep to Employment
              </motion.h3>
              <motion.p 
                className="text-gray-700 leading-relaxed text-sm sm:text-base"
                variants={item}
              >
                Arjun spent four years preparing for competitive exams in Rajasthan but couldn't clear them. The gap on his résumé made him feel unemployable.
              </motion.p>
              <motion.p 
                className="text-gray-700 leading-relaxed mt-2 sm:mt-3 text-sm sm:text-base"
                variants={item}
              >
                Through Upskillab's short-term professional skills program in sales and marketing, he learned corporate communication, selling strategies, and workplace etiquette with real case studies.
              </motion.p>
              <motion.p 
                className="text-gray-700 leading-relaxed mt-2 sm:mt-3 font-medium text-sm sm:text-base"
                variants={item}
              >
                With placement support, Arjun secured a job at a fintech startup. Six months later, he's leading a small team and saving for his MBA. For Arjun, Upskillab wasn't just a course — it was a bridge back into the workforce.
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        {/* What Makes Us Different */}
        <motion.section 
          className="mb-10 sm:mb-12 bg-white p-5 sm:p-6 rounded-lg shadow-sm"
          variants={section}
        >
          <motion.h2 
            className="text-xl sm:text-2xl font-semibold text-[#4D2C5E] mb-4 sm:mb-6 text-center"
            whileHover={{ x: 5 }}
          >
            What Makes Upskillab Different from Other Institutes
          </motion.h2>
          <motion.p 
            className="text-gray-700 mb-6 sm:mb-8 text-center leading-relaxed text-sm sm:text-base"
            variants={item}
          >
            We're not just another training platform. Upskillab is a movement to bring authentic learning, real-world skills, and ethical practice to learners across India.
          </motion.p>

          {/* Comparison Table */}
          <motion.div 
            className="overflow-x-auto rounded-lg border border-gray-200"
            variants={item}
          >
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-[#4D2C5E] text-white">
                  <th className="py-3 px-3 sm:px-4 text-left text-sm sm:text-base">Feature</th>
                  <th className="py-3 px-3 sm:px-4 text-left text-sm sm:text-base">Upskillab</th>
                  <th className="py-3 px-3 sm:px-4 text-left text-sm sm:text-base">Others</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Core Focus", upskillab: "Psychology Education + Wellbeing + Career Readiness + Technical & Professional Skills", others: "Courses, internships, or therapy only (no integration)" },
                  { feature: "Programs Offered", upskillab: "10+ structured programs across psychology, tech & professional fields", others: "Limited, single-domain courses" },
                  { feature: "Monthly Wellbeing Sessions", upskillab: "✅ Integrated into all offerings", others: "❌ Not provided" },
                  { feature: "1:1 Mentorship", upskillab: "✅ Certified mentors, live sessions", others: "⚠️ Limited support" },
                  { feature: "Internship Opportunities", upskillab: "✅ Clinical Psychology, Counselling, Tech, Business projects", others: "⚠️ Very limited or unpaid" },
                  { feature: "Job Guarantee & Career Support", upskillab: "✅ Placement assistance, resume building, interview prep", others: "⚠️ Basic or none" },
                  { feature: "Pay After Placement", upskillab: "✅ Yes – India's first job-guarantee + pay-after-placement skill programs", others: "❌ Not available" },
                  { feature: "Accreditation & Standards", upskillab: "✅ Aligned with IACP/NABP/ICSSR & industry experts", others: "⚠️ Mostly internal" },
                  { feature: "Post-Course Support", upskillab: "✅ Alumni network & continuous learning", others: "❌ No structured support" },
                  { feature: "Multi-Disciplinary Advantage", upskillab: "✅ Psychology + Tech + Marketing + Finance + Pharmacy", others: "❌ Narrow focus" },
                  { feature: "Ethical Standards & Empathy", upskillab: "✅ Core focus on ethics & empathy", others: "⚠️ Rarely emphasized" },
                ].map((row, index) => (
                  <motion.tr 
                    key={index}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    whileHover={{ backgroundColor: '#FFF5EF' }}
                  >
                    <td className="py-3 px-3 sm:px-4 font-medium text-[#4D2C5E] text-sm sm:text-base">{row.feature}</td>
                    <td className="py-3 px-3 sm:px-4 text-sm sm:text-base">{row.upskillab}</td>
                    <td className="py-3 px-3 sm:px-4 text-sm sm:text-base">{row.others}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.section>

        {/* The Need Section */}
        <motion.section 
          className="mb-10 sm:mb-12 bg-white p-5 sm:p-6 rounded-lg shadow-sm"
          variants={section}
        >
          <motion.h2 
            className="text-xl sm:text-2xl font-semibold text-[#4D2C5E] mb-3 sm:mb-4 flex items-center"
            whileHover={{ x: 5 }}
          >
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FF7426] rounded-full mr-2 sm:mr-3"></span>
            The Need for Upskillab in India
          </motion.h2>
          <motion.ul 
            className="list-disc pl-5 text-gray-700 space-y-2 text-sm sm:text-base"
            variants={item}
          >
            <li>High youth unemployment – Millions of graduates but few job-ready professionals.</li>
            <li>Mental health crisis – WHO projects India will account for 15% of global mental health burden by 2030.</li>
            <li>Skill gap in Tier-3 cities – Global certifications are either overpriced or inaccessible.</li>
            <li>Workplace emotional intelligence gap – Companies seek empathy, ethics, and problem-solving skills, rarely taught in traditional courses.</li>
          </motion.ul>
          <motion.p 
            className="text-gray-700 mt-3 sm:mt-4 leading-relaxed font-medium text-sm sm:text-base"
            variants={item}
          >
            Upskillab bridges this gap by combining psychology education, technical training, and professional skills with mentorship, career support, and ethical practice — everything a learner needs to become truly employable.
          </motion.p>
        </motion.section>

        {/* Our Promise Section */}
        <motion.section 
          className="mb-10 sm:mb-12 bg-[#FFF5EF] border border-[#FFD9C5] rounded-lg p-5 sm:p-6"
          variants={section}
        >
          <motion.h2 
            className="text-xl sm:text-2xl font-bold text-[#4D2C5E] mb-3 sm:mb-4"
            whileHover={{ x: 3 }}
          >
            Our Promise – Affordable Career-Focused Education in India
          </motion.h2>
          <motion.p 
            className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base"
            variants={item}
          >
            Whether you're curious about human behaviour, looking to advance your tech career, or wanting to become job-ready in a professional field, Upskillab equips you with knowledge, empathy, and hands-on expertise to make an impact.
          </motion.p>
          <motion.p 
            className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base"
            variants={item}
          >
            We're building a community of genuine learners and changemakers — not just certificate holders. By choosing Upskillab, you're not just investing in your career — you're becoming part of a movement to uplift India's workforce and mental wellbeing.
          </motion.p>
        </motion.section>

        {/* CTA Section */}
        <motion.div 
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold text-[#4D2C5E] mb-4 sm:mb-6 px-2"
            variants={item}
          >
            Join Upskillab Today – Start Your Career Transformation
          </motion.h2>
          <motion.p 
            className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg px-2"
            variants={item}
          >
            Be among the new generation of skilled, ethical, and empathetic professionals India needs.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block px-6 py-3 sm:px-8 sm:py-3 bg-[#4D2C5E] text-white rounded-md hover:bg-[#3A2250] transition-colors text-base sm:text-lg font-medium shadow-md">
              Start Your Journey Today
            </button>
          </motion.div>
          <motion.p 
            className="text-gray-600 mt-6 sm:mt-8 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Be the change our country is waiting for.
          </motion.p>
        </motion.div>

        {/* Decorative elements - hidden on small screens */}
        <motion.div 
          className="hidden sm:block fixed top-20 right-20 w-2 h-2 rounded-full bg-[#FF7426]"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
            transition: { repeat: Infinity, duration: 3 }
          }}
        />
        <motion.div 
          className="hidden sm:block fixed bottom-20 left-20 w-3 h-3 rounded-full bg-[#4D2C5E]"
          animate={{
            y: [0, -15, 0],
            transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
          }}
        />
      </div>

      <Helmet>
        <title>Why Choose Upskillab | Best Online Learning Platform in India</title>
        <meta name="description" content="Discover why Upskillab is India's best online learning platform for psychology, tech skills, and professional development with success stories and job guarantees." />
        <meta name="keywords" content="upskillab, online learning India, psychology courses, tech courses, professional skills, pay after placement, job guarantee" />
        <link rel="canonical" href="https://upskillab.com/why-upskillab" />
      </Helmet>
      <AdmissionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
};

export default WhyUpskillab;