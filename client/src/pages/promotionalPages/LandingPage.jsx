import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaHourglassHalf,FaGraduationCap,FaGift,FaScroll,FaUserMd,FaTools,FaChartLine,FaMoneyBillWave,FaCalendarAlt  } from "react-icons/fa";
import PramotianalModal from '../../components/Modal/pramotianalModal';
import { getDataHandler } from '../../config/services';
const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroSection,setHerSection] = useState({})
  const [eligibility,seteligibility] = useState({})
  const [curriculum,setCurriculum] = useState({})
  const [speaker,setSpeaker] = useState({})
  const [train,setTrain] = useState({})
  const [datetime,setDatetime] = useState({})
  useEffect(()=>{
  const bootcampDataHandler= async ()=>{
    const getBootcamp = await getDataHandler('getBootCamp')
    if(getBootcamp && getBootcamp.hero[0]){
      setHerSection(getBootcamp.hero[0])
    }
     if(getBootcamp && getBootcamp.eligibility[0]){
      seteligibility(getBootcamp.eligibility[0])
    }
     if(getBootcamp && getBootcamp.curriculum[0]){
      setCurriculum(getBootcamp.curriculum[0])
    }
     if(getBootcamp && getBootcamp.speaker[0]){
      setSpeaker(getBootcamp.speaker[0])
    }
     if(getBootcamp && getBootcamp.train[0]){
      setTrain(getBootcamp.train[0])
    }
     if(getBootcamp && getBootcamp.datetime[0]){
      setDatetime(getBootcamp.datetime[0])
    }
  }
  console.log(heroSection)
  bootcampDataHandler()
   },[])
  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-50 to-gray-100">
      <Helmet>
        <title>{heroSection.title}</title>
        <meta name="description" content={heroSection.des}/>
      </Helmet>

      {/* Hero Section */}
     <section className="relative min-h-screen pt-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
  {/* Animated Background Elements */}
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-gradient-to-r from-[#4D2C5E]/10 to-[#7B4B9E]/10 blur-xl"
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-[#FF7426]/10 to-[#FF8C42]/10 blur-xl"
      animate={{
        y: [0, 15, 0],
        x: [0, -15, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    />
    <motion.div
      className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-[#4D2C5E]/5 to-[#7B4B9E]/5 blur-lg"
      animate={{
        y: [0, -15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
    />
    <div className="absolute inset-0 opacity-[0.02]">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(#4D2C5E 1px, transparent 1px), linear-gradient(90deg, #4D2C5E 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }} />
    </div>
  </div>

  {/* Main Content */}
  <div className="max-w-7xl mx-auto text-center relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Animated Badge */}
      <motion.div
        className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-green-200/50 shadow-lg mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.15)" }}
      >
        <motion.span
          className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-sm font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          {heroSection.sec}
        </span>
      </motion.div>

      {/* Main Headline with Typing Effect */}
     <div className="mb-8">
  <motion.h1
    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    {(() => {
      const words = heroSection?.title?.split(" ") || [];
      return (
        <>
          {words.slice(0, 4).join(" ")}{" "}
          <motion.span
            className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            style={{ backgroundSize: "200% auto" }}
          >
            {words[4]}
          </motion.span>{" "}
          {words[5]}{" "}
          <motion.span
            className="bg-gradient-to-r from-[#FF7426] to-[#FF8C42] bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            style={{ backgroundSize: "200% auto" }}
          >
            {words.slice(6, 8).join(" ")}
          </motion.span>
        </>
      );
    })()}
  </motion.h1>
</div>


      {/* Sub-Headline */}
     <motion.p
  className="text-xl sm:text-2xl md:text-3xl text-gray-600 max-w-5xl mx-auto mb-12 leading-relaxed font-light"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.6 }}
>
  {(() => {
    const text = heroSection?.des || "";
    const words = text.split(" ");

    return (
      <>
        {/* First Normal Words */}
        {words.slice(0, 8).join(" ")}{" "}

        {/* Purple Animated Words */}
        <motion.span
          className="font-semibold text-[#4D2C5E]"
          animate={{ color: ['#4D2C5E', '#7B4B9E', '#4D2C5E'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {words.slice(8, 10).join(" ")}
        </motion.span>{" "}

        {/* Middle Normal Words */}
        {words.slice(10, 13).join(" ")}{" "}

        {/* Orange Animated Words */}
        <motion.span
          className="font-semibold text-[#FF7426]"
          animate={{ color: ['#FF7426', '#FF8C42', '#FF7426'] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          {words.slice(13, 17).join(" ")}
        </motion.span>{" "}

        {/* Remaining Words */}
        {words.slice(17).join(" ")}
      </>
    );
  })()}
</motion.p>


      {/* Floating Feature Cards */}
<motion.div
  className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.8 }}
>
  {heroSection?.tags?.map((tag, index) => (
    <motion.div
      key={index}
      className="flex flex-col items-center justify-center border-2 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        backgroundColor: "rgba(255, 255, 255, 0.9)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-sm font-medium text-gray-700 text-center leading-tight">
        {tag}
      </span>
    </motion.div>
  ))}
</motion.div>

      {/* Animated CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.button
        onClick={() => setIsModalOpen(true)}
          className="group relative bg-gradient-to-r from-[#FF7426] to-[#FF8C42] text-white p-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden"
          whileHover={{ 
            scale: 1.05,
            background: "linear-gradient(45deg, #FF7426, #FF8C42, #FF7426)",
            backgroundSize: "200% 200%"
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            backgroundPosition: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        >
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          
          <span className="relative cursor-pointer z-10 flex items-center justify-center gap-1">
           <FaGraduationCap className='text-[#4D2C5E] hidden sm:flex'/> {heroSection.button}
          </span>
        </motion.button>


        <motion.p
          className="text-gray-500 text-sm mt-6 flex justify-center items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <FaHourglassHalf/> {heroSection?.para}
        </motion.p>
      </motion.div>
    </motion.div>
  </div>
</section>

      <section className="py-10 sm:py-12 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              {eligibility.sec}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Problem Points */}
              <div className="space-y-6">
                {eligibility?.que?.map((problem, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-red-500 text-sm font-bold">!</span>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">{problem}</p>
                  </div>
                ))}
              </div>

              {/* Solution Card */}
              <div className="bg-gradient-to-br from-[#4D2C5E] to-[#7B4B9E] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{eligibility?.title}</h3>
                <p className="text-lg mb-6 opacity-90">
                  {eligibility?.description}
                </p>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="font-semibold">{eligibility?.thought}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-10 sm:py-12 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              {curriculum.title}
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              {curriculum.description}
            </p>

           <div className="grid lg:grid-cols-2 gap-8">
  {curriculum?.curriculums?.map((day, index) => {
    // Define colors based on day number
    const colors = {
      1: { bg: 'bg-blue-100', text: 'text-blue-600', dot: 'bg-blue-500' },
      2: { bg: 'bg-green-100', text: 'text-green-600', dot: 'bg-green-500' },
      3: { bg: 'bg-purple-100', text: 'text-purple-600', dot: 'bg-purple-500' },
      4: { bg: 'bg-orange-100', text: 'text-orange-600', dot: 'bg-orange-500' },
      5: { bg: 'bg-red-100', text: 'text-red-600', dot: 'bg-red-500' },
      6: { bg: 'bg-indigo-100', text: 'text-indigo-600', dot: 'bg-indigo-500' },
      7: { bg: 'bg-pink-100', text: 'text-pink-600', dot: 'bg-pink-500' }
    };
    
    const color = colors[day.day] || colors[1]; // Fallback to day 1 colors
    
    return (
      <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center mb-6">
          <div className={`w-12 h-12 ${color.bg} rounded-xl flex items-center justify-center mr-4`}>
            <span className={`${color.text} font-bold text-xl`}>{day.day}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{day.title}</h3>
            <p className="text-gray-600">{day.des}</p>
          </div>
        </div>

        <ul className="space-y-4">
          {day.info.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-start">
              <span className={`w-2 h-2 ${color.dot} rounded-full mt-2 mr-3 flex-shrink-0`}></span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  })}
</div>
          </motion.div>
        </div>
      </section>

      {/* Experts Section */}
      <section id="experts" className="py-16 sm:py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              {speaker.title}
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              {speaker.description}
            </p>

<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
  {speaker?.profile?.map((expert, index) => {
    // Define colors based on index for alternating colors
    const colors = index % 2 === 0 ? {
      border: 'border-[#4D2C5E]',
      text: 'text-[#4D2C5E]'
    } : {
      border: 'border-[#FF7426]',
      text: 'text-[#FF7426]'
    };

    return (
      <div key={index} className="text-center">
        <motion.img 
          className={`w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg border-2 ${colors.border}`} 
          src={expert.image} 
          alt={expert.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        />
        <h3 className="text-xl font-bold text-gray-900 mb-2">{expert.name}</h3>
        <p className={`${colors.text} font-semibold mb-4`}>{expert.profession}</p>
        <p className="text-gray-600">{expert.experience}</p>
      </div>
    );
  })}
</div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              {train?.title}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
  {train?.cards?.map((feature, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="text-3xl mb-4 flex justify-center">{feature.icon}</div>
      <h3 className="font-bold text-gray-900 mb-3">{feature.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  ))}
</div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-10 sm:py-15 bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Don't Miss Out!
            </h2>

            <motion.div
        className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {/* Date & Time Card */}
        <motion.div
          className="group relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
            <motion.div
              className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center text-2xl text-white mb-4 mx-auto shadow-lg"
            >
              <FaCalendarAlt />
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-3">Dates & Time</h3>
            <div className="space-y-2">
              <p className="text-white/90 text-lg font-semibold">{datetime.date}</p>
              <p className="text-white/80">{datetime.time}</p>
            </div>
          </div>
        </motion.div>

        {/* Price Card */}
        <motion.div
          className="group relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF7426]/20 to-[#FF8C42]/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-[#FF7426] to-[#FF8C42] rounded-2xl flex items-center justify-center text-2xl text-white mb-4 mx-auto shadow-lg"
            >
              <FaMoneyBillWave />
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-3">Price</h3>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-white">{datetime.price}</p>
              <p className="text-white/80 text-sm">{datetime.slot}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

            <motion.button
            onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r flex justify-center items-center gap-2 mx-auto cursor-pointer from-[#FF7426] to-[#FF8C42] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <FaGraduationCap className='hidden sm:flex'/> {datetime.button}
            </motion.button>

            <p className="text-white/80 mt-4 text-sm">Secure your spot before it's gone!</p>
          </motion.div>
        </div>
      </section>
      <PramotianalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subjectName="Habits & Nutrition Psychology Bootcamp"
        where="postPramotional"
      />
    </div>
  );
};

export default LandingPage;
