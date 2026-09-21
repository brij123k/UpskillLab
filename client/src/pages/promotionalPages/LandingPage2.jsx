import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaHourglassHalf, FaGraduationCap, FaGift, FaScroll, FaUserMd, FaTools, FaChartLine, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import PramotianalModal from '../../components/Modal/pramotianalModal';
import { getDataHandler } from '../../config/services';

// Helper function to render HTML content safely
const renderHTMLContent = (htmlString) => {
  if (!htmlString) return null;
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

// Component to render text with HTML highlighting
const HighlightedText = ({ text, className = "" }) => {
  if (!text) return null;

  const containsHTML = /<[^>]*>/.test(text);

  if (containsHTML) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: text }} />;
  }

  return <span className={className}>{text}</span>;
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroSection, setHerSection] = useState({});
  const [eligibility, seteligibility] = useState({});
  const [curriculum, setCurriculum] = useState({});
  const [speaker, setSpeaker] = useState({});
  const [train, setTrain] = useState({});
  const [datetime, setDatetime] = useState({});

  useEffect(() => {
    const bootcampDataHandler = async () => {
      const getBootcamp = await getDataHandler('getBootCamp');
      if (getBootcamp && getBootcamp.hero[0]) {
        setHerSection(getBootcamp.hero[0]);
      }
      if (getBootcamp && getBootcamp.eligibility[0]) {
        seteligibility(getBootcamp.eligibility[0]);
      }
      if (getBootcamp && getBootcamp.curriculum[0]) {
        setCurriculum(getBootcamp.curriculum[0]);
      }
      if (getBootcamp && getBootcamp.speaker[0]) {
        setSpeaker(getBootcamp.speaker[0]);
      }
      if (getBootcamp && getBootcamp.train[0]) {
        setTrain(getBootcamp.train[0]);
      }
      if (getBootcamp && getBootcamp.datetime[0]) {
        setDatetime(getBootcamp.datetime[0]);
      }
    };
    bootcampDataHandler();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{heroSection.title}</title>
        <meta name="description" content={heroSection.des} />
      </Helmet>

      {/* Top Banner — Fixed Aspect Ratio */}
<motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
  className="relative w-full bg-gray-100"
>
  {/* Fixed 16:6 ratio for all breakpoints */}
  <div className="relative w-full aspect-[16/6] overflow-hidden">
    <img
      src="/images/bootcampImage.png"
      alt="Bootcamp Banner"
      className="absolute inset-0 w-full h-full object-contain object-center"
    />

    {/* Banner Text Overlay */}
    <div className="absolute inset-0 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-lg"
        >
          {/* <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            Transform Your Practice
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Join the Habits & Nutrition Psychology Bootcamp
          </p> */}
        </motion.div>
      </div>
    </div>
  </div>
</motion.section>

      {/* Hero Section */}
<section className="relative min-h-fit flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 overflow-hidden bg-white">
  {/* Background Layers */}
  <div className="absolute inset-0 pointer-events-none">
    {/* Soft gradient orbs - smaller on mobile */}
    <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-br from-[#4D2C5E]/8 to-transparent blur-3xl" />
    <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-[220px] h-[220px] sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-tr from-[#FF7426]/8 to-transparent blur-3xl" />

    {/* Fine grid pattern - smaller grid on mobile */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: `linear-gradient(#4D2C5E 1px, transparent 1px), linear-gradient(90deg, #4D2C5E 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }}
    />

    {/* Bottom fade */}
    <div className="absolute inset-x-0 bottom-0 h-20 sm:h-32 bg-gradient-to-t from-white to-transparent" />
  </div>

  <div className="max-w-7xl mx-auto w-full relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
      {/* LEFT — Content */}
      <motion.div
        className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1 px-1 sm:px-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-4 sm:mb-6 lg:mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.span
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full mr-2 sm:mr-2.5"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[10px] sm:text-xs lg:text-sm font-semibold text-emerald-700 tracking-wide uppercase">
            {heroSection.sec}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-5 lg:mb-6 leading-[1.15] sm:leading-[1.1] tracking-tight px-1 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <HighlightedText text={heroSection?.title} />
        </motion.h1>

        {/* Sub-Headline */}
        <motion.div
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 lg:mb-10 leading-relaxed font-light px-2 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <HighlightedText text={heroSection?.des} />
        </motion.div>

        {/* Feature Tags */}
        <motion.div
          className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-2.5 lg:gap-3 mb-6 sm:mb-8 lg:mb-10 px-1 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {heroSection?.tags?.map((tag, index) => (
            <motion.span
              key={index}
              className="inline-flex items-center px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-gray-50 rounded-lg border border-gray-200/80 text-[10px] sm:text-xs lg:text-sm font-medium text-gray-700 hover:bg-white hover:border-[#4D2C5E]/30 hover:shadow-sm transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
              whileHover={{ y: -2 }}
            >
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#4D2C5E] rounded-full mr-1.5 sm:mr-2" />
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col items-center lg:items-start px-2 sm:px-0"
        >
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="group relative bg-[#4D2C5E] text-white px-6 sm:px-7 lg:px-9 py-3 sm:py-3.5 lg:py-4 rounded-xl font-semibold text-xs sm:text-sm lg:text-base shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden w-full sm:w-auto max-w-xs sm:max-w-none"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#4D2C5E] via-[#6B3FA0] to-[#4D2C5E]"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FaGraduationCap className="text-sm sm:text-base lg:text-lg opacity-90" />
              {heroSection.button}
            </span>
          </motion.button>

          <motion.p
            className="text-gray-400 text-[10px] sm:text-xs lg:text-sm mt-3 sm:mt-4 flex items-center justify-center lg:justify-start gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <FaHourglassHalf className="text-[10px] sm:text-xs" />
            {heroSection?.para}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* RIGHT — Visual Card */}
      <motion.div
        className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end px-2 sm:px-4 lg:px-0"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-full max-w-[320px] sm:max-w-md">
          {/* Decorative glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4D2C5E]/20 to-[#FF7426]/20 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl scale-95" />

          {/* Main card */}
          <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#4D2C5E] to-[#6B3FA0] flex items-center justify-center">
                  <FaGraduationCap className="text-white text-[10px] sm:text-xs lg:text-sm" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] lg:text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Bootcamp
                  </p>
                  <p className="text-[10px] sm:text-[11px] lg:text-xs font-bold text-gray-900">Live Program</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-50 border border-emerald-100">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-semibold text-emerald-700">OPEN</span>
              </span>
            </div>

            {/* Highlights */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-3.5">
              {heroSection?.tags?.slice(0, 4).map((tag, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl bg-gray-50/80 border border-gray-100 hover:bg-white hover:border-[#4D2C5E]/20 transition-all duration-200"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-md sm:rounded-lg bg-[#4D2C5E]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#4D2C5E] text-[8px] sm:text-[9px] lg:text-[10px] font-bold">✓</span>
                  </div>
                  <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-gray-700 truncate">
                    {tag}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Card footer */}
            <div className="mt-4 sm:mt-5 lg:mt-6 pt-3 sm:pt-4 lg:pt-5 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[8px] sm:text-[9px] lg:text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Duration
                </p>
                <p className="text-[10px] sm:text-xs lg:text-sm font-bold text-gray-900">Limited Seats</p>
              </div>
              {/* <div className="flex -space-x-1.5 sm:-space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full border-2 border-white bg-gradient-to-br from-[#4D2C5E] to-[#6B3FA0]"
                  />
                ))}
                <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                  <span className="text-[7px] sm:text-[8px] lg:text-[9px] font-bold text-gray-600">+</span>
                </div>
              </div> */}
            </div>

            {/* Subtle accent */}
            <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-[#FF7426]/10 to-transparent rounded-full blur-xl sm:blur-2xl" />
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* Eligibility Section */}
<section className="relative py-8 sm:py-10 lg:py-12 bg-white px-4 sm:px-6 lg:px-8 overflow-hidden">
  {/* Subtle background accent */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#4D2C5E]/[0.03] to-transparent rounded-full blur-3xl" />
  </div>

  <div className="max-w-6xl mx-auto relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Section Header */}
      <div className="text-center mb-14 sm:mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-block text-xs sm:text-sm font-semibold text-[#4D2C5E] uppercase tracking-[0.15em] mb-3"
        >
          Is This For You?
        </motion.span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight max-w-3xl mx-auto leading-tight">
          <HighlightedText text={eligibility.sec} />
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[#4D2C5E] to-[#FF7426] rounded-full mx-auto" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {/* LEFT — Problem Points */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-gray-50/70 rounded-3xl p-6 sm:p-8 border border-gray-100"
        >
          {/* Label */}
          <div className="flex items-center gap-2.5 mb-6 pb-5 border-b border-gray-200/70">
            <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center">
              <span className="text-red-500 text-xs font-bold">!</span>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                The Challenge
              </p>
              <p className="text-sm font-bold text-gray-900">Common Struggles</p>
            </div>
          </div>

          {/* Problem List */}
          <div className="space-y-3">
            {eligibility?.que?.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group flex items-start gap-3.5 p-4 rounded-xl bg-white border border-gray-100 hover:border-red-200/70 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mt-0.5 group-hover:bg-red-100 transition-colors duration-300">
                  <span className="text-red-500 text-[10px] font-bold">!</span>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {problem}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Solution Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="relative h-fit sm:h-full rounded-3xl overflow-hidden"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4D2C5E] via-[#5A3670] to-[#6B3FA0]" />

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF7426]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '28px 28px',
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-10 h-fit sm:h-full flex flex-col">
            {/* Label */}
            <div className="flex items-center gap-2.5 mb-6 pb-5 border-b border-white/15">
              <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                  The Solution
                </p>
                <p className="text-sm font-bold text-white">What You'll Gain</p>
              </div>
            </div>

            {/* Title & Description */}
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white leading-tight">
                <HighlightedText text={eligibility?.title} />
              </h3>
              <p className="text-sm sm:text-base mb-6 text-white/75 leading-relaxed">
                <HighlightedText text={eligibility?.description} />
              </p>
            </div>

            {/* Thought Callout */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/15 overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF7426] to-[#FF8C42]" />
              <div className="pl-3">
                <p className="text-[10px] font-semibold text-[#FF8C42] uppercase tracking-wider mb-1.5">
                  Key Insight
                </p>
                <p className="text-sm sm:text-base font-medium text-white/95 leading-relaxed">
                  {eligibility?.thought}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </div>
</section>

      {/* Curriculum Section */}
<section
  id="curriculum"
  className="relative py-8 sm:py-10 lg:py-12 bg-gray-50/70 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  {/* Subtle background accent */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-[#4D2C5E]/[0.04] to-transparent rounded-full blur-3xl" />
    <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-[#FF7426]/[0.04] to-transparent rounded-full blur-3xl" />
  </div>

  <div className="max-w-6xl mx-auto relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Section Header */}
      <div className="text-center mb-14 sm:mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-block text-xs sm:text-sm font-semibold text-[#4D2C5E] uppercase tracking-[0.15em] mb-3"
        >
          Program Outline
        </motion.span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight max-w-3xl mx-auto leading-tight">
          <HighlightedText text={curriculum.title} />
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          <HighlightedText text={curriculum.description} />
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-[#4D2C5E] to-[#FF7426] rounded-full mx-auto mt-6" />
      </div>

      {/* Curriculum Grid */}
      <div
        className={`grid gap-5 sm:gap-6 ${
          curriculum?.curriculums?.length === 1
            ? 'grid-cols-1 max-w-2xl mx-auto'
            : curriculum?.curriculums?.length === 2
            ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
            : 'grid-cols-1 md:grid-cols-2'
        }`}
      >
        {curriculum?.curriculums?.map((day, index) => {
          const colors = {
            1: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-500', border: 'border-blue-100', ring: 'ring-blue-100', grad: 'from-blue-500 to-blue-600' },
            2: { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500', border: 'border-emerald-100', ring: 'ring-emerald-100', grad: 'from-emerald-500 to-emerald-600' },
            3: { bg: 'bg-purple-50', text: 'text-purple-600', dot: 'bg-purple-500', border: 'border-purple-100', ring: 'ring-purple-100', grad: 'from-purple-500 to-purple-600' },
            4: { bg: 'bg-orange-50', text: 'text-orange-600', dot: 'bg-orange-500', border: 'border-orange-100', ring: 'ring-orange-100', grad: 'from-orange-500 to-orange-600' },
            5: { bg: 'bg-rose-50', text: 'text-rose-600', dot: 'bg-rose-500', border: 'border-rose-100', ring: 'ring-rose-100', grad: 'from-rose-500 to-rose-600' },
            6: { bg: 'bg-indigo-50', text: 'text-indigo-600', dot: 'bg-indigo-500', border: 'border-indigo-100', ring: 'ring-indigo-100', grad: 'from-indigo-500 to-indigo-600' },
            7: { bg: 'bg-pink-50', text: 'text-pink-600', dot: 'bg-pink-500', border: 'border-pink-100', ring: 'ring-pink-100', grad: 'from-pink-500 to-pink-600' },
          };
          const color = colors[day.day] || colors[1];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group relative bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Top accent bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${color.grad} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="p-6 sm:p-7">
                {/* Header */}
                <div className="flex items-start gap-4 mb-5 pb-5 border-b border-gray-100">
                  {/* Day number */}
                  {/* <div className={`relative flex-shrink-0 w-12 h-12 ${color.bg} rounded-xl flex items-center justify-center border ${color.border} group-hover:scale-105 transition-transform duration-300`}> */}
                    {/* <span className={`${color.text} font-bold text-lg`}>{day.day}</span> */}
                    {/* Ring on hover */}
                    {/* <span className={`absolute inset-0 rounded-xl ring-2 ${color.ring} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} /> */}
                  {/* </div> */}

                  <div className="min-w-0 flex-1">
                    {/* <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Day {day.day}
                    </p> */}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 leading-snug">
                      <HighlightedText text={day.title} />
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      <HighlightedText text={day.des} />
                    </p>
                  </div>
                </div>

                {/* Topics list */}
                <ul className="space-y-3">
                  {day.info.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.08 + itemIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start group/item"
                    >
                      <div className={`flex-shrink-0 w-4 h-4 rounded-full ${color.bg} flex items-center justify-center mt-0.5 mr-3 border ${color.border} group-hover/item:scale-110 transition-transform duration-200`}>
                        <span className={`w-1.5 h-1.5 ${color.dot} rounded-full`} />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600 leading-relaxed group-hover/item:text-gray-900 transition-colors duration-200">
                        <HighlightedText text={item} />
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Corner decorative glow */}
              <div className={`absolute -bottom-8 -right-8 w-28 h-28 ${color.bg} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  </div>
</section>

      {/* Experts Section */}
<section
  id="experts"
  className="relative py-8 sm:py-10 lg:py-12 bg-white px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  {/* Subtle background accent */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#4D2C5E]/[0.03] to-transparent rounded-full blur-3xl" />
  </div>

  <div className="max-w-6xl mx-auto relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Section Header */}
      <div className="text-center mb-14 sm:mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-block text-xs sm:text-sm font-semibold text-[#4D2C5E] uppercase tracking-[0.15em] mb-3"
        >
          Meet Your Mentors
        </motion.span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight max-w-3xl mx-auto leading-tight">
          <HighlightedText text={speaker.title} />
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          <HighlightedText text={speaker.description} />
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-[#4D2C5E] to-[#FF7426] rounded-full mx-auto mt-6" />
      </div>

      {/* Experts Grid */}
      <div
        className={`grid gap-6 sm:gap-7 ${
          speaker?.profile?.length === 1
            ? 'grid-cols-1 max-w-sm mx-auto'
            : speaker?.profile?.length === 2
            ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
            : speaker?.profile?.length === 3
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto'
        }`}
      >
        {speaker?.profile?.map((expert, index) => {
          const isEven = index % 2 === 0;
          const accentBorder = isEven ? 'border-[#4D2C5E]' : 'border-[#FF7426]';
          const accentText = isEven ? 'text-[#4D2C5E]' : 'text-[#FF7426]';
          const accentBg = isEven ? 'bg-[#4D2C5E]' : 'bg-[#FF7426]';
          const accentSoftBg = isEven ? 'bg-[#4D2C5E]/5' : 'bg-[#FF7426]/5';
          const accentRing = isEven ? 'ring-[#4D2C5E]/20' : 'ring-[#FF7426]/20';

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group relative bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Top colored strip */}
              <div className={`h-1 w-full ${accentBg} opacity-70 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="p-6 sm:p-7 text-center">
                {/* Avatar */}
                <div className="relative inline-block mb-5">
                  {/* Glow ring behind avatar */}
                  <div
                    className={`absolute inset-0 rounded-full ${accentSoftBg} scale-110 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  {/* Avatar image */}
                  <motion.img
                    className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto object-cover shadow-md border-[3px] ${accentBorder} group-hover:scale-105 transition-transform duration-300`}
                    src={expert.image}
                    alt={expert.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                  {/* Small verified dot */}
                  <div
                    className={`absolute bottom-0 right-0 w-6 h-6 ${accentBg} rounded-full border-[3px] border-white flex items-center justify-center shadow-sm`}
                  >
                    <span className="text-white text-[9px] font-bold">✓</span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 leading-snug">
                  {expert.name}
                </h3>

                {/* Profession */}
                <p className={`${accentText} font-semibold text-xs sm:text-sm mb-3.5 uppercase tracking-wide`}>
                  {expert.profession}
                </p>

                {/* Divider */}
                <div className="w-8 h-px bg-gray-200 mx-auto mb-3.5" />

                {/* Experience */}
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {expert.experience}
                </p>
              </div>

              {/* Corner glow */}
              <div
                className={`absolute -bottom-10 -right-10 w-32 h-32 ${accentSoftBg} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  </div>
</section>

      {/* Features Section */}
      <section id="features" className="py-1 bg-gray-50/70 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14 tracking-tight">
              <HighlightedText text={train?.title} />
            </h2>

            <div
              className={`grid gap-5 ${
                train?.cards?.length === 1
                  ? 'grid-cols-1 max-w-sm mx-auto'
                  : train?.cards?.length === 2
                  ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
                  : train?.cards?.length === 3
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto'
              }`}
            >
              {train?.cards?.map((feature, index) => {
                const colorSchemes = [
                  { bg: 'bg-blue-50/80', border: 'border-blue-100', icon: 'text-blue-600' },
                  { bg: 'bg-emerald-50/80', border: 'border-emerald-100', icon: 'text-emerald-600' },
                  { bg: 'bg-purple-50/80', border: 'border-purple-100', icon: 'text-purple-600' },
                  { bg: 'bg-orange-50/80', border: 'border-orange-100', icon: 'text-orange-600' },
                  { bg: 'bg-teal-50/80', border: 'border-teal-100', icon: 'text-teal-600' },
                  { bg: 'bg-amber-50/80', border: 'border-amber-100', icon: 'text-amber-600' },
                ];
                const scheme = colorSchemes[index % colorSchemes.length];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                    className={`${scheme.bg} rounded-2xl p-6 text-center border ${scheme.border} hover:shadow-md transition-all duration-300 cursor-default`}
                  >
                    <div className={`text-3xl mb-4 flex justify-center ${scheme.icon}`}>
                      {feature.icon}
                    </div>

                    <h3 className="font-bold text-gray-900 mb-2.5 text-base">{feature.title}</h3>

                    <p className="text-gray-500 text-sm leading-relaxed">
                      <HighlightedText text={feature.description} />
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-8 sm:py-10 bg-gradient-to-br from-[#4D2C5E] via-[#5A3670] to-[#6B3FA0] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FF7426]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight">
              Don't Miss Out!
            </h2>

            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-10">
              {/* Date & Time Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/10 hover:border-white/20 hover:bg-white/[0.12] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-purple-500/80 rounded-xl flex items-center justify-center text-xl text-white mb-4 mx-auto shadow-lg">
                  <FaCalendarAlt />
                </div>
                <h3 className="text-base font-bold text-white mb-2.5">Dates & Time</h3>
                <div className="space-y-1.5">
                  <p className="text-white/90 font-semibold text-sm">{datetime.date}</p>
                  <p className="text-white/60 text-sm">{datetime.time}</p>
                </div>
              </motion.div>

              {/* Price Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/10 hover:border-white/20 hover:bg-white/[0.12] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF7426] to-[#FF8C42] rounded-xl flex items-center justify-center text-xl text-white mb-4 mx-auto shadow-lg">
                  <FaMoneyBillWave />
                </div>
                <h3 className="text-base font-bold text-white mb-2.5">Price</h3>
                <div className="space-y-1.5">
                  <p className="text-xl font-bold text-white">{datetime.price}</p>
                  <p className="text-white/60 text-sm">{datetime.slot}</p>
                </div>
              </motion.div>
            </div>

            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-[#FF7426] to-[#FF8C42] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-2.5"
            >
              <FaGraduationCap className="text-lg" />
              {datetime.button}
            </motion.button>

            <p className="text-white/50 mt-5 text-sm">Secure your spot before it's gone!</p>
          </motion.div>
        </div>
      </section>

      <PramotianalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subjectName="Habits & Nutrition Psychology Bootcamp"
        where="postpramotionBootcamp"
      />
    </div>
  );
};

export default LandingPage;