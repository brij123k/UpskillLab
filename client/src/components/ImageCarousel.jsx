import React from 'react';
import Marquee from 'react-fast-marquee';

const LogoCarousel = () => {
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

  // Responsive styles
  const styles = {
    container: {
      backgroundColor: 'white',
      overflow: 'hidden',
      paddingTop: '3rem',
      paddingBottom: '3rem',
      '@media (min-width: 768px)': {
        paddingTop: '4rem',
        paddingBottom: '4rem',
      },
      '@media (min-width: 1024px)': {
        paddingTop: '5rem',
        paddingBottom: '5rem',
      },
    },
    marqueeRow: {
      paddingTop: '1rem',
      paddingBottom: '1rem',
      '@media (min-width: 768px)': {
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
      },
    },
    logoItem: {
      marginLeft: '1rem',
      marginRight: '1rem',
      transition: 'transform 0.3s ease',
      '@media (min-width: 768px)': {
        marginLeft: '1.5rem',
        marginRight: '1.5rem',
      },
      '@media (min-width: 1024px)': {
        marginLeft: '2rem',
        marginRight: '2rem',
      },
      ':hover': {
        transform: 'scale(1.1)',
      },
    },
    logoImage: {
      height: '3rem',
      width: 'auto',
      objectFit: 'contain',
      '@media (min-width: 768px)': {
        height: '3.5rem',
      },
      '@media (min-width: 1024px)': {
        height: '4rem',
      },
      '@media (min-width: 1280px)': {
        height: '5rem',
      },
      '@media (min-width: 1536px)': {
        height: '6rem',
      },
    },
  };

  return (
    <div style={styles.container}>
      {/* First Row - Right to Left */}
      <Marquee 
        direction="right"
        speed={40}
        gradient={false}
        pauseOnHover
        style={styles.marqueeRow}
      >
        {logos.map((logo, index) => (
          <div key={`first-${index}`} style={styles.logoItem}>
            <img 
              src={logo.src} 
              alt={logo.alt}
              style={styles.logoImage}
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
        style={styles.marqueeRow}
      >
        {logos.map((logo, index) => (
          <div key={`second-${index}`} style={styles.logoItem}>
            <img 
              src={logo.src} 
              alt={logo.alt}
              style={styles.logoImage}
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
        style={styles.marqueeRow}
      >
        {logos.map((logo, index) => (
          <div key={`third-${index}`} style={styles.logoItem}>
            <img 
              src={logo.src} 
              alt={logo.alt}
              style={styles.logoImage}
              loading="lazy"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default LogoCarousel;