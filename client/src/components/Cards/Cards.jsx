import React, { useState, useEffect, useRef } from 'react';

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
      {
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
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

  // Format number with commas and add "+"
  const formattedCount = count.toLocaleString('en-US') + '+';

  return (
    <div ref={cardRef} className='flex flex-row  lg:flex-row gap-3'>
      <div className='w-[50%] md:w-[40%] min-w-[40%] md:p-4 bg-[#71567e] rounded-lg flex items-center justify-center'>
        <div className='w-full h-full'>

          <img src={imageSrc} alt={title} className="rounded-lg object-cover h-full" />
        </div>
      </div>
      <div className=' flex flex-col justify-center'>
        <h3 className="text-md  md:text-xl font-bold text-[#FF7426]">{formattedCount}</h3>
        <p className="text-lg md:text-2xl font-semibold text-white">{subtitle}</p>
      </div>
    </div>
  );
};

export default Cards;