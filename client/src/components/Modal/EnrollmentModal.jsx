import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiCheck, FiCreditCard, FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';
import { registerBatch } from '../../config/services';

const PurchaseModal = ({ course,batchCode, isOpen, onClose, onPurchase }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cashfreeLoaded, setCashfreeLoaded] = useState(false);
  const [paymentData, setPaymentData] = useState({
    orderId: '',
    paymentSessionId: '',
    originalPrice: course.originalPrice,
    discountedPrice: course.discountedPrice
  });
//  if(!batchCode && course.batch.batchCode){
//     batchCode=course.batch.batchCode
//   }
  console.log(batchCode)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    batchId: batchCode,
    agreeTerms: false
  });

  // Load Cashfree SDK
  useEffect(() => {
    if (!isOpen) return;
    
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => {
      setCashfreeLoaded(true);
      console.log('Cashfree SDK loaded');
    };
    script.onerror = () => {
      console.error('Failed to load Cashfree SDK');
      toast.error('Payment system is currently unavailable');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error('Please enter a valid email');
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error('Please enter a 10-digit phone number');
      return false;
    }
    return true;
  };

  const initiatePayment = async () => {
    try {
      setLoading(true);
      const response = await registerBatch(batchCode, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      
      setPaymentData({
        ...paymentData,
        orderId: response.orderId,
        paymentSessionId: response.paymentSessionId
      });
      
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment initialization failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const openCashfreeCheckout = () => {
    if (!cashfreeLoaded) {
      toast.error('Payment system is loading, please try again');
      return;
    }

    if (!formData.agreeTerms) {
      toast.error('You must agree to the terms and conditions');
      return;
    }

    try {
      const cashfree = window.Cashfree({
        mode: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
      });

      cashfree.checkout({
        paymentSessionId: paymentData.paymentSessionId,
        redirectTarget: "_self"
      }).then((result) => {
        if (result && result.error) {
          toast.error(`Payment failed: ${result.error.message}`);
        } else if (result) {
          verifyPaymentOnServer();
        }
      }).catch((error) => {
        console.error('Checkout error:', error);
        toast.error('Failed to open payment page');
      });
    } catch (error) {
      console.error('Cashfree error:', error);
      toast.error('Payment system error');
    }
  };

  const verifyPaymentOnServer = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/verify-payment?order_id=${paymentData.orderId}`);
      const data = await response.json();
      
      if (data.order_status === 'PAID') {
        toast.success('Payment successful! Course access granted!');
        onPurchase();
        onClose();
      } else {
        toast.error('Payment verification pending');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Payment verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (step === 1) {
        if (!validateStep1()) return;
        setStep(2);
      }
      else if (step === 2) {
        const paymentInitiated = await initiatePayment();
        if (paymentInitiated) setStep(3);
      }
      else if (step === 3) {
        openCashfreeCheckout();
      }
    } catch (error) {
      console.error('Form error:', error);
      toast.error('An error occurred');
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent bg-opacity-50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#4D2C5E]">
            Purchase {course.title}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-[#FF7426]">
            ✕
          </button>
        </div>

        <div className="px-6 pt-6">
          <div className="flex justify-between relative mb-8">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${step >= stepNum ? 'bg-[#4D2C5E] text-white' : 'bg-gray-200'}`}>
                  {stepNum}
                </div>
                <span className={`text-xs mt-2 ${step >= stepNum ? 'text-[#4D2C5E]' : 'text-gray-500'}`}>
                  {['Details', 'Payment', 'Confirm'][stepNum - 1]}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
              <motion.div 
                className="h-full bg-[#FF7426]"
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-0">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Course Summary */}
              <div className="flex gap-4 p-4 bg-[#FFF5EF] rounded-lg">
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
                    <p className="text-2xl font-bold text-[#FF7426]">{course.discountedPrice}</p>
                    {course.originalPrice && (
                      <p className="ml-2 text-sm text-gray-500 line-through">{course.originalPrice}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Info Form */}
              <div className="space-y-4">
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
              </div>
            </motion.div>
          )}

          {/* Step 2: Payment Info */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-[#FFF5EF] p-4 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span>Course Fee:</span>
                  <span>{paymentData.originalPrice}</span>
                </div>
                <div className="flex justify-between text-[#FF7426]">
                  <span>Discount:</span>
                  <span>-{paymentData.originalPrice - paymentData.discountedPrice}</span>
                </div>
                <div className="border-t border-[#FFD9C5] my-2"></div>
                <div className="flex justify-between font-bold text-[#4D2C5E]">
                  <span>Total Payable:</span>
                  <span>{paymentData.discountedPrice}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation & Payment */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF7426]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-[#FF7426]" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#4D2C5E]">Ready for Payment</h3>
                <p className="text-gray-600">You'll be redirected to secure payment page</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-[#4D2C5E] mb-2">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Course:</span>
                    <span>{course.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Student:</span>
                    <span>{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between font-semibold">
                    <span>Amount to Pay:</span>
                    <span>{paymentData.discountedPrice}</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-[#4D2C5E] mb-3">Payment Method</h4>
                <div className="flex items-center space-x-3 mb-2">
                  <input 
                    type="radio" 
                    id="cashfree-checkout" 
                    name="paymentMethod" 
                    className="h-4 w-4 text-[#4D2C5E] focus:ring-[#4D2C5E]" 
                    defaultChecked
                  />
                  <label htmlFor="cashfree-checkout" className="flex items-center">
                    <img 
                      src="https://cashfreelogo.cashfree.com/cashfreepayments/CF_Logo_Icon_Black.svg" 
                      alt="Cashfree" 
                      className="h-6 mr-2" 
                    />
                    <span>Cashfree Secure Payments</span>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  You'll be redirected to Cashfree's secure payment page to complete your transaction.
                </p>
              </div>

              <label className="flex items-start mt-4">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-[#4D2C5E]"
                  required
                />
                <span className="ml-2 text-sm">
                  I agree to the <a href="/terms" className="text-[#4D2C5E] underline">terms and conditions</a> and authorize the payment
                </span>
              </label>

              <div className="bg-[#F8F9FA] p-3 rounded-lg flex items-start">
                <svg className="h-5 w-5 text-[#4D2C5E] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-xs text-gray-600">
                  Your payment information is processed securely. We do not store your credit card details.
                </span>
              </div>
            </motion.div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 border border-[#4D2C5E] text-[#4D2C5E] rounded-md hover:bg-[#4D2C5E]/10"
                disabled={loading}
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            <button
              type="submit"
              className="px-6 py-2 bg-[#FF7426] text-white rounded-md hover:bg-[#E65100] disabled:opacity-70"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {step === 3 ? 'Processing...' : 'Processing'}
                </span>
              ) : (
                step === 3 ? 'Proceed to Payment' : 'Continue'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PurchaseModal;