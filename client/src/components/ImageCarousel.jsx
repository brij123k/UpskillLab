import React from 'react';
import Marquee from 'react-fast-marquee';

const HiringPartnersCarousel = () => {
  // Company logos data
  const logos = [
    { src: 'images/Logo1.jpeg', alt: 'Company 1' },
    { src: 'images/Logo2.jpeg', alt: 'Company 2' },
    { src: 'images/Logo3.png', alt: 'Company 3' },
    { src: 'images/Logo4.png', alt: 'Company 4' },
    { src: 'images/Logo5.png', alt: 'Company 5' },
    { src: 'images/Logo6.png', alt: 'Company 6' },
    { src: 'images/Logo4.png', alt: 'Company 4' },
    { src: 'images/Logo3.png', alt: 'Company 3' },
  ];

  return (
    <div className="bg-white py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28">
      {/* Section Header */}
      <div className="text-center mb-8 md:mb-12 lg:mb-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#ff7426]">
          Our Hiring Partners
        </h2>
        <div className="w-24 h-1 bg-[#ff7426] mx-auto mt-4"></div>
      </div>

      {/* Logo Marquee */}
      <div className="space-y-6 md:space-y-8 lg:space-y-10">
        {/* First Row - Right to Left */}
        <Marquee 
          direction="right"
          speed={40}
          gradient={false}
          pauseOnHover
          className="py-4"
        >
          {logos.map((logo, index) => (
            <div 
              key={`first-${index}`} 
              className="mx-2 md:mx-4 lg:mx-5 hover:scale-110 transition-transform duration-300"
            >
              <img 
                src={logo.src} 
                alt={logo.alt}
                className="h-6 md:h-8 lg:h-10 xl:h-12 2xl:h-28 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </Marquee>

        {/* Second Row - Left to Right */}
        <Marquee 
          direction="left"
          speed={50}
          gradient={false}
          pauseOnHover
          className="py-4"
        >
          {logos.map((logo, index) => (
            <div 
              key={`second-${index}`} 
              className="mx-2 md:mx-4 lg:mx-5 hover:scale-110 transition-transform duration-300"
            >
              <img 
                src={logo.src} 
                alt={logo.alt}
                className="h-6 md:h-8 lg:h-10 xl:h-12 2xl:h-28 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </Marquee>

        {/* Third Row - Right to Left */}
        <Marquee 
          direction="right"
          speed={60}
          gradient={false}
          pauseOnHover
          className="py-4"
        >
          {logos.map((logo, index) => (
            <div 
              key={`third-${index}`} 
              className="mx-2 md:mx-4 lg:mx-5 hover:scale-110 transition-transform duration-300"
            >
              <img 
                src={logo.src} 
                alt={logo.alt}
                className="h-6 md:h-8 lg:h-10 xl:h-12 2xl:h-28 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default HiringPartnersCarousel;