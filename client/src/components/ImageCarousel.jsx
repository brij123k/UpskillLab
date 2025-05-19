import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import {getDataHandler} from '../config/services';
import {useNavigate } from 'react-router-dom';
const HiringPartnersShowcase = () => {
    const [hiringPartners, setHiringPartners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const [formData, setFormData] = useState({
    //   companyName: '',
    //   contactPerson: '',
    //   email: '',
    //   phone: '',
    //   partnershipType: '',
    //   message: ''
    // });

    const handleHiringPartnerss = async () => {
        try {
            setIsLoading(true);
            const res = await getDataHandler('hiringPartners');
            if (!res || !res.hiringPartners) {
                throw new Error('Invalid API response structure');
            }

            const newhiringPartner = res.hiringPartners.map((item, index) => ({
                // id: index + 1,
                name: item.name || 'Default Heading',
                logo: item.logo || 'Default logo'
            }));

            setHiringPartners(newhiringPartner);
            setError(null);
        } catch (err) {
            console.error("Failed to load banners:", err);
            setError(err.message);
            setHiringPartners([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleHiringPartnerss();
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
                Error loading HiringPartners logo: {error}
                <button 
                    onClick={handleHiringPartnerss}
                    className="ml-4 px-4 py-2 bg-[#FF7426] text-white rounded"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Double the array for seamless looping
    const doubledLogos = [...hiringPartners, ...hiringPartners];

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle form submission here
    //     // You would typically send this data to your API
    //     // Then close the modal or show success message
    //     setIsModalOpen(false);
    //     // Reset form
    //     setFormData({
    //         companyName: '',
    //         contactPerson: '',
    //         email: '',
    //         phone: '',
    //         partnershipType: '',
    //         message: ''
    //     });
    // };

    return (
        <>
         <div className="hidden lg:block py-7 bg-white">
        <div className="container mx-auto px-4">
          {/* Title with color accent */}
          <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
          >
              Our <span className="text-[#FF7426]">Hiring Partners</span>
          </motion.h2>

          {/* Primary Marquee - Right to Left */}
          <div className="py-2 mb-3 relative overflow-hidden">
              <motion.div
                  className="flex items-center"
                  animate={{
                      x: ['0%', '-100%'],
                  }}
                  transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'linear',
                  }}
                  whileHover={{ animationPlayState: 'paused' }}
              >
                  {doubledLogos.map((partner, index) => (
                      <motion.div 
                          key={`marquee1-${index}`}
                          className="flex-shrink-0 mx-8"
                          whileHover={{
                              scale: 1.2,
                              transition: { duration: 0.3 }
                          }}
                      >
                          <img 
                              src={partner.logo} 
                              alt={partner.name} 
                              className="h-16 object-contain grayscale hover:grayscale-0 transition-all duration-500"
                          />
                      </motion.div>
                  ))}
              </motion.div>
              {/* Gradient fade edges */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
          </div>

          {/* Secondary Marquee - Left to Right (smaller logos) */}
          <div className="py-6 relative overflow-hidden">
              <motion.div
                  className="flex items-center"
                  animate={{
                      x: ['-100%', '0%'],
                  }}
                  transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: 'linear',
                  }}
                  whileHover={{ animationPlayState: 'paused' }}
              >
                  {doubledLogos.map((partner, index) => (
                      <motion.div 
                          key={`marquee2-${index}`}
                          className="flex-shrink-0 mx-6"
                          whileHover={{
                              scale: 1.3,
                              rotate: [0, -5, 5, 0],
                              transition: { duration: 0.5 }
                          }}
                      >
                          <img 
                              src={partner.logo} 
                              alt={partner.name} 
                              className="h-12 object-contain opacity-90 hover:opacity-100 transition-all duration-300"
                          />
                      </motion.div>
                  ))}
              </motion.div>
              {/* Gradient fade edges */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
          </div>

          {/* CTA with accent color */}
          <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
          >
              <motion.button
              onClick={()=>navigate("/ContactUs")}
                  className="px-8 py-3 bg-[#4D2C5E] text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all cursor-pointer"  
                  whileHover={{ 
                      scale: 1.05,
                      backgroundColor: '#5F3A73'
                  }}
                  whileTap={{ scale: 0.95 }}
              >
                  Become a Partner
              </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Version - Visible on screens smaller than lg */}
      <div className="lg:hidden py-10 bg-white">
  <div className="container mx-auto">
    {/* Title with color accent */}
    <motion.h2 
      className="text-2xl font-bold text-center text-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Our <span className="text-[#FF7426]">Hiring Partners</span>
    </motion.h2>

    {/* First Marquee Row - Left to Right (larger logos) */}
    <div className="relative overflow-hidden py-1 mb-1">
      <marquee 
        behavior="scroll" 
        direction="left" 
        scrollamount="4"
        onMouseOver={e => e.target.stop()} 
        onMouseOut={e => e.target.start()}
      >
        <div className="flex items-center">
          {doubledLogos.map((partner, index) => (
            <div 
              key={`mobile-marquee1-${index}`}
              className="flex-shrink-0 mx-2 px-3 border-1 border-[#FF7426]/10 rounded-md"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </marquee>
      {/* Gradient fade edges */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />
    </div>

    {/* Second Marquee Row - Right to Left (smaller logos) */}
    <div className="relative overflow-hidden py-1">
      <marquee 
        behavior="scroll" 
        direction="right" 
        scrollamount="3"
        onMouseOver={e => e.target.stop()} 
        onMouseOut={e => e.target.start()}
      >
        <div className="flex items-center">
          {doubledLogos.map((partner, index) => (
            <div 
              key={`mobile-marquee2-${index}`}
              className="flex-shrink-0 mx-2 px-3 border-1 border-[#FF7426]/10 rounded-md"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-8 object-contain opacity-90 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </marquee>
      {/* Gradient fade edges */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />
    </div>

    {/* CTA with accent color */}
    <motion.div 
      className="mt-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
        <motion.button
        onClick={()=>navigate("/ContactUs")}
          className="px-6 py-2 bg-[#4D2C5E] text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all cursor-pointer text-sm"  
          whileHover={{ 
            scale: 1.05,
            backgroundColor: '#5F3A73'
          }}
          whileTap={{ scale: 0.95 }}
        >
          Become a Partner
        </motion.button>
    </motion.div>
  </div>
</div>
      </>
    );
};

export default HiringPartnersShowcase;

// {createPortal(
//   <AnimatePresence>
//     {isModalOpen && (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.3, ease: "easeInOut" }}
//         className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       >
//         {/* Backdrop */}
//         <motion.div
//           initial={{ backdropFilter: 'blur(0px)' }}
//           animate={{ backdropFilter: 'blur(4px)' }}
//           exit={{ backdropFilter: 'blur(0px)' }}
//           transition={{ duration: 0.3 }}
//           className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm"
//           onClick={() => setIsModalOpen(false)}
//         />

//         {/* Modal container */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.95, y: 20 }}
//           transition={{ 
//             type: "spring",
//             damping: 20,
//             stiffness: 300,
//             duration: 0.3
//           }}
//           className="relative z-10 w-full max-w-lg mx-auto"
//         >
//           {/* Modal content */}
//           <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
//             {/* Gradient header */}
//             <div className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] p-5">
//               <div className="flex items-center justify-between">
//                 <motion.h2 
//                   className="text-xl font-bold text-white"
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   Become a Hiring Partner
//                 </motion.h2>
//                 <motion.button
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-white hover:text-[#FF7426] transition-colors"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </motion.button>
//               </div>
//             </div>

//             {/* Scrollable content */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="max-h-[70vh] overflow-y-auto p-6"
//             >
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
//                     Company Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="companyName"
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleInputChange}
//                     required
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4D2C5E] focus:ring focus:ring-[#4D2C5E] focus:ring-opacity-50 p-2 border"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">
//                     Contact Person *
//                   </label>
//                   <input
//                     type="text"
//                     id="contactPerson"
//                     name="contactPerson"
//                     value={formData.contactPerson}
//                     onChange={handleInputChange}
//                     required
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4D2C5E] focus:ring focus:ring-[#4D2C5E] focus:ring-opacity-50 p-2 border"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                       Email *
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       required
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4D2C5E] focus:ring focus:ring-[#4D2C5E] focus:ring-opacity-50 p-2 border"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4D2C5E] focus:ring focus:ring-[#4D2C5E] focus:ring-opacity-50 p-2 border"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="partnershipType" className="block text-sm font-medium text-gray-700">
//                     Type of Partnership *
//                   </label>
//                   <select
//                     id="partnershipType"
//                     name="partnershipType"
//                     value={formData.partnershipType}
//                     onChange={handleInputChange}
//                     required
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4D2C5E] focus:ring focus:ring-[#4D2C5E] focus:ring-opacity-50 p-2 border"
//                   >
//                     <option value="">Select an option</option>
//                     <option value="hiring">Hiring Partners</option>
//                     <option value="training">Training Partners</option>
//                     <option value="placement">Placement Partners</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700">
//                     How would you like to collaborate with us?
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     rows={4}
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4D2C5E] focus:ring focus:ring-[#4D2C5E] focus:ring-opacity-50 p-2 border"
//                   />
//                 </div>

//                 <div className="flex justify-end space-x-3 pt-2">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-4 py-2 text-sm font-medium text-[#4D2C5E] border border-[#4D2C5E] rounded-md hover:bg-[#4D2C5E] hover:text-white transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-6 py-2 bg-[#4D2C5E] text-white rounded-md hover:bg-[#5F3A73] transition-colors"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </div>
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>,
//   document.body
// )}