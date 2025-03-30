import { useState, useEffect, useRef } from 'react';

const Cards = ({ imageSrc, title, subtitle }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const targetNumber = Number(title);
    if (isNaN(targetNumber)) return;

    const duration = 4000;
    const increment = targetNumber / (duration / 60);
    let currentCount = 0;

    const counter = setInterval(() => {
      currentCount += increment;
      if (currentCount >= targetNumber) {
        setCount(targetNumber);
        clearInterval(counter);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [isVisible, title]);

  const formattedCount = count.toLocaleString('en-US') + '+';

  return (
    <div 
      ref={cardRef}
      className={`
        flex flex-row items-center justify-center
        gap-1                      
        w-full max-w-[400px]      
        p-3                        
        rounded-lg
        transition-all duration-500
        ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-5'}
        hover:bg-white/15
        mx-auto
      `}
    >
      {/* Image container */}
      <div className="
  w-[100px] h-[100px]  // Fixed size for all screens
  sm:w-[120px] sm:h-[120px]  // Slightly larger on small+
  md:w-[100px] md:h-[100px]  // Medium size
  lg:w-[140px] lg:h-[140px]  // Medium size
  p-2
  bg-[#71567e] rounded-lg
  flex items-center justify-center
  overflow-hidden
  group
  flex-shrink-0  // Prevents shrinking
">
        <img
          src={imageSrc}
          alt={title}
          className="
            w-full h-full
      object-cover  
      rounded-lg
      transition-transform duration-500
      group-hover:scale-110
          "
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col justify-center w-full sm:w-3/5 md:w-2/3">
        <h3 className="
          text-xl md:text-md lg:text-lg xl:text-xl
          font-bold text-[#FF7426]
          transition-colors duration-300
        ">
          {formattedCount}
        </h3>
        <p className="
          text-lg md:text-lg lg:text-xl xl:text-2xl
          font-semibold text-white
        ">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default Cards;