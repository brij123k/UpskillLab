import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { AllCourses } from '../../data';
import EnrollmentModal from '../../components/Modal/EnrollmentModal';
// Mock API function to fetch course data (replace with your actual API call)
const fetchCourseData = async (id) => {
  // In a real app, this would be an API call like:
  // return await fetch(`/api/courses/${id}`).then(res => res.json());
  
  // Mock data matching your format
  const courses =AllCourses
  
  return courses.find(course => course.id === parseInt(id));
};

const CourseDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const { id } = useParams();
  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setIsEnrollModalOpen(true);
  };

  const handleEnrollSubmit = () => {
    // Handle enrollment logic here
    setIsEnrollModalOpen(false);
  };

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        const data = await fetchCourseData(id);
        setCourseData(data);
      } catch (error) {
        console.error('Error loading course data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCourseData();
  }, [id]);

  const tabButtons = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'faq', label: 'FAQ' },
    { id: 'brochure', label: 'Download Brochure' },
    { id: 'certificate', label: 'Certificate' },
    { id: 'job', label: 'Jobs' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4D2C5E] border-t-[#FF7426] rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-[#4D2C5E]">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#4D2C5E]">Course not found</h2>
          <p className="mt-2 text-gray-600">The requested course could not be loaded.</p>
        </div>
      </div>
    );
  }

  // Format the course data for display
  const formattedCourseData = {
    imageUrl: courseData.imageUrl,
    title: courseData.title,
    date: `Starts ${courseData.start_date}`,
    studentsEnrolled: `${courseData.studentsEnrolled.toLocaleString()}+ students enrolled`,
    video: courseData.video,
    highlights: {
      fee: `$${courseData.discountedPrice}`,
      mode: "Online",
      duration: courseData.duration,
      format: "Self-paced with live sessions",
      certificate: courseData.certificate ? "Yes (Digital & Printed)" : "No"
    },
    tabs: {
      overview: {
        content: (
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#4D2C5E]">Course Description</h3>
            <p className="mb-4">This comprehensive course covers modern {courseData.category} technologies including {courseData.tags.join(', ')}. You'll learn by building real-world projects that showcase your skills.</p>
            
            <h3 className="text-xl font-bold mb-4 text-[#4D2C5E]">What You'll Learn</h3>
            <ul className="list-disc pl-5 space-y-2">
              {courseData.syllabus.flatMap(week => week.topics.map((topic, i) => (
                <li key={`${week.week}-${i}`}>{topic}</li>
              )).slice(0, 5))}
            </ul>

            {courseData.prerequisites && courseData.prerequisites.length > 0 && (
              <>
                <h3 className="text-xl font-bold mt-6 mb-4 text-[#4D2C5E]">Prerequisites</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {courseData.prerequisites.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {courseData.projects && courseData.projects.length > 0 && (
              <>
                <h3 className="text-xl font-bold mt-6 mb-4 text-[#4D2C5E]">Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseData.projects.map((project, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-[#4D2C5E]">{project.title}</h4>
                      <p className="mt-2 text-gray-600">{project.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )
      },
      curriculum: {
        content: (
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#4D2C5E]">Course Modules</h3>
            <div className="space-y-4">
              {courseData.syllabus.map((module, index) => (
                <div key={index} className="border-l-4 border-[#FF7426] pl-4 py-2">
                  <h4 className="font-semibold">Week {module.week}: {module.title}</h4>
                  <ul className="mt-2 space-y-1">
                    {module.topics.map((topic, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-[#FF7426] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )
      },
      faq: {
        content: (
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#4D2C5E]">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {courseData.faqs.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-[#4D2C5E]">{item.question}</h4>
                  <p className="mt-2 text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )
      },
      job: {
        content: (
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#4D2C5E]">Related Job Opportunities</h3>
            <div className="space-y-6">
              {[
                {
                  title: `${courseData.category} Developer`,
                  companies: ["TechCorp", "DevSolutions", "InnovateX"],
                  salary: "$80,000 - $120,000",
                  skills: courseData.tags.slice(0, 3).concat("Problem Solving", "Teamwork")
                },
                {
                  title: `Senior ${courseData.category} Engineer`,
                  companies: ["DigitalSystems", "WebCraft"],
                  salary: "$100,000 - $150,000",
                  skills: courseData.tags.concat("Leadership", "System Design")
                },
                {
                  title: `${courseData.category} Consultant`,
                  companies: ["GlobalTech", "ITPartners"],
                  salary: "$90,000 - $130,000",
                  skills: courseData.tags.slice(0, 2).concat("Communication", "Client Management")
                }
              ].map((job, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-[#4D2C5E]">{job.title}</h4>
                      <p className="text-gray-600 mt-1">
                        Hiring Companies: {job.companies.join(", ")}
                      </p>
                      <p className="text-[#FF7426] font-medium mt-2">{job.salary}</p>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                        {job.skills.map((skill, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 bg-[#4D2C5E]/10 text-[#4D2C5E] text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 text-[#FF7426] font-medium flex items-center">
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 bg-[#4D2C5E]/5 p-6 rounded-xl border border-[#4D2C5E]/10">
              <h4 className="text-lg font-bold text-[#4D2C5E] mb-3">Career Guidance</h4>
              <p className="mb-4">Completing this course prepares you for these exciting career paths. Our career services team can help with:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Resume and LinkedIn profile optimization</li>
                <li>Interview preparation and mock interviews</li>
                <li>Job search strategies</li>
                <li>Connections to our hiring partners</li>
              </ul>
              <button className="mt-4 bg-[#FF7426] text-white px-4 py-2 rounded-lg font-medium">
                Connect with Career Counselor
              </button>
            </div>
          </div>
        )
      },
      brochure: {
        content: (
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="bg-[#4D2C5E] p-6">
                <h3 className="text-2xl font-bold text-white">Course Brochure</h3>
              </div>
              <div className="p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#FF7426]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-4 mb-6">Download our complete course brochure with detailed curriculum, instructor profiles, and success stories.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FF7426] text-white px-6 py-2 rounded-lg"
                >
                  Download Brochure (PDF)
                </motion.button>
              </div>
            </motion.div>
          </div>
        )
      },
      certificate: {
        content: (
          <div className="text-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg mx-auto"
            >
              <h3 className="text-2xl font-bold mb-6 text-[#4D2C5E]">Course Certificate</h3>
              <div className="border-2 border-[#4D2C5E] rounded-lg p-2 mb-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="bg-[#4D2C5E] text-white p-4 rounded-t-lg">
                    <h4 className="text-xl font-bold">Certificate of Completion</h4>
                    <p>Presented to: [Your title]</p>
                  </div>
                  <div className="p-6">
                    <p className="mb-4">This is to certify that [Your title] has successfully completed the <span className="font-semibold">{courseData.title}</span> course.</p>
                    <div className="flex justify-between mb-6">
                      <div>
                        <p className="font-semibold">Date</p>
                        <p>MM/DD/YYYY</p>
                      </div>
                      <div>
                        <p className="font-semibold">Instructor</p>
                        <p>{courseData.instructor}</p>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-8">
                      <div className="text-center">
                        <div className="h-16 w-16 border-2 border-[#FF7426] rounded-full mx-auto mb-2"></div>
                        <p>Instructor Signature</p>
                      </div>
                      <div className="text-center">
                        <div className="h-16 w-16 border-2 border-[#FF7426] rounded-full mx-auto mb-2"></div>
                        <p>Institution Seal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FF7426] text-white px-6 py-2 rounded-lg"
              >
                Download Your Certificate
              </motion.button>
            </motion.div>
          </div>
        )
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Course Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#4D2C5E] mb-2">Course Details</h1>
          <div className="w-24 h-1 bg-[#FF7426] mx-auto"></div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Course Info) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course imageUrl */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="overflow-hidden rounded-xl shadow-lg"
            >
              <img 
                src={formattedCourseData.imageUrl} 
                alt={formattedCourseData.title} 
                className="w-full h-64 sm:h-80 object-cover"
              />
            </motion.div>

            {/* Course Title and Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-[#4D2C5E] mb-2">{formattedCourseData.title}</h2>
              <div className="flex items-center space-x-4 text-gray-600 mb-6">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-[#FF7426]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formattedCourseData.date}
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-[#FF7426]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {formattedCourseData.studentsEnrolled}
                </span>
              </div>
            </motion.div>

            {/* Tab Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-2 border-b border-gray-200"
            >
              {tabButtons.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#4D2C5E] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-b-lg rounded-tr-lg shadow-sm"
            >
              {formattedCourseData.tabs[activeTab].content}
            </motion.div>
          </div>

          {/* Right Column (Video and Highlights) */}
          <div className="space-y-6">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="overflow-hidden rounded-xl shadow-lg"
            >
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={formattedCourseData.video}
                  className="w-full h-64 sm:h-72"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Course video"
                ></iframe>
              </div>
            </motion.div>

            {/* Course Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold text-[#4D2C5E] mb-4">Course Highlights</h3>
              <div className="space-y-4">
                {[
                  { icon: '💰', label: 'Course Fee', value: formattedCourseData.highlights.fee },
                  { icon: '🖥️', label: 'Mode', value: formattedCourseData.highlights.mode },
                  { icon: '⏱️', label: 'Duration', value: formattedCourseData.highlights.duration },
                  { icon: '📚', label: 'Format', value: formattedCourseData.highlights.format },
                  { icon: '🏆', label: 'Certificate', value: formattedCourseData.highlights.certificate }
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enroll Button */}
              <motion.button
              onClick={() => handleEnrollClick(courseData)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-gradient-to-r from-[#FF7426] to-[#FF9E5E] text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all"
              >
                Enroll Now
              </motion.button>

              {/* Share Options */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Share this course:</p>
                <div className="flex space-x-3">
                  {['Facebook', 'Twitter', 'LinkedIn', 'WhatsApp'].map((social) => (
                    <motion.button
                      key={social}
                      whileHover={{ y: -2 }}
                      className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                    >
                      <span className="sr-only">{social}</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 0H0v24h24z" fill="none"/>
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {selectedCourse && (
        <EnrollmentModal
          course={selectedCourse}
          isOpen={isEnrollModalOpen}
          onClose={() => setIsEnrollModalOpen(false)}
          onEnroll={handleEnrollSubmit}
        />
      )}
    </div>
  );
};

export default CourseDetailsPage;