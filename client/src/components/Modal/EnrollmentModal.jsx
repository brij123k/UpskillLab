import { motion } from 'framer-motion';
import Modal from './CommonModal';
import React,{ useState } from 'react';
const EnrollmentModal = ({ course, isOpen, onClose, onEnroll }) => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Enroll in ${course?.name}`}>
            <div className="space-y-6">
                {/* Course Summary */}
                <div className="flex gap-4">
                    <div className="w-1/3 min-w-[100px]">
                        <img
                            src={course.image}
                            alt={course.name}
                            className="w-full h-auto rounded-lg object-cover shadow-sm"
                        />
                    </div>
                    <div className="w-2/3">
                        <h3 className="text-xl font-bold text-[#4D2C5E]">{course.name}</h3>
                        <div className="flex items-center mt-1 mb-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${course.level === 'Beginner' ? 'bg-blue-100 text-blue-800' :
                                    course.level === 'Intermediate' ? 'bg-purple-100 text-purple-800' :
                                        'bg-[#FF7426]/20 text-[#FF7426]'
                                }`}>
                                {course.level}
                            </span>
                            <div className="flex items-center ml-3 text-yellow-500">
                                <span className="text-sm font-bold mr-1">{course.rating}</span>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-gray-600">{course.category}</p>
                        <p className="text-lg font-bold text-[#4D2C5E] mt-2">${course.price}</p>
                    </div>
                </div>

                {/* Enrollment Form */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#4D2C5E] mb-1">Full Name</label>
                        <motion.input
                            type="text"
                            whileFocus={{ borderColor: "#FF7426" }}
                            className="w-full px-3 py-2 border border-[#4D2C5E]/30 rounded-lg focus:ring-2 focus:ring-[#FF7426] focus:border-transparent"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#4D2C5E] mb-1">Email</label>
                        <motion.input
                            type="email"
                            whileFocus={{ borderColor: "#FF7426" }}
                            className="w-full px-3 py-2 border border-[#4D2C5E]/30 rounded-lg focus:ring-2 focus:ring-[#FF7426] focus:border-transparent"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            className="h-4 w-4 rounded  focus:ring-[#FF7426] cursor-pointer appearance-none border-2 border-[#4D2C5E]/50 checked:bg-[#FF7426] checked:border-[#FF7426]"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-[#4D2C5E]">
                            I agree to the <a href="#" className="text-[#FF7426] hover:underline">terms and conditions</a>
                        </label>
                    </div>
                </div>
{/* Payment Options */}
<div className="border-t border-[#4D2C5E]/10 pt-4">
  <h4 className="text-sm font-medium text-[#4D2C5E] mb-3">Payment Method</h4>
  <div className="grid grid-cols-3 gap-3">
    {/* Google Pay */}
    <motion.button
    onClick={() => setSelectedPayment('google-pay')}
      whileHover={{ scale: 1.05, borderColor: "#FF7426" }}
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center cursor-pointer p-3 border rounded-lg transition-colors ${
        selectedPayment === 'google-pay' 
          ? 'border-[#FF7426] bg-[#FF7426]/10' 
          : 'border-[#4D2C5E]/20'
      }`}
    
    >
      <img src="images/google-pay.svg" alt="Google Pay" className="h-6 mb-2" />
      <span className="text-xs text-[#4D2C5E]">Google Pay</span>
    </motion.button>

    {/* Mastercard */}
    <motion.button
    onClick={() => setSelectedPayment('mastercard')}
      whileHover={{ scale: 1.05, borderColor: "#FF7426" }}
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center cursor-pointer p-3 border rounded-lg transition-colors ${
        selectedPayment === 'mastercard' 
          ? 'border-[#FF7426] bg-[#FF7426]/10' 
          : 'border-[#4D2C5E]/20'
      }`}
    
    >
      <img src="images/mastercard.svg" alt="Mastercard" className="h-6 mb-2" />
      <span className="text-xs text-[#4D2C5E]">Mastercard</span>
    </motion.button>

    {/* PhonePe */}
    <motion.button
    onClick={() => setSelectedPayment('phonePe')}
      whileHover={{ scale: 1.05, borderColor: "#FF7426" }}
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center cursor-pointer p-3 border rounded-lg transition-colors ${
        selectedPayment === 'phonePe' 
          ? 'border-[#FF7426] bg-[#FF7426]/10' 
          : 'border-[#4D2C5E]/20'
      }`}
    
    >
      <img src="images/phone-pe.svg" alt="PhonePe" className="h-6 mb-2" />
      <span className="text-xs text-[#4D2C5E]">PhonePe</span>
    </motion.button>
  </div>
</div>


                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[#4D2C5E]/10">
                    <motion.button
                        whileHover={{ backgroundColor: "#4D2C5E/10" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-[#4D2C5E] border border-[#4D2C5E]/30 rounded-lg hover:bg-[#4D2C5E]/5 transition-colors"
                    >
                        Cancel
                    </motion.button>
                    <motion.button
                        whileHover={{ backgroundColor: "#E65100" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onEnroll}
                        className="px-6 py-2 text-sm font-bold text-white bg-[#FF7426] rounded-lg shadow-md hover:shadow-lg transition-colors"
                    >
                        Complete Enrollment
                    </motion.button>
                </div>
            </div>
        </Modal>
    );
};

export default EnrollmentModal;