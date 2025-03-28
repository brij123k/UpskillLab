import { useState, useEffect, useRef } from 'react';
import { getDataHandler } from '../../config/services';

const StudentTestimonials = () => {
  const [activeStudent, setActiveStudent] = useState(0);
  const scrollContainerRef = useRef(null);
  const scrollInterval = useRef(null);
  const [testimonials, setTestimonials] = useState([]);

  const handleTestimonialsData = async () => {
    try {
      const res = await getDataHandler("testimonial")
      if (res) {
        const newTestimonials = res.testimonials.map((testimonial, index) => ({
          id: index + 1,
          name: testimonial.name,
          email: testimonial.email || 'Not provided',
          role: 'Student', // Adding default role since it's not in backend data
          image: `/images/Ellipse ${119 + index * 2}.png`, // Generating dummy image paths
          quote: testimonial.description,
          // Mapping social media links if they exist
          facebook: testimonial.socialMediaLinks?.find(link => link.platform.toLowerCase() === 'facebook')?.url,
          twitter: testimonial.socialMediaLinks?.find(link => link.platform.toLowerCase() === 'twitter')?.url,
          instagram: testimonial.socialMediaLinks?.find(link => link.platform.toLowerCase() === 'instagram')?.url,
          linkedin: testimonial.socialMediaLinks?.find(link => link.platform.toLowerCase() === 'linkedin')?.url
        }));
        setTestimonials(newTestimonials)
      }


    } catch (error) {

    }
  }

  useEffect(() => {
    handleTestimonialsData()
  }, [])

  // const testimonials = [
  //   {
  //     id: 1,
  //     name: "Sarah Johnson",
  //     email: "sarah.johnson@example.com",
  //     role: "Data Science Student",
  //     image: "/images/Ellipse 119.png",
  //     quote: "The courses transformed my career. I landed a job at a top tech company within 3 months!",
  //     facebook: "https://facebook.com/sarahjohnson",
  //     twitter: "https://twitter.com/sarahjohnson",
  //     instagram: "https://instagram.com/sarahjohnson"
  //   },
  //   {
  //     id: 2,
  //     name: "Michael Chen",
  //     email: "michael.chen@example.com",
  //     role: "Web Development Student",
  //     image: "/images/Ellipse 123.png",
  //     quote: "The hands-on projects gave me real-world experience that was invaluable.",
  //     facebook: "https://facebook.com/michaelchen",
  //     twitter: "https://twitter.com/michaelchen",
  //     instagram: "https://instagram.com/michaelchen"
  //   },
  //   {
  //     id: 3,
  //     name: "Priya Patel",
  //     email: "priya.patel@example.com",
  //     role: "UX Design Student",
  //     image: "/images/Ellipse 125.png",
  //     quote: "The mentor support was exceptional throughout my learning journey.",
  //     facebook: "https://facebook.com/priyapatel",
  //     twitter: "https://twitter.com/priyapatel",
  //     instagram: "https://instagram.com/priyapatel"
  //   },
  //   {
  //     id: 4,
  //     name: "Priya Patel",
  //     email: "priya.patel@example.com",
  //     role: "UX Design Student",
  //     image: "/images/Ellipse 126.png",
  //     quote: "The mentor support was exceptional throughout my learning journey.",
  //     facebook: "https://facebook.com/priyapatel",
  //     twitter: "https://twitter.com/priyapatel",
  //     instagram: "https://instagram.com/priyapatel"
  //   }, {
  //     id: 5,
  //     name: "Sarah Johnson",
  //     email: "sarah.johnson@example.com",
  //     role: "Data Science Student",
  //     image: "/images/Ellipse 119.png",
  //     quote: "The courses transformed my career. I landed a job at a top tech company within 3 months!",
  //     facebook: "https://facebook.com/sarahjohnson",
  //     twitter: "https://twitter.com/sarahjohnson",
  //     instagram: "https://instagram.com/sarahjohnson"
  //   },
  //   {
  //     id: 6,
  //     name: "Sarah Johnson",
  //     email: "sarah.johnson@example.com",
  //     role: "Data Science Student",
  //     image: "/images/Ellipse 119.png",
  //     quote: "The courses transformed my career. I landed a job at a top tech company within 3 months!",
  //     facebook: "https://facebook.com/sarahjohnson",
  //     twitter: "https://twitter.com/sarahjohnson",
  //     instagram: "https://instagram.com/sarahjohnson"
  //   },
  // ];


  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const startAutoScroll = () => {
      scrollInterval.current = setInterval(() => {
        const nextIndex = (activeStudent + 1) % testimonials.length;
        scrollToStudent(nextIndex);
      }, 3000);
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval.current);
    };

    startAutoScroll();
    return stopAutoScroll;
  }, [activeStudent]);

  const scrollToStudent = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isVertical = window.innerWidth >= 1024; // lg breakpoint
    const child = container.children[index];

    if (child) {
      setActiveStudent(index);

      if (isVertical) {
        // Vertical scrolling
        container.scrollTo({
          top: child.offsetTop - container.offsetHeight / 2 + child.offsetHeight / 2,
          behavior: 'smooth'
        });
      } else {
        // Horizontal scrolling
        container.scrollTo({
          left: child.offsetLeft - container.offsetWidth / 2 + child.offsetWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  };



  return (
    <div className="bg-[#f3f4f8] p-6 md:py-10 md:px-30 rounded-xl ">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">
        What Our Students Have To Say
      </h2>

      {/* Three Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-center p-2 bg-white rounded-2xl h-[400px] md:h-[300px]">
        {/* Column 1: Active Student's Large Image */}
        <div className="w-full lg:w-3/7 flex justify-center relative">
          {/* Static Background Image */}
          <div className="absolute w-40 h-40 md:w-60 md:h-60">
            <img
              src="/images/Elips.png" // Your static pattern/image
              alt="Decorative background"
              className="w-full h-full object-contain" // Reduced opacity
            />
          </div>

          {/* Student Profile Image */}
          <div className="relative w-40 h-40 md:w-60 md:h-60 rounded-full overflow-hidden">
            <img
              src={testimonials[activeStudent]?.image}
              alt={testimonials[activeStudent]?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Column 2: Active Student's Testimonial */}
        <div className="w-full lg:w-3/7 bg-white p-6 rounded-lg space-y-4 sm:text-center">
          {/* Name */}
          <h3 className=" text-lg md:text-2xl font-semibold text-gray-800">
            {testimonials[activeStudent]?.name}
          </h3>

          {/* Email */}
          <p className="text-gray-800 text-md">
            {testimonials[activeStudent]?.email}
          </p>

          {/* Quote */}
          <p className="text-lg text-gray-600">
            "{testimonials[activeStudent]?.quote}"
          </p>

          {/* Social Links Row */}
          <div className="flex gap-4 pt-2 justify-center">
            <a href={testimonials[activeStudent]?.facebook} target="_blank" rel="noopener noreferrer">
              <img src="/images/facebook.svg" alt="Facebook" className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
            </a>
            <a href={testimonials[activeStudent]?.twitter} target="_blank" rel="noopener noreferrer">
              <img src="/images/twitter.svg" alt="Twitter" className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
            </a>
            <a href={testimonials[activeStudent]?.instagram} target="_blank" rel="noopener noreferrer">
              <img src="/images/instagram.svg" alt="Instagram" className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Column 3: Scrollable Student Thumbnails */}
        <div className="w-full lg:w-1/4">
          <div
            ref={scrollContainerRef}
            className="
          flex lg:flex-col 
          gap-4 
          overflow-x-auto lg:overflow-y-auto 
          scrollbar-hide 
          snap-x lg:snap-y 
          snap-mandatory
          h-[120px] lg:h-[400px]
          px-4 lg:px-0
          items-center lg:items-start
        "
          >
            {testimonials?.map((student, index) => (
              <div
                key={student?.id}
                className={`
              flex-shrink-0 
              snap-center 
              transition-all duration-300
              ${activeStudent === index ? 'scale-110' : 'scale-90 opacity-80'}
            `}
              >
                <button
                  onClick={() => scrollToStudent(index)}
                  className="flex flex-col items-center gap-2"
                >
                  <img
                    src={student?.image}
                    alt={student?.name}
                    className={`
                  w-16 h-16 lg:w-20 lg:h-20
                  rounded-full object-cover shadow-md
                  ${activeStudent === index ? 'ring-4 ring-[#FF7426]' : ''}
                `}
                  />
                  {activeStudent === index && (
                    <p className="text-xs text-center text-gray-600 max-w-[100px] truncate">
                      "{student?.quote.split(' ').slice(0, 8).join(' ')}..."
                    </p>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTestimonials;