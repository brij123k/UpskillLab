import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StudentFeedBack from '../../components/Cards/StudentFeedBack';
import TrainingBanner from '../../components/banners/TrainingBanner';
import FeedbaackBanner from '../../components/banners/FeedbackBanner';
import AdmissionForm from '../../components/Forms/AdmissionForm';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaClock, FaShareAlt } from 'react-icons/fa';

// Sample blog data (would normally come from API)
const blogData = {
  id: 1,
  title: "How I Transitioned from Mechanical Engineering to Data Science",
  excerpt: "My journey from traditional engineering to cutting-edge data science with UpSkillLab's PGP program and how it transformed my career path completely.",
  content: `
    <p>When I first considered transitioning from mechanical engineering to data science, the task seemed daunting. I had spent five years working in automotive design, and the thought of starting over in a completely different field was both exciting and terrifying.</p>
    
    <h2>Discovering Data Science</h2>
    <p>My journey began when I attended an UpSkillLab webinar on career transitions. The speaker, a former chemical engineer turned data scientist, shared how the PGP program helped her make the switch. What stood out was the structured curriculum and hands-on projects that mirrored real-world scenarios.</p>
    
    <p>I enrolled in the <strong>PGP in Data Science and Machine Learning</strong>, starting with the foundation modules that covered Python programming and statistics. Even with my engineering background, these initial weeks were challenging but incredibly rewarding.</p>
    
    <h2>The Turning Point</h2>
    <p>The capstone project was where everything clicked. Working with a team of fellow career-changers on a predictive maintenance model for manufacturing equipment allowed me to bridge my mechanical engineering experience with new data science skills.</p>
    
    <blockquote>
      "The mentorship I received during the capstone project helped me see how my domain knowledge could become my biggest advantage in data science."
    </blockquote>
    
    <h2>Career Transformation</h2>
    <p>Six months after completing the program, I joined a leading automotive tech company as a Data Scientist. My unique combination of mechanical engineering expertise and data science skills made me stand out in the job market.</p>
    
    <p>Looking back, these were the key factors in my successful transition:</p>
    <ul>
      <li>The structured, project-based learning approach</li>
      <li>Mentorship from industry practitioners</li>
      <li>Career services that helped me position my background as an asset</li>
      <li>The alumni network that provided job referrals</li>
    </ul>
  `,
  author: "Rahul Sharma",
  date: "May 15, 2023",
  readTime: "5 min",
  category: "Student Stories",
  imageUrl: "https://images.pexels.com/photos/4144225/pexels-photo-4144225.jpeg",
  tags: ["Career Change", "Data Science", "Success Story"]
};

const BlogDetailPage = () => {
  // In a real app, you would fetch the blog post by ID from an API
  // const { id } = useParams();
  // const blog = fetchBlogById(id);
  
  const blog = blogData; // Using the sample data for demo

  return (
    <div className='bg-[#F7F7F7] min-h-screen'>
      {/* Blog Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex items-center mb-6"
          >
            <a 
              href="/blog" 
              className="flex items-center text-white/90 hover:text-white transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Blog
            </a>
          </motion.div>
          
          <div className="text-center">
            <motion.span 
              className="inline-block px-3 py-1 text-sm font-semibold text-[#ff7426] bg-white rounded-full mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              {blog.category}
            </motion.span>
            
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {blog.title}
            </motion.h1>
            
            <motion.div
              className="flex flex-wrap items-center justify-center text-white/80 text-sm gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center">
                <FaUser className="mr-2 text-[#FF7426]" />
                {blog.author}
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-[#FF7426]" />
                {blog.date}
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2 text-[#FF7426]" />
                {blog.readTime} read
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Blog Content */}
      <motion.main
        className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Featured Image */}
        <motion.div
          className="rounded-xl overflow-hidden mb-8 shadow-lg"
          whileHover={{ scale: 1.005 }}
        >
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-auto max-h-[500px] object-cover"
            loading="eager"
          />
        </motion.div>

        {/* Blog Content */}
        <article className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-xs font-medium text-[#4D2C5E] bg-[#4D2C5E]/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Main Content */}
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Share Options */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-[#4D2C5E] mb-4 flex items-center">
              <FaShareAlt className="mr-2 text-[#FF7426]" />
              Share this post
            </h3>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Facebook', 'WhatsApp'].map((social) => (
                <motion.button
                  key={social}
                  whileHover={{ y: -2 }}
                  className="p-2 bg-gray-100 rounded-full text-[#4D2C5E] hover:bg-gray-200 transition-colors"
                >
                  <span className="sr-only">Share on {social}</span>
                  <span>{social}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </article>

        {/* Author Bio */}
        <motion.section 
          className="bg-white rounded-xl shadow-sm p-6 mb-12"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt={blog.author}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#4D2C5E] mb-1">About {blog.author}</h3>
              <p className="text-gray-600 mb-3">Data Scientist at AutoTech | UpSkillLab Alumni</p>
              <p className="text-gray-700">
                Rahul is a mechanical engineer turned data scientist who specializes in predictive maintenance models 
                for manufacturing equipment. He mentors students transitioning into tech careers through UpSkillLab's 
                alumni program.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Related Posts */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-[#4D2C5E] mb-6">More Student Stories</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[2, 3, 4].map(id => {
              const relatedBlog = {
                2: {
                  title: "10 Python Libraries Every Data Science Beginner Should Know",
                  excerpt: "Essential Python libraries that helped me during my UpSkillLab journey...",
                  category: "Learning Tips",
                  imageUrl: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
                  date: "Jun 2, 2023",
                  readTime: "7 min"
                },
                3: {
                  title: "Balancing Full-Time Work with UpSkillLab's Evening Batches",
                  excerpt: "Practical strategies I used to manage my job while completing the PGP...",
                  category: "Student Stories",
                  imageUrl: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
                  date: "Apr 28, 2023",
                  readTime: "4 min"
                },
                4: {
                  title: "My Capstone Project Experience at UpSkillLab",
                  excerpt: "A deep dive into how my capstone project helped me land my first data science role...",
                  category: "Projects",
                  imageUrl: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
                  date: "Jul 10, 2023",
                  readTime: "6 min"
                }
              }[id];
              
              return (
                <motion.div
                  key={id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
                  whileHover={{ y: -3 }}
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={relatedBlog.imageUrl}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-[#ff7426] bg-[#ff7426]/10 rounded-full mb-2">
                      {relatedBlog.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{relatedBlog.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{relatedBlog.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{relatedBlog.date}</span>
                      <span>{relatedBlog.readTime} read</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </motion.main>

      {/* Keep the same footer components */}
      <StudentFeedBack />
      <div className='py-4'>
        <AdmissionForm />
      </div>
      <TrainingBanner />
      <FeedbaackBanner />
    </div>
  );
};

export default BlogDetailPage;