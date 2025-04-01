import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDataHandler } from '../../config/services';

const SuccessTestimonial = () => {
  const [activeStudent, setActiveStudent] = useState(0);
  const scrollContainerRef = useRef(null);
  const scrollInterval = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [duplicatedTestimonials, setDuplicatedTestimonials] = useState([]);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false;

  const handleTestimonialsData = async () => {
    try {
      const res = await getDataHandler("testimonial");
      if (res) {
        const newTestimonials = res.testimonials.map((testimonial, index) => ({
          id: index + 1,
          name: testimonial.name,
          email: testimonial.email || 'Not provided',
          role: 'Student',
          image: `/images/Ellipse ${119 + index * 2}.png`,
          quote: testimonial.description,
          facebook: testimonial.socialMediaLinks?.find(link => link.platform.toLowerCase() === 'facebook')?.url,
          twitter: testimonial.socialMediaLinks?.find(link => link.platform.toLowerCase() === 'twitter')?.url,
          instagram: testimonial.socialMediaLinks?.find(link => link.platform.toLowerCase() === 'instagram')?.url,
          linkedin: testimonial.socialMediaLinks?.find(link => link.platform.toLowerCase() === 'linkedin')?.url
        }));
        setTestimonials(newTestimonials);
        setDuplicatedTestimonials([...newTestimonials, ...newTestimonials, ...newTestimonials]);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    handleTestimonialsData();
  }, []);

  const scrollToStudent = (index, smooth = true) => {
    const container = scrollContainerRef.current;
    if (!container || !duplicatedTestimonials.length) return;

    const isVertical = !isMobile;
    const child = container.children[index];

    if (child) {
      const containerSize = isVertical ? container.offsetHeight : container.offsetWidth;
      const childSize = isVertical ? child.offsetHeight : child.offsetWidth;
      const scrollTo = isVertical 
        ? child.offsetTop - containerSize / 2 + childSize / 2
        : child.offsetLeft - containerSize / 2 + childSize / 2;

      container.scrollTo({
        [isVertical ? 'top' : 'left']: scrollTo,
        behavior: smooth ? 'smooth' : 'auto'
      });

      const realIndex = index % testimonials.length;
      setActiveStudent(realIndex);
      setDirection(realIndex > activeStudent ? 1 : -1);
    }
  };

  useEffect(() => {
    if (duplicatedTestimonials.length > 0) {
      const middleStartIndex = testimonials.length;
      scrollToStudent(middleStartIndex, false);
    }
  }, [duplicatedTestimonials.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !duplicatedTestimonials.length) return;

    const handleScroll = () => {
      const isVertical = !isMobile;
      const scrollPosition = isVertical ? container.scrollTop : container.scrollLeft;
      const containerSize = isVertical ? container.offsetHeight : container.offsetWidth;

      let closestIndex = 0;
      let smallestDistance = Infinity;

      Array.from(container.children).forEach((child, index) => {
        const childPosition = isVertical ? child.offsetTop : child.offsetLeft;
        const childSize = isVertical ? child.offsetHeight : child.offsetWidth;
        const childCenter = childPosition + childSize / 2;
        const distance = Math.abs(childCenter - (scrollPosition + containerSize / 2));

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = index;
        }
      });

      const realIndex = closestIndex % testimonials.length;
      setActiveStudent(realIndex);

      const middleSectionStart = testimonials.length;
      const middleSectionEnd = testimonials.length * 2;
      
      if (closestIndex < testimonials.length / 2) {
        scrollToStudent(middleSectionStart + realIndex, false);
      } else if (closestIndex > middleSectionEnd + testimonials.length / 2) {
        scrollToStudent(middleSectionStart + realIndex, false);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [duplicatedTestimonials.length, testimonials.length, isMobile]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !duplicatedTestimonials.length) return;

    const startAutoScroll = () => {
      scrollInterval.current = setInterval(() => {
        const nextIndex = (activeStudent + 1) % testimonials.length;
        const middleSectionStart = testimonials.length;
        scrollToStudent(middleSectionStart + nextIndex);
      }, 5000);
    };

    startAutoScroll();
    return () => clearInterval(scrollInterval.current);
  }, [activeStudent, duplicatedTestimonials.length, testimonials.length]);

  // Animation variants
  const testimonialVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <div className="bg-gradient-to-b from-[#f3f4f8] to-[#e9ecef] p-6 md:py-12 md:px-30 rounded-xl">
      <motion.h2 
        className="text-2xl md:text-4xl font-bold text-center mb-10 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What Our <span className="text-[#FF7426]">Students</span> Say
      </motion.h2>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center p-6 bg-white rounded-2xl min-h-[400px] xxl:h-[500px] shadow-lg">
        {/* Column 1: Active Student's Large Image */}
        <div className="w-full lg:w-2/5 flex justify-center relative min-h-[200px] md:min-h-[300px]">
          <motion.div 
            className="absolute w-50 h-50 md:w-70 md:h-70 xxl:w-90 xxl:h-90"
            animate={{
              rotate: 360,
              transition: {
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            <img src="/images/Elips.png" alt="Decorative background" className="w-full h-full object-contain" />
          </motion.div>
          <motion.div
            className="relative w-50 h-50 md:w-70 md:h-70 xxl:w-90 xxl:h-90"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={testimonials[activeStudent]?.image || "/images/default-profile.png"}
              alt={testimonials[activeStudent]?.name || "Student"}
              className="w-full h-full object-cover rounded-full border-4 border-[#4D2C5E] shadow-lg"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "/images/default-profile.png";
              }}
            />
          </motion.div>
        </div>

        {/* Column 2: Active Student's Testimonial */}
        <div className="w-full lg:w-2/5 bg-white p-4 lg:p-6 rounded-lg space-y-4">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeStudent}
              custom={direction}
              variants={testimonialVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h3 className="text-xl text-center lg:text-left md:text-2xl xxl:text-3xl font-semibold text-gray-800">
                {testimonials[activeStudent]?.name}
              </h3>
              <p className="text-[#4D2C5E] text-center lg:text-left text-md xxl:text-xl font-medium">
                {testimonials[activeStudent]?.email}
              </p>
              <motion.p 
                className="text-lg text-gray-600 xxl:text-xl mt-4 text-center lg:text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                "{testimonials[activeStudent]?.quote}"
              </motion.p>
              <div className="flex gap-4 pt-4 justify-center lg:justify-start">
                {testimonials[activeStudent]?.facebook && (
                  <motion.a 
                    href={testimonials[activeStudent]?.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                  >
                    <img src="/images/facebook.svg" alt="Facebook" className="w-6 h-6 xl:w-8 xl:h-8 opacity-70 hover:opacity-100 transition-opacity" />
                  </motion.a>
                )}
                {testimonials[activeStudent]?.twitter && (
                  <motion.a 
                    href={testimonials[activeStudent]?.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                  >
                    <img src="/images/twitter.svg" alt="Twitter" className="w-6 h-6 xl:w-8 xl:h-8 opacity-70 hover:opacity-100 transition-opacity" />
                  </motion.a>
                )}
                {testimonials[activeStudent]?.instagram && (
                  <motion.a 
                    href={testimonials[activeStudent]?.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                  >
                    <img src="/images/instagram.svg" alt="Instagram" className="w-6 h-6 xl:w-8 xl:h-8 opacity-70 hover:opacity-100 transition-opacity" />
                  </motion.a>
                )}
                {testimonials[activeStudent]?.linkedin && (
                  <motion.a 
                    href={testimonials[activeStudent]?.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                  >
                    <img src="/images/linkedin.svg" alt="LinkedIn" className="w-6 h-6 xl:w-8 xl:h-8 opacity-70 hover:opacity-100 transition-opacity" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Column 3: Infinite Circular Thumbnail Carousel */}
        <div className="w-full lg:w-1/5">
          <div
            ref={scrollContainerRef}
            className="
              flex lg:flex-col 
              gap-4 
              overflow-x-auto lg:overflow-y-auto 
              scrollbar-hide 
              h-[120px] lg:h-[400px]
              px-4 lg:px-0
              items-center lg:items-start
              relative
            "
          >
            {duplicatedTestimonials?.map((student, index) => {
              const realIndex = index % testimonials.length;
              const isActive = activeStudent === realIndex;
              const distanceFromCenter = Math.abs((index % testimonials.length) - activeStudent);
              const scale = 1 - (distanceFromCenter * 0.15);
              const opacity = 1 - (distanceFromCenter * 0.3);

              return (
                <motion.div
                  key={`${student?.id}-${index}`}
                  className="flex-shrink-0 cursor-pointer mx-auto"
                  style={{
                    transform: `scale(${scale})`,
                    opacity: opacity
                  }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    const middleSectionStart = testimonials.length;
                    scrollToStudent(middleSectionStart + realIndex);
                  }}
                >
                  <div className="flex flex-col items-center gap-2 p-2">
                    <motion.img
                      src={student?.image || "/images/default-profile.png"}
                      alt={student?.name || "Student"}
                      className={`
                        w-16 h-16 lg:w-20 lg:h-20
                        rounded-full object-cover shadow-lg
                        ${isActive ? 'ring-4 ring-[#FF7426]' : 'ring-2 ring-[#4D2C5E]'}
                      `}
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "/images/default-profile.png";
                      }}
                      animate={{
                        y: isActive ? [0, -5, 0] : 0
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessTestimonial;