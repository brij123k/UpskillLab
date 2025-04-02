import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ContactCard = ({ icon, title, info, description }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all h-full flex flex-col border border-gray-200"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-4xl text-[#ff7426] mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-1 font-medium">{info}</p>
      <p className="text-gray-500 mt-2 flex-grow">{description}</p>
    </motion.div>
  );
};

const ContactForm = () => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 sm:p-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-2xl font-bold text-[#4D2C5E] mb-6">Send us a message</h3>
      <form className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7426] focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7426] focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7426] focus:border-transparent"
            placeholder="What's this about?"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Your Message
          </label>
          <textarea
            id="message"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7426] focus:border-transparent"
            placeholder="Type your message here..."
          ></textarea>
        </div>
        <motion.button
          type="submit"
          className="w-full bg-[#ff7426] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#e56722] transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Send Message
        </motion.button>
      </form>
    </motion.div>
  );
};

const ContactPage = () => {
  const contactMethods = [
    {
      icon: "📌",
      title: "Our Location",
      info: "UpSkillLab Headquarters",
      description: "123 Tech Park, Innovation Road, Bengaluru, Karnataka 560001, India"
    },
    {
      icon: "📞",
      title: "Phone Number",
      info: "+91 98765 43210",
      description: "Monday to Friday, 9am to 6pm IST"
    },
    {
      icon: "✉️",
      title: "Email Address",
      info: "contact@upskilllab.com",
      description: "We'll respond within 24 hours"
    }
  ];

  return (
    <div className='bg-[#F7F7F7] min-h-screen'>
      
      {/* Animated Banner */}
      <motion.section 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="relative bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  {/* Decorative elements */}
  <motion.div
    className="absolute top-0 left-0 w-full h-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.1 }}
    transition={{ duration: 1.5 }}
  >
    <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-[#FF7426]"></div>
    <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-[#FF7426]"></div>
  </motion.div>

  <div className="relative max-w-7xl mx-auto text-center">
    <motion.h1 
      className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
      initial={{ y: -30 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      Contact <span className="text-[#FF7426]">UpSkillLab</span>
    </motion.h1>
    
    <motion.p
      className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto"
      initial={{ y: 30 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
    >
      We'd love to hear from you! Reach out for inquiries, support, or partnerships.
    </motion.p>
  </div>
</motion.section>

      {/* Contact Cards */}
      <motion.section 
        className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 sm:mb-16">
          {contactMethods.map((method, index) => (
            <ContactCard
              key={index}
              icon={method.icon}
              title={method.title}
              info={method.info}
              description={method.description}
            />
          ))}
        </div>

        {/* Form and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContactForm />
          
          {/* Map */}
          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden h-full min-h-[400px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.003168749709!2d77.59441431482193!3d12.9719629908566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf15e5e5e9a9f8c1!2sBangalore%20International%20Tech%20Park!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="UpSkillLab Location"
              className="rounded-xl"
            ></iframe>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;