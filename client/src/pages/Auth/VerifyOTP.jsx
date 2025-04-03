import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOTPPage = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [countdown, setCountdown] = useState(30);
    const [showToast, setShowToast] = useState(false);
    const { state } = useLocation();
    const navigate = useNavigate();

    // Handle OTP input change
    const handleChange = (index, value) => {
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            
            if (value && index < 5) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    // Handle paste
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text/plain').slice(0, 6);
        if (/^\d+$/.test(pasteData)) {
            const newOtp = [...otp];
            for (let i = 0; i < pasteData.length; i++) {
                newOtp[i] = pasteData[i];
            }
            setOtp(newOtp);
        }
    };

    // Handle backspace
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    // Resend OTP
    const handleResend = () => {
        setCountdown(30);
        setVerificationStatus('resent');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Verify OTP
    const handleVerify = async () => {
        setIsVerifying(true);
        setVerificationStatus(null);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (otp.join('').length === 6) {
                setVerificationStatus('success');
                setShowToast(true);
                setTimeout(() => navigate('/'), 2000);
            } else {
                setVerificationStatus('error');
                setShowToast(true);
            }
        } catch (error) {
            setVerificationStatus('error');
            setShowToast(true);
        } finally {
            setIsVerifying(false);
        }
    };

    // Countdown timer for resend OTP
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // Toast animation variants
    const toast = {
        hidden: { opacity: 0, y: -50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        },
        exit: { 
            opacity: 0, 
            y: -50,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#fdf8ee] flex items-center justify-center p-4">
            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
                        variants={toast}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className={`px-6 py-3 rounded-lg shadow-lg flex items-center w-[90vw] max-w-xs sm:max-w-md ${
                            verificationStatus === 'success' 
                                ? 'bg-green-100 border border-green-400 text-green-700' 
                                : verificationStatus === 'resent'
                                ? 'bg-blue-100 border border-blue-400 text-blue-700'
                                : 'bg-red-100 border border-red-400 text-red-700'
                        }`}>
                            {verificationStatus === 'success' ? (
                                <>
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Verification successful! Redirecting to home...</span>
                                </>
                            ) : verificationStatus === 'resent' ? (
                                <>
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.707-5.707a1 1 0 00-1.414-1.414L10 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>New verification code sent to your email</span>
                                </>
                            ) : (
                                <>
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span>Invalid verification code. Please try again.</span>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div 
                className="w-full max-w-md p-6 sm:p-8 bg-white shadow-2xl rounded-2xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
            >
                {/* Title */}
                <motion.h1 
                    className="text-2xl sm:text-3xl font-bold text-center text-[#4D2C5E] mb-2"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    Verify Your Email
                </motion.h1>

                {/* Description */}
                <motion.p 
                    className="text-gray-600 text-center mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    We've sent a 6-digit code to <span className="font-medium">{state?.email || 'your email'}</span>
                </motion.p>

                {/* OTP Input */}
                <motion.div 
                    className="flex justify-center space-x-2 mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl border-b-2 border-[#4D2C5E] focus:border-[#FF7426] focus:outline-none"
                            autoFocus={index === 0}
                        />
                    ))}
                </motion.div>

                {/* Verify Button */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.button
                        onClick={handleVerify}
                        disabled={isVerifying || otp.join('').length !== 6}
                        className={`w-full py-3 rounded-lg font-medium text-white ${
                            isVerifying || otp.join('').length !== 6 
                                ? 'bg-gray-400' 
                                : 'bg-[#4D2C5E] hover:bg-[#5F3A73]'
                        } transition-colors relative overflow-hidden`}
                        whileHover={!isVerifying && otp.join('').length === 6 ? { 
                            scale: 1.02,
                            boxShadow: "0 4px 8px rgba(77, 44, 94, 0.2)"
                        } : {}}
                        whileTap={!isVerifying && otp.join('').length === 6 ? { scale: 0.98 } : {}}
                    >
                        <span className="relative z-10 flex items-center justify-center">
                            {isVerifying ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </>
                            ) : (
                                'Verify Code'
                            )}
                        </span>
                        {!isVerifying && otp.join('').length === 6 && (
                            <motion.span
                                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </motion.button>
                </motion.div>

                {/* Resend OTP */}
                <motion.div 
                    className="text-center mt-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {countdown > 0 ? (
                        <p className="text-gray-500">
                            Resend code in {countdown}s
                        </p>
                    ) : (
                        <button 
                            onClick={handleResend}
                            className="text-[#FF7426] font-medium hover:underline"
                        >
                            Resend Verification Code
                        </button>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default VerifyOTPPage;