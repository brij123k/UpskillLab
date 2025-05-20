import React, { useEffect,useState  } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WallOfFame from '../../components/Cards/WallOfFame';
import SuccessStoriesCarousel from '../../components/SuccessStoriesCarousel';
import TrainingBanner from '../../components//banners/TrainingBanner';
import FeedbaackBanner from '../../components/banners/FeedbackBanner';
import { getDataHandler } from '../../config/services';
import { Helmet } from 'react-helmet-async';
const SuccessStory = () => {
  const [story, setStory] = useState([]);
  const [activeStat, setActiveStat] = useState(0);
  const controls = useAnimation();

  const handleStory = async () => {
  
    const res = await getDataHandler('successStroy');
    setStory(res.stories[0]);
  }
    useEffect(() => {
      handleStory();
    }, []);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const bannerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "anticipate"
      }
    }
  };


  const stats = [
    {
      title: "Careers Advanced",
      value: "5 Million+",
      description: "Our programs have helped transform careers across industries",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Report Career Impact",
      value: "85%",
      description: "Of alumni report significant career advancement within 12 months",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Career Options",
      value: "100+",
      description: "Different career paths available through our programs",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];



  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Animated Success Stories Banner */}
      <motion.div 
  ref={ref}
  initial="hidden"
  animate={controls}
  variants={bannerVariants}
  className="w-full bg-gradient-to-br from-[#4D2C5E] to-[#7B4B9E] py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
>
  {/* Floating decorative elements */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10">
    <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-[#FF7426] mix-blend-multiply"></div>
    <div className="absolute bottom-10 right-32 w-32 h-32 rounded-full bg-[#FF7426] mix-blend-multiply"></div>
  </div>

  <div className="max-w-8xl mx-auto relative z-10">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
      {/* Text Content */}
      <motion.div 
        variants={itemVariants}
        className="lg:w-1/2 space-y-6 text-white"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
        >
          <span className="block mb-2">From Learning</span>
          <span className="block text-[#FF7426] drop-shadow-[0_2px_4px_rgba(77,44,94,0.3)]">
            To Earning
          </span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg max-w-2xl text-white/90"
        >
          Discover how our students transformed their careers through Upskillab programs.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-[#FFB74D]/30 hover:border-[#FFA726] transition-all duration-300"
        >
          <motion.blockquote 
  variants={itemVariants}
  className="italic text-base text-white/90"
>
  {story?.description 
    ? `${story.description}:`
    : '"The Full Stack Development program gave me...'
  }
</motion.blockquote>
          <motion.div 
            variants={itemVariants}
            className="mt-3 font-medium flex items-center"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFA726] to-[#FB8C00] mr-2 overflow-hidden shadow-md">
              <img 
                src={story?.userImageUrl?`${story?.userImageUrl}`:"https://randomuser.me/api/portraits/women/42.jpg" }
                alt={story?.name?`${story?.name}`:"Student" }
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white/90">
              <div className="text-sm">{story?.name?`${story?.name}`:"Ananya Patel" }</div>
              <div className="text-xs opacity-90">{story?.jobTitle} at {story?.companyName}</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Image with Animation */}
      <motion.div 
        variants={imageVariants}
        className="lg:w-1/2 flex justify-center relative"
      >
        <div className="relative w-full">
          <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-[#FF7426]/20 z-0"></div>
          <motion.img 
            whileHover={{ scale: 1.03 }}
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="Successful students celebrating"
            className="relative rounded-xl w-full h-auto object-cover shadow-2xl z-10 border-4 border-white"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute -bottom-4 -right-4 bg-white text-[#4D2C5E] px-4 py-2 rounded-lg shadow-lg font-bold z-30 border-2 border-[#FF7426]"
          >
            <div className="text-xs">Average Salary</div>
            <div className="text-xl text-[#FF7426]">₹12.5 LPA</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
</motion.div>
      

      {/* driven Career section  */}
      <section className="py-8 md:py-10 px-4 sm:px-6 bg-white">
  <div className="max-w-4xl 2xl:max-w-6xl mx-auto">
    <motion.h2 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="text-xl sm:text-2xl 2xl:text-4xl font-bold text-center mb-6 sm:mb-8 2xl:mb-10 text-[#4d2c5e]"
    >
      Driving <span className="text-[#FF7426]">Career Impact</span>
    </motion.h2>

    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 2xl:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          onClick={() => setActiveStat(index)}
          className={`cursor-pointer p-3 sm:p-4 2xl:p-6 rounded-lg transition-all duration-200 flex flex-col items-center text-center ${
            activeStat === index 
              ? 'bg-[#FFF5EF] border border-[#FFB38A] shadow-sm' 
              : 'bg-gray-50 hover:bg-[#FFF5EF] border border-gray-200'
          }`}
        >
          <div className={`text-xl sm:text-2xl 2xl:text-3xl mb-1 sm:mb-2 2xl:mb-3 ${
            activeStat === index ? 'text-[#FF7426]' : 'text-gray-600'
          }`}>
            {stat.icon}
          </div>
          <motion.div
            animate={{ 
              color: activeStat === index ? '#FF7426' : '#4B5563'
            }}
            className="text-xl sm:text-2xl 2xl:text-3xl font-bold mb-1 2xl:mb-2"
          >
            {stat.value}
          </motion.div>
          <motion.h3
            animate={{ 
              color: activeStat === index ? '#FF7426' : '#111827'
            }}
            className="text-xs sm:text-sm 2xl:text-base font-semibold mb-1 2xl:mb-2"
          >
            {stat.title}
          </motion.h3>
          <motion.p
            animate={{ 
              color: activeStat === index ? '#7F4B2A' : '#6B7280'
            }}
            className="text-xs 2xl:text-sm"
          >
            {stat.description}
          </motion.p>
        </motion.div>
      ))}
    </div>

    {/* Mini progress bar */}
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      viewport={{ once: true }}
      className="mt-6 sm:mt-8 2xl:mt-10 bg-gray-100 rounded-full h-1.5 sm:h-2 overflow-hidden max-w-[200px] xs:max-w-xs 2xl:max-w-sm mx-auto"
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "85%" }}
        transition={{ duration: 1.2, delay: 0.1 }}
        viewport={{ once: true }}
        className="h-full bg-gradient-to-r from-[#FF9142] to-[#FF7426] rounded-full"
      />
    </motion.div>
  </div>
</section>


    <SuccessStoriesCarousel />
        <WallOfFame />
    

        <TrainingBanner/>
        <FeedbaackBanner/>

        <Helmet>
  <title>Upskillab Success Stories | Transforming Careers Through Learning</title>
  <meta name="description" content="Read inspiring success stories of individuals who advanced their careers through Upskillab's online courses." />
  <meta name="keywords" content="Upskillab success stories, career transformation, online learning impact, student testimonials" />
  <meta property="og:title" content="Upskillab Success Stories | Transforming Careers Through Learning" />
  <meta property="og:description" content="Discover how Upskillab's online courses have helped individuals achieve their career goals." />
  <meta property="og:url" content="https://upskillab.com/success-stories" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Upskillab Success Stories | Transforming Careers Through Learning" />
  <meta name="twitter:description" content="Explore real-life success stories from Upskillab learners who have transformed their careers." />
</Helmet>

    </div>
  );
};

export default SuccessStory;