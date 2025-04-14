import { motion } from 'framer-motion';
import MentorshipCard from './Mentorship';
import { FiCode, FiBook, FiStar } from 'react-icons/fi'; // Added relevant icons

const CardsContainer = () => {
  const features = [
    {
      title: 'Future-Ready Skills Start Here!',
      description:
        'Welcome to UpskillLab, your one-stop destination to...',
      fullDescription:
        'Welcome to UpskillLab, your one-stop destination to prepare for the future. We offer cutting-edge training, reskilling, and upskilling in the most in-demand domains such as Artificial Intelligence (AI), Data Science, Python, Excel, and beyond. Whether you’re a student aiming to upskill for free, a working professional exploring blended learning models, or an ambitious individual looking to fast-track your career, we’ve got a curated path for you. Join us and take charge of your career with expert-led programs, real-world projects, and industry recognition.',
      image:
        'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      icon: <FiCode />, // Icon for tech skills (AI, Data Science, Python)
      modalData: {
        details:
          'Includes expert-led programs, real-world projects, and industry-recognized certifications.',
        pricing: 'Free for students, subscriptions from $49/month',
      },
    },
    {
      title: 'Redefine Learning. Reimagine Careers.',
      description:
        'UpskillLab blends personalized, community-driven learning with....',
      fullDescription:
        'At UpskillLab, we believe in transformative education. Our approach blends personalized, community-driven learning, immersive and interactive content curated by domain experts, and differentiated instruction models that cater to diverse learning needs. Each course is designed with the perfect balance of academic theory and industry relevance, ensuring you’re not just learning — you’re becoming job-ready.',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      icon: <FiBook />, // Icon for learning and education
      modalData: {
        details:
          'Personalized learning paths, interactive content, and job-ready skills training.',
        pricing: 'Included in premium plans',
      },
    },
    {
      title: 'Where Passion Meets Profession',
      description:
        'Turn your passion into a profession with focused...',
      fullDescription:
        'Turn your passion into a profession with UpskillLab. Explore focused learning paths in Python Programming, Excel for Business, Data Visualization with Power BI, and Foundational to Advanced Data Science. Join our digital academy today and step into a future where your skills unlock the door to limitless professional opportunities.',
      image:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      icon: <FiStar />, // Icon for passion and achievement
      modalData: {
        details:
          'Focused courses in Python, Excel, Power BI, and Data Science with industry recognition.',
        pricing: 'From $29/month',
      },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <div key={index} className={`${index >= 3 ? 'hidden md:block' : ''}`}>
            <MentorshipCard {...feature} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CardsContainer;