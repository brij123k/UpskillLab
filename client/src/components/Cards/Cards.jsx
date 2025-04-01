import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Card = ({ imageSrc, title, subtitle, animate }) => {
  const [count, setCount] = useState(0);
  const isNumber = !isNaN(Number(title));

  useEffect(() => {
    if (!animate || !isNumber) return;

    const targetNumber = Number(title);
    const duration = 2000;
    const startTime = performance.now();

    const animateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentCount = Math.floor(progress * targetNumber);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [animate, title, isNumber]);

  const formattedCount = isNumber ? count.toLocaleString('en-US') + '+' : title;

  return (
    <motion.div
      className={`
        flex flex-row items-center justify-center
        gap-4 sm:gap-6
        w-full
        p-4 sm:p-6
        rounded-xl
        bg-gradient-to-br from-[#4D2C5E]/80 to-[#3A2150]/90
        backdrop-blur-sm
        border border-[#71567e]
        shadow-lg
        overflow-hidden
        relative
      `}
      whileHover={{ y: -5 }}
    >
      {/* Image container */}
      <motion.div
        className="
          w-[100px] h-[100px]
          sm:w-[120px] sm:h-[120px]
          p-2
          bg-[#71567e]
          rounded-lg
          flex items-center justify-center
          overflow-hidden
          relative
          z-10
          flex-shrink-0
          shadow-md
        "
        initial={{ scale: 1.2, opacity: 0 }}
        animate={animate ? { 
          scale: 1, 
          opacity: 1,
          transition: { duration: 0.8 } 
        } : { 
          scale: 1.2, 
          opacity: 0 
        }}
      >
        <motion.img
          src={imageSrc}
          alt={subtitle}
          className="w-full h-full object-cover rounded-lg"
          whileHover={{ scale: 1.05 }}
        />
      </motion.div>

      {/* Text content */}
      <div className="flex flex-col justify-center w-full sm:w-3/5 md:w-2/3 space-y-1">
        <motion.h3
          className="
            text-2xl sm:text-3xl
            font-bold text-[#FF7426]
            drop-shadow-md
          "
          initial={{ opacity: 0, x: -10 }}
          animate={animate ? { 
            opacity: 1, 
            x: 0,
            transition: { delay: 0.2 } 
          } : { 
            opacity: 0, 
            x: -10 
          }}
        >
          {formattedCount}
        </motion.h3>
        <motion.p
          className="
            text-lg sm:text-xl
            font-semibold text-white/90
          "
          initial={{ opacity: 0, x: -10 }}
          animate={animate ? { 
            opacity: 1, 
            x: 0,
            transition: { delay: 0.3 } 
          } : { 
            opacity: 0, 
            x: -10 
          }}
        >
          {subtitle}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Card;