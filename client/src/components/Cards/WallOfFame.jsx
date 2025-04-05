import React,{useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDataHandler } from '../../config/services';
const WallOfFame = () => {
    const [successstudents, setSuccessstudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);

      const handleSuccessstudents = async () => {
              try {
                setIsLoading(true);
                const res = await getDataHandler('successStroy');
                console.log("Success Stories API response:", res.stories);
                if (!res || !res.stories) {
                  throw new Error('Invalid API response structure');
                }
          
                const newStory = res.stories.map((item, index) => ({
                  id: index + 1,
                  name: item.name || 'Unknown Name',
                  position: item.jobTitle || 'N/A',
                  company: item.companyName || 'N/A',
                  companyLogo: item.companyLogoUrl || 'N/A.png',
                  photo: item.userImageUrl || 'N/A.png',
                  joined: item.batch_Year || 'N/A'
                }));
          
                setSuccessstudents(newStory);
                setError(null);
              } catch (err) {
                console.error("Failed to load banners:", err);
                setError(err.message);
                setSuccessstudents([]);
              } finally {
                setIsLoading(false);
              }
            };
          
            useEffect(() => {
              handleSuccessstudents();
            }, []);
          
            if (isLoading) {
              return (
                <div className="w-full h-[600px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7426]"></div>
                </div>
              );
            }
          
            if (error) {
              return (
                <div className="w-full h-[600px] flex items-center justify-center text-red-500">
                  Error loading These Stories: {error}
                  <button 
                    onClick={handleSuccessstudents}
                    className="ml-4 px-4 py-2 bg-[#FF7426] text-white rounded"
                  >
                    Retry
                  </button>
                </div>
              );
            }

            const students = successstudents;
            console.log("Students data:", students);
  // Sample student data
  // const students = [
  //   {
  //     id: 1,
  //     name: "Rahul Sharma",
  //     position: "Senior Software Engineer",
  //     company: "Microsoft",
  //     companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  //     photo: "https://randomuser.me/api/portraits/men/32.jpg",
  //     joined: "2022"
  //   },
  //   {
  //     id: 2,
  //     name: "Priya Patel",
  //     position: "Data Scientist",
  //     company: "Google",
  //     companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  //     photo: "https://randomuser.me/api/portraits/women/44.jpg",
  //     joined: "2021"
  //   },
  //   {
  //     id: 3,
  //     name: "Arjun Singh",
  //     position: "Product Manager",
  //     company: "Amazon",
  //     companyLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  //     photo: "https://randomuser.me/api/portraits/men/67.jpg",
  //     joined: "2023"
  //   },
  //   {
  //     id: 4,
  //     name: "Neha Gupta",
  //     position: "UX Designer",
  //     company: "Adobe",
  //     companyLogo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo.svg",
  //     photo: "https://randomuser.me/api/portraits/women/63.jpg",
  //     joined: "2022"
  //   },
  //   {
  //     id: 5,
  //     name: "Vikram Joshi",
  //     position: "DevOps Engineer",
  //     company: "Netflix",
  //     companyLogo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg",
  //     photo: "https://randomuser.me/api/portraits/men/52.jpg",
  //     joined: "2021"
  //   },
  //   {
  //     id: 6,
  //     name: "Ananya Reddy",
  //     position: "Machine Learning Engineer",
  //     company: "Tesla",
  //     companyLogo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  //     photo: "https://randomuser.me/api/portraits/women/68.jpg",
  //     joined: "2023"
  //   }
  // ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 2xl:px-10 bg-[#FFF9F5]">
  <div className="max-w-7xl 2xl:max-w-8xl mx-auto">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-12 2xl:mb-16"
    >
      <h2 className="text-3xl font-bold text-[#4d2c5e] sm:text-4xl 2xl:text-5xl">
        Our <span className="text-[#FF7426]">Wall of Fame</span>
      </h2>
      <p className="mt-4 2xl:mt-6 text-lg 2xl:text-xl text-gray-600 max-w-3xl 2xl:max-w-4xl mx-auto">
        Celebrating the outstanding achievements of our alumni
      </p>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8">
      {students.map((student, index) => (
        <motion.div
          key={student.id}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl 2xl:rounded-2xl shadow-md 2xl:shadow-lg overflow-hidden border border-[#FFD9C5] hover:shadow-lg 2xl:hover:shadow-xl transition-all duration-300 relative isolate"
        >
          {/* Enhanced Ribbon Design */}
          <div className="absolute right-0 top-0 h-full w-8 2xl:w-10 bg-[#FF7426] z-0">
            {/* Ribbon folds */}
            <div className="absolute top-1/4 -left-1 w-2 h-3 bg-[#FF9142] rotate-45 transform origin-right"></div>
            <div className="absolute top-1/2 -left-1 w-2 h-3 bg-[#FF9142] -rotate-45 transform origin-right"></div>
            <div className="absolute top-3/4 -left-1 w-2 h-3 bg-[#FF9142] rotate-45 transform origin-right"></div>
            
            {/* Ribbon text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform -rotate-90 whitespace-nowrap">
              <span className="text-xs 2xl:text-sm font-bold uppercase tracking-wider text-white">
                {['ACHIEVER', 'TOP TALENT', 'STAR'][index % 3]}
              </span>
            </div>
          </div>

          {/* Ribbon end effect */}
          <div className="absolute right-8 2xl:right-10 top-0 w-3 h-3 bg-[#D4560E]"></div>
          <div className="absolute right-8 2xl:right-10 bottom-0 w-3 h-3 bg-[#D4560E]"></div>

          <div className="p-6 2xl:p-8 pr-12 2xl:pr-14 relative z-10"> {/* Increased right padding */}
            <div className="flex items-start">
              <div className="relative mr-4 2xl:mr-5">
                <div className="absolute -inset-1 2xl:-inset-1.5 rounded-full bg-gradient-to-r from-[#FF9142] to-[#FF7426] opacity-20 blur-sm"></div>
                <img 
                  src={student.photo} 
                  alt={student.name} 
                  className="relative w-16 h-16 2xl:w-20 2xl:h-20 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>
              <div>
                <h3 className="text-lg 2xl:text-xl font-bold text-gray-900">{student.name}</h3>
                <p className="text-gray-600 2xl:text-lg">{student.position}</p>
                <div className="flex items-center mt-2 2xl:mt-3">
                  <img 
                    src={student.companyLogo} 
                    alt={student.company} 
                    className="h-5 2xl:h-6 mr-2 object-contain"
                  />
                  <span className="text-sm 2xl:text-base text-gray-500">{student.company}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 2xl:mt-6 pt-4 2xl:pt-5 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs 2xl:text-sm font-medium text-[#FF7426] bg-[#FFF0E5] px-2 py-1 2xl:px-3 2xl:py-1.5 rounded">
                Batch of {student.joined}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
  );
};

export default WallOfFame;