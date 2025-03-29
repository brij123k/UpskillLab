import React from 'react';
import { motion } from 'framer-motion';

const WallOfFame = () => {
  // Sample student data
  const students = [
    {
      id: 1,
      name: "Rahul Sharma",
      position: "Senior Software Engineer",
      company: "Microsoft",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      joined: "2022"
    },
    {
      id: 2,
      name: "Priya Patel",
      position: "Data Scientist",
      company: "Google",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      joined: "2021"
    },
    {
      id: 3,
      name: "Arjun Singh",
      position: "Product Manager",
      company: "Amazon",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      photo: "https://randomuser.me/api/portraits/men/67.jpg",
      joined: "2023"
    },
    {
      id: 4,
      name: "Neha Gupta",
      position: "UX Designer",
      company: "Adobe",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo.svg",
      photo: "https://randomuser.me/api/portraits/women/63.jpg",
      joined: "2022"
    },
    {
      id: 5,
      name: "Vikram Joshi",
      position: "DevOps Engineer",
      company: "Netflix",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg",
      photo: "https://randomuser.me/api/portraits/men/52.jpg",
      joined: "2021"
    },
    {
      id: 6,
      name: "Ananya Reddy",
      position: "Machine Learning Engineer",
      company: "Tesla",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
      joined: "2023"
    }
  ];

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
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#FFF9F5]">
  <div className="max-w-7xl mx-auto">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        Our <span className="text-[#FF7426]">Wall of Fame</span>
      </h2>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Celebrating the outstanding achievements of our alumni
      </p>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map((student, index) => (
        <motion.div
          key={student.id}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-[#FFD9C5] hover:shadow-lg transition-all duration-300"
        >
          <div className="p-6">
            <div className="flex items-start">
              <div className="relative mr-4">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FF9142] to-[#FF7426] opacity-20 blur-sm"></div>
                <img 
                  src={student.photo} 
                  alt={student.name} 
                  className="relative w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
                <p className="text-gray-600">{student.position}</p>
                <div className="flex items-center mt-2">
                  <img 
                    src={student.companyLogo} 
                    alt={student.company} 
                    className="h-5 mr-2 object-contain"
                  />
                  <span className="text-sm text-gray-500">{student.company}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs font-medium text-[#FF7426] bg-[#FFF0E5] px-2 py-1 rounded">
                Batch of {student.joined}
              </span>
              {/* <button className="text-xs font-medium text-[#FF7426] hover:text-[#E55C00] transition-colors">
                View Story →
              </button> */}
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