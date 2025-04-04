import { motion } from 'framer-motion';
import Modal from './CommonModal';
import React, { useState } from 'react';
import { FiCheck, FiCreditCard, FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';

const PurchaseModal = ({ course, isOpen, onClose, onPurchase }) => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        agreeTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Purchase ${course?.title}`}>
            <div className="space-y-6">
                {/* Course Summary with Price Highlight */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 p-4 bg-[#FFF5EF] rounded-lg"
                >
                    <div className="w-1/3 min-w-[100px]">
                        <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="w-full h-auto rounded-lg object-cover shadow-sm"
                        />
                    </div>
                    <div className="w-2/3">
                        <h3 className="text-xl font-bold text-[#4D2C5E]">{course.title}</h3>
                        <div className="flex items-center mt-1 mb-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                                course.level === 'Beginner' ? 'bg-blue-100 text-blue-800' :
                                course.level === 'Intermediate' ? 'bg-purple-100 text-purple-800' :
                                'bg-[#FF7426]/20 text-[#FF7426]'
                            }`}>
                                {course.level}
                            </span>
                        </div>
                        <div className="flex items-end mt-2">
                            <p className="text-2xl font-bold text-[#FF7426]">${course.discountedPrice}</p>
                            {course.originalPrice && (
                                <p className="ml-2 text-sm text-gray-500 line-through">${course.originalPrice}</p>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Buyer Information */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-4"
                >
                    <h4 className="text-lg font-semibold text-[#4D2C5E] border-b pb-2">Your Information</h4>
                    
                    <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4D2C5E]/50" />
                        <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full pl-10 pr-4 py-3 border border-[#4D2C5E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent"
                            required
                        />
                    </div>

                    <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4D2C5E]/50" />
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full pl-10 pr-4 py-3 border border-[#4D2C5E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent"
                            required
                        />
                    </div>

                    <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4D2C5E]/50" />
                        <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full pl-10 pr-4 py-3 border border-[#4D2C5E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent"
                            required
                        />
                    </div>
                </motion.div>

                {/* Payment Options
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                >
                    <h4 className="text-lg font-semibold text-[#4D2C5E] border-b pb-2">Payment Method</h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <motion.button
                            onClick={() => setSelectedPayment('credit-card')}
                            whileHover={{ scale: 1.02 }}
                            className={`flex items-center p-3 border-2 rounded-lg transition-all ${
                                selectedPayment === 'credit-card' 
                                    ? 'border-[#FF7426] bg-[#FF7426]/10' 
                                    : 'border-[#4D2C5E]/20 hover:border-[#4D2C5E]/40'
                            }`}
                        >
                            <FiCreditCard className="text-[#4D2C5E] mr-2" />
                            <span>Credit Card</span>
                        </motion.button>

                        <motion.button
                            onClick={() => setSelectedPayment('paypal')}
                            whileHover={{ scale: 1.02 }}
                            className={`flex items-center p-3 border-2 rounded-lg transition-all ${
                                selectedPayment === 'paypal' 
                                    ? 'border-[#FF7426] bg-[#FF7426]/10' 
                                    : 'border-[#4D2C5E]/20 hover:border-[#4D2C5E]/40'
                            }`}
                        >
                            <img src="images/paypal.svg" alt="PayPal" className="h-5 mr-2" />
                            <span>PayPal</span>
                        </motion.button>
                    </div>

                    {selectedPayment === 'credit-card' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-3 mt-3"
                        >
                            <div className="relative">
                                <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4D2C5E]/50" />
                                <input
                                    placeholder="Card Number"
                                    className="w-full pl-10 pr-4 py-3 border border-[#4D2C5E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7426]"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    placeholder="MM/YY"
                                    className="w-full px-4 py-3 border border-[#4D2C5E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7426]"
                                />
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4D2C5E]/50" />
                                    <input
                                        placeholder="CVV"
                                        className="w-full pl-10 pr-4 py-3 border border-[#4D2C5E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7426]"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div> */}

                {/* Terms and Purchase Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                >
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            className="h-5 w-5 rounded border-2 border-[#4D2C5E]/50 checked:bg-[#FF7426] checked:border-[#FF7426] focus:ring-0"
                        />
                        <label htmlFor="terms" className="ml-2 text-sm text-[#4D2C5E]">
                            I agree to the <a href="#" className="text-[#FF7426] hover:underline">terms and conditions</a>
                        </label>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            if (formData.agreeTerms) {
                                onPurchase();
                                onClose();
                            }
                        }}
                        disabled={!formData.agreeTerms}
                        className={`w-full py-3 text-lg font-bold text-white rounded-lg shadow-md ${
                            formData.agreeTerms 
                                ? 'bg-gradient-to-r cursor-pointer from-[#FF7426] to-[#E65100] hover:from-[#E65100] hover:to-[#C04100]' 
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Add To Cart - ${course.discountedPrice}
                    </motion.button>
                </motion.div>
            </div>
        </Modal>
    );
};

export default PurchaseModal;