import React, { useState } from 'react'
import ImageCarousel from '../../components/ImageCarousel'
import { FiArrowRight } from 'react-icons/fi';
import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import FAQ from '../../components/FAQ'
import StudentFeedBack from '../../components/Cards/StudentFeedBack'
import CardsContainer from '../../components/Cards/CardContainer'
import CarouselContainer from '../../components/Carouselcard'
import CourseCards from '../../components/Courses/CourseCards'
import EnqueryBanner from '../../components/banners/EnqueryBanner'
import EducationBanner from '../../components/banners/EducationBanner'
import ScrollableCategories from '../../components/Cards/Categories'
import SuccessTestimonial from '../../components/testimonial/SuccessTestimonial '
import StudentTestimonials from '../../components/testimonial/StudentsTestimonial'
import AdmissionForm from '../../components/Forms/AdmissionForm'
import { getDataHandler } from '../../config/services';
import CertificationSlider from '../../components/CertificationSlider';
import { Faqs } from '../../data';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AdmissionFormModal from '../../components/Modal/BasicEnrollNowModal';
function Home() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [banner, setBanner] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //For primiun banner
  const handleBanners = async () => {

    const res = await getDataHandler('premiumBanner');
    setBanner(res.premiumLearningExperiences[0]);
  }
  useEffect(() => {
    handleBanners();
  }, []);
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };



  const faqs = [
    {
        question: "What Upskillab wants to give you?",
        answer: "Upskillab wants to empower you with industry-ready skills, personalized mentorship, and mental wellness support—so you don't just grow in your career, but thrive as a whole individual."
    },
    {
        question: "Why choose us for education?",
        answer: `<p>Because we don't just teach—you grow, transform, and succeed with us.</p>
        <p>At Upskillab, we offer more than just courses:</p>
        <ul>
          <li>✅ Industry-verified curriculum designed with hiring partners</li>
          <li>✅ Career mentorship by certified professionals</li>
          <li>✅ Job guarantees or interview opportunities for select programs</li>
          <li>✅ Real-world projects, hackathons, and case-based learning</li>
          <li>✅ Mental wellbeing sessions & psychological support—because your mind matters too</li>
          <li>✅ Post-course career assistance for up to a year</li>
          <li>✅ Flexible learning formats for working professionals and students alike</li>
        </ul>
        <p>We're building the bridge between education, employment, and emotional wellbeing—so your success is not just professional, but personal too.</p>`
    },
    {
        question: "Only at Upskillab?",
        answer: `<p>Unlike other platforms, Upskillab combines technical upskilling with:</p>
        <ul>
          <li>Holistic guidance</li>
          <li>Mental wellness support</li>
          <li>Post-course career assistance</li>
          <li>Personalized mentorship</li>
        </ul>
        <p>Get certified. Get mentored. Get hired. Stay balanced.</p>`
    },
    {
        question: "Do I get a certificate after completing the course?",
        answer: "Yes. Upon successful completion, you will receive an industry-recognized certificate, which can be verified and added to your professional profile."
    },
    {
        question: "Do these programs guarantee a job?",
        answer: "Certain programs come with a Job Guarantee or Guaranteed Interview Calls post successful completion, depending on the course structure and eligibility."
    },
    {
        question: "What is the Career Mentorship Program?",
        answer: "It's a personalized mentorship initiative where learners receive 1-on-1 guidance from certified career counselors to plan, pivot, or grow their careers with confidence."
    },
    {
        question: "What is the 'Helping Hand / Connect+' feature?",
        answer: "Helping Hand (Connect+) is our 1-year post-course career support system, ensuring learners have access to networking, job referrals, guidance, and additional resources even after course completion."
    },
    {
        question: "Are there mental wellbeing sessions included?",
        answer: "Yes. We provide monthly mental wellbeing sessions and free psychological counseling, because we believe in nurturing both the mind and career."
    },
    {
        question: "What is the learning format?",
        answer: `<p>Courses are delivered through:</p>
        <ul>
          <li>Live instructor-led sessions</li>
          <li>Recorded video lectures</li>
          <li>Hands-on projects & case studies</li>
          <li>Peer & mentor interaction forums</li>
        </ul>`
    },
    {
        question: "Can working professionals enroll?",
        answer: "Absolutely. All our programs are designed with flexibility in mind for students, working professionals, and career switchers."
    },
    {
        question: "How can I enroll in a course?",
        answer: "You can enroll directly through our website or connect with our academic advisors for free counseling before choosing the right program."
    },
    {
        question: "Is there EMI or financial assistance available?",
        answer: "Yes. We offer flexible EMI options and financial aid for eligible candidates. Please speak with our counselors for detailed options."
    }
];
  return (
    <>
      <div className='min-h-fit'>
        <CarouselContainer />
      </div>
      
      
      <div className=''>
        <ImageCarousel />
      </div>
      <div className="bg-[url('/images/bgStars.png')] bg-cover bg-center">
        <StudentFeedBack />
      </div>
      <div className=''>
        <StudentTestimonials />
      </div>
      <div className='w-full bg-[#FDF8EE] font-roboto overflow-hidden'>
        <div className='max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 md:py-12 lg:py-16'>
          <div className='flex flex-col lg:flex-row items-center justify-center gap-8 xl:gap-12 2xl:gap-16'>
            {/* Animated Image Column */}
            <motion.div
              className='w-full lg:w-[50%] flex justify-center relative'
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src={banner?.imageUrl}
                alt={banner?.title}
                className='w-full object-contain max-h-[400px] z-10 rounded-2xl sm:rounded-4xl'
                whileHover={{
                  scale: 1.05,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: .3 }
                }}
              />
              {/* Floating background elements */}
              <motion.div
                className="absolute -z-0 w-[120%] h-[120%]"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-[#FF7426]/20"></div>
                <div className="absolute top-3/4 left-1/3 w-24 h-24 rounded-full bg-[#4D2C5E]/15"></div>
                <div className="absolute top-2/3 right-1/4 w-20 h-20 rounded-full bg-[#FF7426]/15"></div>
              </motion.div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              className='w-full lg:w-[50%] flex flex-col xl:flex-row items-center lg:items-start gap-8 xl:gap-12'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Main Heading + Features */}
              <div className='flex-1 max-w-[600px] 2xl:max-w-[700px]'>
                <motion.h1
                  className='text-3xl sm:text-4xl md:text-5xl xl:text-[3.25rem] 2xl:text-[3.75rem] font-bold leading-tight md:leading-snug'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Safe rendering with fallback */}
                  {banner.title ? (
                    banner?.title.split(' ').map((word, index) => (
                      <React.Fragment key={index}>
                        <motion.span
                          className={index === 1 ? 'text-[#FF7426]' : ''}
                          whileHover={index === 1 ? { scale: 1.05 } : {}}
                        >
                          {word}
                        </motion.span>
                        {index < banner.title.split(' ').length - 1 && ' '}
                      </React.Fragment>
                    ))
                  ) : (
                    <>
                      Premium <span className='text-[#FF7426]'>Learning</span> Experience
                    </>
                  )}
                </motion.h1>

                <div className='mt-8 sm:mt-10 md:mt-12 space-y-4 sm:space-y-5'>
                  {/* Feature 1 */}
                  <motion.div
                    className='flex gap-4 sm:gap-5 items-start'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className='flex-shrink-0 bg-[#4D2C5E] p-3 sm:p-4 rounded-lg'
                      whileHover={{ scale: 1.1 }}
                    >
                      <img
                        src="/images/heartImage.png"
                        alt="Accessible"
                        className='w-8 h-8 sm:w-10 sm:h-10'
                      />
                    </motion.div>
                    <div>
                      <h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-800'>
                        Easily Accessible
                      </h2>
                      <p className='text-gray-600 text-sm sm:text-base mt-1'>
                        Learning will feel very comfortable with Upskillab.
                      </p>
                    </div>
                  </motion.div>

                  {/* Feature 2 */}
                  <motion.div
                    className='flex gap-4 sm:gap-5 items-start'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.div
                      className='flex-shrink-0 bg-[#4D2C5E] p-3 sm:p-4 rounded-lg'
                      whileHover={{ scale: 1.1 }}
                    >
                      <img
                        src="/images/heartImage.png"
                        alt="Comfortable"
                        className='w-8 h-8 sm:w-10 sm:h-10'
                      />
                    </motion.div>
                    <div>
                      <h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-800'>
                        Comfortable Learning
                      </h2>
                      <p className='text-gray-600 text-sm sm:text-base mt-1'>
                        Enjoy a seamless educational journey with our platform.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Animated Arrow Image */}
              <motion.div
                className='hidden xl:flex flex-shrink-0 self-center 2xl:self-start'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.img
                  src="/images/Arrow.png"
                  alt="Arrow"
                  className='h-[120px] xl:h-[150px] 2xl:h-[180px] object-contain'
                  animate={{
                    y: [0, 15, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <CourseCards />

      <CardsContainer />
      


      <div>
        <EnqueryBanner/>
      </div>
      
      <div className=''>
        <ScrollableCategories />
      </div>
        <SuccessTestimonial />
      <CertificationSlider/>
      <EducationBanner />
      <div className='pb-4'>
        <AdmissionForm />
      </div>
      <FAQ faqs={faqs} />

      <div className="bg-[#f7e4be] pt-3" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#f7e4be] rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side - Text Content */}
              <motion.div
                className="p-8 md:p-12 flex flex-col justify-center"
                initial="hidden"
                animate={controls}
                variants={containerVariants}
                exit="hidden"
              >
                <motion.div className="mb-2" variants={itemVariants}>
                  <p className="text-2xl font-medium text-gray-700">
                    <span className='text-[#FF7426]'>G</span>et In Touch
                  </p>
                </motion.div>

                <motion.div className="mb-6" variants={itemVariants}>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    For Queries, Feedback or Assistance
                  </h2>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <NavLink to='/ContactUs'>
                    <motion.button
                      className="bg-[#4d2c5e] hover:bg-[#3a2148] text-white font-bold py-3 px-6 rounded-4xl transition-all duration-300 flex items-center cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Contact Us <FiArrowRight className="ml-2" />
                    </motion.button>
                  </NavLink>
                </motion.div>
              </motion.div>

              {/* Right Side - Image */}
              <motion.div
                className="hidden md:block relative bg-[#f7e4be]"
                initial="hidden"
                animate={controls}
                variants={imageVariants}
                exit={{ opacity: 0, x: 100, transition: { duration: 0.5 } }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.img
                    src="/images/Contact.png"
                    alt="Contact us illustration"
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>

              <div className="fixed bottom-4 right-0 flex justify-center md:hidden z-40 px-4">
    <motion.button
    onClick={() => setIsModalOpen(true)}
      className="bg-[#FF7426] text-sm hover:bg-[#e56722] text-white font-bold py-2 px-4 rounded-full shadow-lg w-full max-w-md flex items-center justify-center"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      Enroll Now <FiArrowRight className="ml-2" />
    </motion.button>
  </div>
            </div>
          </div>
        </div>
      </div>

<AdmissionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />


<Helmet>
  <title>Upskillab | Empowering Your Career Through Online Learning</title>
  <meta name="description" content="Upskillab offers a variety of online courses to help you upskill and advance your career. Join our community of learners today." />
  <meta name="keywords" content="upkillab, upskilllab, upskilling, upskill lab, online upskillab, online education upskillab, education upskillab, online learning, career development, education online courses" />
  <meta property="og:title" content="Upskillab | Empowering Your Career Through Online Learning" />
  <meta property="og:description" content="Join Upskillab to access a wide range of online courses designed to boost your skills and career prospects." />
  <meta property="og:url" content="https://upskillab.com" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Upskillab | Empowering Your Career Through Online Learning" />
  <meta name="twitter:description" content="Explore Upskillab's online courses to enhance your skills and career opportunities." />
</Helmet>



    </>
  )
}

export default Home
