import { useState, useEffect, useRef } from 'react';
import { getDataHandler } from '../../config/services';

const SuccessTestimonial  = () => {
  const [activeStudent, setActiveStudent] = useState(0);
  const scrollContainerRef = useRef(null);
  const scrollInterval = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [duplicatedTestimonials, setDuplicatedTestimonials] = useState([]);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false;

  const handleTestimonialsData = async () => {
    try {
      const res = await getDataHandler("testimonial");
      console.log(res)
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
        // Create duplicated array for infinite scroll effect
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

      // Update active student based on real index
      const realIndex = index % testimonials.length;
      setActiveStudent(realIndex);
    }
  };

  useEffect(() => {
    if (duplicatedTestimonials.length > 0) {
      // Start in the middle section for infinite scroll
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

      // Calculate the real index in the original array
      const realIndex = closestIndex % testimonials.length;
      setActiveStudent(realIndex);

      // Auto-scroll to middle section when near edges
      const middleSectionStart = testimonials.length;
      const middleSectionEnd = testimonials.length * 2;
      
      if (closestIndex < testimonials.length / 2) {
        // Near beginning - scroll to middle section
        scrollToStudent(middleSectionStart + realIndex, false);
      } else if (closestIndex > middleSectionEnd + testimonials.length / 2) {
        // Near end - scroll to middle section
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
      }, 3000);
    };

    startAutoScroll();
    return () => clearInterval(scrollInterval.current);
  }, [activeStudent, duplicatedTestimonials.length, testimonials.length]);

  return (
    <div className="bg-[#f3f4f8] p-6 md:py-10 md:px-30 rounded-xl">
  <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">
    What Our Students Have To Say
  </h2>

  <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 items-center p-2 bg-white rounded-2xl min-h-[400px] xxl:h-[500px]">
    {/* Column 1: Active Student's Large Image */}
    <div className="w-full lg:w-3/7 flex justify-center relative min-h-[200px] md:min-h-[300px]">
      <div className="absolute w-50 h-50 md:w-70 md:h-70 xxl:w-90 xxl:h-90">
        <img src="/images/Elips.png" alt="Decorative background" className="w-full h-full object-contain" />
      </div>
      <div className="relative w-50 h-50 md:w-70 md:h-70 xxl:w-90 xxl:h-90">
        <img
          src={testimonials[activeStudent]?.image}
          alt={testimonials[activeStudent]?.name}
          className="w-full h-full"
        />
      </div>
    </div>

    {/* Column 2: Active Student's Testimonial */}
    <div className="w-full lg:w-3/7 bg-white p-2 lg:p-6 rounded-lg space-y-4 text-center lg:text-left">
      <h3 className="text-lg md:text-2xl xxl:text-4xl font-semibold text-gray-800">
        {testimonials[activeStudent]?.name}
      </h3>
      <p className="text-gray-800 text-md xxl:text-2xl">
        {testimonials[activeStudent]?.email}
      </p>
      <p className="text-lg text-gray-600 xxl:text-xl">
        "{testimonials[activeStudent]?.quote}"
      </p>
      <div className="flex gap-4 pt-2 justify-center lg:justify-start">
        <a href={testimonials[activeStudent]?.facebook} target="_blank" rel="noopener noreferrer">
          <img src="/images/facebook.svg" alt="Facebook" className="w-6 h-6 xl:w-10 xl:h-10 opacity-70 hover:opacity-100 transition-opacity" />
        </a>
        <a href={testimonials[activeStudent]?.twitter} target="_blank" rel="noopener noreferrer">
          <img src="/images/twitter.svg" alt="Twitter" className="w-6 h-6 xl:w-10 xl:h-10 opacity-70 hover:opacity-100 transition-opacity" />
        </a>
        <a href={testimonials[activeStudent]?.instagram} target="_blank" rel="noopener noreferrer">
          <img src="/images/instagram.svg" alt="Instagram" className="w-6 h-6 xl:w-10 xl:h-10 opacity-70 hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </div>

    {/* Column 3: Infinite Circular Thumbnail Carousel */}
    <div className="w-full lg:w-1/4">
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
          const distanceFromCenter = Math.abs(
            (index % testimonials.length) - activeStudent
          );
          const scale = 1 - (distanceFromCenter * 0.15);
          const opacity = 1 - (distanceFromCenter * 0.3);

          return (
            <div
              key={`${student?.id}-${index}`}
              className={`
                flex-shrink-0 
                transition-all duration-300 ease-in-out
                ${isActive ? 'z-10' : 'z-0'}
                cursor-pointer
                mx-auto
              `}
              style={{
                transform: `scale(${scale})`,
                opacity: opacity
              }}
              onClick={() => {
                const middleSectionStart = testimonials.length;
                scrollToStudent(middleSectionStart + realIndex);
              }}
            >
              <div className="flex flex-col items-center gap-2 p-2">
                <img
                  src={student?.image}
                  alt={student?.name}
                  className={`
                    w-16 h-16 lg:w-20 lg:h-20
                    rounded-full object-cover shadow-lg
                    ${isActive ? 'ring-4 ring-[#FF7426]' : 'ring-2 ring-gray-200'}
                  `}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</div>
  );
};

export default SuccessTestimonial ;