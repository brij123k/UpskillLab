import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { manualRegister } from "../../config/services";

const CourseEnrollmentModal = ({ onClose }) => {
  // State management
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cashfreeLoaded, setCashfreeLoaded] = useState(false);
  const [showPaymentLoader, setShowPaymentLoader] = useState(false);
  const paymentContainerRef = useRef(null);
  const cashfreeInstance = useRef(null);

  const [paymentData, setPaymentData] = useState({
    orderId: "",
    paymentSessionId: "",
    amount: 0,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseName: "",
    amount: "",
    agreeTerms: true,
  });

  // Mock API function - replace with your actual registration API call
//   const registerCourse = async (data) => {
//     // This is a mock implementation - replace with your actual API call
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({
//           success: true,
//           orderId: `ORD_${Math.floor(Math.random() * 1000000)}`,
//           paymentSessionId: `SESSION_${Math.floor(Math.random() * 1000000)}`,
//           amount: data.amount,
//           courseName: data.courseName,
//         });
//       }, 1000);
//     });
//   };

  // Load Cashfree SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => {
      setCashfreeLoaded(true);
      cashfreeInstance.current = window.Cashfree({
        mode: process.env.NODE_ENV === "production" ? "production" : "sandbox"
      });
    };
    script.onerror = () => {
      toast.error("Payment system is currently unavailable");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Form handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name.trim()) {
        toast.error("Please enter your name");
        return false;
      }
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        toast.error("Please enter a valid email");
        return false;
      }
      if (!/^\d{10}$/.test(formData.phone)) {
        toast.error("Please enter a 10-digit phone number");
        return false;
      }
      if (!formData.courseName.trim()) {
        toast.error("Please enter course name");
        return false;
      }
      if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
        toast.error("Please enter a valid amount");
        return false;
      }
    }
    if (step === 2 && !formData.agreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return false;
    }
    return true;
  };

  // Payment initialization
  const initializePayment = async () => {
    try {
      setLoading(true);
      const response = await manualRegister({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        courseName: formData.courseName,
        amount: formData.amount,
      });

      if (response) {
        setPaymentData({
          orderId: response.orderId,
          paymentSessionId: response.paymentSessionId,
          discountedPrice: response.totalAmount,
        });
        return true;
      } else {
        toast.error("Registration failed");
        return false;
      }
    } catch (error) {
      toast.error(error.message || "Payment initialization failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Cashfree UI initialization
  const initializePaymentUI = useCallback(() => {
    if (!cashfreeLoaded || !paymentContainerRef.current) {
      toast.error("Payment system loading, please try again");
      return;
    }

    setShowPaymentLoader(false);
    paymentContainerRef.current.innerHTML = '';

    try {
      cashfreeInstance.current.checkout({
        paymentSessionId: paymentData.paymentSessionId,
        redirectTarget: paymentContainerRef.current,
        appearance: {
          width: "100%",
          height: "100%",
        },
      }).then(() => {
        // Payment successful
        toast.success("Payment successful!");
        setTimeout(() => {
          onClose();
        }, 1000);
      }).catch(error => {
        setShowPaymentLoader(false);
        toast.error("Failed to load payment UI");
        console.error(error);
      });
    } catch (error) {
      setShowPaymentLoader(false);
      toast.error("Payment system error");
      console.error(error);
    }
  }, [cashfreeLoaded, paymentData.paymentSessionId, onClose]);

  // Step navigation
  const handleNext = async () => {
    if (!validateStep()) return;

    if (step === 1) {
      const success = await initializePayment();
      if (success) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  // Initialize payment UI when step 3 is reached
  useEffect(() => {
    if (step === 3) {
      initializePaymentUI();
    }
  }, [step, initializePaymentUI]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/30 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl w-full max-w-md max-h-[90vh] flex flex-col shadow-xl overflow-hidden mx-2"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        {/* Header with progress steps */}
        <div className="sticky top-0 bg-[#4D2C5E] p-3 sm:p-4 text-white z-10">
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <h2 className="text-base sm:text-lg font-bold truncate max-w-[70%]">Course Enrollment</h2>
            <button onClick={onClose} className="text-white hover:text-[#FF7426] text-lg">
              ✕
            </button>
          </div>
          
          <div className="flex items-center justify-between px-2 sm:px-4">
            {[1, 2, 3].map((stepNum) => (
              <React.Fragment key={stepNum}>
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium
                    ${step >= stepNum ? "bg-[#FF7426] text-white" : "bg-white/20 text-white/70"}`}>
                    {stepNum}
                  </div>
                  <span className="text-[10px] sm:text-xs mt-1 text-white/80 whitespace-nowrap">
                    {["Details", "Review", "Pay"][stepNum - 1]}
                  </span>
                </div>
                {stepNum < 3 && (
                  <div className={`flex-1 h-1 mx-1 sm:mx-2 ${step > stepNum ? "bg-[#FF7426]" : "bg-white/20"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3 sm:space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Name*</label>
                <input
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)*</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent"
                  required
                />
              </div>
            </motion.div>
          )}

          {/* Step 2: Order Review */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-base sm:text-lg mb-3 text-[#4D2C5E]">Payment Summary</h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Id:</span>
                    <span className="truncate max-w-[50%]">{paymentData.orderId}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Course:</span>
                    <span className="font-medium truncate max-w-[50%]">{formData.courseName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="truncate max-w-[50%]">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="truncate max-w-[50%]">{formData.email}</span>
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between text-sm sm:text-base font-bold">
                    <span>Total Amount:</span>
                    <span className="text-[#FF7426]">₹{paymentData.discountedPrice}</span>
                  </div>
                </div>
              </div>

              {/* <div className="flex items-start mt-3">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 text-[#FF7426] rounded focus:ring-[#FF7426]"
                  required
                />
                <label className="ml-2 text-xs sm:text-sm text-gray-700">
                  I agree to the <a href="/terms" className="text-[#FF7426] underline">terms and conditions</a>
                </label>
              </div> */}
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full relative"
            >
              {/* Loader overlay */}
              {showPaymentLoader && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                  <div className="animate-spin rounded-full h-10 w-10 sm:h-14 sm:w-14 border-t-4 border-b-4 border-[#FF7426]"></div>
                  <p className="mt-3 text-sm sm:text-base text-gray-600 text-center px-2">Loading secure payment gateway...</p>
                </div>
              )}

              {/* Payment container */}
              <div 
                ref={paymentContainerRef}
                className="w-full h-[300px] sm:h-[400px]"
              ></div>
            </motion.div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="sticky bottom-0 bg-white border-t p-3 sm:p-4">
          <div className="flex justify-between gap-2 sm:gap-3">
            {step > 1 && step < 3 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 rounded-md text-xs sm:text-sm text-gray-700 flex-1 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            
            {step < 3 && (
              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-md flex-1 flex items-center justify-center transition-colors text-xs sm:text-sm ${
                  loading ? 'bg-[#FF7426]/80' : 'bg-[#FF7426] hover:bg-[#E65100]'
                } text-white`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {step === 1 ? "Processing..." : "Continue"}
                  </>
                ) : (
                  step === 1 ? "Continue" : "Proceed to Payment"
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CourseEnrollmentModal;