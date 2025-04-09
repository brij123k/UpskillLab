import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { registerBatch } from "../../config/services";

const EnrollmentModal = ({ batch, onClose }) => {
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
    originalPrice: batch.originalPrice,
    discountedPrice: batch.price,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    batchId: batch.batchCode,
    agreeTerms: false,
  });

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
      const response = await registerBatch(batch.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        amount: paymentData.discountedPrice,
      });

      setPaymentData(prev => ({
        ...prev,
        orderId: response.orderId,
        paymentSessionId: response.paymentSessionId,
      }));

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment initialization failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Cashfree UI initialization with reliable loader handling
  const initializePaymentUI = useCallback(() => {
    if (!cashfreeLoaded || !paymentContainerRef.current) {
      toast.error("Payment system loading, please try again");
      return;
    }

    setShowPaymentLoader(true);
    paymentContainerRef.current.innerHTML = '';

    // Create a temporary container to detect when UI is loaded
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.width = '1px';
    tempContainer.style.height = '1px';
    tempContainer.style.opacity = '0';
    paymentContainerRef.current.appendChild(tempContainer);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          // Check if Cashfree elements are present
          const cashfreeElements = paymentContainerRef.current.querySelectorAll('[class*="cashfree"]');
          if (cashfreeElements.length > 0) {
            setShowPaymentLoader(false);
            observer.disconnect();
            paymentContainerRef.current.removeChild(tempContainer);
          }
        }
      }
    });

    observer.observe(tempContainer, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });

    // Fallback timeout in case observer doesn't trigger
    const timeout = setTimeout(() => {
      setShowPaymentLoader(false);
      observer.disconnect();
      if (paymentContainerRef.current.contains(tempContainer)) {
        paymentContainerRef.current.removeChild(tempContainer);
      }
    }, 5000);

    try {
      cashfreeInstance.current.checkout({
        paymentSessionId: paymentData.paymentSessionId,
        redirectTarget: paymentContainerRef.current,
        appearance: {
          width: "100%",
          height: "100%",
        },
      }).catch(error => {
        clearTimeout(timeout);
        observer.disconnect();
        setShowPaymentLoader(false);
        toast.error("Failed to load payment UI");
        console.error(error);
      });
    } catch (error) {
      clearTimeout(timeout);
      observer.disconnect();
      setShowPaymentLoader(false);
      toast.error("Payment system error");
      console.error(error);
    }

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [cashfreeLoaded, paymentData.paymentSessionId]);

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl w-full max-w-md max-h-[90vh] flex flex-col shadow-xl overflow-hidden"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        {/* Header with progress steps */}
        <div className="sticky top-0 bg-[#4D2C5E] p-4 text-white z-10">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Enroll in {batch.title}</h2>
            <button onClick={onClose} className="text-white hover:text-[#FF7426]">
              ✕
            </button>
          </div>
          
          <div className="flex items-center justify-between px-4">
            {[1, 2, 3].map((stepNum) => (
              <React.Fragment key={stepNum}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${step >= stepNum ? "bg-[#FF7426] text-white" : "bg-white/20 text-white/70"}`}>
                    {stepNum}
                  </div>
                  <span className="text-xs mt-1 text-white/80">
                    {["Details", "Review", "Pay"][stepNum - 1]}
                  </span>
                </div>
                {stepNum < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${step > stepNum ? "bg-[#FF7426]" : "bg-white/20"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent"
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
              className="space-y-5"
            >
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-4 text-[#4D2C5E]">Order Summary</h3>
                <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">Order Id:</span>
                    <span>{paymentData.orderId}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Program:</span>
                    <span className="font-medium">{batch.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span>{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className="border-t border-gray-200 my-3"></div>
                  <div className="flex justify-between text-base font-bold">
                    <span>Total Amount:</span>
                    <span className="text-[#FF7426]">₹{paymentData.discountedPrice}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start mt-4">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 h-5 w-5 text-[#FF7426] rounded focus:ring-[#FF7426]"
                  required
                />
                <label className="ml-3 text-sm text-gray-700">
                  I agree to the <a href="/terms" className="text-[#FF7426] underline">terms and conditions</a>
                </label>
              </div>
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
                  <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-[#FF7426]"></div>
                  <p className="mt-4 text-gray-600">Loading secure payment gateway...</p>
                </div>
              )}

              {/* Payment container */}
              <div 
                ref={paymentContainerRef}
                className="w-full h-[400px]"
              ></div>
            </motion.div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="sticky bottom-0 bg-white border-t p-4">
          <div className="flex justify-between gap-3">
            {step > 1 && step < 3 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 flex-1 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            
            {step < 3 && (
              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className={`px-6 py-3 rounded-md flex-1 flex items-center justify-center transition-colors ${
                  loading ? 'bg-[#FF7426]/80' : 'bg-[#FF7426] hover:bg-[#E65100]'
                } text-white`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
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

export default EnrollmentModal;
