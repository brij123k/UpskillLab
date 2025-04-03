import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EnrollmentModal = ({ batch, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    paymentMethod: 'full',
    coupon: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit logic here
      console.log('Form submitted:', formData);
      onClose();
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transpatent bg-opacity-50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
      >
        <div className="sticky top-0 bg-white z-50 p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#4D2C5E]">
            Enroll in {batch.title}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-[#FF7426]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8 relative">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${step >= stepNum ? 'bg-[#4D2C5E] text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {stepNum}
                </div>
                <span className={`text-xs mt-2 ${step >= stepNum ? 'text-[#4D2C5E] font-medium' : 'text-gray-500'}`}>
                  {stepNum === 1 ? 'Details' : stepNum === 2 ? 'Payment' : 'Confirm'}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
              <motion.div 
                className="h-full bg-[#FF7426]"
                initial={{ width: '0%' }}
                animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-[#4D2C5E] mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4D2C5E] focus:border-[#4D2C5E]"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4D2C5E] focus:border-[#4D2C5E]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4D2C5E] focus:border-[#4D2C5E]"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Highest Education</label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4D2C5E] focus:border-[#4D2C5E]"
                    required
                  >
                    <option value="">Select</option>
                    <option value="highschool">High School</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Experience (Years)</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4D2C5E] focus:border-[#4D2C5E]"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Payment Information */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-[#4D2C5E] mb-4">Payment Information</h3>
              
              <div className="bg-[#FFF5EF] p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Program Fee:</span>
                  <span className="font-bold">₹{batch.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Early Bird Discount:</span>
                  <span className="text-[#FF7426] font-bold">-₹15,000</span>
                </div>
                <div className="border-t border-[#FFD9C5] my-2"></div>
                <div className="flex justify-between items-center text-lg font-bold text-[#4D2C5E]">
                  <span>Total Payable:</span>
                  <span>₹{batch.price.replace(/,/g, '') - 15000}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="full"
                        checked={formData.paymentMethod === 'full'}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#4D2C5E] focus:ring-[#4D2C5E]"
                      />
                      <span>Pay Full Amount</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="installment"
                        checked={formData.paymentMethod === 'installment'}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#4D2C5E] focus:ring-[#4D2C5E]"
                      />
                      <span>Pay in Installments (3 monthly payments)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code (Optional)</label>
                  <div className="flex">
                    <input
                      type="text"
                      name="coupon"
                      value={formData.coupon}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-[#4D2C5E] focus:border-[#4D2C5E]"
                    />
                    <button 
                      type="button"
                      className="px-4 py-2 bg-[#FF7426] text-white rounded-r-md hover:bg-[#E56722]"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Select Payment Gateway</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <button type="button" className="p-2 border border-gray-300 rounded-md hover:border-[#4D2C5E]">
                      <img src="images/google-pay.svg" alt="Google Pay" className="h-6 mx-auto" />
                    </button>
                    <button type="button" className="p-2 border border-gray-300 rounded-md hover:border-[#4D2C5E]">
                      <img src="images/mastercard.svg" alt="Mastercard" className="h-6 mx-auto" />
                    </button>
                    <button type="button" className="p-2 border border-gray-300 rounded-md hover:border-[#4D2C5E]">
                      <img src="images/phone-pe.svg" alt="PhonePe" className="h-6 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-[#FF7426]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[#FF7426]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#4D2C5E] mb-2">Confirm Your Enrollment</h3>
              <p className="text-gray-600 mb-6">Please review your details before proceeding to payment</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                <h4 className="font-medium text-[#4D2C5E] mb-2">Program Details</h4>
                <p className="text-sm mb-1"><span className="text-gray-500">Program:</span> {batch.title}</p>
                <p className="text-sm mb-1"><span className="text-gray-500">Batch ID:</span> {batch.batchId}</p>
                <p className="text-sm mb-1"><span className="text-gray-500">Start Date:</span> {batch.startDate}</p>
                <p className="text-sm mb-1"><span className="text-gray-500">Schedule:</span> {batch.batchTime}</p>
                <p className="text-sm"><span className="text-gray-500">Total Fee:</span> ₹{batch.price.replace(/,/g, '') - 15000}</p>
              </div>

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-[#4D2C5E] focus:ring-[#4D2C5E] rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the <a href="#" className="text-[#FF7426] hover:underline">Terms & Conditions</a> and 
                  <a href="#" className="text-[#FF7426] hover:underline"> Privacy Policy</a>
                </label>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 border border-[#4D2C5E] text-[#4D2C5E] rounded-md hover:bg-[#4D2C5E]/10"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#FF7426] text-white rounded-md hover:bg-[#E56722]"
            >
              {step === 3 ? 'Proceed to Payment' : 'Continue'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EnrollmentModal;