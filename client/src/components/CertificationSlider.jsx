import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { getDataHandler } from '../config/services';

const CertificationSlider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "0px" });
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        const response = await getDataHandler('getAssociations');
        if (response && response.associations) {
          const activeAssociations = response.associations.filter(assoc => assoc.isActive);
          setAssociations(activeAssociations);
        }
      } catch (err) {
        console.error('Error fetching associations:', err);
        setError('Failed to load associations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssociations();
  }, []);

  const sliderVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const infiniteScrollVariants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: associations.length * 3, // Dynamic duration based on number of items
          ease: "linear"
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-6 px Ratchet2 sm:px-4 lg:px-8">
        <div className="max-w-full sm:max-w-7xl mx-auto text-center">
          <p>Loading accreditations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-6 px-2 sm:px-4 lg:px-8">
        <div className="max-w-full sm:max-w-7xl mx-auto text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (associations.length === 0) {
    return (
      <div className="bg-gray-50 py-6 px-2 sm:px-4 lg:px-8">
        <div className="max-w-full sm:max-w-7xl mx-auto text-center">
          <p>No accreditations available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-6 px-2 sm:px-4 lg:px-8">
      <div className="max-w-full sm:max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-6"
          initial={{ opacity: 1 }}
          animate={isInView ? "visible" : "hidden"}
          variants={sliderVariants}
        >
          {/* <motion.h2 
            variants={itemVariants} 
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3"
          >
            Accreditations and Associations
          </motion.h2> */}


        </motion.div>



          <motion.h2 
              className="text-2xl md:text-4xl font-bold text-center mb-12 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
          >
              Accreditations  <span className="text-[#FF7426]"> and Associations</span>
          </motion.h2>

        {/* Unified Carousel */}
        <div className="overflow-hidden">
          <motion.div
            className="flex flex-nowrap"
            variants={infiniteScrollVariants}
            animate="animate"
          >
            {[...associations, ...associations].map((assoc, index) => (
              <div
                key={`${assoc._id}-${index}`}
                className="flex-shrink-0 px-2 w-48 sm:w-56 lg:w-64"
              >
                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full flex flex-col items-center">
                  <div className="h-16 sm:h-20 flex items-center justify-center mb-3">
                    <img
                      src={assoc.logo}
                      alt={assoc.title}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.src = '/images/default-certification.png';
                      }}
                    />
                  </div>
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 text-center">{assoc.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 text-center mt-2">{assoc.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CertificationSlider;
